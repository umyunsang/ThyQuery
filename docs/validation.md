# Validation

## Allowed deterministic aggregate

No installation or dependency download is required:

```sh
npm test
npm run validate
npm run fixtures
npm run runner:doctor
npm run runner:dry
```

`npm test` exercises canonicalization, event reduction, idempotency, predecessor integrity, P0–P8 routing, closure truth tables, budget semantics, cycle/stall routing, pure replay, privacy projection, handoff fencing, graph reachability/absorption/SCC exits, schema samples, package rules, and validation/evaluation readiness.

`npm run validate` checks manifests and skill entrypoints, package self-containment, forbidden endpoints/hooks/absolute paths, and byte equality between canonical sources and both generated resource sets.

`npm run fixtures` replays the synthetic core traces with zero effects.

`runner:doctor` and `runner:dry` validate only the `LVP@v3-A` profile and four recorded categorical Claude G0 projections. They do not resolve or spawn a host binary and produce no live evidence. The full boundary is in [live-validation-runner.md](live-validation-runner.md).

## Host-native static check

Claude package structure is checked without loading:

```sh
claude plugin validate --strict plugins/claude-thyquery
```

The current Codex CLI exposes no equivalent direct local validator in the inspected help. An available local plugin-schema validator can provide a static cross-check, but it is not a Codex runtime receipt and is not an installation test.

## Validation surfaces

| Claim | Evidence in this scope | Explicitly not proven |
|---|---|---|
| Reference controller semantics | Unit/contract/graph tests | Model compliance in a host |
| Package consistency | Manifests, skill validators, generated parity | Invocation or tool callability |
| Claude package grammar | Native strict validator | Plan receipt, question, native plan |
| Codex package grammar | Static schema validator and project checks | Native plugin loading or runtime support |
| Live G0/G1 readiness | Finite not-run manifests | Any live pass |
| Runner preparation | Inert-profile tests and recorded-fixture dry receipts | Host stream compatibility, plugin loading, or any G0 result |
| Evaluation readiness | Synthetic dossiers, rubrics, preregistration | Graph or loop efficacy |
| Closure truth table | Reducer conjunction over supplied flags | That eight of the ten flags are derivable from a defined criterion |
| Reachable success path | `isResidualAccepted` structural and digest checks | Nothing further; it consults no closure flag |

## Future G0/G1 gate — not run

Each host manifest fixes nine proposed cases covering canonical invocation, Plan preflight, outside-Plan failure, native question, cancel, cap, one plan/no execution, uncertain handoff, clear-query no-harm, and instruction-first lineage. The isolation method, loader/config targets, model turns, cost, deadline, recoverability proof, and cleanup receipts remain unresolved or unset until a separately fingerprinted approval.

If instruction-first traces fail state/guard/effect invariants, return `TRACE_INVALID` or `HOST_UNSUPPORTED`. Do not weaken the invariant or add a helper under the validation approval.

## Known specification gap — `CAL_OK` has no defined provenance

`closure-policy.v1.md` makes `CAL_OK` a required conjunct of `EPISTEMIC_CLOSED` and states that an uncalibrated task/risk/language stratum cannot emit resolved closure. Nothing in this repository defines how that conjunct becomes true.

The evidence:

- `src/reference/guards.mjs` lists `cal_ok` among `CLOSURE_FLAGS` and requires `state.closure.cal_ok === true`. It is read as an externally supplied boolean; no code computes it.
- `tests/fixtures/core/04-closure-before-cap.json` reaches `EPISTEMIC_CLOSED` by asserting `"cal_ok": true` as fixture input. That validates the reducer, not the predicate.
- R4 concluded that no universal numeric threshold for coverage, risk, stability, question cost, or patience is supported, and that thresholds must be calibrated per task/risk tier on held-out cases and frozen before evaluation. Its remediation is explicit that the plugin must not ship invented constants as universal truth.
- No calibration artifact exists. `tests/evaluation/arms.v1.json` reports `thresholds: UNSET_PENDING_PILOT`.

Two consequences follow, and both are currently unstated in the shipped instructions:

1. **`EPISTEMIC_CLOSED` is unreachable in v1.** With no calibration valid for any stratum, `CAL_OK` cannot honestly be true, so `ACCEPTED_RESIDUAL` is the only reachable success outcome. The specification presents the two as peer outcomes, which is misleading about what a correct run can actually produce.
2. **The guard against model-authored closure is itself model-authored.** The policy forbids a model confidence score or model-authored acceptance field from replacing the conjunction, yet in a live run the host model is the only available source for `cal_ok`, with no stated criterion. A model asked to set an undefined flag will infer one, which is the invented-constant failure R4 warned against — arriving through the model rather than through shipped defaults.

**Status: closed on 2026-08-03.** The closure policy, the generator's closure template, and both `SKILL.md` files now state that no calibration exists for any stratum in v1, that `EPISTEMIC_CLOSED` is therefore unreachable and `ACCEPTED_RESIDUAL` is the only reachable success outcome, that this is a release fact rather than a per-invocation judgment, and that a low-risk feel, a complete-seeming answer, or a confident estimate is not a calibration. Editing the policy alone was not sufficient: `closure.generated.md` is a hand-authored summary in `render-plugin-resources.mjs`, not a copy of the policy, so a policy-only edit would have changed the source digest and passed parity while leaving the host model uninformed.

## Latent hazard — the other nine conjuncts have the same shape

The audit that followed found no second defect of that severity, but it did find a trap for whoever ships calibration next.

All ten closure predicates are structurally identical in `src/reference/`: externally supplied booleans, initialised to `false`, never computed. They are read in exactly one place, `isEpistemicallyClosed`, and participate in no other routing. They divide by whether a criterion for setting them exists:

| Group | Conjuncts | Criterion |
|---|---|---|
| Defined | `philosophical_ok` | Stated in the closure policy: commitments conflict-challenged, high-impact implications disposed, a counterexample probe when frame risk is material, user authority retained |
| Threshold-dependent | `coverage_ok`, `risk_ok`, `conflict_ok`, `stable_ok`, `voi_ok` | R4 tabulates observability, assumptions, and failure modes for each, but ships no thresholds |
| Undefined | `graph_ok`, `plan_input_ready`, `no_unauthorized_intent_drift` | None, though each is plausibly checkable from the ledger |

None of this affects v1 behaviour, because the only reachable success outcome does not consult them. `isResidualAccepted` requires structural and cryptographic facts only — a recomputed `residual_ledger_digest`, a contract-digest identity, a `USER`-produced receipt with confirmed authority and comprehension, and per-residual provenance, impact, mitigation, reversibility, owner, and an `EXPLICITLY_ACCEPTED` disposition. There is no threshold in that path for a model to guess.

The hazard is future-dated. **The moment a calibration artifact makes `CAL_OK` true, five threshold-dependent conjuncts become load-bearing with no shipped criterion, and three undefined ones join them.** That would reproduce today's defect fivefold, arriving the same way: a model asked to set an undefined flag infers one.

Any future calibration work therefore has two preconditions, not one. Fitting and freezing thresholds is necessary but not sufficient; each conjunct also needs a stated decision criterion in the specification, in the shape `philosophical_ok` already has. Shipping thresholds without criteria would open the gate while leaving the flags inventable.

## Future efficacy gate — not run

The A/B/C/D preregistration makes paired `C−B` the graph estimand. B and C freeze the same model, tools, facts, prompts, action repertoire, evidence corpus, budget, and native planner. Thresholds and sample size remain `UNSET_PENDING_PILOT`. No efficacy claim exists.
