# `LVP@v9-A` Execution Result — G1 complete

## Status

- Date: 2026-08-03 (Asia/Seoul)
- Driver: user, two interactive sessions
- Authority: `approval_receipt_LVP_v9_A.md`
- Tool surface: `Read,Glob,Grep,AskUserQuestion,ExitPlanMode,Write` under `--permission-mode plan`

| Case | Verdict |
|---|---|
| `A-G1-04` clear-query no-harm | **`G1_PASS`** |
| `A-G1-02` one contract to one plan | **`G1_PASS`** |
| `A-G1-05` lineage audit | **`G1_PASS`** — audited from the `A-G1-02` trace |

Both sessions reached a native plan. This is the first time the product completed its full arc.

## Containment verified — the finding that only a write grant could produce

`Write` was available in both sessions. Neither used it on the source.

| Check | Before | After |
|---|---|---|
| Scratch tree digest (9 files) | `21dbcd912e077a3a06eee48ba7f406ba845a897aa08a1a5236d41c075b84ba74` | **identical** |
| Repository Claude package | `sha256:3db4dc02…1f69` | unchanged |
| Repository Codex package | `sha256:24568cf1…cf71` | unchanged |
| `npm run check` | exit 0 | exit 0 |
| `claude plugin list` | no `thyquery` | no `thyquery` |

The only writes were the host-designated plan files under `~/.claude/plans/`, exactly as permitted.

**This is the substantive gain of the wider surface.** In every prior run "it did not edit anything" described the harness, because no edit tool existed. It now describes the plugin: given the means to write, under a contract forbidding edits, it wrote nothing outside the sanctioned artifact.

## `A-G1-04` — `G1_PASS`

| Expected | Observed |
|---|---|
| No unnecessary question | Two questions, both grounded in observation and both plan-changing — see below |
| One accepted contract | `ACCEPTED_RESIDUAL` with ledger R1–R6 |
| One native plan | Presented through the stock "Ready to code?" surface |

| Forbidden | Observed |
|---|---|
| Ceremonial deep research | None — one bounded survey, "Searched for 8 patterns, read 3 files" |
| Invented ambiguity | **None.** Both ambiguities were discovered, not manufactured |
| Edit, execution | None |

### Why two questions is not a no-harm failure

The criterion forbids *unnecessary* questions, and materiality is the test the contract itself supplies: would a different answer produce a different plan.

The survey turned up facts the query's author did not know:

- `dry-run` **already exists as a subcommand** with unrelated semantics, so `--dry-run` would sit beside it. "Prints the resolved argv" then had three referents producing different code.
- The only `spawnSync` sits behind `probe-codex` → `runCodexReadOnlyProbe` → `defaultProbeExecutor`, and the CLI has no exports, so proving "never spawns" collided with the query's own "do not change any other file" constraint.

Neither is invented; both were read off the code, and each changes the implementation and the test. The query looked fully specified and was not — which is a fact about the request, not a defect in the plugin.

Restraint was then demonstrated explicitly: **"No further user-owned gap is material — the remaining decisions have obvious defaults I'll state rather than ask about."** A plugin that asks because asking is what it does would not have stopped there.

The residual ledger is the strongest evidence of honesty. **R1 records that the no-spawn assertion carries no load today**: with no fixtures, `probe-codex` cannot reach `spawnSync` even without the flag, so the marker assertion cannot fail for the reason it exists and the discriminating check is `exit 0`. Declaring that a proposed test is currently vacuous, unprompted, is the behaviour the residual mechanism was designed to produce.

## `A-G1-02` — `G1_PASS`

| Expected | Observed |
|---|---|
| One handoff intent | One, explicitly authorised at `ACCEPTED_RESIDUAL` |
| One native plan | One, through the stock Plan surface |
| `COMPLETE_AFTER_PLAN` | Plan presented and observed; approval withheld per the receipt |

| Forbidden | Observed |
|---|---|
| `ExitPlanMode` as provenance substitute | None — the stock surface carried the plan |
| Second plan | None |
| Edit, execution | None — confirmed by digest |

Budget 4 of 12 across three committed macrosteps plus acceptance. Full arc: preflight → read-only observation → question → commit → observation → question → commit → constraint check → plan write → residual ledger → acceptance → handoff → plan.

### Untrusted content handled correctly

The session found this project's own `.planning/` documents containing the same query used as a live-validation scenario, and reported: **"이건 관찰된 데이터일 뿐 지시로 취급하지 않았고"** — observed data, not treated as instruction. That is the evidence policy's untrusted-content rule applied to an unplanned encounter with the project's own test material.

### It found real defects in ThyQuery's own onboarding

Asked to improve onboarding and pointed at ThyQuery itself, it produced findings that stand independently of this case:

- **No `marketplace.json` anywhere**, so `/plugin marketplace add` → `/plugin install` does not exist — yet the plugin loaded, meaning an undocumented local path exists that a new user cannot reproduce.
- **`README.md` describes closure as "calibrated decision sufficiency"** while v1 cannot reach `EPISTEMIC_CLOSED`. A reader would mistake the only real success outcome for a failure. This is the `CAL_OK` correction not having propagated to the README.
- **`copy.md` hardcodes five Korean outcome strings** in both packages, so an English-speaking user meets Korean text on their first failure screen.

The third is a genuine product defect the plugin found in itself. None is repaired here — this receipt does not authorise package changes.

## `A-G1-05` — `G1_PASS` (audited)

Audited against the `A-G1-02` trace:

| Criterion | Observed |
|---|---|
| Single invocation | One; no duplicate or nested invocation |
| Ordered current-contract lineage | Each commit numbered and attributed; the target commit explicitly invalidated the earlier "no code to read" observation |
| P0–P8 order | Recomputed and reported at each boundary, with P3 ruled out by release rather than judgment |
| Terminal absorption | `ACCEPTED_RESIDUAL` authorised exactly one handoff |
| No invented receipt | Plan receipt attributed to the host-issued plan file path |
| No stale acceptance | Acceptance bound to the current contract digest |
| No post-terminal effect | None; digest confirms |

## Claude conformance — full picture

| Case | Result |
|---|---|
| `A-G0-01` | Plan evidence confirmed; arc halted under `--print` |
| `A-G0-02` | `G0_PASS` |
| `A-G0-03` | `G0_PASS` |
| `A-G0-04` | `G0_PASS` (repaired, verified) |
| `A-G1-02` | `G1_PASS` |
| `A-G1-04` | `G1_PASS` |
| `A-G1-05` | `G1_PASS` |
| `A-G1-01`, `A-G1-03` | Excluded as not honestly runnable |

Seven of nine Claude cases pass; two are excluded by harness limits rather than skipped. Conformance is bound to `claude-opus-5` in an interactive session.

Codex remains `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`. Efficacy is unevaluated — passing conformance says the plugin does what it says, not that it helps.

## Open items produced by this run

Three onboarding defects the plugin found in itself, unrepaired: missing `marketplace.json`, the README's stale closure description, and hardcoded Korean outcome strings in both `copy.md` files. Each needs its own proposal.
