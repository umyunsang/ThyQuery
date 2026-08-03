import { evaluateGuards } from "./guards.mjs";
import { makeEvent, reduceEvent } from "./reducer.mjs";

const DERIVED_PRODUCT_TERMINALS = new Set([
  "PLAN_MODE_REQUIRED",
  "BLOCKED",
  "STALLED",
  "RESOURCE_EXHAUSTED",
  "STATE_CORRUPT",
]);

export function routeNext(state) {
  let decision = evaluateGuards(state);
  let nextState = state;

  if (
    !state.integrity.terminal &&
    decision.terminal === true &&
    DERIVED_PRODUCT_TERMINALS.has(decision.next)
  ) {
    nextState = reduceEvent(
      state,
      makeEvent(
        state,
        "ROUTE_TERMINAL_RECORDED",
        { kind: decision.next, guard: decision.guard },
        { producer_kind: "REFERENCE" },
      ),
    );
    decision = evaluateGuards(nextState);
  }

  return { ...decision, state: nextState };
}
