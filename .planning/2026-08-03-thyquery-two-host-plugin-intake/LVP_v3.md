# ThyQuery Live Validation Proposal — `LVP@v3`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Supersedes: `LVP@v2`; no `LVP@v1-*` or `LVP@v2-*` approval token applies to this repaired candidate.
- Parent implementation plan: `IP@v1-B`
- Parent plan SHA-256: `1806cec6b2d88aa7a83f1a6ef489159d2229d4951066c0e277585a5e8e2a68f2`
- Codex package digest: `sha256:2909fdb9f5dbdb786cdae8bb1a887b458ff8039b03a54b81a1a4b27821e10de7`
- Claude package digest: `sha256:58d640b357e3a75a304e5ee55672e745089a671b84aecc2b5fa6c0377c50d9e4`
- Codex case manifest SHA-256: `02631cbc643301c598fc5493eb7e6bd318fbad72ec098caf17186b75e05ba239`
- Claude case manifest SHA-256: `ee98db2c76a976dd52bc57426f5f784f7b9c4c19a65b91296b7799f3053cd5e2`
- Evaluation outcome schema SHA-256: `a3a80be8a3b644cbc664cc8444f2e6e0fa772cab75943fcc3e7ebd418d1aee46`
- `npm test`: 60/60 PASS
- `npm run fixtures`: 8/8 PASS
- `npm run validate`: PASS
- Claude native strict package validation: PASS
- Current status: `LIVE_VALIDATION_SCOPE_DECISION_REQUIRED`

This proposal was prepared but not executed. It authorizes nothing by itself. Both host cells remain `CONFORMANCE_UNTESTED`.

## Repaired candidate boundary

The current package snapshots require verified Plan evidence before refinement, separate controller-computed closure predicates from a native `USER` acceptance receipt bound to the current contract, require a native `USER` receipt for every accepted residual ledger, classify exact repeated responses as non-progress stall evidence, freeze the contract after handoff intent, and make host-authenticated `NOT_APPLIED` absorbing `BLOCKED`.

These are deterministic specification and instruction changes only. They do not prove that either live host follows the instructions or supplies the required receipts.

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

### `LVP@v3-A` — recommended: construct and dry-validate runners only

Authorize workspace-local construction of:

1. a Claude print/stream-json runner for the four G0 cases;
2. a Codex isolation-feasibility probe limited to read-only local help/schema inspection;
3. deterministic dry-run tests using recorded synthetic stream fixtures;
4. exact future commands, tool allowlists, assistant-turn ceilings, USD ceilings, deadlines, receipt projections, temporary paths, cleanup assertions, and protected-target recovery checks.

Exclusions: no model call, no plugin load, no marketplace registration, no real config/cache mutation, no G0/G1 execution, no efficacy evaluation, and no plan execution. The resulting artifact must either produce a separately fingerprinted live-run proposal or mark the corresponding host unsupported.

### `LVP@v3-B` — hold Claude-only live scope for a later executable proposal

No Claude live run is approval-ready now. A later proposal may request only the four Claude G0 synthetic cases after the runner exists and must pin the exact command, setting sources, empty strict MCP configuration, read/question-only tool allowlist, per-case turns/cost, total cost, deadline, redaction, temporary targets, and cleanup/recovery checks.

Codex, all G1 cases, and efficacy evaluation would remain unrun.

### `LVP@v3-C` — hold all follow-up work

Perform no further work and retain both hosts as `CONFORMANCE_UNTESTED`.

## Recommendation and exact gate

Recommend `LVP@v3-A` only if the user wants to continue. It resolves runner, isolation, budget, and cleanup ambiguity without crossing into live model use.

Exact `LVP@v3-A 승인` would authorize only the workspace-local runner and deterministic dry-validation scope above. It would not authorize a model call, plugin load, persistent install, marketplace/config mutation, G0/G1 execution, efficacy evaluation, publication, deployment, or plan execution.
