# ThyQuery Live Validation Proposal — `LVP@v2`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Supersedes: `LVP@v1`; no `LVP@v1-*` approval token applies to the repaired candidate.
- Parent implementation plan: `IP@v1-B`
- Parent plan SHA-256: `1806cec6b2d88aa7a83f1a6ef489159d2229d4951066c0e277585a5e8e2a68f2`
- Codex package digest: `sha256:7d0d48235be01dcdbd19931e0dea56cdc0e7ec875c5c67f80988111fd60460c0`
- Claude package digest: `sha256:4d123695db1fa00ec1bc31fae8a56d60587f95ef4a185257024b4b8d88251b86`
- Codex case manifest SHA-256: `02631cbc643301c598fc5493eb7e6bd318fbad72ec098caf17186b75e05ba239`
- Claude case manifest SHA-256: `ee98db2c76a976dd52bc57426f5f784f7b9c4c19a65b91296b7799f3053cd5e2`
- Evaluation outcome schema SHA-256: `a3a80be8a3b644cbc664cc8444f2e6e0fa772cab75943fcc3e7ebd418d1aee46`
- `npm test`: 54/54 PASS
- `npm run fixtures`: 8/8 PASS
- `npm run validate`: PASS
- Claude native strict package validation: PASS
- Current status: `LIVE_VALIDATION_SCOPE_DECISION_REQUIRED`

This proposal was prepared but not executed. It authorizes nothing by itself. Both host cells remain `CONFORMANCE_UNTESTED`.

## Current feasibility findings

### Claude Code 2.1.220

The installed CLI exposes session-only `--plugin-dir`, `--permission-mode plan`, print/stream-json I/O, setting-source isolation, strict MCP configuration, and tool allowlists. `--no-session-persistence` and `--max-budget-usd` apply only with print mode. `--safe-mode` disables plugins and cannot validate ThyQuery.

A nonpersistent run therefore needs a workspace-local stream-json runner with fixed synthetic inputs, assistant-turn and cost counters, a hard deadline, redacted receipts, explicit temporary paths, and cleanup verification. That runner does not exist. No plugin was loaded and no model was called under `IP@v1-B`.

### Codex 0.146.0

The inspected CLI exposes marketplace-oriented plugin add/list/remove but no established session-only local-plugin loader or native local plugin validator. No safe no-config/no-install live method has been demonstrated. The Codex cell remains `ISOLATION_METHOD_UNRESOLVED`.

Any future Codex runner design must identify exact disposable marketplace/config/cache targets, prove protected-home non-mutation and recoverability, and remain separately approved before a plugin load or model call.

## Frozen validation inputs

- Claude manifest: nine proposed cases, four G0 and five G1.
- Codex manifest: nine semantically equivalent cases using host-native grammar.
- Each manifest records `ISOLATION_METHOD_UNRESOLVED`, unset model/cost/deadline budgets, no persistent install, no real configuration mutation, no plan execution, and no paid call authority.
- Runtime cases may not begin until an exact loader, commands, targets, budgets, cleanup actions, and recovery receipts replace every unresolved field.

## Options

### `LVP@v2-A` — recommended: construct and dry-validate runners only

Authorize workspace-local construction of:

1. a Claude print/stream-json runner for the four G0 cases;
2. a Codex isolation-feasibility probe limited to read-only local help/schema inspection;
3. deterministic dry-run tests using recorded synthetic stream fixtures;
4. exact future commands, tool allowlists, assistant-turn ceilings, USD ceilings, deadlines, receipt projections, temporary paths, cleanup assertions, and protected-target recovery checks.

Exclusions: no model call, no plugin load, no marketplace registration, no real config/cache mutation, no G0/G1 execution, no efficacy evaluation, and no plan execution. The resulting artifact must either produce a separately fingerprinted live-run proposal or mark the corresponding host unsupported.

### `LVP@v2-B` — hold Claude-only live scope for a later executable proposal

No Claude live run is approval-ready now. A later proposal may request only the four Claude G0 synthetic cases after the runner exists and must pin the exact command, setting sources, empty strict MCP configuration, read/question-only tool allowlist, per-case turns/cost, total cost, deadline, redaction, temporary targets, and cleanup/recovery checks.

Codex, all G1 cases, and efficacy evaluation would remain unrun.

### `LVP@v2-C` — hold all follow-up work

Perform no further work and retain both hosts as `CONFORMANCE_UNTESTED`.

## Recommendation and exact gate

Recommend `LVP@v2-A` only if the user wants to continue. It resolves runner, isolation, budget, and cleanup ambiguity without crossing into live model use.

Exact `LVP@v2-A 승인` would authorize only the workspace-local runner and deterministic dry-validation scope above. It would not authorize a model call, plugin load, persistent install, marketplace/config mutation, G0/G1 execution, efficacy evaluation, publication, deployment, or plan execution.
