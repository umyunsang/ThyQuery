# ThyQuery Live Validation Proposal — `LVP@v6`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Status: `LIVE_RUN_APPROVAL_REQUIRED`
- Supersedes: `LVP_v5.md` (`DECLINED_AT_PREREQUISITE`); no `LVP@v5-*` token applies here
- Claude package digest: `sha256:7bc5448e6377ef8567da55084a1c9e97eb7ce7abe47dc1f7da5e2e6a62e80f91`
- Codex package digest: `sha256:e03f8e991fc0ba6ddb88073bb8341133e737f714cde673a119258d2ea5b3a949`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`
- `npm run check`: exit 0; `npm test` 79/79 PASS
- Current live status: Claude `LOAD_VERIFIED, BEHAVIOUR_UNTESTED`; Codex `CONFORMANCE_UNTESTED`

## What changed since `LVP@v5`

`LVP@v5` was declined because a `--bare` run cannot use the Claude Code subscription and would bill Anthropic API credits. That constraint was real, but the conclusion drawn from it — that isolation and subscription billing are jointly unsatisfiable on this CLI — was wrong. It came from auditing only the top-level flag list and never reading the subcommands.

Two things follow. The API-credit requirement belonged to `--bare` alone, not to live validation, and `--bare` was a design choice for maximal isolation rather than a requirement. And a whole class of zero-cost host evidence was available and unused.

## Evidence already obtained at zero cost

Executed before writing this proposal; no model was called and nothing was installed.

| Check | Result |
|---|---|
| `claude auth status` | `loggedIn: true`, `authMethod: "claude.ai"`, `subscriptionType: "pro"` — subscription-backed OAuth |
| `claude --plugin-dir <pkg> plugin details thyquery` | Loads. `thyquery 0.1.0`, `Source: thyquery@inline` |
| Component inventory | Skills 1 (`thyquery`), Agents 0, **Hooks 0, MCP servers 0, LSP servers 0** |
| Projected token cost | always-on ~119 tok; on-invoke ~2.9k |
| `claude plugin list` | `thyquery` absent — the load left no persistent state |
| Codex package under Claude's loader | Rejected — host-specific packaging is genuinely separated |

The zero-hook, zero-MCP, zero-LSP inventory is the first **independent** confirmation of the runtime boundary. Until now that was this project's own test asserting it; the host now reports the same thing.

This is real host evidence, so the Claude cell moves from `CONFORMANCE_UNTESTED` to `LOAD_VERIFIED, BEHAVIOUR_UNTESTED`. It establishes that the package loads and the skill is registered. It establishes nothing about whether a model follows the instructions.

## Path not available: `claude plugin eval`

The CLI ships a native evaluation harness — `evals/**/case.yaml`, `--ablation with-without` for a no-plugin baseline arm, `--max-cost-usd`, `--json`, `--threshold`, `--report`. It would have replaced most of this project's hand-built evaluation design.

**It is gated.** Running it returns `` `plugin eval` is currently in early access `` and exits 1. Only `--help` and `eval init --help` respond. This was confirmed by execution, not inferred from documentation, which is the same lesson R1 recorded when `request_user_input` proved mode-gated: preflight must test effective callability, not schema presence.

If the gate opens, the design here should be revisited in its favour — the ablation arm alone is worth more than the manual comparison.

## Proposed run

### Command shape

`--bare` is dropped, which is what makes subscription billing possible. Isolation is instead assembled from the flags that remain, and the residual contamination is stated rather than hidden.

```
<CLAUDE_BIN> --print
  --permission-mode plan
  --plugin-dir <REPO>/plugins/claude-thyquery
  --tools Read,AskUserQuestion
  --allowedTools Read,AskUserQuestion
  --no-session-persistence
  --setting-sources local
  --strict-mcp-config --mcp-config <CASE_ROOT>/work/mcp.json
  --settings <CASE_ROOT>/work/settings.json
  --model <PINNED_MODEL>
  --max-budget-usd 0.50
  --session-id <CASE_UUID>
  --input-format stream-json --output-format stream-json --replay-user-messages
```

Working directory is a disposable `<CASE_ROOT>/work`, so `--setting-sources local` resolves against an empty directory and no project `CLAUDE.md` is discovered.

Forbidden in every case: `--bare`, `--resume`, `--continue`, `--fork-session`, `--dangerously-skip-permissions`, `--safe-mode`, `--disable-slash-commands`, `--publish-report`, `--scaffold`, and any `--allow-tools` grant for `Bash`, `Write`, `Edit`, `WebFetch`, or `mcp__*`.

### Stated contamination

Without `--bare` the session still loads what a real user's session loads: the user-level `~/.claude/CLAUDE.md`, installed plugins, user settings, and auto-memory. This is a genuine difference from `LVP@v5`'s clean room and must be recorded with the results.

It is a fair trade rather than a defect. A pristine environment tests a condition no real user is in, and this project has never had any behavioural evidence at all; representative-environment evidence is more useful as the first data point than none. But a `PLAN_MODE_REQUIRED` that fires because of a user hook rather than the skill would be a false pass, so every receipt must record the loaded-context inventory alongside the outcome, and no result may be reported as clean-room conformance.

### Scope

Case `A-G0-02` only: invocation outside Plan mode must yield `PLAN_MODE_REQUIRED` with zero questions, research, handoffs, or plans.

It is the cheapest case, needs no question correlation, and still proves the three things nothing has proven yet — that the skill fires on `/thyquery:thyquery`, that the fail-closed preflight actually fires, and what the stream-json record shapes are. The other three cases depend on record shapes this run would reveal, so running them first risks spending the whole ceiling on four cases that all fail to parse for one reason.

### Budgets

| Ceiling | Value |
|---|---|
| Cases | 1 |
| Assistant turns | 12 |
| Cost | USD 0.50, enforced by `--max-budget-usd` |
| Wall clock | 180 s |
| Billing | Claude Code Pro subscription quota. **No Anthropic API credits.** |

A budget abort is `RESOURCE_EXHAUSTED`, a typed non-success — never a conformance verdict about the plugin.

### Receipts

Case id, run id, exit code, signal, wall-clock ms, assistant-turn count, categorical event projection, terminal outcome, loaded-context inventory, and SHA-256 digests of raw stdout and stderr. Raw stream text, query text, answers, paths, and credentials are discarded through the existing `projectDryReceipt` allowlist and `sanitizeFailureMessage` reduction.

### Isolation and cleanup

Case root under `<SYSTEM_TMP>/thyquery-lvp-v6/<RUN_ID>/A-G0-02/`, created fresh and removed after the run. The plugin is read from the repository by `--plugin-dir` without copying or mutation, and its digest is re-verified afterwards. `~/.claude/`, `~/.config/`, `.remember/`, and the repository `plugins/` and `spec/` roots are never written. After the run the runner asserts the temporary root is gone, `claude plugin list` still does not contain `thyquery`, the package digests are unchanged, and `npm run check` still exits 0.

## Options

### `LVP@v6-A` — recommended: run `A-G0-02` on the subscription

Authorize one live `A-G0-02` execution under every parameter above. Expected outcomes include a typed non-success; `HOST_CAPABILITY_CONTRADICTION` or an unparseable stream are valid findings that would be recorded rather than retried.

### `LVP@v6-B` — zero-cost evidence only

Stop at what is already established. Record the Claude cell as `LOAD_VERIFIED, BEHAVIOUR_UNTESTED`, update the support matrix, and make no model call. This still improves the honest record: load and registration are now host-confirmed.

### `LVP@v6-C` — hold

No further work.

## Recommendation and exact gate

`LVP@v6-A`. The blocker that stopped `LVP@v5` is gone, one case costs at most USD 0.50 of subscription quota, and it converts the project's single largest unknown — whether a host model follows these instructions at all — into evidence.

Exact `LVP@v6-A 승인` authorizes one live `A-G0-02` run under the pinned command, budgets, and cleanup above, billed to the Claude Code subscription.

It does not authorize any other G0 or G1 case, any Codex run, efficacy evaluation, persistent installation, marketplace registration, `--publish-report`, `--scaffold`, plan execution, publication, or a second run. A repeat after failure requires a new proposal.
