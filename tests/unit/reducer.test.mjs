import test from "node:test";
import assert from "node:assert/strict";

import { digest } from "../../src/reference/canonicalize.mjs";
import {
  createInitialState,
  makeEvent,
  reduceEvent,
} from "../../src/reference/reducer.mjs";

function initial(budget = 3) {
  return createInitialState({
    invocation_id: `inv-${budget}`,
    original_query: "Plan a synthetic change",
    host: "codex",
    transition_budget: budget,
  });
}

function verifiedInitial(budget = 3) {
  const state = initial(budget);
  return reduceEvent(
    state,
    makeEvent(
      state,
      "PLAN_PREFLIGHT_RECORDED",
      { verified: true, receipt: "verified-plan" },
      { producer_kind: "HOST" },
    ),
  );
}

test("same-key same-payload replay is a no-op; different payload corrupts", () => {
  const start = initial();
  const firstEvent = makeEvent(
    start,
    "PLAN_PREFLIGHT_RECORDED",
    { verified: true, receipt: "receipt-a" },
    { idempotency_key: "preflight", producer_kind: "HOST" },
  );
  const committed = reduceEvent(start, firstEvent);
  assert.equal(reduceEvent(committed, firstEvent), committed);

  const collision = {
    ...firstEvent,
    event_id: "collision",
    payload: { verified: true, receipt: "receipt-b" },
  };
  const corrupt = reduceEvent(committed, collision);
  assert.equal(corrupt.integrity.terminal, "STATE_CORRUPT");
  assert.equal(corrupt.integrity.failures.at(-1).code, "KEY_COLLISION");
});

test("verified Plan preflight requires a non-empty authoritative HOST receipt", () => {
  const state = initial();
  for (const event of [
    makeEvent(state, "PLAN_PREFLIGHT_RECORDED", { verified: true, receipt: null }, {
      producer_kind: "HOST",
    }),
    makeEvent(state, "PLAN_PREFLIGHT_RECORDED", { verified: true, receipt: "model-claim" }),
  ]) {
    const invalid = reduceEvent(state, event);
    assert.equal(invalid.integrity.terminal, "STATE_CORRUPT");
    assert.equal(invalid.integrity.failures.at(-1).code, "PLAN_PREFLIGHT_INVALID");
  }
});

test("refinement proposals before verified Plan commit only PLAN_MODE_REQUIRED", () => {
  const factories = [
    (state) => makeEvent(
      state,
      "USER_RESPONSE_RECORDED",
      {
        source_ref: "early-answer",
        disposition: "CONFIRMED",
        content_digest: digest("early answer"),
        material_targets: ["contract.goal"],
      },
      { producer_kind: "USER" },
    ),
    (state) => makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "early goal" },
    }),
    (state) => makeEvent(
      state,
      "EVIDENCE_RECORDED",
      {
        evidence_id: "early-evidence",
        claim: "early claim",
        source_ref: "early-source",
        retrieval_scope: "synthetic",
        applicability: "synthetic",
        freshness: "CURRENT",
        confidence_limits: "fixture only",
        disposition: "directly_supported",
      },
      { evidence_refs: ["early-source"] },
    ),
    (state) => makeEvent(state, "FRAME_CHALLENGE_RECORDED", {
      challenge_id: "early-challenge",
      source_ref: "early-frame",
      disposition: "OPEN",
    }),
  ];

  for (const factory of factories) {
    const state = initial(3);
    const next = reduceEvent(state, factory(state));
    assert.equal(next.integrity.terminal, "PLAN_MODE_REQUIRED");
    assert.equal(next.budgets.transition_remaining, 3);
    assert.equal(next.progress.active_macrosteps, 0);
    assert.equal(next.contract.provenance.length, 0);
    assert.equal(next.evidence.records.length, 0);
  }
});

test("a stale unique event creates a predecessor-mismatch integrity terminal", () => {
  const start = initial();
  const stale = makeEvent(
    start,
    "GAP_RECORDED",
    { gap_id: "g1", owner: "USER", materiality: 1, status: "OPEN" },
    { idempotency_key: "stale-gap" },
  );
  const preflight = makeEvent(
    start,
    "PLAN_PREFLIGHT_RECORDED",
    { verified: true, receipt: "receipt" },
    { producer_kind: "HOST" },
  );
  const advanced = reduceEvent(start, preflight);
  const corrupt = reduceEvent(advanced, stale);
  assert.equal(corrupt.integrity.terminal, "STATE_CORRUPT");
  assert.equal(corrupt.integrity.failures.at(-1).code, "PREDECESSOR_MISMATCH");
});

test("each active macrostep spends exactly one transition unit", () => {
  let state = initial(2);
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "PLAN_PREFLIGHT_RECORDED",
      { verified: true, receipt: "receipt" },
      { producer_kind: "HOST" },
    ),
  );
  assert.equal(state.budgets.transition_remaining, 2);

  state = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "Ship a deterministic plan" },
      provenance: {
        kind: "USER_RESPONSE",
        source_ref: "answer-1",
        disposition: "CONFIRMED",
      },
    }),
  );
  assert.equal(state.budgets.transition_remaining, 1);
  assert.equal(state.progress.active_macrosteps, 1);

  const evidenceEvent = makeEvent(state, "EVIDENCE_RECORDED", {
    evidence_id: "e1",
    claim: "synthetic",
    source_ref: "source-1",
    retrieval_scope: "synthetic unit fixture",
    applicability: "current synthetic contract only",
    freshness: "CURRENT",
    confidence_limits: "fixture assertion only",
    disposition: "directly_supported",
  }, { evidence_refs: ["source-1"] });
  const afterEvidence = reduceEvent(state, evidenceEvent);
  assert.equal(afterEvidence.budgets.transition_remaining, 0);
  assert.equal(reduceEvent(afterEvidence, evidenceEvent), afterEvidence);
});

test("external evidence requires bounded scope, applicability, freshness, limits, and source binding", () => {
  const state = verifiedInitial(2);
  const invalid = reduceEvent(
    state,
    makeEvent(
      state,
      "EVIDENCE_RECORDED",
      { evidence_id: "e-incomplete", claim: "claim", source_ref: "source-1" },
      { evidence_refs: ["source-1"] },
    ),
  );
  assert.equal(invalid.integrity.terminal, "STATE_CORRUPT");
  assert.equal(invalid.integrity.failures.at(-1).code, "ACTIVE_MACROSTEP_INVALID");
});

test("contract corrections append supersession lineage and invalidate dependent fields", () => {
  let state = verifiedInitial(4);
  state = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "old goal", scope: "old dependent scope" },
    }),
  );
  const priorGoalDigest = digest(state.contract.fields.goal);
  state = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "corrected goal" },
      supersessions: [
        {
          field: "goal",
          prior_value_digest: priorGoalDigest,
          source_ref: "answer-correction",
          reason: "user correction",
          invalidated_dependents: ["scope"],
        },
      ],
    }),
  );
  assert.equal(state.contract.fields.goal, "corrected goal");
  assert.equal(state.contract.fields.scope, undefined);
  assert.equal(state.contract.supersessions.length, 1);
  assert.equal(state.closure.graph_ok, false);
  assert.equal(state.residual_acceptance, null);
});

test("changing an existing contract field without a matching supersession fails closed", () => {
  let state = verifiedInitial(3);
  state = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", { fields: { goal: "old goal" } }),
  );
  const invalid = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", { fields: { goal: "silent rewrite" } }),
  );
  assert.equal(invalid.integrity.terminal, "STATE_CORRUPT");
  assert.equal(invalid.integrity.failures.at(-1).code, "CONTRACT_SUPERSESSION_REQUIRED");
});

test("active work at zero budget fails closed rather than underflowing", () => {
  let state = initial(0);
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "PLAN_PREFLIGHT_RECORDED",
      { verified: true, receipt: "receipt" },
      { producer_kind: "HOST" },
    ),
  );
  state = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "not allowed" },
    }),
  );
  assert.equal(state.integrity.terminal, "STATE_CORRUPT");
  assert.equal(state.integrity.failures.at(-1).code, "BUDGET_UNDERFLOW");
});

test("contract changes invalidate prior acceptance and change the state digest", () => {
  let state = verifiedInitial();
  const beforeHash = state.integrity.state_hash;
  state = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "new goal" },
    }),
  );
  assert.notEqual(state.integrity.state_hash, beforeHash);
  assert.equal(state.closure.acceptance_contract_digest, null);
  assert.equal(state.residual_acceptance, null);
});

test("all product terminals absorb even a colliding idempotency key", () => {
  let state = initial();
  const first = makeEvent(
    state,
    "HOST_CAPABILITY_CONTRADICTION_RECORDED",
    { capability: "native-question" },
    { idempotency_key: "terminal-key" },
  );
  state = reduceEvent(state, first);
  assert.equal(state.integrity.terminal, "HOST_CAPABILITY_CONTRADICTION");

  const collision = { ...first, event_id: "post-terminal-collision", payload: { changed: true } };
  assert.equal(reduceEvent(state, collision), state);
});

test("empty active macrosteps fail validation without spending progress budget", () => {
  for (const eventType of [
    "USER_RESPONSE_RECORDED",
    "EVIDENCE_RECORDED",
    "CONTRACT_DELTA_COMMITTED",
    "FRAME_CHALLENGE_RECORDED",
  ]) {
    const state = verifiedInitial(2);
    const next = reduceEvent(state, makeEvent(state, eventType, {}));
    assert.equal(next.integrity.terminal, "STATE_CORRUPT", eventType);
    assert.equal(next.integrity.failures.at(-1).code, "ACTIVE_MACROSTEP_INVALID", eventType);
    assert.equal(next.budgets.transition_remaining, 2, eventType);
    assert.equal(next.progress.active_macrosteps, 0, eventType);
  }
});

test("a contentless user confirmation cannot consume budget or clear stall state", () => {
  let state = verifiedInitial(2);
  state = reduceEvent(
    state,
    makeEvent(state, "STALL_RECORDED", { semantic_stall: true }),
  );
  const invalid = reduceEvent(
    state,
    makeEvent(
      state,
      "USER_RESPONSE_RECORDED",
      { source_ref: "answer-empty", disposition: "CONFIRMED" },
      { producer_kind: "USER" },
    ),
  );
  assert.equal(invalid.integrity.terminal, "STATE_CORRUPT");
  assert.equal(invalid.integrity.failures.at(-1).code, "ACTIVE_MACROSTEP_INVALID");
  assert.equal(invalid.budgets.transition_remaining, 2);
  assert.equal(invalid.progress.semantic_stall, true);
});

test("a validated material user response records only a digest and spends one unit", () => {
  const state = verifiedInitial(2);
  const priorContractDigest = state.contract.digest;
  const next = reduceEvent(
    state,
    makeEvent(
      state,
      "USER_RESPONSE_RECORDED",
      {
        source_ref: "answer-1",
        disposition: "CONFIRMED",
        content_digest: digest("synthetic answer"),
        material_targets: ["contract.goal"],
      },
      { producer_kind: "USER" },
    ),
  );
  assert.equal(next.integrity.terminal, null);
  assert.equal(next.budgets.transition_remaining, 1);
  assert.equal(next.contract.provenance.at(-1).source_ref, "answer-1");
  assert.notEqual(next.contract.digest, priorContractDigest);
});

test("an exact repeated response is stall evidence and never fresh progress", () => {
  let state = initial(3);
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "PLAN_PREFLIGHT_RECORDED",
      { verified: true, receipt: "receipt" },
      { producer_kind: "HOST" },
    ),
  );
  const payload = {
    source_ref: "answer-repeat",
    disposition: "CONFIRMED",
    content_digest: digest("same semantic answer"),
    material_targets: ["contract.goal"],
  };
  state = reduceEvent(
    state,
    makeEvent(state, "USER_RESPONSE_RECORDED", payload, { producer_kind: "USER" }),
  );
  state = reduceEvent(
    state,
    makeEvent(state, "STALL_RECORDED", { semantic_stall: true }),
  );
  const beforeBudget = state.budgets.transition_remaining;
  const beforeProvenance = state.contract.provenance.length;
  const repeated = reduceEvent(
    state,
    makeEvent(
      state,
      "USER_RESPONSE_RECORDED",
      { ...payload, source_ref: "answer-repeat-received-again" },
      { producer_kind: "USER" },
    ),
  );
  assert.equal(repeated.budgets.transition_remaining, beforeBudget);
  assert.equal(repeated.contract.provenance.length, beforeProvenance);
  assert.equal(repeated.progress.exact_repeat, true);
  assert.equal(repeated.progress.semantic_stall, true);
});
