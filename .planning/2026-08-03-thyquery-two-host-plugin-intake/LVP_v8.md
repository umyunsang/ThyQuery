# ThyQuery Live Validation Proposal — `LVP@v8`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Status: `LIVE_RUN_APPROVAL_REQUIRED`
- Claude package digest: `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`
- `npm run check`: exit 0; `npm test` 79/79 PASS
- Claude G0: `A-G0-02`, `A-G0-03`, `A-G0-04` all `G0_PASS`; `A-G0-01` Plan evidence confirmed, arc halted under `--print`

## Part 1 — the `Esc` behaviour

### What zero-cost investigation established and ruled out

Three avenues were tried before proposing anything.

- **Persisted interactive transcripts.** None exist. `~/.claude/projects/-Users-um-yunsang-thyquery-interactive-work` was never created, so the two interactive sessions left no readable record.
- **A stream-json probe with empty stdin.** Produces no output at all — not even the `system(init)` record — so the tool inventory under `--input-format stream-json` cannot be read for free.
- **A turn limit.** No `--max-turns` flag exists, so any stream-json probe costs a real model turn.

### The hypothesis space is narrower than before

The original report said the mechanism was undetermined between "the host ends the turn" and "the model emitted only thinking". **The first is now unlikely.** The transcript shows `✻ Worked for 1m 17s` *after* the decline, so the model was still running for 77 seconds; a turn ended by the host would not have done that. The remaining explanation is that the model worked and produced no text block.

Why it produced none is still unknown, and an instruction change aimed at an unknown cause would be a guess.

### Proposed experiment — cheap, and a rider rather than its own run

In an interactive session, press `Esc` at the question, wait for the work indicator to finish, then **type a single nudge** such as `?`.

- If the outcome then appears, the model owed an outcome and simply had no turn in which to emit it. That is a host-interaction property, and the honest fix is to document it rather than instruct against it.
- If nothing appears again, the model is genuinely producing no outcome for this path, and the instruction is the right lever after all.

This costs one extra short turn on a session already being run for Part 2, and it discriminates between the two remaining hypotheses. It is the only experiment proposed here for the `Esc` question; anything more invasive should wait until this one narrows it further.

## Part 2 — G1 cases, honestly triaged

The five G1 cases are not equally reachable. Feasibility was checked against what the last three runs established, not assumed.

| Case | Feasible now | Why |
|---|---|---|
| `A-G1-04` clear-query no-harm | **Yes, interactive** | Needs no question by design, so the missing `--print` question surface does not block it; needs a plan, so it needs an interactive session with the stock Plan flow |
| `A-G1-02` one contract to one plan | **Yes, interactive** | The product's full happy path; needs questions, acceptance, handoff, and a native plan, all of which exist interactively |
| `A-G1-05` lineage compliance | **Yes, as an audit** | It audits a multi-step trace rather than creating one. No separate run needed if a trace from `A-G1-02` is retained |
| `A-G1-01` cap non-success | **Not practically** | Requires an exhausted budget, i.e. twelve committed macrosteps, meaning twelve answered questions in one session. No CLI flag configures the budget, and telling the model to use a smaller one in the prompt would contaminate the very rule under test |
| `A-G1-03` uncertain handoff | **No** | Requires an *ambiguous application receipt* — a fault-injected condition. Nothing in this harness can produce one honestly, and simulating it by instruction would test the simulation |

Proposing all five would mean proposing two that cannot be run, so this proposal covers three.

### `A-G1-04` — clear-query no-harm

The valuable inverse of everything tested so far. Every passing case so far proved the plugin *refuses* correctly; none has proved it *does not over-ask* when the request is already sufficient.

Interactive session, stock Plan active, invoked with a fully specified request such as:

```
/thyquery:thyquery Add a --dry-run flag to tools/live-validation-runner.mjs that prints the
resolved argv and exits 0 without spawning anything. Success: npm run check still exits 0 and
a new test asserts the flag never spawns. Do not change any other file.
```

Expected: no unnecessary question, one accepted contract, one native plan, `COMPLETE_AFTER_PLAN`.
Forbidden: ceremonial deep research, invented ambiguity. Failure maps to `NO_HARM_FAILED`.

The interesting failure is a plugin that asks anyway because asking is what it does.

### `A-G1-02` — one accepted contract to one native plan

The product's end-to-end path, and the only case that would exercise handoff fencing and plan observation for real. Interactive session, ambiguous request, questions answered until the flow reaches `ACCEPTED_RESIDUAL`, then one handoff and one stock Plan artifact.

Expected: one handoff intent, one native plan, `COMPLETE_AFTER_PLAN`.
Forbidden: `ExitPlanMode` used as a provenance substitute, a second plan, any edit or execution.

Note `A-G0-01` observed that a session without `Write`/`ExitPlanMode` may make handoff unreconcilable, in which case the skill said it would emit `HANDOFF_OUTCOME_UNKNOWN`. An interactive session has the full stock Plan flow, so this is expected to be reachable — but if it is not, `HANDOFF_OUTCOME_UNKNOWN` is an accepted outcome and a finding, not a retry trigger.

### `A-G1-05` — lineage compliance

An audit rather than a run. If the `A-G1-02` session's visible trace is captured, it can be checked for a single invocation, ordered current-contract lineage, P0–P8 order, and terminal absorption, with no invented receipt, stale acceptance, or post-terminal effect. Zero additional cost.

## Execution shape

All three are interactive and driven by the user, since the question surface and the stock Plan flow are unavailable under `--print`. The command is the one already used, from a scratch directory:

```sh
claude --plugin-dir /Users/um-yunsang/ThyQuery/plugins/claude-thyquery \
  --tools "Read,AskUserQuestion" --allowedTools "Read,AskUserQuestion" \
  --setting-sources local --strict-mcp-config --mcp-config ./mcp.json \
  --settings ./settings.json --model claude-opus-5
```

One qualification for `A-G1-04`: the tool restriction to `Read` and `AskUserQuestion` means the model cannot inspect `tools/live-validation-runner.mjs` unless given the exact path, which it can read. That is deliberate — the case tests whether a sufficient request is accepted without ceremony, not whether the model can explore.

Billing is subscription quota. Cleanup and post-run verification are unchanged: remove the scratch directory, confirm `claude plugin list` has no `thyquery`, re-verify the package digest, re-run `npm run check`.

## Options

### `LVP@v8-A` — recommended: `A-G1-04`, then `A-G1-02`, with the `Esc` rider and the `A-G1-05` audit

Run `A-G1-04` first because it is short and self-contained. Then `A-G1-02` as a separate session, carrying the `Esc` nudge experiment at its first question. Audit the retained trace for `A-G1-05`.

### `LVP@v8-B` — `A-G1-04` only

The single highest-information case, without committing to the longer happy-path session.

### `LVP@v8-C` — the `Esc` rider only

Answer the open behavioural question and defer all G1 work.

## Recommendation and exact gate

`LVP@v8-A`. `A-G1-04` and `A-G1-02` are the two cases that test what no run has yet touched — that the plugin does not over-ask, and that it can actually finish. The `Esc` rider and the `A-G1-05` audit cost nothing extra on sessions being run anyway.

Exact `LVP@v8-A 승인` authorizes the interactive runs, the rider, and the audit described above.

It does not authorize `A-G1-01`, `A-G1-03`, any Codex run, efficacy evaluation, persistent installation, marketplace registration, publication, or any change to the packages arising from a failure — a repair after a failure gets its own proposal, as the `A-G0-04` repair did.
