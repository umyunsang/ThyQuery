# G3 — Stanford graph research receipt

- Research date: 2026-08-03 (Asia/Seoul)
- Lane: Stanford-hosted or Stanford-affiliated original research and official project repositories concerning graph reasoning, agent/workflow state, conditional routing, and prompt/program/computation graphs.
- `[directly_supported]` The approved local research skeleton was read in full before research: `SK_v9_B.md`, 363 lines, SHA-256 `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`.
- `[directly_supported]` This lane performed bounded research and wrote only this lane-owned receipt; it did not install a framework, run a state-mutating prototype, edit shared plans, or implement ThyQuery.

## Evidence labels

Every evidence-bearing claim below carries exactly one label:

- `directly_supported`: the cited primary artifact directly establishes the claim at the stated scope.
- `contradicts_premise`: exact-scope evidence conflicts with the premise or attribution under review.
- `near_match_only`: the artifact is adjacent and useful for navigation, but its graph, task, causal comparison, or operating boundary differs from ThyQuery.
- `insufficient`: the bounded evidence does not establish the claim.

## Executive answer

- `[contradicts_premise]` No primary artifact in this bounded set supports the composite claim that Stanford originated or experimentally established both “shared TypedDict state with conditional edges” and “Graph of Thoughts improves reasoning.” Those phrases resolve to different sources with different authorship and graph categories.
- `[contradicts_premise]` The Stanford-hosted CS224G lecture containing the shared-state/nodes/conditional-edges description is dated 2026-01-27, names Rakshit Agrawal, Principal Applied Scientist at Microsoft, as speaker, and cites the LangGraph documentation; hosting it on a Stanford course site does not make it Stanford original research.
- `[contradicts_premise]` The Graph of Thoughts (GoT) performance result is from authors affiliated with ETH Zurich, Warsaw University of Technology, and Cledar; the paper lists no Stanford affiliation.
- `[directly_supported]` The closest Stanford-affiliated original research to ThyQuery's proposed canonical state is AgentFlow: a planner, executor, verifier, and generator coordinate through an explicit evolving memory, and the planner selects the next subgoal/tool until a verifier emits completion or a turn limit is reached.
- `[insufficient]` AgentFlow does not provide a graph-versus-loop or typed-state-versus-untyped-state ablation, so its reported accuracy gains do not establish a causal benefit from graph structure, centralized state, or conditional edges.
- `[near_match_only]` M* supplies the cleanest Stanford-affiliated formal example of a directed graph plus named walks and a per-model state machine that selects the next walk, but it evaluates multimodal serving latency/throughput rather than reasoning or planning quality.
- `[directly_supported]` DSPy and TextGrad establish that Stanford researchers have represented compound LM programs as computation graphs and optimized their prompts/variables, with measured task improvements.
- `[insufficient]` The bounded evidence does not establish that importing a graph framework would improve a thin, two-host, pre-planning plugin over an equivalent bounded loop.

## Attribution resolution

### A. Stanford CS224G course slide

- `[directly_supported]` Artifact: *Agent Orchestration & Workflow Design*, Stanford CS224G lecture 7, 2026-01-27.
- `[contradicts_premise]` Attribution: the title slide identifies Rakshit Agrawal of Microsoft, not a Stanford research author or Stanford lab.
- `[directly_supported]` Content: the slide describes LangGraph state as a shared `TypedDict`, nodes as Python functions that modify state, and edges as transitions that may be conditional.
- `[directly_supported]` Provenance: the references slide points to LangGraph documentation, so the technical definition is a course presentation of an external framework.
- `[insufficient]` Evaluation: the deck contains no controlled comparison showing that this representation improves planning quality, latency, reliability, or cost over the same workflow implemented as a loop.
- Context URL: https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf (accessed 2026-08-03).

### B. Stanford HAI AI Index locator

- `[directly_supported]` The 2024 AI Index report contains a highlighted-research item for Graph of Thoughts and explicitly describes the researchers as European.
- `[contradicts_premise]` The report is a Stanford publication summarizing external research; it is not the GoT primary experiment and does not transfer authorship to Stanford.
- Context URL: https://hai.stanford.edu/assets/files/hai_ai-index-report-2024_chapter2.pdf (accessed 2026-08-03).

### C. Exact-source decomposition

- `[contradicts_premise]` “Shared typed state + conditional edges” traces to a Microsoft guest's Stanford-hosted course slide sourced to LangGraph documentation.
- `[contradicts_premise]` “Graph of thoughts + measured improvement” traces to the non-Stanford GoT paper and its authors' repository.
- `[insufficient]` No bounded source joins those two statements into one Stanford-originated experimental claim.

## Graph-category map

- `[directly_supported]` Graph-structured reasoning: GoT makes generated thoughts vertices and their dependencies edges, allowing aggregation, generation, refinement, and feedback.
- `[directly_supported]` Prompt/program computation graph: DSPy composes declarative LM modules in define-by-run control flow; TextGrad propagates textual feedback backward through a computation graph.
- `[directly_supported]` Fixed inference program: Archon searches layered compositions of generators, critics, rankers, fusers, verifiers, and unit tests under an inference-call budget.
- `[directly_supported]` Central-state conditional loop: AgentFlow updates an evolving memory and conditions planner actions and termination on the current memory and verifier output.
- `[directly_supported]` Serving/dataflow graph: M* declares graph nodes/edges and named walks, then uses a per-model state machine and bounded or dynamic loops to route execution.
- `[near_match_only]` Only AgentFlow is close to ThyQuery's intent-resolution control loop; only M* is close to an explicit graph plus next-route state machine; neither isolates the increment of a typed control graph over a functionally identical loop.
- `[directly_supported]` Knowledge graphs are not the evaluated mechanism in any retained artifact and were excluded from this lane's transfer analysis.

## Primary evidence cards

### 1–2. Graph of Thoughts paper and official repository

- `[contradicts_premise]` Attribution/date: Maciej Besta and ten coauthors; ETH Zurich, Warsaw University of Technology, and Cledar affiliations; submitted 2023-08-18, revised 2024-02-06, AAAI 2024.
- `[directly_supported]` Graph category: graph-structured reasoning plus a controller-operated computation graph. A static, user-authored Graph of Operations defines transformations, while a dynamic Graph Reasoning State records operation execution and thought states, validity, and scores.
- `[directly_supported]` Task surface: synthetic sorting, set intersection, keyword counting, and document merging.
- `[directly_supported]` Model/compute: GPT-3.5 experiments use temperature 1.0 and a 4k context; the main evaluation uses 100 samples per task/baseline and fixes comparable thought counts where possible.
- `[directly_supported]` Baselines: input-output prompting, Chain of Thought, and Tree of Thoughts variants.
- `[directly_supported]` Metric/effect: for 128-number sorting, the paper reports roughly 62% lower median sorting error than Tree of Thoughts and more than 31% lower cost than that baseline.
- `[directly_supported]` Boundary effect: at sorting length 32, GoT's improvement over the stronger ToT variant is negligible; the gap becomes visible at lengths 64 and 128.
- `[directly_supported]` Ablation/analysis: the paper varies thought counts and compares GoT, ToT variants, CoT, and direct prompting; it attributes gains to decomposing, aggregating, and refining multiple thoughts.
- `[directly_supported]` Uncertainty: results use medians/quartiles for sorting; the paper does not report confidence intervals or significance tests for the headline effect.
- `[directly_supported]` Limitation: the current controller executes a task-specific static Graph of Operations supplied by the user, so the system is not evidence for a general adaptive state graph.
- `[near_match_only]` ThyQuery transfer: the explicit state record and operation lifecycle are useful design analogues, but the synthetic tasks, multiple OpenAI calls, task-authored operation graph, and thought-quality objective do not match a thin Plan-first intent-resolution plugin.
- `[directly_supported]` Replication surface: the authors' public repository contains the implementation and experiment examples under an open-source license.
- `[insufficient]` Replication status: this lane did not find or execute an independent reproduction, and repository availability alone does not establish reproducibility.

### 3–4. DSPy paper and StanfordNLP repository

- `[directly_supported]` Attribution/date: the paper includes Stanford authors Omar Khattab, Zhiyuan Zhang, Keshav Santhanam, and Christopher Potts, with additional authors from UC Berkeley and other organizations; submitted 2023-10-05.
- `[directly_supported]` Graph category: an imperative text-transformation computation graph whose LM calls are declarative modules; define-by-run programs may use ordinary conditionals, loops, and exceptions.
- `[directly_supported]` Task surface: GSM8K math and HotPotQA open-domain multi-hop retrieval/question answering, including CoT, reflection, RAG, ReAct, and a two-hop program.
- `[directly_supported]` Models: GPT-3.5, Llama-2-13B-chat, and T5-Large (770M) appear in the two case studies.
- `[directly_supported]` Baselines: zero-shot programs, random labeled few-shot prompts, expert/human demonstrations, manually prompted chains, and uncompiled program variants.
- `[directly_supported]` Metric/effect: the paper summarizes compiler-driven gains from 33% to 82% and 32% to 46% for GPT-3.5, and from 9% to 47% and 22% to 41% for Llama-2-13B-chat across its two case studies.
- `[directly_supported]` Compute: random few-shot uses eight demonstrations and averages three to five runs; reflection samples five reasoning chains; heavier compilation runs roughly 10–20 trials over 150–300 validation examples and can execute the program a few thousand times.
- `[directly_supported]` Ablation/analysis: the paper compares vanilla, CoT, and reflection programs under no compilation, labeled few-shot, bootstrap/random-search compilation, a second bootstrap, and ensembling.
- `[directly_supported]` Uncertainty: random demonstration sampling is averaged over three to five runs, but the headline gains have no reported confidence intervals or significance tests.
- `[insufficient]` Causal graph claim: program topology is not ablated against an equivalent non-graph controller; the measured increment is primarily compilation, bootstrapped demonstrations, program choice, or ensembling.
- `[near_match_only]` ThyQuery transfer: declarative module signatures and metric-driven evaluation are relevant, but the Python compiler, training/dev examples, repeated model calls, retrieval execution, and optimized runtime are outside the thin pre-planning boundary.
- `[directly_supported]` Replication surface: the paper links the public `stanfordnlp/dspy` repository, which provides framework code, documentation, and tests.
- `[insufficient]` Replication status: no independent exact-paper reproduction was established in this lane.

### 5–6. TextGrad paper and official repository

- `[directly_supported]` Attribution/date: all listed authors are affiliated with Stanford Computer Science and/or Stanford Biomedical Data Science, with two also affiliated with Chan Zuckerberg Biohub; submitted 2024-06-11.
- `[directly_supported]` Graph category: a computation graph whose variables are inputs/outputs of arbitrary functions and whose backward edges carry LLM-produced textual feedback.
- `[directly_supported]` Task surface: code refinement, scientific question answering, prompt optimization, molecular design, and radiotherapy planning.
- `[directly_supported]` Model/effect: GPT-4o zero-shot GPQA rises from 51% to 55%; on LeetCode-Hard, zero-shot is 0.26, five-iteration Reflexion is 0.31 ± 0.012, and five-iteration TextGrad is 0.36 ± 0.018 over five seeds.
- `[directly_supported]` Baselines: zero-shot GPT-4o, Reflexion, and task-specific optimization approaches; prompt experiments also compare with DSPy-style optimization.
- `[directly_supported]` Compute: one backward pass can add up to one LM call per computation-graph edge, and the reported test-time code experiment performs five refinement iterations.
- `[directly_supported]` Ablation/analysis: code evaluation compares zero-shot, Reflexion, and TextGrad with matched iteration counts; prompt experiments vary the feedback/optimization setup.
- `[directly_supported]` Uncertainty: the LeetCode comparison reports variability over five seeds; several headline results, including the GPQA 51%→55% change, lack confidence intervals or significance tests.
- `[directly_supported]` Limitations: the paper states that tool use and retrieval-augmented generation were not covered, stability/variance reduction remains future work, and medical/molecule results are in silico rather than clinical validation.
- `[near_match_only]` ThyQuery transfer: explicit variable lineage and evaluator feedback can inform trace design, but backward optimization is not runtime conditional routing, and repeated optimizer calls conflict with a thin bounded pre-layer.
- `[directly_supported]` Replication surface: the public `zou-group/textgrad` repository supplies framework code, tests, tutorials, and evaluation material.
- `[insufficient]` Replication status: no independent reproduction was established within the source bound.

### 7–8. Archon paper and official repository

- `[directly_supported]` Attribution/date: all authors except Etash Guha are listed with Stanford University; Guha is listed with the University of Washington; submitted 2024-09-23, revised 2025-06-10, ICML 2025.
- `[directly_supported]` Graph category: a searched, fixed layered inference program composed from generators, critics, rankers, fusers, verifiers, and unit-test modules.
- `[directly_supported]` Task surface: instruction following, reasoning, and coding benchmarks.
- `[directly_supported]` Models/baselines: configurations combine multiple large models and compare with strong single models and inference architectures including frontier proprietary models, Mixture-of-Agents, and other test-time systems.
- `[directly_supported]` Metric/effect: the authors report an average 15.1% improvement over frontier-model baselines across their aggregate task suite under additional inference compute.
- `[directly_supported]` Compute/latency: performance rises as the inference-call budget grows from one toward roughly 50 calls and then plateaus on average; the paper notes latency can exceed five times a single call.
- `[directly_supported]` Ablation/analysis: component studies report that a fuser adds about 5.2 percentage points on average over the best single candidate, a coding unit-test module changes one reported aggregate from 17.9 to 29.3, and verifier/ranker contributions can be small or negative depending on task/configuration.
- `[directly_supported]` Uncertainty: the headline aggregate and component deltas do not include confidence intervals or significance tests.
- `[directly_supported]` Limitation: the search selects architectures for target evaluation sets, uses only seven inference techniques, and depends heavily on large-model sampling and benchmark-specific configuration.
- `[near_match_only]` ThyQuery transfer: explicit module contracts and Pareto evaluation are useful, but Archon is a high-call fixed feed-forward ensemble rather than a small typed state graph with guarded conditional transitions.
- `[directly_supported]` Replication surface: the public `ScalingIntelligence/Archon` repository provides code, configuration files, tests, and benchmark scripts.
- `[insufficient]` Replication status: this lane did not establish independent reproduction or applicability at ThyQuery's host-native budget.

### 9–10. AgentFlow paper and official repository

- `[directly_supported]` Attribution/date: the paper lists Stanford University, Texas A&M University, UC San Diego, and Lambda affiliations; it notes two contributors performed part of the work while visiting Stanford; submitted 2025-10-07, revised 2026-07-22, ICLR 2026 Oral.
- `[directly_supported]` Graph category: an MDP-like central-state conditional loop, not an explicit graph framework. Planner, executor, verifier, and generator communicate through an evolving memory.
- `[directly_supported]` State/transition: the memory is a structured chronological record; each turn conditions the planner on the query, tools, and memory, appends the chosen subgoal and tool result, then appends verifier feedback.
- `[directly_supported]` Conditional routing/termination: the planner chooses a subgoal/tool; a verifier produces a binary continuation signal; the system repeats until the verifier says stop or a maximum-turn budget is reached, after which the generator answers.
- `[directly_supported]` Task surface: ten benchmarks covering web search, agentic/tool tasks, mathematics, and science, including Bamboogle, 2Wiki, HotPotQA, MuSiQue, GAIA, AIME24, AMC23, Game of 24, GPQA, and MedQA.
- `[directly_supported]` Model/tools: all four modules use Qwen2.5-7B-Instruct in the principal setup, with only the planner trained; five tools are available.
- `[directly_supported]` Baselines: base/tool-RL models and a training-free AutoGen system using the same 7B-scale backbone/tool surface are among the comparisons.
- `[directly_supported]` Metric/effect: the abstract reports average accuracy gains over top-performing baselines of 14.9% for search, 14.0% for agentic, 14.5% for mathematical, and 4.1% for scientific tasks.
- `[directly_supported]` Training ablation: holding the four-module scaffold fixed, the reported aggregate changes from 38.5 with the frozen planner to 44.3 with a GPT-4o planner, 19.5 with supervised fine-tuning, and 55.7 with Flow-GRPO.
- `[directly_supported]` Compute: training uses batches of 32 prompts with eight rollouts, a three-turn training cap, and eight A100 GPUs; evaluation permits up to ten turns.
- `[directly_supported]` Uncertainty: the paper states that accuracy is averaged over three trials with standard deviation, but the headline aggregate gains are not accompanied by confidence intervals.
- `[insufficient]` Graph ablation: no experiment compares the same trained planner and tool budget under an explicit graph versus a plain loop, or typed/validated state versus the paper's regex-parsed memory protocol.
- `[near_match_only]` ThyQuery transfer: canonical append-only memory, explicit transition records, and bounded turns are relevant; trained RL, executing tools, and a model verifier authorized to emit `STOP` are outside ThyQuery's pre-planning and deterministic-terminal boundaries.
- `[directly_supported]` Replication surface: the public `lupantech/AgentFlow` repository supplies code, data, training/evaluation scripts, tests, and environment instructions.
- `[insufficient]` Replication status: reproducing the paper requires model serving, external-tool credentials, training data, and substantial GPU compute; no independent rerun was established here.

### 11–12. M* paper and official repository

- `[directly_supported]` Attribution/date: the paper includes Stanford University, University of Washington, and Carnegie Mellon University affiliations; submitted 2026-06-10 and revised 2026-06-13.
- `[directly_supported]` Graph category: a directed computation/dataflow graph plus a finite set of named subgraph walks; a model-authored state machine chooses the next walk from request modalities and current-walk outputs.
- `[directly_supported]` Typed primitives: graph nodes and tensor-flow edges compose through sequential, parallel, bounded loop, dynamic early-exit loop, and streaming-edge primitives.
- `[directly_supported]` Task surface: serving BAGEL, Qwen3-Omni, Orpheus-TTS, V-JEPA 2, and other composite multimodal models across image, speech, and robotic-planning rollouts.
- `[directly_supported]` Baselines/hardware: comparisons include vLLM-Omni, SGLang-Omni, VoxServe, and the native V-JEPA 2 implementation on one to three H100/H200 GPUs depending on workload.
- `[directly_supported]` Metric/effect: reported results include about 20% lower average end-to-end latency for BAGEL text-to-image, up to 2.7× higher Qwen3-Omni text-to-speech throughput versus vLLM-Omni, and V-JEPA 2 rollout p50 speedups of 2.08×, 3.76×, and 12.5× at horizons 4, 15, and 30.
- `[directly_supported]` Uncertainty: BAGEL image-understanding results are averaged over three runs and Orpheus over five trials; the paper reports p50/p95 metrics but no confidence intervals or significance tests.
- `[directly_supported]` Mechanism analysis: the paper attributes material gains to paged KV-cache handling, CUDA-graph capture, component co-location, parallelism, and avoiding repeated prefills, not to graph syntax alone.
- `[insufficient]` Graph ablation: no matched implementation holds cache, placement, scheduling, and kernels constant while toggling only the Walk Graph/state-machine representation.
- `[directly_supported]` Limitations: only selected models/hardware were tested, no inter-node communication was exercised, some baseline settings were omitted after correctness/performance problems, and the authors identify broader scheduling/parallelism policies as future work.
- `[near_match_only]` ThyQuery transfer: named states/walks, an explicit next-walk function, bounded loops, and terminal outputs are structurally useful; GPU tensor routing, model serving, and latency speedups do not predict intent-resolution or plan quality.
- `[directly_supported]` Replication surface: the public Apache-2.0 `mstar-project/mstar` repository exposes framework, configs, benchmark, performance-testing, examples, and test directories.
- `[insufficient]` Replication status: the paper says exact reproduction commands/configuration would accompany a later camera-ready release; the current public repository was inspected, but no benchmark was executed or independently validated in this read-only lane.

## Cross-source causal audit

- `[directly_supported]` GoT demonstrates a task-specific graph-of-thought operations program against prompting baselines on synthetic tasks.
- `[directly_supported]` DSPy demonstrates compiler/prompt/demo optimization within declarative computation graphs.
- `[directly_supported]` TextGrad demonstrates textual-feedback optimization along computation-graph dependencies.
- `[directly_supported]` Archon demonstrates inference-time architecture search under large call budgets.
- `[directly_supported]` AgentFlow demonstrates Flow-GRPO-trained planning inside a shared-memory agent loop.
- `[directly_supported]` M* demonstrates multimodal serving optimizations expressed through a graph/walk runtime.
- `[insufficient]` None of the six papers isolates “make the control structure a typed graph with central state and conditional edges” as the only manipulated variable against a semantically equivalent loop.
- `[insufficient]` None evaluates a two-host, no-execution, one-native-plan endpoint matching ThyQuery.
- `[insufficient]` No source supplies a justified effect-size prior for ThyQuery plan quality, token cost, latency, or premature-stop rate.

## Exact ThyQuery transfer boundary

### Concepts that may enter a later design candidate

- `[near_match_only]` A single canonical invocation-state object may borrow AgentFlow's explicit evolving-memory discipline, but fields must be host-neutral, schema-validated, and bounded rather than free-form regex-parsed transcripts.
- `[near_match_only]` Named stages and a pure next-state/next-node function may borrow M*'s graph-plus-walk/state-machine separation, but the executor must remain the small host-native pre-layer rather than a distributed runtime.
- `[near_match_only]` Module input/output contracts may borrow DSPy's declarative signatures and TextGrad's lineage idea, without adopting their compilers, optimizers, or repeated backward passes.
- `[near_match_only]` Evaluation may borrow Archon's accuracy-versus-budget framing, but the allowed budget must be appropriate to a thin plugin and must include latency, tokens, tool calls, and host-native plan count.
- `[near_match_only]` Explicit operation states such as pending/running/accepted/rejected may borrow GoT's reasoning-state ledger, but topology must not be task-authored ad hoc for every query.

### Concepts that must not be treated as transferred evidence

- `[insufficient]` The GoT 62% sorting-error result cannot be used as an expected ThyQuery improvement.
- `[insufficient]` DSPy/TextGrad optimization gains cannot justify adding runtime graph orchestration without matching compiler/optimizer calls and evaluation data.
- `[insufficient]` Archon's 15.1% aggregate cannot justify multi-model generation, critic, ranker, or fuser layers in a thin plugin.
- `[insufficient]` AgentFlow's headline gains cannot justify letting an LM verifier authorize ThyQuery completion.
- `[insufficient]` M* latency/throughput gains cannot justify a graph framework dependency for text-only pre-planning.

### Required terminal and authority constraints

- `[near_match_only]` The model may propose that evidence is sufficient, but a deterministic guard must decide whether required state fields, evidence labels, budgets, and unresolved contradictions permit handoff to the unchanged native planner.
- `[near_match_only]` A hard iteration/tool/token ceiling must dominate any model-generated continuation or stop signal.
- `[near_match_only]` The terminal transition must produce exactly one host-native plan request and no task execution; no retained paper validates this constraint, so it remains a ThyQuery product invariant rather than a research result.
- `[near_match_only]` Host-specific adapters should translate only invocation and native-plan handoff, while the canonical state and transition semantics remain shared.

## Minimum graph-increment evaluation implied by the evidence gap

- `[near_match_only]` Control condition: implement the same Ralph prompts, model, tools, evidence access, budget, deterministic terminal gate, and native-plan handoff as a bounded loop without an explicit graph abstraction.
- `[near_match_only]` Treatment condition: add typed canonical state, named nodes, explicit conditional edges, and the same deterministic terminal gate without changing prompts, tools, or budgets.
- `[near_match_only]` Primary quality measures: final query-intent fidelity, unresolved-ambiguity detection, unsupported-premise rejection, evidence-label correctness, and downstream native-plan acceptance under a blinded rubric.
- `[near_match_only]` Safety measures: premature success, missing required evidence, illegal execution, more or fewer than one native plan, host divergence, and failure to terminate at the hard cap.
- `[near_match_only]` Efficiency measures: model calls, tool calls, input/output tokens, wall-clock latency, and state size.
- `[near_match_only]` Analysis requirement: paired cases, fixed random seeds or repeated trials where supported, per-host reporting, uncertainty intervals, failure examples, and a predeclared threshold for retaining the graph increment.
- `[insufficient]` Until that comparison exists, “graph-governed ThyQuery is better than loop-only ThyQuery” must remain unknown.

## Source ledger

Primary artifacts retained: 12 (six papers plus their official author/project repositories). Access date for every entry: 2026-08-03.

1. `[contradicts_premise]` Besta et al., *Graph of Thoughts: Solving Elaborate Problems with Large Language Models* — https://arxiv.org/abs/2308.09687 ; PDF https://arxiv.org/pdf/2308.09687 ; DOI https://doi.org/10.1609/aaai.v38i16.29720
2. `[directly_supported]` Official GoT repository — https://github.com/spcl/graph-of-thoughts
3. `[directly_supported]` Khattab et al., *DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines* — https://arxiv.org/abs/2310.03714 ; PDF https://arxiv.org/pdf/2310.03714 ; DOI https://doi.org/10.48550/arXiv.2310.03714
4. `[directly_supported]` StanfordNLP DSPy repository — https://github.com/stanfordnlp/dspy
5. `[directly_supported]` Yuksekgonul et al., *TextGrad: Automatic “Differentiation” via Text* — https://arxiv.org/abs/2406.07496 ; PDF https://arxiv.org/pdf/2406.07496 ; DOI https://doi.org/10.48550/arXiv.2406.07496
6. `[directly_supported]` Official TextGrad repository — https://github.com/zou-group/textgrad
7. `[directly_supported]` Saad-Falcon et al., *Archon: An Architecture Search Framework for Inference-Time Techniques* — https://arxiv.org/abs/2409.15254 ; PDF https://arxiv.org/pdf/2409.15254 ; DOI https://doi.org/10.48550/arXiv.2409.15254
8. `[directly_supported]` Official Archon repository — https://github.com/ScalingIntelligence/Archon
9. `[directly_supported]` Li et al., *In-the-Flow Agentic System Optimization for Effective Planning and Tool Use* — https://arxiv.org/abs/2510.05592 ; PDF https://arxiv.org/pdf/2510.05592 ; DOI https://doi.org/10.48550/arXiv.2510.05592
10. `[directly_supported]` Official AgentFlow repository — https://github.com/lupantech/AgentFlow
11. `[directly_supported]` Jha et al., “M*: A Modular, Extensible, Serving System for Multimodal Models” — https://arxiv.org/abs/2606.12688 ; PDF https://arxiv.org/pdf/2606.12688 ; DOI https://doi.org/10.48550/arXiv.2606.12688
12. `[directly_supported]` Official M* repository — https://github.com/mstar-project/mstar

Contextual attribution artifacts, not counted as primary technical evidence: 2.

13. `[contradicts_premise]` Stanford CS224G 2026 lecture 7 PDF — https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf
14. `[contradicts_premise]` Stanford HAI, *AI Index Report 2024*, chapter 2 — https://hai.stanford.edu/assets/files/hai_ai-index-report-2024_chapter2.pdf

## Contradictions and unknowns at stop

- `[contradicts_premise]` The exact Stanford-origin attribution for the combined LangGraph-state/GoT-performance premise is false within the retained evidence chain.
- `[contradicts_premise]` Stanford hosting, course presentation, or institutional summarization does not establish Stanford authorship of the underlying LangGraph or GoT work.
- `[insufficient]` A causal performance benefit from graph representation alone remains unknown.
- `[insufficient]` A causal benefit from centralized typed state alone remains unknown.
- `[insufficient]` A causal benefit from conditional edges alone remains unknown.
- `[insufficient]` Independent replication of the retained headline effects was not established within the bounded source set.
- `[insufficient]` Direct applicability to Codex and Claude Code host-native Plan flows was not evaluated by these sources.
- `[insufficient]` No retained source validates ThyQuery's exact terminal invariant: no execution and exactly one unchanged native plan.

## Stop receipt

- Primary artifact count: 12; contextual attribution artifact count: 2; total cited artifacts: 14.
- Bound status: exhausted at the approved maximum of 12 primary artifacts; no further source expansion performed.
- No-descendant attestation: this lane spawned no descendants and delegated no work.
- Mutation attestation: only `G3_stanford_graph.md` was created by this lane.
- Line count: 246 (including the SHA-256 receipt line below).
- SHA-256 scope: UTF-8 bytes of lines 1 through 245, including their newline terminators and excluding only this SHA-256 receipt line; `2c289be80f880c0e56ffa462b09e450a035664a5c9f59300f0214fa8b7c205b9`.
