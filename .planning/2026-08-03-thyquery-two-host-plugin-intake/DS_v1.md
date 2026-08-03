# ThyQuery Design Synthesis

## Metadata

- Design ID: `DS`
- Version: `v1`
- Based on: approved `SK@v7`, SHA-256 `d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56`
- Status: `SCOPE_DECISION_REQUIRED(DS@v1)`
- Transition: `REVISION_REQUIRED(SK@v7 → user-selected next contract)`
- Date: 2026-08-03 (Asia/Seoul)
- Authority: read-only R1–R6 research and root synthesis only
- Explicit exclusion: this document does not authorize implementation, scaffolding, packaging, installation, configuration changes, deployment, publication, or plan execution

## Research Receipt

| Lane | Artifact | Lines | SHA-256 | Integrated result |
|---|---|---:|---|---|
| R1 Codex | `R1_codex_plan.md` | 344 | `b4a812b9b134768dcdd2e20c72aa12020bb0229f705b9e8ec31365e7fff5f86d` | Standard plugin cannot force an already-started Default turn into Plan; current exact contract is `HOST_UNSUPPORTED`. |
| R2 Claude | `R2_claude_plan.md` | 290 | `a991097bce5d6e4ca606982ace1f13d30fb83a4616f84890d530638856cb67be` | Plugin grammar is slash-based, not literal `$thyquery`; atomic skill-to-Plan composition/provenance is unproven; exact contract is `HOST_UNSUPPORTED`. |
| R3 Elicitation | `R3_elicitation.md` | 249 | `6aefc22954713e7c5b7ea1fa500f6084ec66f2af3a55d9fbabdb12c69a462881` | Question benefit is non-monotonic; use material, answerable positive-net-value questions and measure downstream plan fidelity plus burden. |
| R4 Stopping | `R4_stopping.md` | 336 | `d5059f8953df503c9fea8fb681114e11e2dc791945243cabbab387f548d474ab` | No universal stop constants; use calibrated hard gates, time-aware risk bounds, non-myopic VOI, and typed outcomes. |
| R5 Philosophy | `R5_philosophy.md` | 307 | `17bd30e313d5a79c850020b8efe412f2dcac6a529d9299049574fbe717d64571` | Exhaustive tacit-knowledge extraction is conceptually indefensible; target decision-sufficient grounding with explicit residuals and user agency. |
| R6 Ralph/eval | `R6_ralph_eval.md` | 329 | `c4b054784b59babc4176bfd1b791ea7efb554897cdca26ba2842deedddfedb3b` | Reuse checkpoints and isolation, not completion promises or blind repetition; use typed terminals, negative fixtures, and paired evaluation. |

All six artifacts were read in full by the root, their hashes were independently rechecked, and their agents reported no descendants or out-of-scope writes.

## Executive Decision

No architecture satisfies every non-negotiable clause of `SK@v7` on both current hosts as a standard thin plugin.

This is not a quality concern that can be fixed inside the Ralph prompt. It is a host-control contradiction before the loop begins:

1. Codex selects collaboration mode at the client `turn/start` boundary, before a `$thyquery` skill executes. A standard skill/plugin cannot cross that boundary after invocation.
2. Claude Code plugin skills use slash syntax, not literal `$thyquery`. Native Plan tools exist, but the plugin contract does not guarantee parser-atomic Plan entry before model work on every starting surface/mode.
3. Neither host exposes a distinct stock-planner service or strong authorship receipt that proves exclusive unchanged-stock-planner provenance. Native Plan mode and native plan presentation can be observed; exclusive component authorship cannot.

Therefore `DS@v1` does not select an implementation architecture silently. It presents three explicit product-contract decisions. Under the user's current “no exceptions” requirement, Path A is the only consistent recommendation.

## Hard Compatibility Matrix

| Required gate | Codex 0.146.0 | Claude Code 2.1.220 | Exact SK@v7 result |
|---|---|---|---|
| Literal `$thyquery <query>` native invocation | Supported as explicit skill syntax | Contradicted; plugin skills use `/plugin:skill` or possibly `/skill` | FAIL on Claude |
| Automatic official Plan entry before any loop action | Client can set Plan on `turn/start`; executing plugin cannot | Built-in `/plan` and `EnterPlanMode` exist; deterministic atomic custom-skill composition unproven | FAIL/UNPROVEN |
| Same logical invocation and context continuity | App-server client composition can preserve one turn, but is outside plugin boundary | Same-conversation skill is plausible; no atomic digest/identity receipt | INSUFFICIENT |
| Native structured question after verified entry | Live Plan probe passed; Default control failed | `AskUserQuestion` is native and not intrinsically Plan-only; surface/mode restrictions remain | PARTIAL PASS |
| Unchanged stock-planner handoff | Native Plan item observable; no separate planner API | Native Plan presentation/`ExitPlanMode` observable; no separate planner API | STRICT PROVENANCE INSUFFICIENT |
| Remain in Plan and execute nothing | Testable before any approval/execution | Plan approval normally exits Plan; completion must be measured before approval | TESTABLE WITH SURFACE-SPECIFIC SEMANTICS |
| Overall standard-plugin compatibility | `HOST_UNSUPPORTED` | `HOST_UNSUPPORTED` | NO CURRENT TWO-PLUGIN BUILD |

## Product-Contract Paths

### Path A — Preserve SK@v7 exactly and hold

**Recommendation under the current no-exception instruction.**

- Preserve literal `$thyquery`, automatic cross-mode Plan entry, plugin-only packaging, one invocation, no wrapper, and strict native-plan provenance.
- Do not implement or advertise either plugin on the inspected host versions.
- Reopen R1/R2 only when host schemas add a pre-submit plugin mode requirement/transition, Claude adds a compatible dollar command surface or the common syntax requirement changes, and a sufficiently strong native-planner handoff receipt exists.
- Benefit: no requirement is weakened and no false compatibility claim ships.
- Cost: the product remains research-complete but implementation-blocked on current hosts.

### Path B — Prioritize two thin native plugins

Revise the product contract as follows:

- Invocation becomes host-native: Codex `$thyquery <query>`; Claude `/thyquery:thyquery <query>` with a conflict-free `/thyquery` alias treated only as an optional convenience.
- The user must enter stock Plan first; plugin entry is Plan-only and idempotent. There is no automatic cross-mode transition.
- The plugins share the intent-contract protocol, Ralph action policy, closure semantics, evidence policy, and conformance suite while keeping host wiring native.
- Native-plan provenance is defined operationally as verified stock Plan mode plus native plan surface/event, no ThyQuery substitute renderer, and no execution—not exclusive token authorship.
- Benefit: closest feasible match to the original thin-harness idea on both hosts.
- Cost: explicitly violates SK@v7's common literal invocation and no-exception automatic Plan-entry clauses; it requires a new `SK@v8-B` approval before design work.

### Path C — Prioritize automatic Plan entry and one-shot invocation

Revise the product from “two standard plugins” to “two thin host controllers plus reusable skill payloads”:

- Codex controller owns app-server `turn/start`, adds stock Plan collaboration mode and the ThyQuery skill/query to the same request, then observes native question and plan events.
- Claude controller uses an officially supported controller/SDK mode transition and loads the ThyQuery workflow; exact same-session stock interactive behavior and planner provenance require additional feasibility proof.
- A controller-owned common command could expose `$thyquery`, but it would be an external command/controller, not the hosts' shared native plugin grammar.
- Benefit: Codex has a directly supported atomic composition primitive at this boundary; automatic entry becomes technically plausible on controlled surfaces.
- Cost: violates the standard-plugin/no-wrapper boundary, broadens installation and maintenance, and still leaves Claude interactive parity and strict provenance unresolved. It requires a new `SK@v8-C` targeted research approval, not implementation approval.

## Path Comparison

| Criterion | A — strict hold | B — native plugins | C — controllers + skills |
|---|---:|---:|---:|
| Preserves every SK@v7 clause | Yes | No | No |
| Buildable now as two standard plugins | No | Plausibly, Plan-first only | No; broader product |
| Automatic cross-mode Plan entry | Preserved as requirement, unavailable now | Removed | Plausible at controlled client boundary |
| Literal common `$thyquery` | Preserved as requirement | Codex only | Controller-owned, not common native grammar |
| Thin host-native packaging | Preserved as requirement | Best fit | Weaker fit |
| Strict unchanged-stock provenance | Preserved, currently unattestable | Must be relaxed operationally | Still unresolved on Claude |
| Recommended status | Hold | Best shipping compromise if requirements change | Research option only |

## Shared ThyQuery Core if a Feasible Path Is Later Approved

### Intent contract

Each field carries a value, criticality, provenance, confidence/calibration version where applicable, source turn/evidence, last change, and disposition.

Minimum field groups:

- raw query, context manifest, authority/permission boundary, invocation identity;
- goal, deliverable, audience, scope inclusions/exclusions;
- environment, inputs, constraints, priorities and trade-offs;
- evidence standard, benchmarks/SOTA relevance, acceptance criteria and verification surface;
- explicit user commitments;
- implicature hypotheses and common-ground candidates;
- evidence-suggested and model-inferred proposals;
- rejected interpretations, contradictions, feasibility limits, epistemic limits, and tacit residuals;
- user acceptance/correction/defer receipts;
- burden, progress, risk, stability, and action-value diagnostics.

Allowed provenance states are at least:

`user_explicit`, `user_confirmed`, `evidence_derived`, `model_inferred`, `rejected`, `deferred`, `residual`.

No material `evidence_derived` or `model_inferred` field becomes user intent without an explicit disposition.

### Ralph action policy

At each iteration:

1. Separate specification uncertainty, model/evidence uncertainty, and host/capability uncertainty.
2. Identify only plan-changing open dimensions.
3. Generate admissible actions: direct grounding, native question, bounded research, source comparison, counterexample/scenario probe, capability disclosure, contract confirmation, residual acceptance, block, or cancel.
4. Prefer research for external facts, user questions for preference/authority decisions, and disclosure/reframing for capability limits.
5. Rank questions by expected downstream risk reduction, answerability, evidence quality, and materiality minus time, cognitive burden, redundancy, privacy exposure, and intent-drift risk.
6. Use open input before constrained choices when the candidate frame itself is uncertain. When choices are useful, keep them neutral and evidence-linked with `none`, free correction, `unsure/defer`, and `cancel` paths. Candidate count is adaptive to the host's verified native limits; Top 3 is not a rule.
7. Record only the material contract delta and its consequence, then recompute closure.
8. If no new evidence, contract delta, or justified uncertainty reduction occurs over the calibrated window, stop as `STALLED`; never count paraphrase repetition as progress.

### Candidate closure predicate

The research supports a gated design hypothesis, not universal numeric constants:

```text
INTEGRITY_OK_t :=
  verified_host_mode_and_context_receipts
  AND evidence_provenance_valid
  AND no_nonwaivable_authority_or_safety_failure

PHILOSOPHICAL_GUARD_t :=
  no_material_conflict_among_user_endorsed_commitments
  AND every_high_impact_implicature IN {confirmed, rejected, residualized}
  AND counterexample_or_scenario_probe_completed
  AND no_unaccepted_frame_revision
  AND user_had_real_correct_defer_cancel_paths
  AND tacit_residuals_and_epistemic_limits_recorded

EPISTEMIC_CLOSED_t :=
  INTEGRITY_OK_t
  AND PHILOSOPHICAL_GUARD_t
  AND all_critical_fields_closed
  AND LCB(critical_coverage_t) >= tau_C[risk_tier]
  AND UCB(residual_decision_risk_t) <= tau_R[risk_tier]
  AND unresolved_critical_contradictions_t = 0
  AND targeted_challenge_passed
  AND UCB(semantic_decision_delta_t) <= epsilon_D[risk_tier]
  AND UCB(max_net_value_of_admissible_1_to_H_step_action_t) <= 0
  AND calibration_valid_for_current_stratum
  AND plan_input_ready
  AND no_unauthorized_intent_drift
  AND explicit_resolved_acceptance
```

The one-step value term alone is insufficient unless diminishing returns or an equivalent condition is proved. A small lookahead/synergy guard is required otherwise. `tau_C`, `tau_R`, `epsilon_D`, the stability window, lookahead horizon, burden budget, and maximum resource limits must be versioned and calibrated on held-out host/domain/risk strata.

### Typed terminal outcomes

| Outcome | Native planner handoff? | Meaning |
|---|---:|---|
| `EPISTEMIC_CLOSED` | Yes | Decision-sufficient contract passed calibrated gates and explicit acceptance. |
| `ACCEPTED_RESIDUAL` | Yes | Every residual, consequence, mitigation, and owner is explicit; the authorized user knowingly accepts them; no non-waivable gate failed. |
| `CANCELLED` / `USER_STOP` | No | User ended the invocation. |
| `BLOCKED` / `INFEASIBLE` | No | Required fact, authority, capability, or feasible interpretation is absent. |
| `STALLED` | No | No justified progress action remains. |
| `RESOURCE_EXHAUSTED` | No | Turn/time/token/source/cost/host cap was reached; this is never success. |
| `STATE_CORRUPT` | No | State ownership, schema, digest, or replay integrity failed. |
| `HOST_CAPABILITY_CONTRADICTION` | No | Declared host behavior or verified Plan continuity failed. |

### Native-plan boundary

Successful epistemic closure authorizes exactly one native planner handoff. ThyQuery must never render a substitute final plan. The workflow ends after one native plan is observed and before any approval-driven execution or mode exit.

Two provenance definitions remain distinct:

- **Strict:** a separately identifiable unchanged stock planner consumes a bindable contract digest and produces the plan. Current evidence is insufficient on both hosts.
- **Operational:** verified stock Plan mode, accepted-contract continuity, native plan item/UI/event, no ThyQuery substitute renderer, exactly one plan, and no execution. This is testable but requires an explicit requirement relaxation.

## Evaluation Gate Before Any Benefit Claim

Use three arms for each pinned host/version:

- A: raw query → stock Plan;
- B: raw query → ThyQuery → accepted contract → the same stock Plan;
- C: user-authored fully specified contract → the same stock Plan as an oracle ceiling.

Compatibility is Gate 0: every declared starting mode must pass mode entry, query/context/permission continuity, native questions, one invocation, typed lifecycle, one native handoff, one native plan, provenance, cancellation, replay/idempotency, and no execution. A compatibility failure disqualifies that host/version regardless of plan quality.

Co-primary quality outcomes:

1. critical plan success against hidden user-owned intent dossiers;
2. blinded real-user/domain-author intent acceptance without material correction;
3. user-burden non-inferiority using time, question count, answer effort, unsure/defer/correction, and abandonment.

Report contract recovery and planner fidelity separately. Secondary metrics include useful-question precision, unsupported-invention rate, provenance accuracy, contradiction closure, contract-to-plan recall/precision, acceptance-test coverage, no-harm on clear queries, VOI calibration, repeated-trial `pass^k`, latency, tokens, sources, and cost. Exact margins and sample size require a pilot and cannot be invented now.

## Approval Options

The following approvals authorize only the stated next planning step; none authorizes implementation:

- `DS@v1-A 승인`: preserve SK@v7 exactly, record both current hosts as unsupported, and place implementation on hold until host capabilities change.
- `DS@v1-B 승인`: authorize creation of `SK@v8-B` for Plan-first, host-native invocation, two thin plugins, and operational native-plan provenance. Research/design approval only.
- `DS@v1-C 승인`: authorize creation of `SK@v8-C` for bounded controller-plus-skill feasibility research. Research approval only.

Any different combination requires a new explicit revision statement. Silence or a general acknowledgment does not select a path.
