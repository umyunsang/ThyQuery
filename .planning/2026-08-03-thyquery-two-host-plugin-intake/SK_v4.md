# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: SK
- Version: v4
- Stable locator: .planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v4.md
- Status: SKELETON_APPROVAL_PENDING(SK@v4)
- Base: approved SK@v2 research intent
- Withdraws: unapproved SK@v3 automatic-routing revision
- Created: 2026-08-03 (Asia/Seoul)
- Nearest project authority: user-supplied global AGENTS.md; no project-local authority found

## Raw Requests

### Initial direction

> 이 프로젝트는 codex나 claude 사용할때 사용자가 질의를 하는 데, 사용자(사람)이 하는 질의 특성상 추상적이고 모호한 표현으로 할텐데 이런 질의를 ai가 그대로 반영하여 작업을 하면, 최종 결과물이 사용자 입장에선 만족스럽운 결과를 받을 확률이 적어 왜냐하면 사용자의 암묵지와 함의가 반영이 안된 결과물을 생성할테니, 따라서 이런 함의나 암묵지를 ai가 역질의와 근거자료,입증자료,벤치마크자료, sota자료들을 딥리서치해서 top3를 제안하여 모호성을 제거해가며 사용자의 암묵지와 함의를 찾아가며 추론하며 실체화하는 플러그인이야, 얇은 하네스로 만들거야 순정의 codex 와 claudecode의 도구 중에 선택지를 제안하는 도구들이있어, 이 도구들을 이용해서 암묵지와 함의를 찾아가는 플러그인을 만들거야 총 2개의 플러그인을 만드는거야 codex용, claude용

### Ralph and termination refinement

> 꼭 후보 top3가 아니여도 되, codex, claude 각각의 내부 도구를 내부문서나 공식자료를 통해 확인하고 정하면될거같아 또한 흐름을 한번만 진행하는게 아니라 완전히 모호성 해결과, 암묵지 해결이 될때 까지 ralph loop 해야해 따라서 ralph 종료조건도 찾아가야해 딥리서치를 통해 관련 연구나 실험 자료를 찾아보고 얼마나 진행되었는지 인지, 방향을 잡고 sota자료나 벤치마크 자료들로 깊은 추론 가장 정합한 종료조건 산식이나 조건을 구축해야해 리서치 스코프도 cs나 과학,수학에만 진행하는게 아니라 철학관련해서도 찾아봐야해 예로 소크라테스리즈닝

### Routing reversal

> 아니다 자동 라우팅 조건은 폐기해줘 별도 명령을 실행하는 플러그인으로 진행하자

### Invocation refinement

> 표준 플러그인 호출방식인 달러thyquery <최종사용자질의> 이방식이 좋아보인다

## Authority Split

### Authoritative Product Intent
- Deliver one thin plugin for Codex and one thin plugin for Claude Code.
- The desired explicit user surface is exactly: $thyquery <최종사용자질의>.
- ThyQuery runs only after that explicit opt-in invocation. Ordinary prompts are not intercepted, classified, or rerouted.
- The command takes the supplied final-user query as its initial object, then runs adaptive ambiguity and tacit-intent elicitation before downstream execution.
- The interaction method and number of proposed choices are selected from each hosts verified native capabilities and the current information gap; a fixed Top 3 is not required.
- The flow repeats as a Ralph-style epistemic loop until a researched success condition, explicit acceptance of recorded residual uncertainty, cancellation, or honest block/escalation.
- Deep research must cover current host documentation, empirical studies, benchmarks, SOTA work, formal stopping theory, and philosophy including Socratic reasoning.
- The user-process constraint is strict: delegated research is flat and root-owned, never recursive; each completed branch and session is cleaned immediately.

### Provisional Items Requiring Evidence
- Whether current Codex natively recognizes the exact $thyquery <query> form as a plugin or skill invocation.
- Whether current Claude Code natively recognizes that exact dollar-prefixed form rather than a host-specific command or skill syntax.
- Whether one shared visible spelling can be implemented without a wrapper or client mutation.
- Which native interaction tool each host exposes for targeted questions, structured choices, free text, or confirmation.
- In which host modes and extension contexts each interaction tool is callable; tool presence alone may not imply plugin-time availability.
- Which state variables, estimators, thresholds, benchmarks, and user-grounding checks constitute a defensible closure predicate.
- Whether exhaustive tacit-knowledge recovery is observable; the likely operational target is task-relative, decision-sufficient closure with explicit residuals, but research may revise this.

### Explicitly Removed
- Automatic routing or interception of ordinary prompts.
- A mandatory query hook.
- Automatic triage of every user message.
- Hook origin markers and re-entrancy logic that exist only to support automatic interception.
- Silent translation to another invocation syntax or a wrapper presented as exact cross-host parity.

## Normalized Direction
- Outcome: turn the query supplied through $thyquery into an accepted, evidence-linked intent contract, then hand that contract to stock Codex or Claude Code execution.
- Included: explicit command intake; ambiguity and tacit-gap modeling; adaptive reverse questions; source, validation, benchmark, and SOTA research when material; hypothesis and evidence updates; progress measurement; contradiction handling; convergence testing; user grounding; cancellation; accepted residual uncertainty; honest blocking; stock-host handoff; audit receipt.
- Excluded: ordinary-prompt interception; fixed Top 3 behavior; one-pass completion; replacement of the host model or tool executor; long-term memory or RAG; model training; standalone SaaS GUI; third-host support; deployment or publication before later authorization.
- Host rule: desired syntax is a requirement candidate, not a verified capability claim. Research must distinguish native exact support, native semantic support with different syntax, wrapper-only support, and no support.
- Done signal: both approved plugin packages are locally demonstrated from their actual host surfaces; the invocation enters ThyQuery once, the loop makes measurable non-cycling progress, closure is honest, and one accepted intent contract is handed to stock execution. Exact syntax parity is demonstrated or an incompatibility is returned to the user for an explicit product decision.

### Canonical Skeleton

For Codex and Claude Code users who explicitly invoke $thyquery <final-user-query>, build two thin host-native plugins that repeatedly choose the highest-value available epistemic action, update an auditable intent model, and stop only under an evidence-derived closure outcome or explicit acceptance of recorded residual uncertainty; leave ordinary prompts untouched, verify rather than assume exact dollar-command support in both hosts, and never present a translated command or wrapper as native parity without user approval.

## Provisional Invocation and Runtime Flow

    EXPLICIT $thyquery INVOCATION
      -> CAPTURE SUPPLIED QUERY
      -> MODEL EXPLICIT COMMITMENTS, GAPS, CONFLICTS, AND TACIT HYPOTHESES
      -> SELECT HIGHEST-VALUE NATIVE EPISTEMIC ACTION
      -> QUESTION | RESEARCH | TEST | SUMMARIZE | CONFIRM
      -> UPDATE INTENT CONTRACT AND EVIDENCE LEDGER
      -> MEASURE PROGRESS AND TEST CLOSURE
      -> CONTINUE | RESOLVED | ACCEPTED_RESIDUAL | CANCEL | BLOCK
      -> STOCK HOST HANDOFF ONLY WHEN AUTHORIZED BY THE OUTCOME

Required invariants:
1. No ThyQuery work begins for an ordinary prompt that lacks the explicit invocation.
2. One invocation initializes one loop state and one eventual handoff.
3. Adaptive questions and choices use verified native host mechanisms that are callable in the actual runtime mode.
4. Unresolved critical contradictions cannot emit RESOLVED.
5. A hard cap, stall, timeout, tool failure, or exhausted budget cannot be labeled RESOLVED.
6. The final receipt records material commitments, residuals, evidence lineage, closure reason, and user acceptance state.

## Provisional Closure Model

Research will test, reject, or revise a composite predicate of this general form:

    STOP_t :=
      C_t >= tau_c
      AND R_t <= tau_r
      AND X_t = 0
      AND D_(t-k:t) <= epsilon
      AND max_a(EVI(a | state_t) - Cost(a)) <= 0
      AND A_t = 1

Candidate meanings:
- C_t: coverage of task-critical intent and constraint fields.
- R_t: calibrated residual risk that another plausible interpretation would materially change the work.
- X_t: unresolved critical contradictions.
- D_(t-k:t): instability of the intent contract over the latest k iterations.
- EVI: expected value of information of the best available next epistemic action.
- Cost: user burden, latency, token, source, and opportunity cost.
- A_t: explicit user grounding or explicit acceptance of documented residual uncertainty.

Every variable, estimator, threshold, conjunction, exception, and measurement instrument remains unvalidated. Resource exhaustion and stalled progress route to CANCEL or BLOCK/ESCALATE unless the user explicitly accepts the recorded remainder.

## Invocation Compatibility Outcomes to Research

| Outcome | Meaning | Product consequence |
|---|---|---|
| Native exact parity | Both hosts officially support $thyquery <query> with the required argument flow | Keep the common visible surface |
| Native semantic parity, syntax mismatch | Both host-native plugins work, but one host officially requires another invocation grammar | Present exact evidence and alternatives; user decides whether visible syntax may differ |
| Wrapper-only parity | Exact visible spelling needs a shell/client wrapper or mutation | Non-compliant unless the user explicitly expands scope |
| Capability failure | A host cannot support the required iterative interaction or handoff | Report contradiction; do not fabricate a plugin |

## Proposed Research Manifest

New external or deep research dispatch count under SK@v4 remains zero until exact approval. All lanes are read-only, flat, root-owned, non-overlapping, and forbidden from spawning descendants. Each completed branch and its session is integrated and cleaned immediately.

| Lane | Exclusive questions | Allowed sources and bound | Output | Stop or escalate | Status |
|---|---|---|---|---|---|
| R1 — Codex native invocation and interaction | Exact current plugin or skill invocation grammar; whether $thyquery <query> is native; argument delivery; user-question and choice mechanisms; mode and extension-context availability; state, permissions, packaging, and local behavior | Local read-only code, help, schema, and config first; official OpenAI sources only; 75 min or 15 material sources | Capability matrix, exact invocation evidence, adapter candidates | Preserve unsupported or unknown fields; never infer runtime availability from generic tool or plugin presence | NOT_AUTHORIZED |
| R2 — Claude Code native invocation and interaction | Exact current plugin, skill, or command grammar; whether dollar syntax is native; arguments; question and choice tools; loop state, permissions, packaging, and local behavior | Local read-only help, schema, installed official plugins, then official Anthropic sources only; 75 min or 15 material sources | Capability matrix, exact invocation evidence, adapter candidates | Distinguish slash commands, skills, hooks, and wrappers; report mismatches | NOT_AUTHORIZED |
| R3 — empirical elicitation | Clarification effectiveness, conversational grounding, interactive task specification, preference and requirements elicitation, tacit-knowledge elicitation, and user burden | Primary papers, official datasets and evaluations, systematic reviews; 90 min or 20 material sources | Evidence rows and observable progress variables | Stop at bound or evidence saturation; retain contradictory results | NOT_AUTHORIZED |
| R4 — formal progress and stopping | Active learning, Bayesian experimental design, information gain and VOI, sequential analysis, optimal stopping, convergence, calibration, and multi-objective stopping | Primary mathematical, statistical, and ML sources; 90 min or 20 material sources | Candidate estimators and predicates with assumptions and failure cases | Escalate when a proposed variable is not observable in dialogue | NOT_AUTHORIZED |
| R5 — philosophy and Socratic reasoning | Socratic elenchus and maieutics, hermeneutic iteration, pragmatics, epistemic humility, tacit knowledge, and operationally relevant modern work | Primary texts where practical, scholarly reference works, peer-reviewed cross-disciplinary research; 90 min or 18 material sources | Mechanism-to-loop mappings with evidence tags | Decorative analogy is downgraded to near_match_only | NOT_AUTHORIZED |
| R6 — Ralph loop and evaluation | Actual Ralph-style loops, termination and safety patterns, loop pathologies, benchmark construction, negative fixtures, user-grounded evaluation, and cross-host parity | Primary implementations and docs, empirical agent-eval papers, official benchmarks; 75 min or 18 material sources | Guard set, benchmark design, and termination evidence rows | Escalate on missing provenance or host incompatibility | NOT_AUTHORIZED |

## Evidence Ledger

| Claim ID | Skeleton field | Finding | Tag | Source and date | Implication |
|---|---|---|---|---|---|
| U1 | Choice count | Fixed Top 3 is not required | directly_supported | User amendment, 2026-08-03 | Action form and option count stay adaptive |
| U2 | Host mechanics | Current internal or local and official sources must determine each host mechanism | directly_supported | User amendment, 2026-08-03 | R1 and R2 precede architecture selection |
| U3 | Runtime loop | Elicitation must iterate until an honest closure outcome | directly_supported | User amendment, 2026-08-03 | One-pass designs are excluded |
| U4 | Termination | Progress and stopping conditions are deep-research outputs | directly_supported | User amendment, 2026-08-03 | The displayed equation remains a falsifiable scaffold |
| U5 | Research breadth | Philosophy and Socratic reasoning are in scope | directly_supported | User amendment, 2026-08-03 | R5 is required |
| U6 | Routing | Automatic routing is explicitly revoked | directly_supported | User reversal, 2026-08-03 | Ordinary prompts remain untouched |
| U7 | Invocation | Desired user surface is $thyquery <최종사용자질의> | directly_supported | User refinement, 2026-08-03 | Explicit opt-in is the only primary entry |
| H1 | Syntax parity | Both current hosts natively support the exact dollar-prefixed form | insufficient | Research not yet authorized | Do not claim exact parity |
| L1 | Codex local surface | Local Codex exposes plugin management, but prior help inspection did not establish exact dollar-skill argument semantics | near_match_only | Local snapshot, 2026-08-03 | Verify in R1 |
| L2 | Claude local surface | Local Claude exposes plugins, skills, commands, hooks, and an official Ralph example, but prior inspection did not establish dollar-command parity | near_match_only | Local snapshot, 2026-08-03 | Verify in R2 |
| L3 | Ralph termination | The local official Ralph example demonstrates loop mechanics but says unclear human-judgment success criteria are a poor fit for its exact-promise stop rule | directly_supported for mechanics; near_match_only for ThyQuery closure | Local official plugin, 2026-08-03 | Reuse mechanics only after redesigning closure |
| L4 | Codex choice UI mode gate | A live request_user_input invocation in the current Default-mode task was rejected with request_user_input is unavailable in Default mode | directly_supported for this session only | Live tool call, 2026-08-03 | R1 must verify mode and plugin-context availability; do not treat tool presence as universal support |
| H2 | Closure validity | Complete tacit-intent resolution and the composite predicate are reliably measurable | insufficient | Research not yet authorized | Preserve uncertainty and test in R3 through R6 |

## Approval Ledger

| State | Artifact | Decision and scope | Authority | Date | Status |
|---|---|---|---|---|---|
| Prior approval | SK@v2 / 264b40…ace3 | Six bounded read-only lanes under the then-current explicit-command-unspecified scope | User | 2026-08-03 | SUPERSEDED_FOR_NEW_DISPATCH |
| Withdrawn revision | SK@v3 | Automatic routing and query-hook research | None; user revoked before approval | 2026-08-03 | WITHDRAWN_UNAPPROVED |
| Current skeleton | SK@v4 plus external SHA-256 receipt | Six bounded read-only lanes defined above | User | 2026-08-03 | PENDING |
| Synthesized design | DS@v1, not created | Implementation planning only | Future explicit approval | — | PENDING |
| Implementation | Approved design plus written plan | Scoped code and verification only | Future explicit authorization | — | PENDING |

## Field-Level Diff from SK@v3

| Field | SK@v3 | SK@v4 | Approval impact |
|---|---|---|---|
| Invocation | Every ordinary prompt intercepted automatically | Explicit $thyquery <final-user-query> only | Material; v3 withdrawn |
| Ordinary prompts | Always triaged | Untouched | Material |
| Host prerequisite | Blocking pre-prompt hook | Native explicit plugin or skill command with argument delivery | Material |
| Loop safety | Origin marking and hook re-entry prevention | Single-invocation state, no duplicate handoff, honest termination | Material |
| Host mismatch | No hook means non-compliant | Exact syntax mismatch is evidenced and returned for user choice | Material |
| Research ordering | Automatic-hook gate first | Native command syntax and interaction gate first | Material |

## Synthesis State
- Design ID: not created.
- Current recommendation: pending authorized research.
- Explicit unknowns: exact two-host invocation syntax; argument passing; native questioning surfaces; common adapter boundary; observable ambiguity and tacit-intent variables; valid stop thresholds; benchmark and acceptance targets; resource and fatigue limits.
- Retained architecture families after host verification: shared protocol plus native adapters; shared local loop core plus adapters; independent native implementations plus a conformance suite.

## Next Action
- Current state: SKELETON_APPROVAL_PENDING(SK@v4)
- Authorized action: user review or revision of this skeleton
- Prohibited action: new external or deep research, any subagent dispatch, code or scaffolding, installation or configuration, deployment, and publication
- Next checkpoint: explicit SK@v4 approval for the six bounded read-only research lanes
