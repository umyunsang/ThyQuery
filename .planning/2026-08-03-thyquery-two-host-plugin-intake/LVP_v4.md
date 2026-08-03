# ThyQuery Live Validation Disposition — `LVP@v4`

## Status and authority

- Date: 2026-08-03 (Asia/Seoul)
- Status: `NO_LIVE_APPROVAL_REQUESTED`
- Closes: the runner-construction/deterministic-dry-validation epoch authorized by exact `LVP@v3-A 승인`
- Parent proposal: `LVP_v3.md`
- Parent proposal SHA-256: `fe17b11ac61012423aadb72aca274bd4ff1dabf4f23e26d9f1eb96a64533f39a`
- Parent approval receipt: `approval_receipt_LVP_v3_A.md`
- Current live status: both hosts `CONFORMANCE_UNTESTED`

This is a closing disposition, not a live-run proposal. It authorizes nothing and defines no approval token.

## Bound runner artifacts

| Artifact | SHA-256 |
|---|---|
| `tests/live-validation/runner-profile.v1.json` | `dc5ce3e568f85c078c54407f7a2ef990aa7e7800a94f04638a296b9375431668` |
| `src/live-validation/runner.mjs` | `9c0ea21b8386484bd695de1249c51fd2d9e6fb869c47025596dcf263d234fc33` |
| `tools/live-validation-runner.mjs` | `d3cb01a54113d623d1600597e729af16d5b266491673ecd139703835527a026b` |
| `docs/live-validation-runner.md` | `d632f371298f1f7b8063f73a16a7858df2cd5d01a938df7e1bdef58b8f0a2f91` |
| `tests/fixtures/live/claude/A-G0-01.ndjson` | `a0823301d5b9c577b4c18c60b3d5c8987833acddfa99a5678b02e4a3440c5048` |
| `tests/fixtures/live/claude/A-G0-02.ndjson` | `2919e5ac139ff2f02b2f8db2b3cfc79b0e7c008d22bcd504335769753eb82e26` |
| `tests/fixtures/live/claude/A-G0-03.ndjson` | `1c439ce557db2d47e2ae84916c59e9bf92c630d4e17356cbfdc8a37eea4fe8b9` |
| `tests/fixtures/live/claude/A-G0-04.ndjson` | `cbcda5f5bcebc55ac07f6b4af96c0c972b8979146007fd23368246cc3a73358a` |
| `package.json` | `1f3cebfc38c2cb55965c70b8aed106737b6a0604527311d9408e672f8e2d094c` |

> **Historical record.** The values in this section are what was true when this epoch closed. The packages were changed afterwards, on 2026-08-03, to state the v1 calibration status in the closure policy. Current package digests live in `docs/implementation-evidence.md`; this document is not updated to track them.

The two instruction-first package snapshots were not changed during this epoch:

- Codex package: `sha256:2909fdb9f5dbdb786cdae8bb1a887b458ff8039b03a54b81a1a4b27821e10de7`
- Claude package: `sha256:58d640b357e3a75a304e5ee55672e745089a671b84aecc2b5fa6c0377c50d9e4`

## Observed deterministic proof

- RED 1: the first runner test failed with `ERR_MODULE_NOT_FOUND` for intentionally absent `src/live-validation/runner.mjs`.
- RED 2: the closing receipt test failed with `ENOENT` for intentionally absent `LVP_v4.md`.
- RED 3: a later hardening gate left three assertions failing across a session boundary — profile validation accepted `--resume` and a redefined `HOME`, receipt projection accepted schema drift and invalid counters, and the CLI echoed a rejected argument into stdout. All three are now enforced, and this table records the repaired artifact digests rather than the pre-repair ones.
- RED 4: an independent review of the repaired runner found that mandatory safety flags were validated by token membership only, so `--permission-mode acceptEdits` with a stray `plan` token, `--tools Read,AskUserQuestion,Bash`, a real `--model`/`--plugin-dir`/`cwd`, and `--max-budget-usd 500` against a frozen USD 0.50 ceiling all validated. Four gates failed first, then the argv became an exactly frozen contract with placeholder, case-root, duplicate-flag, and budget/tool cross-checks. The Plan-only and two-tool claims below are now enforced rather than asserted.
- `npm test`: 78/78 PASS.
- `npm run validate`: package manifests/self-containment/generated parity PASS.
- `npm run fixtures`: eight/eight deterministic core fixtures PASS.
- `npm run runner:doctor`: `DRY_VALIDATION_READY`; four frozen G0 projection hashes matched.
- `npm run runner:dry`: four/four `DRY_FIXTURE_PASS`; no host, model, plugin, live case, native plan, or plan execution.
- `npm run runner:propose`: argv-only data, `LIVE_RUN_PROPOSAL_BLOCKED`, `executable_live_scope:false`.
- Runner unit/negative contract: 17/17 PASS, including empty-`PATH` doctor/dry/propose, execution-verb rejection, session-persistence and environment-redefinition rejection, receipt schema/counter rejection, and non-echoing argument validation.

The categorical fixture schema is project-owned synthetic data. None of these passes is a Claude stream, plugin, Plan, question, native-plan, or live G0 receipt.

## Codex read-only feasibility receipt

The runner executed exactly eight allowlisted Codex 0.146.0 `--version`/`--help` vectors. All exited 0. Raw stdout/stderr was discarded; only SHA-256 values were retained.

| argv | stdout SHA-256 | stderr SHA-256 |
|---|---|---|
| `codex --version` | `446dce03fa8317c76f51ca91da1f075e192a75cf86c889c594034ef9ec2fcc52` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex --help` | `0d9ece4cbe36e1325b24e65969827f074554bc716502049f045c5370e0e6aa47` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex plugin --help` | `8a9948717913edc2e80e802d2c69a7893461799843f5489096ea3dfb12ce4dae` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex plugin add --help` | `50b5c1c54385415a890074d5cc539fe3e78267c2b5d0821100ba5ce801972e30` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex plugin marketplace --help` | `d0da9efccab098da6b32bdd8e84f649bcf60fd4fb261eb80491ba1b02cda7487` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex plugin marketplace add --help` | `9f8cea727d96250c8d80f3cef0b3e067e0b6f7fccebb1aee0720f543a1bbb64f` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex app-server --help` | `97a371dd6b3fbb165f46a5f1309f872689fe335068dbdccb3cc932002c0a6e20` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `codex app-server generate-json-schema --help` | `c119fb866c02811bd66e23b7792f76fc16df91452caf8b47b34788c6ac97da1b` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |

No add, marketplace mutation, app-server startup, schema generation, model call, plugin load, or config/cache mutation command was issued. The probe does not itself prove protected-target non-mutation. Codex therefore remains `ISOLATION_METHOD_UNRESOLVED` and `HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH`.

## Claude disposition

Claude Code 2.1.220 exposes the proposed print/stream-json, Plan, session-only plugin-directory, no-session-persistence, budget, settings/MCP, and tool-restriction flags. The runner freezes serial four-case ceilings at 12 completed top-level assistant messages and USD 0.50 per case, USD 2.00 total, 180 seconds per case and 900 seconds total, with only `Read` and `AskUserQuestion` available.

No executable live scope is issued because the following remain unresolved or unproved:

- pinned executable path/digest and model;
- documented NDJSON input/output and question-correlation shapes;
- authoritative native-plan observation signal;
- cost enforcement and accounting;
- non-session config/cache and managed-policy isolation;
- credential provision without disclosure.

The proposal intentionally does not redefine `HOME`, `PATH`, or XDG variables. Claude is `LIVE_RUN_PROPOSAL_BLOCKED` and `HOST_UNSUPPORTED_IN_CURRENT_APPROVAL_EPOCH`, not live-tested.

## Final boundary

The current Ralph/graph plugins remain instruction-first candidates invoked only in stock Plan mode. No installation, plugin loading, host/model invocation, paid call, real configuration/cache mutation, live G0/G1 case, efficacy evaluation, publication, deployment, plan execution, helper runtime, hook, daemon, or persistent state was authorized or performed.

There is no next approval request in this disposition. A future live proposal would first need primary or deterministic evidence resolving the host-specific blockers, exact new artifact fingerprints, and a fresh explicit approval boundary.
