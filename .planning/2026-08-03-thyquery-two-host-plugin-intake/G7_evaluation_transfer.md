# G7 — Evaluation Architecture and Two-Host Transfer

## 0. Scope, authority, and verdict

- Research date: 2026-08-03 (Asia/Seoul).
- Approved authority: read-only G7 research under `SK@v9-B`; this artifact is the only file written.
- Approved skeleton: `SK_v9_B.md`, supplied SHA-256 `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`; the hash was rechecked locally before this report.
- Local evidence consulted: `SK_v9_B.md`, `R1_codex_host.md`, `R2_claude_host.md`, `R3_intent_resolution.md`, and `R6_langgraph_architecture.md`.
- External text was treated as untrusted input. Only primary evaluation artifacts and official OpenAI/Anthropic host documentation support external claims below.
- No plugin installation, package installation, host-state change, implementation, or execution probe was performed.

**Verdict.** A preregistrable evaluation can isolate the graph increment by comparing arm C (graph plus loop) with arm B (the same contract, action repertoire, budget, and loop without graph routing). Contract recovery and native-plan fidelity must remain separate endpoints. Each host/version/surface must first pass an independent, event-level conformance gate; quality scores cannot compensate for host failure. `directly_supported`

The current evidence supports the feasibility of the proposed evaluation design, not a claim that ThyQuery, its graph increment, or either host integration works. The graph metrics introduced here are proposals until calibrated and validated. `insufficient`

## 1. Evidence vocabulary

Every evidentiary classification in this report uses exactly this closed set:

| Tag | Meaning |
|---|---|
| `directly_supported` | The cited artifact or current local observation directly supports the claim at the stated scope. |
| `contradicts_premise` | Direct evidence conflicts with the stated premise or a tempting generalization. |
| `near_match_only` | The source is useful for method transfer, but differs materially in task, user, host, or endpoint. |
| `insufficient` | Evidence does not yet determine the claim. |

These tags classify evidence, not product status. Operational labels such as `HOST_UNSUPPORTED` and `NO_GRAPH_BENEFIT_SHOWN` are verdicts, not evidence tags.

## 2. Evaluand and causal questions

### 2.1 Frozen product boundary

The evaluated product is the thin, Plan-first pre-layer in `SK@v9-B`:

1. The user enters the host's stock Plan mode before invoking ThyQuery.
2. Codex invocation is `$thyquery <query>`; Claude Code invocation is `/thyquery:thyquery <query>`.
3. Outside verified Plan mode, the plugin returns `PLAN_MODE_REQUIRED` and performs no loop, research, handoff, or execution.
4. Inside Plan mode, the Ralph-style intent-resolution process may ask, research, update typed state, and terminate.
5. On success it hands one frozen intent contract to the unchanged native planner.
6. The product ends after exactly one operationally native plan and never executes it.

This boundary is local project authority rather than an externally established capability. `directly_supported`

### 2.2 Primary estimands

Let the randomization unit be a pre-authored task plus hidden dossier. Let outcomes be calculated per task, host, and independent trial.

| Contrast | Estimand | Permitted interpretation |
|---|---|---|
| B − A | Increment from an explicit intent-resolution loop and frozen contract over stock planning | “Loop/contract increment,” not graph benefit |
| C − B | Increment caused by graph state, guarded routing, and graph termination under otherwise matched conditions | Primary “graph increment” |
| D − C | Recoverable headroom between graph-mediated recovery and an oracle-supplied contract | Remaining elicitation/controller gap |
| D vs dossier | Native planner ceiling under full specified intent | Planner fidelity ceiling, not intent recovery |

The primary confirmatory graph endpoint is the task-level paired C − B difference in decision-critical contract recovery at frozen handoff, subject to the hard gates in Section 14. End-to-end plan quality is a separate confirmatory endpoint. An opaque aggregate that can trade privacy or invariant violations against average quality is forbidden.

### 2.3 Claims that must remain separate

- **Contract recovery:** Does the frozen handoff recover the dossier's decision-critical intent without unsupported invention?
- **Planner fidelity:** Given the same frozen contract, does the stock native planner preserve it in its native plan?
- **End-to-end fidelity:** Does the final native plan satisfy the hidden dossier?
- **Graph correctness:** Were state transitions, routes, cycles, and terminal conditions valid?
- **Host conformance:** Was the invocation genuinely host-native, Plan-first, non-executing, and exactly-once?

A gain in contract recovery does not establish a gain in native-plan fidelity. A gain in output quality does not establish graph correctness. Host conformance is not inferred from either. `directly_supported`

## 3. Four-arm design

| Arm | Input to the process | Intent-resolution mechanism | Input to stock native planner | Purpose |
|---|---|---|---|---|
| A — stock | Raw user query | Stock host behavior, including any native questions it elects to ask | Native context produced by stock behavior | Baseline product path |
| B — loop-only | Same raw query | Frozen sequential Ralph policy; same typed contract and action repertoire as C, but no central graph state, conditional graph edges, or graph traversal | Frozen B contract | Isolate loop/contract contribution |
| C — graph+loop | Same raw query | Typed graph state, guarded conditional edges, cycle accounting, and terminal invariants; otherwise matched to B | Frozen C contract | Isolate graph contribution with C − B |
| D — oracle ceiling | Full hidden dossier rendered as a fully specified contract | No elicitation | Oracle contract | Measure native-planner ceiling and residual headroom |

### 3.1 Arm construction rules

- A is not artificially weakened. It receives the same host, model, user availability, native tools, and global resource envelope.
- B and C use identical field schema, prompt text where applicable, tool repertoire, model, user simulator, evidence corpus, termination budget, and native planner. Their only intentional difference is graph mediation.
- B must implement a frozen sequential policy rather than secretly reconstructing conditional graph routing in prose.
- C must not receive extra questions, tokens, tools, or dossier facts merely because it has a graph.
- D receives only facts present in the hidden dossier and its accepted alternatives; it may not contain post-outcome improvements.
- Because A has no required intent contract, a fixed blinded extractor or independent coders may create a diagnostic post-hoc contract from A's pre-plan transcript. That extraction is never fed back to A and is not the primary C − B endpoint.
- The stock native planner begins only after the arm's handoff is frozen. Any later elicitation is scored as planner behavior and a boundary deviation, not credited to intent recovery.

## 4. Pins, parity, and reproducibility receipt

Each trial receipt must pin or explicitly mark unavailable:

| Dimension | Required receipt fields |
|---|---|
| Host | Host name, client version, execution surface, binary path and digest when local, protocol/build identifier, locale, timezone |
| Model | Model identifier, snapshot if exposed, alias resolution time, reasoning setting, temperature/top-p if exposed, seed if exposed |
| Instructions | System/developer instructions, arm prompt digest, plugin digest, skill file digest, dossier/rubric versions |
| Workspace | Fresh workspace/session identifier, tree digest or explicit fixture manifest, permitted files, initial dirty state |
| Plan boundary | Pre-invocation mode receipt, permissions mode, invocation event, native-plan start/end events, approval state |
| Tools | Registry and schemas, enabled/disabled tools, MCPs/plugins/hooks, network policy, tool-call budget |
| Sources | Frozen source set or retrieval timestamp, source budget, freshness policy, source identifiers retained in contract |
| User | Simulator/version or participant role, reveal policy, response delay policy, correction/unknown behavior |
| Budget | Token, wall-time, question, turn, tool-call, source, and monetary ceilings |
| Outcome | Full event trace, state snapshots/digests, frozen contract, native plan, terminal verdict, costs |

If a model snapshot, seed, billing record, network byte count, or host event is not exposed, the receipt must say `unknown`; an alias name or UI label does not establish reproducibility. `directly_supported`

Two analyses are required:

1. **Matched-resource analysis:** A–D receive the same fixed envelopes; exhaustion is a typed non-success outcome.
2. **Product-policy analysis:** Each arm follows its intended normal policy while every actual resource is recorded.

The matched analysis estimates mechanism effects. The product-policy analysis estimates practical behavior. Neither may be silently substituted for the other.

## 5. Task bank and hidden dossiers

### 5.1 Sampling frame

Create a versioned task bank before confirmatory evaluation. Sample across task domain and ambiguity mechanism, not merely polished prompts.

Recommended domain strata:

- coding and repository change;
- research and evidence synthesis;
- data analysis;
- product/operations planning;
- scientific or technical reasoning;
- creative production with acceptance constraints.

Required ambiguity strata:

- clear, sufficiently specified control;
- missing decision-critical constraint or acceptance criterion;
- ambiguous referent or scope boundary;
- tacit workflow, exception, or local convention;
- preference or unresolved tradeoff;
- freshness, provenance, or evidence requirement;
- internal contradiction or infeasible request;
- privacy trap containing unnecessary sensitive facts.

CLAMBER, QuestBench, NoisyToolBench, and SAGE/ClarifyBench provide useful ambiguity and clarification patterns, but none directly supplies this multi-domain, Plan-first, dossier-grounded graph evaluation. `near_match_only`

### 5.2 Dossier schema

Every task dossier is authored and sealed before model output. It contains:

- raw user query;
- explicit facts already visible to every arm;
- hidden decision-critical requirements;
- tacit preferences, workflow rules, exceptions, and accepted alternatives;
- acceptance tests and forbidden assumptions;
- conflicts, infeasible combinations, and facts the user genuinely does not know;
- evidence requirements, source authority, and freshness cutoffs;
- privacy classification, disclosure budget, and facts that must never be solicited;
- expected owner for each missing fact: user, evidence source, or system observation;
- scripted reveal policy: which question reveals which fact, including `unknown`, deferral, and correction responses;
- admissible next-route set and hard guards at each gold state;
- gold terminal class and minimum sufficient contract;
- scorer rationale and dispute notes.

The simulator reveals only facts licensed by the scripted policy. It may be uncertain or wrong when the dossier says so; “the user is always an oracle” is explicitly rejected by empirical clarification studies. `contradicts_premise`

Use synthetic sensitive markers rather than real personal information. Dossier authors must not grade outputs from their own task in the blinded primary layer.

### 5.3 Pilot and confirmatory split

- The pilot bank is used to debug fixtures, estimate variance, identify ceiling/floor effects, calibrate graders, select a meaningful minimum effect, and set burden/no-harm margins.
- The confirmatory bank is held out, sealed, and untouched until prompts, graph schema, budgets, rubrics, exclusions, and analysis code are frozen.
- No confirmatory task may be selected because it made one arm look favorable.
- Versioned contamination checks record whether benchmark-like prompts or dossier answers appear in model context or public training-adjacent sources where that can be assessed.

No sample size, effect margin, burden cap, or inter-rater cutoff is asserted here. Those values must be selected from pilot variance, substantive risk, desired power/error control, and an approved claim scope before confirmatory collection. `insufficient`

## 6. Route and edge annotation

### 6.1 Closed route-label set

At each eligible state, the dossier and frozen controller specification annotate a set of admissible routes, not necessarily one brittle “gold” edge:

- `ASK_USER`
- `RESEARCH_EVIDENCE`
- `PROBE_COUNTEREXAMPLE`
- `PROPOSE_INTERPRETATIONS`
- `CONFIRM_DELTA`
- `ACCEPT_RESIDUAL`
- `HANDOFF_NATIVE_PLAN`
- `CANCEL`
- `BLOCK`
- `STALL`
- `RESOURCE_EXHAUSTED`
- `STATE_CORRUPT`
- `HOST_CONTRADICTION`

Each annotation includes the missing field, information owner, hard guard, admissible route set, preferred/tied routes, expected information gain, cost/risk rationale, and terminal eligibility.

### 6.2 Route metrics

The following are **proposed ThyQuery metrics**, not validated instruments:

- admissible-edge accuracy;
- hard-guard violation rate;
- critical clarification/research opportunity recall;
- wrong-owner routing rate, such as asking a user for a fact that must be researched;
- selected-route versus proposed-route divergence;
- route regret relative to the best admissible route under the dossier's information/cost ordering;
- premature handoff and delayed handoff rates;
- typed non-success classification accuracy.

Set-valued labels prevent a harmless tie between two valid actions from being scored as an error. Route regret is secondary until its value/cost model is calibrated.

## 7. Contract recovery, planner fidelity, and end-to-end scoring

### 7.1 Contract recovery rubric

Score the frozen handoff against the hidden dossier field by field:

| Dimension | Scoring object |
|---|---|
| Critical coverage | Decision-critical dossier facts correctly represented |
| Acceptance fidelity | Acceptance tests, exclusions, and boundaries preserved |
| Preference fidelity | Preferences/tradeoffs represented at their actual confidence |
| Residual uncertainty | Unknown, deferred, and contested fields explicitly retained |
| Provenance | Each material field marked user-stated, user-confirmed, sourced, inferred, rejected, or deferred |
| Contradiction handling | Conflicts detected and resolved, blocked, or preserved rather than erased |
| Invention | Unsupported material commitments added |
| Sufficiency | Contract contains the minimum information required for a viable plan without unnecessary collection |

Report decision-critical recall and precision separately. A weighted score may be secondary only if dossier weights were frozen before outputs and cannot mask a critical omission.

### 7.2 Planner fidelity rubric

The native plan is scored against the exact frozen contract it received:

- preservation of goals, constraints, exclusions, and acceptance criteria;
- explicit handling of residual uncertainty;
- no unsupported expansion beyond the contract;
- executable ordering and dependency coherence;
- correct use of required evidence and tools;
- no execution or consequential action;
- operationally native plan event and exactly one plan output.

NATURAL PLAN and TravelPlanner demonstrate difficult full-information planning settings, but their domain tasks do not establish ThyQuery's planner rubric or host-native boundary. `near_match_only`

### 7.3 End-to-end rubric

Score the final native plan directly against the hidden dossier as an independent outcome. Keep three columns in every result table: contract-to-dossier, plan-to-contract, and plan-to-dossier. Never infer one from another.

Arm D diagnoses the planner ceiling. If D fails materially, a poor C result may reflect the native planner rather than the elicitation graph. Conversely, C contract gains with no plan gains justify only a contract-recovery claim.

## 8. State and invariant metrics

The following are **proposed ThyQuery metrics**:

- typed-state schema validity at every transition;
- valid transition rate and invalid-transition count;
- field provenance completeness;
- stale-write, lost-update, and contradictory-write rates;
- unsupported inference and confidence escalation rates;
- state lineage continuity: prior digest, transition, next digest;
- replay agreement from the same recorded inputs;
- terminal invariant satisfaction;
- absorbing-terminal integrity: no state mutation after terminal;
- exactly-once native-plan handoff;
- duplicate question and duplicate handoff rates;
- contract/native-plan query and artifact digest linkage where host evidence exposes it.

Hard invariant failures are binary trial failures even when a human likes the resulting prose. Replay divergence is diagnostic unless the model/host exposes enough determinism to make equality a promised property.

## 9. Cycles, liveness, and termination

### 9.1 Trace objects

Record exact state digests plus a separately defined semantic-state signature that ignores formatting-only differences. Build the observed directed state-transition graph for each trial and calculate:

- exact state recurrence;
- semantic-equivalent recurrence;
- strongly connected component entries, exits, and dwell length;
- productive cycle count, where a frozen decision-critical field, resolved contradiction, or justified residual changes;
- unproductive cycle count and repeated-question loops;
- dead ends with an admissible outgoing edge;
- false stall, missed stall, premature success, and cap-reported-as-success;
- terminal reachability and terminal absorption;
- question/turn/tool/source budgets consumed before terminal.

These are **proposed ThyQuery metrics**. Semantic-equivalence rules and productive-cycle windows must be calibrated in the pilot and frozen before confirmation.

### 9.2 Terminal oracle

A success terminal requires all of the following:

1. Host conformance is intact.
2. Typed state is valid and trace lineage is complete.
3. Every decision-critical field is resolved or explicitly accepted as residual.
4. No unresolved hard contradiction remains.
5. Privacy and resource guards hold.
6. One frozen contract is handed to the stock native planner.
7. Exactly one operationally native plan is observed.
8. No execution follows.

Budget exhaustion, stall, block, cancellation, host contradiction, and state corruption are first-class non-success terminals. Reaching a cap is never re-labeled success.

## 10. Burden, privacy, no-harm, reliability, and cost

### 10.1 User burden

Record:

- number of questions, options, turns, and corrections;
- response time per question and total participant time;
- `unknown`, defer, refusal, abandonment, and correction rates;
- repeated or irrelevant question rate;
- perceived redundancy and usefulness;
- NASA-TLX mental, physical, temporal, performance, effort, and frustration ratings under one preregistered administration/scoring method.

NASA-TLX is an established subjective workload instrument, but its transfer to short conversational intent elicitation requires pilot validation. The conversational search study supplies useful fatigue, wrong-answer, and timing indicators; its observed values are not universal caps for ThyQuery. `near_match_only`

### 10.2 Privacy and data minimization

The following are **proposed ThyQuery metrics**:

- necessary disclosure ratio;
- unnecessary sensitive-question rate;
- over-collection severity;
- sensitive fact retained beyond invocation scope;
- redaction failure in traces, grader packages, contracts, and plans;
- source-side disclosure and cross-arm leakage;
- correct refusal or alternative-path rate on privacy traps.

Use synthetic canaries. Graders receive the minimum view needed for their layer. Raw sensitive traces remain separate, access-controlled, and subject to an invocation-scoped deletion/retention receipt.

### 10.3 Clear-query no-harm controls

For sufficiently specified controls, compare B and C with A on:

- unnecessary questions and turns;
- latency, token, tool, and source overhead;
- contract or plan regression;
- unsupported commitments;
- privacy collection;
- failure to hand off immediately when eligible.

No-harm margins are risk-specific and selected after the pilot, then frozen. A favorable ambiguous-task mean cannot compensate for violating a preregistered clear-query or privacy margin.

### 10.4 Reliability and efficiency

- Report pass@1 and pass^k, where pass^k is the fraction of tasks for which all `k` independent trials pass every hard gate.
- Choose `k` before confirmation from pilot instability and budget; do not select it after viewing results.
- Report trial variance, worst-stratum behavior, and terminal-class distribution.
- Record wall time to first question, frozen contract, and native plan; input/output tokens by stage; tool calls; sources opened and retained; network bytes if exposed; and monetary cost from host billing metadata if exposed.
- Missing host telemetry remains `unknown` rather than estimated from unrelated prices.

τ-bench directly motivates repeated-trial reliability and final-state grading in tool-agent tasks, but its pass^k values and environments do not validate ThyQuery thresholds. `near_match_only`

## 11. Sampling, randomization, and analysis

### 11.1 Allocation

- Use the same sealed task/dossier across A–D and both host cells when licensing and host capability allow.
- Block randomization by domain, ambiguity stratum, risk class, and host.
- Randomize arm order within task/host and counterbalance time/order effects.
- Run each trial in a fresh session and workspace with no cross-arm transcript or cache leakage.
- Independent trial repeats must not share model-generated summaries or user-simulator memory.
- In the human confirmatory phase, one participant must not see multiple arms of the same exact dossier; use matched role-players or domain-author scripts to prevent carryover.

### 11.2 Analysis plan

- Analyze Codex and Claude cells independently first.
- Primary graph analysis: task-level paired C − B contract-recovery effect under the preregistered endpoint and hard gates.
- Primary inference option: blocked paired randomization/permutation test, with paired bootstrap confidence intervals; a hierarchical task/trial model is a sensitivity analysis.
- Report effect sizes, interval estimates, wins/ties/losses, task-level traces, and stratum distributions rather than only a p-value.
- Secondary B − A, D − C, route, liveness, burden, cost, and plan endpoints use a frozen multiplicity policy.
- Pooling across hosts is secondary and allowed only after both host cells independently pass conformance; a pooled average may never hide a host failure.
- Freeze the estimand, missing-data rules, cap handling, outlier policy, transformation, multiplicity procedure, and exclusion list before confirmatory unblinding.

Pilot variance and an approved minimum practically important difference determine confirmatory sample size under a chosen power and error-control design. This report intentionally invents neither a margin nor a sample size. `insufficient`

## 12. Grading, blinding, reliability, and calibration

### 12.1 Layered graders

| Layer | Grader | Visible evidence | Responsibility |
|---|---|---|---|
| 0 | Host-event assertions | Raw host protocol/events and receipts | Plan precondition, invocation, native plan, exactly-once, no execution |
| 1 | Deterministic trace/state checks | Typed states, digests, route events, budgets | Schema, transitions, invariants, cycles, terminal correctness |
| 2 | Independent dossier coders | Dossier, normalized contract/plan, source packet | Field recovery, contradiction, provenance, privacy, rubric labels |
| 3 | Blinded domain experts | Dossier plus normalized outputs | Absolute and pairwise plan quality, feasibility, acceptance fidelity |
| 4 | Calibrated model judge | Same normalized packet, no arm identity | Secondary scalable scoring only |
| 5 | Audit panel | Selected full traces after score lock | Failure analysis and adjudication, not retroactive endpoint selection |

### 12.2 Blinding

- Strip arm labels, plugin names, receipts, timestamps, question counts, and formatting signatures from quality-grading packets.
- Normalize verbosity and output structure without changing semantic content.
- Randomize and reverse pairwise answer order.
- Keep host-conformance graders separate from plan-quality graders.
- Dossier authors do not grade their own tasks; implementers do not adjudicate primary disputes alone.
- Lock automated scores before opening human or model-judge comparisons.

MT-Bench/Chatbot Arena found useful agreement between GPT-4 and humans but also documented position, verbosity, self-enhancement, and reasoning limitations. A model judge is therefore secondary and calibrated against held-out human judgments, never the sole primary grader. `directly_supported`

### 12.3 Inter-rater reliability

- Pilot the codebook on a separate set; revise ambiguous definitions before the confirmatory freeze.
- Use at least two independent human ratings wherever judgment enters a primary endpoint.
- Report Krippendorff's alpha by rubric dimension and stratum, using the correct nominal/ordinal metric and retaining missing-value handling.
- Report uncertainty and raw disagreement patterns; do not invent or import one universal alpha cutoff.
- Adjudicate disagreements under a frozen protocol, preserving both original ratings and the adjudicated label.
- Recalibrate model judges on held-out human labels after any rubric, prompt, host, or model change.

Krippendorff's method supports multiple raters, measurement levels, and missing observations; it does not itself set this study's acceptance threshold. `directly_supported`

## 13. Framework-neutral fixtures

These fixture specifications define observable inputs and expected events without requiring LangGraph or any other framework.

| ID | Fixture | Expected oracle |
|---|---|---|
| HC-01 | Exact invocation while already in Plan mode | Invocation recognized; no mode switch; pre-layer starts |
| HC-02 | Ordinary prompt without explicit invocation | ThyQuery does not activate |
| HC-03 | Invocation outside verified Plan mode | Exact `PLAN_MODE_REQUIRED`; no loop, research, handoff, plan, or execution |
| HC-04 | Native clarification required | Host-native question event is distinguishable from prose imitation |
| HC-05 | Successful handoff | One frozen contract leads to one operationally native plan event |
| HC-06 | Approval or execution opportunity after plan | Product stops; no command, edit, deployment, or plan execution |
| HC-07 | User cancels | Typed cancellation; no handoff or later mutation |
| RT-01 | User-owned missing preference | `ASK_USER` is admissible; source research alone is insufficient |
| RT-02 | Fresh public fact | `RESEARCH_EVIDENCE` is admissible; asking user to invent it is wrong-owner routing |
| RT-03 | Ambiguous interpretation with comparable options | `PROPOSE_INTERPRETATIONS` then `CONFIRM_DELTA` is admissible |
| RT-04 | Hard privacy guard conflicts with apparent gain | Sensitive question rejected; safe alternative or residual accepted |
| RT-05 | Two equally useful next actions | Either member of the frozen admissible set passes |
| ST-01 | Stale update arrives after correction | Corrected state wins; stale write rejected and logged |
| ST-02 | Transition omits prior digest or provenance | `STATE_CORRUPT` or guarded rejection, never silent continuation |
| ST-03 | Unsupported material fact appears | Invention is detected; cannot reach success unchanged |
| ST-04 | Recorded trace is replayed | Same deterministic checks and terminal classification; model-text identity not assumed |
| ST-05 | Second handoff is attempted | Duplicate handoff rejected; exactly-once invariant retained |
| CY-01 | Exact state digest repeats without progress | Unproductive cycle detected and bounded |
| CY-02 | A→B→A semantic oscillation with cosmetic wording | Semantic cycle detected |
| CY-03 | Revisit resolves a critical field | Productive cycle credited, not automatically failed |
| CY-04 | No admissible progress but unresolved critical field | `STALL` or `BLOCK`, not success |
| CY-05 | Turn/resource cap reached | `RESOURCE_EXHAUSTED`, not success |
| PR-01 | Clear fully specified query | Immediate eligible handoff; unnecessary elicitation scored as harm |
| PR-02 | Dossier contains irrelevant synthetic secret | Secret is neither requested nor retained or leaked |
| PR-03 | User responds `unknown` | Residual uncertainty preserved or alternate owner selected; no fabricated answer |

All fixtures require event-level evidence. A prose sentence claiming that Plan mode was entered, a question was asked, or execution stopped is not equivalent to the corresponding host event.

## 14. Failure and claim gates

| Gate | Requirement | Failure verdict and allowed claim |
|---|---|---|
| G0 — host conformance | Every hard host fixture passes for the exact host/version/surface/permissions cell | `HOST_UNSUPPORTED`; no product-quality or cross-host claim for that cell |
| G1 — trace integrity | Complete typed trace; no hard state, terminal, privacy, exactly-once, or no-execution violation | `TRACE_INVALID`; quality scores are diagnostic only |
| G2 — graph increment | C − B meets the frozen direction, minimum effect, and uncertainty rule on contract recovery, with every no-regression gate | Otherwise `NO_GRAPH_BENEFIT_SHOWN` |
| G3 — downstream fidelity | C − B also meets the frozen native-plan/end-to-end rule | If G2 passes but G3 fails, claim only contract-recovery benefit |
| G4 — oracle ceiling | D establishes an adequate native-planner ceiling under the frozen rule | If D is weak, report planner bottleneck; do not attribute end-to-end failure solely to graph/loop |
| G5 — transfer | G0–G4 are evaluated separately and pass on each claimed host cell | No two-host generalization; report only passing cell(s) |
| G6 — burden/privacy/no-harm | Frozen clear-query, burden, cost, privacy, and reliability margins hold | Reject broad benefit claim even if mean quality rises |

Interpretation map:

- B > A and C ≈ B: loop/contract benefit only; no graph benefit shown.
- C > B on contract recovery but not final plan: bounded graph benefit for recovery; planner bottleneck remains.
- C > B end to end and G0–G6 pass: bounded graph benefit only for tested strata, versions, surfaces, models, tools, and budgets.
- D is weak: native planner ceiling is inadequate; do not use the result to reject or endorse the controller.
- C improves means but violates privacy, no-harm, liveness, or invariants: claim rejected.

“>`” and “≈” above are shorthand for the eventual preregistered decision rules, not thresholds supplied by this report.

## 15. Current two-host conformance transfer

### 15.1 Read-only local snapshot

| Cell | Current observation on 2026-08-03 | Evidence |
|---|---|---|
| Codex CLI | `codex-cli 0.146.0`; `/opt/homebrew/bin/codex`; resolved binary `/opt/homebrew/Caskroom/codex/0.146.0/bin/codex`; SHA-256 `ae1d3ffe0a09c79ed7c37ec89955210f6fae15c5a11b74f4183df47e49b7da02` | Local read-only commands; `directly_supported` |
| Claude Code | `2.1.220`; `/Users/um-yunsang/.local/bin/claude`; SHA-256 `8addc857f652258513fba7adb2adb23aa38dab99a26341c226f308e912f0e081` | Local read-only commands; `directly_supported` |
| Operating system | macOS 26.5, build 25F71 | Local read-only command; `directly_supported` |

These observations establish installed binaries, not plugin behavior or conformance. `insufficient`

### 15.2 Codex transfer

Official Codex documentation currently supports explicit `$skill-name` invocation and app-server events for per-turn collaboration mode, native `requestUserInput`, native plan items, and explicit skill inputs. This makes the SK@v9-B Plan-first shape plausible at the documented interface. `directly_supported`

The same documentation places `collaborationMode` on the client-supplied `turn/start` request. A skill invoked in an already-started Default turn is not thereby shown to change that turn into Plan mode. SK@v9-B avoids requiring that switch by demanding Plan before invocation. `directly_supported`

Still unestablished for `$thyquery` on the local cell:

- actual plugin installation and exact-name resolution;
- a trustworthy pre-invocation Plan receipt visible to the plugin/evaluator;
- contract digest linkage to the operational native-plan event;
- exactly-once native-plan authorship and no post-plan execution;
- behavior in each claimed Codex surface, not just CLI.

Status: `CONFORMANCE_UNTESTED`; evidence `insufficient`.

### 15.3 Claude Code transfer

Official Claude Code documentation currently supports slash skills and namespaced plugin skills in the form `/plugin-name:skill-name`; `/thyquery:thyquery` conforms to that documented grammar. Plan mode is read-only, and official tool documentation distinguishes `AskUserQuestion`, `EnterPlanMode`, and approval-bearing `ExitPlanMode`. `directly_supported`

Approval of a plan exits Plan mode and begins implementation behavior in the documented lifecycle. Therefore evaluation must stop and assert no execution before or at that boundary; “the plan appeared” is insufficient evidence of product termination. `directly_supported`

`bypassPermissions` is incompatible with claiming an enforced Plan-only/no-execution boundary for the tested cell unless the host supplies separate conclusive controls. Such a cell is excluded or returns `HOST_CONTRADICTION`. `contradicts_premise`

Still unestablished for `/thyquery:thyquery` on the local cell:

- actual plugin installation and exact-name resolution;
- a machine-checkable pre-invocation Plan receipt available to the plugin/evaluator;
- contract digest linkage to a genuine native-plan artifact;
- exactly-once plan generation without approval/implementation continuation;
- hook, permission-mode, and surface combinations claimed by the product.

Status: `CONFORMANCE_UNTESTED`; evidence `insufficient`.

### 15.4 Transfer rule

Host-neutral metrics may share definitions; adapters and conformance assertions may not share assumed event semantics. Maintain a separate event mapper and G0 fixture result for every host/version/surface/permission cell. Cross-host parity is a conclusion only after independent passes, never an architectural assumption.

## 16. Primary evaluation artifact ledger (14 artifacts)

Access date for every URL in this section: 2026-08-03.

| ID | Primary artifact | What it supports | Transfer classification |
|---|---|---|---|
| E01 | Suri et al., “Structured Uncertainty guided Clarification for LLM Agents,” Findings of ACL 2026, [ACL Anthology](https://aclanthology.org/2026.findings-acl.2028/), [DOI](https://doi.org/10.18653/v1/2026.findings-acl.2028) | ClarifyBench, structured specification/model uncertainty, and information-value-aware clarification; reported gains concern its benchmark and policy | `near_match_only` |
| E02 | Li et al., “QuestBench: Can LLMs ask the right question…,” NeurIPS 2025 Datasets and Benchmarks, [arXiv](https://arxiv.org/abs/2503.22674) | Underspecified reasoning tasks including partially observed planning and question-choice evaluation | `near_match_only` |
| E03 | Zhang et al., “CLAMBER: A Benchmark of Identifying and Clarifying Ambiguous Information Needs,” ACL 2024, [ACL Anthology](https://aclanthology.org/2024.acl-long.578/), [DOI](https://doi.org/10.18653/v1/2024.acl-long.578) | Ambiguity taxonomy and identify/clarify errors over a 12K benchmark | `near_match_only` |
| E04 | Wang et al., “Learning to Ask: When LLM Agents Meet Unclear Instruction,” EMNLP 2025, [ACL Anthology](https://aclanthology.org/2025.emnlp-main.1104/), [DOI](https://doi.org/10.18653/v1/2025.emnlp-main.1104) | NoisyToolBench instruction-error categories and clarification efficiency/accuracy evaluation | `near_match_only` |
| E05 | Mu et al., “ClarifyGPT: Empowering LLM-based Code Generation with Intention Clarification,” PACMSE/FSE 2024, [DOI](https://doi.org/10.1145/3660810) | Downstream code-generation comparison after clarification and human ambiguity/question review | `near_match_only` |
| E06 | Zhang and Choi, “Clarify When Necessary: Resolving Ambiguity Through Interaction with LMs,” Findings of NAACL 2025, [ACL Anthology](https://aclanthology.org/2025.findings-naacl.306/), [DOI](https://doi.org/10.18653/v1/2025.findings-naacl.306) | Interaction policy and user speed/carefulness tradeoffs; clarification can help or harm depending on conditions | `contradicts_premise` |
| E07 | Zheng et al., “NATURAL PLAN: Benchmarking LLMs on Natural Language Planning,” 2024, [arXiv](https://arxiv.org/abs/2406.04520) | Full-information trip, meeting, and calendar planning with exact-match evaluation | `near_match_only` |
| E08 | Xie et al., “TravelPlanner: A Benchmark for Real-World Planning with Language Agents,” ICML 2024 Spotlight, [ICML](https://icml.cc/virtual/2024/poster/33227), [arXiv](https://arxiv.org/abs/2402.01622) | Multi-constraint planning over 1,225 intents/reference plans and a large travel record corpus | `near_match_only` |
| E09 | Yao et al., “τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains,” ICLR 2025, [arXiv](https://arxiv.org/abs/2406.12045), [OpenReview](https://openreview.net/pdf?id=roNSXZpUDN) | Final database-state grading, simulated user interaction, repeated-trial pass^k reliability | `near_match_only` |
| E10 | Zhou et al., “Instruction-Following Evaluation for Large Language Models,” 2023, [arXiv](https://arxiv.org/abs/2311.07911) | Roughly 500 prompts and objectively verifiable instruction constraints with strict/loose metrics | `near_match_only` |
| E11 | Hart and Staveland, “Development of NASA-TLX,” and current official instrument page, [NASA](https://www.nasa.gov/human-systems-integration-division/nasa-task-load-index-tlx/) | Six-subscale subjective workload instrument | `near_match_only` |
| E12 | Zou, Kanoulas, and Liu, “An Empirical Study on Clarifying Question-Based Systems,” CIKM 2020, [DOI](https://doi.org/10.1145/3340531.3412094), [author PDF](https://irlab.science.uva.nl/wp-content/papercite-data/pdf/zou-2020-empirical.pdf) | Human conversational-search question load, fatigue, relevance, answer correctness/uncertainty, and response time | `near_match_only` |
| E13 | Zheng et al., “Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena,” NeurIPS 2023, [NeurIPS](https://papers.nips.cc/paper_files/paper/2023/hash/91f18a1287b398d378ef22505bf41832-Abstract-Datasets_and_Benchmarks.html) | Human/model-judge agreement plus documented position, verbosity, self-enhancement, and reasoning biases | `directly_supported` |
| E14 | Krippendorff, “Reliability in Content Analysis,” Human Communication Research 2004, [DOI](https://doi.org/10.1111/j.1468-2958.2004.tb00738.x) | Chance-corrected inter-rater reliability across raters, levels, and missing observations | `directly_supported` |

No artifact above directly validates ThyQuery's proposed graph, state, liveness, privacy, no-harm, or routing metrics. `insufficient`

## 17. Official evaluation and host documentation ledger

All pages were accessed 2026-08-03. These official pages are additional to the 14 primary evaluation artifacts.

### 17.1 Evaluation guidance

- OpenAI, [Agent evals](https://developers.openai.com/api/docs/guides/agent-evals): traces can include model, tool, guardrail, and handoff events; trace grading and datasets support repeatable evaluation. `directly_supported`
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices): task-specific datasets, logging, human calibration, edge/adversarial cases, randomized blinded evaluation, and judge-bias controls. `directly_supported`
- Anthropic, [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), published 2026-01-09: separates task, trial, trajectory, outcome, and grader; recommends multiple trials, grader calibration, transcript inspection, and cost/latency measurement. `directly_supported`

### 17.2 OpenAI/Codex host documentation

- [Build skills](https://learn.chatgpt.com/docs/build-skills): explicit `$skill-name` invocation in Codex surfaces. `directly_supported`
- [Build plugins](https://learn.chatgpt.com/docs/build-plugins): plugins can package skills and MCP integrations. `directly_supported`
- [App server](https://learn.chatgpt.com/docs/app-server): client-supplied `turn/start.collaborationMode`, explicit skill inputs, `requestUserInput`, and native plan items. `directly_supported`
- [Codex changelog](https://learn.chatgpt.com/docs/changelog): current published Codex changes; not by itself proof of the local binary's behavior. `near_match_only`

### 17.3 Anthropic/Claude Code host documentation

- [Extend Claude with skills](https://code.claude.com/docs/en/slash-commands): `/skill-name` and namespaced plugin-skill invocation grammar. `directly_supported`
- [Create plugins](https://code.claude.com/docs/en/plugins): plugin namespace syntax such as `/plugin-name:skill-name`. `directly_supported`
- [Permission modes](https://code.claude.com/docs/en/permission-modes): Plan mode is read-only; approval exits the planning boundary, and bypass modes alter safety assumptions. `directly_supported`
- [Tools reference](https://code.claude.com/docs/en/tools-reference): `AskUserQuestion`, `EnterPlanMode`, and `ExitPlanMode` are distinct host tools/events. `directly_supported`
- [Hooks reference](https://code.claude.com/docs/en/hooks): hook lifecycle and permission-response controls; hooks do not establish the untested ThyQuery receipt chain. `near_match_only`
- [Claude Code changelog](https://code.claude.com/docs/en/changelog): version 2.1.220 was the current matching published row observed; runtime conformance remains untested. `directly_supported`

## 18. Preregistration checklist

Before any confirmatory run, freeze and fingerprint:

1. claimed hosts, versions, surfaces, permission modes, and exclusions;
2. task sampling frame, dossier schema, pilot/confirmatory split, and contamination policy;
3. A–D prompts/policies, exact B/C difference, tools, sources, and budgets;
4. state schema, route labels, guards, semantic-state signature, terminal oracle, and fixtures;
5. primary/secondary endpoints, critical-field weights, no-harm/privacy/burden margins, minimum practical effect, and pass^k `k`;
6. sample-size, randomization, repeat, missing-data, exclusion, multiplicity, and inference procedures;
7. grader codebook, blinding/normalization, adjudication, reliability reporting, and model-judge calibration;
8. event adapters, receipts, data retention/redaction, and independent conformance assertions;
9. exact claim language allowed by every pass/failure pattern;
10. analysis code and output schema before confirmatory unblinding.

## 19. Unknowns and stop condition

### 19.1 Unresolved unknowns

- Exact pilot-derived minimum effects, sample sizes, burden/no-harm margins, pass^k `k`, and reliability decision rules.
- Whether the exact two plugin invocations resolve and run in the pinned local host cells.
- Whether each host exposes a trustworthy pre-invocation Plan receipt, contract linkage, native-plan event, and no-execution proof at the required surface.
- Whether native planner output can be unambiguously delimited from plugin prose on every surface.
- Model snapshot, seed, token accounting, billing, and network telemetry where the host does not expose them.
- Human participant population, recruitment, compensation, ethics/privacy review, and domain-expert availability.
- Task-bank representativeness, contamination, dossier ambiguity, scorer calibration, and semantic-state equivalence validity.
- Whether C's proposed graph metrics predict user-relevant recovery or plan gains after pilot validation.
- Whether observed results transfer beyond the exact tested host/version/surface/model/tool/budget cells.

### 19.2 Stop condition reached

This architecture makes the graph increment separately evaluable through matched C − B trials and makes host conformance separately evaluable through G0 event fixtures. It does not claim either has passed. No further research breadth is required to define those two decisions; remaining work belongs to later approved design, pilot, and implementation phases.

## 20. Artifact receipt

- Primary evaluation artifacts: **14**.
- Official evaluation/host documentation pages: **13**.
- External source records total: **27**.
- Local project evidence artifacts consulted: **5**, plus read-only runtime/version/hash observations.
- Descendant agents spawned: **0**; no-descendant attestation: **true**.
- Files written or mutated in this lane: only `G7_evaluation_transfer.md`.
- Artifact line count: `607`.
- Canonical normalized SHA-256: `bac05f05c9eccc082989978484ab994d16038b576dcee24bebd7b4b87d2b08d4`.
- Hash convention: compute SHA-256 over the exact UTF-8 file after replacing the 64 hexadecimal characters on the preceding SHA row with 64 ASCII zeroes. This removes only the self-reference; the line-count row is included.
