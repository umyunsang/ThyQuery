import { applyEvents } from "./reducer.mjs";

const SENSITIVE_KEY = /(answer|credential|email|identifier|name|original_query|password|secret|token)/i;

function redact(value, path = []) {
  if (Array.isArray(value)) {
    return value.map((item, index) => redact(item, [...path, String(index)]));
  }
  if (value && typeof value === "object") {
    const result = {};
    for (const [key, item] of Object.entries(value)) {
      result[key] = SENSITIVE_KEY.test(key) && !key.endsWith("_digest")
        ? "[REDACTED]"
        : redact(item, [...path, key]);
    }
    return result;
  }
  return value;
}

export function projectTrace(state) {
  return redact({
    invocation_id: state.invocation.invocation_id,
    host: state.invocation.host,
    original_query_digest: state.invocation.original_query_digest,
    contract_digest: state.contract.digest,
    contract_version: state.contract.version,
    evidence_count: state.evidence.records.length,
    open_gap_count: state.gaps.filter((gap) => gap.status !== "RESOLVED").length,
    transition_remaining: state.budgets.transition_remaining,
    state_version: state.integrity.state_version,
    state_hash: state.integrity.state_hash,
    terminal: state.integrity.terminal,
    handoff_outcome: state.handoff.outcome,
    native_plan_count: state.handoff.plan_count,
  });
}

export function replayEvents(initialState, events, options = {}) {
  if (options.effect_sink) {
    throw new TypeError("Verification replay cannot receive an effect sink");
  }
  const state = applyEvents(initialState, events);
  return {
    state,
    trace: projectTrace(state),
    effects: [],
  };
}
