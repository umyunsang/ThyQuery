# ThyQuery Live Validation Proposal — `LVP@v1`

## Metadata

- Date: 2026-08-03 (Asia/Seoul)
- Parent implementation plan: `IP@v1-B`
- Parent plan SHA-256: `1806cec6b2d88aa7a83f1a6ef489159d2229d4951066c0e277585a5e8e2a68f2`
- Codex package digest: `sha256:7d0d48235be01dcdbd19931e0dea56cdc0e7ec875c5c67f80988111fd60460c0`
- Claude package digest: `sha256:a2dffeca62f437566c580cf7a3c59b7eb2ae8cf110a38fae2d9e8034183c1a0c`
- Codex case manifest SHA-256: `1f555ec30854f43f9b1cd69e40c20c387ef8d309917fb7cd74875632e4e411f7`
- Claude case manifest SHA-256: `7256885fcc43c6abc8883b3cb0f6c095dbf4c863b4f0b47b456e1ed74582219d`
- Current status: `LIVE_VALIDATION_SCOPE_DECISION_REQUIRED`

This proposal was prepared but not executed. It authorizes nothing by itself.

## Current feasibility findings

### Claude Code 2.1.220

The installed CLI exposes:

- session-only `--plugin-dir` loading;
- `--permission-mode plan`;
- print/stream-json input and output;
- `--no-session-persistence` only in print mode;
- `--max-budget-usd` only in print mode;
- `--setting-sources` and `--strict-mcp-config` for configuration isolation;
- an explicit tool allowlist.

`--safe-mode` cannot be used because it disables plugins and skills. A nonpersistent live run therefore needs a small stream-json harness that counts assistant turns, supplies only synthetic responses, terminates on its fixed budget, captures redacted receipts, and deletes its temporary stream artifacts. That harness does not yet exist and is not authorized by `IP@v1-B` as a live runner.

### Codex 0.146.0

The installed CLI exposes only marketplace-based plugin add/list/remove. `plugin add` writes an installed plugin from a configured marketplace snapshot; no direct session-only `--plugin-dir` or local `plugin validate` surface appears in inspected help.

No safe no-config/no-install live loader is currently established. Real marketplace registration or user configuration mutation is forbidden. A disposable marketplace/config/cache design would itself need exact targets, recoverability, protected-home proof, and fresh approval. Until then, the Codex live cell is `ISOLATION_METHOD_UNRESOLVED`.

## Frozen cases

- Claude manifest: 9 cases—four G0 and five G1.
- Codex manifest: 9 equivalent semantic cases with host-native grammar.
- Every case fixes preconditions, action, expected events, forbidden effects, cleanup, and verdict.
- Both manifests forbid persistent install, real configuration mutation, plan execution, and unbounded spending.

## Options

### `LVP@v1-A` — recommended next scope: build and dry-validate the isolated runners only

Authorize workspace-local construction of:

1. a Claude print/stream-json runner for the four G0 cases;
2. a Codex isolation feasibility probe that performs read-only schema/help inspection and produces no marketplace or plugin mutation;
3. deterministic dry-run tests using recorded synthetic stream fixtures;
4. exact future command, tool allowlist, message/turn budget, USD ceiling, deadline, receipt projection, temporary paths, and cleanup proof.

Explicit exclusions: no model call, no plugin load, no marketplace registration, no real config/cache mutation, no G0/G1 execution, no efficacy evaluation. A resulting `LVP@v2` would request live authority only after both runners pass dry validation or would mark Codex unsupported.

### `LVP@v1-B` — Claude G0 live pilot only

This option is not recommended until the stream runner in A exists. If nevertheless selected through a revised, executable scope, it would be limited to four Claude G0 synthetic cases, session-only plugin loading, Plan mode, no setting sources, strict empty MCP configuration, a read/question-only tool allowlist, print/stream-json non-persistence, at most six assistant turns and USD 2 per case, USD 8 total, 45 minutes total, no edits/commands/plan execution, redacted receipts, and immediate temporary-artifact cleanup.

Codex and all G1/efficacy cases would remain unrun. Because the runner and exact command are absent, the current `LVP@v1-B` text is a design option, not an approval-ready execution contract.

### `LVP@v1-C` — hold

Perform no further work. Preserve both hosts as `CONFORMANCE_UNTESTED`.

## Recommendation and gate

Recommend `LVP@v1-A` if the user wants to continue. It closes isolation and budget ambiguity without crossing into live model use. Do not approve B as written; first produce a separately fingerprinted executable `LVP@v2`.

Exact `LVP@v1-A 승인` would authorize only the workspace-local runner/dry-validation scope above. It would not authorize a model call, plugin load, persistent install, marketplace/config mutation, efficacy evaluation, or plan execution.
