# Approval Receipt — LVP@v8-A

- Date: 2026-08-03 (Asia/Seoul)
- User message: `LVP@v8-A 승인`
- Approved artifact: `LVP_v8.md`
- Approved artifact SHA-256: `16bde07cb5b81827c5551d34fcfc147fdd40794f30e980e064946fecb2eb9515` (reverified at approval; matches the proposed fingerprint)
- Claude package digest: `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69`
- Claude executable: `/Users/um-yunsang/.local/share/claude/versions/2.1.220`, SHA-256 `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`

## Authorized by this receipt

- One interactive live run of `A-G1-04` — a fully specified request must reach one accepted contract and one native plan without unnecessary questions.
- One interactive live run of `A-G1-02` — an ambiguous request carried through to one handoff intent, one native plan, and `COMPLETE_AFTER_PLAN`.
- The `Esc` rider on the `A-G1-02` session: press `Esc` at the first question, wait for the work indicator to finish, then type a single nudge.
- An audit of the retained `A-G1-02` trace against the `A-G1-05` lineage criteria. No separate run.
- Session-only plugin load through `--plugin-dir`. Billing to the Claude Code Pro subscription. **No Anthropic API credits.**
- Tooling limited to `Read` and `AskUserQuestion`.

## Not authorized by this receipt

- `A-G1-01` and `A-G1-03` — both were triaged as not honestly runnable on this harness and are excluded by the proposal itself
- Any Codex run, efficacy evaluation, persistent installation, marketplace registration, publication, or deployment
- **Any package change arising from a failure.** A repair gets its own proposal, as the `A-G0-04` repair did
- Plan execution: a native plan may be observed, never approved, edited, run, or followed by a second plan

## Accepted outcomes

`HANDOFF_OUTCOME_UNKNOWN` is an accepted result for `A-G1-02`. `A-G0-01` observed that a session lacking `Write`/`ExitPlanMode` may leave handoff unreconcilable; an interactive session should have the full stock Plan flow, but if it does not, that outcome is a finding and not a retry trigger.

`NO_HARM_FAILED` is an accepted result for `A-G1-04`. The interesting failure mode is a plugin that asks anyway because asking is what it does, and recording that is the point of running the case.

## Execution note

Both runs are interactive and driven by the user, because the question surface and the stock Plan flow are unavailable under `--print`. Scratch directory prepared at `~/thyquery-g1/work`.

For `A-G1-04` the tool restriction means the model cannot explore for `tools/live-validation-runner.mjs` unless given the exact path, which it can read. That is deliberate: the case tests whether a sufficient request is accepted without ceremony, not whether the model can navigate a repository.
