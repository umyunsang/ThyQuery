# ThyQuery Project Skeleton — Graph-Engineering Revision

## Metadata

- Skeleton ID: `SK`
- Version: `v9-B`
- Stable locator: `.planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v9_B.md`
- Status: `SKELETON_APPROVAL_PENDING(SK@v9-B)`
- Retained base selection: `DS@v1-B`, approved by the exact user message `DS@v1-B 승인`
- Supersedes: unapproved `SK@v8-B` wherever this graph-engineering amendment differs
- Transition: `SKELETON_APPROVAL_PENDING(SK@v8-B) → INTAKE_PENDING → SKELETON_APPROVAL_PENDING(SK@v9-B)`
- Created: 2026-08-03 (Asia/Seoul)
- Research freshness target: verify the live primary-source state current on the research date; retain older foundational work only when it is necessary to interpret current claims

This skeleton authorizes nothing until its exact version is approved. It defines a bounded read-only investigation of graph-engineered control, graph-structured reasoning, related frameworks, and evaluation methods for ThyQuery. It does not select a framework or authorize implementation.

## Raw Amendment

> 추가로 루프엔지니어링만 적용하는게 아니라 그래프 엔지니어링도 적용하자, 마이크로소프트랑 엔트로픽, 스탠포드에서도 그래프엔지니어링을 적용해 그래프로 사고하도록 하는게 성능이 좋다고 발표했어 , state를 중앙에서 관리하고 조건부 edge로 다음 행동결정 및 제안이 가능하데 현재시점 기준으로 최신자료들을 딥리서치하고 관련 프레임워크나 evalution을 찾아봐

## Normalized Intake

| Field | Current contract |
|---|---|
| Outcome | Add an evidence-backed graph-engineered controller and graph-reasoning option to the existing Ralph intent-resolution layer. |
| Target/context | Two thin, host-native, Plan-first plugins: Codex `$thyquery <query>` and Claude Code `/thyquery:thyquery <query>`. |
| Deliverable | After approval: a current primary-source evidence ledger, framework comparison, graph/loop architecture options, evaluation protocol, and a new synthesized design for approval. |
| Included | Central invocation-scoped state, typed nodes, conditional edges, action/proposal routing, graph-aware termination, framework/runtime survey, benchmark and evaluation design, and exact transfer limits for ThyQuery. |
| Excluded | Code, scaffolding, package installation, configuration mutation, framework adoption, prototype execution, deployment, publication, ordinary-prompt hooks, automatic Plan entry, plan execution, a third host, or long-term knowledge-graph/RAG scope. |
| Must | Preserve Path B's Plan-first/native-invocation/no-execution boundary; use current primary evidence; distinguish exact support, contradiction, near match, and insufficiency; use only flat root-owned research agents and clean each completed session immediately. |
| Avoid | Treating institutional affiliation as proof, conflating workflow graphs with reasoning graphs or knowledge graphs, assuming graph structure always improves performance, selecting a framework from popularity, model-selected success edges, or cap-as-success. |
| Done signal | Every material graph claim is tagged and traceable; Microsoft/Anthropic/Stanford claims are identified or honestly unresolved; viable frameworks are compared on the same contract; graph-specific benefit and failure evaluations are specified; 2–3 architecture paths are synthesized for user approval. |
| Open item | `none`; the research may return contradiction or insufficiency rather than forcing a graph-performance conclusion. |

## Retained Path-B Product Boundary

- The user enters stock Plan before invoking ThyQuery.
- Codex uses `$thyquery <query>`; Claude Code uses canonical `/thyquery:thyquery <query>`.
- Outside verified Plan, ThyQuery returns `PLAN_MODE_REQUIRED` and performs no loop, research, graph transition, handoff, or plan generation.
- ThyQuery remains a pre-planning layer. It ends after exactly one operationally native plan is observed and before execution.
- The two plugins remain thin and host-native: no always-on daemon, remote service, model proxy, wrapper CLI, nested host session, separate planner, or automatic prompt interception.
- The existing intent-contract provenance, user-agency guards, typed terminals, operational native-plan provenance, and calibration limitations remain active unless new exact evidence requires an explicit revision.

## Terminology and Scope Separation

Research must not use “graph engineering” as one undifferentiated claim.

1. **Control/workflow state graph:** nodes are ThyQuery operations; edges select the next operation from typed central state. This is the user's required control direction.
2. **Graph-structured reasoning:** candidate thoughts, hypotheses, evidence, critiques, or partial plans form a graph that may branch, merge, revise, or aggregate. Its incremental value over a disciplined loop is a research hypothesis.
3. **Knowledge graph:** entities and semantic relations provide external memory or retrieval. This remains outside the MVP unless evidence shows a necessary thin, invocation-scoped use and a later user revision authorizes it.
4. **Computation/program graph:** prompt modules, model/tool calls, or optimizers are represented as an executable graph. It is relevant only where it maps to the two host-native plugin boundary.

A source can support one category without supporting the others. Results may not be transferred across categories without an explicit scope-match argument.

## Provisional Premises to Verify

| Premise | Required verification |
|---|---|
| Microsoft published relevant graph-engineering gains | Exact primary artifact, contributing organization, publication date, graph type, task, baseline, model, metric, effect size, uncertainty, cost, and limitations. |
| Anthropic published relevant graph-engineering gains | Same exact fields; workflow guidance without controlled performance evidence must be labeled separately. |
| Stanford published relevant graph-engineering gains | Same exact fields; Stanford affiliation, lab authorship, hosted page, and independent work must not be conflated. |
| “Thinking in graphs” performs better | Determine where, against which chain/loop/tree baseline, with what inference budget, and whether the result survives matched-compute and repeated-run evaluation. |
| Central state improves reliability | Test consistency, auditability, replay, and routing benefits against single-writer bottlenecks, stale state, context growth, privacy, and corruption risks. |
| Conditional edges improve next-action selection | Compare guarded routing against unconstrained model choice and Ralph loop policy using action-value, correctness, safety, cost, and user-burden metrics. |
| A current framework can remain a thin plugin dependency | Verify packaging, runtime, license, persistence, observability, host compatibility, and whether a framework is necessary at all. |

Institutional or performance premises may end as `contradicts_premise`, `near_match_only`, or `insufficient`. Research must not manufacture a matching result.

## Candidate Graph Contract — Research Target, Not Accepted Design

Let the invocation graph be `G = (V, E, S, δ, Γ)`:

- `V`: typed operations;
- `E`: allowed directed transitions;
- `S_t`: canonical invocation-scoped state at transition `t`;
- `δ(S_t, event) -> (S_(t+1), next_node)`: validated state transition;
- `Γ`: hard guards, precedence rules, budgets, and terminal invariants.

### Candidate central state

`S_t` should be tested with at least these partitions:

- invocation identity, host/version/surface, verified Plan receipt, and authority boundary;
- original query and relevant-context manifest;
- versioned pre-plan intent contract and field provenance;
- confirmed, rejected, deferred, inferred, and residual interpretations;
- evidence ledger, source scope, contradiction state, and freshness;
- open ambiguity dimensions and materiality/risk classification;
- admissible next actions, value/risk estimates, and selection rationale;
- user burden, privacy exposure, resource budgets, and cancellation state;
- progress, semantic delta, cycle/stall signals, calibration stratum, and closure diagnostics;
- state version, digest, event lineage, reducer/validation receipts, and handoff count.

The research must compare mutable shared state with append-only events plus a derived canonical view. It must address single-writer ownership, validated deltas, stale-write rejection, schema migration, replay, redaction, and host crash/restart limits.

### Candidate node families

- `preflight_plan_and_capabilities`
- `ingest_and_normalize_query`
- `classify_gaps_and_materiality`
- `generate_admissible_actions`
- `score_or_compare_actions`
- `ask_user_native`
- `research_bounded_evidence`
- `probe_counterexample_or_scenario`
- `propose_interpretations_or_tradeoffs`
- `confirm_contract_delta`
- `recompute_graph_and_closure`
- `accept_enumerated_residual`
- `handoff_once_to_native_plan`
- typed non-success terminals

Node names are illustrative. Research must determine the smallest graph that adds measurable value over the existing loop.

### Candidate conditional-edge policy

- Model output proposes structured candidates; it does not directly authorize a success edge.
- Deterministic or independently recomputed guards take precedence for Plan validity, authority, state integrity, cancellation, hard contradictions, non-waivable failures, and exactly-once handoff.
- External factual uncertainty routes to bounded evidence work; user-owned preference, authority, and trade-off uncertainty routes to the native question surface.
- Frame uncertainty routes to open correction before constrained choices.
- A material contract delta routes to explicit confirmation when the existing policy requires it.
- Closure predicates route to handoff only after calibration and integrity guards pass.
- Repeated state digests, zero semantic progress, or an unproductive strongly connected component route to `STALLED`, not success.
- Resource limits route to `RESOURCE_EXHAUSTED`; invalid state lineage routes to `STATE_CORRUPT`.

Exact guard order, edge conflict resolution, concurrency semantics, and cycle policy remain research questions.

## Hybrid Loop/Graph Architecture Candidates

These are alternatives to compare, not decisions:

### Candidate A — Graph-primary controller

The state graph owns every transition; Ralph is the repeatable subgraph that revisits gap analysis, action selection, evidence update, and closure.

- Potential strength: explicit global state, guarded routing, auditability, reachability testing.
- Potential risk: framework weight, over-modeling, brittle state schemas, and a graph that only disguises the same prompt loop.

### Candidate B — Hierarchical graph with bounded Ralph subloops

An outer graph owns lifecycle, safety, state integrity, and terminal transitions; inner Ralph loops perform bounded elicitation/research refinement for one material gap at a time.

- Potential strength: retains loop simplicity while making control and termination explicit.
- Potential risk: two control layers may conflict or duplicate progress/closure logic.

### Candidate C — Ralph-primary loop with graph shadow/evaluator

The existing loop remains the runtime controller; a graph representation tracks hypotheses, dependencies, invalidations, and evaluates/reranks the next action.

- Potential strength: thinnest incremental change and strongest loop-only baseline.
- Potential risk: central state and conditional edges may be advisory rather than authoritative, failing the user's intended control model.

Root synthesis must recommend one of these, a justified hybrid, or `NO_GRAPH_BENEFIT_SHOWN`; it may not assume Candidate A from terminology alone.

## Approved-After-Approval Research Questions

1. What exact, current primary artifacts correspond to the user's Microsoft, Anthropic, and Stanford claims?
2. Which artifacts study workflow/control graphs, graph-structured reasoning, knowledge graphs, or program graphs, and which category transfers to ThyQuery?
3. Under matched model and inference budgets, when do graph methods outperform chain, tree, debate, self-refine, evaluator-optimizer, or Ralph-style loop baselines?
4. Which improvements depend on parallel search, aggregation, tool use, memory, training, external orchestration, or benchmark leakage and therefore do not transfer to a thin Plan plugin?
5. What negative or null results, ablations, scaling failures, cost regressions, and reproducibility limitations qualify graph-performance claims?
6. Which current frameworks provide typed central state, conditional edges, cycles, interrupts/human-in-the-loop, checkpoints, reducers/concurrency, subgraphs, replay, observability, and deterministic test surfaces?
7. Can any framework be embedded without violating the no-daemon/no-wrapper/two-native-plugin boundary, or is a framework-neutral graph specification plus deterministic helpers thinner and safer?
8. How should model-proposed actions be separated from deterministic edge guards and user-authorized decisions?
9. How are stale state, merge conflicts, cycles, dead ends, livelock, unreachable terminals, repeated handoffs, cancellation, and crash/retry handled and evaluated?
10. How should graph-specific benefit be isolated from the already-researched benefit of clarification/Ralph iteration?
11. Which benchmark tasks represent ambiguous and tacit-requirement planning rather than only puzzles, code generation, or static QA?
12. What calibrated, host/domain/risk-versioned termination conditions make a cyclic state graph live, bounded, and honest?

## Research Manifest

All lanes are read-only, directly root-owned, and forbidden from spawning descendants. Agents may write only their uniquely owned artifact under this planning directory, or return their report directly if file writing is unnecessary. They may not edit `task_plan.md`, `findings.md`, `progress.md`, another lane artifact, host configuration, or project source. The root validates and integrates each result, then immediately stops and clears the completed branch/session before retaining another idle result.

### G1 — Microsoft primary-source audit

- **Exclusive ownership:** Microsoft Research, Microsoft technical publications, official product/framework documentation, and first-party repositories relevant to graph control or graph reasoning.
- **Questions:** identify exact graph concepts and claims; extract task, baseline, model, budget, metric, effect size, ablations, limitations, and framework semantics.
- **Allowed sources/bound:** up to 12 primary artifacts; official Microsoft domains/repositories plus original papers authored by the identified team. Secondary pages may locate originals but cannot support a material claim.
- **Output:** `G1_microsoft_graph.md` with claim ledger, exact URLs/DOIs, dates, evidence tags, and ThyQuery transfer boundary.
- **Stop/escalate:** stop when every located exact claim is classified or the bound is exhausted; escalate ambiguous institutional attribution, missing evaluation detail, or a result dependent on a non-thin controller.

### G2 — Anthropic primary-source audit

- **Exclusive ownership:** Anthropic research, engineering, docs, evals, and first-party repositories relevant to agent workflows, graph-like orchestration, state, routing, or structured reasoning.
- **Questions:** distinguish prescriptive workflow patterns from controlled empirical graph claims; extract the same experimental fields as G1.
- **Allowed sources/bound:** up to 10 primary Anthropic artifacts and their original linked papers or repositories.
- **Output:** `G2_anthropic_graph.md` with claim ledger, terminology map, exact evidence, and transfer boundary.
- **Stop/escalate:** stop when the claimed graph-performance result is identified or honestly tagged `insufficient`; escalate if only adjacent workflow guidance exists.

### G3 — Stanford primary-source audit

- **Exclusive ownership:** Stanford-hosted or Stanford-affiliated original research and official lab/project repositories relevant to graph reasoning, agent graphs, stateful workflows, or prompt/program graphs.
- **Questions:** establish exact authorship/affiliation and avoid treating a Stanford-hosted page, course, or citation as a Stanford result; extract controlled results and limits.
- **Allowed sources/bound:** up to 12 primary artifacts, including original papers and official code/evaluation repositories.
- **Output:** `G3_stanford_graph.md` with attribution ledger, experimental receipt, evidence tags, and ThyQuery scope match.
- **Stop/escalate:** stop when exact candidates are classified or the bound is exhausted; escalate misattribution or graph-category mismatch.

### G4 — Independent graph-reasoning evidence and counterevidence

- **Exclusive ownership:** peer-reviewed or original preprint research that directly compares graph-structured reasoning/control with chain, tree, loop, search, self-refinement, or agent-workflow baselines.
- **Questions:** matched-compute performance, topology/search policy, aggregation, task dependence, reproducibility, negative findings, and benchmark validity.
- **Allowed sources/bound:** up to 16 original papers plus official code/evaluation artifacts; prioritize recent work while retaining necessary foundational methods.
- **Output:** `G4_graph_reasoning_evidence.md` with taxonomy, comparison matrix, effect/compute normalization, contradictions, and open uncertainties.
- **Stop/escalate:** stop at saturation across materially distinct method families or the source bound; escalate incomparable budgets, absent baselines, or leakage/reproducibility concerns.

### G5 — Framework and runtime comparison

- **Exclusive ownership:** current official documentation, release notes, source repositories, licenses, and evaluation tooling for viable graph/workflow frameworks.
- **Questions:** typed state, conditional routing, cycles, interrupts, checkpointing, reducers/concurrency, subgraphs, streaming, replay, tracing, testability, local/offline operation, dependencies, and embedding in both host-native plugins.
- **Allowed sources/bound:** screen up to 12 frameworks from official sources; deeply compare at most 6 that pass minimum relevance. Framework names encountered in earlier discussions are discovery seeds, not preselected winners.
- **Output:** `G5_frameworks.md` with capability/maintenance/license/thinness matrix and three outcomes per candidate: `ADOPT_CANDIDATE`, `REFERENCE_ONLY`, or `OUT_OF_SCOPE`.
- **Stop/escalate:** stop when no new viable capability pattern appears or bounds are reached; escalate any required daemon, remote control plane, wrapper session, configuration mutation, or incompatible license/runtime.

### G6 — Graph state, routing, termination, and verification

- **Exclusive ownership:** primary formal methods, workflow/state-machine research, sequential decision work, and official framework semantics needed to make cyclic conditional graphs safe and testable.
- **Questions:** state ownership, append-only event sourcing versus mutation, guard precedence, conditional-edge correctness, reachability, SCC/cycle analysis, deadlock/livelock, bounded liveness, idempotency, replay, and calibrated terminal decisions.
- **Allowed sources/bound:** up to 14 primary papers, standards, or official technical specifications with exact transfer notes.
- **Output:** `G6_graph_safety_stopping.md` containing candidate invariants, transition contract, failure taxonomy, formal/testable liveness conditions, and unresolved assumptions.
- **Stop/escalate:** stop when each named failure has a testable guard or explicit unknown; escalate if a proposed success condition depends solely on model self-judgment.

### G7 — Evaluation architecture and two-host transfer

- **Exclusive ownership:** evaluation methods and current official Codex/Claude host constraints needed to isolate graph benefit while preserving the approved thin-plugin boundary.
- **Questions:** experiment arms, ambiguous-intent datasets, hidden intent dossiers, route-decision labels, state/edge trace metrics, human burden, planner fidelity, no-harm, cost/latency, repeated-run reliability, and host-specific conformance.
- **Allowed sources/bound:** up to 14 primary evaluation artifacts plus current official OpenAI/Anthropic platform documents and bounded local read-only capability inspection.
- **Output:** `G7_evaluation_transfer.md` with pre-registrable evaluation protocol, host-version matrix, framework-neutral fixtures, and claim gates.
- **Stop/escalate:** stop when graph incremental value and host conformance can be evaluated separately; escalate if valid evaluation requires implementation, installing a framework, changing configuration, or executing a consequential workflow.

## Evidence Ledger Contract

Each material claim must record:

- stable claim ID and affected skeleton field;
- concise finding;
- exactly one tag: `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`;
- exact primary locator, publication/update date, and access date;
- institution/authorship and graph-category classification;
- task, population/domain, model/version, baseline, compute/inference budget, metric, effect size/uncertainty, and replication status where applicable;
- limitation and exact ThyQuery transfer boundary;
- proposed design delta or reason to preserve uncertainty.

Current documentation can establish framework capability but not efficacy by itself. A paper can establish an experimental result but not current maintained framework behavior by itself. Multiple near matches never become direct support through repetition.

## Framework Selection Gate

No framework is selected during research. Root synthesis must compare at least these decision dimensions:

- semantic fit to control graph versus reasoning graph;
- typed central state and validated delta/reducer model;
- conditional edges and explicit guard precedence;
- cycles, interrupts, cancellation, budgets, and typed terminals;
- checkpoint, replay, idempotency, state migration, and corruption detection;
- human-in-the-loop/native-question integration;
- subgraphs, parallelism, merge conflict semantics, and deterministic testability;
- tracing/observability without leaking private intent state;
- local operation, dependency/installation footprint, language/runtime fit, license, maintenance, and supply-chain surface;
- Codex and Claude plugin embeddability without daemon, wrapper, proxy, or host mutation;
- ability to implement the same behavioral graph as a framework-neutral specification if the runtime dependency is rejected.

Popularity, vendor identity, or a benchmark win in an unrelated task cannot pass this gate.

## Graph-Aware Evaluation Hypothesis

To isolate incremental graph value, the synthesized design should evaluate four pinned arms where feasible:

- **A — Stock:** raw query → stock Plan.
- **B — Loop-only:** raw query → SK@v8-B-equivalent Ralph loop → accepted contract → identical stock Plan.
- **C — Graph + loop:** raw query → candidate graph-engineered Ralph controller → accepted contract → identical stock Plan.
- **D — Oracle ceiling:** user/domain-author fully specified contract → identical stock Plan.

All arms must pin host/version, model/settings, tools, source policy, task, and comparable inference/resource budgets, or explicitly report the mismatch. B isolates existing loop benefit; C−B estimates graph increment; D separates contract recovery from planner fidelity.

### Proposed graph-specific metrics to validate

- next-edge/action correctness against adjudicated admissible actions;
- routing regret or net action value under the approved cost/risk model;
- critical-state completeness and unsupported-state invention;
- state invariant violation, stale update, invalid transition, and provenance error rates;
- transition/node coverage and unreachable/dead-end detection;
- oscillation, repeated-state, unproductive-SCC, stall, and runaway-cycle rates;
- replay/idempotency consistency and exactly-once handoff;
- ambiguity/contradiction closure and contract-to-plan fidelity;
- blinded user/domain-author intent acceptance and material-correction rate;
- question precision, cognitive burden, abandonment, privacy exposure, latency, tokens, sources, and cost;
- clear-query no-harm and repeated-trial `pass^k` reliability.

The research must locate validated instruments or benchmarks where possible and mark bespoke ThyQuery measures as proposed rather than established.

## Graph-Aware Terminal Invariants

- Terminal nodes are absorbing for one invocation.
- The model cannot directly emit `EPISTEMIC_CLOSED`; a validated guard recomputes it from canonical state.
- Only `EPISTEMIC_CLOSED` or explicitly valid `ACCEPTED_RESIDUAL` may reach the one-time native-plan handoff edge.
- `PLAN_MODE_REQUIRED`, cancellation, non-waivable authority/safety failure, state corruption, and host-capability contradiction take precedence over benefit optimization.
- A resource cap, repeated state, no material delta, dead end, or unproductive cycle is never success.
- Handoff count greater than one, execution after handoff, or a substitute plan surface is a hard invariant failure.
- Graph closure does not claim complete recovery of tacit knowledge; it remains task-relative, decision-sufficient, calibrated, and explicit about residuals.

Exact liveness proofs, cycle bounds, calibrated thresholds, and guard ordering are research outputs, not fixed in this skeleton.

## Root Synthesis Contract

After approved research, the root must:

1. validate primary locators and dates;
2. resolve institutional attribution and graph-category confusion;
3. normalize performance claims by task, baseline, model, and resource budget;
4. preserve negative/null evidence and unresolved gaps;
5. separate documented framework capability from measured efficacy;
6. determine whether a framework dependency, a framework-neutral graph specification, or no runtime graph is the thinnest supported choice;
7. compare 2–3 architecture approaches with explicit trade-offs and a recommendation;
8. define state schema, node/edge policy, guard precedence, terminal invariants, and two-host adapter boundary only to the level supported by evidence;
9. define a pre-registrable loop-only versus graph+loop evaluation and claim gate;
10. create `DS@v2` with a fingerprint and field-level diff for separate approval.

Research completion does not approve `DS@v2`, implementation planning, or implementation.

## Field-Level Diff from SK@v8-B

| Field | SK@v8-B | SK@v9-B |
|---|---|---|
| Ralph control | Iterative action policy | Retained, but its controller relationship to a typed graph is researched explicitly. |
| Runtime state | Invocation-scoped intent/evidence state | Candidate canonical central state with version, digest, event lineage, validated deltas, action candidates, graph diagnostics, and handoff count. |
| Next action | Ranked within each loop iteration | Candidate conditional edge selected from typed state under hard guard precedence. |
| Reasoning topology | Loop plus bounded lookahead | Control graph required for study; graph-structured reasoning evaluated separately from workflow graph. |
| Success decision | Composite closure predicate | Same epistemic criteria plus graph-state integrity, legal transition, liveness/cycle, and absorbing-terminal invariants. |
| Failure modes | Stall, cap, state corruption, cancellation, host contradiction | Adds invalid edge, stale write, reducer conflict, dead end, unreachable terminal, oscillation, livelock, unproductive SCC, replay divergence, and duplicate handoff. |
| Framework | No runtime framework selected | Current frameworks researched; adoption remains optional and gated by thinness/host portability. |
| Evaluation | Stock vs ThyQuery vs oracle | Adds a loop-only baseline and graph+loop arm to isolate graph increment and graph-specific trace/state metrics. |
| Institutional evidence | Not in scope | Microsoft, Anthropic, and Stanford claims audited individually against current primary evidence. |
| Knowledge graph/RAG | Excluded | Still excluded; it must not be conflated with control or reasoning graphs. |
| Agent topology | Flat root-owned lanes; immediate cleanup | Preserved explicitly for G1–G7, with no recursive delegation. |

## Approval and Authority Ledger

| Artifact | Scope | Status |
|---|---|---|
| `DS@v1-B` | Select Path B: two thin host-native, Plan-first plugins | APPROVED AND RETAINED |
| `SK@v8-B` / `eb3578…2d43` | Pre-graph Path-B skeleton | SUPERSEDED BEFORE APPROVAL |
| `SK@v9-B` plus SHA-256 fingerprint | Graph-engineering research skeleton | PENDING EXACT APPROVAL |
| G1–G7 research | Bounded read-only primary-source research and root synthesis | NOT AUTHORIZED UNTIL `SK@v9-B 승인` |
| `DS@v2` | Post-research synthesized graph/loop design | NOT YET CREATED; SEPARATE APPROVAL REQUIRED |
| Implementation plan | Detailed file/component/test plan | NOT AUTHORIZED |
| Implementation | Code, scaffolding, packaging, installation, configuration and tests | NOT AUTHORIZED |

## Approval Scope and Next Action

Exact approval phrase: `SK@v9-B 승인`

That approval would authorize only:

- the seven bounded, flat, read-only G1–G7 lanes above;
- root validation, evidence-ledger synthesis, and creation of a separately fingerprinted `DS@v2` for review;
- immediate cleanup of each completed research branch/session.

It would not authorize:

- implementation planning, code, scaffolding, package/framework installation, configuration mutation, prototype runs that change project or host state, deployment, publication, plan execution, or external messaging;
- claiming that Microsoft, Anthropic, Stanford, any framework, or graph reasoning improves ThyQuery before exact-scope evidence and evaluation support it;
- recursive subagents or retained completed sessions.

Current external/deep-research dispatch count for this amendment: `0`.
