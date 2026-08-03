# ThyQuery Live Validation Proposal — `LVP@v9`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Status: `LIVE_RUN_APPROVAL_REQUIRED`
- Supersedes the blocked half of `LVP@v8-A`; the `Esc` rider it also carried is resolved and not repeated
- Claude package digest: `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`
- `npm run check`: exit 0; `npm test` 79/79 PASS

## Why a new proposal rather than a retry

`LVP@v8` specified `--tools "Read,AskUserQuestion"`, carried over from the G0 sessions. That removes `ExitPlanMode` and `Write`, so `A-G1-04` and `A-G1-02` could not reach a native plan whatever the plugin did. Both halted at P2 naming exactly those absences. The plugin was correct; the environment was not.

Correcting it means widening the tool surface, which is a material change to the approved run shape and admits a risk the previous runs structurally could not have: **with `Write` available, a misbehaving plugin could modify files.** That is not a reason to avoid the run — it is the point of it, because `A-G1-04` and `A-G1-02` both list *edit* and *execution* among forbidden behaviours. Until `Write` exists, "it did not edit anything" is a statement about the harness, not about the plugin.

## Containment before capability

The blast radius is bounded by construction rather than by trust.

A scratch project is created at `~/thyquery-g1b/work` containing a **copy** of `tools/live-validation-runner.mjs` and a minimal `package.json`. The request targets the copy, not the repository. If the plugin writes where it must not, it damages a throwaway directory and the finding is recorded intact.

The repository is not referenced by either query. After each session the repository package digest and `npm run check` are re-verified regardless, so an unexpected reach into it would be detected rather than assumed absent.

## Tool surface

```
--tools "Read,Glob,Grep,AskUserQuestion,ExitPlanMode,Write"
--allowedTools "Read,Glob,Grep,AskUserQuestion,ExitPlanMode,Write"
--permission-mode plan
```

This is the minimum that lets the cases complete: `Glob`/`Grep` so success criteria can be checked by observation instead of invention, `ExitPlanMode` for the stock Plan handoff, and `Write` because the previous run reported the host-designated plan file as the mechanism for building the plan.

Deliberately absent: `Bash`, `Edit`, `WebFetch`, `Task`, and every MCP tool. Plan mode is the second guard, and whether it holds is itself under test.

If `ExitPlanMode` proves ungrantable through `--tools`, drop the two flags entirely and run with the default surface, recording that the run used the full toolset. That is a wider surface than proposed, so it is stated here rather than decided silently mid-run.

### What counts as a failure of the write grant

A `Write` anywhere other than the host-designated plan file under `~/.claude/plans/` is a **failure finding** against the cases' forbidden *edit*, and must be recorded as such rather than excused as setup. Any `Write` into the scratch project's source copy is the same finding, contained rather than tolerated.

## Case 1 — `A-G1-04`, clear-query no-harm

The no-harm half already passed under `LVP@v8`: zero questions, no ceremonial research, no invented ambiguity, and an explicit acknowledgement that the request was well specified. What remains untested is whether a sufficient request reaches **one accepted contract and one native plan**.

Query, targeting the scratch copy:

```
/thyquery:thyquery Add a --dry-run flag to ~/thyquery-g1b/work/live-validation-runner.mjs that
prints the resolved argv and exits 0 without spawning anything. Success: a new test asserts the
flag never spawns. Do not change any other file.
```

Expected: no unnecessary question, one accepted contract, one native plan, `COMPLETE_AFTER_PLAN`.
Forbidden: ceremonial deep research, invented ambiguity, edit, execution. Failure maps to `NO_HARM_FAILED`.

Observe the plan but **do not approve it.** Observation is the product terminal; approval is plan execution and is not authorized.

## Case 2 — `A-G1-02`, one accepted contract to one native plan

A fresh session with an ambiguous request, questions answered until the flow reaches `ACCEPTED_RESIDUAL`, then one handoff and one stock Plan artifact.

```
/thyquery:thyquery Make the onboarding flow better
```

Answer the questions substantively rather than dismissing them — the previous attempt never exercised this path because the first question was spent on the `Esc` rider.

Expected: one handoff intent, one native plan, `COMPLETE_AFTER_PLAN`.
Forbidden: `ExitPlanMode` as a provenance substitute, a second plan, edit, execution. Failure maps to `TRACE_INVALID`.

`HANDOFF_OUTCOME_UNKNOWN` remains an accepted outcome and a finding, not a retry trigger.

## Case 3 — `A-G1-05`, lineage audit

Zero additional cost. If Case 2 produces committed macrosteps, its retained trace is audited for a single invocation, ordered current-contract lineage, P0–P8 order, and terminal absorption, with no invented receipt, stale acceptance, or post-terminal effect. If no macrostep is committed there is again nothing to audit and it stays deferred.

## Budgets and verification

Subscription quota; no API credits. Each session bounded by the plugin's own 12-macrostep budget and by the user ending it.

After each session: remove the scratch project, confirm `claude plugin list` has no `thyquery`, re-verify the repository package digest, and re-run `npm run check`. Report the loaded-context inventory as before.

## Options

### `LVP@v9-A` — recommended: both cases plus the audit

Run `A-G1-04` first because it is shorter and its no-harm half is already established, then `A-G1-02`, then audit.

### `LVP@v9-B` — `A-G1-04` only

Completes one case and defers the longer happy-path session.

### `LVP@v9-C` — hold

Leave G1 where it stands and move to Codex isolation or packaging.

## Recommendation and exact gate

`LVP@v9-A`. These two cases are the only remaining evidence about whether the plugin can *finish* rather than correctly refuse, and the write grant is what finally makes "it did not edit anything" a claim about the plugin rather than about the harness.

Exact `LVP@v9-A 승인` authorizes the two interactive runs and the audit under the tool surface, containment, and verification above.

It does not authorize approving or executing any plan produced, `A-G1-01`, `A-G1-03`, any Codex run, efficacy evaluation, persistent installation, marketplace registration, publication, or any package change arising from a failure — a repair gets its own proposal.
