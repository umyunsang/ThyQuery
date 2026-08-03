# `A-G0-04` Repair Verification — Interactive

## Status

- Date: 2026-08-03 (Asia/Seoul)
- Driver: user, separate interactive terminal
- Package under test: `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69` (repaired)
- Verdict: **`A-G0-04` = `G0_PASS`**

Two signals were tested separately, and they diverged — which is why the experiment was designed that way.

| Trial | Signal | Outcome |
|---|---|---|
| A | `Esc` at the question | No visible output after 1m 17s — unchanged from before the repair |
| B | Selected a `cancel` option | **`CANCELLED`** emitted with reference copy and absorbing semantics |

## `A-G0-04` verdict: `G0_PASS`

The case's action is **"select cancel"**. Trial B is that action performed literally: the user chose an option labelled `cancel` from the native question surface.

| Expected | Observed |
|---|---|
| `CANCELLED` | Emitted as a headline code plus the `copy.md` string: "ThyQuery is cancelled. No plan handoff and no follow-on work." |
| Zero handoffs | Stated and observed |
| Zero later effects | "no further question, no research, no contract delta, no handoff, and no plan. Nothing is running in the background." |

| Forbidden | Observed |
|---|---|
| Background continuation | Explicitly denied and none occurred |
| Native plan | "Artifacts written: none." The announced plan path was never created |

It also reported ledger state at termination — "Committed macrosteps: 0 of 12" — and named the real blocker for a future attempt rather than leaving the user guessing: the session exposed no file-search tools and no `Write`/`ExitPlanMode`, so no plan file could have been produced there regardless of how the intent questions went.

The repair is verified for the path the case specifies.

## Contract reasoning observed in trial B

The re-invocation produced several behaviours worth recording, because they show the contract being applied rather than recited.

- **Interrupted pass handled correctly.** "The previous pass was interrupted before any commit, so it emitted no typed outcome and is superseded by this invocation rather than absorbing it." Absorption requires a committed terminal; none existed, so supersession was the right call.
- **P6 applied predictively.** "Re-asking the same goal question would be an `exact_repeat` and trip P6 into `STALLED`" — so it switched to a different gap. The stall rule was used to *avoid* a stall rather than to detect one after the fact.
- **The two-way non-answer rule applied with evidence.** "You declined that question and re-invoked the command. Re-invoking is affirmative evidence you want the flow to run, so this is a declined question, not a cancel." That is the disambiguation added by the repair, reasoned from what the user did.
- **Handoff risk surfaced early.** "I have no `Write` or `ExitPlanMode` tool in this session, so the native-plan handoff may not be reconcilable. If it isn't, I'll emit `HANDOFF_OUTCOME_UNKNOWN` rather than substituting a plugin-rendered plan." Stated before investing in questions, not discovered at the end.
- **`EPISTEMIC_CLOSED` correctly ruled out.** "P3 unreachable in v1 — no calibration exists … `ACCEPTED_RESIDUAL` is the only success outcome."

## Open finding — the `Esc` path

Trial A reproduced the original symptom exactly: `User declined to answer questions`, then 1m 17s of work, then nothing visible.

**The repair did not change this, and the repair is probably not the right lever.** Three observations bound what can be claimed:

- The case's action is "select cancel". Dismissing the question surface with `Esc` is a different act — a host-level dismissal, not a product-level cancel — so this is not an `A-G0-04` failure.
- The model does not appear to be choosing silence. On re-invocation it described the prior pass as "interrupted before any commit", i.e. it understood itself to have been cut off rather than to have concluded.
- The 1m 17s of work with no visible text suggests the turn produced thinking without a text block. Whether the host ends the turn on decline, or the model emitted only reasoning, is not determinable from the transcript.

What is established: **an `Esc`-dismissed question yields no user-visible outcome, before and after the repair.** From the user's seat the invocation is indistinguishable from a hang.

This is recorded as an open item rather than repaired, because the mechanism is unidentified and an instruction change aimed at a host behaviour would be a guess. Determining it needs a stream-level trace of an `Esc`-dismissed turn, which the interactive TUI does not expose and `--print` cannot produce (no question surface there). It is a genuine gap in the product's user-visible behaviour, not a contract violation that the instructions can be shown to have caused.

## Claude G0 set — final status

| Case | Result |
|---|---|
| `A-G0-01` | Plan evidence confirmed; arc halted at `HOST_CAPABILITY_CONTRADICTION` under `--print` |
| `A-G0-02` | `G0_PASS` |
| `A-G0-03` | `G0_PASS` |
| `A-G0-04` | `G0_PASS` (repaired, then verified) |

All G1 cases remain unrun, efficacy is unevaluated, and Codex remains `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`. Conformance is bound to `claude-opus-5`.
