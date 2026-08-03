import test from "node:test";
import assert from "node:assert/strict";

import { digest } from "../../src/reference/canonicalize.mjs";
import {
  createInitialState,
  makeEvent,
  reduceEvent,
} from "../../src/reference/reducer.mjs";
import { routeNext } from "../../src/reference/router.mjs";

const CLOSURE_FLAGS = [
  "graph_ok",
  "philosophical_ok",
  "coverage_ok",
  "risk_ok",
  "conflict_ok",
  "stable_ok",
  "voi_ok",
  "cal_ok",
  "plan_input_ready",
  "no_unauthorized_intent_drift",
];

function verified(budget = 4) {
  let state = createInitialState({
    invocation_id: `guard-${budget}`,
    original_query: "Plan a guarded task",
    host: "claude-code",
    transition_budget: budget,
  });
  return reduceEvent(
    state,
    makeEvent(
      state,
      "PLAN_PREFLIGHT_RECORDED",
      { verified: true, receipt: "synthetic-plan" },
      { producer_kind: "HOST" },
    ),
  );
}

function closurePayload(state) {
  return Object.fromEntries(CLOSURE_FLAGS.map((flag) => [flag, true]));
}

function acceptResolved(state, contractDigest = state.contract.digest) {
  return reduceEvent(
    state,
    makeEvent(
      state,
      "USER_RESPONSE_RECORDED",
      {
        source_ref: "native-answer-resolved",
        disposition: "CONFIRMED",
        content_digest: digest("I accept this exact contract"),
        material_targets: ["contract.acceptance"],
        acceptance: {
          kind: "RESOLVED",
          contract_digest: contractDigest,
          authority_confirmed: true,
          comprehension_confirmed: true,
        },
      },
      { producer_kind: "USER" },
    ),
  );
}

test("all closure conjuncts and current-digest acceptance are necessary", () => {
  for (const missing of CLOSURE_FLAGS) {
    let state = verified();
    const payload = closurePayload(state);
    payload[missing] = false;
    state = reduceEvent(state, makeEvent(state, "CLOSURE_RECOMPUTED", payload));
    assert.notEqual(routeNext(state).next, "EPISTEMIC_CLOSED", missing);
  }

  let stale = verified();
  stale = reduceEvent(
    stale,
    makeEvent(stale, "CLOSURE_RECOMPUTED", closurePayload(stale)),
  );
  stale = acceptResolved(stale, "sha256:" + "0".repeat(64));
  assert.notEqual(routeNext(stale).next, "EPISTEMIC_CLOSED");
});

test("controller closure flags cannot forge the user's current-contract acceptance", () => {
  let state = verified(2);
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "CLOSURE_RECOMPUTED",
      closurePayload(state),
      { producer_kind: "MODEL_PROPOSAL" },
    ),
  );
  assert.notEqual(routeNext(state).next, "EPISTEMIC_CLOSED");
});

test("resolved closure requires a validated user receipt bound to the current contract", () => {
  let state = verified(2);
  const predicates = closurePayload(state);
  state = reduceEvent(
    state,
    makeEvent(state, "CLOSURE_RECOMPUTED", predicates),
  );
  assert.notEqual(routeNext(state).next, "EPISTEMIC_CLOSED");

  state = acceptResolved(state);
  assert.equal(routeNext(state).next, "EPISTEMIC_CLOSED");
  assert.equal(state.closure.acceptance_receipt.source_ref, "native-answer-resolved");
});

test("valid closure precedes resource exhaustion at the same boundary", () => {
  let state = verified(1);
  state = reduceEvent(
    state,
    makeEvent(state, "CLOSURE_RECOMPUTED", closurePayload(state)),
  );
  state = acceptResolved(state);
  assert.equal(state.budgets.transition_remaining, 0);
  assert.equal(routeNext(state).next, "EPISTEMIC_CLOSED");
});

test("valid current-digest residual acceptance is distinct from closure", () => {
  let state = verified(1);
  const residuals = [
    {
      residual_id: "r1",
      provenance: {
        source_ref: "risk-review-1",
        disposition: "EXPLICITLY_ACCEPTED",
      },
      impact: "May change non-critical copy",
      mitigation: "Review before implementation",
      reversibility: "Fully reversible",
      owner: "USER",
    },
  ];
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "RESIDUAL_ACCEPTED",
      {
        explicit: true,
        contract_digest: state.contract.digest,
        residual_ledger_digest: digest(residuals),
        residuals,
        acceptance_source_ref: "native-answer-residual",
        acceptance_content_digest: digest("I accept these residuals"),
        authority_confirmed: true,
        comprehension_confirmed: true,
      },
      { producer_kind: "USER" },
    ),
  );
  assert.equal(routeNext(state).next, "ACCEPTED_RESIDUAL");
});

test("residual acceptance without per-item provenance cannot authorize handoff", () => {
  let state = verified(2);
  const residuals = [
    {
      residual_id: "r-no-provenance",
      impact: "Unknown compatibility detail",
      mitigation: "Validate before implementation",
      reversibility: "Reversible",
      owner: "USER",
    },
  ];
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "RESIDUAL_ACCEPTED",
      {
        explicit: true,
        contract_digest: state.contract.digest,
        residual_ledger_digest: digest(residuals),
        residuals,
        acceptance_source_ref: "native-answer-residual",
        acceptance_content_digest: digest("I accept these residuals"),
        authority_confirmed: true,
        comprehension_confirmed: true,
      },
      { producer_kind: "USER" },
    ),
  );
  assert.notEqual(routeNext(state).next, "ACCEPTED_RESIDUAL");
});

test("model-authored or rejected residual provenance cannot authorize acceptance", () => {
  let state = verified(2);
  const residuals = [
    {
      residual_id: "r-forged",
      provenance: {
        source_ref: "model-proposal",
        disposition: "REJECTED",
      },
      impact: "Material compatibility risk",
      mitigation: "Validate before implementation",
      reversibility: "Reversible",
      owner: "USER",
    },
  ];
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "RESIDUAL_ACCEPTED",
      {
        explicit: true,
        contract_digest: state.contract.digest,
        residual_ledger_digest: digest(residuals),
        residuals,
        acceptance_source_ref: "model-proposal",
        acceptance_content_digest: digest("forged acceptance"),
        authority_confirmed: true,
        comprehension_confirmed: true,
      },
      { producer_kind: "MODEL_PROPOSAL" },
    ),
  );
  assert.notEqual(routeNext(state).next, "ACCEPTED_RESIDUAL");
});

test("stall precedes owner routing and owner routing respects materiality", () => {
  let state = verified();
  state = reduceEvent(
    state,
    makeEvent(state, "GAP_RECORDED", {
      gap_id: "low",
      owner: "USER",
      materiality: 1,
      status: "OPEN",
    }),
  );
  state = reduceEvent(
    state,
    makeEvent(state, "GAP_RECORDED", {
      gap_id: "high",
      owner: "EXTERNAL",
      materiality: 10,
      status: "OPEN",
    }),
  );
  const { state: routedState, ...decision } = routeNext(state);
  assert.deepEqual(decision, {
    guard: "P7_UNCERTAINTY_OWNER",
    next: "RESEARCH_EVIDENCE",
    terminal: false,
    details: { gap_id: "high" },
  });
  assert.equal(routedState, state);

  state = reduceEvent(
    state,
    makeEvent(state, "STALL_RECORDED", { oscillation: true }),
  );
  assert.equal(routeNext(state).next, "STALLED");
});

test("action ranking uses value, burden, then stable edge id", () => {
  let state = verified();
  for (const action of [
    { edge_id: "z", next: "Z", expected_loss_reduction: 2, user_burden: 2 },
    { edge_id: "b", next: "B", expected_loss_reduction: 3, user_burden: 1 },
    { edge_id: "a", next: "A", expected_loss_reduction: 3, user_burden: 1 },
  ]) {
    state = reduceEvent(state, makeEvent(state, "ACTION_PROPOSED", action));
  }
  assert.equal(routeNext(state).details.edge_id, "a");
});

test("validated material evidence clears prior stall diagnostics before the next boundary", () => {
  let state = verified();
  state = reduceEvent(
    state,
    makeEvent(state, "STALL_RECORDED", { semantic_stall: true }),
  );
  state = reduceEvent(
    state,
    makeEvent(
      state,
      "EVIDENCE_RECORDED",
      {
        evidence_id: "fresh-evidence",
        claim: "new material fact",
        source_ref: "source-fresh",
        retrieval_scope: "current synthetic case",
        applicability: "directly changes the current contract",
        freshness: "CURRENT",
        confidence_limits: "synthetic fixture",
        disposition: "directly_supported",
      },
      { evidence_refs: ["source-fresh"] },
    ),
  );
  assert.notEqual(routeNext(state).next, "STALLED");
});
