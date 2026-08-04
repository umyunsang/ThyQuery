# ThyQuery Workspace Implementation Evidence Packet

Status: `WORKSPACE_IMPLEMENTATION_REVIEW_PASS(IP@v1-B)`, not installed, not live-tested, and not released.

## Approved scope

- Authority: exact `IP@v1-B 승인`.
- Approved plan SHA-256: `1806cec6b2d88aa7a83f1a6ef489159d2229d4951066c0e277585a5e8e2a68f2`.
- Receipt: `.planning/2026-08-03-thyquery-two-host-plugin-intake/approval_receipt_IP_v1_B.md`.
- Implementation: framework-neutral specs, dependency-free development oracle, two instruction-first packages, deterministic fixtures/tests, documentation, and non-installing validation only.
- Nearest durable project authority: project-local `AGENTS.md`; the user-supplied global instructions remain its parent authority.

No installation, plugin enablement, marketplace mutation, real host configuration change, live/paid model call, efficacy run, publication, deployment, or plan execution occurred.

## Delivered behavior

1. Explicit Plan-first entry: Codex `$thyquery`; Claude `/thyquery:start`.
2. Missing/unprovable stock Plan returns `PLAN_MODE_REQUIRED` before question, research, or plan.
3. One canonical event-derived invocation state with predecessor/hash/idempotency checks.
4. Frozen P0–P8 guard order and deterministic gap/action routing.
5. Bounded Ralph macrosteps, with caps/repeats/stalls remaining non-success.
6. Full closure conjunction and explicit current-digest residual acceptance.
7. Minimum-disclosure verification trace and no persistence/telemetry/runtime helper.
8. One current-contract handoff key, uncertain-outcome no-retry, one native-plan observation, and absorbing completion.
9. Byte-equal generated protocol/graph/closure snapshots across both packages.
10. Claude implicit model selection is disabled; ordinary prompts remain outside the explicit command boundary.
11. Derived non-success routes commit absorbing canonical terminals; closure nodes remain handoff authorizers rather than product terminals.
12. Plan/native-plan receipts are host-authenticated in the oracle, active macrosteps reject empty work, and corrections append supersession lineage while invalidating dependents.
13. Finite, not-run live manifests state that isolation is unresolved; the A/B/C/D preregistration retains `C−B` as the graph estimand and rejects empty outcome groups.
14. Residual acceptance requires per-item source/disposition provenance; a user response counts as progress only when its content digest and material targets are present.
15. Resolved and residual success require native `USER` authority/comprehension receipts bound to the current contract or residual-ledger digest; model/controller booleans cannot self-authorize success.
16. A refinement proposal before verified Plan commits only `PLAN_MODE_REQUIRED`; exact repeated responses spend no progress budget, preserve stall diagnostics, and create no duplicate provenance.
17. A fenced handoff rejects later refinement, and host-authenticated `NOT_APPLIED` is absorbing `BLOCKED`.

## Artifact receipt

- Volatile file/line counts are intentionally omitted; exact package and proposal fingerprints below are the acceptance receipts.
- Codex package digest: `sha256:17beab550b98bd48a22584520a3c936d39e3ea8fd8fd4928958ed2bef9583bad`.
- Claude package digest: `sha256:dbbb2982b2fae7bfc654bebe9b8682d8ac1ace343dc8b22c66cb373547088355`.
- Codex live-manifest SHA-256: `02631cbc643301c598fc5493eb7e6bd318fbad72ec098caf17186b75e05ba239`.
- Claude live-manifest SHA-256: `ee98db2c76a976dd52bc57426f5f784f7b9c4c19a65b91296b7799f3053cd5e2`.
- Evaluation-arms SHA-256: `9e37a4206024c1cf3238c8f5faed1f19e638e9f7003af60340ff3ba2a4507647`.
- Evaluation-outcome-schema SHA-256: `a3a80be8a3b644cbc664cc8444f2e6e0fa772cab75943fcc3e7ebd418d1aee46`.
- Preregistration SHA-256: `8d2829fd0dd9347fba2d8e201fdd48312c29630e7c6056d35f3476548f22da44`.
- Live-validation-proposal `LVP_v3.md` SHA-256: `fe17b11ac61012423aadb72aca274bd4ff1dabf4f23e26d9f1eb96a64533f39a`.
- Final change-review receipt SHA-256: `bd1643c2daae8428d3696d1188110db5e1699fcc4361397cae2b1c1532242d60`.

Package digests cover sorted relative paths plus exact text contents. They are project receipts, not signatures or publication hashes.

## Verification observed

| Check | Result | Scope |
|---|---|---|
| Initial red test | `ERR_MODULE_NOT_FOUND` for missing planned reducer | Red-gate evidence before core implementation |
| Review regressions before repair | R1/R2 plus R3 authority, preflight, result-absorption, repeat, and handoff-fence paths | Explicit invocation, terminal semantics, handoff provenance, user-owned acceptance, material progress, current proposal binding |
| `npm test` | 60/60 PASS | Unit, graph, contracts, package, privacy, handoff, readiness |
| `npm run validate` | PASS | Manifests, self-containment, generated parity |
| `npm run fixtures` | 8/8 PASS | Pure deterministic replay, zero effects |
| `claude plugin validate --strict plugins/claude-thyquery` | PASS | Native Claude package grammar only |
| Fallback local Codex validators | Plugin PASS; Codex skill PASS | Static-only fallback because the primary system-validator path disappeared |
| Claude skill checked by Codex fallback validator | Not applicable; rejects Claude-only `disable-model-invocation` | Expected cross-host schema mismatch, not used as Claude evidence |
| Dependency/network scope tests | PASS | No dependencies, lockfile, runtime network client, hook, or plugin JS |

The originally available `.codex/skills/.system` validator path disappeared during the run. The later Codex-only static cross-check used the remaining `.codex-cli-alt` copy and is labeled fallback evidence. Claude's native strict validator independently accepts the Claude-specific explicit-invocation frontmatter.

## Independent review and repair receipts

The first independent review returned `FAIL`. Confirmed blockers were fixed red-first: Claude implicit invocation, post-terminal key-collision overwrite, unpersisted derived terminals, repeated closure routing after handoff intent, empty macrostep progress, and evidence-free native-plan completion. Two non-blockers were also corrected: live isolation is now explicitly unresolved, and evaluation outcomes require pinned, non-empty measurement/gate receipts.

The second independent review also returned `FAIL`. Its three blockers were reproduced before repair: provenance-free residual acceptance, contentless user responses treated as progress, and a stale `LVP@v1` binding. The repaired controller then required per-residual provenance and digest-bound material user evidence; historical `LVP@v2` bound that intermediate candidate.

The third host/receipt review passed with only an informational volatile line-count note, which was removed. The third core review returned `FAIL`: success acceptance was not bound to a validated user authority receipt, refinement could commit before verified Plan preflight, `NOT_APPLIED` could be overwritten before routing, and an exact repeated response under a new event key could clear stall. Each path was repaired with focused regressions; user-response provenance now updates the contract digest, and post-handoff refinement is fenced. `LVP@v3` binds the resulting package snapshots and 60-test proof.

The final independent review passed on both axes with no P0–P3 finding: core state-machine semantics, and host/receipt/claim boundaries. Both reviewers reported zero writes and zero descendants and were terminated immediately after result integration. The final receipt is `docs/change-review.md`.

## Architecture pressure test

- Domain ownership: `spec/` is normative; the oracle, generated resources, and adapters point inward to it.
- State ownership: one invocation, one logical writer, one reducer-derived state.
- Side effects: absent from replay and unimplemented in the development oracle; native host effects remain future conformance work.
- Abstraction pressure: six small reference modules correspond to real boundaries—canonicalization, reduction, guards, routing, replay/privacy, graph checking. No framework, service, repository, or manager layer was added.
- Next-change location: policy changes belong in `spec/`, deterministic semantics in `src/reference/`, host differences in the matching adapter/package.
- Known duplication: host skills repeat safety semantics intentionally so each package is self-contained; generated normative snapshots prevent semantic drift.

## Known risks and explicit unknowns

1. Instruction text cannot by itself prove cryptographic lineage, deterministic guard execution, or effect fencing. G0/G1 remains mandatory.
2. Codex 0.146.0 exposes marketplace installation and no direct plugin-directory loader or validator, but `CODEX_HOME` redirects the whole configuration root, so a disposable root loads a local candidate without touching real state. That resolves package loading, not behaviour: what the loaded skill does under a model is still unmeasured.
3. Claude session-only loading is documented, but interactive non-persistence is not: `--no-session-persistence` applies only to print mode. A stream-json harness needs separate approval and testing.
4. Authoritative contract-to-native-plan receipts and exactly-once host effects remain unproven. The design claims at-most-one logical intent and stops on uncertainty.
5. Closure, burden, stall, and efficacy thresholds remain uncalibrated; resolved success must fail closed where calibration is absent.
6. No real Korean/mixed-language, human, host, latency, cost, or plan-quality outcome exists yet.

## Review target

Review both axes:

- Spec: compare this workspace with `IP_v1_B.md`, `DS_v2.md`, product contract, guard/closure/handoff policies, and no-live/no-install authority.
- Standards: trace reducer, guard, replay/privacy, graph checks, package instructions, manifests, fixtures, docs claims, and next-gate isolation.

Classify findings as blockers or non-blockers. Static readiness must not be converted into live support or release readiness.
