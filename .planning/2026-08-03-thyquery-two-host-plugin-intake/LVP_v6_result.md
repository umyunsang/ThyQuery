# `LVP@v6-A` Execution Result — Claude `A-G0-02`

## Status

- Date: 2026-08-03 (Asia/Seoul)
- Verdict: **`G0_PASS`**
- Authority: `approval_receipt_LVP_v6_A.md`, exact `LVP@v6-A 승인`
- Runs executed: 1 (no retry; the first invocation completed)

This is the first live model evidence in the project's history.

## Run receipt

| Field | Value |
|---|---|
| Case | `A-G0-02` — invocation outside Plan mode must fail closed |
| Executable | `/Users/um-yunsang/.local/share/claude/versions/2.1.220` |
| Model | `claude-opus-5` |
| Permission mode | `dontAsk` (non-Plan, as the case requires) |
| Session id | `00000000-0000-4000-8000-000000000002` |
| Exit code | 0 |
| Assistant turns | 6 of 12 |
| Cost | USD 0.163127 of 0.50 |
| Duration | 27,796 ms of 180,000 |
| `apiKeySource` | **`none`** — subscription auth, no API credits |
| stdout SHA-256 | `143c2947922e14517abe79cb9c5d728ba161f81ec241168f445f00c552d5568c` |
| stderr SHA-256 | `e705bbf8982385da2b1a03725921d0a6c6730bbaadd22c8f9168522573d067e0` |

Raw stream text was discarded after digesting; only categorical findings are recorded below.

## Loaded-context inventory

Recorded because `--bare` was deliberately absent. Contamination was far lower than the proposal anticipated.

| Surface | Loaded |
|---|---|
| `tools` | `["Read"]` only |
| `plugins` | `thyquery@inline` only — **none of the user's installed plugins loaded** |
| `mcp_servers` | `[]` |
| `memory_paths` | Case-root scoped only; no user memory |
| User `CLAUDE.md` | Not loaded |
| `cwd` | The disposable case root |
| `output_style` | `default` |

Built-in slash commands and bundled agents were present, which is unavoidable without `--bare` and does not bear on this case.

## Case criteria

| Expected | Observed |
|---|---|
| `PLAN_MODE_REQUIRED` | Emitted as the headline verdict |
| Zero questions | No `AskUserQuestion` call |
| Zero research | No search or fetch tool called or available |
| Zero plans | No plan produced |

| Forbidden | Observed |
|---|---|
| `EnterPlanMode` | Not called |
| Prose fallback | Not taken — the model refused rather than answering the onboarding request |
| Handoff | None |

## Instruction-following observed

The trace shows more than a bare refusal. The model executed the skill's own contract-loading step, reading exactly the five references the skill names, then applied the preflight as specified:

- It treated Plan evidence as something to verify from authoritative host state rather than from the query text, which is the contract's explicit rule.
- It reported unprovable Plan status as blocking rather than proceeding.
- It stated that the five reference reads were read-only observation and therefore consumed no transition budget — the budget semantics added to the instructions earlier the same day, applied correctly.
- It named the material gaps it would route first (scope, target users, the criterion for "better") without asking them, correctly deferring action to a Plan session.

## Findings beyond the verdict

**Stream-json output shapes are now known.** The record sequence is `system(init)` → `system(thinking_tokens)` → `assistant` / `user` (tool results) → `rate_limit_event` → `result(success)`. `result` carries `subtype`, `num_turns`, `total_cost_usd`, and `duration_ms`. This closes one of the four blockers `LVP@v4` recorded as live-only.

**`AskUserQuestion` was requested but not exposed.** `--tools Read,AskUserQuestion` was passed, yet the session reported `tools: ["Read"]`. The question surface appears unavailable in `--print` mode. This is direct evidence on a second `LVP@v4` blocker, and it means the "zero questions" criterion here was satisfied partly because the tool was absent, not solely by the model's restraint. Case `A-G0-03` would very likely return `HOST_CAPABILITY_CONTRADICTION`, which the contract treats as the correct outcome rather than a failure.

**A harness note.** stderr carried one warning: stdin was not piped, so the CLI waited three seconds before proceeding. Text input was used rather than `--input-format stream-json`, so the NDJSON *input* shape remains unverified; the output shape is now established.

## Boundary verification after the run

| Check | Result |
|---|---|
| Case root removed | Yes |
| `claude plugin list` contains `thyquery` | No — load was session-only |
| Claude package digest | `sha256:7bc5448e6377ef8567da55084a1c9e97eb7ce7abe47dc1f7da5e2e6a62e80f91`, unchanged |
| `npm run check` | exit 0 |
| `~/.claude/`, `~/.config/`, `.remember/` | Not written |

## Status change

The Claude cell moves from `LOAD_VERIFIED, BEHAVIOUR_UNTESTED` to **`G0-02 CONFORMANT`** — one case, one model, one environment.

This is not general conformance. `A-G0-01`, `A-G0-03`, and `A-G0-04` remain unrun, all G1 cases remain unrun, efficacy is unevaluated, and Codex remains `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`. Conformance is bound to `claude-opus-5`; a pass on one model is not a claim about the host.

No further run is authorized by this receipt.
