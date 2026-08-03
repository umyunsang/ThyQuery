# G1 — Microsoft primary-source graph audit

## Audit envelope

| Field | Finding | Tag |
|---|---|---|
| Research date | Live primary sources were checked on 2026-08-03 (Asia/Seoul). | `directly_supported` |
| Approved basis | The audited skeleton is `SK@v9-B`, SHA-256 `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`. | `directly_supported` |
| Lane scope | This audit covers Microsoft Research papers, first-party Microsoft framework documentation, and Microsoft-owned repositories only; it makes no Anthropic, Stanford, or independent-literature finding. | `directly_supported` |
| Product boundary used | ThyQuery is a pre-planning, Plan-only, two-host-native layer that must end after exactly one native plan and before execution; the current scope excludes a daemon, remote service, model proxy, wrapper CLI, nested host session, separate planner, framework installation, and knowledge-graph/RAG MVP. | `directly_supported` |
| Source bound | Twelve primary artifacts were examined; the authorized bound is exhausted. | `directly_supported` |

## Executive determination

| Claim ID | Affected skeleton field | Finding | Capability or efficacy | Tag | Primary support | Exact ThyQuery consequence |
|---|---|---|---|---|---|---|
| MS-00 | Provisional premise: Microsoft published relevant graph-engineering gains | No located Microsoft artifact isolates a **central invocation state plus conditional workflow edges** against a linear or Ralph-style controller on intent resolution or pre-planning under a matched model and inference budget. Magentic-One says the best control flow remains future work; Microsoft Agent Framework documents graph and functional APIs as producing the same observable result surface, not a quality advantage. | Efficacy | `contradicts_premise` | S3, S8 | Do not cite Microsoft as having established the requested controller's performance. The design must retain `NO_GRAPH_BENEFIT_SHOWN` as an admissible outcome and test graph incremental value locally. |
| MS-01 | “Thinking in graphs performs better” | Microsoft has measured strong gains in three adjacent categories—knowledge-graph beam search (ToG), knowledge-graph RAG (GraphRAG), and code/tool interaction over graph data (Actions Speak Louder than Prompts)—but none is a ThyQuery control graph. | Efficacy | `near_match_only` | S2, S4, S5 | These results may motivate topology-specific experiments; they cannot justify graph-primary ThyQuery control. |
| MS-02 | Central state improves reliability | Magentic-One's Task Ledger and Progress Ledger support planning, progress tracking, loop detection, replanning, and next-agent selection; replacing the full orchestrator with a selector that removes the ledgers and several other functions reportedly lowers GAIA-validation performance by 31%. | Efficacy | `near_match_only` | S3 | The ablation bundles ledgers, planning, progress tracking, loop detection, and explicit instructions, so it does not isolate central state. Transfer only the ledger partition and stall questions as hypotheses. |
| MS-03 | Conditional edges improve next-action selection | AutoGen GraphFlow and Microsoft Agent Framework both provide conditional routing, but no located Microsoft controlled evaluation compares those edges with unconstrained model routing or a loop policy. | Capability | `insufficient` | S6, S8, S11 | Conditional guards are supported as an implementation pattern, not as a proven quality gain. Require a graph-vs-loop route-decision evaluation before adoption. |
| MS-04 | Current framework capability | Microsoft Agent Framework currently exposes directed workflow graphs, typed message validation, conditional/switch/fan-out/fan-in edges, shared state, supersteps, checkpoint/replay surfaces, and in-process execution. | Capability | `directly_supported` | S8–S12 | Treat its semantics as a reference vocabulary only; research did not authorize package adoption or installation. |
| MS-05 | Current framework maintenance | AutoGen is now in maintenance mode and directs new users to Microsoft Agent Framework; GraphFlow remains explicitly experimental. | Capability | `directly_supported` | S6, S7 | AutoGen GraphFlow is not a viable default dependency for a new ThyQuery design even before thinness is considered. |
| MS-06 | “Graph structure always improves performance” | The Microsoft evidence contains nulls and reversals: GraphRAG's claim-count analysis found no significant graph-vs-source-text-summarization difference, Graph-as-Code was only closely competitive on short-text homophilic datasets, and Magentic-One reports overhead and more error opportunities on simpler tasks. | Efficacy | `contradicts_premise` | S3, S4, S5 | Pre-register a no-harm gate and allow a loop-only controller to win by task stratum. |

## Graph-category and attribution ledger

| Candidate | Microsoft attribution | Graph category | Exact classification | Tag | Transfer boundary |
|---|---|---|---|---|---|
| Think-on-Graph (ToG) | The Microsoft Research publication page lists the paper; the paper has one Microsoft Research Asia author among a multi-institution team spanning IDEA Research, Xiamen University, USC, HKUST, and HKUST (Guangzhou). It is not a Microsoft-only result. | Knowledge graph plus graph-structured beam search | Measured reasoning efficacy over Freebase/Wikidata KBQA and related tasks. | `near_match_only` | MVP knowledge graphs are expressly excluded; ToG's external KG and repeated model calls do not transfer to thin host-native control. |
| Magentic-One | Authored by Microsoft Research AI Frontiers. | Centralized multi-agent control with nested outer/inner loops and structured ledgers; the paper does not define a directed workflow graph with typed conditional edges. | Measured agent-system efficacy and a bundled orchestrator ablation. | `near_match_only` | Its ledger schema and stall questions are useful references; its separate orchestrator, five-agent team, browser/file/code execution, and many model calls violate the runtime boundary. |
| GraphRAG | Authors are from Microsoft Research, Microsoft Strategic Missions and Technologies, and Microsoft Office of the CTO. | Persistent knowledge graph and RAG index with community hierarchy and map-reduce query processing. | Measured retrieval/summarization efficacy. | `near_match_only` | It is excluded by the no-KG/RAG MVP boundary and has substantial indexing/query infrastructure. |
| Actions Speak Louder than Prompts | Three authors are Microsoft Research; the first author notes work performed while at Microsoft Research. | Graph-data inference; program/tool interaction over an input graph, not a controller represented as a graph. | Measured node-classification and synthetic graph-algorithm efficacy. | `near_match_only` | Graph-as-Code generates and executes programs in an iterative tool loop, which crosses ThyQuery's no-execution boundary. |
| AutoGen GraphFlow | First-party Microsoft AutoGen documentation and repository. | Workflow/control graph over multiple agents. | Current experimental capability documentation only. | `directly_supported` | Semantics may inform tests; the multi-agent runtime, model clients, Python dependency, and `run_stream` execution cannot be assumed thin or host-native. |
| Microsoft Agent Framework Workflows | First-party Microsoft Learn documentation and Microsoft repository. | Workflow/control and program graph. | Current framework capability and lifecycle evidence only. | `directly_supported` | Reference-only in this phase; direct adoption would add a package/runtime and a second workflow executor unless a later approved design proves otherwise. |

## Experimental receipts

### E1 — Think-on-Graph

| Field | Receipt | Tag |
|---|---|---|
| Date and institution | Submitted 2023-07-15, revised 2024-03-24, accepted ICLR 2024; only Yeyun Gong is affiliated with Microsoft Research Asia in the multi-institution author list. | `directly_supported` |
| Task and population | Five KBQA datasets, one open-domain QA dataset, two slot-filling datasets, and one fact-checking dataset; GrailQA and Simple Questions use random 1,000-example test subsets. | `directly_supported` |
| Model | GPT-3.5-turbo (“ChatGPT”), GPT-4, and unquantized Llama-2-70B-Chat on 8×A100-40GB; exploration temperature 0.4, reasoning temperature 0, maximum generation 256 tokens. | `directly_supported` |
| Method and graph | The LLM iteratively explores and prunes top-`N` paths on Freebase or Wikidata with beam width 3 and maximum depth 3; the LLM also judges whether evidence is sufficient. | `directly_supported` |
| Baselines | Same-backbone CoT on CWQ/WebQSP, IO prompting, self-consistency, prior prompting SOTA, and prior fine-tuned SOTA; CoT/self-consistency use six exemplars while ToG reasoning prompts use five shots. | `directly_supported` |
| Budget | ToG requires at most `2ND + D + 1 = 22` LLM calls at `N=D=3`, about 21× LLM-only time; observed averages range from 7.6 to 14.3 calls by dataset. ToG-R requires at most `ND + D + 1`. | `directly_supported` |
| Metric and effect | Exact match/Hits@1. Versus same-backbone CoT on CWQ/WebQSP, best ToG variant gains are Llama-2 +18.5/+11.5 points, ChatGPT +20.1/+14.0, and GPT-4 +23.5/+15.3. GPT-4 ToG reports SOTA on 6/9 datasets. | `directly_supported` |
| Uncertainty | The main tables do not report confidence intervals or significance tests; only exemplar-sensitivity experiments are explicitly repeated three times. | `insufficient` |
| Ablations | Replacing LLM pruning with BM25/SentenceBERT saves calls but drops CWQ by 8.4 points and WebQSP by 15.1 on average; naive top-1 beam search scores 30.1/46.1 versus ToG/ToG-R 58.8–59.2/75.1–76.2; gains diminish beyond depth 3. | `directly_supported` |
| Limitations | Freebase performs better where benchmarks were built from Freebase; about 20% of correct answers in three analyzed datasets rely only on parametric LLM knowledge; long explored paths cause under-3% format errors; graph errors can cause wrong answers. | `directly_supported` |
| Reproducibility | The paper links public code at `https://github.com/IDEA-FinAI/ToG` and publishes algorithms/prompts, but this audit located no independent reproduction in the bounded source set. | `insufficient` |
| ThyQuery transfer | The effect is inseparable from external KG access, multi-path search, and 7.6–14.3 average calls; it does not establish workflow-graph control or intent-resolution benefit. | `near_match_only` |

### E2 — Magentic-One

| Field | Receipt | Tag |
|---|---|---|
| Date and institution | Submitted 2024-11-07; experiments ran August–October 2024; Microsoft Research AI Frontiers. | `directly_supported` |
| Task and population | GAIA test (300), AssistantBench test (181), and all 812 WebArena tasks; WebArena had no official hidden split, so the authors used 422 validation and 390 test tasks and evaluated test once. | `directly_supported` |
| Model and runtime | All LLM agents use `gpt-4o-2024-05-13`; a variant uses `o1-preview` for the Orchestrator outer loop and Coder; implementation uses AutoGen 0.4. | `directly_supported` |
| Control structure and state | A centralized Orchestrator owns a Task Ledger (facts, guesses, plan) and Progress Ledger (completion, loop, progress, next agent, instruction), with a stall counter and nested replanning loops. The model itself assesses completion. | `directly_supported` |
| Baselines | Benchmark leaderboard systems with differing architectures/models plus a GPT-4 baseline; no matched-compute single-agent or alternate control-graph baseline is reported. | `insufficient` |
| Main metric and effect | Exact task completion: GPT-4o variant 32.33%±5.3 GAIA, 11.0%±4.6 AssistantBench EM, 25.3%±6.3 AssistantBench accuracy, and 32.8%±3.2 WebArena. GPT-4o+o1 reaches 38.00%±5.5, 13.3%±4.9, and 27.7%±6.5; WebArena was omitted because o1 refused 26% of GitLab and 12% of Shopping Administration tasks. | `directly_supported` |
| Uncertainty | Main results use Wald 95% intervals and an unpaired, conservative proportion z-test at α=.05 because per-task baseline outcomes were unavailable. The claim is statistical comparability to SOTA, not superiority. | `directly_supported` |
| Orchestrator ablation | On GAIA validation, a simple GroupChat selector removes ledgers, planning, progress tracking, loop detection, and explicit instructions; the paper reports a 31% performance drop. Because multiple functions are removed together and the prose does not disambiguate percentage points from relative percent, central-state effect size is not isolated. | `insufficient` |
| Budget and limitations | Most tasks require dozens of iterations/calls, several US dollars, and tens of minutes; formal evaluation omits cost and latency. WebArena falls from 35.1% validation to 30.5% test, suggesting mild overfit; fixed agents can distract; final-outcome-only metrics omit trajectory quality. | `directly_supported` |
| Reproducibility | The paper links open-source Magentic-One and AutoGenBench, including isolation/repetition controls; this audit did not independently execute them because prototype execution was outside authority. | `directly_supported` |
| Control-flow conclusion | The paper explicitly calls multi-vs-single-agent benefit and the best control-flow choice future research. | `contradicts_premise` |
| ThyQuery transfer | The conceptual split between task facts/plan and progress/next action is testable, but the autonomous five-agent executor, nested host-independent controller, tool actions, and model-selected completion are prohibited. | `near_match_only` |

### E3 — GraphRAG

| Field | Receipt | Tag |
|---|---|---|
| Date and institution | Submitted 2024-04-24, revised 2025-02-19; all listed affiliations are Microsoft organizations. | `directly_supported` |
| Task and population | Global sensemaking over a ~1M-token podcast corpus and ~1.7M-token news corpus; 125 LLM-generated questions per corpus, with five head-to-head judgments per comparison. | `directly_supported` |
| Model and graph | GPT-4-turbo constructs an entity/relationship knowledge graph, hierarchical Leiden communities, community summaries, and map-reduce answers; answer contexts are 8k tokens. | `directly_supported` |
| Baselines and budget | Four graph community levels (C0–C3), graph-free source-text map-reduce summarization (TS), and vector RAG (SS) use the same answer-generation context size and near-identical prompts, but index/query work is not compute-matched. Podcast indexing took 281 minutes on a 16GB Xeon VM with a public GPT-4-turbo endpoint. | `directly_supported` |
| Main metric and effect | Against vector RAG, global approaches win 72–83%/72–80% on comprehensiveness and 75–82%/62–71% on diversity for podcast/news; p<.001 for comprehensiveness and p<.001 or p<.01 for diversity. Vector RAG wins directness, and empowerment is mixed. | `directly_supported` |
| Graph-specific effect | Against graph-free TS, selected GraphRAG levels win comprehensiveness 57% (podcast, p<.001) and 64% (news, p<.001), and diversity 57% (p=.036) and 60% (p<.001). A second claim-count/cluster analysis finds no significant difference between any global graph condition and TS. | `contradicts_premise` |
| Query tokens | C0 uses 26,657 versus 1,014,611 TS tokens on podcasts and 39,770 versus 1,707,694 on news; the paper reports >97% fewer tokens than TS, but this excludes the persistent indexing build. | `directly_supported` |
| Limitations and uncertainty | Only two corpora, LLM-generated questions, LLM judging, no gold answers, fabrication not evaluated, and unknown domain generalization; LLM-majority judgments align with claim-based labels only 78% for comprehensiveness and 69–70% for diversity on non-tie cases. | `directly_supported` |
| Reproducibility | The paper links the open-source Microsoft GraphRAG repository and publishes prompts/statistical analysis; this audit located no independent reproduction within the bounded source set. | `insufficient` |
| ThyQuery transfer | This is durable knowledge-graph indexing and RAG, expressly excluded from the MVP; its graph-specific null result also cautions against attributing all global-summarization gains to the graph. | `near_match_only` |

### E4 — Actions Speak Louder than Prompts

| Field | Receipt | Tag |
|---|---|---|
| Date and institution | Submitted 2025-09-23, revised 2026-03-01; three Microsoft Research authors and one Oxford author whose work was performed at Microsoft Research. | `directly_supported` |
| Task and population | Zero-shot node classification on 14 citation, web-link, e-commerce, and social graph datasets; dependency ablations sample 1,000 test nodes per seed over five runs; a synthetic shortest-path task uses 100 Erdős–Rényi graphs and 100 source-target pairs per graph. | `directly_supported` |
| Models | Primary model `o4-mini`; additional Llama, DeepSeek R1, GPT-5, and reasoning/non-reasoning Phi-4 and Qwen variants. Experiments ran on 8 Intel Xeon Platinum 8370C CPUs. | `directly_supported` |
| Interaction modes | Static 0/1/2-hop prompting, budget prompting, ReAct-style GraphTool/GraphTool+, and Graph-as-Code, where the LLM writes and executes programs over a typed graph table until it decides to terminate. | `directly_supported` |
| Baselines and metric | Accuracy against prompting modes, random, majority label, label propagation, and—secondarily—reported supervised GNN/hybrid results; the synthetic path task uses MSE. | `directly_supported` |
| Effect size | On six long-text datasets, Graph-as-Code exceeds 2-hop budget prompting by 0.2–7.2 accuracy points; many unconstrained 1/2-hop prompts hit token limits. On short-text homophilic data it is “closely competitive,” not uniformly best. In synthetic path finding it achieves 0 MSE by generating executable BFS, versus 2.82 for a fixed 2-hop prompt. | `directly_supported` |
| Budget and latency | On reddit/photo/wiki-cs, Graph-as-Code averages 14.9k/41.5k/57.1k tokens and 43/128/155 seconds; full 2-hop prompts use 42.1k/104.7k/1.157M tokens and fail on wiki-cs's 200k context limit. The modes do not have equal calls or equal exposed information. | `directly_supported` |
| Uncertainty | Tables report means with ± values, but the inspected paper text does not define the interval type or provide main-result significance tests; several “significant” prose claims therefore lack an identified test in the bounded artifact. | `insufficient` |
| Ablations and counterevidence | Random adjacency permutations sharply reduce all structure-aware methods; deletion heatmaps show Graph-as-Code can shift reliance among features, labels, and structure. Iterative summary prompting peaks at two hops and then declines, showing graph-depth expansion can hurt. | `directly_supported` |
| Reproducibility | Prompt templates, splits, datasets, compute, token, and latency details are published, but no first-party code repository URL was located in S5. | `insufficient` |
| ThyQuery transfer | This is reasoning **over graph data**, and its strongest algorithmic result delegates computation to executed code. It neither tests central workflow state nor respects ThyQuery's no-execution/no-separate-runtime boundary. | `near_match_only` |

## Current Microsoft framework semantics

| Surface | Current capability | Efficacy status | Lifecycle/status | Important failure surface | Tag |
|---|---|---|---|---|---|
| AutoGen GraphFlow | Directed agent execution graph with sequential, parallel, conditional, and looping edges; cycles require safe exits. | Examples and API documentation only; no controlled graph-vs-loop benchmark was found. | GraphFlow is experimental; AutoGen is in maintenance mode and community-managed. | The execution graph controls agent order, not message receipt; all messages are broadcast by default unless a separate message filter is configured. The advanced loop routes on the substring `APPROVE` and only adds a ten-message cap. | `directly_supported` |
| Microsoft Agent Framework WorkflowBuilder | Directed graph of executors/edges with reachability, type compatibility, duplicate-edge, and binding validation; modified Pregel/BSP supersteps run ready executors concurrently behind a barrier. | No controlled quality evaluation located; Microsoft says graph and functional APIs produce the same observable event/stream/HITL/checkpoint result surface. | Python 1.13.0 and .NET 1.16.0 releases are dated 2026-07-30; MIT license. | A slow branch blocks other branches at the superstep barrier. “Deterministic execution” in the docs supports scheduling order, not deterministic LLM outputs. | `directly_supported` |
| Microsoft Agent Framework state | Private/default or named shared scopes; writer sees its update immediately, other executors next superstep; workflow instances are immutable after build. | Capability only. | Current state page updated 2026-07-10. | Reusing workflow or mutable executor instances across requests can leak state, corrupt data, and race; fresh instances per task are recommended. | `directly_supported` |
| Microsoft Agent Framework edges | Direct, Boolean conditional, ordered switch/default, multi-selection fan-out, and fan-in patterns; predicates may inspect structured messages. | Capability only. | Current edge page updated 2026-05-27. | Model-produced classifications still require parsing and deterministic fail-closed validation; a default edge prevents dead ends but does not prove semantic correctness. | `directly_supported` |
| Microsoft Agent Framework replay | Python 1.13.0 makes workflow checkpoints replayable from initial input and HITL responses and fixes subworkflow-state preservation/duplicate calls after approval. | Reliability feature, not efficacy evidence. | Current release dated 2026-07-30; the same release adds process-wide first-party User-Agent feature-usage telemetry. | Replay, telemetry/redaction, stable identities, and exactly-once handoff would need explicit host-specific evaluation. | `directly_supported` |

## ThyQuery transfer and runtime boundary

| Pattern or dependency | Transfer decision for synthesis | Rationale | Tag |
|---|---|---|---|
| Typed workflow schema and build-time reachability/type checks | `REFERENCE_ONLY` | This directly matches the candidate graph contract and can be implemented as framework-neutral deterministic validation without adopting a runtime. | `directly_supported` |
| Invocation-scoped central view | `REFERENCE_ONLY` | Magentic-One supports separating task facts/plan from progress/next action, while Agent Framework warns that reused shared state leaks across runs. Prefer a fresh invocation plus validated, append-only deltas and derived canonical view. | `near_match_only` |
| Conditional next-action edges | `EVALUATE_BEFORE_USE` | Current Microsoft sources prove the API shape, not superior routing. Conditions must consume typed outputs and deterministic guards must override model proposals for authority, Plan validity, cancellation, resource exhaustion, corruption, and handoff. | `insufficient` |
| Model-selected success edge | `REJECT` | ToG, Magentic-One, and Graph-as-Code let the model decide sufficiency/completion; Magentic-One's own error analysis finds insufficient verification and premature completion. | `contradicts_premise` |
| AutoGen GraphFlow dependency | `OUT_OF_SCOPE` | It is experimental, maintained only for fixes, adds Python/model-client/multi-agent execution, and does not provide efficacy evidence. | `directly_supported` |
| Microsoft Agent Framework dependency | `REFERENCE_ONLY` | In-process execution avoids a mandatory daemon, but installing/running its Python/.NET/Go workflow and model-agent stack would still add a separate workflow runtime; direct adoption is neither necessary nor authorized. | `near_match_only` |
| Magentic-One controller | `OUT_OF_SCOPE` | Separate Orchestrator, five-agent team, nested loops, browser/files/code/shell actions, dozens of calls, high latency/cost, and model-owned completion violate the thin pre-plan/no-execution boundary. | `directly_supported` |
| ToG | `OUT_OF_SCOPE` | Requires Freebase/Wikidata and multi-call beam search; knowledge graphs are outside MVP. | `directly_supported` |
| GraphRAG | `OUT_OF_SCOPE` | Requires persistent graph indexing, community summaries, and RAG query processing; both product and runtime boundaries exclude it. | `directly_supported` |
| Graph-as-Code | `OUT_OF_SCOPE` | Generates and executes code over graph data; the effect cannot be transferred to a Plan-only plugin that stops before execution. | `directly_supported` |

## Design/evaluation deltas supported by this lane

| Delta ID | Proposed synthesis delta | Tag | Evidence limit |
|---|---|---|---|
| D1 | Preserve Candidate B or C and a loop-only baseline; do not promote Candidate A solely on Microsoft evidence. | `near_match_only` | No Microsoft paper isolates control-graph topology at matched compute. |
| D2 | Partition invocation state into task/intention facts and progress/routing diagnostics, but make completion a deterministic conjunction of guards rather than an LLM ledger answer. | `near_match_only` | Magentic-One's ledger ablation is bundled and its completion judge remains a model. |
| D3 | Test graph and functional/loop implementations against identical observable outputs, then compare route correctness, no-harm, repeat reliability, latency, token cost, and user burden. | `directly_supported` | Microsoft Agent Framework explicitly treats graph and functional APIs as alternate expressions of the same result surface. |
| D4 | Add negative fixtures for message-broadcast leakage, stale shared state, concurrent writes, default-edge misroutes, unreachable terminals, slow-branch barriers, substring-based approval, cycle caps, and replayed duplicate handoffs. | `directly_supported` | Each failure is exposed or motivated by current first-party semantics/releases. |
| D5 | Do not count cap termination as success; on repeated digest/zero semantic progress route to `STALLED`, and on limit exhaustion route to `RESOURCE_EXHAUSTED`. | `near_match_only` | Magentic-One and GraphFlow use caps/replanning, but neither validates ThyQuery's typed terminal policy. |
| D6 | Pre-register matched-budget arms: Ralph loop; fixed deterministic graph; graph shadow/evaluator; and, only if justified, model-proposed routing behind the same guards. | `insufficient` | The needed comparison does not exist in the Microsoft evidence and must be generated by ThyQuery-specific evaluation. |

## Contradictions and unresolved unknowns

| ID | Finding | Tag |
|---|---|---|
| U1 | The institutional claim is too broad for ToG: Microsoft hosts the publication and has one MSRA coauthor, but the work is multi-institutional. | `contradicts_premise` |
| U2 | No source shows a causal, matched-compute gain from central state alone; Magentic-One removes several orchestrator functions together. | `insufficient` |
| U3 | No source shows a causal, matched-compute gain from conditional edges alone or from a graph controller over a disciplined loop. | `insufficient` |
| U4 | No located paper evaluates ambiguous-intent clarification, tacit-requirement discovery, native-plan fidelity, or exactly-once plan handoff. | `insufficient` |
| U5 | No current first-party evidence proves either Microsoft framework can be embedded identically in both Codex and Claude host-native plugin surfaces without package/runtime or native-planner boundary violations. | `insufficient` |
| U6 | MAF's official “same observable results” statement concerns result surfaces, not equal accuracy, latency, cost, or failure rates; those dimensions remain unmeasured. | `insufficient` |
| U7 | Main ToG uncertainty, Magentic-One matched-compute single-agent performance, GraphRAG fabrication/generalization, and Actions main-result interval definitions remain unresolved within this source bound. | `insufficient` |
| U8 | Current evidence directly rejects a universal graph-performance claim: benefits depend on graph category, task, information exposure, tool execution, and compute. | `contradicts_premise` |

## Primary-source manifest

| ID | Primary artifact | Date/version | Exact locator and DOI | Tag |
|---|---|---|---|---|
| S1 | Microsoft Research publication page, “Think-on-Graph” | ICLR 2024; page labels July 2023 | https://www.microsoft.com/en-us/research/publication/think-on-graph-deep-and-responsible-reasoning-of-large-language-model-on-knowledge-graph/ | `directly_supported` |
| S2 | Original ToG paper | arXiv v6, 2024-03-24; submitted 2023-07-15 | https://arxiv.org/html/2307.07697 ; https://doi.org/10.48550/arXiv.2307.07697 | `directly_supported` |
| S3 | Original Magentic-One paper | arXiv v1, 2024-11-07 | https://arxiv.org/html/2411.04468 ; https://doi.org/10.48550/arXiv.2411.04468 | `directly_supported` |
| S4 | Original GraphRAG paper | arXiv v2, 2025-02-19; submitted 2024-04-24 | https://arxiv.org/html/2404.16130 ; https://doi.org/10.48550/arXiv.2404.16130 | `directly_supported` |
| S5 | Original “Actions Speak Louder than Prompts” paper | arXiv v2, 2026-03-01; submitted 2025-09-23 | https://arxiv.org/html/2509.18487 ; https://doi.org/10.48550/arXiv.2509.18487 | `directly_supported` |
| S6 | AutoGen stable GraphFlow documentation | Current stable page; undated; accessed 2026-08-03 | https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/graph-flow.html | `directly_supported` |
| S7 | Microsoft AutoGen repository | Current repository state; accessed 2026-08-03 | https://github.com/microsoft/autogen | `directly_supported` |
| S8 | Microsoft Agent Framework Workflows overview | Updated 2026-04-29 | https://learn.microsoft.com/en-us/agent-framework/workflows/ | `directly_supported` |
| S9 | Microsoft Agent Framework Workflow Builder & Execution | Updated 2026-07-10 | https://learn.microsoft.com/en-us/agent-framework/workflows/workflows | `directly_supported` |
| S10 | Microsoft Agent Framework workflow state | Updated 2026-07-10 | https://learn.microsoft.com/en-us/agent-framework/workflows/state | `directly_supported` |
| S11 | Microsoft Agent Framework workflow edges | Updated 2026-05-27 | https://learn.microsoft.com/en-us/agent-framework/workflows/edges | `directly_supported` |
| S12 | Microsoft Agent Framework official repository surfaces | Python 1.13.0 and .NET 1.16.0 released 2026-07-30; current MIT LICENSE | https://github.com/microsoft/agent-framework/releases ; https://github.com/microsoft/agent-framework/blob/main/LICENSE | `directly_supported` |

## Completion audit

| Field | Value | Tag |
|---|---|---|
| Access date for every source | 2026-08-03 | `directly_supported` |
| Primary artifact count | 12/12; bound exhausted | `directly_supported` |
| Exact matched performance artifact | None located | `contradicts_premise` |
| Main contradictions | Microsoft evidence does not establish central-state-plus-conditional-edge superiority; ToG/GraphRAG/Graph-as-Code are different graph categories; ToG is not Microsoft-only; graph benefit is task- and budget-dependent. | `contradicts_premise` |
| Main unknowns | Isolated state effect, isolated edge effect, matched graph-vs-loop intent-planning effect, two-host thin embeddability, and independent replications remain unknown. | `insufficient` |
| Descendant attestation | No descendants or subagents were spawned by G1. | `directly_supported` |
| Line-count rule | Count is the POSIX newline count of this file after finalization. | `directly_supported` |
| SHA rule | The SHA below covers every byte preceding the final SHA line; a self-containing full-file hash is mathematically circular, so the full-file SHA is supplied in the parent handoff. | `directly_supported` |
| Final line count | 183 | `directly_supported` |

SHA-256 of all preceding bytes: 94519a41fb04dd6f2ec14537145b1eb63604ab495b1942b4b1f844a6bc29a338
