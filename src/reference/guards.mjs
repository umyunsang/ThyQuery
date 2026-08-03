import { digest } from "./canonicalize.mjs";

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

function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isEpistemicallyClosed(state) {
  const receipt = state.closure.acceptance_receipt;
  return (
    CLOSURE_FLAGS.every((field) => state.closure[field] === true) &&
    state.closure.acceptance_contract_digest === state.contract.digest &&
    receipt?.producer_kind === "USER" &&
    nonEmptyString(receipt.source_ref) &&
    /^sha256:[0-9a-f]{64}$/.test(receipt.content_digest ?? "") &&
    receipt.authority_confirmed === true &&
    receipt.comprehension_confirmed === true
  );
}

export function isResidualAccepted(state) {
  const acceptance = state.residual_acceptance;
  return Boolean(
    acceptance &&
      acceptance.explicit === true &&
      acceptance.acceptance_producer_kind === "USER" &&
      nonEmptyString(acceptance.acceptance_source_ref) &&
      /^sha256:[0-9a-f]{64}$/.test(
        acceptance.acceptance_content_digest ?? "",
      ) &&
      acceptance.authority_confirmed === true &&
      acceptance.comprehension_confirmed === true &&
      acceptance.contract_digest === state.contract.digest &&
      Array.isArray(acceptance.residuals) &&
      acceptance.residuals.length > 0 &&
      acceptance.residual_ledger_digest === digest(acceptance.residuals) &&
      acceptance.residuals.every(
        (item) =>
          nonEmptyString(item.residual_id) &&
          nonEmptyString(item.impact) &&
          nonEmptyString(item.mitigation) &&
          nonEmptyString(item.reversibility) &&
          nonEmptyString(item.owner) &&
          item.provenance &&
          nonEmptyString(item.provenance.source_ref) &&
          item.provenance.disposition === "EXPLICITLY_ACCEPTED",
      ),
  );
}

function result(guard, next, terminal = false, details = undefined) {
  const value = { guard, next, terminal };
  if (details !== undefined) value.details = details;
  return value;
}

function terminalGuard(state) {
  if (!state.integrity.terminal) return null;
  const mapping = {
    CANCELLED: "P0_CANCEL_EFFECT_FENCE",
    STATE_CORRUPT: "P1_INTEGRITY_ABSORPTION",
    HOST_CAPABILITY_CONTRADICTION: "P2_HOST_NON_WAIVABLE",
    PLAN_MODE_REQUIRED: "P2_HOST_NON_WAIVABLE",
    EPISTEMIC_CLOSED: "P3_RESOLVED",
    ACCEPTED_RESIDUAL: "P4_ACCEPTED_RESIDUAL",
    RESOURCE_EXHAUSTED: "P5_RESOURCE_EXHAUSTION",
    STALLED: "P6_PROGRESS_FAILURE",
    BLOCKED: "P7_UNCERTAINTY_OWNER",
    HANDOFF_OUTCOME_UNKNOWN: "P0_CANCEL_EFFECT_FENCE",
    COMPLETE_AFTER_PLAN: "P0_CANCEL_EFFECT_FENCE",
  };
  return result(
    mapping[state.integrity.terminal] ?? "P1_INTEGRITY_ABSORPTION",
    state.integrity.terminal,
    true,
  );
}

export function evaluateGuards(state) {
  const absorbed = terminalGuard(state);
  if (absorbed) return absorbed;

  if (state.invocation.lifecycle === "CANCELLED") {
    return result("P0_CANCEL_EFFECT_FENCE", "CANCELLED", true);
  }
  if (state.handoff.effect_fence_violation) {
    return result("P0_CANCEL_EFFECT_FENCE", "STATE_CORRUPT", true, {
      reason: "EFFECT_FENCE_VIOLATION",
    });
  }
  if (state.integrity.failures.length > 0) {
    return result("P1_INTEGRITY_ABSORPTION", "STATE_CORRUPT", true);
  }
  if (!state.plan_preflight.verified) {
    return result("P2_HOST_NON_WAIVABLE", "PLAN_MODE_REQUIRED", true);
  }
  if (state.handoff.intent) {
    if (state.handoff.outcome === "NOT_APPLIED") {
      return result("P0_CANCEL_EFFECT_FENCE", "BLOCKED", true, {
        reason: "HANDOFF_NOT_APPLIED",
      });
    }
    return result("P0_CANCEL_EFFECT_FENCE", "OBSERVE_NATIVE_PLAN", false, {
      handoff_key: state.handoff.intent.handoff_key,
    });
  }
  if (isEpistemicallyClosed(state)) {
    return result("P3_RESOLVED", "EPISTEMIC_CLOSED", false);
  }
  if (isResidualAccepted(state)) {
    return result("P4_ACCEPTED_RESIDUAL", "ACCEPTED_RESIDUAL", false);
  }
  if (state.budgets.transition_remaining <= 0) {
    return result("P5_RESOURCE_EXHAUSTION", "RESOURCE_EXHAUSTED", true);
  }
  if (
    state.progress.exact_repeat ||
    state.progress.oscillation ||
    state.progress.semantic_stall ||
    state.progress.unproductive_scc
  ) {
    return result("P6_PROGRESS_FAILURE", "STALLED", true);
  }

  const gap = [...state.gaps]
    .filter((candidate) => candidate.status !== "RESOLVED")
    .sort(
      (left, right) =>
        (right.materiality ?? 0) - (left.materiality ?? 0) ||
        String(left.gap_id).localeCompare(String(right.gap_id)),
    )[0];
  if (gap) {
    const ownerRoutes = {
      USER: "ASK_USER",
      EXTERNAL: "RESEARCH_EVIDENCE",
      FRAME: "CHALLENGE_FRAME",
      SHARED: "PROPOSE_INTERPRETATIONS",
    };
    const next = ownerRoutes[gap.owner] ?? "BLOCKED";
    return result(
      "P7_UNCERTAINTY_OWNER",
      next,
      next === "BLOCKED",
      { gap_id: gap.gap_id },
    );
  }

  const action = [...state.action_space]
    .filter((candidate) => {
      if (candidate.enabled === false) return false;
      const netValue =
        candidate.net_value ??
        (candidate.expected_loss_reduction ?? 0) - (candidate.user_burden ?? 0);
      return Number.isFinite(netValue) && netValue > 0;
    })
    .sort(
      (left, right) =>
        (right.expected_loss_reduction ?? 0) -
          (left.expected_loss_reduction ?? 0) ||
        (left.user_burden ?? 0) - (right.user_burden ?? 0) ||
        String(left.edge_id).localeCompare(String(right.edge_id)),
    )[0];
  if (action) {
    return result("P8_ACTION_RANKING", action.next, false, {
      edge_id: action.edge_id,
    });
  }

  return result("P7_UNCERTAINTY_OWNER", "BLOCKED", true, {
    reason: "NO_JUSTIFIED_NEXT_ACTION",
  });
}
