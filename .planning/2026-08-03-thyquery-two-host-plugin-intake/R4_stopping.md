# R4 — Formal progress, calibration, and stopping research

## Scope and status

- Research lane: R4 only; read-only research; no implementation or edits outside this artifact.
- Authority: approved `SK@v7`, SHA-256 `d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56`.
- Search bound used: 20 material primary/theoretical sources, within the 90-minute/20-source cap.
- Cutoff/access date: 2026-08-03 (Asia/Seoul).
- Evidence discipline: each material claim below has exactly one of `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`. A claim tagged `near_match_only` is a proposed transfer to ThyQuery, not a result established by the cited paper.

## Executive verdict

| ID | Claim | Tag | Source, date, assumptions/scope | ThyQuery implication |
|---|---|---|---|---|
| V1 | The provisional point-estimate conjunction `C >= tau_c AND R <= tau_r AND X = 0 AND D <= epsilon AND max(EVI-Cost) <= 0 AND A` is not yet a defensible closure theorem for an adaptive natural-language loop. Fixed-horizon inference can be invalid under continuous monitoring, one-step VOI can miss valuable multi-step exploration, and model stability can occur inside a misspecified hypothesis space. | `contradicts_premise` | [Johari et al., Always Valid Inference](https://doi.org/10.1287/opre.2021.2135), online 2021-08-10; assumes the paper's sequential-test models. [Jiang et al., BINOCULARS](https://proceedings.mlr.press/v119/jiang20b.html), 2020-07; finite-horizon probabilistic sequential design. [MacKay, Information-Based Objective Functions](https://doi.org/10.1162/neco.1992.4.4.590), 1992-07; Bayesian hypothesis space and likelihood are specified. | Replace point estimates with calibrated uncertainty bounds, replace a scalar stop score with hard gates plus a sequential decision rule, and add a non-myopic/synergy guard. |
| V2 | “Complete tacit-intent resolution” is not identifiable from the dialogue alone unless the intent/hypothesis space, response model, loss, and observable critical-field schema are sufficiently correct. | `contradicts_premise` | [MacKay 1992](https://doi.org/10.1162/neco.1992.4.4.590), 1992-07; the paper explicitly notes dependence on a correct hypothesis space. Scope is Bayesian active data selection, not conversation. | ThyQuery may certify only task-relative, decision-sufficient closure under stated assumptions; it must retain open-world residuals and cannot claim exhaustive recovery of tacit knowledge. |
| V3 | The most defensible design target is a typed outcome policy: `RESOLVED`, `ACCEPTED_RESIDUAL`, `CONTINUE`, `STALL/BLOCK`, `CANCEL`, with hard-cap exhaustion mapped to `BLOCK` unless a separately valid residual-acceptance gate passes. | `near_match_only` | Synthesized transfer from [Chajewska et al.](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf), 2000; [Biyik et al.](https://proceedings.mlr.press/v100/b-iy-ik20a.html), 2020; [Howard et al.](https://doi.org/10.1214/20-AOS1991), 2021-04; and [Reches et al.](https://doi.org/10.1609/aaai.v25i1.8020), 2011-08-04. None studies ThyQuery's exact state machine. | A cap proves finite termination, not epistemic success. Success, informed residual acceptance, blocking, and cancellation must stay distinct in receipts and benchmarks. |
| V4 | No universal numeric threshold for coverage, risk, stability, question cost, or patience is supported by this evidence set. | `insufficient` | [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf) stops below a pre-specified task loss; [Bloodgood & Grothendieck 2013](https://aclanthology.org/W13-3502/) analyzes threshold behavior under task/data assumptions; [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html) permits personalized, query-dependent costs. None supplies cross-domain ThyQuery constants. | Thresholds must be calibrated by task/risk tier and user-cost policy on held-out cases, then frozen for evaluation; the plugin must not ship invented constants as universal truth. |

## Formal decision model

### State and terminal decision

The following is a proposed ThyQuery operationalization, not a theorem already proved for dialogue. `near_match_only`; source basis: [DeGroot 1962](https://doi.org/10.1214/aoms/1177704567), [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf), and [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html).

Let:

- `H_t` be the full evidence/dialogue history available at iteration `t`;
- `Theta` be a declared, open-world-aware set of intent/task hypotheses;
- `pi_t(theta) = P(theta | H_t)` be the current posterior or calibrated predictive distribution;
- `d in D` be a candidate pre-plan intent contract;
- `L(d, theta)` be downstream decision loss or regret, including material omitted constraints;
- `G` be non-waivable gates such as host integrity, authority, safety, and critical-field requirements;
- `a in A_t` be an admissible next question/research/check action with response `Y_a`.

Define posterior Bayes risk and the current contract:

```text
d_t       := argmin_d E_{theta ~ pi_t}[L(d, theta)]
R_t       := min_d E_{theta ~ pi_t}[L(d, theta)]
EVSI_t(a) := R_t - E_{Y_a | H_t, a}[R_{t+1}]
NVI_t(a)  := EVSI_t(a) - Cost_t(a)
```

`EVSI` is decision-relative expected value of sample information. Expected entropy reduction may be logged as an auxiliary diagnostic, but it must not replace `EVSI` unless the chosen utility makes the two equivalent. `directly_supported`; source: [Lindley 1956](https://doi.org/10.1214/aoms/1177728069), 1956-12, assumes a Bayesian prior and experiment model; [DeGroot 1962](https://doi.org/10.1214/aoms/1177704567), 1962-06, defines information as expected decrease in a concave uncertainty functional. Scope is statistical experiments.

### Exact finite-horizon ideal and practical approximation

For terminal expected loss `S(s)` and transition state `s'`, the exact finite-horizon recursion is:

```text
V_t(s) = min(
  S(s),
  min_{a in A_t admissible under G} [ Cost_t(a) + E[V_{t+1}(s') | s, a] ]
)
```

The exact policy stops when the terminal loss is no larger than every admissible continuation value. `directly_supported`; source: [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html), 2020-07, derives the finite-horizon Bellman form for sequential experimental design and reports its general intractability. Scope is probabilistic experimental design, so ThyQuery must estimate rather than assume the exact value function.

A practical one-step rule `max_a NVI_t(a) <= 0` is sound only under additional conditions such as a one-step horizon or a proved diminishing-returns structure. `directly_supported`; source: [Golovin & Krause 2011](https://doi.org/10.1613/jair.3278), 2011-11, provides greedy guarantees when adaptive monotonicity and adaptive submodularity hold. Those properties are not established for human dialogue.

When adaptive submodularity or an equivalent no-synergy condition is unproved, use a small batch/lookahead guard:

```text
NVI_H(B) := E[R_t - R_{t+H} | batch/policy B] - E[cumulative Cost(B)]
VOI_CLOSED_t :=
  UCB(max_a NVI_1(a)) <= 0
  AND UCB(max_{B: 2 <= |B| <= H} NVI_H(B)) <= 0
```

This finite lookahead reduces but does not eliminate missed long-horizon synergy. `near_match_only`; source: [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html), 2020-07, shows myopic policies can underweight exploration and proposes a batch-informed non-myopic approximation in BO/BQ, not dialogue.

## Variables `C, R, X, D, EVI, Cost, A`

All proposed interval quantities below should be computed from a joint or multiplicity-controlled uncertainty procedure. Point estimates are diagnostics, not closure evidence. `near_match_only`; source basis: [Howard et al. 2021](https://doi.org/10.1214/20-AOS1991) and [Johari et al. 2021](https://doi.org/10.1287/opre.2021.2135).

| Variable | Operational definition and estimator | Observability | Required assumptions | Threshold policy | Principal failure mode | Transfer tag and source |
|---|---|---|---|---|---|---|
| `C_t` critical coverage | Declare critical fields `j=1..m`, weights `w_j`, and trace states `z_jt in {missing, hypothesized, evidenced, user-confirmed}`. Report both `C_t = sum(w_j c(z_jt))/sum(w_j)` and the hard predicate `Ccrit_t = all critical j are evidenced or explicitly residual`. Use lower confidence bound `LCB(C_t)` from adjudicated field-recovery performance on held-out cases. | Partly observable: field presence and provenance are observable; whether the schema omitted a tacit field is not. | A task/risk-specific schema exists; adjudicators can reliably label required fields; deployment resembles calibration cases. | `tau_C` is chosen per risk tier from the false-closure loss matrix. Critical fields are conjunctive and cannot be compensated by many trivial fields. | High weighted coverage with the wrong schema; verbose but non-actionable values; source duplication; missed unknown unknowns. | `near_match_only`; [Golovin & Krause 2011](https://doi.org/10.1613/jair.3278), 2011-11, supports adaptive coverage only under adaptive-submodular structure, which has not been proved here. |
| `R_t` residual decision risk | `R_t = min_d E[L(d,Theta)|H_t]`; estimate by posterior samples or a calibrated predictor of downstream contract/plan error. Use `UCB_R(t)` or a time-uniform upper confidence sequence for benchmarked observable losses. Keep aleatoric, epistemic/model, and open-world risk components separate. | Not directly observable in one conversation; realized downstream errors and gold-intent regret are observable on benchmark cases. | Specified bounded/integrable loss; identifiable outcome; calibrated predictive model; no unmodeled distribution shift for the guarantee. | `tau_R` derives from task loss/risk appetite, not prose confidence. For high-impact non-waivable fields, risk is a gate rather than a weighted average. | Confidently wrong posterior; wrong loss matrix; rare catastrophic omissions hidden by mean risk; shift. | `near_match_only`; [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf), 2000, stops on expected utility loss under a prior over utilities; transfer to natural-language planning remains unvalidated. |
| `X_t` contradiction state | Maintain a set of incompatible commitment/evidence pairs with severity, provenance, and adjudication. `Xcrit_t` is the count of unresolved material contradictions; also estimate contradiction detector precision/recall on held-out adversarial cases. | Known contradictions are observable; absence of a detected contradiction is not proof of consistency. | Canonical proposition representation; reliable entailment/adjudication; explicit priority rules for source vs user commitments. | `RESOLVED` requires `Xcrit_t=0` plus a targeted counterexample/challenge pass; threshold is zero only for declared critical contradictions, not all linguistic tension. | Detector false negatives; paraphrase/temporal scope errors; resolving conflict by silently discarding evidence. | `insufficient`; no source in this bounded R4 set establishes a calibrated contradiction estimator for iterative intent contracts. |
| `D_t` semantic/decision stability | Compare the induced contract decision and critical fields over a window and under evidence/query paraphrase perturbations. Example: `D_t = max_{i in t-k..t} weighted_change(d_i,d_t)` plus plan-relevant action change rate. Use a representative stop set, not text edit distance alone. | Observable for recorded contracts and perturbations; relation to correctness is benchmark-dependent. | Stable, representative perturbation/stop set; semantic comparator is valid; window selection is pre-registered. | `epsilon_D,k` are tuned on held-out false-stop vs excess-question tradeoffs. `D` is necessary support, never sufficient closure. | Stable wrong fixed point; oscillation hidden by averaging; superficial textual stability; unrepresentative stop set. | `near_match_only`; [Bloodgood & Grothendieck 2013](https://aclanthology.org/W13-3502/), 2013-08, analyzes prediction-stability stopping and notes dependence on stop-set/problem conditions; it does not validate dialogue-contract stability. |
| `EVI_t(a)` / `EVSI_t(a)` | Decision-relative expected reduction in `R`, simulated over possible answers/evidence outcomes. Estimate with nested Monte Carlo or a variational bound, recording uncertainty and estimator bias. For closure use an upper bound on the best admissible net value, not only the mean estimate. | Model-derived; counterfactual outcomes for unchosen actions are unobserved in ordinary logs. | Correct response/observation model; sufficient posterior support; adequate Monte Carlo; action space enumerated; lookahead assumption stated. | Stop-for-VOI only when the uncertainty bound on every admissible one-step and required lookahead action is non-positive. | Optimizer's curse; noisy/biased nested estimates; misspecified human response; zero myopic EVI despite positive multi-step EVI. | `near_match_only`; [Foster et al. 2020](https://proceedings.mlr.press/v108/foster20a.html), 2020-08, develops variational lower bounds to EIG, and [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html), 2020-07, shows the non-myopic issue. Neither gives calibrated ThyQuery EVSI. |
| `Cost_t(a)` | A vector: user time, cognitive difficulty/fatigue, interruption, privacy exposure, monetary/tool use, latency, and compute. Enforce non-compensable caps first; scalarize only remaining commensurable components with user/task-specific exchange rates. Estimate from response latency, skips/indifference, direct burden ratings, action type, and cumulative exposure. | Some components observable; opportunity, fatigue, privacy, and annoyance are latent or noisy. | User consents to measurement; cost features are not gamed; personalization is updated cautiously; privacy cost cannot be traded away implicitly. | Per-user/risk-tier budget; query-dependent cost; no universal cost unit. | Double-counting cost already present in `R`; fatigue-induced acceptance; disparate burden; low-time/high-cognitive queries misranked. | `directly_supported`; [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html), 2020, derives `I(omega;q|Q)-c(Q)` and allows personalized query-dependent cost under a modeled human reward/choice setting. |
| `A_t` user-grounded acceptance | A native explicit confirmation of a canonical contract digest. Distinguish `A_resolved`, `A_residual`, `A_cancel`; residual acceptance must include the enumerated residuals, impacts, mitigations, and reversibility. Never infer acceptance from silence, elapsed time, or model stability. | Explicit response is observable; comprehension and voluntariness require checks and remain imperfect. | User has authority; the summary is understandable and faithful; no coercive fatigue; non-waivable requirements are enforced separately. | Boolean gate with provenance. `A_residual` cannot override host integrity, safety, legal/authority, or other declared non-waivable constraints. | Acquiescence bias; fatigue; accidental click; acceptance of a summary that hides uncertainty. | `near_match_only`; [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf), 2000, establishes decision-sufficient elicitation rather than explicit consent; the ThyQuery acceptance protocol itself is unvalidated. |

### Why no single scalar progress score

`EVI` already uses reduction in `R`, and `NVI` subtracts `Cost`; adding `R`, `EVI`, and `Cost` again in a weighted score double-counts quantities. `near_match_only`; source basis: decision-relative VOI in [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf) and cost-adjusted information gain in [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html).

Track a vector dashboard instead:

```text
P_t = (
  LCB(C_t),
  -UCB_R(t),
  -Xcrit_t,
  -UCB_D(t),
  -UCB(max admissible NVI),
  -cumulative user cost,
  A_state
)
```

Use Pareto/lexicographic ordering: non-waivable gates first, then risk/coverage, then user-adjusted net value. `near_match_only`; no reviewed source proves this exact vector for ThyQuery.

## Multi-outcome closure rule

### Predicates

The following proposed rule is `near_match_only`; it synthesizes sequential decision loss, time-uniform inference, cost-aware preference elicitation, and typed product outcomes. It has not been validated on ThyQuery.

```text
INTEGRITY_OK_t :=
  host_transition_and_context_receipts_valid
  AND evidence_provenance_valid
  AND no_nonwaivable_authority_or_safety_violation

COVERAGE_OK_t := Ccrit_t AND LCB(C_t) >= tau_C[risk_tier]
RISK_OK_t     := UCB_R(t) <= tau_R[risk_tier]
CONFLICT_OK_t := Xcrit_t = 0 AND targeted_challenge_passed
STABLE_OK_t   := UCB_D(t) <= epsilon_D[risk_tier] over preregistered window k
VOI_OK_t      := UCB(max admissible one-step and H-lookahead NVI_t) <= 0
CAL_OK_t      := calibration version valid for current task/risk/domain stratum

RESOLVED_GATE_t :=
  INTEGRITY_OK_t AND COVERAGE_OK_t AND RISK_OK_t
  AND CONFLICT_OK_t AND STABLE_OK_t AND VOI_OK_t AND CAL_OK_t
  AND A_state = EXPLICIT_RESOLVED_ACCEPTANCE

RESIDUAL_GATE_t :=
  INTEGRITY_OK_t
  AND all_residuals_enumerated_with_evidence_impact_and_mitigation
  AND no_nonwaivable_gate_failed
  AND user_has_authority_to_accept_each_residual
  AND A_state = EXPLICIT_RESIDUAL_ACCEPTANCE
```

### Priority-ordered pseudocode

```text
function decide_outcome(state_t):
    if explicit_cancel:
        return CANCEL

    update estimates, uncertainty bounds, calibration/version checks

    if fatal_integrity_failure or host_capability_contradiction:
        return STALL_BLOCK(reason=INTEGRITY)

    if RESOLVED_GATE_t:
        return RESOLVED

    if RESIDUAL_GATE_t:
        return ACCEPTED_RESIDUAL

    if hard_cap_exhausted:
        return STALL_BLOCK(reason=HARD_CAP_EXHAUSTED)

    candidate = constrained_nonmyopic_action_selection()

    if candidate exists and budget_allows(candidate):
        return CONTINUE(candidate)

    if calibrated_estimates_are_too_uncertain:
        if an admissible calibration/research/challenge action exists:
            return CONTINUE(that_action)
        return STALL_BLOCK(reason=UNOBSERVABLE_OR_UNCALIBRATED)

    if stall_detector_fires or no_admissible_action_exists:
        return STALL_BLOCK(reason=STALL_OR_NO_ACTION)

    return CONTINUE(best_admissible_action)
```

### Outcome semantics

| Outcome | Exact meaning | Tag and support |
|---|---|---|
| `RESOLVED` | Decision-sufficient closure under the declared loss, schema, calibrated bounds, and assumptions; not exhaustive recovery of all tacit knowledge. | `near_match_only`; decision-sufficient elicitation is supported in [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf), but this full gate is novel. |
| `ACCEPTED_RESIDUAL` | The system failed at least one epistemic success gate, but the authorized user explicitly accepts a complete residual ledger and no non-waivable gate is violated. | `near_match_only`; no bounded source directly validates this product outcome. |
| `CONTINUE` | At least one admissible action has plausible positive net decision value, a required gate is unresolved, or estimator uncertainty is reducible within budget. | `near_match_only`; cost/value tradeoff is supported in [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html), but the compound ThyQuery condition is new. |
| `STALL/BLOCK` | The system cannot honestly meet a success gate and cannot take a justified admissible action, or a hard/integrity cap has fired. The receipt names the reason and unresolved fields. | `near_match_only`; waiting-versus-stopping with information cost is computationally hard in [Reches et al. 2011](https://doi.org/10.1609/aaai.v25i1.8020); the typed block result is ThyQuery-specific. |
| `CANCEL` | The user explicitly ends the invocation; no closure claim and no native plan handoff. | `directly_supported`; this is a direct SK@v7 product requirement, not a scientific inference. |
| hard-cap exhaustion | A termination mechanism, never evidence of resolution. It maps to `STALL/BLOCK(HARD_CAP_EXHAUSTED)` unless `RESIDUAL_GATE` was separately satisfied first. | `near_match_only`; source basis is finite-horizon stopping in [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html), not this product mapping. |

### Stall detector

Use a stall window only as a blocking diagnostic, not as proof of correctness:

```text
STALL_t :=
  no_material_coverage_gain_for_m_rounds
  AND no_statistically_distinguishable_risk_reduction_for_m_rounds
  AND repeated_or_equivalent_actions_outcomes
  AND no_untried_admissible_action_with_positive_UCB_NVI
  AND required_nonmyopic_guard_completed
```

The window `m` and change tolerances must be calibrated; stable predictions alone can fail when the stop set/problem conditions do not hold. `directly_supported`; source: [Bloodgood & Grothendieck 2013](https://aclanthology.org/W13-3502/), 2013-08, prediction-stability stopping analysis under representative stop-set/classification assumptions.

## Calibration and benchmark protocol

### What must be calibrated

| Target | Protocol | Success metric | Claim tag and source |
|---|---|---|---|
| Probability that the current contract would cause a material gold-plan error | On held-out, human-authored ambiguous queries, obtain latent-intent/constraint annotations and downstream plan adjudications. Fit on train, calibrate on a disjoint calibration split, evaluate once on frozen test. | Brier/log score, reliability curve, calibration error with uncertainty, false-`RESOLVED` rate at each risk tier. | `near_match_only`; proper scoring rules are justified by [Gneiting & Raftery 2007](https://doi.org/10.1198/016214506000001437), 2007-03, but this event label is ThyQuery-specific. |
| Calibration estimator itself | Use debiased/verified estimators appropriate to the number of probability bins and held-out sample size; report sample-size limits rather than a bare ECE. | Bound or confidence interval for true calibration error; sensitivity across binning choices. | `directly_supported`; [Kumar, Liang & Ma 2019](https://proceedings.neurips.cc/paper_files/paper/2019/hash/f8c0c968632845cd133308b1a494967f-Abstract.html), NeurIPS 2019, shows common methods can understate miscalibration and gives sample-complexity results for verified calibration. |
| Adaptive monitoring metrics | Predefine fixed test points or use confidence sequences/always-valid statistics for metrics inspected after every loop. Allocate alpha jointly across risk, coverage, and stability checks. | Time-uniform coverage and false-closure control under the specified martingale/observation assumptions. | `directly_supported`; [Howard et al. 2021](https://doi.org/10.1214/20-AOS1991), 2021-04, constructs time-uniform nonparametric confidence sequences; applicability requires its process assumptions. |
| Semantic stability `D` | Create representative stop sets of paraphrases, counterexamples, reordered evidence, and nearby intents. Compare decision/critical-field changes, not text overlap. | False-stable rate, false-unstable rate, time-to-stop, excess-question cost. | `near_match_only`; [Bloodgood & Grothendieck 2013](https://aclanthology.org/W13-3502/), 2013-08, concerns classifier prediction stability, not intent contracts. |
| Question/action value | Use synthetic environments with known latent intent and response model for counterfactual truth; use randomized action policies with overlap in human studies. Compare predicted EVSI to realized reduction in gold decision regret. | EVSI bias/RMSE, selected-action regret, fraction of positive-value actions missed, calibration of NVI sign. | `near_match_only`; Bayesian EIG estimation is supported in [Foster et al. 2020](https://proceedings.mlr.press/v108/foster20a.html), but decision-relative dialogue EVSI remains unvalidated. |
| User cost | Record response latency, skips, choice uncertainty, subjective effort, cumulative turns, and privacy/tool events; fit hierarchical/personalized cost models and validate within user where possible. | Cost prediction error, burden ratings, dropout/cancel rate, subgroup disparity, cost-adjusted plan quality. | `directly_supported`; [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html), 2020, includes personalized/query-dependent costs and a user study within active reward learning. |
| Ask-versus-answer policy | Evaluate against stock Plan, always-ask, never-ask, one-shot clarification, myopic ThyQuery, and lookahead ThyQuery. | Intent recovery, final plan constraint coverage, decision regret, false answer/false ask, turns, latency, user-rated alignment. | `directly_supported`; [Li et al., MediQ 2024](https://doi.org/10.52202/079017-0908), NeurIPS 2024, finds direct question prompting can degrade performance and confidence/abstention strategies improve accuracy in an interactive clinical benchmark. Generalization is not assumed. |

### Dataset and split requirements

The following protocol is proposed (`near_match_only`) and must be validated before a shipped closure claim:

1. Stratify by ambiguity type, task domain, impact/reversibility, language, user expertise, query length, and initial Plan mode surface.
2. Preserve a hidden gold intent contract plus acceptable alternative contracts, not a single reference wording.
3. Obtain independent expert labels for critical fields, contradictions, residual severity, and downstream plan errors; report inter-rater reliability and adjudication policy.
4. Split at user/task-family level to prevent paraphrase or project leakage; freeze test thresholds.
5. Include closed-world synthetic cases for exact regret/EVSI and open-world human cases for ecological validity.
6. Randomize policy order and measure learning/fatigue carryover; collect cancellation and residual-acceptance behavior.
7. Test distribution shift and subgroup calibration; a passing aggregate score cannot authorize a failed high-risk stratum.
8. Run ablations for `C`, `R`, `X`, `D`, myopic VOI, lookahead VOI, calibration guard, and acceptance gate.
9. Report outcome confusion: true decision-sufficient vs emitted `RESOLVED/ACCEPTED_RESIDUAL/BLOCK`, with false `RESOLVED` the primary safety metric.
10. Compare the native stock plan alone with ThyQuery-plus-stock-plan; score the native plan, not just the intermediate contract.

### Threshold selection

Choose thresholds by constrained validation rather than maximizing one average score:

```text
minimize   E[user_cost + latency + excess_block_cost]
subject to false_RESOLVED_rate[stratum] <= alpha[stratum]
           catastrophic_omission_rate[stratum] <= beta[stratum]
           calibration_bound[stratum] passes
           nonwaivable gate violations = 0 in the evaluated sample
```

This constrained threshold policy is `near_match_only`; sequential tradeoffs between sample size and power are supported by [Johari et al. 2021](https://doi.org/10.1287/opre.2021.2135), but the ThyQuery losses and strata are new.

## Termination proof obligations

| PO | Obligation | What a proof/test must show | Status/tag |
|---|---|---|---|
| PO1 | Finite termination | An integer cap `N_max` or finite cost budget decreases monotonically; every iteration consumes at least one unit; at exhaustion the state maps to a typed terminal outcome. | `directly_supported`; elementary invariant under the proposed state machine. It proves termination only, not correctness. |
| PO2 | Adaptedness/measurability | Each action and stopping decision uses only `H_t`; estimators are valid under adaptive action selection and optional stopping. | `near_match_only`; [Howard et al. 2021](https://doi.org/10.1214/20-AOS1991) supplies tools under martingale/process assumptions, which must be proved for each logged metric. |
| PO3 | Risk soundness | If the joint time-uniform event `R_t <= UCB_R(t)` holds and `UCB_R(t) <= tau_R`, then the emitted `RESOLVED` risk is below `tau_R` on that event. | `directly_supported`; logical consequence conditional on a valid confidence sequence. The hard part is constructing a valid observable loss process. |
| PO4 | Calibration transport | Calibration and threshold guarantees remain valid for the current domain/risk/user stratum, or the plugin blocks as out-of-distribution. | `insufficient`; no source proves transport to arbitrary ThyQuery workloads. |
| PO5 | Model support/open world | The latent intent/response model either contains the relevant possibilities or has an explicit novelty/unknown detector and residual path. | `contradicts_premise`; [MacKay 1992](https://doi.org/10.1162/neco.1992.4.4.590) identifies correct hypothesis-space dependence as a weakness of information objectives. |
| PO6 | Non-myopic adequacy | Prove adaptive submodularity/no synergy, solve the finite-horizon Bellman problem, or quantify the regret of the chosen lookahead approximation. | `near_match_only`; [Golovin & Krause 2011](https://doi.org/10.1613/jair.3278) and [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html) give results only under their formal settings. |
| PO7 | Cost validity | Human/tool cost is measurable enough for action choice; hard privacy/safety/authority costs are handled as constraints rather than tradable scalar terms. | `near_match_only`; [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html) supports query-dependent user cost in a narrower preference-learning model. |
| PO8 | Acceptance validity | `A` is explicit, provenance-bound, informed, non-coerced, and within user authority; silence and fatigue are never success. | `insufficient`; not established by the R4 statistical literature. Requires HCI/ethics/product validation. |
| PO9 | Contradiction completeness | Critical contradiction detector false-negative risk is bounded on representative adversarial fixtures and unresolved critical conflicts block success. | `insufficient`; no R4 source establishes the needed natural-language guarantee. |
| PO10 | Native-plan consequence | Closure predicts better stock-plan fidelity/executability, not merely a polished contract. | `insufficient`; requires R3/R6 paired evaluation and host-provenance evidence. |

## Counterexamples the design must survive

| CE | Counterexample | Broken rule | Correct behavior | Tag/source |
|---|---|---|---|---|
| CE1 | All posterior mass lies in two wrong interpretations because the true intent is outside `Theta`; the contract stops changing and estimated EVI is zero. | `D small` plus `EVI <= Cost` falsely implies resolution. | Novelty/open-world challenge; otherwise `BLOCK` or enumerated `ACCEPTED_RESIDUAL`, never `RESOLVED`. | `contradicts_premise`; [MacKay 1992](https://doi.org/10.1162/neco.1992.4.4.590), correct hypothesis-space dependence. |
| CE2 | Each of two questions alone does not change the chosen plan, but their joint answers reveal a decisive interaction. | Myopic `max NVI_1 <= 0`. | Run the required batch/lookahead or prove a diminishing-returns condition before VOI closure. | `contradicts_premise`; [Jiang et al. 2020](https://proceedings.mlr.press/v119/jiang20b.html), myopic exploration failure in finite-horizon design. |
| CE3 | Every schema field is filled with plausible text, but a critical field was absent from the schema. | High `C`. | Schema challenge and open-world residual; coverage cannot certify unknown unknowns. | `insufficient`; no universal intent schema is established. |
| CE4 | The same wrong contract repeats for `k` rounds because the loop asks paraphrases of one uninformative question. | Low `D` and apparent stall. | Block as stall after action-diversity/lookahead check, not resolve. | `near_match_only`; [Bloodgood & Grothendieck 2013](https://aclanthology.org/W13-3502/), stability requires problem/stop-set conditions. |
| CE5 | An entropy-maximizing question resolves a colorful but plan-irrelevant preference while a low-entropy constraint changes the implementation. | Information gain used as decision value. | Rank by expected reduction in task loss/regret; log entropy separately. | `directly_supported`; [Chajewska et al. 2000](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf), VOI is tied to current decision utility. |
| CE6 | The user clicks “accept” after many hard questions, while a severe non-waivable ambiguity remains. | `A=true` overrides risk/gates. | Acceptance cannot override non-waivable gates; use easier questions, cancellation, or block. | `near_match_only`; [Biyik et al. 2020](https://proceedings.mlr.press/v100/b-iy-ik20a.html) models answer difficulty/cost but not this authority rule. |
| CE7 | A fixed-horizon 95% interval is recomputed after every turn and the loop stops on the first favorable crossing. | Pointwise risk interval under adaptive stopping. | Use a time-uniform confidence sequence or a preregistered fixed terminal evaluation. | `directly_supported`; [Johari et al. 2021](https://doi.org/10.1287/opre.2021.2135), continuous monitoring invalidates ordinary inference in its A/B setting. |
| CE8 | The model's confidence falls, so it asks; human task uncertainty was already low, and the question confuses the user. | Model uncertainty treated as human ambiguity. | Calibrate ask/answer decisions on task success and human outcomes, not model confidence alone. | `directly_supported`; [Testoni & Fernandez 2024](https://doi.org/10.18653/v1/2024.eacl-long.16), model and human clarification uncertainty did not mirror each other in their collaborative task. |
| CE9 | The maximum-iteration counter fires after an unresolved contradiction. | Cap treated as success. | `STALL/BLOCK(HARD_CAP_EXHAUSTED)` with unresolved ledger; only separate residual acceptance can produce `ACCEPTED_RESIDUAL`. | `near_match_only`; finite caps guarantee ending, not correctness. |
| CE10 | Aggregate calibration passes, but high-impact Korean requirements cases are overconfident. | Global calibration authorizes all strata. | Require stratum-aware error bounds or block unsupported strata. | `near_match_only`; [Kumar et al. 2019](https://proceedings.neurips.cc/paper_files/paper/2019/hash/f8c0c968632845cd133308b1a494967f-Abstract.html) shows calibration measurement itself needs finite-sample care; exact ThyQuery strata remain untested. |

## Primary-source evidence ledger (20-source cap)

Each row contains one claim and exactly one evidence tag.

| ID | Primary/theoretical source and exact locator | Date | Claim; formal assumptions and scope | Tag | Implication |
|---|---|---|---|---|---|
| S1 | D. V. Lindley, “On a Measure of the Information Provided by an Experiment,” DOI [10.1214/aoms/1177728069](https://doi.org/10.1214/aoms/1177728069) | 1956-12 | Expected posterior uncertainty reduction formalizes information for a Bayesian prior and experiment model; the paper's aim includes experimental design. | `directly_supported` | Information gain is model/prior-relative, not an observable universal ambiguity meter. |
| S2 | M. H. DeGroot, “Uncertainty, Information, and Sequential Experiments,” DOI [10.1214/aoms/1177704567](https://doi.org/10.1214/aoms/1177704567) | 1962-06 | Defines experiment information as expected reduction of an uncertainty functional; concavity is central to the characterization. | `directly_supported` | State the uncertainty functional and model before using an information quantity. |
| S3 | D. J. C. MacKay, “Information-Based Objective Functions for Active Data Selection,” DOI [10.1162/neco.1992.4.4.590](https://doi.org/10.1162/neco.1992.4.4.590) | 1992-07 | Bayesian active-data criteria depend on what one seeks information about and on the hypothesis space being correct. | `directly_supported` | Add open-world/model-misspecification guards; EIG collapse is not closure. |
| S4 | D. Golovin and A. Krause, “Adaptive Submodularity,” DOI [10.1613/jair.3278](https://doi.org/10.1613/jair.3278) | 2011-11 | Greedy policies have approximation guarantees only when the objective satisfies adaptive monotonicity/submodularity and associated problem conditions. | `directly_supported` | Do not cite greedy theory until those properties are established for the loop objective. |
| S5 | A. Foster et al., “A Unified Stochastic Gradient Approach to Designing Bayesian-Optimal Experiments,” [PMLR 108](https://proceedings.mlr.press/v108/foster20a.html) | 2020-08 | Variational lower bounds can make EIG optimization scalable in specified Bayesian experiment models. | `directly_supported` | Record estimator/bound direction; a lower bound near zero cannot by itself certify that true EVI is non-positive. |
| S6 | S. Jiang et al., “BINOCULARS for Efficient, Nonmyopic Sequential Experimental Design,” [PMLR 119](https://proceedings.mlr.press/v119/jiang20b.html) | 2020-07 | The finite-horizon optimum obeys a Bellman recursion; exact solution is generally intractable; myopic approximation can underweight exploration. | `directly_supported` | Add lookahead/synergy tests or explicit approximation regret. |
| S7 | A. Wald and J. Wolfowitz, “Optimum Character of the Sequential Probability Ratio Test,” DOI [10.1214/aoms/1177730197](https://doi.org/10.1214/aoms/1177730197) | 1948-09 | SPRT optimality concerns tests between simple hypotheses under its error/sample-size conditions. | `near_match_only` | Sequential-test vocabulary does not make natural-language resolution an SPRT; hypotheses and error constraints are not presently simple or fixed. |
| S8 | S. R. Howard et al., “Time-uniform, Nonparametric, Nonasymptotic Confidence Sequences,” DOI [10.1214/20-AOS1991](https://doi.org/10.1214/20-AOS1991) | 2021-04 | Confidence sequences give uniform-over-time coverage under specified stochastic-process assumptions and allow arbitrary stopping times. | `directly_supported` | Use time-uniform bounds only for metrics with a justified process; they do not calibrate semantic risk automatically. |
| S9 | R. Johari et al., “Always Valid Inference: Continuous Monitoring of A/B Tests,” DOI [10.1287/opre.2021.2135](https://doi.org/10.1287/opre.2021.2135) | 2021-08-10 online | Ordinary fixed-horizon p-values/intervals become unreliable when users endogenously monitor and stop; always-valid methods address the paper's sequential A/B setting. | `directly_supported` | Repeatedly testing closure requires anytime-valid statistics or a held-out final check. |
| S10 | A. P. Dawid, “The Well-Calibrated Bayesian,” DOI [10.1080/01621459.1982.10477856](https://doi.org/10.1080/01621459.1982.10477856) | 1982-09 | Calibration is a long-run relation between issued probabilities and empirical event frequencies under the paper's sequential-forecast framework. | `directly_supported` | A single dialogue cannot demonstrate calibration; validate across cases. |
| S11 | T. Gneiting and A. E. Raftery, “Strictly Proper Scoring Rules, Prediction, and Estimation,” DOI [10.1198/016214506000001437](https://doi.org/10.1198/016214506000001437) | 2007-03 | Strictly proper scoring rules incentivize reporting the believed predictive distribution under expected score. | `directly_supported` | Evaluate probabilistic risk with log/Brier-style proper scores in addition to threshold accuracy. |
| S12 | A. Kumar, P. Liang, T. Ma, “Verified Uncertainty Calibration,” [NeurIPS 2019](https://proceedings.neurips.cc/paper_files/paper/2019/hash/f8c0c968632845cd133308b1a494967f-Abstract.html) | 2019-12 | Popular recalibration/error-estimation procedures can understate miscalibration; the paper provides finite-sample complexity results for verified calibration methods. | `directly_supported` | Report calibration-estimator uncertainty and sample requirements; do not rely on a bare ECE. |
| S13 | H. Ishibashi and H. Hino, “Stopping Criterion for Active Learning Based on Deterministic Generalization Bounds,” [PMLR 108](https://proceedings.mlr.press/v108/ishibashi20a.html) | 2020-08 | A PAC-Bayesian bound plus a statistical test can stop supervised active learning under the paper's loss/model/data setup. | `near_match_only` | Useful pattern—bound improvement, then test—but no direct natural-language contract guarantee. |
| S14 | M. Bloodgood and J. Grothendieck, “Analysis of Stopping Active Learning based on Stabilizing Predictions,” [ACL W13-3502](https://aclanthology.org/W13-3502/) | 2013-08 | Prediction-stability stopping depends on agreement thresholds, stop-set size/representativeness, and problem conditions; stability relates to performance change only under analyzed conditions. | `directly_supported` | `D` needs a representative semantic stop set and cannot stand alone as correctness. |
| S15 | U. Chajewska, D. Koller, R. Parr, “Making Rational Decisions Using Adaptive Utility Elicitation,” [AAAI-00-056](https://aaai.org/Papers/AAAI/2000/AAAI00-056.pdf) | 2000 | With a prior over utility functions, questions are selected by decision VOI and the process stops when expected utility loss falls below a preset threshold; cognitive burden/fatigue motivates limiting questions. | `directly_supported` | Prefer decision regret to exhaustive intent recovery, but validate the prior and threshold. |
| S16 | E. Biyik et al., “Asking Easy Questions,” [PMLR 100](https://proceedings.mlr.press/v100/b-iy-ik20a.html) | 2020 | In a modeled active reward-learning setting, information gain trades robot vs human answer uncertainty; stopping compares information value with personalized/query-dependent cost. | `directly_supported` | Include response difficulty and user cost in action selection; the assumed cognitive/choice model must be calibrated. |
| S17 | A. Testoni and R. Fernandez, “Asking the Right Question at the Right Time,” DOI [10.18653/v1/2024.eacl-long.16](https://doi.org/10.18653/v1/2024.eacl-long.16) | 2024-03 | In the studied collaborative dialogue task, model uncertainty did not mirror human clarification-seeking behavior; uncertainty-guided clarification improved task success. | `directly_supported` | Calibrate model uncertainty against task/human outcomes rather than treating it as ambiguity truth. |
| S18 | S. S. Li et al., “MediQ,” DOI [10.52202/079017-0908](https://doi.org/10.52202/079017-0908) | 2024-12 | In an interactive clinical benchmark, direct prompting to ask questions degraded performance; abstention/confidence strategies improved diagnostic accuracy by 22.3% but remained below complete-information performance. | `directly_supported` | Asking more is not automatically progress; benchmark the ask/answer policy and retain residual uncertainty. |
| S19 | S. Reches, M. Kalech, R. Stern, “When to Stop? That Is the Question,” DOI [10.1609/aaai.v25i1.8020](https://doi.org/10.1609/aaai.v25i1.8020) | 2011-08-04 | Optimal stop/wait decisions with dynamically arriving information and waiting cost are NP-hard in the paper's model; it proposes a pessimistic approximation. | `directly_supported` | Expect approximate policies and record their guarantees/failure modes; do not imply exact optimality. |
| S20 | N. Houlsby et al., “Bayesian Active Learning for Classification and Preference Learning,” [arXiv:1112.5745](https://arxiv.org/abs/1112.5745) | 2011-12-24 | BALD expresses information gain through predictive entropies and extends a Gaussian-process classifier method to binary preference learning under its probabilistic assumptions. | `near_match_only` | It is a candidate estimator pattern for questions, not a universal intent-closure rule or calibrated human cost model. |

## Open unknowns and escalation points

| ID | Unknown | Tag | Required next evidence |
|---|---|---|---|
| U1 | Whether a compact `Theta` and loss `L` can predict native-plan errors across Codex and Claude tasks. | `insufficient` | R3/R6 paired plan benchmark with hidden intent and alternative-valid-plan annotations. |
| U2 | Whether critical-field coverage schemas transfer across coding, research, writing, design, and high-stakes domains. | `insufficient` | Domain-stratified schema study and unknown-unknown challenge set. |
| U3 | Whether any current estimator yields useful per-conversation uncertainty bounds for `R`, `EVI`, `X`, or `D`. | `insufficient` | Prospective logged study with gold outcomes, calibration split, and uncertainty coverage tests. |
| U4 | Whether natural-language question actions satisfy adaptive submodularity or any tractable diminishing-returns condition. | `insufficient` | Formal counterexample search and empirical two-/three-step VOI comparison. |
| U5 | Whether explicit acceptance in the native UI is comprehended and non-coerced after multiple turns. | `insufficient` | HCI study measuring comprehension, fatigue, opt-out, and subgroup effects. |
| U6 | How to set non-waivable residual-risk classes without silently making legal, medical, security, or organizational policy. | `insufficient` | Domain governance and product policy outside R4; default to blocking unsupported high-impact strata. |
| U7 | Whether host-native Plan output quality tracks the intermediate contract metrics monotonically. | `insufficient` | End-to-end stock-plan evaluation; do not accept contract-only metrics. |

## Recommended R4 handoff

The proposed `DS@v1` should use the Bellman/EVSI framing as the normative model, but implement only a benchmark-calibrated approximation with typed outcomes. `near_match_only`; no source validates the exact ThyQuery composition.

The minimum defensible closure contract is:

```text
RESOLVED only when:
  integrity and non-waivable gates pass,
  critical coverage and contradiction challenge pass,
  a calibrated time-uniform upper risk bound is below the task threshold,
  semantic decision stability passes on a representative perturbation set,
  one-step plus required lookahead net-VOI upper bounds are non-positive,
  and the user explicitly confirms the canonical contract.

Otherwise:
  explicit authorized residual acceptance -> ACCEPTED_RESIDUAL
  justified admissible action remains       -> CONTINUE
  no honest progress path / cap / integrity -> STALL/BLOCK with reason
  user cancels                              -> CANCEL
```

This is a research-backed candidate, not a proven SOTA closure theorem. `insufficient`; it requires R3/R6 benchmark evidence, host integration evidence from R1/R2, and explicit design approval before implementation.
