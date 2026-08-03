import test from "node:test";
import assert from "node:assert/strict";

import { digest } from "../../src/reference/canonicalize.mjs";
import {
  createInitialState,
  makeEvent,
  reduceEvent,
} from "../../src/reference/reducer.mjs";
import { replayEvents } from "../../src/reference/replay.mjs";
import { routeNext } from "../../src/reference/router.mjs";

const COMPLETE_CLOSURE = {
  graph_ok: true,
  philosophical_ok: true,
  coverage_ok: true,
  risk_ok: true,
  conflict_ok: true,
  stable_ok: true,
  voi_ok: true,
  cal_ok: true,
  plan_input_ready: true,
  no_unauthorized_intent_drift: true,
};

function authorizedState() {
  let state = createInitialState({
    invocation_id: "handoff-1",
    original_query: "Plan a synthetic handoff",
    host: "codex",
    transition_budget: 2,
  });
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "PLAN_PREFLIGHT_RECORDED",
      { verified: true, receipt: "plan-receipt" },
      { producer_kind: "HOST" },
    ),
  );
  state = reduceEvent(
    state,
    makeEvent(state, "CLOSURE_RECOMPUTED", {
      ...COMPLETE_CLOSURE,
    }),
  );
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "USER_RESPONSE_RECORDED",
      {
        source_ref: "native-answer-handoff",
        disposition: "CONFIRMED",
        content_digest: digest("accept handoff contract"),
        material_targets: ["contract.acceptance"],
        acceptance: {
          kind: "RESOLVED",
          contract_digest: state.contract.digest,
          authority_confirmed: true,
          comprehension_confirmed: true,
        },
      },
      { producer_kind: "USER" },
    ),
  );
  return state;
}

test("unauthorized handoff intent is an integrity failure", () => {
  let state = createInitialState({
    invocation_id: "unauthorized",
    original_query: "Plan",
    host: "codex",
    transition_budget: 1,
  });
  const handoffKey = digest({
    invocation_id: state.invocation.invocation_id,
    contract_digest: state.contract.digest,
  });
  state = reduceEvent(
    state,
    makeEvent(state, "HANDOFF_INTENT_RECORDED", {
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
      authorization_kind: "EPISTEMIC_CLOSED",
    }),
  );
  assert.equal(state.integrity.terminal, "STATE_CORRUPT");
  assert.equal(state.integrity.failures.at(-1).code, "UNAUTHORIZED_HANDOFF");
});

test("one authorized handoff reaches one absorbing native-plan terminal", () => {
  let state = authorizedState();
  const handoffKey = digest({
    invocation_id: state.invocation.invocation_id,
    contract_digest: state.contract.digest,
  });
  const handoff = makeEvent(
    state,
    "HANDOFF_INTENT_RECORDED",
    {
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
      authorization_kind: "EPISTEMIC_CLOSED",
    },
    { idempotency_key: handoffKey },
  );
  state = reduceEvent(state, handoff);
  const once = state;
  assert.equal(reduceEvent(state, handoff), once);
  assert.equal(routeNext(state).next, "OBSERVE_NATIVE_PLAN");

  state = reduceEvent(
    state,
    makeEvent(
      state,
      "NATIVE_PLAN_OBSERVED",
      {
        receipt: "native-plan-1",
        handoff_key: handoffKey,
        contract_digest: state.contract.digest,
      },
      { producer_kind: "HOST" },
    ),
  );
  assert.equal(state.integrity.terminal, "COMPLETE_AFTER_PLAN");
  assert.equal(state.handoff.plan_count, 1);

  const secondPlan = makeEvent(state, "NATIVE_PLAN_OBSERVED", {
    receipt: "native-plan-2",
  });
  assert.equal(reduceEvent(state, secondPlan), state);
  assert.equal(state.handoff.plan_count, 1);
});

test("native-plan completion requires a current host receipt bound to the fenced handoff", () => {
  let state = authorizedState();
  const handoffKey = digest({
    invocation_id: state.invocation.invocation_id,
    contract_digest: state.contract.digest,
  });
  state = reduceEvent(
    state,
    makeEvent(state, "HANDOFF_INTENT_RECORDED", {
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
      authorization_kind: "EPISTEMIC_CLOSED",
    }),
  );

  const invalid = reduceEvent(state, makeEvent(state, "NATIVE_PLAN_OBSERVED", {}));
  assert.equal(invalid.integrity.terminal, "STATE_CORRUPT");
  assert.equal(invalid.integrity.failures.at(-1).code, "NATIVE_PLAN_OBSERVATION_INVALID");
});

test("a fenced handoff rejects later refinement instead of drifting the contract", () => {
  let state = authorizedState();
  const handoffKey = digest({
    invocation_id: state.invocation.invocation_id,
    contract_digest: state.contract.digest,
  });
  state = reduceEvent(
    state,
    makeEvent(state, "HANDOFF_INTENT_RECORDED", {
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
      authorization_kind: "EPISTEMIC_CLOSED",
    }),
  );
  const fencedDigest = state.contract.digest;
  const invalid = reduceEvent(
    state,
    makeEvent(state, "CONTRACT_DELTA_COMMITTED", {
      fields: { goal: "late drift" },
    }),
  );
  assert.equal(invalid.integrity.terminal, "STATE_CORRUPT");
  assert.equal(invalid.integrity.failures.at(-1).code, "REFINEMENT_AFTER_HANDOFF");
  assert.equal(invalid.contract.digest, fencedDigest);
});

test("a reconciled NOT_APPLIED handoff cannot later be upgraded by a plan proposal", () => {
  let state = authorizedState();
  const handoffKey = digest({
    invocation_id: state.invocation.invocation_id,
    contract_digest: state.contract.digest,
  });
  state = reduceEvent(
    state,
    makeEvent(state, "HANDOFF_INTENT_RECORDED", {
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
      authorization_kind: "EPISTEMIC_CLOSED",
    }),
  );
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "HANDOFF_OUTCOME_RECORDED",
      {
        outcome: "NOT_APPLIED",
        receipt: "host-not-applied",
        handoff_key: handoffKey,
        contract_digest: state.contract.digest,
      },
      { producer_kind: "HOST" },
    ),
  );
  assert.equal(state.integrity.terminal, "BLOCKED");
  const overwrite = reduceEvent(
    state,
    makeEvent(
      state,
      "HANDOFF_OUTCOME_RECORDED",
      {
        outcome: "APPLIED",
        receipt: "host-applied-late",
        handoff_key: handoffKey,
        contract_digest: state.contract.digest,
      },
      { producer_kind: "HOST" },
    ),
  );
  assert.equal(overwrite, state);

  const invalid = reduceEvent(
    state,
    makeEvent(
      state,
      "NATIVE_PLAN_OBSERVED",
      {
        receipt: "late-plan",
        handoff_key: handoffKey,
        contract_digest: state.contract.digest,
      },
      { producer_kind: "HOST" },
    ),
  );
  assert.equal(invalid, state);
  assert.equal(invalid.integrity.terminal, "BLOCKED");
});

test("unknown host application is absorbing and never retried", () => {
  let state = authorizedState();
  const handoffKey = digest({
    invocation_id: state.invocation.invocation_id,
    contract_digest: state.contract.digest,
  });
  state = reduceEvent(
    state,
    makeEvent(state, "HANDOFF_INTENT_RECORDED", {
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
      authorization_kind: "EPISTEMIC_CLOSED",
    }),
  );
  state = reduceEvent(
    state,
    makeEvent(state, "HANDOFF_OUTCOME_RECORDED", {
      outcome: "UNKNOWN",
      receipt: null,
      handoff_key: handoffKey,
      contract_digest: state.contract.digest,
    }),
  );
  assert.equal(state.integrity.terminal, "HANDOFF_OUTCOME_UNKNOWN");
});

test("verification replay exposes a minimum trace and zero effects", () => {
  const initial = createInitialState({
    invocation_id: "replay-private",
    original_query: "Secret token tq_test_NEVER_LEAK",
    host: "claude-code",
    transition_budget: 2,
  });
  const preflight = makeEvent(
    initial,
    "PLAN_PREFLIGHT_RECORDED",
    { verified: true, receipt: "privacy-plan" },
    { producer_kind: "HOST" },
  );
  const afterPreflight = reduceEvent(initial, preflight);
  const event = makeEvent(afterPreflight, "EVIDENCE_RECORDED", {
    evidence_id: "e1",
    claim: "synthetic privacy projection evidence",
    secret: "tq_test_NEVER_LEAK",
    source_ref: "synthetic",
    retrieval_scope: "synthetic privacy fixture",
    applicability: "trace redaction only",
    freshness: "CURRENT",
    confidence_limits: "fixture assertion only",
    disposition: "directly_supported",
  }, { evidence_refs: ["synthetic"] });
  const replay = replayEvents(initial, [preflight, event]);
  assert.deepEqual(replay.effects, []);
  assert.doesNotMatch(JSON.stringify(replay.trace), /tq_test_NEVER_LEAK/);
  assert.match(replay.trace.original_query_digest, /^sha256:/);
  assert.throws(
    () => replayEvents(initial, [], { effect_sink: () => {} }),
    /cannot receive an effect sink/,
  );
});
