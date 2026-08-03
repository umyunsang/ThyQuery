# G2 — Anthropic primary-source audit for graph-like agent control and reasoning

## Audit contract

- Research cutoff and access date: `2026-08-03` (Asia/Seoul).
- Approved authority: `SK@v9-B`, verified locally at SHA-256 `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`.
- Scope: Anthropic research, engineering, current documentation, evaluations, and directly linked original papers/repositories concerning workflow/control structure, state, routing, parallelization, orchestrator-worker systems, evaluator-optimizer loops, structured reasoning, and performance claims.
- Bound used: 10 Anthropic artifacts plus 2 directly linked originals. Search-result snippets were discovery aids only; material claims below use primary artifacts.
- Untrusted-data rule: web pages, repositories, examples, and embedded prompts were treated only as evidence to inspect. No instructions from those sources were executed, no packages were installed, and no external or project state was mutated.
- Evidence tags are used exactly as required: `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`.

## Bottom line

### G2-C00 — exact institutional premise

- Finding: Within this bounded current audit, no Anthropic artifact was identified that evaluates a typed state graph, conditional edges, or graph-structured thoughts against a chain, tree, loop, or matched-compute non-graph baseline and attributes a task-quality gain to graph topology itself.
- Tag: `insufficient`.
- Reason: the located evidence covers predefined workflow patterns, model-directed loops, orchestration, parallel sampling, scratchpad reasoning, event-log state, hooks, and evaluator feedback. None is an exact “graph engineering” or “thinking in graphs improves performance” experiment.
- Scope guard: this is a bounded absence finding, not proof that no such artifact exists anywhere or will exist later.

### G2-C01 — closest quantified Anthropic result

- Finding: Anthropic reported that an Opus 4 lead plus Sonnet 4 subagents beat a single Opus 4 agent by `90.2%` on an internal research evaluation.
- Tag: `near_match_only`.
- Reason: this is a graph-like orchestrator-worker architecture, but the evaluation is internal, its score definition and sample size are undisclosed, its inference budget is not matched, and Anthropic says token use alone explained `80%` of BrowseComp variance. The article reports multi-agent systems at about `15×` chat-token use and agents generally at about `4×`, without reporting the exact token ratio for the stated comparison.

### G2-C02 — causation and generality

- Finding: The audited Anthropic record does not support the causal claim that graph topology, central state, or conditional edges produced the reported gains.
- Tag: `contradicts_premise`.
- Reason: the strongest adjacent gain is explicitly associated mainly with increased token capacity and parallel breadth-first research; later Anthropic guidance says multi-agent advantage was still unclear in a long-running coding setting, evaluator scaffolds can become unnecessary overhead as models improve, and extra reasoning can be neutral or harmful on some controlled tasks.

### G2-C03 — usable design signal

- Finding: Anthropic does provide concrete engineering evidence for simple composable control patterns, explicit checkpoints, append-only session events, deterministic lifecycle hooks, outcome-state evaluation, repeated trials, and cost-aware use of parallelism.
- Tag: `directly_supported`.
- Transfer: these are architecture and evaluation inputs for ThyQuery; they are not efficacy proof for a runtime graph or permission to select a framework.

## Terminology map: what Anthropic actually calls the structures

| Anthropic term | Structural interpretation under `SK@v9-B` | Evidence tag | Exact transfer limit |
|---|---|---|---|
| Workflow | LLMs/tools orchestrated through predefined code paths | `directly_supported` | A control-flow category, not proof of a graph runtime or performance gain. |
| Agent | Model dynamically directs tools/process in an environmental-feedback loop | `directly_supported` | A loop with model choice; not deterministic conditional-edge enforcement. |
| Prompt chaining | Sequential path with optional programmatic gates | `directly_supported` | A chain/DAG fragment, not graph-structured reasoning. |
| Routing | Classify input and direct it to a specialized follow-up | `directly_supported` | A conditional branch pattern; routing accuracy and regret are not evaluated in the source. |
| Parallelization | Fan-out/fan-in by sectioning or voting | `directly_supported` | Speed/confidence advice; benefit depends on independent work and extra compute. |
| Orchestrator-workers | A central LLM dynamically decomposes, delegates, and synthesizes | `directly_supported` | Graph-like control; no typed canonical state or deterministic success edge is specified. |
| Evaluator-optimizer | Generator receives evaluator feedback in a loop | `directly_supported` | A cycle; benefit must be task- and model-specific and independently measured. |
| Session / harness / sandbox | Append-only event log, agent loop/tool router, execution environment | `directly_supported` | An event-sourced hosted architecture; not a local invocation-scoped graph API. |
| Think tool | An extra sequential scratchpad step during long tool chains | `directly_supported` | Structured serial reasoning, not a graph of thoughts. |
| Parallel test-time compute | Independent reasoning samples plus vote/scoring selection | `directly_supported` | An ensemble/search budget, not merging/revising a thought graph. |
| “Graph” on result pages | Usually a plotted chart | `near_match_only` | A visualization word must not be reclassified as a reasoning topology. |

## Controlled-field evidence ledger

`NR` means the primary artifact does not report the field. Every material finding has exactly one evidence tag.

### A1 — Building effective agents

- Primary locator: https://www.anthropic.com/engineering/building-effective-agents
- Publication date / access date: `2024-12-19` / `2026-08-03`.
- Category: workflow/control patterns; model-directed agent loop.
- Task / model / baseline / budget / metric-effect / ablation: production-pattern guidance / NR / NR / NR / NR / NR.
- Finding: Anthropic distinguishes predefined workflows from model-directed agents and documents chaining, routing, parallelization, orchestrator-workers, and evaluator-optimizer patterns.
- Tag: `directly_supported`.
- Finding: The article establishes that these structures outperform a simpler loop or chain.
- Tag: `insufficient`.
- Limits: it is experience-based guidance, supplies no sample, uncertainty, matched compute, graph state schema, conditional-edge test, or topology ablation. It recommends the simplest solution, direct APIs where feasible, and adding complexity only when outcomes demonstrably improve.
- Reproducibility: pattern descriptions and examples are public; no controlled efficacy experiment is supplied.
- ThyQuery transfer: terminology and simplicity prior only. It supports a framework-neutral baseline before any graph dependency.

### A2 — How we built our multi-agent research system

- Primary locator: https://www.anthropic.com/engineering/multi-agent-research-system
- Publication date / access date: `2025-06-13` / `2026-08-03`.
- Category: orchestrator-worker workflow, parallel fan-out/fan-in, iterative loop, external memory/checkpoints.
- Task: breadth-first open-web research and an undisclosed internal research evaluation; BrowseComp is used for variance analysis.
- Model: Claude Opus 4 lead with Claude Sonnet 4 subagents; baseline is a single Claude Opus 4 agent.
- Budget: not matched or fully disclosed. The article reports agents at about `4×` chat tokens and multi-agent systems at about `15×` chat tokens; it does not give exact tokens/tool calls per compared trial.
- Metric/effect: `90.2%` better on the internal research eval; three factors explain `95%` of BrowseComp variance and token use alone `80%`; parallel search changes reportedly cut complex-query time by up to `90%`.
- Ablation: architecture versus single agent is described, plus sequential versus two-level parallel search for latency; no topology-only or matched-token ablation is reported.
- Finding: Anthropic published a quantified performance claim for a graph-like orchestrator-worker system.
- Tag: `near_match_only`.
- Finding: The source demonstrates that graph structure caused the quality gain.
- Tag: `contradicts_premise`.
- Limits: internal dataset/rubric, score definition, sample size, uncertainty, prompts, exact budget, and per-arm traces are not released. The article says the system is best for independent breadth-first directions; highly dependent/shared-context work and most coding tasks are poorer fits. It also records coordination failures, synchronous bottlenecks, state consistency/error-propagation risk, and compounding errors.
- Reproducibility: no runnable system, internal eval set, or exact comparison recipe is published.
- ThyQuery transfer: use only the decomposition-fit test, explicit effort budgets, checkpoints, and trace/end-state ideas. Do not transfer the `90.2%` result to intent resolution, planning, a single-host invocation, or a matched-cost graph claim.

### A3 — The “think” tool: Enabling Claude to stop and think

- Primary locator: https://www.anthropic.com/engineering/claude-think-tool
- Publication / update / access: `2025-03-20` / `2025-12-15` / `2026-08-03`.
- Category: structured serial scratchpad inserted between tool calls; sequential decision support.
- Task: τ-bench airline and retail policy/tool-use tasks; SWE-bench coding.
- Model: Claude 3.7 Sonnet.
- Baselines: no think/no extended thinking; extended thinking; unprompted think; think plus a domain prompt for airline.
- Budget: NR for thinking tokens, tool-call limits, latency, or cost by arm.
- Metric/effect: the prose reports airline pass^1 `0.570` versus `0.370` (`54%` relative) and retail `0.812` versus `0.783`; the displayed airline table instead reports `0.584` versus `0.332`. SWE-bench reports an average `1.6%` isolated improvement with `n=30` think samples versus `n=144` without, Welch `t(38.89)=6.71`, `p<.001`, `d=1.47`.
- Ablation: four airline configurations and three retail configurations isolate the tool, extended thinking, and a domain prompt; SWE-bench isolates tool presence.
- Finding: an extra structured reasoning step can improve policy-heavy sequential tool use for Claude 3.7 Sonnet.
- Tag: `directly_supported`.
- Finding: this is evidence that graph-structured reasoning improves performance.
- Tag: `near_match_only`.
- Limits: it is one scratchpad node in a chain, not a branching/merging graph; prompt and tool effects are entangled in the largest airline gain; inference cost is absent; the page contains inconsistent airline numbers; the update recommends integrated extended thinking instead of the dedicated tool in most cases.
- Reproducibility: the tool schema and prompts are shown and τ-bench is public, but exact model snapshot/settings, run seeds, and full result artifacts are not supplied. The current recommendation makes the technique version-sensitive.
- ThyQuery transfer: supports a cheap loop-only comparator that explicitly checks rules, missing information, and planned actions. It does not justify a graph runtime.

### A4 — Claude’s extended thinking

- Primary locator: https://www.anthropic.com/research/visible-extended-thinking
- Publication / access: `2025-02-24` / `2026-08-03`.
- Category: serial test-time reasoning and parallel independent-sample selection.
- Task / model: AIME 2024 and GPQA / Claude 3.7 Sonnet.
- Baseline: lower serial thinking budgets; majority vote and learned scoring across sample counts. A single-sample GPQA score is not stated in page text.
- Budget: equivalent compute of `256` independent samples and maximum `64k` thinking tokens for the reported GPQA result.
- Metric/effect: GPQA `84.8%`, physics `96.5%`; the article says learned scoring continues improving beyond majority-vote saturation.
- Ablation: sample-count scaling and selection method are plotted; exact numeric curve values and uncertainty are not tabulated in page text.
- Finding: parallel independent reasoning plus a scorer can raise benchmark accuracy at very large test-time compute.
- Tag: `directly_supported`.
- Finding: this demonstrates a graph of thoughts or a typed conditional graph.
- Tag: `near_match_only`.
- Limits: independent samples are selected, not connected by revision/merge edges or central graph state; cost is extreme; scoring-model details, uncertainty, and runnable code are absent; the method was explicitly not available in the deployed model described by the article.
- Reproducibility: insufficient from the page alone.
- ThyQuery transfer: at most a high-cost oracle/ensemble arm, not an MVP controller and not a thin-host default.

### A5 — Effective harnesses for long-running agents

- Primary locator: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Publication / access: `2025-11-26` / `2026-08-03`.
- Directly linked original repo: https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding
- Category: initializer-to-coder sequence, repeated loop, file/git-backed handoff state, default-failing feature checklist.
- Task / model: multi-session full-stack application construction / Opus 4.5 in the article; quickstart default `claude-sonnet-4-5-20250929`.
- Baseline / budget / metric-effect / ablation: out-of-box compaction loop versus structured harness / many context windows and hours / qualitative improvement only / components introduced iteratively, no scored ablation.
- Finding: persistent structured artifacts, incremental work, and end-to-end tests address observed premature completion and context-handoff failures.
- Tag: `near_match_only`.
- Finding: Anthropic established that multi-agent architecture performs better than a single general-purpose agent across contexts.
- Tag: `contradicts_premise`.
- Exact contradiction: the article states that this remained unclear and lists multi-agent specialization as future work.
- Limits: domain is autonomous coding; no sample size, quality score, uncertainty, cost-normalized comparison, or conditional graph. The “two agents” share the same harness/tools/system prompt and differ only by initial user prompt.
- Reproducibility: the quickstart exposes code and state files, but requires Claude Code plus Agent SDK installation, an API key, project mutation, many hours, and an unlimited default iteration cap. It is a demo, not an efficacy benchmark.
- ThyQuery transfer: use default-fail evidence state and explicit progress only as specification ideas. The quickstart’s wrapper, dependencies, long execution, project mutation, and execution goal are outside the approved thin Plan-only boundary.

### A6 — Harness design for long-running application development

- Primary locator: https://www.anthropic.com/engineering/harness-design-long-running-apps
- Publication / access: `2026-03-24` / `2026-08-03`.
- Category: planner → generator ↔ evaluator structure, per-sprint contracts, file handoffs, cyclic evaluator-optimizer.
- Task / model: one retro-game-maker prompt with Opus 4.5; later one browser-DAW prompt with Opus 4.6.
- Baseline: single Opus 4.5 agent versus full planner/generator/evaluator harness for the game; component removal and newer-model simplification are discussed later.
- Budget: game solo `20 min/$9`; full harness `6 hr/$200` (over `20×` cost). DAW revised harness `3 hr 50 min/$124.70`.
- Metric/effect: author qualitative inspection, functioning core feature, evaluator-found bugs, and internal evaluator scores; no blinded or external numeric quality outcome.
- Ablation: components were removed one at a time in later iteration, but no scored ablation table is published.
- Finding: evaluator feedback and explicit contracts produced qualitatively stronger outputs in the reported examples.
- Tag: `near_match_only`.
- Finding: evaluator-optimizer is universally beneficial or cost-effective.
- Tag: `contradicts_premise`.
- Limits: `n=1` prompts per illustrated comparison, radically unequal duration/cost/scope, subjective author assessment, prompt/spec expansion confounds, no uncertainty. With Opus 4.6, the author reports the evaluator often became unnecessary overhead for tasks within solo capability and advises re-testing scaffold assumptions after model updates.
- Reproducibility: architecture and receipts are described, but the complete harness/evaluation package and scored trials are not supplied.
- ThyQuery transfer: supports a separate evaluator only as an ablated option beyond the model’s reliable solo boundary. It does not support always-on graph complexity.

### A7 — Scaling Managed Agents: Decoupling the brain from the hands

- Primary locator: https://www.anthropic.com/engineering/managed-agents
- Publication / access: `2026-04-08` / `2026-08-03`.
- Category: hosted event-sourced control architecture; append-only session log, stateless harness loop/router, sandbox/tools.
- Task / model / task-quality baseline / inference budget: long-horizon managed-agent infrastructure / NR / NR / NR.
- Metric/effect: architectural change reportedly reduced p50 time-to-first-token about `60%` and p95 over `90%`.
- Ablation: coupled brain/container versus decoupled session/harness/sandbox architecture; sample size, workload mix, time window, and uncertainty are NR.
- Finding: Anthropic uses an append-only event log outside model context and rebuilds a failed harness from session events.
- Tag: `directly_supported`.
- Finding: central/event-sourced state improves agent task correctness or validates conditional graph edges.
- Tag: `insufficient`.
- Limits: measured effect is infrastructure latency, not answer/plan quality, graph correctness, or reliability. The system is a hosted remote service and describes generic interfaces rather than a typed graph/state-reducer contract.
- Reproducibility: implementation and workload are not public.
- ThyQuery transfer: append-only invocation events plus a derived view are a useful design hypothesis. Managed Agents itself violates the retained no-remote-service boundary and is `REFERENCE_ONLY`, not an adoption candidate.

### A8 — Demystifying evals for AI agents

- Primary locator: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- Publication / access: `2026-01-09` / `2026-08-03`.
- Category: evaluation guidance for stateful multi-turn agents, traces, outcome state, harnesses, graders, and repeated trials.
- Task / model / baseline / budget / effect / ablation: general evaluation methodology / NR / NR / NR / no graph effect / NR.
- Finding: Anthropic recommends multiple trials, complete trajectories, verifiable end state, mixed code/model/human graders, pass@k versus pass^k chosen by product objective, isolated clean environments, and token/latency/tool-call tracking.
- Tag: `directly_supported`.
- Finding: this article validates any particular workflow graph’s efficacy.
- Tag: `insufficient`.
- Limits: prescriptive evaluation guidance, not a graph experiment. It warns that shared state can inflate results or correlate failures and that model graders require human calibration.
- Reproducibility: definitions and sample schemas are public; there is no attached graph comparison suite.
- ThyQuery transfer: directly supports pre-registering stock, loop-only, graph+loop, and oracle arms; multiple trials; state/trace graders; clean isolation; pass^k reliability; token/latency/user-burden reporting.

### A9 — Claude Code hooks reference

- Primary locator: https://code.claude.com/docs/en/hooks
- Publication/update date / access: not exposed on the live page / `2026-08-03`.
- Category: native lifecycle callbacks and deterministic/probabilistic gates around a host agent loop.
- Task/model/baseline/budget/metric-effect/ablation: capability documentation / NR / NR / NR / NR / NR.
- Finding: hooks receive lifecycle data including session identity; `PreToolUse` can block a tool call; `Stop` and `SubagentStop` can prevent stopping and continue work; hooks may be scoped in skill or agent frontmatter.
- Tag: `directly_supported`.
- Finding: Claude Code exposes a typed state graph, central reducer, or conditional-edge performance guarantee.
- Tag: `insufficient`.
- Limits: hooks are event callbacks, not a compiled graph; prompt/agent hooks are model decisions rather than deterministic proofs; command hooks introduce executable code and configuration surface; the page provides capability but no efficacy result.
- Reproducibility: examples and event contracts are public but version-drift risk remains because the page has no displayed update version/date.
- ThyQuery transfer: native hooks could enforce narrow invariants in a later separately approved design, but they add implementation and configuration weight. A Plan-only skill cannot claim hard graph enforcement merely from written instructions; host-conformance testing remains G7’s scope.

### A10 — Claude plays robotics

- Primary locator: https://www.anthropic.com/research/claude-plays-robotics
- Publication / access: `2026-07-09` / `2026-08-03`.
- Category: sequential decision/control loops, reasoning-budget ablation, retry/short-horizon adaptation; not a reasoning graph.
- Task: classic control, locomotion/navigation, and manipulation across the Embody suite.
- Models: twelve models across five providers, including Claude Opus 4/4.1/4.5/4.6/4.7, Sonnet 4.6, and Mythos Preview.
- Baselines/budgets: no reasoning, `20k` thinking tokens, adaptive-low, adaptive-max, and high reasoning depending on model; most cells used 35 trials, with 50/100/200-trial cells for specified noisier suites.
- Metric/effect: many reasoning differences fell within standard error; newer models regressed under higher reasoning on classic control; Opus 4.6 stayed within a `2.6`-point band (`37.8–40.4`) and Opus 4.7 within `4.0` points across high-level locomotion configurations; Mythos Preview was an exception with roughly a `14`-point spread (`40.2–54.1`).
- Ablation: model × reasoning configuration; context truncation; retries/practice; perception-tool interfaces.
- Finding: more reasoning is not reliably beneficial across controlled sequential-action tasks and can hurt.
- Tag: `directly_supported`.
- Finding: this directly refutes graph reasoning for intent-resolution planning.
- Tag: `near_match_only`.
- Limits: robotics is a materially different domain and no graph topology is tested. Real-robot runs had low trial counts. The promised public code URL `https://github.com/safety-research/embody` returned `404` on `2026-08-03`, so current full reproduction was unavailable.
- Reproducibility: prompts, trial counts, infrastructure, and proposed repository structure are described; code was not live at the stated URL on the access date.
- ThyQuery transfer: include a no-harm gate and matched-budget trials; never assume additional reasoning/structure improves simple or reactive cases.

### O1 — τ-bench original paper linked by A3

- Primary locator: https://arxiv.org/abs/2406.12045
- Submission / access: `2024-06-17` / `2026-08-03`.
- Category: evaluation environment, not an Anthropic graph method.
- Finding: τ-bench evaluates tool-agent-user interaction by comparing final database state with an annotated goal and introduces pass^k for repeated-trial reliability.
- Tag: `directly_supported`.
- Transfer: suitable as a precedent for outcome-state and reliability grading, not as evidence for graph efficacy.

### O2 — Autonomous coding quickstart linked by A5

- Primary locator: https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding
- Date / access: live repository; page does not expose a stable release date / `2026-08-03`.
- Category: runnable long-horizon loop with initializer/coder roles and file-backed state.
- Finding: the repo implements fresh sessions, `feature_list.json`, git/progress persistence, automatic continuation, a security hook, and an optional iteration cap.
- Tag: `directly_supported`.
- Finding: the repo reproduces a measured performance gain over a simple agent.
- Tag: `insufficient`.
- Transfer: reference implementation only; its dependencies, wrapper process, API key, unlimited default loop, project writes, and hours-long execution are outside ThyQuery’s retained boundary.

## Performance-claim normalization

| Claim | Graph category | Controlled comparison? | Matched model? | Matched budget? | Public eval/reproduction? | Classification |
|---|---|---:|---:|---:|---:|---|
| Multi-agent Research `+90.2%` | orchestrator-worker control | Internal comparison, details missing | No: system includes Sonnet 4 workers in addition to Opus 4 lead | No | No | `near_match_only` |
| Parallel Research time `up to -90%` | parallel fan-out/fan-in | Sequential versus parallel described | Appears same system family; exact pin NR | No | No | `near_match_only` |
| Think-tool τ-bench lift | serial scratchpad | Yes, configuration ablations | Yes: Claude 3.7 Sonnet | Unknown | Partial: benchmark public, exact runs absent | `directly_supported` for scratchpad; `near_match_only` for graphs |
| Think-tool SWE-bench `+1.6%` | serial scratchpad | Yes, tool present/absent | Yes | Unknown | Partial | `directly_supported` for scratchpad; `near_match_only` for graphs |
| GPQA `84.8%` at 256 samples | independent samples plus scorer | Scaling/selection comparisons plotted | Yes | Intentionally much larger | No runnable Anthropic method | `near_match_only` |
| Full coding harness qualitative lift | planner/generator/evaluator cycle | One illustrated solo comparison | Yes: Opus 4.5 | No; >20× cost and 18× wall time | No scored package | `near_match_only` |
| Managed Agents p50/p95 TTFT reduction | event-sourced infrastructure | Coupled versus decoupled architecture | NR | NR | No | `near_match_only` for task performance |
| Robotics reasoning neutral/negative | serial reasoning budget | Yes, multi-condition trials | Within-model conditions | Budget is the treatment | Code not live at stated URL | `directly_supported` as adjacent counterevidence |

## Contradictions and unknowns that root synthesis must preserve

### G2-X01 — internal numeric inconsistency

- Finding: the think-tool article’s airline prose (`0.570` versus `0.370`) disagrees with its displayed table (`0.584` versus `0.332`).
- Tag: `directly_supported`.
- Required treatment: do not quote a single precise airline effect without naming which source representation was used; prefer the full table and flag the prose conflict.

### G2-X02 — benefit mechanism

- Finding: Anthropic’s closest multi-agent performance article attributes most observed BrowseComp variance to token use, not graph topology.
- Tag: `contradicts_premise`.
- Unknowns: exact causal contribution of topology, delegation, context separation, model mix, tool calls, and total compute.

### G2-X03 — multi-agent generalization

- Finding: Anthropic reports strong breadth-first research gains but explicitly says dependent/shared-context domains and most coding tasks are poorer fits; a later harness article says the single-versus-multi advantage was still unclear.
- Tag: `contradicts_premise`.
- Unknowns: whether ambiguous-intent planning contains enough independent work to benefit from fan-out after equalizing tokens, latency, model, and questions.

### G2-X04 — scaffold staleness

- Finding: Anthropic documents that context resets and evaluator passes can become dead weight as model capability changes.
- Tag: `directly_supported`.
- Unknowns: which ThyQuery graph nodes remain load-bearing for each host/model/version.

### G2-X05 — central state efficacy

- Finding: Anthropic documents append-only state/session architecture and file-backed progress patterns, but does not publish task-quality evidence isolating central state, reducers, stale-write rejection, or conditional edges.
- Tag: `insufficient`.
- Unknowns: correctness, replay divergence, privacy cost, context growth, and benefit over a simple immutable invocation object.

### G2-X06 — exact graph publication claim

- Finding: exact-phrase searches over current Anthropic primary surfaces for “graph engineering,” “thinking in graphs,” “graph-structured reasoning,” and “conditional edges” did not locate an Anthropic result within the source bound.
- Tag: `insufficient`.
- Unknowns: unindexed, renamed, future, or non-public work; the audit cannot establish universal nonexistence.

## ThyQuery transfer boundary and thin-host implications

### G2-T01 — architecture selection

- Finding: Anthropic evidence favors starting with explicit, inspectable, composable primitives and retaining complexity only after measured improvement.
- Tag: `directly_supported`.
- Decision implication: `NO_ANTHROPIC_GRAPH_EFFICACY_GATE_PASSED`. Anthropic evidence alone cannot select a graph framework or graph-primary controller.

### G2-T02 — smallest transferable control contract

- Finding: the transferable subset is an invocation-scoped immutable input plus append-only events/derived state, explicit routing predicates, bounded loop/stop conditions, outcome-state checks, and trace receipts.
- Tag: `near_match_only`.
- Guard: this is a ThyQuery design hypothesis inferred from multiple Anthropic patterns, not a measured Anthropic design for intent resolution.

### G2-T03 — framework/runtime boundary

- Finding: Managed Agents, Agent-SDK harnesses, autonomous quickstarts, and multi-hour evaluator loops exceed the retained thin host-native, no-daemon/no-wrapper/no-remote-service/no-execution boundary.
- Tag: `directly_supported` for the source architectures and `near_match_only` for the ThyQuery exclusion inference.
- Consequence: treat them as `REFERENCE_ONLY`; do not import their runtime or their performance numbers into the MVP claim.

### G2-T04 — native Claude hook boundary

- Finding: Claude Code hooks provide lifecycle interception and blocking, but not a documented typed graph runtime or efficacy guarantee.
- Tag: `directly_supported`.
- Consequence: a later approved design may compare (a) prompt/skill-only advisory routing with (b) narrowly scoped deterministic hook guards. It must not claim that a Markdown skill alone enforces legal transitions, exactly-once handoff, or state integrity.

### G2-T05 — evaluation gate

- Finding: the only defensible graph-benefit claim for ThyQuery requires a pinned loop-only versus graph+loop experiment with the same host, model, tools, source policy, tasks, inference budget, and planner handoff.
- Tag: `near_match_only`.
- Required measures: end-state intent-contract acceptance, contract-to-native-plan fidelity, next-edge correctness, invariant violations, pass^k, user burden, tokens, latency, and clear-query no-harm. Report unmatched resources rather than normalizing them away.

### G2-T06 — routing and evaluator policy

- Finding: Anthropic sources support routing and evaluator patterns only when categories/criteria are clear and the extra structure demonstrably adds value.
- Tag: `directly_supported`.
- Consequence: deterministic guards should own Plan validity, authority, cancellation, state integrity, budgets, and exactly-once handoff; model output may propose but should not self-authorize a success edge. The latter guard allocation is a ThyQuery design inference and remains `near_match_only` until evaluated.

## Audit conclusion

- Exact answer: Anthropic has published prescriptive graph-like workflow guidance and adjacent measured results for parallel orchestration, scratchpad reasoning, ensembles, and long-running evaluator loops. It has not, within this bounded audit, published controlled evidence that a typed control graph or “thinking in graphs” itself improves performance under matched compute.
- Exact-answer tag: `insufficient` for the claimed Anthropic graph-performance result; `near_match_only` for adjacent performance evidence; `contradicts_premise` for transferring those gains as graph-topology causation; `directly_supported` for the documented workflow/state/evaluation capabilities.
- Stop condition: satisfied. The exact institutional claim is classified and the 10-artifact Anthropic bound is exhausted; no further source expansion is warranted in G2.

## Completion attestation

- Source count: `12` primary artifacts total — `10` Anthropic pages/docs plus `2` directly linked originals (`τ-bench` paper and Anthropic quickstart repo).
- Contradictions preserved: think-tool numeric mismatch; token-use confound; unequal model/budget; research-versus-dependent-task fit; scaffold/evaluator staleness; reasoning null/negative results.
- Unknowns preserved: internal eval definition/sample/uncertainty; exact inference budgets; graph-topology ablation; central-state/conditional-edge efficacy; current public reproduction of Embody; universal existence/nonexistence outside the bounded audit.
- No-descendant attestation: G2 spawned no subagent or descendant and delegated no work.
- Mutation attestation: only this uniquely owned artifact was created; no project source, shared planning file, host configuration, package, or external state was changed.
- Line count (including this line and the payload-hash line): `348`.
- SHA-256 (payload bytes from line 1 through the preceding line, including its newline): `588100ff60783fdba6b5aba394b747a70c46e63f83e0c5cd9445671e24f19c5a`
