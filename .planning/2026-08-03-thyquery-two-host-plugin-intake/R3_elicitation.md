# R3 — empirical elicitation and downstream plan quality

Research date: 2026-08-03  
Authority: SK@v7, SHA d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56  
Scope: read-only research; no implementation  
Bound reached: 20 material sources. Search stopped at source-bound and thematic saturation across clarification, grounding, preference/active elicitation, requirements/tacit-knowledge elicitation, user burden, and downstream planning.

## Evidence-tag contract

- [directly_supported]: the stated empirical result is directly reported for the cited population/task/model. This does not imply direct transfer to Codex or Claude Code Plan mode.
- [contradicts_premise]: the cited result directly undercuts a premise that would otherwise be unsafe to adopt.
- [near_match_only]: the design implication is an analogy from a related task or population, not a validated ThyQuery effect.
- [insufficient]: the evidence pool does not establish the claim or a numeric threshold.

Every material claim below carries exactly one tag. Study finding and ThyQuery transfer are kept separate.

## Executive synthesis

1. Clarification can improve a downstream result substantially, but the sign and size are model/task dependent: in one controlled suite GPT-3 moved from 50.0 to 85.8 on MT and from 22.7 to 40.8 on uniformly weighted QA, while Llama-2-7B/13B MT fell by 6.8/9.1 percentage points after clarification. Scope: English–French MT, English QA and NLI with generated oracle-style question/answer interactions; limitation: not native planning and not arbitrary multi-turn dialogue. Design implication: never use “ambiguity detected” or “a clarification was asked” as a sufficient completion signal; measure expected downstream gain and no-harm. [contradicts_premise] (E01)

2. Question quality is a gate, not a cosmetic score. Search user studies found high-quality questions beneficial but low/mid-quality questions worse than no clarification, and an 89-participant trajectory study found that always showing questions was risky. Scope: Web search and SERP interaction; limitation: retrieval differs from software planning. Design implication: a Ralph loop must select or suppress questions using materiality, answerability, evidence, and cost rather than continue merely because uncertainty remains. [contradicts_premise] (E03, E04)

3. The user is not an oracle. In 1,025 product-search conversations from 53 participants, answers were wrong 17.3% and “not sure” 9.6%; 14% stopped because of fatigue. Scope: short yes/no/not-sure product questions under a best-case retrieval update; limitation: not open-ended development queries. Design implication: preserve “unsure/none/defer,” permit correction, monitor reversals and latency, and treat each answer as fallible evidence rather than latent intent ground truth. [contradicts_premise] (E05)

4. Recovering “all tacit knowledge” is not an empirically observable termination condition. Requirements interviews co-created and changed requirements, external app-store examples introduced 28–42% novel-topic stories, and human grounding was partner-specific. Scope: student requirements analysts and human object-reference dialogue; limitation: neither study evaluated LLM planning. Design implication: terminate on a user-accepted, provenance-bearing operational contract, not on a claim that the user's complete inner intent has been recovered. [contradicts_premise] (E06, E11)

5. The closest 2026 SOTA evidence supports a cost-aware value-of-information rule: structured tool-argument uncertainty plus EVPI reported 7–39% higher ambiguous-task coverage with 1.5–2.7× fewer clarification questions, while separating specification uncertainty from model uncertainty. Scope: multi-turn tool-calling with ClarifyBench and LLM-based user simulation; limitation: structured API arguments are much narrower than free-form plans and simulation can overestimate usability. Design implication: borrow the state decomposition and ask/stop objective, but calibrate it on real Codex/Claude users before claiming efficacy. [near_match_only] (E17)

6. Better elicitation does not guarantee a good plan. With full task information, NATURAL PLAN reported GPT-4 solve rates of 31.1% trip, 47.0% meeting, and 41.2% calendar planning; TravelPlanner reported only 0.6% success for GPT-4. Scope: fixed natural-language planning benchmarks; limitation: these are not native Plan-mode outputs and models are historical snapshots. Design implication: evaluate both contract recovery and the unchanged native planner separately, then measure contract-to-plan fidelity. [contradicts_premise] (E18, E19)

7. No located study compares stock Codex Plan or stock Claude Code Plan against a ThyQuery pre-layer, proves automatic tacit-knowledge recovery, or validates a universal Ralph stopping threshold. Scope: exact proposed product and hosts; limitation: absent direct experiment. Design implication: DS@v1 should present the stopping rule below as a falsifiable design hypothesis and require a paired host-native evaluation before product claims. [insufficient]

## Exact-transfer boundary

- The exact empirical claims in the evidence table apply only to their stated populations, datasets, model versions, and interfaces. None is an exact host-native ThyQuery evaluation. [insufficient]
- The closest computational analogues are ClarifyBench/SAGE-Agent, NoisyToolBench, QuestBench Planning-Q, CLAMBER, and ClarifyGPT; they cover pieces of the loop but not the complete Plan-mode handoff. [near_match_only] (E13–E17)
- Requirements engineering, cognitive task analysis, conceptual pacts, and active reward learning justify candidate probes and bookkeeping only by analogy. [near_match_only] (E06–E12)

## Evidence table

| ID | Source and date | Exact tested evidence | Population/task/model scope | Limitation and transfer | ThyQuery design implication | Tag |
|---|---|---|---|---|---|---|
| E01 | Zhang & Choi, “Clarify When Necessary,” Findings NAACL, 2025-04. DOI: https://doi.org/10.18653/v1/2025.findings-naacl.306 | Direct→Clarify: GPT-3 MT 50.0→85.8, QA-uniform 22.7→40.8, QA-sampled 51.8→61.8, NLI-uniform 31.2→31.6, NLI-sampled 41.7→45.9. Llama-2-7B MT 50.0→43.2; Llama-2-13B MT 50.0→40.9. IntentSim evaluates when-to-ask with AUROC and fixed interaction budgets. | AmbigQA, AmbiEnt and English–French DiscourseMT; GPT-3 and Llama-2 chat variants; oracle-generated clarification interactions. | No arbitrary-length human loop; question and answer generation use privileged interpretations; no plan artifact. Transfer is analogical. | Separate specification from model uncertainty; optimize realized downstream gain under a budget; add unambiguous no-harm tests. | [contradicts_premise] |
| E02 | Aliannejadi et al., “Asking Clarifying Questions in Open-Domain Information-Seeking Conversations,” SIGIR, 2019-07. DOI: https://doi.org/10.1145/3331184.3331265 | Qulac contains over 10K question-answer pairs, 198 TREC topics and 762 facets. An oracle good question improved P@1 by over 170% in the abstract; the conclusion reports over 150% relative improvement in P@1 and nDCG@1. | Offline faceted/ambiguous Web retrieval with crowdsourced questions and answers. | Oracle question bank, fixed turns, retrieval rather than plan generation; the paper itself leaves confidence-based stopping to future work. | Use Qulac for question-ranking smoke tests, not as evidence for a Ralph termination threshold. | [directly_supported] |
| E03 | Zou et al., “Users Meet Clarifying Questions,” ACM TOIS, online 2022-04. DOI: https://doi.org/10.1145/3524110 | High-quality clarifying questions improved search performance and satisfaction; low- and mid-quality questions were harmful relative to completing the task without clarification. | Large Web-search user study across CQ quality categories. | Search/SERP behavior; abstract does not establish a universal quality cutoff for planning. | Suppress a question when predicted quality is below a calibrated threshold; no “ask by default” policy. | [contradicts_premise] |
| E04 | Zou et al., “Asking Clarifying Questions: To benefit or to disturb users in Web search?”, Information Processing & Management, 2023-03. DOI: https://doi.org/10.1016/j.ipm.2022.103176 | In a study of 89 participants, CQ-quality trajectory changed behavior and satisfaction; a later high-quality question could partly recover an earlier low-quality interaction, while showing only high-quality CQs produced better gains with less effort than always showing CQs. | Four Web-search tasks; 241 sessions and 897 search requests reported in the study. | Small task set, chronological SERP setting, generated quality categories; no native planning. | Track question-quality trajectory and prior damage; do not assume that later good questions erase all user burden. | [contradicts_premise] |
| E05 | Zou, Kanoulas & Liu, “An Empirical Study on Clarifying Question-Based Systems,” CIKM, 2020-10. DOI: https://doi.org/10.1145/3340531.3412094 | 53 US MTurk participants produced 1,025 conversations. Mean/median questions per product were 11.4/7; 14% stopped from fatigue and 7% from irrelevant questions. Answers were 73.1% correct, 9.6% unsure, 17.3% wrong; average answer time was 7.1 s. | Amazon-product search with yes/no/not-sure questions; 53 native-English participants. | The ranker updated with oracle-correct answers independently of the user's answer, making this a best-case system; product recognition is easier than tacit project intent. | Log time, unsure, correction, irrelevance and abandonment. Do not copy 11.4 as a universal cap; a cap reached means stalled, not resolved. | [contradicts_premise] |
| E06 | Brennan & Clark, “Conceptual Pacts and Lexical Choice in Conversation,” JEP:LMC, 1996-11. DOI: https://doi.org/10.1037/0278-7393.22.6.1482 | Across three experiments, jointly established terms were reused. In Experiment 3, 50 students formed 10 same-partner and 10 switch-partner groups; reuse from the prior trial was 48% with the same partner versus 18% after switching, significant by subjects at p<.05. | Human dyads/triads repeatedly naming picture cards. | Object naming and human memory, not human–LLM requirements; item analysis was marginal at p=.08. | Store accepted wording and meanings as session/user-specific grounding state; do not silently generalize a pact across users or projects. | [near_match_only] |
| E07 | Pacheco, García & Reyes, “Requirements elicitation techniques: a systematic literature review based on maturity,” IET Software, 2018-08-01. DOI: https://doi.org/10.1049/iet-sen.2017.0144 | SLR accepted 140 studies from 1993–2015. Prior empirical synthesis in the review found unstructured interviews more effective/complete but less efficient than sorting/laddering, and introspective protocol analysis weakest on evaluated dimensions. The review states effectiveness depends on product, stakeholder and information type. | Software requirements techniques across heterogeneous academic/industrial reports. | Heterogeneity prevented meta-analysis; frequencies are not effect sizes and the search ends in 2015. | Adapt probe form to the missing knowledge and stakeholder; a fixed Top-3 interaction is not evidence-based. | [near_match_only] |
| E08 | Burton, Shadbolt, Rugg & Hedgecock, “The efficacy of knowledge elicitation techniques,” Knowledge Acquisition, 1990-06. DOI: https://doi.org/10.1016/S1042-8143(05)80010-X | Structured interview, protocol analysis, card sort and laddered grid were compared in two classification domains with eight experts each; protocol analysis was least efficient. Domain-ignorant nonexperts could still construct plausible knowledge bases from common sense. | Small expert studies in flint/pottery classification plus nonexpert elicitation. | Old, small and non-software; “plausible” was not user-intent accuracy. | Penalize unsupported but plausible requirements; use provenance and domain checks rather than fluency as tacit-knowledge evidence. | [near_match_only] |
| E09 | Swaby et al., “The use of cognitive task analysis in clinical and health services research,” systematic review, 2022-03-08. DOI: https://doi.org/10.1186/s40814-022-01002-6 | 81 articles representing 80 studies in 13 countries (1993–2019); CTA interviews and Critical Decision Method were common. Studies investigated routine/typical (64), challenging (13), and rare/anomalous events (3). | Qualified clinicians making real-world clinical decisions. | Methodological review did not establish pooled causal effectiveness or a standard reliability threshold; clinical stakes differ. | When tacit decision logic matters, ask for a concrete critical incident, cues, rejected alternatives, failure signs and exception cases—not only abstract preferences. | [near_match_only] |
| E10 | Hoffman, Crandall & Shadbolt, “Use of the Critical Decision Method to Elicit Expert Knowledge,” Human Factors, 1998-06. DOI: https://doi.org/10.1518/001872098779480442 | CDM uses multiple-pass event retrospection with probes and can yield timelines, situation assessments and decision requirements. | Methodological case study of cognitive task analysis across expert domains. | Not a comparative ThyQuery trial and no universal effect size. | Use incident-first multi-pass probes only for high-materiality tacit dimensions; convert results into observable decision requirements. | [near_match_only] |
| E11 | Ferrari, Spoletini & Debnath, “How do requirements evolve during elicitation?”, Requirements Engineering, accepted 2022-07-17. DOI: https://doi.org/10.1007/s00766-022-00383-7 | 58 analysts were recruited; a sample of 30 was analyzed. Only 30–38% of post-interview user stories were fully traceable to initial ideas; 54–63% refined them and 12–20% were novel. App-store inspiration added 28–42% novel-topic stories. | Student analysts, a fictional summer-camp customer, two interviews and app-store comparison. | Exploratory single scenario; co-creation may be useful, but it is not equivalent to faithful recovery. | Mark every contract field as user-stated, user-accepted, evidence-suggested, inferred, rejected or deferred; benchmark/SOTA content cannot become a requirement without acceptance. | [near_match_only] |
| E12 | Bıyık et al., “Asking Easy Questions,” CoRL proceedings, published 2020. URL: https://proceedings.mlr.press/v100/b-iy-ik20a.html | 15 participants in Driver/Tosser simulations and 12 with a Fetch robot answered 30 randomized preference queries. Information-gain questions were easier in all environments (p<.005), produced fewer indistinguishable options in Driver (p<.05) and Tosser (p<.005), and supported a cost-based optimal stop. | Pairwise robot-trajectory preference learning. | Small sample, perceptual trajectories and an assumed choice model; no language-planning artifact. | Rank questions by information value and predicted answerability, include “about equal/none,” and stop when expected value no longer exceeds cost. | [near_match_only] |
| E13 | Mu et al., “ClarifyGPT,” Proc. ACM Software Engineering, 2024-07-12. DOI: https://doi.org/10.1145/3660810 | The version of record reports average Pass@1 gains across five code benchmarks: GPT-4 62.43→69.60 and ChatGPT 54.32→62.37; a human evaluation assessed ambiguity detection and question quality. | LLM code generation, generated tests, multiple code benchmarks and human/simulated feedback. | Code tests provide stronger semantic oracles than free-form plans; much evaluation uses simulated feedback; no unchanged native Plan handoff. | Add executable/checkable acceptance criteria where possible and evaluate the final artifact, not just question quality. | [near_match_only] |
| E14 | Wang et al., “Learning to Ask: When LLM Agents Meet Unclear Instruction,” EMNLP, 2025-11. DOI: https://doi.org/10.18653/v1/2025.emnlp-main.1104 | Analysis classified problematic instructions as missing key information 56.0%, multiple references 11.3%, errors 17.3%, beyond tool capability 15.3%. On NoisyToolBench, GPT-4o CoT Ask-when-Needed raised correct-question A1 from .52→.90, .18→.80, .12→.60 and .10→.92 across the four classes; correct API A2 also improved in three executable classes. | 1,000 real queries used for error analysis; 200 clean ToolBench entries manually mutated for evaluation; several LLM agents. | Benchmark ambiguity is synthetic; ToolEvaluator uses semantic similarity and GPT-4o judging; only five users in the UX check. | Represent missing data, ambiguous reference, erroneous premise and infeasibility as different states; “research,” “ask,” “correct,” and “decline/reframe” are distinct actions. | [near_match_only] |
| E15 | Zhang et al., “CLAMBER,” ACL, 2024-08. DOI: https://doi.org/10.18653/v1/2024.acl-long.578 | CLAMBER has about 12K cases. Best reported average ambiguity identification was ChatGPT accuracy 54.25/F1 52.77; CoT and few-shot were inconsistent and could increase overconfidence. Error types include wrong aspect, under-specification and over-specification. | Off-the-shelf LLMs on an ambiguity taxonomy for information needs. | Classification/generation benchmark, not downstream plan success; older model snapshots. | Do not trust self-rated “ambiguity resolved.” Use contract checks, user grounding and downstream validation; track wrong-aspect and over-question errors. | [contradicts_premise] |
| E16 | Li, Kim & Wang, “QuestBench,” NeurIPS 2025 Datasets and Benchmarks; arXiv revised 2025-10-24. URL: https://arxiv.org/abs/2503.22674 | Underspecified Logic-Q, Planning-Q, GSM-Q and GSME-Q are solvable with at most one missing-variable question. Current models reached only 40–50% on Logic-Q/Planning-Q, and ability on the fully specified version did not imply selecting the right question; Planning-Q models rarely hedged. | Multiple-choice minimal-question selection; PDDL Blocks World with partial initial states plus logic/math CSPs. | One-question, synthetic and closed-choice; no natural human answer, research, or multi-turn grounding. | Use Planning-Q for minimum-critical-question accuracy and “not sure” calibration; it cannot validate Ralph-loop UX or stopping. | [contradicts_premise] |
| E17 | Suri et al., “Structured Uncertainty guided Clarification for LLM Agents,” Findings ACL, 2026-07. DOI: https://doi.org/10.18653/v1/2026.findings-acl.2028 | Structured uncertainty over tool parameters separates specification/model uncertainty and uses EVPI plus aspect cost. SAGE-Agent reported 7–39% higher coverage with 1.5–2.7× fewer questions; uncertainty-guided training raised When2Call 36.5→65.2% (3B) and 36.7→62.9% (7B). | Multi-turn dynamic ClarifyBench tool tasks and trained tool-calling agents. | Candidate calls/argument domains are structured upstream; user simulation is LLM-based; no native planning. | Adopt an EVSI/EVPI-minus-cost decision rule and structured slots as a hypothesis; validate natural-language answerability and real-user burden. | [near_match_only] |
| E18 | Zheng et al., “NATURAL PLAN,” submitted 2024-06-06. URL: https://arxiv.org/abs/2406.04520 | 1,600 trip, 1,000 meeting and 1,000 calendar instances provide full tool information. GPT-4 solve rates were 31.1%, 47.0%, 41.2%; all tested models were below 5% on 10-city trips, and self-correction did not reliably solve the gap. | Fully specified natural-language trip, meeting and calendar planning. | Preprint/model snapshots; exact-match/task-specific solvers; no elicitation layer. | Use full-information originals as planner controls and masked-constraint variants as elicitation pairs; score planner failure separately from contract failure. | [contradicts_premise] |
| E19 | Xie et al., “TravelPlanner,” ICML, 2024-07. URL: https://proceedings.mlr.press/v235/xie24j.html | Benchmark has 1,225 curated intents/reference plans, tools over nearly four million records, and multi-constraint checks; GPT-4 achieved 0.6% success. | Realistic travel planning with tools, constraints and reference plans. | Domain-specific, expensive, historical models and a severe floor effect. | Use a small stratified slice for executable constraint checks; avoid relying on it alone because floor effects can hide elicitation gains. | [contradicts_premise] |
| E20 | Singh et al., “Personal Large Language Model Agents,” EMNLP Industry, 2024-11. DOI: https://doi.org/10.18653/v1/2024.emnlp-industry.37 | TravelPlanner+ supplied user models/preferences; personalized plans received preference rates up to 74.4% validation and 87.3% test over generic plans. | Travel planning with provided preference profiles and LLM-as-a-judge comparisons. | Preferences were supplied rather than elicited; judge is an LLM; rates are not real-user satisfaction. | Use supplied-preference results only as an upper-bound rationale; evaluate whether ThyQuery recovered preferences and whether real users prefer the resulting plan. | [near_match_only] |

## Observable loop state

The loop should track a candidate operational contract, not claim access to a user's hidden mental state. [contradicts_premise] (E05, E11, E15)

| Symbol | Observable state | Measurement/update rule | Handoff effect | Evidence status |
|---|---|---|---|---|
| K_t | Contract field ledger: goal, deliverable, scope/inclusions, exclusions, constraints, priorities/trade-offs, audience/context, evidence standard, acceptance tests, risk/authority, environment/inputs | Each field is one of verbatim-user-stated, user-accepted, evidence-suggested, model-inferred, rejected, or accepted-deferred. Store source turn and last change. | A material evidence-suggested/model-inferred value cannot pass without acceptance; a critical gap blocks or becomes an explicitly accepted discovery step. | [near_match_only] (E06, E07, E11) |
| U_spec,t | Specification uncertainty | Enumerate materially different contract interpretations and their plan-changing consequences; estimate distribution only as a decision aid. | High residual mass across materially different branches triggers a candidate user question. | [near_match_only] (E01, E16, E17) |
| U_model,t | Model/knowledge uncertainty | Record missing external facts, source conflict, tool/capability uncertainty and unsupported inference separately from user-choice ambiguity. | Route to research/verification or capability disclosure, not automatically to the user. | [near_match_only] (E01, E14, E17) |
| M_t | Materiality map | For each open dimension, estimate whether different answers alter authorization, artifacts, architecture, irreversible action, acceptance tests, cost/time, or safety. | Only material uncertainty is eligible to block handoff. | [insufficient] |
| X_t | Contradiction ledger | Machine-detect incompatible accepted fields, evidence/user conflicts, infeasible constraints and reversals; attach severity and disposition. | Any unwaived material contradiction blocks READY. | [near_match_only] (E14, E15) |
| P_t | Provenance/intent-drift ledger | Count requirements by origin and flag external evidence that introduces a new feature, role or quality attribute. | Evidence-generated scope remains proposed until accepted. | [near_match_only] (E08, E11) |
| G_t | Grounding state | Record user acknowledgment/correction of each material delta; reuse the user's accepted term and definition inside the task/session. | Model-added material fields require explicit accept/correct/defer; verbatim original fields do not need repetitive re-asking. | [near_match_only] (E06) |
| A_t(q) | Predicted answerability of question q | Estimate whether the user can distinguish options and has the requested knowledge; use unsure/none rate, answer latency and prior corrections as feedback. | Low-answerability questions are reformulated, researched, or suppressed. | [near_match_only] (E05, E12) |
| B_t | Burden state | Questions, elapsed response time, repeated/aspect-duplicate questions, characters, unsure/defer, correction/reversal, explicit fatigue and abandonment. | Increasing burden raises question cost; it never converts unresolved state to READY. | [near_match_only] (E04, E05, E12) |
| V_t(q) | Net value of a candidate question | Expected reduction in downstream plan loss after realistic answers, minus time/cognitive/redundancy/drift costs. | Ask the highest positive-value material question; if none is positive, stop asking. | [near_match_only] (E01, E12, E17) |
| D_t | Downstream readiness | Dry-run/check a contract-shaped plan outline for constraint coverage, feasibility, missing acceptance criteria and unauthorized assumptions without treating prose quality as success. | Failures feed only their causing contract dimension back into the loop. | [near_match_only] (E13, E18, E19) |
| Delta_t | Progress/stagnation | Compare successive ledgers: material gaps closed, contradictions removed, new drift introduced, and best V_t. | No material improvement with no positive-value question yields STALLED, never fake completion. | [insufficient] |

## Question-selection rule

### Formal research hypothesis

Let z be a candidate user-accepted contract, pi_t(z) the current belief over candidate contracts, p a possible downstream plan, and L(p,z) a task-specific loss based on violated critical constraints, unauthorized commitments, infeasibility and missing acceptance tests.

Baseline Bayes risk:

R_t = min_p E_z~pi_t [ L(p,z) ]

Expected value of sample information for question q:

EVSI_t(q) = R_t - E_a [ min_p E_z~pi_t [ L(p,z) | answer a to q ] ]

Net question value:

V_t(q) = EVSI_t(q) - C_time(q) - C_cognitive(q) - C_redundancy(q) - C_intent_drift(q)

Ask q* only when q* targets specification uncertainty, is material, and q* = argmax_q V_t(q) has V_t(q*) > epsilon. This formulation is supported only by analogy to IntentSim, active reward learning and structured tool-argument EVPI; the loss, priors, costs and epsilon are not calibrated for native planning. [near_match_only] (E01, E12, E17)

For a thin implementation without reliable probabilities, use an ordinal proxy:

Score(q) = material downstream-risk reduction × answerability × evidence quality − time/burden − redundancy − intent-drift risk.

No evidence supports universal numeric weights; learn/calibrate them from paired real-user trials and expose their version. [insufficient]

### Question construction constraints

1. Ask about one plan-changing decision per item; batch only independent decisions whose answers do not change later candidate sets. Scope: planning interaction hypothesis; limitation: no direct host trial. [insufficient]
2. Use 2–3 choices only when they are evidence-grounded, mutually distinguishable and collectively adequate; otherwise use staged partitioning or open input. A fixed Top-3 is not supported by the elicitation review. [near_match_only] (E07, E12)
3. A recommendation must show the deciding evidence, trade-off and assumption. It remains evidence-suggested until the user accepts it. [near_match_only] (E11)
4. Always preserve “none,” “unsure,” “defer,” or correction paths; a forced answer can be confidently wrong. [contradicts_premise] (E05, E12, E16)
5. If the missing item is an external fact, research it; if it is a user preference/authority decision, ask; if it is model/tool incapability, disclose or reframe. [near_match_only] (E01, E14, E17)
6. After a material answer, echo only the contract delta and its consequence, then record acceptance/correction. Do not repeat already grounded verbatim fields. [near_match_only] (E06)
7. Prefer critical-incident probes—what happened, cues noticed, alternatives rejected, failure signs, exceptions—when an abstract preference cannot expose tacit decision rules. Scope: CTA analogy; limitation: can burden ordinary tasks. [near_match_only] (E09, E10)

## Operational Ralph termination

“Complete tacit knowledge recovered” cannot be tested. The correct success label is “operational contract accepted for this plan at this time.” [contradicts_premise] (E05, E06, E11)

Define READY_t as true only when all of the following are true:

1. Critical-field closure: every material field in K_t is verbatim-user-stated or user-accepted, or the user explicitly accepts a discovery step that defers it. [near_match_only] (E06, E11)
2. Grounding: every material field added or changed by the model/research has an accept/correct/defer receipt; accepted user terminology is preserved. [near_match_only] (E06)
3. Consistency: X_t has no unwaived material contradiction, false premise or infeasible commitment. [near_match_only] (E14, E15)
4. Provenance: no evidence-suggested or model-inferred requirement is mislabeled as user intent. [near_match_only] (E08, E11)
5. Marginal-value stop: max_q V_t(q) <= epsilon for remaining user-answerable, material questions. [near_match_only] (E12, E17)
6. Downstream readiness: the contract includes a deliverable, boundaries and checkable acceptance conditions sufficient for the unchanged native planner; known feasibility unknowns are explicit. [near_match_only] (E13, E18, E19)
7. No-harm check: no new unauthorized scope, commitment or research-derived benchmark feature was introduced in the last transition. [near_match_only] (E03, E11)

Operational formula:

READY_t = CriticalClosed_t AND Grounded_t AND Consistent_t AND Provenanced_t AND (max_q V_t(q) <= epsilon) AND PlanInputReady_t AND NoDrift_t

This Boolean-plus-value rule is a design hypothesis, not a validated universal formula. [insufficient]

### Non-success terminal states

- STALLED: a critical gap remains, but the user cannot/does not want to answer and no positive-value research or question action remains. Return the unresolved ledger and do not claim ambiguity resolution. [near_match_only] (E05, E14)
- INFEASIBLE: accepted intent cannot be met with known host/tool/project constraints; request reframing or record an accepted feasibility-discovery step. [near_match_only] (E14)
- USER_STOP: the user stops or withdraws. Preserve the current ledger; do not hand it to stock Plan as if complete. [near_match_only] (E05)
- SAFETY_OR_AUTHORITY_BLOCK: a required authorization or safe action boundary is missing. This follows project authority, not an ambiguity score. [insufficient]
- EMERGENCY_BOUND: a configurable time/turn ceiling can prevent a runaway loop, but reaching it yields STALLED rather than READY. The product-search mean of 11.4 questions is not transferable as the ceiling. [contradicts_premise] (E05)

## Paired evaluation: stock Plan versus ThyQuery + unchanged stock Plan

### Experimental contract

1. Compare A: original query → stock Plan, with B: original query → ThyQuery loop → accepted contract → the same stock Plan. Keep host, model/version, system instructions, repository snapshot, tool availability and planner budget fixed within each pair. [insufficient]
2. Add C: a user-authored fully specified contract → stock Plan as an oracle ceiling. This separates elicitation loss from planner loss. [near_match_only] (E18, E19)
3. Use real originating users for primary evaluation. User simulators may support regression tests but cannot be the acceptance surface because real answers can be unsure, wrong, corrected or abandoned. [contradicts_premise] (E05, E13, E17)
4. Before exposure to either system, have the user create a private gold intent ledger with criticality weights, acceptable alternatives, exclusions and acceptance tests. Freeze it for primary scoring; record later genuine preference evolution separately as co-creation. [near_match_only] (E11)
5. Counterbalance condition order and use matched but non-identical tasks, or separate participants, to prevent the first interaction revealing the answer to the second. [insufficient]
6. Stratify tasks as clear, missing-key-information, ambiguous-reference, conflicting/erroneous, preference-heavy, tacit-expertise, and infeasible. Report Codex and Claude Code separately before any pooled result. [near_match_only] (E14–E17)

### Co-primary outcomes

| Metric | Operational definition | Why it matters / evidence boundary | Tag |
|---|---|---|---|
| Critical Plan Success | Binary: all user-weighted critical constraints and exclusions are satisfied, no material unauthorized assumption, and required acceptance checks are present. | Avoids rewarding polished prose; exact checker must be task-specific. | [near_match_only] (E13, E18, E19) |
| Real-user intent acceptance | After blinded plan review, user accepts without material correction; also collect forced pairwise preference A vs B plus “tie/neither.” | TravelPlanner+ suggests preference-conditioned plans can be preferred, but its preferences were supplied and judging was LLM-based. | [near_match_only] (E20) |
| Burden non-inferiority | Total user seconds, questions, answer characters, unsure/defer, corrections, repeated questions and abandonment; predeclare an acceptable margin rather than hiding burden in a composite. | Turn count alone misses latency, fatigue and answer noise; no universal margin exists. | [near_match_only] (E04, E05, E12) |

### Secondary and diagnostic metrics

| Layer | Metric | Definition | Tag |
|---|---|---|---|
| Ask decision | When-to-ask AUROC/AUPRC and calibration | Predict whether clarification produces positive paired downstream gain, not merely whether annotators label a query ambiguous. | [near_match_only] (E01, E15) |
| Question target | Minimum critical question accuracy | On gold-missing dimensions, proportion where the first question targets a necessary plan-changing variable; also wrong-aspect, over-specified and under-specified rates. | [near_match_only] (E15, E16) |
| Interaction | Useful-question precision | Questions whose answer changes an accepted material field or resolves a contradiction divided by all questions. | [near_match_only] (E03–E05) |
| Interaction | Redundancy and trajectory damage | Repeated/aspect-duplicate count; quality sequence; recovery after a low-quality question. | [near_match_only] (E04, E14, E17) |
| Contract | Intent-weighted coverage | Sum of gold-field criticality weights satisfied by the accepted contract divided by total weights. | [insufficient] |
| Contract | Unsupported invention rate | Material accepted-contract fields absent from the gold ledger and not explicitly user-accepted, divided by all material fields. | [near_match_only] (E08, E11) |
| Contract | Provenance accuracy | Fraction of fields whose stated/accepted/suggested/inferred/deferred label matches the interaction transcript. | [near_match_only] (E11) |
| Contract | Contradiction closure | Material contradictions resolved or explicitly waived divided by detected gold contradictions. | [near_match_only] (E14, E15) |
| Handoff | Contract-to-plan fidelity | Recall and precision of accepted critical fields in the final native plan; count mutations introduced after handoff. | [near_match_only] (E18–E20) |
| Plan | Executability/validity | Domain checker, tests, dependency/feasibility validation, or blinded expert rubric; never style alone. | [near_match_only] (E13, E19) |
| Plan | Acceptance-test coverage | Gold acceptance checks represented by an actionable verification step in the final plan. | [near_match_only] (E13) |
| Regression | Clear-query no-harm | Unnecessary-question rate and paired plan degradation on already complete queries. | [contradicts_premise] (E01, E03, E15) |
| Calibration | Predicted versus realized VOI | Reliability curve/Brier score for predicted V_t(q) against actual reduction in plan loss after the answer. | [near_match_only] (E01, E17) |
| Efficiency | Quality–burden frontier | Plot Critical Plan Success and intent-weighted coverage against user seconds/questions; report Pareto dominance and area under the budget curve, not one opaque score. | [near_match_only] (E01, E12, E17) |

Report absolute paired differences, confidence intervals and raw denominators. Relative gains such as “+15%” can conceal low baselines; no source establishes a universal minimum effect for launch. [insufficient]

Recommended analysis is paired bootstrap/permutation for continuous/ordinal outcomes, McNemar for paired binary success, and a mixed-effects model with task/user and host/version factors if sample size supports it. Power and margins require pilot variance; selecting them now would be invented precision. [insufficient]

## Benchmark and task candidates

| Candidate | Use in R3 evaluation | Required adaptation | Main caveat | Tag |
|---|---|---|---|---|
| QuestBench Planning-Q / Logic-Q | Minimal necessary-question accuracy, hedging and specification-vs-reasoning separation. | Run supported host models through equivalent ask/no-ask interface; preserve fully specified controls. | One question, multiple choice, synthetic CSP. | [near_match_only] (E16) |
| ClarifyBench / When2Call | Multi-turn ask/execute/decline behavior, EVPI efficiency and infeasible cases. | Replace or supplement LLM simulator with real users; map tool arguments to plan-contract slots. | Structured tool calls are narrower than plans. | [near_match_only] (E17) |
| NoisyToolBench | Missing key info, ambiguous reference, erroneous premise and capability taxonomy; A1/A2/redundancy/steps. | Add clear controls and native-plan handoff cases; manually verify judge labels. | Only 200 manually mutated evaluation entries; automated judging. | [near_match_only] (E14) |
| CLAMBER | Ambiguity identification, wrong-aspect/over-/under-specification regression. | Add downstream plan and user-answer outcomes. | Information need benchmark; ambiguity labels alone are not utility. | [near_match_only] (E15) |
| Qulac | Question retrieval/selection and multi-turn context smoke tests. | Treat oracle as ceiling; do not infer stop performance. | Fixed question bank, offline search and oracle result. | [near_match_only] (E02) |
| ClarifyGPT code tasks | Executable downstream outcome after requirements clarification. | Reproduce version-of-record tasks, then compare native plan quality and eventual code tests separately. | Tests can leak the intended behavior and are stronger oracles than project planning. | [near_match_only] (E13) |
| NATURAL PLAN paired mask set | Start with fully specified gold tasks, mask one or more constraints into ambiguous queries, then compare recovered contract and unchanged planner. | Publish masking rules, keep original as planner ceiling, and avoid test contamination. | Derived ambiguity set would require new validation with humans. | [near_match_only] (E18) |
| TravelPlanner / TravelPlanner+ slice | Multi-constraint plan validity and preference-aware plan relevance. | Use a stratified slice, provide real preference elicitation, and retain rule-based constraint checks. | Severe floor effect; TravelPlanner+ supplies rather than elicits preferences. | [near_match_only] (E19, E20) |
| New host-native intent ledger set | Primary ecological test: real Codex/Claude users author hidden intent contracts, submit naturally vague queries, answer real questions and judge plans. | Pre-register gold-ledger protocol, counterbalancing, host snapshots, privacy and task-specific checkers. | No existing dataset or effect size; must be built and validated. | [insufficient] |

Recommended benchmark stack: use host-native real-user tasks as the primary acceptance surface; QuestBench/CLAMBER/NoisyToolBench/ClarifyBench as diagnostic units; NATURAL PLAN and a TravelPlanner slice as downstream stress tests. No single existing benchmark spans ambiguity detection, tacit elicitation, real burden, accepted contract and unchanged native plan quality. [insufficient]

## Failure modes and controls

| Failure mode | Observable signal | Control | Tag |
|---|---|---|---|
| Indiscriminate Ralph looping | Questions continue despite no material contract delta; burden rises. | Require positive V_t(q); emergency bound yields STALLED. | [contradicts_premise] (E03–E05) |
| Wrong-aspect clarification | User answers, but critical branch remains unchanged; high correction rate. | Gold-dimension targeting metric; contract delta check after every answer. | [contradicts_premise] (E15, E16) |
| Confusing model ignorance with user ambiguity | Questions ask users for facts the system should research or cannot know. | Separate U_spec from U_model and capability state. | [near_match_only] (E01, E14, E17) |
| Forced-choice false certainty | Frequent none/unsure/corrections; options are indistinguishable. | Keep none/unsure/defer/freeform; estimate answerability. | [contradicts_premise] (E05, E12) |
| Evidence-induced intent drift | New benchmark/SOTA feature appears as a requirement without user receipt. | Provenance ledger; evidence suggestions remain proposals. | [near_match_only] (E11) |
| Fluent but unsupported contract | Plausible fields lack source/acceptance and survive to plan. | Unsupported-invention metric; material inferred fields block READY. | [near_match_only] (E08) |
| Cross-user/project pact leakage | A term accepted in one session silently changes another user's contract. | Scope grounding records to user/task/session unless explicitly promoted. | [near_match_only] (E06) |
| Simulator optimism | Offline success is high but real users are unsure, wrong, slow or abandon. | Real-user primary evaluation; simulation only regression support. | [contradicts_premise] (E05, E13, E17) |
| Self-certified closure | Model says ambiguity is gone despite low ask/detection accuracy. | Boolean ledger gates plus user receipts and downstream checks. | [contradicts_premise] (E15, E16) |
| Planner bottleneck hidden as elicitation failure | Contract is correct but stock Plan violates it. | Oracle fully specified condition and contract-to-plan fidelity metric. | [contradicts_premise] (E18, E19) |
| Elicitation gain hidden by floor/ceiling | Hard benchmark stays near zero or easy task is already solved. | Difficulty strata and fully specified upper bounds; report by stratum. | [near_match_only] (E18, E19) |
| LLM-judge/style proxy inflation | Detailed prose scores well while constraints fail. | Prefer executable checks and blinded user/expert review; disclose judge model. | [near_match_only] (E13, E19, E20) |
| Endless research branch | More sources add no contract-changing evidence. | Research must target a named U_model item and stop when decision-relevant evidence saturates; unresolved conflict stays explicit. | [insufficient] |

## Design constraints for DS@v1

1. The plugin must not promise complete recovery of tacit knowledge; it may promise a traceable, user-accepted operational contract under stated evidence and bounds. [contradicts_premise] (E05, E11)
2. The Ralph loop must have READY, STALLED, INFEASIBLE and USER_STOP outcomes; only READY hands a completed contract to unchanged native Plan. [near_match_only] (E05, E14)
3. Question count is adaptive. Neither “Top 3” nor “11 questions” is an evidence-backed constant. [contradicts_premise] (E05, E07)
4. Every externally researched recommendation needs provenance, trade-off, and an explicit user disposition before it becomes intent. [near_match_only] (E11)
5. The nearest defensible ask/stop objective is expected downstream value minus user/redundancy/drift cost, with specification and model uncertainty separated. [near_match_only] (E01, E12, E17)
6. Clear queries require a no-harm path that can pass directly to stock Plan without ceremonial questions after validating contract sufficiency. [contradicts_premise] (E01, E03, E15)
7. The final accepted contract must be auditable field-by-field and the final native plan must be scored for fidelity to it. [near_match_only] (E11, E18–E20)
8. Any numeric threshold, interaction budget or quality weight must be versioned and empirically calibrated separately for Codex and Claude Code. [insufficient]

## Open unknowns

- Direct effect of ThyQuery on current stock Codex Plan and current stock Claude Code Plan, including model/version drift. [insufficient]
- Whether either host exposes the telemetry needed for answer latency, mode-transition receipt, question retries and unchanged-planner identity. [insufficient]
- A validated taxonomy and criticality weighting for free-form software/research/design plans rather than API arguments or search facets. [insufficient]
- Calibration of pi_t, L, answer distributions, burden costs and epsilon; SAGE-Agent values cannot be copied across domains. [insufficient]
- Whether deep research before questioning improves contract accuracy enough to offset latency and evidence-induced scope drift. [insufficient]
- Real-user effects in Korean and mixed Korean/English technical dialogue; most located studies are English. [insufficient]
- Multi-stakeholder conflict and whose acceptance counts as grounding when intent is not owned by one user. [insufficient]
- Privacy policy for hidden intent ledgers, conversation-derived preferences and cross-session conceptual pacts. [insufficient]
- Robustness when users genuinely change their mind during the loop; evaluation must distinguish recovered intent from preference evolution. [insufficient]
- A priori sample size and non-inferiority margin for burden; these require pilot variance on the two host implementations. [insufficient]

## R3 handoff

The empirical design recommendation is not “ask until confidence is high.” It is: maintain a provenance-bearing contract; separate specification, model and capability uncertainty; ask only the most material, answerable positive-net-value question; ground every model-added material field; stop successfully only when the accepted contract passes observable closure gates; and evaluate the unchanged native plan as a separate downstream component. This combined rule has strong near-domain support but remains unvalidated for the exact two-host plugin. [near_match_only] (E01, E05, E11, E17–E20)
