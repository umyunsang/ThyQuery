# ThyQuery Product Contract v1

## Purpose

Convert an explicit, materially ambiguous request into a decision-sufficient, evidence-linked intent contract before exactly one stock native Plan artifact is observed. ThyQuery does not execute the plan and does not claim exhaustive access to tacit knowledge.

Two terms carry weight throughout and are defined here rather than left to judgment:

- **Material** means capable of changing the contract or the resulting plan. A gap, ambiguity, fact, or contradiction is material when resolving it differently would produce a different plan; otherwise it is not, however interesting it may be. This is the test the action and evidence policies apply when selecting a gap or deciding whether to research.
- **Decision-sufficient** is not "complete". It means the contract carries enough resolved intent for the native planner to produce a plan the user has authorized, with whatever remains open enumerated and explicitly accepted rather than hidden. Its operational definition is the closure policy: either the resolved-closure conjunction or an accepted residual ledger. Nothing else certifies sufficiency.

## Entry contract

1. Invocation is explicit and host-native.
2. Stock Plan evidence must be verified before any refinement action.
3. Missing or unverifiable Plan evidence terminates as `PLAN_MODE_REQUIRED` with no side effect.
4. Ordinary prompts and other commands are outside ThyQuery.

A direct refinement proposal received before verified Plan evidence is not committed; the reducer records only the derived `PLAN_MODE_REQUIRED` terminal.

## Authority contract

- The user owns preferences, commitments, scope, risk acceptance, and residual acceptance.
- Primary evidence owns only external factual support; it cannot silently become a user requirement.
- Model or node output is a proposal. Only validated events committed by the canonical reducer change state.
- A contract change invalidates every prior closure and residual acceptance bound to the old digest.

## Success contract

`EPISTEMIC_CLOSED` requires every closure conjunct in `closure-policy.v1.md` and a validated native `USER` receipt explicitly accepting the current contract digest. `ACCEPTED_RESIDUAL` requires an enumerated, current-digest residual ledger with impact, mitigation, reversibility, owner, per-item `EXPLICITLY_ACCEPTED` disposition, and a validated native `USER` receipt confirming authority and comprehension. A controller, model proposal, source string, or boolean cannot substitute for either receipt.

Only those two outcomes may create one logical handoff intent. A successful product trace ends only after one operationally native plan is observed as `COMPLETE_AFTER_PLAN`. This is an operational observation, not a claim of exclusive token authorship or distributed exactly-once delivery.

**In v1 only one of the two is reachable.** Resolved closure requires a calibration valid for the current task, risk, and language stratum, and no such calibration exists in this release, so `EPISTEMIC_CLOSED` cannot be reached and `ACCEPTED_RESIDUAL` is the only success outcome a correct run can produce. Both are specified above because the contract outlives the release, but a v1 trace that reports resolved closure is wrong. See the calibration status in `closure-policy.v1.md`.

This is not a degraded mode. The residual path is the one whose conditions cannot be invented: a recomputed ledger digest, a contract-digest identity, and a user receipt with confirmed authority and comprehension are all checkable, whereas resolved closure additionally depends on thresholds that do not yet exist.

## Non-success contract

`PLAN_MODE_REQUIRED`, `CANCELLED`, `BLOCKED`, `STALLED`, `RESOURCE_EXHAUSTED`, `STATE_CORRUPT`, `HOST_CAPABILITY_CONTRADICTION`, and `HANDOFF_OUTCOME_UNKNOWN` authorize no plan handoff. Cap, stability, repetition, fatigue, silence, or model-authored completion text never upgrades a non-success.

A host-authenticated `NOT_APPLIED` handoff outcome becomes absorbing `BLOCKED`; it cannot later be rewritten as `APPLIED`. Once a handoff intent is fenced, any later refinement is an integrity failure rather than a contract mutation.

## Runtime boundary

The shipped candidates are self-contained instruction skills. `src/reference/` is a model-free development oracle and is not a runtime dependency. Failure of later instruction-first live conformance requires a design revision; it does not authorize silently adding a helper, hook, persistence layer, or external graph runtime.
