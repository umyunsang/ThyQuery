# ThyQuery Live Validation Proposal — `LVP@v5`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Status: `DECLINED_AT_PREREQUISITE` — the user declined API-credit billing on 2026-08-03, before any approval token was given. No option in this proposal was approved and none was executed.
- Parent disposition: `LVP_v4.md`
- Parent disposition SHA-256: `306f4bc8f6f694ea32a351a9c7fa171e99255cd03fbf4b524e9d653629f49b54`
- Runner source SHA-256: `9c0ea21b8386484bd695de1249c51fd2d9e6fb869c47025596dcf263d234fc33`
- Runner profile SHA-256: `dc5ce3e568f85c078c54407f7a2ef990aa7e7800a94f04638a296b9375431668`
- Claude case manifest SHA-256: `ee98db2c76a976dd52bc57426f5f784f7b9c4c19a65b91296b7799f3053cd5e2`
- Claude package digest: `sha256:58d640b357e3a75a304e5ee55672e745089a671b84aecc2b5fa6c0377c50d9e4`
- Codex package digest: `sha256:2909fdb9f5dbdb786cdae8bb1a887b458ff8039b03a54b81a1a4b27821e10de7`
- `npm run check`: exit 0; `npm test` 78/78 PASS
- Current live status: both hosts `CONFORMANCE_UNTESTED`

This proposal authorizes nothing by itself. It requests the first live Claude Code run in the project's history.

## What changed since `LVP@v4`

`LVP@v4` closed the runner epoch with Claude at `LIVE_RUN_PROPOSAL_BLOCKED` and six named blockers. Read-only inspection of the installed CLI resolved four of them. The evidence is recorded below rather than asserted.

### Resolved by local read-only inspection

| Blocker | Resolution | Evidence |
|---|---|---|
| Pinned executable path and digest | `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081` | `claude --version` → `2.1.220 (Claude Code)`; symlink resolved from `/Users/um-yunsang/.local/bin/claude` |
| Session-only plugin load under `--bare` | Supported and documented as the intended path | `--bare` help: "Skills still resolve via /skill-name. Explicitly provide context via: … `--plugin-dir`." |
| Non-session config/cache isolation | `--bare` skips hooks, LSP, plugin sync, auto-memory, background prefetches, keychain reads, and CLAUDE.md auto-discovery; `--no-session-persistence` prevents session files; no managed-policy directory exists on this machine | `--bare` and `--no-session-persistence` help text; `/Library/Application Support/ClaudeCode/` absent |
| Credential provision without disclosure | Channel is exactly `ANTHROPIC_API_KEY` or `apiKeyHelper` via `--settings`; the value is never placed in argv or in any receipt | `--bare` help: "Anthropic auth is strictly ANTHROPIC_API_KEY or apiKeyHelper via --settings (OAuth and keychain are never read)." |

All nineteen frozen argv flags exist in the installed CLI's help output, and `--permission-mode` accepts `plan`.

### Not resolved — these remain live-run discoveries

| Blocker | Why it cannot be resolved locally |
|---|---|
| NDJSON input/output shapes | The stream-json schema is not published in local help. Only an actual run reveals the record shapes the evaluator must parse. |
| `AskUserQuestion` request/response correlation in print mode | Whether a non-interactive print-mode session can ask and receive an answer over stream-json input, and in what shape, is unobservable without running. Case `A-G0-03` depends entirely on this. |
| Authoritative native-plan observation signal | Which record marks an observed stock Plan artifact is undocumented locally. |
| Cost accounting granularity | `--max-budget-usd` is documented as a maximum spend, but the reporting granularity is only visible in a real result record. |

This proposal therefore treats the first run as **partly exploratory**. That is stated as the expected outcome, not hidden as a risk.

## Hard prerequisite the user must supply

**`--bare` never reads OAuth or the keychain.** The current machine has no `ANTHROPIC_API_KEY`, no `ANTHROPIC_AUTH_TOKEN`, no `ant` CLI, and no `~/.config/anthropic` profile. The only credential present is the Claude Code subscription login under `~/.claude`, which `--bare` will not use.

Consequences the user must accept before approving:

1. A live run requires an `ANTHROPIC_API_KEY` that the user provides.
2. The run bills **Anthropic API credits**, not the Claude Code subscription.
3. Without that key, this proposal cannot execute even if approved.

The key is read from the environment by the child process. It is never written to argv, to any receipt, to `docs/`, or to any planning record.

## Pinned run parameters

| Parameter | Value | Basis |
|---|---|---|
| Executable | `/Users/um-yunsang/.local/share/claude/versions/2.1.220` | Resolved and digest-pinned above |
| Model | `claude-opus-5` | The instruction-following capability under test is model-bound; conformance is recorded per model, not as a general claim |
| Cases | `A-G0-01`, `A-G0-02`, `A-G0-03`, `A-G0-04` | The four frozen G0 cases; no G1 case is in scope |
| Execution order | serial | Frozen in the runner profile |
| Assistant turns | 12 per case | Frozen ceiling |
| Cost | USD 0.50 per case, USD 2.00 suite | Frozen ceiling, enforced by `--max-budget-usd` |
| Wall clock | 180 s per case, 900 s suite | Frozen ceiling, enforced by the runner deadline |
| Tools | `Read`, `AskUserQuestion` only | Frozen; any other tool use terminates the case |
| Permission mode | `plan` | Frozen; validated by value, not token presence |

The argv is the exactly frozen `FROZEN_CLAUDE_ARGV`, with `<CLAUDE_BIN>`, `<CLAUDE_PLUGIN_DIR>`, `<PINNED_MODEL>`, `<CASE_ROOT>`, and `<CASE_UUID>` substituted at run time. No flag is added, removed, or reordered.

### Budget realism

At `claude-opus-5` rates the per-case ceiling of USD 0.50 is adequate but not generous for a twelve-turn case. A case that aborts on budget must be recorded as `RESOURCE_EXHAUSTED`, which is a **non-success outcome and not a conformance failure**. The runner must not upgrade a budget abort into a verdict about the plugin. If several cases abort on budget, the correct response is a new proposal raising the ceiling, not a reinterpretation of these results.

## Isolation, cleanup, and recovery

- Every case runs in `<SYSTEM_TMP>/thyquery-lvp-v5/<RUN_ID>/<CASE_ID>/`, created fresh and removed after the case.
- `--settings` and `--mcp-config` point inside that case root; the MCP configuration is empty and `--strict-mcp-config` forbids any other source.
- `--setting-sources local` resolves against the disposable case root, not the project.
- The plugin is loaded from a copy of `plugins/claude-thyquery/` inside the case root. The repository package is never mutated, and its digest is re-verified after the suite.
- Protected and never accessed: `.remember/`, `~/.claude/`, `~/.config/`, the project `plugins/` and `spec/` roots.
- After the suite, the runner asserts the temporary root is gone, the two package digests are unchanged, and `npm run check` still exits 0.

## Receipts

Per case the runner retains only: case id, run id, exit code, signal, wall-clock ms, assistant-turn count, reported cost, categorical event projection, terminal outcome, and SHA-256 digests of raw stdout and stderr. Raw stream text, query text, answers, file contents, paths, and the credential are discarded by construction, through the same `projectDryReceipt` allowlist and `sanitizeFailureMessage` reduction that the dry runner already enforces.

## Options

### `LVP@v5-A` — recommended: run the four Claude G0 cases

Authorize one serial live execution of `A-G0-01` through `A-G0-04` under every parameter above, contingent on the user supplying `ANTHROPIC_API_KEY`. The runner gains an execution subcommand restricted to exactly these four cases.

Expected outcomes include partial success. `A-G0-03` may return `HOST_CAPABILITY_CONTRADICTION` if print-mode `AskUserQuestion` proves unusable; that is a valid finding and would be recorded as such rather than retried.

Exclusions: no G1 case, no Codex run, no efficacy evaluation, no persistent install, no marketplace registration, no plan execution, no publication.

### `LVP@v5-B` — narrow first run to `A-G0-02` only

`A-G0-02` asserts that invocation outside Plan mode yields `PLAN_MODE_REQUIRED` with zero questions, research, handoffs, or plans. It is the cheapest case, needs no question correlation, and still proves that the plugin loads and the skill triggers. Cost ceiling USD 0.50 total.

This buys the loading and triggering evidence for a quarter of the budget, then a follow-up proposal covers the remaining three cases with the stream shapes already known.

### `LVP@v5-C` — hold

No live run. Both hosts stay `CONFORMANCE_UNTESTED`. The runner and packages remain as they are.

## Recommendation and exact gate

**`LVP@v5-B` is recommended over `LVP@v5-A`.** Three of the four unresolved blockers are stream-shape unknowns, and a single cheap case reveals the record shapes that the other three cases must parse. Running all four before knowing those shapes risks spending the full USD 2.00 on four cases that all fail to parse for the same reason.

Exact `LVP@v5-B 승인` would authorize one live `A-G0-02` execution under the pinned parameters, contingent on the user supplying `ANTHROPIC_API_KEY` and accepting API-credit billing.

Exact `LVP@v5-A 승인` would authorize all four cases under the same conditions.

Neither token authorizes a G1 case, a Codex run, efficacy evaluation, persistent installation, marketplace registration, configuration or cache mutation outside the disposable case root, plan execution, publication, deployment, or any second run. A repeat run after a failure requires a new proposal.
