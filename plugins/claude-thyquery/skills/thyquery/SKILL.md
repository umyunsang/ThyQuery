---
name: thyquery
description: Use only when the user explicitly invokes /thyquery:thyquery with a request in an already-active Claude Code Plan session and wants material ambiguity, tacit implications, evidence needs, and residual risk resolved before one native plan. Do not use for ordinary prompts, mode switching, implementation, or plan execution.
disable-model-invocation: true
---

# ThyQuery for Claude Code

Treat `$ARGUMENTS` as the user's original query. Run a bounded intent-resolution layer before the active stock Plan behavior, preserve user authority, use Claude Code native Plan interactions, authorize at most one plan handoff, and stop after the plan. This skill is instruction-only; never claim that the development reference controller runs inside Claude Code.

## Load the contract

Before acting, read these local references:

1. [protocol snapshot](references/protocol.generated.md)
2. [guarded graph](references/graph.generated.md)
3. [closure rule](references/closure.generated.md)
4. [Claude Code adapter](references/claude-adapter.md)
5. [outcome copy](references/copy.md)

Treat generated snapshots as fixed policy for this invocation. Do not modify them.

## 1. Fail-closed preflight

Verify all of the following from authoritative current host context rather than from the query text:

- the invocation is canonical `/thyquery:thyquery <query>`;
- `$ARGUMENTS` is present and non-empty;
- stock Claude Code Plan mode is already active;
- the session exposes a trustworthy Plan receipt or equivalent authoritative mode evidence;
- no earlier ThyQuery product terminal has absorbed this invocation.

Never call `EnterPlanMode`, compose with `/plan`, ask the user to accept an implied switch, or claim that this skill changed modes. If Plan is inactive, unavailable, or cannot be proven, emit `PLAN_MODE_REQUIRED` using the reference copy and stop before any question, research, handoff, or plan.

If invocation identity, predecessor state, effect fence, or accepted-contract lineage cannot be maintained without invention, emit the narrow integrity or host-capability outcome and stop. Never fabricate a digest, receipt, tool result, source, or native-plan observation.

## 2. Initialize one invocation-scoped ledger

Keep one in-conversation canonical ledger and no durable memory. Track invocation/host evidence, original-query fingerprint, lifecycle, contract fields and provenance, supersessions, material gaps and owners, evidence dispositions, residuals, contradictions, progress diagnostics, transition budget, closure conjuncts, acceptance binding, handoff key, and native-plan count.

Only validated user/tool observations may update the ledger. Model interpretations remain proposals. If Claude Code supplies no trustworthy way to bind acceptance and handoff to the current contract fingerprint, fail closed rather than describing the binding as deterministic.

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

Do not let model choice override an earlier guard. Cap, repeat, stability, polished summary, confidence, or model-authored completion text is not success.

Choose exactly one current material-gap action and name its owner:

- `USER`: ask one neutral native question for a preference, commitment, authority, risk choice, or acceptance;
- `EXTERNAL`: perform one bounded official/primary-source research action;
- `FRAME`: test one counterexample, scenario, open-world challenge, or alternate representation;
- `SHARED`: offer a neutral, adaptive interpretation/trade-off set with edit/defer/cancel paths;
- no justified action: emit a typed non-success.

A gap is material only when resolving it differently would change the contract or the plan. Commit progress only when new user/source/counterexample evidence or a material contract/uncertainty delta exists, and spend one transition unit exactly once per committed active macrostep.

## 4. Ask with `AskUserQuestion`

Use `AskUserQuestion` only inside this verified Plan flow and ask one question for the selected material gap.

- Explain why the answer can change the plan.
- Use an adaptive number of genuine alternatives supported by the native tool; Top 3 is optional.
- Keep wording neutral and distinguish a recommendation from a fact.
- Preserve correction, direct input, unsure, defer, and cancel paths when meaningful.
- Do not coerce a preference or turn silence, timeout, fatigue, or repeated selection into acceptance.

If the native question surface is required but unavailable, emit `HOST_CAPABILITY_CONTRADICTION`; do not substitute a fake structured choice.

### When the user does not answer

**Never end an invocation silently.** Every invocation terminates by emitting one typed outcome with its reference copy — going quiet after a question is an integrity failure, not a neutral pause, because the user is left with no idea whether the flow is dead, waiting, or still running.

The host reports a non-answer without saying which kind it is, so read it from what the user did:

- **Explicit cancel** — the user chose a cancel option, or said to stop. Emit `CANCELLED` immediately and stop. Cancel is absorbing: no further question, research, contract delta, handoff, or plan, and nothing continues in the background.
- **Declined or deferred one question** — the user dismissed this question without ending the invocation. That is neither an answer nor acceptance. Recompute the ladder and either select a different admissible action for a different gap, or, if no admissible action remains, emit the matching typed non-success — most often `BLOCKED` when the gap is user-owned and unanswerable.

When it is genuinely unclear which of the two happened, treat it as cancel. Stopping cleanly is recoverable; continuing against a user who meant to stop is not.

## 5. Research only external material gaps

Use available read-only search/browse tools only for an external fact that can change the contract or plan. Precommit the bounded question, source class, decision impact, and stop condition.

Prefer official documentation and primary research. Record applicability and tag material evidence `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`. Benchmarks and SOTA never become requirements until the user accepts their contract delta.

Do not research a user-owned preference instead of asking. Do not edit, run commands, install, deploy, call live services, or perform any consequential action during ThyQuery.

## 6. Challenge and commit

For a potentially wrong frame, switch representation using a counterexample, scenario, comparison, boundary case, or artifact reaction. Preserve rejected hypotheses and supersessions.

Before committing a contract delta, show the changed field, source, and affected assumptions. A correction invalidates dependent fields and every closure/residual acceptance bound to the prior fingerprint.

## 7. Close honestly

Recompute every closure conjunct independently. Resolved closure requires graph integrity, user-authority/philosophical grounding, calibrated coverage/risk/conflict/stability/value-of-information gates, plan-input readiness, no unauthorized intent drift, and explicit acceptance of the current contract.

No calibration exists for any stratum in v1, so the calibration conjunct is false and `EPISTEMIC_CLOSED` is unreachable; `ACCEPTED_RESIDUAL` is the only reachable success outcome. Do not infer a calibration to satisfy the conjunct — a low-risk feel, a complete-seeming answer, or a confident estimate is not one. Continue with a justified action, block, or take the explicit residual path.

For `ACCEPTED_RESIDUAL`, enumerate provenance, impact, mitigation, reversibility, and owner for every residual and obtain explicit informed acceptance bound to the current contract and ledger. Casual assent is insufficient.

## 8. Fence one native-plan handoff

Only `EPISTEMIC_CLOSED` or `ACCEPTED_RESIDUAL` may authorize one logical handoff for the current invocation/contract fingerprint. Suppress same-key duplicates; a changed contract needs new acceptance.

Pass the compact accepted contract to Claude Code's existing stock Plan presentation. Do not call `ExitPlanMode` merely to manufacture provenance, do not leave Plan mode automatically, and do not render a substitute plan. Accept only an observable stock-native Plan surface/receipt as the product observation.

If application cannot be reconciled, emit `HANDOFF_OUTCOME_UNKNOWN` and never retry blindly. After one native plan is observed, emit `COMPLETE_AFTER_PLAN`, stop immediately, and do not approve, edit, run, implement, execute, or create a second plan.
