# G5 — Framework and runtime comparison

## Receipt and boundary

- Lane: `G5`; research date and access date: `2026-08-03` (Asia/Seoul).
- Authority: bounded read-only framework research under approved `SK@v9-B`; this file is evidence for root synthesis, not an implementation plan or framework selection.
- Skeleton inspected: `.planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v9_B.md`.
- Required skeleton SHA-256: `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`.
- Observed skeleton SHA-256 before research write: `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`.
- Bounds reached: 12 frameworks screened; six deeply compared; official documentation, repositories, release notes, licenses, and official test/evaluation surfaces only.
- No package was installed, imported, or executed. No prototype, host session, daemon, remote control plane, wrapper, proxy, or configuration mutation was used.
- Graph category: every runtime below is primarily a **control/workflow graph or event workflow**. None of its documentation is direct evidence that graph-structured model reasoning improves ThyQuery.

## Evidence-tag vocabulary

- `directly_supported`: the cited official artifact directly supports the bounded capability or maintenance claim.
- `contradicts_premise`: the cited official artifact directly conflicts with a required capability or thin-host premise.
- `near_match_only`: the artifact supports an adjacent pattern, but the semantic or host boundary does not exactly match.
- `insufficient`: the official evidence inspected cannot establish the claim.

Each material claim below has exactly one of these tags. Candidate outcomes are intake dispositions, not evidence tags: `ADOPT_CANDIDATE`, `REFERENCE_ONLY`, or `OUT_OF_SCOPE`.

## Executive finding

- **G5-C01 — `directly_supported`**: The screened frameworks expose many useful control patterns—typed data or ports, guarded routing, cycles, checkpointing, interrupts, reducers/fan-in, subgraphs, streaming, and trace/test hooks—but no single candidate supplies all of them with identical semantics. [S01–S66]
- **G5-C02 — `insufficient`**: No official primary source inspected demonstrates the same runtime embedded in both a stock Codex `$thyquery` plugin and a stock Claude Code `/thyquery:thyquery` plugin while preserving the approved no-daemon, no-wrapper, no-proxy, no-global-config-mutation boundary.
- **G5-C03 — `insufficient`**: No official source compares any candidate on ThyQuery's ambiguous-intent, Plan-first, exactly-one-native-plan task, so framework capability does not establish correctness, safety, latency, token, user-burden, or planning-quality efficacy.
- **G5-C04 — `near_match_only`**: LangGraph is the closest feature-complete reference pattern; Apache Burr is the thinnest Python control-state reference; Pydantic Graph is the smallest strongly typed graph-core reference; LlamaIndex Workflows is the strongest typed-event/test-runner reference. Each still misses at least one exact requirement or host proof. [S01–S08, S20–S35, S43–S50]
- **G5-C05 — `near_match_only`**: A framework-neutral typed control contract is the only `ADOPT_CANDIDATE` from this lane because it can preserve the required semantics without committing the product to a runtime. This is a candidate for the next design gate, not an adoption, install, or implementation authorization.
- **G5-C06 — `insufficient`**: The framework-neutral alternative itself has no measured ThyQuery efficacy yet; it requires later approval and model-free conformance evaluation before any runtime decision.

## Bounded screen: 12 candidates

| Candidate | Minimum-relevance screen | Deep? | Outcome | Decisive boundary |
|---|---|---:|---|---|
| LangGraph | `directly_supported`: typed shared state, reducers, conditional edges, loops, persistence, interrupts, subgraphs, streams, and tests. [S01–S06] | yes | `REFERENCE_ONLY` | `insufficient`: no two-host native-plugin proof or ThyQuery efficacy; persistence/tracing require deliberate privacy policy. [S02, S08] |
| Microsoft Agent Framework Workflows | `directly_supported`: type-safe graph, conditional/parallel routing, requests, checkpointing, deterministic supersteps, and Python/.NET/Go surfaces. [S09–S15] | yes | `REFERENCE_ONLY` | `insufficient`: exact graph-cycle, per-key reducer, subgraph, and two-host semantics were not established; release 1.13.0 changes replay and feature-usage reporting. [S15] |
| AutoGen GraphFlow | `directly_supported`: directed sequential, parallel, conditional, and looping graphs exist. [S17] | no | `REFERENCE_ONLY` | `directly_supported`: GraphFlow is experimental; current AutoGen guidance encourages migration to Agent Framework. [S17–S19] |
| LlamaIndex Agent Workflows | `directly_supported`: typed events, branches/loops, concurrency, state, HITL events, context snapshots, and a test runner. [S20–S26] | yes | `REFERENCE_ONLY` | `contradicts_premise`: current docs call it event-driven rather than a graph/DAG; TypeScript implementation is archived/deprecated. [S20, S27] |
| Pydantic Graph | `directly_supported`: strongly typed Python graph/FSM with decisions, cycles, map/broadcast, joins, and reducers. [S28–S29, S35] | yes | `REFERENCE_ONLY` | `contradicts_premise`: v2 removed graph persistence and has no v2 equivalent; native durable HITL/replay is absent from current evidence. [S30] |
| Haystack Pipelines | `directly_supported`: typed-socket directed multigraphs with branches, loops, routers, async concurrency, streaming, breakpoints, and nested pipelines. [S36–S38] | yes | `REFERENCE_ONLY` | `near_match_only`: canonical `State` is Agent/Tool scoped, not the whole pipeline; broad RAG/agent dependencies and default usage telemetry weaken thinness/privacy fit. [S38–S41] |
| Apache Burr | `directly_supported`: explicit state machine, ordered conditional transitions, persistence/forking, optional typed state, map-reduce/subgraphs, streams, and tracked-test generation. [S43–S49] | yes | `REFERENCE_ONLY` | `near_match_only`: dependency-free core is thin, but Python-only integration, incomplete parallel cancellation/stream/failure semantics, and ASF incubation remain. [S46, S50] |
| Mastra Workflows | `directly_supported`: TypeScript workflow graphs support branch/parallel and suspend/resume snapshots with storage. [S51–S53] | no | `REFERENCE_ONLY` | `near_match_only`: Node 22.13+ and a broad core dependency/storage surface exceed the smallest neutral contract; two-host proof is absent. [S52] |
| CrewAI Flows | `directly_supported`: typed Pydantic flow state, event routing, branches/loops/parallel starts, persistence, resume/fork, and HITL are documented. [S54–S56] | no | `REFERENCE_ONLY` | `near_match_only`: event-decorator flow semantics and the large agent-suite dependency set are broader than a fixed thin control graph. [S54–S55] |
| Semantic Kernel Process Framework | `directly_supported`: stateful event processes, nested processes, HITL steps, fan-in/out, cycles, map-reduce, and OTel auditability are documented. [S57–S58] | no | `OUT_OF_SCOPE` | `directly_supported`: Process Framework remains experimental; a current Microsoft guide directs Semantic Kernel agent migration toward Agent Framework. [S57, S59] |
| Temporal | `directly_supported`: durable workflow execution is backed by Temporal Service, self-hosted or Temporal Cloud. [S60–S62] | no | `OUT_OF_SCOPE` | `contradicts_premise`: a required service/control plane conflicts with the no-daemon/no-remote-service thin-plugin boundary. [S60] |
| Prefect | `directly_supported`: Python flows, tracked state, subflows, testing, and client/server APIs exist. [S63–S66] | no | `OUT_OF_SCOPE` | `contradicts_premise`: official local tests override Prefect configuration and launch a subprocess API server; the package includes a broad client/server dependency surface. [S64–S66] |

### Screen stop rationale

- **G5-C07 — `directly_supported`**: The screen reached the approved 12-candidate limit and the deep comparison reached six.
- **G5-C08 — `near_match_only`**: The remaining screen-only candidates repeat already-covered patterns—typed event flow, durable service orchestration, or broad agent-platform workflow—without adding a new thin two-host capability pattern. [S17–S19, S51–S66]
- **G5-C09 — `insufficient`**: No claim is made that excluded or unexamined frameworks are inferior; they were outside the bounded comparison.

## Deep comparison matrix A — state and control semantics

| Framework | Typed canonical state | Conditional edges and cycles | Reducers/concurrency | Subgraphs and streaming |
|---|---|---|---|---|
| LangGraph | `directly_supported`: TypedDict/dataclass/Pydantic schemas; per-key reducers. [S01] | `directly_supported`: fixed and conditional edges, loops, recursion limit, Pregel supersteps. [S01] | `directly_supported`: same-superstep parallel updates merge by reducers; `Send` supports dynamic fan-out. [S01] | `directly_supported`: stateful/per-call/stateless subgraphs and multiple stream modes. [S04–S05] |
| Microsoft Agent Framework | `near_match_only`: graph ports/messages are type-safe, while common workflow state is a shared key-value scope whose writes become visible next superstep. [S09–S11] | `directly_supported`: conditional routing and parallel fan-out are documented; `insufficient`: exact fixed Graph API cycle semantics were not located. [S09–S10] | `near_match_only`: BSP supersteps give parallel execution and deterministic delivery order; no per-key reducer contract was located. [S10–S11] | `insufficient`: no exact nested subgraph primitive was established; workflow event streaming exists, but it is not evidence of durable replay streaming. [S09–S10] |
| LlamaIndex Workflows | `directly_supported`: typed Pydantic events; state is untyped by default and optionally Pydantic-typed with an atomic edit lock. [S20, S22] | `contradicts_premise`: routing is normal Python event logic and docs explicitly say the workflow is not a graph/DAG; branches and loops are supported. [S20] | `directly_supported`: fan-out/fan-in and custom collection exist; completion order and sibling-lifetime caveats are explicit. [S21] | `near_match_only`: workflows can be composed in Python and events stream, but no fixed graph/subgraph contract equivalent was established. [S20–S21] |
| Pydantic Graph | `directly_supported`: state, dependencies, inputs, outputs, nodes, and return edges are strongly typed. [S28–S29, S35] | `directly_supported`: return types/decision branches route edges and graphs can loop. [S28–S29] | `directly_supported`: map/broadcast and join reducers exist, with sibling cancellation options. [S29] | `near_match_only`: manual async iteration streams node progression; no documented first-class nested subgraph contract was located. [S28, S35] |
| Haystack Pipelines | `near_match_only`: component sockets are validated and typed, but `State` with merge handlers is scoped to Agents/Tools rather than the whole pipeline. [S36, S38] | `directly_supported`: directed multigraph, ConditionalRouter, branching, and loops. [S36] | `directly_supported`: async pipelines run ready components concurrently; Agent state merge handlers resemble reducers but are not pipeline-global reducers. [S36, S38] | `directly_supported`: SuperComponents wrap nested pipelines; async pipeline chunks can stream. [S36, S38] |
| Apache Burr | `directly_supported`: immutable central State plus optional Pydantic application/action typing; current docs note validation is not yet application-wide. [S43, S45] | `directly_supported`: transitions are explicit, conditions are evaluated in order, first true wins, and cycles are ordinary transitions. [S43] | `directly_supported`: map actions/states, explicit reduce functions, thread executors or asyncio gather. [S46] | `directly_supported`: `RunnableGraph` represents subgraphs and actions can stream; intermediate graph streaming exhausts to one final item. [S46–S47] |

## Deep comparison matrix B — durability, tests, privacy, and footprint

| Framework | Interrupt/checkpoint/replay/idempotency | Deterministic tests and tracing | Local/offline and dependency surface | Runtime/license/maintenance |
|---|---|---|---|---|
| LangGraph | `directly_supported`: interrupts need a checkpointer and thread ID; resume restarts the node; checkpoints enable time travel/fault tolerance; replay re-executes downstream nodes; side effects before interrupts/checkpoints must be idempotent. [S02–S03] | `directly_supported`: official pytest patterns use a fresh graph/checkpointer; LangSmith supplies optional evaluation/tracing. [S06, S08] | `directly_supported`: in-memory operation is available; `near_match_only`: private channels appear in default value streams unless output keys are restricted, and remote tracing requires privacy configuration. [S01–S02, S08] | `directly_supported`: Python core is MIT, Python >=3.10, with LangChain checkpoint/SDK/prebuilt dependencies; separate JS implementation exists; 1.2.10 released 2026-07-28. [S06–S07] |
| Microsoft Agent Framework | `directly_supported`: typed request/response HITL and superstep checkpoints preserve state and pending requests; 1.13.0 made checkpoints replayable from initial input/HITL responses. `insufficient`: exactly-once side-effect semantics were not established. [S10, S12, S15] | `directly_supported`: scheduler ordering within supersteps is deterministic and OTel spans cover workflows; raw contents are disabled unless sensitive-data capture is enabled. `insufficient`: no dedicated graph-conformance test runner was located. [S10, S13] | `directly_supported`: in-process core is available; package declares msgspec, Pydantic, dotenv, and OTel API. Release 1.13.0 adds process-wide feature-usage reporting through first-party client User-Agent headers. [S14–S15] | `directly_supported`: MIT; Python >=3.10 plus .NET and Go documentation; Python 1.13.0 released 2026-07-30. [S09, S14–S15] |
| LlamaIndex Workflows | `directly_supported`: HITL is modeled as events; Context can be serialized/restored; durability is manual and at-least-once, so mid-step work can rerun and external effects need idempotency. [S23–S24] | `directly_supported`: `WorkflowTestRunner` inspects events/counts/context and tests snapshot restore; instrumentation is local with optional OTel. [S25] | `directly_supported`: standalone Python package has a small direct dependency set around instrumentation, Pydantic, and typing extensions; no server is required for the in-process runtime. [S20, S26] | `directly_supported`: Python >=3.10, MIT, package 2.22.2 at inspected head; `contradicts_premise`: maintained TypeScript parity is absent because `workflows-ts` was archived/deprecated 2026-04-30. [S26–S27] |
| Pydantic Graph | `contradicts_premise`: v2 removed `pydantic_graph.persistence` and says there is no v2 equivalent. `insufficient`: current native HITL, checkpoint, and replay semantics were not established. [S30] | `near_match_only`: Pydantic AI provides model-test doubles and network-denial controls, but the source is not a graph-specific conformance runner; graph spans can be instrumented through Logfire. [S31–S32] | `directly_supported`: in-process Python library; dependencies include anyio, httpx, logfire-api, Pydantic, and typing-inspection; nothing is exported to Logfire unless configured. [S31, S33] | `directly_supported`: MIT, Python >=3.10; Pydantic AI 2.22.0 released 2026-08-01. [S33–S34] |
| Haystack Pipelines | `near_match_only`: pipeline breakpoints write JSON snapshots and resume, chiefly for debugging. `insufficient`: exact replay/idempotency/side-effect guarantees were not located. [S37] | `near_match_only`: 3.0 supplies stable no-network mock components, not a graph-route oracle; tracing is explicit and content tracing is off by default. [S39–S40] | `directly_supported`: local execution exists, but the package declares a broad RAG/agent stack including OpenAI, Pydantic, PostHog, networkx, httpx, numpy, and Jinja2; anonymous usage telemetry is on by default unless disabled. [S39–S41] | `directly_supported`: Apache-2.0, Python >=3.10; 3.0.0 released 2026-07-20 and moved many integrations out of core. [S40–S42] |
| Apache Burr | `directly_supported`: state persists after actions, can reload/fork and resume at the next action; `near_match_only`: halting/user-blocking approximates HITL, but no typed interrupt request protocol or exactly-once guarantee was established. [S43–S44, S48] | `directly_supported`: local tracking records graph, inputs, state, and steps; `burr-test-case` generates pytest fixtures from tracked state. `near_match_only`: LLM-output equality remains nondeterministic. [S48] | `directly_supported`: core `dependencies=[]`; persistence/tracking/UI integrations are optional. Local tracking writes state under `~/.burr` when enabled; the UI server is optional. [S48–S49] | `directly_supported`: Apache-2.0, Python >=3.9, 0.42.0-incubating released 2026-05-10; release removed phone-home telemetry. `near_match_only`: ASF incubation means the project is not yet fully endorsed. [S49–S50] |

## Candidate-specific findings

### LangGraph — `REFERENCE_ONLY`

- **G5-LG01 — `directly_supported`**: It is the only deep candidate in this screen with official pages covering all of typed shared state, reducer-driven parallel updates, conditional edges/loops, interrupt/resume, checkpoints, subgraphs, multiple streaming modes, and graph testing. [S01–S06]
- **G5-LG02 — `directly_supported`**: A durable resume does not continue at the exact interrupt expression; it restarts that node, which makes pre-interrupt side effects an idempotency concern. [S03]
- **G5-LG03 — `directly_supported`**: Checkpoints occur at superstep boundaries, pending successful sibling writes can be retained after another node fails, and replay re-executes downstream work rather than treating a trace as pure playback. [S02]
- **G5-LG04 — `near_match_only`**: The local in-memory core can fit a single invocation, but persistence, default value streaming of private channels, and optional LangSmith observability introduce data-retention/redaction choices beyond a neutral control contract. [S01–S02, S08]
- **G5-LG05 — `insufficient`**: Official sources do not prove packaging, cold-start, invocation isolation, native question mapping, or plan-handoff compatibility in both target hosts.

### Microsoft Agent Framework Workflows — `REFERENCE_ONLY`

- **G5-MAF01 — `directly_supported`**: The Graph API validates topology/type bindings and executes a modified Pregel/BSP schedule with a barrier between supersteps and deterministic message ordering. [S09–S10]
- **G5-MAF02 — `directly_supported`**: The checkpoint object includes messages, shared state, pending requests, iteration count, metadata, graph signature, and version; HITL requests survive checkpoint restore. [S12]
- **G5-MAF03 — `near_match_only`**: Workflow graph typing and deterministic scheduling are strong references, but the documented shared state is a scoped key-value store rather than a versioned per-field canonical schema with declared reducers. [S10–S11]
- **G5-MAF04 — `insufficient`**: The inspected fixed-graph docs did not establish cycles, reducer algebra, first-class nested subgraphs, or a framework-specific deterministic test oracle.
- **G5-MAF05 — `directly_supported`**: The latest inspected release introduced both a replay-breaking behavioral change and process-wide feature-usage reporting, so version pinning and privacy review would be required before any later adoption decision. [S15]

### LlamaIndex Agent Workflows — `REFERENCE_ONLY`

- **G5-LIW01 — `directly_supported`**: Typed events, optional typed state, an atomic state-edit lock, normal Python branches/loops, event-based HITL, and model-free test-runner inspection are available. [S20–S25]
- **G5-LIW02 — `contradicts_premise`**: The official overview explicitly distinguishes Workflows from graph/DAG execution; edge topology is implicit in emitted/consumed event types and Python control. [S20]
- **G5-LIW03 — `directly_supported`**: Durable workflows are at-least-once and manually serialize Context; a failed in-flight step may rerun, so side effects need idempotency. [S24]
- **G5-LIW04 — `directly_supported`**: In concurrent flows, first-result collection does not automatically cancel siblings, and dynamically emitted events can persist even if the producer later fails. [S21]
- **G5-LIW05 — `contradicts_premise`**: The official TypeScript workflow repository is archived and directs users to Python, preventing a claim of maintained cross-runtime parity. [S27]

### Pydantic Graph — `REFERENCE_ONLY`

- **G5-PG01 — `directly_supported`**: It supplies a small, explicit Python graph/FSM with typed state, dependency, node, and edge-return contracts; Builder adds decisions, maps, broadcast, joins, and reducer functions. [S28–S29, S35]
- **G5-PG02 — `contradicts_premise`**: Current v2 documentation says native graph persistence was removed with no v2 equivalent, so checkpoint/replay cannot be credited to the runtime. [S30]
- **G5-PG03 — `near_match_only`**: Manual graph iteration can support host-visible progress and intervention, but it is not a documented durable HITL interrupt/resume protocol. [S28, S35]
- **G5-PG04 — `near_match_only`**: Pydantic AI's TestModel/FunctionModel and request-denial switch can make model calls deterministic, but the cited guide does not define graph reachability, replay, or edge-oracle fixtures. [S32]
- **G5-PG05 — `insufficient`**: No current source establishes native subgraphs, schema migration, or two-host embedding.

### Haystack Pipelines — `REFERENCE_ONLY`

- **G5-HY01 — `directly_supported`**: Haystack 3.0 Pipelines are typed directed multigraphs with simultaneous branches, loops, conditional routers, async concurrency, chunks, and cancellation. [S36]
- **G5-HY02 — `near_match_only`**: Agent `State` supports schemas and merge handlers, but it is not documented as a pipeline-global canonical state object. [S38]
- **G5-HY03 — `near_match_only`**: Breakpoint snapshots provide pause/resume debugging, but no official exactly-once or general durable replay guarantee was located. [S37]
- **G5-HY04 — `directly_supported`**: Version 3.0 makes tracing explicit and safer deserialization allowlisted, but anonymous usage telemetry remains enabled by default and opt-out is configuration-dependent. [S39–S40]
- **G5-HY05 — `near_match_only`**: The broad RAG/agent dependency surface and telemetry default are materially heavier than ThyQuery's thin invocation controller. [S39–S41]

### Apache Burr — `REFERENCE_ONLY`

- **G5-BR01 — `directly_supported`**: Burr exposes immutable central state, explicit ordered transitions, persistence/forking, optional Pydantic typing, parallel map/reduce, subgraphs, streaming actions, local tracking, and test-case generation. [S43–S49]
- **G5-BR02 — `directly_supported`**: Core declares no mandatory dependencies; tracking, persistence, Pydantic, and UI capabilities are optional extras. [S49]
- **G5-BR03 — `near_match_only`**: Typed state validation is not yet application-wide, and the docs caution about list/reference behavior in typed action state. [S45]
- **G5-BR04 — `directly_supported`**: Parallel child IDs depend on stable ordering; per-task custom keys, interleaved parallel streaming, inter-graph cancellation examples, and graceful sub-action failure remain future work. [S46]
- **G5-BR05 — `near_match_only`**: The latest ASF-incubating release removes phone-home telemetry and improves privacy fit, but incubation and Python-only runtime support preserve maintenance/host uncertainty. [S50]

## Screen-only candidate receipts

### AutoGen GraphFlow — `REFERENCE_ONLY`

- **G5-AG01 — `directly_supported`**: GraphFlow supports sequential, parallel, conditional, and looping directed graphs. [S17]
- **G5-AG02 — `directly_supported`**: The official page marks GraphFlow experimental and warns that APIs/behavior may change. [S17]
- **G5-AG03 — `directly_supported`**: Microsoft now provides an AutoGen-to-Agent-Framework migration guide, and the AutoGen repository recommends Agent Framework for new production work. [S18–S19]
- **G5-AG04 — `insufficient`**: Current durable checkpoint, typed canonical-state, reducer, and two-host guarantees were not established within the bounded screen.

### Mastra Workflows — `REFERENCE_ONLY`

- **G5-MS01 — `directly_supported`**: Workflow snapshots capture execution state when suspension occurs and can be persisted through configured storage for resume. [S51]
- **G5-MS02 — `directly_supported`**: The TypeScript core requires Node >=22.13 and declares a broad dependency set including MCP SDK, PostHog, process execution, WebSocket, and multiple AI SDK packages. [S52]
- **G5-MS03 — `directly_supported`**: Core is Apache-2.0 while designated enterprise code uses a separate commercial license; core 1.55.0 released 2026-07-31. [S52–S53]
- **G5-MS04 — `insufficient`**: No official evidence establishes a storage-free, host-native two-plugin embedding or ThyQuery efficacy.

### CrewAI Flows — `REFERENCE_ONLY`

- **G5-CR01 — `directly_supported`**: Flows use event decorators with Pydantic state, routers, loops, parallel starts, default SQLite persistence, resume/fork, and HITL. [S54]
- **G5-CR02 — `near_match_only`**: Completion semantics are based on the last completed method, which requires extra care if deterministic convergence is required across concurrent branches. [S54]
- **G5-CR03 — `directly_supported`**: The MIT Python package supports Python >=3.10,<3.14 and declares a broad agent/product dependency set including OpenAI, OTel, storage/vector, document, spreadsheet, and MCP packages. [S55]
- **G5-CR04 — `insufficient`**: No official source proves a thin, fully local, two-host plugin subset can be isolated from that package surface.

### Semantic Kernel Process Framework — `OUT_OF_SCOPE`

- **G5-SK01 — `directly_supported`**: Processes and steps are stateful/event-driven, may pause/resume, nest, perform HITL, and form fan-in/out, cycles, and map-reduce patterns. [S57–S58]
- **G5-SK02 — `directly_supported`**: The Process Framework package is explicitly experimental and subject to change before preview/GA. [S57]
- **G5-SK03 — `near_match_only`**: A current migration guide favors Microsoft Agent Framework for Semantic Kernel agent migrations, but it does not directly declare the Process Framework deprecated. [S59]
- **G5-SK04 — `insufficient`**: Stable runtime semantics and native two-host embedding are not established; the experimental status alone fails the current adoption screen.

### Temporal — `OUT_OF_SCOPE`

- **G5-TP01 — `directly_supported`**: Temporal's durability model depends on a Temporal Service, operated either by the user or as Temporal Cloud. [S60]
- **G5-TP02 — `contradicts_premise`**: That service boundary is incompatible with an invocation-local plugin that must not require a daemon, remote control plane, or wrapper session.
- **G5-TP03 — `directly_supported`**: The Python SDK is MIT and 1.31.0 released 2026-07-29, but SDK maintenance does not remove the service requirement. [S61–S62]

### Prefect — `OUT_OF_SCOPE`

- **G5-PF01 — `directly_supported`**: Prefect models Python flows and subflows with tracked state. [S63]
- **G5-PF02 — `contradicts_premise`**: Its official workflow-test fixture creates temporary SQLite state, overrides Prefect API environment settings, and launches a subprocess ASGI server. [S64]
- **G5-PF03 — `directly_supported`**: The client is designed to communicate with Prefect Cloud or a self-hosted server, and the distribution includes a broad server/client stack. [S65–S66]
- **G5-PF04 — `contradicts_premise`**: This control-plane/configuration footprint is outside the approved thin-plugin boundary even though Prefect is a capable general workflow orchestrator.

## Capability versus efficacy gate

| Claim class | Evidence status | G5 conclusion |
|---|---|---|
| Framework exposes a named API/semantic | `directly_supported` where cited | Capability only; version- and configuration-scoped. |
| Framework improves ThyQuery output quality | `insufficient` | No candidate has a ThyQuery task, baseline, matched budget, metric, effect size, uncertainty, or replication receipt. |
| Framework reduces routing or termination errors | `insufficient` | Must be measured against the Ralph-loop-only and framework-neutral graph-shadow baselines. |
| Framework can be packaged identically in both hosts | `insufficient` | Host runtime and plugin capability evidence belongs to G7; G5 found no native two-host demonstration. |
| Checkpoint equals exactly-once execution | `contradicts_premise` for that inference | LangGraph and LlamaIndex explicitly describe rerun/idempotency concerns; other candidates lack sufficient exactly-once evidence. [S02–S03, S24] |
| Tracing is private by default | `contradicts_premise` as a universal claim | Defaults differ: content capture may be off, but streams, state files, usage telemetry, or optional remote exporters still require explicit data-flow review. [S01, S08, S13, S31, S39, S48, S50] |
| More graph features imply a better thin plugin | `insufficient` | Feature breadth can increase dependencies, state retention, supply surface, and integration complexity; no measured optimum exists. |

## Privacy, supply-chain, and runtime boundary

- **G5-PS01 — `directly_supported`**: Several runtimes can execute in-process without their optional UI or hosted observability service: LangGraph with in-memory checkpointing, Agent Framework core, LlamaIndex Workflows, Pydantic Graph, Haystack Pipelines, and Burr core. [S02, S09, S20, S28, S36, S49]
- **G5-PS02 — `near_match_only`**: “Can run locally” is not equivalent to “leaves no local or remote trace.” Checkpointers, stream payloads, local trackers, breakpoint files, usage telemetry, and configured exporters have separate data paths. [S01–S02, S08, S13, S37, S39, S48]
- **G5-PS03 — `directly_supported`**: Burr has the smallest declared mandatory core surface (`dependencies=[]`); Pydantic Graph and LlamaIndex Workflows are smaller than the broad Haystack, Mastra, and CrewAI distributions. [S26, S33, S41, S49, S52, S55]
- **G5-PS04 — `near_match_only`**: Declared direct dependencies are a supply-chain surface indicator, not a vulnerability finding. No CVE scan, SBOM audit, reproducible-build check, transitive license audit, or malicious-package analysis was authorized or performed.
- **G5-PS05 — `near_match_only`**: MIT and Apache-2.0 are permissive source licenses, but this report is not legal advice and does not establish compatibility for a future distribution or its transitive dependencies. [S06, S14, S19, S26, S33, S42, S49, S52, S55, S62, S66]
- **G5-PS06 — `insufficient`**: Cold-start time, installed size, memory, CPU, file writes, network attempts, and transitive dependency counts were not measured because installation or prototype execution was not authorized.

## Framework-neutral graph specification — `ADOPT_CANDIDATE`

This outcome means “carry forward as the framework-selection baseline,” not “adopt or implement now.” It is a behavioral contract that both host adapters would have to satisfy if later approved.

### Minimal control contract

- **G5-FN01 — `near_match_only`**: Define one versioned invocation-state schema with explicit host receipt, authority, original query, intent contract, evidence ledger, ambiguity set, budgets, progress/cycle signals, terminal status, and handoff count. This synthesizes recurring typed-state patterns without importing their runtimes. [S01, S11, S22, S28, S38, S43]
- **G5-FN02 — `near_match_only`**: Define `transition(state, event) -> (validated_state_delta, commands, trace_event)` as a pure model-free control function; keep model output as a proposal payload, never as direct authorization for a success edge.
- **G5-FN03 — `near_match_only`**: Encode ordered guard precedence and an explicit conflict rule: hard authority/integrity/cancellation guards first; exactly one normal edge unless the graph declares a fan-out; unmatched guards reach a typed error rather than implicit success. Ordered-transition and graph-validation patterns are directly available in Burr, LangGraph, and Agent Framework. [S01, S10, S43]
- **G5-FN04 — `near_match_only`**: Give every event a schema version, invocation ID, step ID, causation ID, graph fingerprint, and idempotency key; reject stale state versions and duplicate terminal handoffs.
- **G5-FN05 — `near_match_only`**: Require reducer declarations only for parallel fields; test associativity, commutativity, and idempotence where ordering is intentionally irrelevant, otherwise serialize writes and fail on conflicts. This preserves reducer lessons without assuming a framework's merge semantics. [S01, S29, S38, S46]
- **G5-FN06 — `near_match_only`**: Represent an interrupt as a typed terminal-like suspension carrying question schema, owner, allowed response type, resume node, and state digest; resume must revalidate Plan/authority receipts before continuing. Framework interrupts and HITL events are references, not proof of host-native mapping. [S03, S12, S23, S57]
- **G5-FN07 — `near_match_only`**: Make checkpointing optional and host-owned: atomically persist a redacted state/event snapshot only when crash recovery is required; validate schema and graph fingerprints on restore; never require a service. [S02, S12, S24, S37, S44]
- **G5-FN08 — `near_match_only`**: Define replay as deterministic control recomputation over recorded model/tool result envelopes, not automatic re-execution of external side effects. Side-effect commands require an idempotency receipt; ThyQuery's approved no-execution boundary should normally leave none. [S02–S03, S24]
- **G5-FN09 — `near_match_only`**: Namespace subgraph state and declare input/output projections, return terminals, budget inheritance, cancellation propagation, and trace parentage. [S04, S38, S46]
- **G5-FN10 — `near_match_only`**: Stream only redacted transition envelopes selected by an allowlist; do not expose private/internal state merely because a runtime's default stream can. [S01, S05]
- **G5-FN11 — `near_match_only`**: Use an append-only local NDJSON trace or in-memory event list with explicit content redaction and network telemetry off by construction; tracing is optional and cannot affect control decisions.
- **G5-FN12 — `insufficient`**: Whether Codex and Claude Code can each host this exact state machine with no package/runtime bridge is unresolved pending G7's current host matrix.

### Model-free conformance fixtures required before any runtime adoption

- **G5-FN13 — `near_match_only`**: A route table fixture should enumerate every node/event/guard combination and assert the exact next edge or typed failure.
- **G5-FN14 — `near_match_only`**: A graph fixture should assert all success/error terminals are reachable where intended; no unauthorized node can reach handoff; handoff count is at most one.
- **G5-FN15 — `near_match_only`**: Cycle fixtures should cover productive cycles, repeated state digests, zero semantic progress, iteration/tool/token caps, and cancellation; caps terminate as `RESOURCE_EXHAUSTED` or `STALLED`, never success.
- **G5-FN16 — `near_match_only`**: Replay fixtures should permute crash boundaries around each transition and assert identical control state without repeating any recorded side effect.
- **G5-FN17 — `near_match_only`**: Reducer fixtures should permute concurrent update order and assert equality only for fields declared order-insensitive; conflict fields must fail closed.
- **G5-FN18 — `near_match_only`**: Interrupt fixtures should mutate or expire Plan/authority receipts before resume and assert refusal rather than stale continuation.
- **G5-FN19 — `near_match_only`**: Privacy fixtures should place canary secrets in private state and assert absence from default streams, traces, checkpoints, error strings, and network clients.
- **G5-FN20 — `near_match_only`**: The same framework-neutral fixture corpus should be run against any later LangGraph/Burr/Pydantic/custom adapter so runtime selection measures semantic conformance rather than API availability.
- **G5-FN21 — `insufficient`**: None of these fixtures has been implemented or executed; their efficacy and host compatibility remain unverified.

## Decision record for root synthesis

- **G5-D01 — `near_match_only`**: Carry the framework-neutral contract as `ADOPT_CANDIDATE`, with LangGraph, Agent Framework, LlamaIndex Workflows, Pydantic Graph, Haystack, and Burr as `REFERENCE_ONLY` semantic exemplars.
- **G5-D02 — `directly_supported`**: Treat AutoGen GraphFlow, Mastra, and CrewAI as `REFERENCE_ONLY`; do not deepen them unless another lane finds an exact host/runtime advantage absent from this screen. [S17–S19, S51–S56]
- **G5-D03 — `directly_supported`**: Treat Semantic Kernel Process Framework, Temporal, and Prefect as `OUT_OF_SCOPE` for the current thin-plugin target because of experimental status or required/broad control-plane behavior. [S57, S60, S64–S66]
- **G5-D04 — `insufficient`**: Do not select a runtime during `RESEARCH_ACTIVE(SK@v9-B)`; no candidate crossed the combined semantics, thinness, two-host, privacy, maintenance, and efficacy gate.
- **G5-D05 — `insufficient`**: If a later approved prototype is considered, first resolve host runtime/package constraints; then benchmark at most the neutral helper, LangGraph, Burr, and Pydantic Graph, because they span feature-complete, dependency-minimal, and typed-core design points. This is a research prioritization, not implementation authorization.

## Unknowns preserved

1. `insufficient`: current Codex and Claude Code plugin runtime/package-loading constraints and whether the same implementation language can remain host-native in both.
2. `insufficient`: exact native question/interrupt, cancellation, and one-plan handoff mapping in both hosts.
3. `insufficient`: Microsoft Agent Framework fixed Graph API cycle, per-key reducer, nested subgraph, and dedicated graph-test semantics.
4. `insufficient`: schema migration and cross-version checkpoint compatibility for every deep candidate.
5. `insufficient`: exactly-once behavior for external effects; no framework should receive that credit from checkpointing alone.
6. `insufficient`: default file/network behavior under the exact minimal installation of each candidate; no package was installed or traced.
7. `insufficient`: transitive dependencies, SBOMs, CVEs, signatures/provenance, reproducible builds, and transitive-license compatibility.
8. `insufficient`: installed size, cold start, memory, CPU, latency, and token cost in either host.
9. `insufficient`: private intent-state redaction adequacy under errors, debug streams, snapshots, and optional exporters.
10. `insufficient`: comparative ThyQuery efficacy, including routing accuracy, closure calibration, planner fidelity, user burden, no-harm, and repeated-run reliability.
11. `insufficient`: whether graph control adds value over the already-specified Ralph loop once model, tools, context, and inference budget are matched.
12. `insufficient`: final framework choice; this lane recommends preserving runtime neutrality until evidence clears the separate design and implementation gates.

## Official primary-source register

All sources were accessed `2026-08-03`. A missing update date means the official page did not expose one in the inspected rendering; it is not inferred.

### LangGraph

- **S01** — LangGraph Graph API; update date not exposed. <https://docs.langchain.com/oss/python/langgraph/graph-api>
- **S02** — LangGraph Persistence; update date not exposed. <https://docs.langchain.com/oss/python/langgraph/persistence>
- **S03** — LangGraph Interrupts; update date not exposed. <https://docs.langchain.com/oss/python/langgraph/interrupts>
- **S04** — LangGraph Subgraphs; update date not exposed. <https://docs.langchain.com/oss/python/langgraph/use-subgraphs>
- **S05** — LangGraph Streaming; update date not exposed. <https://docs.langchain.com/oss/python/langgraph/streaming>
- **S06** — LangGraph testing, package declaration, and MIT license; repository head inspected 2026-08-03. <https://docs.langchain.com/oss/python/langgraph/test> · <https://github.com/langchain-ai/langgraph/blob/main/libs/langgraph/pyproject.toml> · <https://github.com/langchain-ai/langgraph/blob/main/LICENSE>
- **S07** — LangGraph releases; 1.2.10 published 2026-07-28. <https://github.com/langchain-ai/langgraph/releases>
- **S08** — LangSmith evaluation/privacy/masking documentation; update dates not exposed. <https://docs.langchain.com/langsmith/evaluation> · <https://docs.langchain.com/langsmith/mask-inputs-outputs> · <https://docs.langchain.com/langsmith/data-storage-and-privacy>

### Microsoft Agent Framework and AutoGen

- **S09** — Agent Framework Workflows overview; updated 2026-04-29. <https://learn.microsoft.com/en-us/agent-framework/workflows/>
- **S10** — Agent Framework workflow execution/graph semantics; updated 2026-07-10. <https://learn.microsoft.com/en-us/agent-framework/workflows/workflows>
- **S11** — Agent Framework workflow state; update date not exposed. <https://learn.microsoft.com/en-us/agent-framework/workflows/state>
- **S12** — Agent Framework HITL and Python `WorkflowCheckpoint` API; update dates not exposed. <https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop> · <https://learn.microsoft.com/en-us/python/api/agent-framework-core/agent_framework.workflowcheckpoint?view=agent-framework-python-latest>
- **S13** — Agent Framework observability and safety; update dates not exposed. <https://learn.microsoft.com/en-us/agent-framework/workflows/observability> · <https://learn.microsoft.com/en-us/agent-framework/agents/safety>
- **S14** — Agent Framework Python core declaration and MIT license; repository head inspected 2026-08-03. <https://github.com/microsoft/agent-framework/blob/main/python/packages/core/pyproject.toml> · <https://github.com/microsoft/agent-framework/blob/main/LICENSE>
- **S15** — Agent Framework Python 1.13.0 release, published 2026-07-30. <https://github.com/microsoft/agent-framework/releases/tag/python-1.13.0>
- **S16** — Agent Framework migration overview; update date not exposed. <https://learn.microsoft.com/en-us/agent-framework/migration-guide/>
- **S17** — AutoGen GraphFlow; development documentation, update date not exposed. <https://microsoft.github.io/autogen/dev/user-guide/agentchat-user-guide/graph-flow.html>
- **S18** — AutoGen-to-Agent-Framework migration guide; update date not exposed. <https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/>
- **S19** — AutoGen repository, code license, and releases; repository head inspected 2026-08-03. <https://github.com/microsoft/autogen> · <https://github.com/microsoft/autogen/blob/main/LICENSE-CODE> · <https://github.com/microsoft/autogen/releases>

### LlamaIndex Agent Workflows

- **S20** — Workflows overview plus branches/loops; update dates not exposed. <https://developers.llamaindex.ai/python/llamaagents/workflows/> · <https://developers.llamaindex.ai/python/llamaagents/workflows/branches_and_loops/>
- **S21** — Concurrent execution; update date not exposed. <https://developers.llamaindex.ai/python/llamaagents/workflows/concurrent_execution/>
- **S22** — Managing state; update date not exposed. <https://developers.llamaindex.ai/python/llamaagents/workflows/managing_state/>
- **S23** — Human in the loop; update date not exposed. <https://developers.llamaindex.ai/python/llamaagents/workflows/human_in_the_loop/>
- **S24** — Durable workflows; update date not exposed. <https://developers.llamaindex.ai/python/llamaagents/workflows/durable_workflows/>
- **S25** — Workflow testing and observability; update dates not exposed. <https://developers.llamaindex.ai/python/llamaagents/workflows/testing/> · <https://developers.llamaindex.ai/python/llamaagents/workflows/observability/>
- **S26** — Python package declaration, MIT license, and releases; repository head inspected 2026-08-03. <https://github.com/run-llama/llama-agents/blob/main/packages/llama-index-workflows/pyproject.toml> · <https://github.com/run-llama/llama-agents/blob/main/LICENSE> · <https://github.com/run-llama/llama-agents/releases>
- **S27** — Official TypeScript workflows repository; archived 2026-04-30. <https://github.com/run-llama/workflows-ts>

### Pydantic Graph

- **S28** — Pydantic Graph overview; update date not exposed. <https://pydantic.dev/docs/ai/graph/graph/>
- **S29** — Graph Builder, decisions, and joins; update dates not exposed. <https://pydantic.dev/docs/ai/graph/builder/> · <https://pydantic.dev/docs/ai/graph/builder/decisions/> · <https://pydantic.dev/docs/ai/graph/builder/joins/>
- **S30** — Pydantic AI changelog, v2 graph persistence removal; update date not exposed. <https://pydantic.dev/docs/ai/project/changelog/>
- **S31** — Logfire integration/privacy controls; update date not exposed. <https://pydantic.dev/docs/ai/integrations/logfire/>
- **S32** — Pydantic AI testing guide; update date not exposed. <https://pydantic.dev/docs/ai/guides/testing/>
- **S33** — Pydantic Graph package declaration and MIT license; repository head inspected 2026-08-03. <https://github.com/pydantic/pydantic-ai/blob/main/pydantic_graph/pyproject.toml> · <https://github.com/pydantic/pydantic-ai/blob/main/LICENSE>
- **S34** — Pydantic AI 2.22.0 release, published 2026-08-01. <https://github.com/pydantic/pydantic-ai/releases/tag/v2.22.0>
- **S35** — Pydantic Graph API; update date not exposed. <https://pydantic.dev/docs/ai/api/pydantic_graph/graph_builder/>

### Haystack

- **S36** — Haystack 3.0 Pipelines; update date not exposed. <https://docs.haystack.deepset.ai/docs/pipelines>
- **S37** — Pipeline breakpoints; update date not exposed. <https://docs.haystack.deepset.ai/docs/pipeline-breakpoints>
- **S38** — Agent State and SuperComponents; update dates not exposed. <https://docs.haystack.deepset.ai/docs/state> · <https://docs.haystack.deepset.ai/docs/supercomponents>
- **S39** — Haystack tracing and telemetry; update dates not exposed. <https://docs.haystack.deepset.ai/docs/tracing> · <https://docs.haystack.deepset.ai/docs/telemetry>
- **S40** — Haystack 3.0.0 release, published 2026-07-20. <https://github.com/deepset-ai/haystack/releases/tag/v3.0.0>
- **S41** — Haystack package declaration; repository head inspected 2026-08-03. <https://github.com/deepset-ai/haystack/blob/main/pyproject.toml>
- **S42** — Haystack Apache-2.0 license; repository head inspected 2026-08-03. <https://github.com/deepset-ai/haystack/blob/main/LICENSE>

### Apache Burr

- **S43** — Burr overview, State, and Transitions; update dates not exposed. <https://burr.dagworks.io/concepts/overview/> · <https://burr.dagworks.io/concepts/state/> · <https://burr.dagworks.io/concepts/transitions/>
- **S44** — Burr State Persistence; update date not exposed. <https://burr.dagworks.io/concepts/state-persistence/>
- **S45** — Burr State Typing; update date not exposed. <https://burr.dagworks.io/concepts/state-typing/>
- **S46** — Burr Parallelism; update date not exposed. <https://burr.dagworks.io/concepts/parallelism/>
- **S47** — Burr Streaming Actions; update date not exposed. <https://burr.dagworks.io/concepts/streaming-actions/>
- **S48** — Burr local Tracking and test-case creation; update dates not exposed. <https://burr.dagworks.io/concepts/tracking/> · <https://burr.dagworks.io/examples/guardrails/creating_tests/>
- **S49** — Burr package declaration and Apache-2.0 license; repository head inspected 2026-08-03. <https://github.com/apache/burr/blob/main/pyproject.toml> · <https://github.com/apache/burr/blob/main/LICENSE>
- **S50** — Burr 0.42.0-incubating release, published 2026-05-10. <https://github.com/apache/burr/releases/tag/v0.42.0-incubating>

### Screen-only frameworks

- **S51** — Mastra workflow snapshots; update date not exposed. <https://mastra.ai/en/reference/workflows/snapshots>
- **S52** — Mastra repository/core package and licensing; repository head inspected 2026-08-03. <https://github.com/mastra-ai/mastra> · <https://github.com/mastra-ai/mastra/blob/main/packages/core/package.json>
- **S53** — Mastra core 1.55.0 release, published 2026-07-31. <https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.55.0>
- **S54** — CrewAI Flows; documentation version 1.15.10 inspected 2026-08-03. <https://docs.crewai.com/en/concepts/flows>
- **S55** — CrewAI repository/package declaration and MIT license; repository head inspected 2026-08-03. <https://github.com/crewAIInc/crewAI> · <https://github.com/crewAIInc/crewAI/blob/main/lib/crewai/pyproject.toml>
- **S56** — CrewAI 1.15.10 release, published 2026-07-31. <https://github.com/crewAIInc/crewAI/releases/tag/1.15.10>
- **S57** — Semantic Kernel Process Framework; updated 2024-11-08. <https://learn.microsoft.com/en-us/semantic-kernel/frameworks/process/process-framework>
- **S58** — Semantic Kernel Process core components; updated 2024-09-28. <https://learn.microsoft.com/en-us/semantic-kernel/frameworks/process/process-core-components>
- **S59** — Semantic Kernel-to-Agent-Framework migration guide; update date not exposed. <https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/>
- **S60** — Temporal documentation and Service deployment choices; update date not exposed. <https://docs.temporal.io/>
- **S61** — Temporal Python SDK 1.31.0 release, published 2026-07-29. <https://github.com/temporalio/sdk-python/releases/tag/1.31.0>
- **S62** — Temporal Python SDK MIT license; repository head inspected 2026-08-03. <https://github.com/temporalio/sdk-python/blob/main/LICENSE>
- **S63** — Prefect 3 flows; update date not exposed. <https://docs.prefect.io/v3/concepts/flows>
- **S64** — Prefect workflow testing; update date not exposed. <https://docs.prefect.io/v3/how-to-guides/workflows/test-workflows>
- **S65** — Prefect REST API and local server surface; update date not exposed. <https://docs.prefect.io/v3/api-ref/rest-api>
- **S66** — Prefect package, Apache-2.0 license, and 3.8.1 release (published 2026-07-30); repository head inspected 2026-08-03. <https://github.com/PrefectHQ/prefect/blob/main/pyproject.toml> · <https://github.com/PrefectHQ/prefect/blob/main/LICENSE> · <https://github.com/PrefectHQ/prefect/releases/tag/3.8.1>

## Completion attestation

- Source records: `66` (all official primary records; several records group adjacent pages from the same official project).
- Frameworks screened: `12`; frameworks deeply compared: `6`.
- Descendant agents spawned: `0`.
- Unknowns retained: `12`; none promoted to fact.
- Scope outcome: research artifact only; no framework selected, installed, prototyped, or approved.

## Integrity receipt

- Integrity scope: UTF-8 bytes from line 1 through line 343, ending immediately before this heading.
- Payload line count: `343`.
- Payload SHA-256: `012872114e9c4032625c53667a0034946e68cb4725270f308b7ea5780019069b`.
- Note: the whole-file digest is reported to the root separately because embedding it would change the file being hashed.
