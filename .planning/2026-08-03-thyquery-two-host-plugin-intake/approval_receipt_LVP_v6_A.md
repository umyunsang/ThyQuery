# Approval Receipt — LVP@v6-A

- Date: 2026-08-03 (Asia/Seoul)
- User message: `LVP@v6-A 승인`
- Approved artifact: `LVP_v6.md`
- Approved artifact SHA-256: `ebf61f1da636975da843462b23d1e3b8145c74fc050c5d572de10cf5a46f7b38` (reverified at approval; matches the proposed fingerprint)
- Claude package digest: `sha256:7bc5448e6377ef8567da55084a1c9e97eb7ce7abe47dc1f7da5e2e6a62e80f91`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`

## Authorized by this receipt

- Exactly one live execution of Claude G0 case `A-G0-02` — invocation outside Plan mode must fail closed as `PLAN_MODE_REQUIRED` with zero questions, research, handoffs, or plans.
- Session-only plugin load through `--plugin-dir`, no installation.
- Billing to the Claude Code Pro subscription quota. **No Anthropic API credits.**
- Ceilings: 12 assistant turns, USD 0.50 via `--max-budget-usd`, 180 s wall clock.
- Tooling limited to `Read` and `AskUserQuestion`.
- A disposable case root under system temp, removed after the run.

## Not authorized by this receipt

- Any other G0 or G1 case, any Codex run, or any efficacy evaluation
- Persistent installation, enablement, or marketplace registration
- `--bare`, `--resume`, `--continue`, `--fork-session`, `--dangerously-skip-permissions`, `--safe-mode`, `--disable-slash-commands`
- `--publish-report`, `--scaffold`, or any `--allow-tools` grant for `Bash`, `Write`, `Edit`, `WebFetch`, or `mcp__*`
- Plan execution, publication, deployment, or distribution
- Mutation of `~/.claude/`, `~/.config/`, `.remember/`, or the repository `plugins/` and `spec/` roots
- A second execution of the case after a completed model run

## Two recorded deviations from the proposal's command block

**1. Permission mode.** The proposal reproduced the frozen G0 argv, which pins `--permission-mode plan`. Case `A-G0-02` requires a *non-Plan* session by definition: its precondition is "fresh isolated non-Plan session" and its whole purpose is to prove the skill refuses outside Plan mode. Running it under `plan` would test the opposite condition and yield a meaningless pass. The case definition governs, so the run uses a non-Plan permission mode. This resolves an internal inconsistency in the proposal rather than widening its scope.

**2. Retry boundary.** "No second run" binds a *completed model run*. An invocation that the CLI rejects on argv, or that fails to parse before any model call, consumes no quota and executes no case; correcting the harness and re-invoking is therefore not a second run. Once a model run completes, its result stands and any repeat requires a new proposal.

## Contamination that must be recorded with the result

`--bare` is deliberately absent so the subscription authenticates. The session therefore loads what a real user's session loads: user-level `CLAUDE.md`, installed plugins, user settings, hooks, and auto-memory. A `PLAN_MODE_REQUIRED` produced by a user hook rather than by the skill would be a false pass, so the receipt must carry the loaded-context inventory alongside the outcome, and no result may be reported as clean-room conformance.
