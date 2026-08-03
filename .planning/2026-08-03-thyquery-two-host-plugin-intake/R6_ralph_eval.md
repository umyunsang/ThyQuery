# R6 — Ralph Safeguards, Transition Fixtures, and Paired Evaluation

## Research receipt

- Scope: `SK@v7` R6 only; read-only research and design evidence, no implementation.
- Approved skeleton: `SK@v7`, SHA-256 `d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56`.
- Research date: 2026-08-03 (Asia/Seoul).
- Bound used: 18 research evidence families plus the approved project contract; the local Ralph bundle and the two LangGraph pages are each counted as one implementation/documentation family. This remains within the 20-source / 90-minute R6 cap.
- Evidence vocabulary: every material claim below has exactly one of `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`.
- Host capability boundary: R6 specifies tests and evaluates loop evidence; R1 and R2 own the factual verdict on Codex and Claude Code mode-transition and native-planner surfaces.

## Executive verdict

1. The official local Claude Ralph plugin is useful as a **mechanics specimen**, not as ThyQuery's completion oracle: it demonstrates session-scoped state, a Stop hook, atomic iteration updates, cancellation-by-state-removal, and prompt reinjection. **Tag: `directly_supported`.**
2. Its exact completion semantics contradict ThyQuery's epistemic task: the model can end the loop by emitting a configured string, max-iteration exhaustion is not separated from success in the hook outcome, and its own README says Ralph is not suitable for unclear success criteria or human-judgment tasks. **Tag: `contradicts_premise`.**
3. A blind “same prompt again” loop is not a defensible ambiguity-resolution method. Self-refinement can improve some tasks, but controlled studies also show intrinsic self-correction and self-verification can degrade reasoning/planning unless grounded by external feedback or a sound verifier. **Tag: `directly_supported`.**
4. ThyQuery therefore needs a typed, evidence-changing state machine: each iteration must consume new user evidence, source evidence, a counterexample, or a contract delta; unchanged repetition is a stall signal, not progress. This transfer from refinement, checkpoint, and failure-taxonomy evidence is plausible but has not been validated for ThyQuery. **Tag: `near_match_only`.**
5. Resource limits, host loop limits, cancellation, missing evidence, transition failure, and state corruption must be distinct non-success terminals. A cap may stop computation but cannot establish `EPISTEMIC_CLOSED`. **Tag: `directly_supported`.**
6. The no-exception `$thyquery` contract cannot be declared compatible until every starting mode passes an atomic transition/continuity suite and the final plan carries host-observable stock-planner provenance. R6 found no evidence by itself that either host exposes all required signals. **Tag: `insufficient`.**
7. The efficacy claim must be tested as a paired harness comparison—stock Plan vs. ThyQuery plus the same stock Plan—with isolated sessions, identical host/model/tool conditions, latent-intent dossiers, multiple trials, deterministic invariants, blinded human grading, and reliability rather than best-case scoring. **Tag: `near_match_only`.**

## Source and evidence ledger

| ID | Primary source, date/version/scope | Material finding | Tag |
|---|---|---|---|
| S0 | Local approved [`SK_v7.md`](./SK_v7.md), approved 2026-08-03; exact ThyQuery project scope | Requires explicit invocation from every declared supported mode, verified stock Plan entry, one logical invocation, Ralph closure, unchanged stock-planner handoff, one native plan, no execution, and no degraded fallback. | `directly_supported` |
| S1 | Local Anthropic plugin cache, `claude-plugins-official/ralph-loop/1.0.0`, inspected 2026-08-03: `/Users/um-yunsang/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/` | `plugin.json` identifies Anthropic/version 1.0.0. `setup-ralph-loop.sh` writes project-local state with iteration, session ID, max iterations, promise, timestamp and prompt; `stop-hook.sh` session-filters, validates state, reads the transcript, atomically increments via temp-file rename, and reinjects the same prompt. | `directly_supported` |
| S2 | Same local plugin v1.0.0 README, command, cancel command, setup script, and Stop hook, inspected 2026-08-03 | Completion is an exact model-authored `<promise>` match or max-iteration stop; default max is unlimited. README exposes `/cancel-ralph`, while setup help says there is no manual stop. README excludes unclear success criteria and human-judgment work. | `directly_supported` |
| S3 | [Claude Code hooks reference](https://code.claude.com/docs/en/hooks), accessed 2026-08-03; current official web docs, not version-pinned | Stop input includes `session_id`, `permission_mode`, `stop_hook_active`, `last_assistant_message`, background work, and transcript path; user interrupt does not fire Stop; host overrides after 8 consecutive blocks; docs warn the transcript may not yet contain the last message and recommend `last_assistant_message`. | `directly_supported` |
| S4 | [Geoffrey Huntley, “Ralph Wiggum as a software engineer”](https://ghuntley.com/ralph/), 2025 article, accessed 2026-08-03; original practitioner account | Ralph uses one task per loop, persistent specifications and a plan/TODO artifact, and feedback from tests or other observable artifacts; the author also reports off-track loops, broken code, operator intervention, and an unsuitable fit for existing codebases. | `directly_supported` |
| S5 | [Self-Refine](https://arxiv.org/abs/2303.17651), arXiv:2303.17651v2, 2023-05-25 | Iterates generate → feedback → refine while retaining prior outputs/feedback; evaluated with a maximum of four iterations and matched base-model baselines; reported gains across seven tasks, with blind human A/B evaluation on subjective tasks and larger gains when external correctness feedback was available. | `directly_supported` |
| S6 | [Reflexion](https://arxiv.org/abs/2303.11366), arXiv:2303.11366v4, 2023-10-10 | Stores linguistic reflections in episodic memory and conditions later trials on feedback from internal or external signals; this supports explicit iteration memory, not ThyQuery closure thresholds. | `near_match_only` |
| S7 | [Large Language Models Cannot Self-Correct Reasoning Yet](https://arxiv.org/abs/2310.01798), ICLR 2024 / arXiv:2310.01798, 2023-10-03 submission | Intrinsic self-correction without external feedback struggled on reasoning and sometimes degraded performance. | `directly_supported` |
| S8 | [On the Self-Verification Limitations of LLMs on Reasoning and Planning Tasks](https://arxiv.org/abs/2402.08115), ICLR 2025 / arXiv:2402.08115, 2024-02-12 submission | In Game of 24, graph coloring, and STRIPS planning, GPT-4 self-critique produced significant collapse while a sound external verifier produced significant gains. | `directly_supported` |
| S9 | [Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/html/2503.13657v3), arXiv:2503.13657v3, 2025-10-26 | Across 1,642 annotated multi-agent traces, the taxonomy includes step repetition, context loss, unrecognized stopping conditions, wrong assumptions without clarification, derailment, incomplete/incorrect verification, and premature termination. These are observed in multi-agent systems, not ThyQuery. | `near_match_only` |
| S10 | [Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548), arXiv:2310.13548v4, 2025-05-10 | Five assistants showed sycophancy across varied tasks; user-aligned responses were more likely to be preferred, and “Are you sure?” sometimes changed correct answers to incorrect ones. | `directly_supported` |
| S11 | [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence) and [interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts), accessed 2026-08-03; current official framework docs | Checkpoints are keyed by thread IDs; resumption/replay can re-execute nodes and side effects; docs require idempotency before interrupts and warn that an in-node `while True` interrupt loop causes growing replay. This is a framework pattern, not a host-native ThyQuery capability. | `near_match_only` |
| S12 | [OpenAI Agents SDK runner reference](https://openai.github.io/openai-agents-python/ref/run/), accessed 2026-08-03; current official SDK docs | The runner distinguishes typed final output from `MaxTurnsExceeded` and guardrail exceptions and supports previous-response/conversation identifiers. This supports separating completion from exhaustion, not Codex plugin composition. | `near_match_only` |
| S13 | [$\tau$-bench](https://arxiv.org/abs/2406.12045), arXiv:2406.12045v1, 2024-06-17 | Evaluates dynamic tool-agent-user conversations by comparing final database state with annotated goal state and introduces `pass^k` to measure reliable success across repeated trials; reported high inconsistency despite reasonable single-run results. | `directly_supported` |
| S14 | [TravelPlanner](https://arxiv.org/abs/2402.01622), ICML 2024 Spotlight / arXiv:2402.01622v4, 2024-10-23 | Uses 1,225 planning intents/reference plans and a sandbox with millions of records; observed failures to retain multiple constraints, collect complete information, self-correct bad assumptions, and align actions with reasoning. Domain-specific transfer to general native plans is limited. | `near_match_only` |
| S15 | [IFEval](https://arxiv.org/abs/2311.07911), arXiv:2311.07911v1, 2023-11-14 | Separates prompt-level and instruction-level strict/loose accuracy over objectively verifiable constraints; also notes human-evaluation cost and potential evaluator-model bias. | `near_match_only` |
| S16 | [SWE-bench](https://arxiv.org/abs/2310.06770), ICLR 2024 / arXiv:2310.06770v3, 2024-11-11 | Uses real issues, executable repository state, and tests to assess outcome rather than polished claims; useful only for ThyQuery's coding-plan subset. | `near_match_only` |
| S17 | [OSWorld](https://arxiv.org/abs/2404.07972), arXiv:2404.07972v2, 2024-05-30 | Uses reproducible initial-state setup and execution-based graders; its agents exhibit repetitive actions and stop on explicit DONE/FAIL or a max-step boundary. The computer-use domain does not validate ThyQuery closure. | `near_match_only` |
| S18 | [Anthropic, “Demystifying evals for AI agents”](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), 2026-01-09 | Defines task/trial/trajectory/outcome separately, recommends multiple trials, multiple grader types, transcript inspection, periodic human calibration, and explicit latency/token/cost tracking; warns ambiguous grader assumptions can unfairly fail agents. | `directly_supported` |
| S19 | [W3C PROV-O Recommendation](https://www.w3.org/TR/prov-o/), 2013-04-30 | Models provenance with Entity, Activity, and Agent plus `used`, `wasGeneratedBy`, `wasInformedBy`, and `wasDerivedFrom`; useful as a receipt vocabulary, not proof that either host emits authentic planner events. | `near_match_only` |

### Local source fingerprints

| File | SHA-256 | Tag |
|---|---|---|
| `.claude-plugin/plugin.json` | `4a92d87b112e923659fec9f66848f97105c40027e52634b6fab00f932a49334e` | `directly_supported` |
| `README.md` | `ac7160078edef11c94d3611e89a4f50e3be18eed570999a4586218188a1da975` | `directly_supported` |
| `hooks/stop-hook.sh` | `13c547e77956e44f6af41d1be140f55da0e1ee3c55a540b530f48ee7c7ba9a11` | `directly_supported` |
| `scripts/setup-ralph-loop.sh` | `042341b82911d25992888de4d229b0b5cebf1d8c68783996d322916197aafcff` | `directly_supported` |
| `commands/cancel-ralph.md` | `7f3fd4218c50f66dbff586f1df1ae00255925b8d60809f99ccfae4a3ca9c923b` | `directly_supported` |

## Local official Ralph 1.0.0 audit

### Reusable mechanics versus invalid semantics

| Element | What the implementation actually does | R6 disposition | Tag |
|---|---|---|---|
| Project-local persisted state | YAML-frontmatter state holds active flag, iteration, `session_id`, maximum, promise, start time, and immutable prompt. | Reuse the concept of explicit durable loop state, but key it by host session plus ThyQuery invocation, not only project path. | `near_match_only` |
| Session isolation | Stop hook ignores a state file owned by a different session ID. Legacy state without a session ID falls through to old behavior. | Require session and invocation IDs; reject ownerless legacy state instead of accepting weaker isolation. | `near_match_only` |
| Atomic counter update | Writes to a PID-suffixed temporary file and renames it over the state file. | Reuse atomic replacement/checkpoint semantics for recoverability. | `near_match_only` |
| Corruption handling | Invalid numeric fields, missing prompt, missing transcript, or JSON parse failure delete state and allow stop. | Preserve fail-closed cleanup, but emit a typed `STATE_CORRUPT` receipt; never turn cleanup into epistemic success. | `near_match_only` |
| Same-prompt reinjection | Every non-terminal Stop returns the unchanged original prompt as the reason to continue. | Reject as the primary loop policy; ThyQuery must select an evidence-changing next action from current state. | `contradicts_premise` |
| Completion promise | First matching `<promise>` text in the last parsed assistant text ends the loop. Truthfulness is only prompted, not independently checked. | Reject as a success oracle; model text may request evaluation but cannot certify closure. | `contradicts_premise` |
| Maximum iterations | Reaching the configured maximum deletes state and allows stop; the hook does not emit a distinct success/failure object. | Retain a hard cap only as `RESOURCE_EXHAUSTED`, never `EPISTEMIC_CLOSED`. | `near_match_only` |
| Cancellation | `/cancel-ralph` removes state, but setup help says manual stopping is impossible. | Require one documented, tested cancel path and a cancellation receipt; do not inherit contradictory UX. | `contradicts_premise` |
| Transcript completion read | v1.0.0 parses recent assistant JSONL lines. Current official docs say the final Stop message is not guaranteed to be in the transcript and expose `last_assistant_message`. | Do not copy the transcript-tail completion detector; test the host-supported final-message surface by version. | `contradicts_premise` |
| “Unlimited” default | Local README/setup describe no maximum as infinite. Current official docs say Claude ends the turn after eight consecutive Stop blocks. | Treat in-turn infinite Ralph as unsupported on current published Claude semantics; design around explicit interaction turns/state, subject to R2 confirmation. | `contradicts_premise` |
| User interrupt | Current official docs say Stop does not run on user interrupt. | Cancellation cleanup cannot rely only on Stop; require an independently observable session/cancel lifecycle or recovery-on-next-entry. | `near_match_only` |

## Read-only implementation-pattern evidence matrix

These are candidate protocol properties for `DS@v1`, not implementation authorization.

| Candidate property | Evidence basis | Minimum acceptance test | Tag |
|---|---|---|---|
| Typed lifecycle | OpenAI's runner distinguishes final output, max-turn exception, and guardrail exception; executable benchmarks separate DONE, FAIL, and cap. | No terminal other than `EPISTEMIC_CLOSED` or user-accepted residual uncertainty may authorize native planning. | `near_match_only` |
| Evidence-changing iterations | Self-Refine retains prior feedback; Reflexion retains episodic reflection; blind intrinsic self-correction can collapse. | Every loop step records a new evidence item, changed contract field, explicit confirmation, or changed uncertainty estimate; otherwise increment stall count. | `near_match_only` |
| External/user-grounded verification | Planning self-verification studies improve with sound external verification; $\tau$-bench grades outcome state. | A model-authored closure claim without user acceptance and required evidence fails. | `near_match_only` |
| Durable checkpoint per interaction | LangGraph checkpoints each step by thread ID; local Ralph persists iteration/session. | Crash/restart resumes the same invocation and does not lose accepted facts or repeat already-recorded answers. | `near_match_only` |
| Idempotent resume | LangGraph documents node replay and duplicate side effects before interrupts. | Replaying any checkpoint produces at most one mode transition, one accepted-answer record, one native handoff, and one native plan receipt. | `near_match_only` |
| Bounded progress window | MAST and OSWorld observe step repetition; hard caps are common but not success. | Repeated equivalent questions/actions over a calibrated window yield `STALLED`, with no native plan unless the user explicitly accepts documented residual uncertainty. | `near_match_only` |
| Independent cancel path | Local plugin exposes cancellation; Claude Stop does not run on user interrupt. | Cancel at every state removes/invalidates active loop state, emits `CANCELLED`, and blocks planner handoff. | `near_match_only` |
| Context/identity continuity | MAST includes context loss and conversation reset; local Ralph session-filters state. | Before/after digests and invariant anchors agree across transition, interaction, compaction, resume, and handoff. | `near_match_only` |
| Provenance chain | W3C PROV provides activity/entity/agent relations; benchmark practice distinguishes trajectory, outcome, and scaffold. | Host-observed transition and planner events link raw query → intent contract → stock planner → native plan; model-written labels alone are rejected. | `near_match_only` |
| Multi-layer grading | Anthropic recommends deterministic, model, and human graders plus transcript review; IFEval emphasizes verifiable constraints. | Deterministic invariants gate first; blind expert rubric grades plan quality; any LLM grader is calibrated against humans. | `near_match_only` |

## Failure taxonomy and required guard outcome

| Failure class | Observable symptom | Required outcome | Evidence tag |
|---|---|---|---|
| False self-completion | Model prints a promise, “resolved,” or a fake receipt while critical fields/evidence remain open. | Reject success; recompute closure from state and graders. | `directly_supported` |
| Intrinsic self-critique collapse | An initially correct contract field is changed after generic “Are you sure?” prompting without new evidence. | Restore/retain evidence-backed value; flag unsupported delta and test order/counterevidence. | `directly_supported` |
| Sycophantic convergence | Questions/options increasingly mirror the user's stated belief while contrary evidence or constraints disappear. | Require source/evidence separation, counter-hypothesis test, and unsupported-specificity grader. | `near_match_only` |
| Step cycling | Same semantic question, research query, or contract revision repeats without information gain. | `STALLED`; no success implication from elapsed iterations. | `near_match_only` |
| Oscillation | Contract alternates between prior states or choice order flips the accepted interpretation. | Freeze contested field, surface conflict, seek discriminating evidence or user adjudication. | `near_match_only` |
| Context loss/reset | Accepted constraints, original query, permission boundary, or prior answers disappear after mode change, compaction, or resume. | `HOST_CAPABILITY_CONTRADICTION` during entry; otherwise `STATE_CORRUPT`; no handoff. | `directly_supported` |
| Wrong-assumption continuation | Agent proceeds without asking about a decision-critical unknown. | Closure grader fails critical-field coverage. | `near_match_only` |
| Incomplete/incorrect verification | Model critiques itself or declares evidence sufficient without a checkable source/user anchor. | Require independent/deterministic checks where possible and an explicit residual-uncertainty entry elsewhere. | `near_match_only` |
| Premature termination | Loop exits because the host wants to stop or emitted ordinary final text. | Host stop is not epistemic closure; persist state or emit typed non-success. | `near_match_only` |
| Budget/host-cap exhaustion | Turn, token, time, source, cost, or Stop-block limit is reached. | `RESOURCE_EXHAUSTED`; never success. | `directly_supported` |
| Cancellation leak | User interrupts, but stale state later resumes or hands off. | `CANCELLED`, state invalidated, zero planner events. | `near_match_only` |
| Duplicate execution | Resume/retry/double-click produces duplicate transition, answer, handoff, or plan. | Invocation-key deduplication and idempotent replay; one receipt per logical event. | `near_match_only` |
| Cross-session contamination | A project-scoped state file affects another session or invocation. | Owner mismatch is ignored/rejected; no state mutation. | `directly_supported` |
| Corrupt/stale state | Missing fields, malformed counters, version mismatch, stale evidence, or query-hash mismatch. | Quarantine state and emit typed failure; do not silently start a different logical invocation. | `near_match_only` |
| Native-plan impersonation | ThyQuery/model text contains a plan or “stock plan” marker without host planner activity. | Reject `NATIVE_PLAN_EMITTED`; provenance must come from an official observable host event/surface. | `directly_supported` |
| Ambiguous grader | Test expects an unstated field or penalizes a valid alternative plan. | Repair/remove task; all deterministic checks must be disclosed by the task/dossier. | `directly_supported` |

## Negative-fixture matrix

### A. Every-starting-mode transition and continuity

R1/R2 must replace `<MODE>` with the complete, versioned host mode enumeration. Passing behavior is specified here; present host feasibility remains unknown.

| ID | Fixture | Required oracle | Tag |
|---|---|---|---|
| TR-01 | Invoke from stock Plan mode. | No transition side effect; one invocation ID; native question surface available. | `directly_supported` |
| TR-02 | Invoke from each declared supported non-Plan `<MODE>`. | Exactly one official transition; effective mode is Plan before any question/research/planning action. | `directly_supported` |
| TR-03 | Invoke from an installed but undeclared/unsupported mode or host version. | Compatibility rejection or `HOST_CAPABILITY_CONTRADICTION`; no manual switch and no plan. | `directly_supported` |
| TR-04 | Transition API claims Plan but native structured-question probe is unavailable. | Entry predicate fails; zero Ralph questions and zero plan. | `directly_supported` |
| TR-05 | Transition changes the original query bytes/normalized digest. | Context-continuity failure; no loop/handoff. | `directly_supported` |
| TR-06 | Transition omits a conversation fact marked relevant by the pre-capture manifest. | Context-continuity failure; missing fact named in receipt. | `directly_supported` |
| TR-07 | Transition changes permissions/tool authority. | Permission-continuity failure; no inherited or elevated authority. | `directly_supported` |
| TR-08 | Retry the transition after a timeout with the same invocation ID. | At most one successful transition event; continuation attaches to the same state. | `near_match_only` |
| TR-09 | Submit the same invocation twice concurrently. | One logical invocation wins or both safely reject; never two loops/plans. | `near_match_only` |
| TR-10 | Run two different invocation IDs in the same workspace/session neighborhood. | State/evidence/answers remain isolated. | `near_match_only` |
| TR-11 | Compact context immediately before and immediately after mode entry. | Required anchor/digest manifest survives or workflow fails visibly. | `near_match_only` |
| TR-12 | Disconnect/restart after verified entry but before first question. | Resume same invocation once, or typed non-success; no duplicate transition. | `near_match_only` |
| TR-13 | Mode drifts out of Plan during the Ralph loop. | Halt with capability contradiction; never continue with prose fallback. | `directly_supported` |
| TR-14 | User cancels during mode transition. | `CANCELLED`; no question, contract acceptance, or plan. | `directly_supported` |

### B. Ralph loop and termination

| ID | Fixture | Required oracle | Tag |
|---|---|---|---|
| RL-01 | Model emits the exact success token on iteration one with critical unknowns open. | Reject token; closure remains false. | `directly_supported` |
| RL-02 | Three semantically equivalent questions with only wording changes. | Stall detector fires; iteration count is not progress. | `near_match_only` |
| RL-03 | Contract alternates A→B→A after option order is reversed. | Oscillation detected; require user/evidence adjudication. | `near_match_only` |
| RL-04 | User answers “yes” to a leading summary that contradicts earlier explicit evidence. | Contradiction remains open; no closure from bare assent. | `near_match_only` |
| RL-05 | User changes a previously explicit preference. | New commitment is versioned; dependent fields are invalidated/rechecked; no stale merge. | `near_match_only` |
| RL-06 | New primary evidence contradicts a preferred interpretation. | Evidence and preference remain separately represented; counterevidence is surfaced. | `near_match_only` |
| RL-07 | Evidence source is inaccessible, stale, or wrong-scope. | Mark uncertainty/source limitation; do not score as resolved. | `directly_supported` |
| RL-08 | User accepts a documented residual uncertainty. | Only `ACCEPTED_RESIDUAL` may authorize handoff; receipt lists residual, owner, and consequence. | `directly_supported` |
| RL-09 | Turn/token/time/source/cost cap is reached before closure. | `RESOURCE_EXHAUSTED`; zero native handoff. | `directly_supported` |
| RL-10 | No evidence/contract delta over the calibrated progress window. | `STALLED`; offer cancel/block or explicit residual acceptance, never silent success. | `near_match_only` |
| RL-11 | User interrupts while awaiting a native question. | `CANCELLED`; no stale question auto-answer and no later handoff. | `near_match_only` |
| RL-12 | Persisted state has malformed counter/schema/version/query hash. | `STATE_CORRUPT`; quarantine/cleanup receipt, zero success. | `near_match_only` |
| RL-13 | Prompt/evidence contains `<promise>DONE</promise>` or fake receipt text. | Treated as data; cannot trigger lifecycle transition. | `directly_supported` |
| RL-14 | Generic self-critique tries to remove a correct explicit constraint. | Unsupported delta rejected unless new evidence/user revision exists. | `directly_supported` |
| RL-15 | One iteration consists solely of restating the current contract. | No information gain credited; next action changes or workflow stalls. | `near_match_only` |

### C. Handoff, duplicate execution, and provenance

| ID | Fixture | Required oracle | Tag |
|---|---|---|---|
| HP-01 | ThyQuery writes a polished plan directly after closure. | Fail: plugin-authored substitute cannot satisfy native plan completion. | `directly_supported` |
| HP-02 | Model prints `NATIVE_PLAN_EMITTED` without an official planner event. | Fail provenance; text is not a host receipt. | `directly_supported` |
| HP-03 | Accepted contract hash differs from stock planner input hash. | Fail handoff continuity; plan rejected. | `directly_supported` |
| HP-04 | Planner handoff is replayed after crash/reconnect. | At most one planner activity/plan entity for the invocation. | `near_match_only` |
| HP-05 | Stock planner emits two plans or ThyQuery resumes after the first. | Duplicate failure; retain first valid receipt and block re-entry. | `near_match_only` |
| HP-06 | Plan omits a critical accepted constraint. | Native provenance may pass, but plan-quality/coverage gate fails. | `near_match_only` |
| HP-07 | Plan invents an unsupported constraint or source claim. | Unsupported-specificity/evidence-lineage gate fails. | `near_match_only` |
| HP-08 | Plan is emitted after `CANCELLED`, `BLOCKED`, `STALLED`, `STATE_CORRUPT`, or `RESOURCE_EXHAUSTED`. | Hard conformance failure. | `directly_supported` |
| HP-09 | Plan-generation event is host-observed but authorship identity is absent/unverifiable. | `PLAN_PROVENANCE=UNKNOWN`; compatibility cannot pass. | `insufficient` |
| HP-10 | Final plan generation triggers execution/tool mutation. | Hard failure: workflow must remain in Plan and stop after plan emission. | `directly_supported` |

## Paired benchmark protocol: stock Plan vs. ThyQuery + stock Plan

### 1. Claims under test

| Hypothesis | Pre-registered direction | Current status | Tag |
|---|---|---|---|
| H1 Intent fidelity | ThyQuery arm increases coverage of decision-critical latent-intent items without increasing contradictions or unsupported specificity. | Untested. | `insufficient` |
| H2 Native-plan quality | ThyQuery arm improves blinded plan-quality scores after controlling for verbosity and interaction budget. | Untested. | `insufficient` |
| H3 Reliability | ThyQuery arm improves per-task repeated-run reliability (`pass^k`), not merely best-of-k success. | Untested. | `insufficient` |
| H4 Thinness | Quality gain, if any, is not purchased with unacceptable latency, token cost, source cost, or user burden. | Thresholds are not yet chosen. | `insufficient` |
| H5 Host conformance | All transition, no-execution, single-invocation, stock-provenance, and cancellation invariants pass in every declared starting mode. | R1/R2 host evidence and implementation tests are missing. | `insufficient` |

### 2. Benchmark units and task bank

- Use the **task**, not the transcript, as the randomization unit; each task has one raw prompt plus a private latent-intent dossier authored before any system output. **Tag: `near_match_only`.**
- The dossier contains explicit requirements, tacit preferences, implications, constraints, acceptance criteria, evidence expectations, forbidden assumptions, priority/trade-off relations, and fields that are genuinely unknowable without asking. **Tag: `near_match_only`.**
- Stratify by ambiguity: concrete/low-risk control, referential ambiguity, missing acceptance criteria, trade-off/preference ambiguity, high-stakes evidence ambiguity, and internally inconsistent intent. **Tag: `near_match_only`.**
- Stratify domains: coding/refactoring, research/synthesis, data analysis, product/design, scientific/technical planning, and creative work; TravelPlanner/SWE-bench-style tasks can seed subsets but cannot stand in for the whole distribution. **Tag: `near_match_only`.**
- Include impossible/unresolvable cases so a system that always “resolves” is penalized and honest `BLOCKED`/`ACCEPTED_RESIDUAL` behavior is measurable. **Tag: `near_match_only`.**
- Begin with a simulator-backed development suite, then confirm the primary outcome with real users/domain authors because simulated-user fidelity to tacit human intent is unknown. **Tag: `insufficient`.**

### 3. Arms and fairness controls

| Arm | Procedure | Tag |
|---|---|---|
| A — stock Plan | Raw query enters the host's stock Plan flow. The stock planner may use its ordinary native questions/tools; it receives the same user availability and evidence/tool access as B. | `directly_supported` |
| B — ThyQuery + stock Plan | Raw query invokes `$thyquery` from the assigned starting mode, passes verified Plan entry, runs Ralph elicitation, hands the accepted contract to the unchanged stock planner, and stops after native plan emission. | `directly_supported` |

- Pin host build, model, reasoning setting, system/developer instructions, workspace snapshot, tool set, network/evidence snapshot, locale, and budget within each paired block. **Tag: `near_match_only`.**
- Run arms in isolated sessions/workspaces to prevent information leakage; randomize arm order and balance starting modes across tasks. **Tag: `near_match_only`.**
- A deterministic user simulator reads the private dossier and reveals only what the system asks or what the scripted scenario volunteers; identical response policy applies to both arms. **Tag: `near_match_only`.**
- Permit stock Plan to ask questions. Comparing ThyQuery against a crippled no-question baseline would not measure incremental value over the actual stock product. **Tag: `directly_supported`.**
- Run multiple independent trials per task/arm; record random seed where the host exposes one, otherwise record full configuration and treat sampling variance empirically. **Tag: `directly_supported`.**
- Do not equalize by truncating only one arm. Report both a matched-resource analysis and an unconstrained-product analysis because ThyQuery intentionally adds interaction overhead. **Tag: `near_match_only`.**

### 4. Outcome hierarchy

#### Gate 0 — compatibility and integrity (all-or-nothing)

For every declared starting mode: `PLAN_ENTRY_OK`, original query/context/permission continuity, native question availability, exactly one invocation, valid terminal state, exactly one stock-planner handoff, exactly one host-proven native plan, and zero execution side effects. Any failure disqualifies that host/version independently of plan-quality scores. **Tag: `directly_supported`.**

#### Primary quality outcome

Use a pre-registered paired score whose components are reported separately rather than hidden behind one opaque composite:

1. decision-critical dossier coverage;
2. explicit acceptance criteria and verification steps;
3. contradiction count/severity;
4. unsupported-specificity count/severity;
5. unresolved-risk honesty and traceable assumptions;
6. user/domain-author intent-alignment judgment;
7. executability/actionability of the plan without guessing.

The exact weights and minimum important difference are not established by R6 and must be calibrated on pilot human judgments before a confirmatory test. **Tag: `insufficient`.**

#### Reliability outcomes

- Report per-arm single-trial pass rate and `pass^k`: the fraction of tasks for which all `k` repeated trials pass the hard quality threshold, following the reliability direction of $\tau$-bench. **Tag: `near_match_only`.**
- Report variance and worst-stratum performance; do not market best-of-k or one cherry-picked transcript as reliability. **Tag: `directly_supported`.**
- Report hosts independently before any pooled estimate; cross-host average cannot hide a failed adapter or mode. **Tag: `directly_supported`.**

#### Cost and burden outcomes

Track user questions, options per question, answer time, total turns, research/tool calls, sources opened, wall time, tokens, monetary cost when observable, cancellations, and subjective burden. Anthropic identifies latency/token/cost/error tracking as standard agent-eval outputs, but acceptable ThyQuery bounds remain uncalibrated. **Tag: `near_match_only`.**

### 5. Grading stack

| Layer | Grader | Purpose | Tag |
|---|---|---|---|
| Deterministic conformance | Event/state/hash assertions | Mode, identity, query/context, state machine, duplicate, no-execution, handoff, provenance. | `near_match_only` |
| Deterministic plan checks | Dossier-derived verifiable constraints | IFEval-like strict critical-field coverage and forbidden-item checks. | `near_match_only` |
| Blinded domain experts | Pairwise preference plus absolute rubric; arm labels/receipts scrubbed | Intent fidelity, trade-off quality, actionability, residual-risk honesty. | `directly_supported` |
| Calibrated model grader | Rubric grading checked against a held-out human-labeled sample | Scale diagnostics, never sole authority for the primary claim. | `near_match_only` |
| Transcript audit | Human sample of passes, failures, and disagreements | Detect grader gaming, sycophancy, loops, and valid alternatives rejected by tests. | `directly_supported` |

Inter-rater agreement and grader-vs-human agreement must be reported; unresolved grader disagreement remains an evaluation uncertainty rather than a system failure by default. **Tag: `near_match_only`.**

### 6. Statistical analysis

- Pre-register one primary comparison and its minimum practically important difference; treat other dimensions/strata as secondary to limit metric shopping. **Tag: `near_match_only`.**
- Use paired task-level estimates with confidence intervals; account for repeated trials nested within task and, for the human phase, repeated tasks nested within user/domain author. **Tag: `near_match_only`.**
- Use a paired randomization/permutation or hierarchical bootstrap compatible with the randomization design; publish the task-level deltas and failure counts, not only a p-value. **Tag: `near_match_only`.**
- Calibrate sample size from pilot variance and the pre-registered minimum important difference; R6 does not justify a fixed `n`. **Tag: `insufficient`.**
- A positive claim requires: no compatibility-gate failures, positive primary paired effect with uncertainty excluding the no-benefit margin, no material regression in contradiction/unsupported-specificity, and burden within a user-approved bound. Exact thresholds remain a design-approval decision. **Tag: `insufficient`.**

### 7. Anti-gaming controls

- Blind graders to arm and remove `$thyquery`, receipt, turn-count, and formatting cues from plan artifacts where compatible with the rubric. **Tag: `near_match_only`.**
- Normalize or separately score verbosity so longer plans do not win merely by mentioning more items. **Tag: `near_match_only`.**
- Hold back adversarial tasks and paraphrased variants; include option-order reversals and misleading user beliefs to probe sycophancy. **Tag: `near_match_only`.**
- Grade end state and plan content, not the model's confidence, “resolved” wording, or chain-of-thought. **Tag: `directly_supported`.**
- Inspect failures where the grader and domain author disagree; ambiguous tests are repaired, not used to tune the system toward hidden assumptions. **Tag: `directly_supported`.**

## Native-plan provenance and parity protocol

### Minimal provenance graph

The following W3C-PROV-shaped graph is a portable receipt proposal, not evidence that the hosts expose it:

```text
Q0 raw query/context entity
  --used by--> T1 official Plan-entry activity --associated with--> stock host/version
T1 --generated--> C0 verified Plan-mode/context receipt
Q0 + C0 --used by--> R1 ThyQuery Ralph activity --generated--> I1 accepted intent-contract entity
I1 --used by--> P1 stock-planner activity --associated with--> stock host planner
P1 --generated--> N1 native-plan entity
```

This mapping is an application-specific use of PROV-O and remains unvalidated for either host. **Tag: `near_match_only`.**

### Receipt fields to seek from official host surfaces

`host`, `host_version`, `adapter_version`, `session_id`, `invocation_id`, `starting_mode`, `effective_mode`, `transition_event_id`, `transition_surface`, `original_query_hash`, `context_manifest_hash`, `permission_digest`, `ralph_state_version`, `terminal_kind`, `intent_contract_hash`, `handoff_event_id`, `planner_event_id`, `planner_identity/surface`, `native_plan_hash`, `created_at`, `no_execution_observed`.

These fields are a test target; authenticity and availability are unknown until R1/R2 identify host-owned events. **Tag: `insufficient`.**

### Provenance acceptance tests

1. A value written only by model text is untrusted; at least the transition and planner identity must derive from a host-observed event or API response. **Tag: `directly_supported`.**
2. Hash/ID continuity must link the captured query to the accepted intent contract and the exact stock-planner input. **Tag: `directly_supported`.**
3. Replaying the same invocation cannot create a second planner event or plan receipt; a new invocation ID must not inherit the first invocation's terminal state. **Tag: `near_match_only`.**
4. A valid native plan with low dossier coverage is still a plan-quality failure; provenance and quality are separate gates. **Tag: `directly_supported`.**
5. If the host exposes no non-model-authored planner event/identity, `PLAN_PROVENANCE=STOCK_HOST` is not established and the `SK@v7` compatibility predicate cannot pass. **Tag: `insufficient`.**

### Cross-host semantic parity

| Invariant | Codex fixture | Claude fixture | Passing rule | Tag |
|---|---|---|---|---|
| Explicit command | Invoke exact approved spelling from every declared mode. | Same. | Host-native parsing reaches one ThyQuery invocation. | `insufficient` |
| Forced Plan entry | Observe official transition/effective mode. | Same. | Plan is active before any loop action. | `insufficient` |
| Native elicitation | Exercise host structured-question surface. | Same. | Answers bind to the same invocation/contract. | `insufficient` |
| Typed terminals | Trigger success, accepted residual, cancel, block, stall, exhaustion, corruption. | Same. | Only two authorized closure kinds hand off. | `directly_supported` |
| Resume/idempotency | Restart at each checkpoint. | Same. | No lost facts or duplicate logical events. | `near_match_only` |
| Stock planner provenance | Verify host planner event and plan hash. | Same. | Native author is host planner, not ThyQuery. | `insufficient` |
| No execution | Inspect events/workspace before/after. | Same. | No plan action is executed; mode remains Plan. | `directly_supported` |

Semantic parity means the same invariants and outcomes, not a wrapper that only imitates native UI. **Tag: `directly_supported`.**

## Unknowns and escalation points

| Unknown | Why R6 cannot close it | Required owner/evidence | Tag |
|---|---|---|---|
| Can Codex force Plan mode from every declared starting mode? | R6 did not inspect/decide the Codex host surface. | R1 official/local capability matrix and non-mutating proof. | `insufficient` |
| Can Claude Code mutate an already-running session into Plan mode? | Stop/permission fields show mode observability, not mutation authority. | R2 official/local capability matrix and non-mutating proof. | `insufficient` |
| Is exact `$thyquery <query>` native on both hosts? | Invocation grammar is owned by R1/R2. | Exact parser/command evidence. | `insufficient` |
| Can either host expose a host-authenticated stock-planner event? | W3C PROV is only a vocabulary; model text/hash alone cannot prove authorship. | Official event/schema/tool output and a live conformance probe. | `insufficient` |
| Which fields/thresholds establish epistemic closure? | R6 establishes failure guards, not the formal estimator/calibration. | R3 observed elicitation variables + R4 formal rule + R5 operational epistemic constraints. | `insufficient` |
| What stall window and resource budget are acceptable? | Source patterns justify caps and non-success semantics but not product thresholds. | Pilot data, user burden study, and explicit design approval. | `insufficient` |
| Does ThyQuery improve real-user plan quality? | No implementation or paired experiment exists. | Pre-registered paired benchmark followed by human/domain-author confirmation. | `insufficient` |
| Does current Claude's 8-block Stop limit apply exactly to the locally installed 2.1.220/plugin path? | Current official docs and cached v1.0.0 conflict; no mutating/live loop probe was authorized in R6. | R2 version-specific official evidence or bounded non-mutating lifecycle probe. | `insufficient` |

## R6 handoff to DS@v1

- Preserve the Ralph **state/checkpoint/iteration** idea; reject its exact completion promise and unchanged-prompt semantics. **Tag: `near_match_only`.**
- Define completion as a typed, externally recomputed predicate over the intent contract/evidence ledger, with explicit user acceptance where needed. **Tag: `near_match_only`.**
- Keep `EPISTEMIC_CLOSED`, `ACCEPTED_RESIDUAL`, `CANCELLED`, `BLOCKED`, `STALLED`, `RESOURCE_EXHAUSTED`, `STATE_CORRUPT`, and `HOST_CAPABILITY_CONTRADICTION` distinct. **Tag: `near_match_only`.**
- Make mode transition, native questions, native planner provenance, single-invocation identity, and no execution hard compatibility gates—not soft benchmark scores. **Tag: `directly_supported`.**
- Treat any absent host-owned transition or planner signal as `HOST_UNSUPPORTED`, not as permission to emulate native behavior. **Tag: `directly_supported`.**
- Require paired stock-vs-layer evaluation with hidden intent dossiers, multiple trials, blinded humans, deterministic constraints, reliability, and burden metrics before claiming benefit. **Tag: `near_match_only`.**
