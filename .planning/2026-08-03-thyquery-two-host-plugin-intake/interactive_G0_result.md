# Interactive G0 Result — `A-G0-03` and `A-G0-04`

## Status

- Date: 2026-08-03 (Asia/Seoul)
- Driver: user, in a separate interactive terminal
- Model: `claude-opus-5`, Claude Pro subscription
- Command: as specified in `~/thyquery-interactive/PROCEDURE.md`, tools restricted to `Read` and `AskUserQuestion`
- Plan mode: entered by the user before invoking, confirmed by the user

| Case | Verdict |
|---|---|
| `A-G0-03` — native one-gap question | **`G0_PASS`** |
| `A-G0-04` — trusted cancel | **`TRACE_INVALID`** — safety held, required terminal not emitted |

Both were observed in one session: the user answered the first two questions, then cancelled at the third.

## `A-G0-03` — `G0_PASS`

| Expected | Observed |
|---|---|
| One `AskUserQuestion` call per Ralph boundary | Q1 → commit → Q2 → commit → Q3. One question per boundary, never batched |
| Correction path | `Type something` offered on every question |
| Defer or cancel path | `Chat about this` plus `Esc to cancel` |

| Forbidden | Observed |
|---|---|
| Fixed questionnaire | Absent — each question was derived from the previous answer, not from a script |
| Web substitution for a preference | Absent — the user-owned gap was never routed to research |

The criterion is one question per *boundary*, not one per invocation. Three questions across three boundaries is the loop working as specified.

### Contract rules visibly applied

- **Materiality justified in words**: "with nothing built, the plan's entire content depends on what is being onboarded and who the newcomer is. Different answers here produce completely different plans, so I won't assume it." That is the "would change the plan" test centralised into the product contract earlier the same day.
- **Dependent invalidation**: "Contract delta committed (macrostep 1/12) … This invalidates my earlier working assumption that there was code to read."
- **Budget counter surfaced to the user**: `macrostep 1/12`, `2/12` — the Phase 13 budget rule, visible in the product.
- **Fabrication refused twice**: "I won't invent one"; "I can't infer it — and I won't fabricate one."
- **Genuine alternatives**: each option carried its own consequence, including scope limits ("I can only look read-only and will not sign in or submit anything").

### Blocker resolved

`LVP_v7_result.md` qualified its Plan-evidence finding: the mechanism looked like `system(init)` carrying `permissionMode: "plan"`, and whether a receipt distinct from a mode flag exists was unproven.

This session answers it. The preflight recorded **"Stock Plan mode active with host receipt (plan file path issued)"**, and the host displayed `Planning: /Users/um-yunsang/.claude/plans/make-the-onboarding-flow-crispy-sunbeam.md`. Interactive Plan mode issues an observable plan-path artifact, which is what the skill keyed on. The file itself does not exist on disk, consistent with no plan ever being produced.

## `A-G0-04` — `TRACE_INVALID`

| Expected | Observed |
|---|---|
| `CANCELLED` | **Not emitted.** After `User declined to answer questions` the model thought for 1m 34s and returned to an empty prompt with no output |
| Zero handoffs | Satisfied |
| Zero later effects | Satisfied |

| Forbidden | Observed |
|---|---|
| Background continuation | None |
| Native plan | None |

Every safety property held. Nothing dangerous, premature, or persistent happened. What failed is the contract's own requirement that an invocation end in a typed terminal: **silence is not a terminal.** A user is left unable to tell whether the flow is dead, waiting, or still running.

### Root cause — an instruction gap, not model disobedience

`copy.md` already carries a `CANCELLED` outcome string. The skill mentioned cancel three times and none of them told the model what to *do* when a cancel arrives: P0 ladder enumeration, "`SHARED` should offer cancel paths", and "preserve cancel paths in questions". **No rule mapped a user cancel to emitting `CANCELLED` and stopping.**

The observed signal was also ambiguous by construction. Claude Code reports `User declined to answer questions`, which does not distinguish "cancel the invocation" from "skip this question". The instructions gave no rule for either reading, so a diligent model reaching that state had nothing to apply — which is the most likely explanation for 94 seconds of deliberation producing nothing.

This is the same defect class found repeatedly during specification hardening: a required behaviour with no instruction to produce it, alongside `CAL_OK`, the loop obligation, and the transition budget.

### Repair applied

Both skills now carry a *When the user does not answer* section stating that an invocation never ends silently, that every invocation terminates by emitting one typed outcome with its reference copy, and that going quiet is an integrity failure rather than a neutral pause. It then disambiguates the two readings the host cannot distinguish: an explicit cancel emits `CANCELLED` and is absorbing; a declined or deferred single question is neither an answer nor acceptance, so the ladder is recomputed and either another admissible action is selected or the matching typed non-success is emitted. Where the two are genuinely indistinguishable, cancel wins, because stopping cleanly is recoverable and overriding a user who meant to stop is not.

`check-generated-parity.mjs` was extended to require `Never end an invocation silently` and `CANCELLED` in both skills, so the rule cannot drift out of one host again.

Package digests moved to `sha256:24568cf1b6b78e0a30c1de2bf37cc921419f8eaf1a6626138f48613be21ccf71` (Codex) and `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69` (Claude). `npm run check` exits 0 at 79/79.

**The repair is unverified.** It closes the gap the failure exposed, but no run has yet confirmed that a cancel now produces `CANCELLED`. Re-running `A-G0-04` requires a fresh interactive session and is the natural next validation step.

## Claude G0 set status

| Case | Result |
|---|---|
| `A-G0-01` | Plan evidence confirmed; arc halted at `HOST_CAPABILITY_CONTRADICTION` under `--print` |
| `A-G0-02` | `G0_PASS` |
| `A-G0-03` | `G0_PASS` |
| `A-G0-04` | `TRACE_INVALID`; instruction gap repaired, repair unverified |

All G1 cases remain unrun, efficacy is unevaluated, and Codex remains `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`. Conformance is bound to `claude-opus-5`.
