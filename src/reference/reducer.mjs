import { digest } from "./canonicalize.mjs";
import {
  evaluateGuards,
  isEpistemicallyClosed,
  isResidualAccepted,
} from "./guards.mjs";

export const STATE_SCHEMA_VERSION = "thyquery.state.v1";
export const EVENT_SCHEMA_VERSION = "thyquery.event.v1";
export const POLICY_VERSION = "thyquery.policy.v1";
export const REDUCER_VERSION = "thyquery.reducer.v1";

const ACTIVE_MACROSTEP_EVENTS = new Set([
  "USER_RESPONSE_RECORDED",
  "EVIDENCE_RECORDED",
  "CONTRACT_DELTA_COMMITTED",
  "FRAME_CHALLENGE_RECORDED",
  "RESIDUAL_ACCEPTED",
]);

const REFINEMENT_EVENTS = new Set([
  "GAP_RECORDED",
  "GAP_RESOLVED",
  "ACTION_PROPOSED",
  ...ACTIVE_MACROSTEP_EVENTS,
  "CLOSURE_RECOMPUTED",
  "STALL_RECORDED",
]);

const TERMINAL_KINDS = new Set([
  "PLAN_MODE_REQUIRED",
  "CANCELLED",
  "BLOCKED",
  "STALLED",
  "RESOURCE_EXHAUSTED",
  "STATE_CORRUPT",
  "HOST_CAPABILITY_CONTRADICTION",
  "HANDOFF_OUTCOME_UNKNOWN",
  "COMPLETE_AFTER_PLAN",
]);

const ROUTABLE_TERMINAL_KINDS = new Set([
  "PLAN_MODE_REQUIRED",
  "BLOCKED",
  "STALLED",
  "RESOURCE_EXHAUSTED",
  "STATE_CORRUPT",
]);

const CLOSURE_PREDICATE_FIELDS = [
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

const CLOSURE_FIELDS = new Set(CLOSURE_PREDICATE_FIELDS);

const STALL_FIELDS = new Set([
  "exact_repeat",
  "oscillation",
  "semantic_stall",
  "unproductive_scc",
]);

const EVIDENCE_DISPOSITIONS = new Set([
  "directly_supported",
  "contradicts_premise",
  "near_match_only",
  "insufficient",
]);

function isPlainObject(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.getPrototypeOf(value) === Object.prototype,
  );
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validProvenance(value) {
  return Boolean(
    isPlainObject(value) &&
      isNonEmptyString(value.kind) &&
      isNonEmptyString(value.source_ref) &&
      isNonEmptyString(value.disposition),
  );
}

function contractDigest(contract) {
  return digest({
    version: contract.version,
    fields: contract.fields,
    provenance: contract.provenance,
    residuals: contract.residuals,
    supersessions: contract.supersessions,
  });
}

function userResponseFingerprint(payload) {
  return digest({
    content_digest: payload.content_digest,
    disposition: payload.disposition,
    material_targets: [...payload.material_targets].sort(),
    acceptance: payload.acceptance ?? null,
  });
}

function isExactRepeatedUserResponse(state, payload) {
  const fingerprint = userResponseFingerprint(payload);
  return Boolean(
    state.contract.provenance.some(
      (item) =>
        item.kind === "USER_RESPONSE" &&
        item.response_fingerprint === fingerprint,
    ) || state.closure.acceptance_receipt?.response_fingerprint === fingerprint,
  );
}

function validResolvedAcceptance(state, payload) {
  const acceptance = payload.acceptance;
  if (acceptance === undefined) return true;
  return Boolean(
    isPlainObject(acceptance) &&
      Object.keys(acceptance).length === 4 &&
      acceptance.kind === "RESOLVED" &&
      acceptance.contract_digest === state.contract.digest &&
      acceptance.authority_confirmed === true &&
      acceptance.comprehension_confirmed === true &&
      payload.disposition === "CONFIRMED" &&
      payload.material_targets.includes("contract.acceptance") &&
      CLOSURE_PREDICATE_FIELDS.every(
        (field) => state.closure[field] === true,
      )
  );
}

function validResidualAcceptance(state, event) {
  const { payload } = event;
  return Boolean(
    event.producer_kind === "USER" &&
      payload.explicit === true &&
      payload.contract_digest === state.contract.digest &&
      Array.isArray(payload.residuals) &&
      payload.residuals.length > 0 &&
      payload.residual_ledger_digest === digest(payload.residuals) &&
      isNonEmptyString(payload.acceptance_source_ref) &&
      /^sha256:[0-9a-f]{64}$/.test(
        payload.acceptance_content_digest ?? "",
      ) &&
      payload.authority_confirmed === true &&
      payload.comprehension_confirmed === true &&
      payload.residuals.every(
        (item) =>
          isPlainObject(item) &&
          isNonEmptyString(item.residual_id) &&
          isNonEmptyString(item.impact) &&
          isNonEmptyString(item.mitigation) &&
          isNonEmptyString(item.reversibility) &&
          isNonEmptyString(item.owner) &&
          isPlainObject(item.provenance) &&
          isNonEmptyString(item.provenance.source_ref) &&
          item.provenance.disposition === "EXPLICITLY_ACCEPTED",
      )
  );
}

function activeMacrostepPayloadIsValid(state, event) {
  const { payload } = event;
  switch (event.event_type) {
    case "USER_RESPONSE_RECORDED":
      return (
        event.producer_kind === "USER" &&
        isNonEmptyString(payload.source_ref) &&
        new Set(["CONFIRMED", "CORRECTED", "REJECTED", "DEFERRED"]).has(
          payload.disposition,
        ) &&
        /^sha256:[0-9a-f]{64}$/.test(payload.content_digest ?? "") &&
        Array.isArray(payload.material_targets) &&
        payload.material_targets.length > 0 &&
        payload.material_targets.every((target) => isNonEmptyString(target)) &&
        new Set(payload.material_targets).size === payload.material_targets.length &&
        validResolvedAcceptance(state, payload)
      );
    case "EVIDENCE_RECORDED":
      return (
        isNonEmptyString(payload.evidence_id) &&
        isNonEmptyString(payload.source_ref) &&
        (isNonEmptyString(payload.claim) || isNonEmptyString(payload.finding)) &&
        isNonEmptyString(payload.retrieval_scope) &&
        isNonEmptyString(payload.applicability) &&
        isNonEmptyString(payload.freshness) &&
        isNonEmptyString(payload.confidence_limits) &&
        EVIDENCE_DISPOSITIONS.has(payload.disposition) &&
        Array.isArray(event.evidence_refs) &&
        event.evidence_refs.includes(payload.source_ref)
      );
    case "CONTRACT_DELTA_COMMITTED": {
      if (!isPlainObject(payload.fields) || Object.keys(payload.fields).length === 0) return false;
      if (payload.provenance !== undefined && !validProvenance(payload.provenance)) return false;
      return Object.entries(payload.fields).some(
        ([field, value]) =>
          !Object.hasOwn(state.contract.fields, field) ||
          digest(value) !== digest(state.contract.fields[field]),
      );
    }
    case "FRAME_CHALLENGE_RECORDED":
      return (
        isNonEmptyString(payload.challenge_id) &&
        isNonEmptyString(payload.source_ref) &&
        isNonEmptyString(payload.disposition)
      );
    case "RESIDUAL_ACCEPTED":
      return validResidualAcceptance(state, event);
    default:
      return true;
  }
}

function validateContractSupersessions(state, payload) {
  const changedExistingFields = Object.entries(payload.fields)
    .filter(
      ([field, value]) =>
        Object.hasOwn(state.contract.fields, field) &&
        digest(value) !== digest(state.contract.fields[field]),
    )
    .map(([field]) => field);
  const supersessions = payload.supersessions ?? [];
  if (!Array.isArray(supersessions)) return "CONTRACT_SUPERSESSION_INVALID";

  for (const supersession of supersessions) {
    if (
      !isPlainObject(supersession) ||
      !isNonEmptyString(supersession.field) ||
      !isNonEmptyString(supersession.prior_value_digest) ||
      !isNonEmptyString(supersession.source_ref) ||
      !isNonEmptyString(supersession.reason) ||
      !Array.isArray(supersession.invalidated_dependents) ||
      supersession.invalidated_dependents.some((field) => !isNonEmptyString(field)) ||
      !changedExistingFields.includes(supersession.field) ||
      supersession.prior_value_digest !== digest(state.contract.fields[supersession.field])
    ) {
      return "CONTRACT_SUPERSESSION_INVALID";
    }
  }

  const supersededFields = new Set(supersessions.map((item) => item.field));
  if (changedExistingFields.some((field) => !supersededFields.has(field))) {
    return "CONTRACT_SUPERSESSION_REQUIRED";
  }
  return null;
}

function clone(value) {
  return structuredClone(value);
}

function hashableState(state) {
  const copy = clone(state);
  copy.integrity.state_hash = "";
  return copy;
}

export function computeStateHash(state) {
  return digest(hashableState(state));
}

function withStateHash(state) {
  const copy = clone(state);
  copy.integrity.state_hash = computeStateHash(copy);
  return copy;
}

function initialClosure() {
  return {
    graph_ok: false,
    philosophical_ok: false,
    coverage_ok: false,
    risk_ok: false,
    conflict_ok: false,
    stable_ok: false,
    voi_ok: false,
    cal_ok: false,
    plan_input_ready: false,
    no_unauthorized_intent_drift: false,
    acceptance_contract_digest: null,
    acceptance_receipt: null,
  };
}

export function createInitialState({
  invocation_id,
  original_query,
  host,
  transition_budget = 12,
}) {
  if (!invocation_id || !original_query || !host) {
    throw new TypeError("invocation_id, original_query, and host are required");
  }
  if (!Number.isSafeInteger(transition_budget) || transition_budget < 0) {
    throw new TypeError("transition_budget must be a non-negative safe integer");
  }

  const contract = {
    version: 0,
    fields: {},
    provenance: [],
    residuals: [],
    supersessions: [],
  };
  contract.digest = contractDigest(contract);

  return withStateHash({
    schema_version: STATE_SCHEMA_VERSION,
    policy_version: POLICY_VERSION,
    reducer_version: REDUCER_VERSION,
    invocation: {
      invocation_id,
      host,
      original_query_digest: digest(original_query),
      lifecycle: "ACTIVE",
    },
    plan_preflight: {
      verified: false,
      receipt: null,
    },
    contract,
    evidence: {
      records: [],
    },
    gaps: [],
    action_space: [],
    closure: initialClosure(),
    residual_acceptance: null,
    budgets: {
      transition_initial: transition_budget,
      transition_remaining: transition_budget,
    },
    progress: {
      active_macrosteps: 0,
      exact_repeat: false,
      oscillation: false,
      semantic_stall: false,
      unproductive_scc: false,
    },
    handoff: {
      intent: null,
      receipt: null,
      outcome: "NONE",
      plan_count: 0,
      effect_fence_violation: false,
    },
    privacy: {
      trace_projection: "MINIMUM_DISCLOSURE",
      persistence: "NONE",
    },
    integrity: {
      state_version: 0,
      state_hash: "",
      idempotency: {},
      event_ids: [],
      failures: [],
      terminal: null,
    },
  });
}

function eventPayloadDigest(event) {
  return digest({
    event_type: event.event_type,
    payload: event.payload,
    evidence_refs: event.evidence_refs,
    producer_kind: event.producer_kind,
    schema_version: event.schema_version,
    policy_version: event.policy_version,
    reducer_version: event.reducer_version,
  });
}

export function makeEvent(state, event_type, payload = {}, options = {}) {
  const nextSequence = state.integrity.state_version + 1;
  return {
    schema_version: EVENT_SCHEMA_VERSION,
    policy_version: POLICY_VERSION,
    reducer_version: REDUCER_VERSION,
    event_id:
      options.event_id ??
      `${state.invocation.invocation_id}:${nextSequence}:${event_type}`,
    invocation_id: state.invocation.invocation_id,
    sequence: nextSequence,
    expected_state_version: state.integrity.state_version,
    expected_state_hash: state.integrity.state_hash,
    idempotency_key:
      options.idempotency_key ??
      `${state.invocation.invocation_id}:${nextSequence}:${event_type}`,
    producer_kind: options.producer_kind ?? "REFERENCE",
    evidence_refs: options.evidence_refs ?? [],
    event_type,
    payload,
  };
}

function corrupt(state, code, event) {
  const next = clone(state);
  next.integrity.failures.push({
    code,
    event_id: event?.event_id ?? null,
  });
  next.integrity.terminal = "STATE_CORRUPT";
  next.invocation.lifecycle = "TERMINAL";
  next.integrity.state_version += 1;
  return withStateHash(next);
}

function validateEventEnvelope(state, event) {
  if (!isPlainObject(event) || !isPlainObject(event.payload)) {
    return "EVENT_ENVELOPE_INVALID";
  }
  if (
    event.schema_version !== EVENT_SCHEMA_VERSION ||
    event.policy_version !== POLICY_VERSION ||
    event.reducer_version !== REDUCER_VERSION
  ) {
    return "VERSION_MISMATCH";
  }
  if (event.invocation_id !== state.invocation.invocation_id) {
    return "INVOCATION_MISMATCH";
  }
  if (!event.event_id || !event.idempotency_key || !event.event_type) {
    return "EVENT_ENVELOPE_INVALID";
  }
  return null;
}

function applyEventPayload(next, event) {
  const { payload } = event;
  if (ACTIVE_MACROSTEP_EVENTS.has(event.event_type)) {
    if (!activeMacrostepPayloadIsValid(next, event)) return "ACTIVE_MACROSTEP_INVALID";
  }
  switch (event.event_type) {
    case "PLAN_PREFLIGHT_RECORDED":
      if (
        typeof payload.verified !== "boolean" ||
        (payload.verified === true &&
          (event.producer_kind !== "HOST" || !isNonEmptyString(payload.receipt))) ||
        (payload.verified === false && payload.receipt != null)
      ) {
        return "PLAN_PREFLIGHT_INVALID";
      }
      next.plan_preflight = {
        verified: payload.verified,
        receipt: payload.receipt ?? null,
      };
      break;
    case "CANCEL_REQUESTED":
      next.invocation.lifecycle = "CANCELLED";
      next.integrity.terminal = "CANCELLED";
      break;
    case "HOST_CAPABILITY_CONTRADICTION_RECORDED":
      next.integrity.failures.push({
        code: "HOST_CAPABILITY_CONTRADICTION",
        event_id: event.event_id,
      });
      next.integrity.terminal = "HOST_CAPABILITY_CONTRADICTION";
      next.invocation.lifecycle = "TERMINAL";
      break;
    case "GAP_RECORDED":
      next.gaps.push(clone(payload));
      break;
    case "GAP_RESOLVED": {
      const gap = next.gaps.find((candidate) => candidate.gap_id === payload.gap_id);
      if (gap) gap.status = "RESOLVED";
      break;
    }
    case "ACTION_PROPOSED":
      next.action_space.push(clone(payload));
      break;
    case "USER_RESPONSE_RECORDED":
      if (payload.acceptance) {
        next.closure.acceptance_contract_digest =
          payload.acceptance.contract_digest;
        next.closure.acceptance_receipt = {
          producer_kind: "USER",
          source_ref: payload.source_ref,
          content_digest: payload.content_digest,
          response_fingerprint: userResponseFingerprint(payload),
          authority_confirmed: payload.acceptance.authority_confirmed,
          comprehension_confirmed:
            payload.acceptance.comprehension_confirmed,
        };
      } else {
        next.contract.provenance.push({
          kind: "USER_RESPONSE",
          source_ref: payload.source_ref,
          disposition: payload.disposition,
          content_digest: payload.content_digest,
          material_targets: clone(payload.material_targets),
          response_fingerprint: userResponseFingerprint(payload),
        });
        next.contract.digest = contractDigest(next.contract);
        next.closure = initialClosure();
        next.residual_acceptance = null;
      }
      break;
    case "EVIDENCE_RECORDED":
      next.evidence.records.push(clone(payload));
      next.closure = initialClosure();
      next.residual_acceptance = null;
      break;
    case "FRAME_CHALLENGE_RECORDED":
      next.contract.provenance.push({
        kind: "FRAME_CHALLENGE",
        source_ref: payload.source_ref ?? event.event_id,
        disposition: payload.disposition ?? "OPEN",
      });
      next.contract.digest = contractDigest(next.contract);
      next.closure = initialClosure();
      next.residual_acceptance = null;
      break;
    case "CONTRACT_DELTA_COMMITTED": {
      const supersessionFailure = validateContractSupersessions(next, payload);
      if (supersessionFailure) return supersessionFailure;
      const revisedFields = { ...next.contract.fields };
      for (const supersession of payload.supersessions ?? []) {
        for (const dependent of supersession.invalidated_dependents) {
          if (!Object.hasOwn(payload.fields, dependent)) delete revisedFields[dependent];
        }
        next.contract.supersessions.push({
          ...clone(supersession),
          superseded_at_version: next.contract.version,
          event_id: event.event_id,
        });
      }
      next.contract.fields = { ...revisedFields, ...payload.fields };
      next.contract.version += 1;
      if (payload.provenance) {
        next.contract.provenance.push(clone(payload.provenance));
      }
      next.contract.digest = contractDigest(next.contract);
      next.closure = initialClosure();
      next.residual_acceptance = null;
      break;
    }
    case "CLOSURE_RECOMPUTED":
      if (
        Object.keys(payload).length !== CLOSURE_PREDICATE_FIELDS.length ||
        Object.keys(payload).some((field) => !CLOSURE_FIELDS.has(field)) ||
        CLOSURE_PREDICATE_FIELDS.some(
          (field) => typeof payload[field] !== "boolean",
        )
      ) {
        return "CLOSURE_PAYLOAD_INVALID";
      }
      next.closure = {
        ...initialClosure(),
        ...clone(payload),
      };
      break;
    case "RESIDUAL_ACCEPTED":
      next.closure = initialClosure();
      next.residual_acceptance = {
        ...clone(payload),
        acceptance_producer_kind: "USER",
      };
      break;
    case "STALL_RECORDED":
      if (
        Object.keys(payload).length === 0 ||
        Object.keys(payload).some((field) => !STALL_FIELDS.has(field)) ||
        Object.values(payload).some((value) => typeof value !== "boolean") ||
        !Object.values(payload).some((value) => value === true)
      ) {
        return "STALL_PAYLOAD_INVALID";
      }
      next.progress = {
        ...next.progress,
        ...clone(payload),
      };
      break;
    case "HANDOFF_INTENT_RECORDED":
      if (
        payload.contract_digest !== next.contract.digest ||
        payload.handoff_key !==
          digest({
            invocation_id: next.invocation.invocation_id,
            contract_digest: next.contract.digest,
          }) ||
        !(
          (payload.authorization_kind === "EPISTEMIC_CLOSED" &&
            isEpistemicallyClosed(next)) ||
          (payload.authorization_kind === "ACCEPTED_RESIDUAL" &&
            isResidualAccepted(next))
        )
      ) {
        return "UNAUTHORIZED_HANDOFF";
      }
      if (
        next.handoff.intent &&
        next.handoff.intent.handoff_key !== payload.handoff_key
      ) {
        return "HANDOFF_ALREADY_FENCED";
      }
      next.handoff.intent ??= clone(payload);
      break;
    case "HANDOFF_OUTCOME_RECORDED":
      if (!next.handoff.intent) return "HANDOFF_NOT_AUTHORIZED";
      if (!new Set(["APPLIED", "NOT_APPLIED", "UNKNOWN"]).has(payload.outcome)) {
        return "HANDOFF_OUTCOME_INVALID";
      }
      if (
        payload.handoff_key !== next.handoff.intent.handoff_key ||
        payload.contract_digest !== next.handoff.intent.contract_digest ||
        payload.contract_digest !== next.contract.digest ||
        (payload.outcome !== "UNKNOWN" &&
          (event.producer_kind !== "HOST" || !isNonEmptyString(payload.receipt)))
      ) {
        return "HANDOFF_OUTCOME_INVALID";
      }
      next.handoff.outcome = payload.outcome;
      next.handoff.receipt = payload.receipt ?? null;
      if (payload.outcome === "UNKNOWN") {
        next.integrity.terminal = "HANDOFF_OUTCOME_UNKNOWN";
        next.invocation.lifecycle = "TERMINAL";
      } else if (payload.outcome === "NOT_APPLIED") {
        next.integrity.terminal = "BLOCKED";
        next.invocation.lifecycle = "TERMINAL";
      }
      break;
    case "NATIVE_PLAN_OBSERVED":
      if (!next.handoff.intent || next.handoff.outcome === "UNKNOWN") {
        return "NATIVE_PLAN_WITHOUT_HANDOFF";
      }
      if (next.handoff.outcome === "NOT_APPLIED") {
        return "NATIVE_PLAN_AFTER_NOT_APPLIED";
      }
      if (
        event.producer_kind !== "HOST" ||
        !isNonEmptyString(payload.receipt) ||
        payload.handoff_key !== next.handoff.intent.handoff_key ||
        payload.contract_digest !== next.handoff.intent.contract_digest ||
        payload.contract_digest !== next.contract.digest
      ) {
        return "NATIVE_PLAN_OBSERVATION_INVALID";
      }
      next.handoff.plan_count += 1;
      next.handoff.outcome = "APPLIED";
      next.handoff.receipt = payload.receipt ?? next.handoff.receipt;
      next.integrity.terminal =
        next.handoff.plan_count === 1 ? "COMPLETE_AFTER_PLAN" : "STATE_CORRUPT";
      next.invocation.lifecycle = "TERMINAL";
      if (next.handoff.plan_count !== 1) {
        next.integrity.failures.push({
          code: "MULTIPLE_NATIVE_PLANS",
          event_id: event.event_id,
        });
      }
      break;
    case "EFFECT_FENCE_VIOLATION_RECORDED":
      next.handoff.effect_fence_violation = true;
      next.integrity.failures.push({
        code: "EFFECT_FENCE_VIOLATION",
        event_id: event.event_id,
      });
      next.integrity.terminal = "STATE_CORRUPT";
      next.invocation.lifecycle = "TERMINAL";
      break;
    case "ROUTE_TERMINAL_RECORDED": {
      const decision = evaluateGuards(next);
      if (
        !ROUTABLE_TERMINAL_KINDS.has(payload.kind) ||
        decision.terminal !== true ||
        decision.next !== payload.kind ||
        decision.guard !== payload.guard
      ) {
        return "ROUTE_TERMINAL_INVALID";
      }
      next.integrity.terminal = payload.kind;
      next.invocation.lifecycle = "TERMINAL";
      break;
    }
    default:
      return "UNKNOWN_EVENT_TYPE";
  }
  return null;
}

function commitEventMetadata(next, event, payloadDigest) {
  next.integrity.state_version += 1;
  next.integrity.event_ids.push(event.event_id);
  next.integrity.idempotency[event.idempotency_key] = {
    event_id: event.event_id,
    payload_digest: payloadDigest,
  };
  return withStateHash(next);
}

export function reduceEvent(state, event) {
  if (state.integrity.terminal || state.invocation.lifecycle !== "ACTIVE") {
    return state;
  }

  const envelopeFailure = validateEventEnvelope(state, event);
  if (envelopeFailure) return corrupt(state, envelopeFailure, event);

  const payloadDigest = eventPayloadDigest(event);
  const prior = state.integrity.idempotency[event.idempotency_key];
  if (prior) {
    return prior.payload_digest === payloadDigest
      ? state
      : corrupt(state, "KEY_COLLISION", event);
  }

  if (
    event.expected_state_version !== state.integrity.state_version ||
    event.expected_state_hash !== state.integrity.state_hash ||
    event.sequence !== state.integrity.state_version + 1
  ) {
    return corrupt(state, "PREDECESSOR_MISMATCH", event);
  }

  if (REFINEMENT_EVENTS.has(event.event_type) && !state.plan_preflight.verified) {
    const decision = evaluateGuards(state);
    return reduceEvent(
      state,
      makeEvent(
        state,
        "ROUTE_TERMINAL_RECORDED",
        { kind: decision.next, guard: decision.guard },
        { producer_kind: "REFERENCE" },
      ),
    );
  }

  if (state.handoff.intent && REFINEMENT_EVENTS.has(event.event_type)) {
    return corrupt(state, "REFINEMENT_AFTER_HANDOFF", event);
  }

  if (
    event.event_type === "USER_RESPONSE_RECORDED" &&
    activeMacrostepPayloadIsValid(state, event) &&
    isExactRepeatedUserResponse(state, event.payload)
  ) {
    const repeated = clone(state);
    repeated.progress.exact_repeat = true;
    return commitEventMetadata(repeated, event, payloadDigest);
  }

  const next = clone(state);
  const payloadFailure = applyEventPayload(next, event);
  if (payloadFailure) return corrupt(state, payloadFailure, event);

  if (ACTIVE_MACROSTEP_EVENTS.has(event.event_type)) {
    if (next.budgets.transition_remaining <= 0) {
      return corrupt(state, "BUDGET_UNDERFLOW", event);
    }
    next.budgets.transition_remaining -= 1;
    next.progress.active_macrosteps += 1;
    next.progress.exact_repeat = false;
    next.progress.oscillation = false;
    next.progress.semantic_stall = false;
    next.progress.unproductive_scc = false;
  }

  if (
    next.integrity.terminal &&
    !TERMINAL_KINDS.has(next.integrity.terminal)
  ) {
    return corrupt(state, "UNKNOWN_TERMINAL", event);
  }
  return commitEventMetadata(next, event, payloadDigest);
}

export function applyEvents(initialState, events) {
  return events.reduce((state, event) => reduceEvent(state, event), initialState);
}
