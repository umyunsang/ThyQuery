import test from "node:test";
import assert from "node:assert/strict";

import {
  applyEvents,
  createInitialState,
  makeEvent,
} from "../../src/reference/reducer.mjs";
import { routeNext } from "../../src/reference/router.mjs";

test("baseline: an invocation without verified Plan evidence fails closed", () => {
  const state = createInitialState({
    invocation_id: "inv-plan-missing",
    original_query: "Build the feature",
    host: "codex",
    transition_budget: 4,
  });

  const { state: routedState, ...decision } = routeNext(state);
  assert.deepEqual(decision, {
    guard: "P2_HOST_NON_WAIVABLE",
    next: "PLAN_MODE_REQUIRED",
    terminal: true,
  });
  assert.equal(routedState.integrity.terminal, "PLAN_MODE_REQUIRED");
});

test("a derived non-success terminal is committed to canonical state and absorbs later events", () => {
  const state = createInitialState({
    invocation_id: "inv-plan-absorbs",
    original_query: "Build the feature",
    host: "codex",
    transition_budget: 4,
  });
  const routed = routeNext(state);
  assert.equal(routed.next, "PLAN_MODE_REQUIRED");
  assert.equal(routed.state.integrity.terminal, "PLAN_MODE_REQUIRED");
  assert.equal(routed.state.invocation.lifecycle, "TERMINAL");

  const later = makeEvent(routed.state, "GAP_RECORDED", {
    gap_id: "must-not-commit",
    owner: "USER",
    materiality: 10,
    status: "OPEN",
  });
  assert.equal(applyEvents(routed.state, [later]), routed.state);
});

test("baseline: replaying the same ordered events yields the same state and digest", () => {
  const initial = createInitialState({
    invocation_id: "inv-replay",
    original_query: "Plan a release",
    host: "claude-code",
    transition_budget: 4,
  });
  const planVerified = makeEvent(
    initial,
    "PLAN_PREFLIGHT_RECORDED",
    { verified: true, receipt: "synthetic-plan-receipt" },
    { producer_kind: "HOST" },
  );

  const first = applyEvents(initial, [planVerified]);
  const second = applyEvents(initial, [planVerified]);

  assert.deepEqual(first, second);
  assert.equal(first.integrity.state_hash, second.integrity.state_hash);
});

test("baseline: an exhausted transition budget is a non-success terminal", () => {
  const initial = createInitialState({
    invocation_id: "inv-cap",
    original_query: "Plan something ambiguous",
    host: "codex",
    transition_budget: 0,
  });
  const planVerified = makeEvent(
    initial,
    "PLAN_PREFLIGHT_RECORDED",
    { verified: true, receipt: "synthetic-plan-receipt" },
    { producer_kind: "HOST" },
  );
  const state = applyEvents(initial, [planVerified]);

  const { state: routedState, ...decision } = routeNext(state);
  assert.deepEqual(decision, {
    guard: "P5_RESOURCE_EXHAUSTION",
    next: "RESOURCE_EXHAUSTED",
    terminal: true,
  });
  assert.equal(routedState.integrity.terminal, "RESOURCE_EXHAUSTED");
});
