# ThyQuery Live Validation Proposal — `LVP@v7`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Status: `LIVE_RUN_APPROVAL_REQUIRED`
- Parent result: `LVP_v6_result.md` — `A-G0-02` returned `G0_PASS`
- Claude package digest: `sha256:7bc5448e6377ef8567da55084a1c9e97eb7ce7abe47dc1f7da5e2e6a62e80f91`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`
- `npm run check`: exit 0; `npm test` 79/79 PASS
- Claude cell: `G0-02 CONFORMANT`; `A-G0-01`, `A-G0-03`, `A-G0-04` unrun

## Feasibility checked before proposing

The two requested cases do not have the same status, and the difference was established from evidence rather than assumed.

### `A-G0-01` — runnable, and the most informative case remaining

Preconditions are a fresh isolated session with stock Plan active and no prior ThyQuery state. `--permission-mode plan` satisfies the mode requirement, and `A-G0-02` already proved the fresh-session and no-prior-state parts.

What makes it worth running is that it inverts the case just passed. Under `dontAsk`, the skill looked for authoritative Plan evidence, failed to find it, and blocked. Under `plan`, either it finds that evidence and proceeds, or it does not.

Both outcomes are valuable, and one of them is a significant negative finding:

- If Plan evidence is observable, `A-G0-01` passes and the product is demonstrably usable in print mode.
- If the skill still cannot verify Plan under `--permission-mode plan`, then the authoritative native-plan observation signal — the third blocker `LVP@v4` recorded as live-only — does not exist on this surface, and ThyQuery is unusable under `--print` regardless of instruction quality. That would be a `HOST_UNSUPPORTED` verdict per the case's own failure mapping, and it is better learned now than after further investment.

### `A-G0-04` — not runnable under `--print`

Preconditions are a verified Plan and an **active ThyQuery invocation**, and the action is **select cancel**.

Cancel is offered to the user through the native question surface. `LVP_v6_result.md` established that `AskUserQuestion` is not exposed under `--print`: it was requested via `--tools Read,AskUserQuestion` and the session reported `tools: ["Read"]`. A single-shot print invocation also has no mid-run user input channel; `--input-format stream-json` might provide one, but its record shape is still unverified, and even a working channel would not create a cancel affordance that the absent tool never presented.

Proposing `A-G0-04` under `--print` would therefore produce a failure of the harness rather than a finding about the product. It is excluded from the automated scope and specified below as an interactive procedure instead.

## Proposed run — `A-G0-01` only

Same command shape as the approved `LVP@v6-A` run, with one change: `--permission-mode plan` instead of `dontAsk`, because this case requires Plan active.

```
<CLAUDE_BIN> --print
  --permission-mode plan
  --plugin-dir <REPO>/plugins/claude-thyquery
  --tools Read,AskUserQuestion  --allowedTools Read,AskUserQuestion
  --no-session-persistence  --setting-sources local
  --strict-mcp-config --mcp-config <CASE_ROOT>/work/mcp.json
  --settings <CASE_ROOT>/work/settings.json
  --model claude-opus-5  --max-budget-usd 0.50
  --session-id 00000000-0000-4000-8000-000000000001
  --output-format stream-json --verbose
  "/thyquery:thyquery <synthetic ambiguous request>"
```

Forbidden, unchanged from `LVP@v6-A`: `--bare`, `--resume`, `--continue`, `--fork-session`, `--dangerously-skip-permissions`, `--safe-mode`, `--disable-slash-commands`, `--publish-report`, `--scaffold`, and any `--allow-tools` grant for `Bash`, `Write`, `Edit`, `WebFetch`, or `mcp__*`.

| Ceiling | Value |
|---|---|
| Cases | 1 |
| Assistant turns | 12 |
| Cost | USD 0.50 via `--max-budget-usd` |
| Wall clock | 180 s |
| Billing | Claude Code Pro subscription. No API credits. |

Case criteria: explicit invocation observed, and a Plan receipt precedes the first Ralph action. Forbidden: `EnterPlanMode`, `/plan` composition, any edit, any execution. Failure maps to `HOST_UNSUPPORTED`, not to `TRACE_INVALID`.

Isolation, receipts, and cleanup are identical to `LVP@v6-A`: disposable case root under system temp, digests only, package digest re-verified, `claude plugin list` re-checked, `npm run check` re-run.

The loaded-context inventory must again be recorded. `LVP_v6_result.md` found contamination far lower than feared — only the target plugin loaded, no user `CLAUDE.md`, no user MCP — but that must be confirmed per run rather than assumed to repeat.

## `A-G0-04` as an interactive procedure

Not part of the automated approval. If wanted, it is a manual run the user performs, costing only subscription quota:

1. `claude --plugin-dir <REPO>/plugins/claude-thyquery` in a scratch directory.
2. Enter stock Plan mode.
3. Invoke `/thyquery:thyquery <ambiguous request>`.
4. When the skill asks a question, choose the cancel path.
5. Report whether the outcome was `CANCELLED`, whether any handoff or native plan followed, and whether anything continued in the background.

This is the same vehicle that suits `A-G0-03`, whose question-correlation criterion is also unobservable under `--print`.

## Options

### `LVP@v7-A` — recommended: run `A-G0-01`

Authorize one live `A-G0-01` execution under the parameters above. `HOST_UNSUPPORTED` is an accepted possible outcome and would be recorded rather than retried.

### `LVP@v7-B` — hold

Run nothing further. `A-G0-02` remains the only live evidence.

## Recommendation and exact gate

`LVP@v7-A`. It is bounded at USD 0.50 of subscription quota and resolves the most consequential open question about the Claude surface: whether Plan evidence is observable at all under `--print`.

Exact `LVP@v7-A 승인` authorizes one live `A-G0-01` run under the pinned command, budgets, and cleanup above.

It does not authorize `A-G0-03`, `A-G0-04`, any G1 case, any Codex run, efficacy evaluation, persistent installation, marketplace registration, publication, or a second run after a completed model run.
