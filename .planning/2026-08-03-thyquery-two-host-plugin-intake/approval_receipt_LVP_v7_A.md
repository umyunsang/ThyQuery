# Approval Receipt — LVP@v7-A

- Date: 2026-08-03 (Asia/Seoul)
- User message: `LVP@v7-A 승인`
- Approved artifact: `LVP_v7.md`
- Approved artifact SHA-256: `0c3951cf47523a269fcaea7d83c4157afdfdd09975af3c11e2e898b1899ad1cc` (reverified at approval; matches the proposed fingerprint)
- Claude package digest: `sha256:7bc5448e6377ef8567da55084a1c9e97eb7ce7abe47dc1f7da5e2e6a62e80f91`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`

## Authorized by this receipt

- Exactly one live execution of Claude G0 case `A-G0-01` — canonical namespaced invocation inside a verified stock Plan session, where a Plan receipt must precede the first Ralph action.
- `--permission-mode plan`, session id `00000000-0000-4000-8000-000000000001`, model `claude-opus-5`.
- Session-only plugin load through `--plugin-dir`, no installation.
- Billing to the Claude Code Pro subscription quota. **No Anthropic API credits.**
- Ceilings: 12 assistant turns, USD 0.50 via `--max-budget-usd`, 180 s wall clock.
- Tooling limited to `Read` and `AskUserQuestion`.
- A disposable case root under system temp, removed after the run.

## Not authorized by this receipt

- `A-G0-03`, `A-G0-04`, any G1 case, any Codex run, or any efficacy evaluation
- Persistent installation, enablement, or marketplace registration
- `--bare`, `--resume`, `--continue`, `--fork-session`, `--dangerously-skip-permissions`, `--safe-mode`, `--disable-slash-commands`
- `--publish-report`, `--scaffold`, or any `--allow-tools` grant for `Bash`, `Write`, `Edit`, `WebFetch`, or `mcp__*`
- Plan execution, publication, deployment, or distribution
- Mutation of `~/.claude/`, `~/.config/`, `.remember/`, or the repository `plugins/` and `spec/` roots
- A second execution of the case after a completed model run

## Accepted outcomes

`G0_PASS` and `HOST_UNSUPPORTED` are both accepted results and are recorded rather than retried.

`HOST_UNSUPPORTED` would carry weight beyond this case: if the skill cannot verify stock Plan evidence even under `--permission-mode plan`, then the authoritative native-plan observation signal that `LVP@v4` listed as live-only does not exist on this surface, and ThyQuery is unusable under `--print` irrespective of instruction quality.

## Obligations carried forward from `LVP@v6-A`

`--bare` remains absent so the subscription authenticates. The loaded-context inventory must be recorded again for this run. `LVP_v6_result.md` found contamination far lower than priced — only the target plugin loaded, no user `CLAUDE.md`, no user MCP servers — but that is a per-run observation and may not repeat, so it is verified rather than assumed.

The retry boundary is unchanged: an invocation the CLI rejects before any model call consumes no quota and executes no case, so correcting the harness and re-invoking is not a second run. Once a model run completes, its result stands.
