# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: `SK`
- Version: `v2`
- Stable locator: `.planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v2.md`
- Status: `SKELETON_APPROVAL_PENDING(SK@v2)`
- Supersedes: unapproved `SK@v1`
- Created: `2026-08-03` (Asia/Seoul)
- Nearest project authority: user-supplied global `AGENTS.md`; no project-local authority found
- Project-local template used: `none`; adapted the query-preprocessing fallback skeleton

## Raw Requests

### Initial request

> 이 프로젝트는 codex나 claude 사용할때 사용자가 질의를 하는 데, 사용자(사람)이 하는 질의 특성상 추상적이고 모호한 표현으로 할텐데 이런 질의를 ai가 그대로 반영하여 작업을 하면, 최종 결과물이 사용자 입장에선 만족스럽운 결과를 받을 확률이 적어 왜냐하면 사용자의 암묵지와 함의가 반영이 안된 결과물을 생성할테니, 따라서 이런 함의나 암묵지를 ai가 역질의와 근거자료,입증자료,벤치마크자료, sota자료들을 딥리서치해서 top3를 제안하여 모호성을 제거해가며 사용자의 암묵지와 함의를 찾아가며 추론하며 실체화하는 플러그인이야, 얇은 하네스로 만들거야 순정의 codex 와 claudecode의 도구 중에 선택지를 제안하는 도구들이있어, 이 도구들을 이용해서 암묵지와 함의를 찾아가는 플러그인을 만들거야 총 2개의 플러그인을 만드는거야 codex용, claude용

### Amendment

> 꼭 후보 top3가 아니여도 되, codex, claude 각각의 내부 도구를 내부문서나 공식자료를 통해 확인하고 정하면될거같아 또한 흐름을 한번만 진행하는게 아니라 완전히 모호성 해결과, 암묵지 해결이 될때 까지 ralph loop 해야해 따라서 ralph 종료조건도 찾아가야해 딥리서치를 통해 관련 연구나 실험 자료를 찾아보고 얼마나 진행되었는지 인지, 방향을 잡고 sota자료나 벤치마크 자료들로 깊은 추론 가장 정합한 종료조건 산식이나 조건을 구축해야해 리서치 스코프도 cs나 과학,수학에만 진행하는게 아니라 철학관련해서도 찾아봐야해 예로 소크라테스리즈닝

## Authority Split

### Authoritative Intent
- Outcome: iteratively recover and concretize enough of a person's tacit intent and implications that the downstream agent does not silently execute a materially wrong interpretation.
- Explicit target/context: people issuing abstract or ambiguous work requests to stock Codex or Claude Code.
- Deliverables: one thin Codex plugin and one thin Claude Code plugin.
- Must: verify each host's current internal/local and official tool surfaces before choosing the interaction mechanism; use an iterative Ralph-style loop; research and construct a defensible progress measure and termination condition; include empirical, formal, benchmark, and philosophical evidence; include Socratic reasoning as a research direction.
- Must not: hard-code Top 3 as the universal interface; treat one clarification turn as completion; invent a closure formula without evidence; silently declare unresolved critical ambiguity resolved; replace the stock host runtime.
- Permissions already granted: bounded local inspection needed to revise this skeleton.
- Explicit approvals already recorded: none for this identified skeleton or for research/design/implementation.

### Provisional Items
- Factual premises: both current hosts expose sufficient lifecycle and interaction surfaces for equivalent thin iterative plugins.
- Success claims: an evidence-driven iterative loop can measurably improve intent recovery and can use a valid operational stopping rule.
- Inferred scope: installable local MVPs; Korean and English natural-language requests; shared loop/contract semantics with host-native mechanics.
- Candidate solution: shared epistemic-loop protocol and conformance suite with two host-native adapters.
- Proposed first-version exclusions: long-term memory/RAG, model training, standalone SaaS GUI, third-host support, and autonomous substantive execution before closure.
- Assumed approval: none.

## Normalized Direction
- Outcome: transform an ambiguous request into an accepted, evidence-linked intent contract through repeated high-information interactions, then hand it to the stock host.
- Target/context: Codex and Claude Code users in the execution surfaces that current official and live local evidence actually supports.
- Deliverable: two thin plugins plus a shared intent-contract schema, loop-state model, closure predicate, audit receipt, and cross-host conformance fixtures if host boundaries permit.
- Scope included: ambiguity/tacit-gap modeling; adaptive host-native action selection; targeted reverse questions; bounded source and benchmark research; hypothesis/evidence updates; progress measurement; convergence/closure testing; user confirmation or explicit acceptance of residual uncertainty; loop safeguards; downstream handoff.
- Scope excluded: fixed Top 3 requirement; one-pass-only flow; replacing the host agent/model/tool executor; long-term memory/RAG; model training; standalone SaaS GUI; publication/deployment; hosts other than Codex and Claude Code.
- Must / avoid: prefer current official and primary sources; distinguish exact evidence from analogy; research philosophical mechanisms as seriously as computational ones but require an operational mapping; never equate resource exhaustion with resolution; keep the harness thin.
- Provisional premises to verify: official host tools and lifecycle hooks; Ralph-loop feasibility; measurable residual ambiguity; observability of tacit-intent recovery; transferability of formal stopping theories; valid benchmarks and user-grounding measures.
- Candidate solutions: (A) shared epistemic-loop protocol + native adapters, (B) shared executable loop core + adapters, (C) independent native loops + conformance suite.
- Done signal: both plugins demonstrate on an approved benchmark that they select appropriate next epistemic actions, make measurable progress without cycling, stop only under a calibrated composite closure predicate or explicit residual-uncertainty acceptance, and hand off an equivalent accepted intent contract.
- Open item: research question—whether “complete resolution” can be operationalized as exhaustive articulation or must be defined as task-relative, decision-sufficient closure with explicitly accepted residual unknowns.

### Canonical Skeleton

> For people making ambiguous requests in stock Codex or Claude Code, shape two thin host-native plugins that repeatedly choose the highest-value available epistemic action, update an auditable intent model, and stop only under an evidence-derived closure condition or explicit acceptance of residual uncertainty; verify host mechanisms from current internal/official sources, derive progress and termination from empirical, mathematical, benchmark, and philosophical research including Socratic reasoning, and never confuse a fixed option count, one completed turn, stalled progress, or exhausted resources with resolved intent.

## Provisional Runtime Loop — Research Target, Not Approved Design

`OBSERVE → MODEL GAPS → CHOOSE NEXT EPISTEMIC ACTION → ACT → UPDATE CONTRACT/EVIDENCE → MEASURE → STOP | CONTINUE | BLOCK`

Candidate next actions include bypass, one targeted question, adaptive structured choices, free-text elicitation, source inspection, bounded research, counterexample/benchmark testing, reflective summary, contradiction challenge, and explicit confirmation. The host-native mechanism and option cardinality remain research outputs.

## Provisional Closure Model — Research Target, Not a Validated Formula

Research will test, reject, or revise a composite predicate of this general form:

`STOP_t := C_t >= tau_c AND R_t <= tau_r AND X_t = 0 AND D_(t-k:t) <= epsilon AND max_a(EVI(a|state_t) - Cost(a)) <= 0 AND A_t = 1`

Where candidate meanings are:
- `C_t`: coverage of task-critical intent/constraint fields;
- `R_t`: calibrated residual risk that a materially different interpretation changes the work;
- `X_t`: unresolved critical contradictions;
- `D_(t-k:t)`: intent-contract instability over the last `k` iterations;
- `EVI`: expected value of information of the best available next epistemic action;
- `Cost`: user burden, latency, token, source, and opportunity cost;
- `A_t`: explicit user grounding/acceptance, including explicit acceptance of documented residual uncertainty.

Every variable, estimator, threshold, conjunction, exception, and measurement instrument is provisional. A hard cap, user opt-out, safety limit, or progress stall routes to `BLOCK/ESCALATE` unless the user explicitly accepts the recorded remainder; it does not satisfy `STOP_RESOLVED`.

## Approval Ledger
| State | Artifact | Decision and scope | Authority | Locator | Date | Status |
|---|---|---|---|---|---|---|
| Skeleton revision | `SK@v1` / `08be4a…5760` | Superseded before approval by material user amendment | User | Current task amendment | 2026-08-03 | `SUPERSEDED` |
| Skeleton approval | `SK@v2` + external SHA-256 receipt | Bounded read-only research only | User | Current task | 2026-08-03 | `PENDING` |
| Synthesized-design approval | `DS@v1` (not created) | Implementation planning only | User | Future explicit message | — | `PENDING` |
| Implementation authorization | Approved design + written plan | Scoped code and verification only | User | Future explicit message | — | `PENDING` |

## Proposed Research Manifest

External/deep research dispatch count remains zero until `SK@v2` is explicitly approved.

| Lane | Exclusive questions | Allowed sources and bound | Exclusions | Output | Stop/escalate | Status |
|---|---|---|---|---|---|---|
| R1 — Codex native surface | Current official plugin/skill/hook/lifecycle/tool surfaces; structured choice or best equivalent; local installed behavior; permissions and packaging | Local read-only code/help/config first, then official OpenAI sources; 75 min / 15 material sources | Claude and general theory; implementation | Evidence rows + candidate adapter mappings | Stop when each required capability is supported/unknown; escalate on surface mismatch | `NOT_AUTHORIZED` |
| R2 — Claude Code native surface | Current official plugin/hooks/skills/commands/agent/loop and user-interaction surfaces; local installed behavior; permissions and packaging | Local read-only help/config/plugin schemas first, then official Anthropic sources; 75 min / 15 material sources | Codex and general theory; implementation | Evidence rows + candidate adapter mappings | Same rule as R1 | `NOT_AUTHORIZED` |
| R3 — empirical elicitation | Clarification-question effectiveness, conversational grounding, interactive task specification, preference elicitation, requirements/tacit-knowledge elicitation, user burden | Primary papers, official datasets/evals, systematic reviews; 90 min / 20 material sources | Host packaging and pure formal stopping | Evidence rows + measurable state variables | Stop at bound/evidence saturation; preserve contradictions | `NOT_AUTHORIZED` |
| R4 — formal progress and stopping | Active learning, Bayesian experimental design, information gain/VOI, sequential analysis, optimal stopping, convergence, calibration, multi-objective stopping | Primary mathematical/statistical/ML sources; 90 min / 20 material sources | Host details and philosophical interpretation | Candidate estimators/predicates with assumptions and failure cases | Escalate if variables are not observable in dialogue | `NOT_AUTHORIZED` |
| R5 — philosophy and Socratic reasoning | Socratic elenchus/maieutics, hermeneutic iteration, pragmatics, epistemic humility, tacit knowledge, and operationally relevant modern work | Primary philosophical texts where practical, scholarly reference works, peer-reviewed cross-disciplinary research; 90 min / 18 material sources | Decorative analogy without operational mapping | Evidence rows + mechanism-to-loop mapping | Downgrade non-operational parallels to `near_match_only` | `NOT_AUTHORIZED` |
| R6 — Ralph loop and evaluation | Actual Ralph-style agent loops, termination/safety patterns, loop pathologies, benchmark construction, negative fixtures, cross-host parity | Primary implementations/docs, empirical agent-eval papers, official benchmarks; 75 min / 18 material sources | Implementing this project | Evidence rows + test/guard candidate set | Escalate on missing provenance or host-specific incompatibility | `NOT_AUTHORIZED` |

All lanes are read-only and write only to their own isolated research artifact/ledger. The root synthesizes; lanes do not select the final design or modify shared project state.

## Evidence Ledger

| Claim ID | Skeleton field | Finding | Tag | Source/date | Scope match | Implication | Proposed delta |
|---|---|---|---|---|---|---|---|
| U1 | Interaction cardinality | Fixed Top 3 is not required. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | Candidate count and interaction form must be adaptive. | Remove Top 3 from must/done signal |
| U2 | Host mechanics | Internal/local documentation and official sources must determine the Codex and Claude mechanisms. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | R1/R2 precede architecture selection. | Freeze host mechanics as unknown |
| U3 | Runtime flow | Elicitation must repeat as a Ralph loop until the closure condition is met. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | One-pass designs are excluded. | Add loop-state and guard research |
| U4 | Termination | Progress awareness and the most coherent stopping equation/condition are deep-research outputs. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | Formula remains provisional until synthesized. | Add R3/R4/R6 |
| U5 | Research scope | Philosophy, including Socratic reasoning, belongs in scope alongside technical and formal fields. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | Cross-disciplinary evidence is required. | Add R5 |
| H1 | Closure observability | Complete tacit-intent resolution can be measured reliably. | `insufficient` | Research not authorized | Unknown | Do not promise exhaustive resolution. | R3/R4/R5/R6 |
| H2 | Composite formula | Coverage, risk, contradictions, stability, VOI, and acceptance form a valid stop predicate. | `insufficient` | Intake hypothesis only | Unknown | Treat the displayed equation only as a falsifiable scaffold. | R3/R4/R6 |
| P1 | Codex adapter feasibility | Current official host support has not been researched. | `insufficient` | Research not authorized | Unknown current surface | Do not claim feasibility yet. | R1 |
| P2 | Claude adapter feasibility | Current official host support has not been researched. | `insufficient` | Research not authorized | Unknown current surface | Do not claim feasibility yet. | R2 |

## Field-Level Diff from `SK@v1`

| Field | `SK@v1` | `SK@v2` | Approval impact |
|---|---|---|---|
| Interaction output | Evidence-backed Top 3 as a required behavior | Adaptive host-native action and option count | Material; old skeleton superseded |
| Flow | Pre-execution clarification flow could finish after selection | Iterative Ralph-style epistemic loop | Material |
| Completion | Fixed benchmark branch decision and accepted contract | Evidence-derived composite closure, residual-uncertainty acceptance, or block/escalate | Material |
| Research disciplines | Host surfaces plus elicitation/evaluation | Adds formal stopping theory, Ralph-loop evidence, philosophy, and Socratic reasoning | Material |
| Formula | None | Explicit falsifiable scaffold, not validated | Material |

## Synthesis
- Design ID/version: not created
- Explicit unknowns: official host surfaces; action-selection policy; whether exhaustive tacit resolution is observable; formal variables and thresholds; valid philosophy-to-mechanism mappings; benchmark and acceptance targets; loop resource/safety limits
- Alternatives retained: shared protocol, shared executable core, or independent native implementations with conformance tests
- Recommended design: pending authorized research

## Next Action
- Current state: `SKELETON_APPROVAL_PENDING(SK@v2)`
- Authorized action: user review or revision of this skeleton
- Prohibited action: external/deep research, subagent research, code/scaffolding, packaging, installation, deployment
- Next checkpoint: explicit `SK@v2` approval for the six bounded read-only research lanes

