# Getting started

## Before you invoke

ThyQuery requires stock Plan mode to already be active. It will not switch modes for you — that is a deliberate constraint, and a run where the plugin changed modes would be a defect rather than a convenience.

Enter Plan mode using your host's normal mechanism, then invoke. If Plan mode is not active, you get `PLAN_MODE_REQUIRED` and nothing else happens: no question, no research, no plan, no side effect. Enter Plan mode and invoke again with the same query — nothing is lost.

## What a first invocation looks like

```
/thyquery:thyquery Make the onboarding flow better
```

The flow that follows is a loop, and each pass does one thing:

1. **Contract load.** It reads its own reference files. This costs no transition budget.
2. **Read-only observation.** It looks at what it can see without changing anything. Also free.
3. **One question, for one gap.** Not a questionnaire — one material gap, with a stated reason the answer changes the plan, and correction, direct-input, defer, and cancel paths preserved. A gap is material only when answering it differently would produce a different plan.
4. **Commit, then recompute.** Your answer becomes a contract delta, and the whole guard ladder is re-evaluated from scratch. That is one macrostep.
5. Repeat from 3 until a guard fires.

Then one of two things ends it: an enumerated residual ledger you explicitly accept, or a typed non-success. Either way it stops.

## What success actually looks like

**`ACCEPTED_RESIDUAL` is the success outcome in v1.** Not a consolation prize.

Full resolution — `EPISTEMIC_CLOSED` — requires a calibration that this release does not ship, so it is unreachable by construction rather than by judgment. What you get instead is a contract whose open questions are enumerated with impact, mitigation, reversibility, and owner, which you accepted knowingly. That is the honest shape of "we resolved enough to plan", and it is the only shape v1 can produce.

## The transition budget

Twelve committed macrosteps by default. Reading, observing, recomputing guards, and repeating yourself cost nothing — only committed progress does.

Running out is `RESOURCE_EXHAUSTED`, a typed non-success. It is not a partial success and it is not a plan you can use. If you hit it, the intent was not resolved.

## When it stops early

| Outcome | What it means |
|---|---|
| `PLAN_MODE_REQUIRED` | Plan mode was not active. Enter it and re-invoke. |
| `HOST_CAPABILITY_CONTRADICTION` | A capability the contract treats as non-waivable is missing from this session — often the question surface or the plan handoff. It refuses rather than faking one. |
| `BLOCKED` | A user-owned gap with no admissible action left. Usually one line from you unblocks it. |
| `STALLED` | Repetition or oscillation without new evidence. |
| `CANCELLED` | You cancelled. Nothing continues in the background. |

None of these is a plan. The workflow authorizes a handoff only from an accepted contract.

## After the plan

One stock native plan is produced, then `COMPLETE_AFTER_PLAN`, and ThyQuery is done. It does not approve, implement, execute, or produce a second plan — reviewing and approving the plan is yours.

## Installing

Session-only loading via `--plugin-dir` is what has actually been exercised. See [installation.md](installation.md); persistent installation is separately gated by [installation-pending.md](installation-pending.md).
