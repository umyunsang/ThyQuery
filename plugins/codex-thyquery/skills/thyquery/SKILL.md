---
name: thyquery
description: Use only when the user explicitly invokes $thyquery with a request in an already-active Codex Plan session and wants material ambiguity, tacit implications, evidence needs, and residual risk resolved before one native plan. Do not use for ordinary prompts, mode switching, implementation, or plan execution.
---

# ThyQuery for Codex

Run a bounded intent-resolution layer before the active stock Plan behavior. Preserve user authority, use Codex-native Plan interactions, authorize at most one plan handoff, and stop after the plan. This skill is instruction-only; never claim that the development reference controller runs inside Codex.

## Load the contract

Before acting, read these local references:

1. [protocol snapshot](references/protocol.generated.md)
2. [guarded graph](references/graph.generated.md)
3. [closure rule](references/closure.generated.md)
4. [Codex adapter](references/codex-adapter.md)
5. [outcome copy](references/copy.md)

Treat generated snapshots as fixed policy for this invocation. Do not modify them.

## 1. Fail-closed preflight

Verify all of the following from authoritative current host context rather than from the user's wording:

- the invocation is explicit `$thyquery <query>`;
- the original query is present and non-empty;
- stock Codex Plan mode is already active;
- the session exposes a trustworthy Plan receipt or equivalent authoritative mode evidence;
- no earlier ThyQuery product terminal has absorbed this invocation.

If Plan is inactive, unavailable, or cannot be proven, emit `PLAN_MODE_REQUIRED` using the reference copy and stop. Do not ask a question, research, call a planner, switch modes, suggest that switching occurred, or continue in prose.

If invocation identity, predecessor state, effect fence, or accepted-contract lineage cannot be maintained without invention, emit the narrow integrity or host-capability outcome and stop. Never fabricate a digest, receipt, tool result, source, or native-plan observation.

## 2. Initialize one invocation-scoped ledger

Keep one in-conversation canonical ledger and no durable memory. Track:

- invocation identity, host evidence, original-query fingerprint, and lifecycle;
- explicit contract fields, provenance, supersessions, and current fingerprint;
- material gaps with owner, materiality, status, and dependents;
- evidence claims with scope, freshness, source, applicability, and disposition;
- residuals, contradictions, progress/stall diagnostics, and remaining transition budget;
- every closure conjunct, acceptance binding, handoff key, and plan observation count.

Only validated user/tool observations may update the ledger. Treat model interpretations as proposals. If the host supplies no trustworthy way to bind acceptance and handoff to the current contract fingerprint, fail closed rather than describing the binding as deterministic.

## 3. Run the guarded Ralph region

This region is a loop, not a single pass. Recompute the ladder, take at most one action, commit it, then **return to recomputation and evaluate the whole ladder again from a fresh snapshot**. Keep circling until a guard fires. Finishing an action is not an exit, and neither is a contract that looks complete — only a guard ends the loop, and each pass through it must call the host's own tools rather than reasoning in place of them.

The transition budget is a finite count of committed macrosteps, decremented once per commit; **use 12 unless the caller configures it**, and do not infer a different figure from how hard the request feels. Preflight, recomputation, replay, read-only observation, and an exact repeated response consume none. Reaching zero yields `RESOURCE_EXHAUSTED`, a typed non-success that is never an upgraded result.

At each boundary, recompute P0–P8 in exact order from one ledger snapshot:

1. cancel, uncertain handoff, post-plan, and effect fence;
2. integrity, idempotency, predecessor, and absorption;
3. Plan evidence and non-waivable host capabilities;
4. resolved closure;
5. accepted residual closure;
6. transition budget exhaustion;
7. exact repeat, oscillation, semantic stall, or unproductive cycle;
8. highest-materiality gap owner;
9. deterministic positive-net-value action ranking.

Do not let a model-selected edge override an earlier guard. A cap, repeat, stability, polished summary, confidence score, or model-authored completion phrase is not success.

Choose exactly one current material-gap action:

- `USER`: ask one native question;
- `EXTERNAL`: perform one bounded official/primary-source research action;
- `FRAME`: test one counterexample, scenario, or alternate representation;
- `SHARED`: offer a neutral, adaptive interpretation/trade-off set;
- no justified action: return a typed non-success.

A gap is material only when resolving it differently would change the contract or the plan. Commit an active macrostep only when new user/source/counterexample evidence or a material contract/uncertainty delta exists. Decrease the finite transition budget exactly once per committed active macrostep.

## 4. Ask with the native Plan tool

Use Codex `request_user_input` only when it is actually exposed and callable in this verified Plan session. Ask one question for the one selected gap.

- Explain briefly why the answer can change the plan.
- When genuine alternatives exist, provide two or three mutually exclusive options because that is the native tool's supported range.
- Recommend an option only when evidence and the current contract justify it.
- Preserve the tool's direct-input path; include defer or cancel when material.
- Never force a preference into false alternatives or convert silence/fatigue into acceptance.

If the native question surface is required but unavailable, return `HOST_CAPABILITY_CONTRADICTION`; do not substitute a fake structured choice.

### When the user does not answer

**Never end an invocation silently.** Every invocation terminates by emitting one typed outcome with its reference copy — going quiet after a question is an integrity failure, not a neutral pause, because the user is left with no idea whether the flow is dead, waiting, or still running.

The host reports a non-answer without saying which kind it is, so read it from what the user did:

- **Explicit cancel** — the user chose a cancel option, or said to stop. Emit `CANCELLED` immediately and stop. Cancel is absorbing: no further question, research, contract delta, handoff, or plan, and nothing continues in the background.
- **Declined or deferred one question** — the user dismissed this question without ending the invocation. That is neither an answer nor acceptance. Recompute the ladder and either select a different admissible action for a different gap, or, if no admissible action remains, emit the matching typed non-success — most often `BLOCKED` when the gap is user-owned and unanswerable.

When it is genuinely unclear which of the two happened, treat it as cancel. Stopping cleanly is recoverable; continuing against a user who meant to stop is not.

## 5. Research only external material gaps

Use available read-only search/browse tools only for an external fact that can change the contract or plan. Bound the question, source class, decision impact, and stop condition before searching.

Prefer official documentation and primary research. Record exact applicability and tag material evidence `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`. Research and SOTA never become user requirements until the user accepts their contract delta.

Do not research a user-owned preference instead of asking. Do not run commands, edits, installs, deployments, tests against live services, or other consequential actions during ThyQuery.

## 6. Challenge and commit

When a frame may be wrong, change representation instead of repeating the same question: use a counterexample, scenario, comparison, boundary case, or artifact reaction. Preserve rejected hypotheses and supersessions.

Before committing a delta, show the changed field, its source, and affected assumptions. A correction invalidates dependent fields and every closure or residual acceptance bound to the prior contract fingerprint.

## 7. Close honestly

Recompute every closure conjunct independently. Resolved closure requires graph integrity, user-authority/philosophical grounding, calibrated coverage/risk/conflict/stability/value-of-information gates, plan-input readiness, no unauthorized intent drift, and explicit acceptance bound to the current contract.

No calibration exists for any stratum in v1, so the calibration conjunct is false and `EPISTEMIC_CLOSED` is unreachable; `ACCEPTED_RESIDUAL` is the only reachable success outcome. Do not infer a calibration to satisfy the conjunct — a low-risk feel, a complete-seeming answer, or a confident estimate is not one. Either continue with a justified action, block, or offer the explicit residual path.

For `ACCEPTED_RESIDUAL`, enumerate every residual's provenance, impact, mitigation, reversibility, and owner. Ask for explicit informed acceptance bound to the current contract and residual ledger. Casual assent is insufficient.

## 8. Fence one native-plan handoff

Only `EPISTEMIC_CLOSED` or `ACCEPTED_RESIDUAL` may authorize a handoff. Create one logical handoff intent for the current invocation and accepted contract fingerprint. Suppress a same-key duplicate. A changed contract requires new acceptance.

Hand the compact accepted contract to the active stock Codex Plan behavior and allow exactly one ordinary native Plan artifact. Do not create a substitute renderer or claim native provenance without an observable native Plan surface/receipt.

If application cannot be reconciled, emit `HANDOFF_OUTCOME_UNKNOWN` and never retry blindly. After one native plan is observed, emit `COMPLETE_AFTER_PLAN`, stop immediately, and do not approve, edit, run, implement, execute, or generate a second plan.
