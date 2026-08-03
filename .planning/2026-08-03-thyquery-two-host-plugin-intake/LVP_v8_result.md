# `LVP@v8-A` Execution Result — G1 partial, `Esc` resolved

## Status

- Date: 2026-08-03 (Asia/Seoul)
- Driver: user, interactive sessions
- Authority: `approval_receipt_LVP_v8_A.md`

| Item | Result |
|---|---|
| `Esc` rider | **Resolved** — the model owed an outcome and lacked a turn, not a rule |
| `A-G1-04` | **No-harm criteria pass; completion blocked by harness error** |
| `A-G1-02` | **Not tested** — blocked before the path could be exercised |
| `A-G1-05` audit | Not performed — no qualifying multi-step trace was produced |

## Harness error, stated first

The proposal specified `--tools "Read,AskUserQuestion"` for all runs, carrying it forward from the G0 sessions where it produced clean isolation. **That restriction removes `ExitPlanMode` and `Write`, both of which a native-plan handoff requires.** Two of the three approved items could therefore never complete, regardless of how the plugin behaved.

Both sessions halted at P2 with `HOST_CAPABILITY_CONTRADICTION`, naming exactly that: no stock Plan handoff surface, no `Write` for the host-designated plan file, and no exploration surface. `A-G0-01` had already recorded this interaction; the proposal did not carry it forward into the G1 harness design.

The plugin behaved correctly in both sessions. The invalid part is the environment the proposal specified.

## `Esc` rider — resolved

After dismissing the question with `Esc` and waiting for the work indicator, a single `?` produced a full response. The model reported the invocation as still open, nothing written, no plan, and read the dismissal as **"not that question" rather than "stop"** — then re-asked the same gap plainly in prose and offered an explicit stop path.

This discriminates the two hypotheses in favour of the first: **the model owed an outcome and had no turn in which to emit it.** Session state was intact and coherent; given a turn it resumed correctly.

The conclusion is that the silence is a host-interaction property rather than a product defect, and the earlier instruction repair was not the lever for it. The honest response is documentation, not further instruction. What remains true and worth recording is the user-visible symptom: without a nudge, a dismissed question leaves no indication that the invocation is alive.

## `A-G1-04` — no-harm criteria pass, completion blocked

| Expected | Observed |
|---|---|
| No unnecessary question | **Zero questions.** P2 fired before P7/P8, so no question was even reached |
| One accepted contract | Not reached |
| One native plan | Not reached |

| Forbidden | Observed |
|---|---|
| Ceremonial deep research | None |
| Invented ambiguity | **None, explicitly.** "Nothing about your request is problematic — the `--dry-run` task is well-specified, including the two success criteria and the single-file constraint. The blocker is purely this session's tooling." |

The case's distinctive risk — a plugin that asks anyway because asking is what it does — did not materialise. It accepted a sufficient request as sufficient and named the real blocker instead of manufacturing one. It also declined to render a substitute plan and offered ordinary assistance as an explicitly non-ThyQuery alternative.

That is the no-harm half of the case passing. Completion was never available under the specified tools, so the case is **not fully verdicted**.

## `A-G1-02` — not tested; `BLOCKED` reasoning recorded

The session never reached the happy path: the first question was dismissed for the rider, and re-invocation with unchanged state produced `BLOCKED`.

The reasoning is worth retaining as evidence even though the case is unverdicted:

- **Budget and progress correctly separated**: "P5 budget is untouched at 12/12 — zero macrosteps committed. **This is not exhaustion.**"
- **P6 applied to the re-invocation**: "re-asking now would be an exact repeat: same canonical response, fresh key, zero evidence delta."
- **The terminal justified rather than defaulted**: "With no admissible action remaining on a user-owned gap, the honest terminal is `BLOCKED` rather than a plan built on a guess."
- `EPISTEMIC_CLOSED` again ruled out by release rather than judgment.

`BLOCKED` is absorbing, so the session correctly refused to continue afterwards.

## `A-G1-05` — not performed

The audit needs a multi-step trace with committed macrosteps. Neither session committed any, so there is no lineage to audit. Deferred to whatever run first completes a contract.

## What this leaves

| Case | State |
|---|---|
| `A-G1-04` | No-harm half passes; completion untested |
| `A-G1-02` | Untested |
| `A-G1-05` | Untested, needs a completed contract first |
| `A-G1-01`, `A-G1-03` | Excluded as not honestly runnable |

Re-running the two blocked cases requires a corrected harness that exposes the stock Plan flow. That is a new proposal rather than a retry under this receipt, because the tool surface is a material change to the approved run shape and carries a risk the original did not: without the restriction, a misbehaving plugin could reach `Write`. Plan mode is the guard against that, and whether it holds is itself part of what the case forbids.
