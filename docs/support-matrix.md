# Support Matrix

Status date: 2026-08-03. Neither plugin is installed or enabled. The Claude package has been loaded session-only via `--plugin-dir` and one G0 case has been executed live on the Claude Code subscription; see the execution section below. Codex has never been loaded or run.

| Surface | Codex 0.146.0 | Claude Code 2.1.220 |
|---|---|---|
| Canonical invocation | `$thyquery <query>` | `/thyquery:thyquery <query>` |
| Package manifest | Static PASS | Native strict PASS |
| Skill frontmatter | Fallback Codex validator PASS | Native Claude strict PASS; implicit model invocation disabled |
| Generated semantic parity | PASS | PASS |
| Automatic routing | Absent by design | Absent by design |
| Automatic Plan entry | Forbidden | Forbidden |
| Plan evidence at runtime | `CONFORMANCE_UNTESTED` | **Confirmed both directions** — outside Plan fails closed (`A-G0-02`, `PLAN_MODE_REQUIRED`); inside `--permission-mode plan` the preflight finds and asserts Plan evidence before any action (`A-G0-01`) |
| Session-only load into the host | Not established; no session-only local loader | **`LOAD_VERIFIED`** — `--plugin-dir` reports `thyquery 0.1.0`, `Source: thyquery@inline`, and `plugin list` stays empty afterwards |
| Host-reported component inventory | Not established | **Skills 1, Agents 0, Hooks 0, MCP 0, LSP 0** — independent confirmation of the runtime boundary |
| Native question surface exists | `request_user_input`, named by the stock Plan template | `AskUserQuestion`, established by direct use |
| Native question mode gating | Established: rejected in Default, permitted in Plan | Interactive Plan observed; **not exposed under `--print`** — requested via `--tools` yet the session reported `tools: ["Read"]` |
| Native question **used to policy** at runtime | `CONFORMANCE_UNTESTED` | **`G0_PASS` interactively** (`A-G0-03`) — one question per boundary, correction/defer/cancel paths, no fixed questionnaire, no web substitution. Unreachable under `--print` where `AskUserQuestion` is absent |
| One native plan / no execution | `CONFORMANCE_UNTESTED` | **`G1_PASS`** — `A-G1-02` and `A-G1-04` each reached one native plan through the stock surface, one handoff, no second plan |
| Trusted cancel | `CONFORMANCE_UNTESTED` | **`G0_PASS`** (`A-G0-04`) — selecting cancel emits `CANCELLED` with absorbing semantics, zero handoffs, zero plans, zero continuation. Repaired after an initial `TRACE_INVALID`, then verified |
| Overall live support | `CONFORMANCE_UNTESTED` | **7 of 9 cases pass** on `claude-opus-5`, interactive; `A-G1-01`/`A-G1-03` excluded as not honestly runnable; efficacy still unevaluated |
| No edit under a write grant | `CONFORMANCE_UNTESTED` | **Verified** — `Write` available in both G1 sessions; scratch tree digest byte-identical, repository digests unchanged, only the host-designated plan file written |
| `LVP@v3-A` runner disposition | `HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH`; isolation unresolved | `HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH`; live proposal blocked |

Codex's inspected native CLI exposes no direct local `plugin validate` surface. The package passed the available local plugin-schema validator and project static checks, which is labeled static-only rather than native host conformance.

Claude's `claude plugin validate --strict plugins/claude-thyquery` passed without installation or loading. That validates package structure, not runtime invocation, Plan proof, `AskUserQuestion`, plan provenance, or effect fencing.

Any future runtime claim requires the separately approved, finite G0/G1 manifests in `tests/fixtures/codex/` and `tests/fixtures/claude/`.

The repository-level [runner preparation](live-validation-runner.md) can dry-validate categorical fixtures and inspect fixed Codex help/version surfaces. Its green status is not copied into any runtime row above.

## Reading the question-surface rows

Earlier revisions of this matrix carried a single `CONFORMANCE_UNTESTED` row for "native question at runtime", which read as though the project did not know whether the tools existed. It does. Both hosts expose a structured-question tool, and both facts are evidenced rather than assumed: Codex's stock Plan template names `request_user_input` and a Default-mode probe returned a mode-gated rejection, while Claude Code's `AskUserQuestion` has been invoked and answered directly. A help string that does not enumerate the built-in tool set is not evidence of a missing or undisclosed tool.

What stays untested is narrower and is a property of this plugin, not of the hosts: whether ThyQuery's instructions actually produce one question per material gap, a stated reason the answer can change the plan, preserved correction/defer/cancel paths, refusal to read silence or fatigue as acceptance, and an honest `HOST_CAPABILITY_CONTRADICTION` instead of a fabricated substitute when the surface is unavailable. On Claude that is compounded by one host unknown: whether the tool is usable at all under `--print` with stream-json input.

## First host evidence, 2026-08-03

The Claude package has now been loaded by the host itself, at zero model cost. `claude --plugin-dir plugins/claude-thyquery plugin details thyquery` reports the plugin, its version, and a component inventory of one skill with no hooks, no MCP servers, and no LSP servers. `claude plugin list` does not contain it afterwards, so the load was session-only and left no persistent state. The Codex package is rejected by Claude's loader, confirming that host-specific packaging is genuinely separated rather than nominally so.

Two consequences. The zero-hook inventory is the first **independent** confirmation of the runtime boundary — previously this project's own packaging test asserted it and the host now agrees. And the Claude cell is no longer wholly untested: loading and skill registration are established, while behaviour under a model remains unknown. The rows below preserve that distinction rather than collapsing it.

## Why the Claude behaviour rows are still untested

Read-only inspection on 2026-08-03 resolved most of what blocked a Claude conformance run: the executable is pinned and digested, every frozen argv flag exists, `--permission-mode` accepts `plan`, and `--bare` documents `--plugin-dir` as a supported session-only context path with skills still resolving.

The economic blocker recorded here earlier has been resolved and the reasoning that produced it was wrong. API credits were required by `--bare`, not by live validation; `--bare` was a design choice for maximal isolation. Dropping it keeps subscription authentication, which the executed run confirmed with `apiKeySource: "none"`. What remains untested is scope, not feasibility: three of four G0 cases, every G1 case, and efficacy.

Of the four facts that required an actual run, two are now settled. The stream-json output sequence is `system(init)` → `system(thinking_tokens)` → `assistant`/`user` → `rate_limit_event` → `result(success)`, with cost and turn counts on the `result` record. `AskUserQuestion` is not exposed under `--print`. The authoritative native-plan observation signal and the NDJSON *input* shape remain unverified, the latter because the executed run used text input.

## Resolved behavioural item — `Esc`-dismissed question

Dismissing the native question with `Esc` yields no user-visible outcome. Reproduced identically before and after the cancel repair, so the repair is not the lever. This is not an `A-G0-04` failure — that case specifies "select cancel", and selecting a cancel option works — but from the user's seat an `Esc`-dismissed invocation is indistinguishable from a hang. **Resolved 2026-08-03.** A nudge experiment settled it: after dismissing a question and waiting, a single `?` produced a full response reporting the invocation still open, nothing written, and the dismissal read as "not that question" rather than "stop". The model owed an outcome and had no turn in which to emit it; session state was intact and it resumed correctly. This is a host-interaction property, not a product defect, and no instruction change is the right lever. The user-visible symptom remains worth knowing: without a nudge, a dismissed question gives no sign the invocation is alive.
