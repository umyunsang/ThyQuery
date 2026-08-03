# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: `SK`
- Version: `v1`
- Stable locator: `.planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v1.md`
- Status: `SKELETON_APPROVAL_PENDING(SK@v1)`
- Created: `2026-08-03` (Asia/Seoul)
- Nearest project authority: user-supplied global `AGENTS.md`; no project-local authority found
- Project-local template used: `none`; adapted the query-preprocessing fallback skeleton

## Raw Request

> 이 프로젝트는 codex나 claude 사용할때 사용자가 질의를 하는 데, 사용자(사람)이 하는 질의 특성상 추상적이고 모호한 표현으로 할텐데 이런 질의를 ai가 그대로 반영하여 작업을 하면, 최종 결과물이 사용자 입장에선 만족스럽운 결과를 받을 확률이 적어 왜냐하면 사용자의 암묵지와 함의가 반영이 안된 결과물을 생성할테니, 따라서 이런 함의나 암묵지를 ai가 역질의와 근거자료,입증자료,벤치마크자료, sota자료들을 딥리서치해서 top3를 제안하여 모호성을 제거해가며 사용자의 암묵지와 함의를 찾아가며 추론하며 실체화하는 플러그인이야, 얇은 하네스로 만들거야 순정의 codex 와 claudecode의 도구 중에 선택지를 제안하는 도구들이있어, 이 도구들을 이용해서 암묵지와 함의를 찾아가는 플러그인을 만들거야 총 2개의 플러그인을 만드는거야 codex용, claude용

## Authority Split

### Authoritative Intent
- Outcome: before substantive agent work, recover enough of the user's tacit intent and implications to reduce the chance of a superficially correct but unsatisfying result.
- Explicit target/context: people issuing abstract or ambiguous work requests to stock Codex or Claude Code.
- Deliverables: one Codex plugin and one Claude Code plugin.
- Must: remain a thin harness; use each host's native structured-choice/reverse-question tool; ground material proposals in evidence; present Top 3 choices; make the resolved intent concrete for downstream execution.
- Avoid: silently treating the first plausible interpretation as the user's actual intent; replacing the stock host runtime.
- Permissions already granted: bounded local inspection needed to shape this skeleton.
- Explicit approvals already recorded: none for this identified skeleton or for research/design/implementation.

### Provisional Items
- Factual premises: both current hosts expose sufficient interception/routing and native-choice surfaces for equivalent thin plugins.
- Success claims: evidence-backed Top 3 choices will materially increase user satisfaction and intent recovery.
- Inferred scope: installable local MVPs; Korean and English natural-language requests; shared behavior contract with host-native adapters.
- Candidate solution: shared intent-contract protocol plus two host-native adapters.
- Proposed first-version exclusions: long-term memory/RAG, model training, standalone SaaS GUI, third-host support, autonomous execution before intent acceptance.
- Assumed approval: none.

## Normalized Direction
- Outcome: transform ambiguous human requests into an accepted, evidence-linked intent contract before the stock agent executes substantial work.
- Target/context: Codex and Claude Code users working through their normal CLI/IDE/app interaction surfaces, subject to verified platform support.
- Deliverable: two thin plugins plus a shared protocol/conformance fixture set if official host boundaries allow it.
- Scope included: ambiguity triage; extraction of explicit intent/constraints; detection of assumptions and missing decisions; bounded evidence research; Top 3 option synthesis; native choice interaction; accepted-intent handoff; audit receipt; negative and conformance fixtures.
- Scope excluded: replacing the agent loop/model; long-term memory/RAG; model training; standalone SaaS GUI; deployment/publication; support for hosts other than Codex and Claude Code.
- Must / avoid: favor primary/current sources; show evidence scope and uncertainty; ask only decision-bearing questions; cap expensive research; never invent user acceptance.
- Provisional premises to verify: official extension points, interaction-tool availability, cross-surface parity, packaging rules, network/tool permissions, and measurable benchmark design.
- Candidate solutions: (A) shared protocol + native adapters, (B) shared executable core + adapters, (C) independent plugins + conformance suite.
- Done signal: on a fixed benchmark of ambiguous requests, both plugins consistently choose the correct branch—bypass, assume, ask, research, or block—present three materially distinct supported options when research is needed, capture an explicit selection, and hand the same accepted intent contract to downstream work without silently adding scope.
- Open item: reversible assumption—deep research is adaptive, triggered by material ambiguity/risk; concrete low-risk requests bypass it.

### Canonical Skeleton

> For people making ambiguous requests in stock Codex or Claude Code, shape two thin host-native plugins that recover tacit intent through bounded evidence and native reverse questioning, produce an accepted intent contract before substantive work, avoid replacing the host runtime or inventing acceptance, verify official extension surfaces and evaluation validity, and judge the direction by consistent branch decisions plus faithful cross-host handoff on a shared benchmark.

## Project-Local Authority

No project-local gates exist yet.

## Approval Ledger
| State | Artifact | Decision and scope | Authority | Locator | Date | Status |
|---|---|---|---|---|---|---|
| Skeleton approval | `SK@v1` + external SHA-256 receipt | Bounded read-only research only | User | Current task | 2026-08-03 | `PENDING` |
| Synthesized-design approval | `DS@v1` (not created) | Implementation planning only | User | Future explicit message | — | `PENDING` |
| Implementation authorization | Approved design + written plan | Scoped code and verification only | User | Future explicit message | — | `PENDING` |

## Proposed Research Manifest

Research dispatch count remains zero until `SK@v1` is explicitly approved.

| Lane | Exclusive questions | Exclusions | Bound | Output | Stop/escalate | Status |
|---|---|---|---|---|---|---|
| R1 — Codex host surface | Current official plugin packaging, lifecycle interception/routing, native choice tool, permission and install constraints | Claude details; implementation | Official sources + live read-only local help/config; 60 minutes | Evidence-ledger rows + viable adapter surfaces | Stop when each required capability is supported/unknown; escalate on missing official surface | `NOT_AUTHORIZED` |
| R2 — Claude Code host surface | Current official plugin structure, hooks/skills/commands, native choice tool, permission and install constraints | Codex details; implementation | Official sources + live read-only local help/config; 60 minutes | Evidence-ledger rows + viable adapter surfaces | Same rule as R1 | `NOT_AUTHORIZED` |
| R3 — elicitation and evaluation | Research/SOTA on ambiguity clarification, preference/tacit-requirement elicitation, evidence ranking, and benchmarks | Host packaging; implementation | Primary research/official benchmark sources; 90 minutes; practical source cap | Evidence rows + candidate evaluation protocol | Stop at evidence saturation or bound; preserve unknowns | `NOT_AUTHORIZED` |

## Evidence Ledger

| Claim ID | Skeleton field | Finding | Tag | Source/date | Scope match | Implication | Proposed delta |
|---|---|---|---|---|---|---|---|
| L1 | Current project state | Project directory was empty and not a Git repository at intake. | `directly_supported` | Local filesystem and Git, 2026-08-03 | Exact directory/time | No existing implementation or local gate to preserve. | None |
| M1 | First-version scope | Prior related discussion proposed Codex-first and excluded memory/RAG, training, and SaaS GUI. | `near_match_only` | Prior local context, 2026-07-29 | Same concept, older and different host scope | Use only as navigation; current two-host request controls. | Keep exclusions provisional |
| P1 | Codex adapter feasibility | Current official host support not yet researched. | `insufficient` | Research not authorized | Unknown current surface | Do not claim feasibility yet. | R1 |
| P2 | Claude adapter feasibility | Current official host support not yet researched. | `insufficient` | Research not authorized | Unknown current surface | Do not claim feasibility yet. | R2 |
| E1 | Benchmark validity | No exact-scope evidence collected yet that Top 3 research improves tacit-intent recovery. | `insufficient` | Research not authorized | Unknown | Treat benefit as hypothesis and design measurable evaluation. | R3 |

## Synthesis
- Design ID/version: not created
- Explicit unknowns: official host surfaces, common-core boundary, trigger thresholds, source/latency budgets, evaluation baseline and acceptance targets
- Alternatives retained: A, B, C above
- Recommended design: pending authorized research

## Next Action
- Current state: `SKELETON_APPROVAL_PENDING(SK@v1)`
- Authorized action: user review or revision of this skeleton
- Prohibited action: external/deep research, subagent research, code/scaffolding, packaging, installation, deployment
- Next checkpoint: explicit `SK@v1` approval for bounded read-only research

