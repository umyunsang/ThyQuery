# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: `SK`
- Version: `v3`
- Stable locator: `.planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v3.md`
- Status: `SKELETON_APPROVAL_PENDING(SK@v3)`
- Transition: `REVISION_REQUIRED(SK@v2 → SK@v3)`
- Supersedes for future research: approved `SK@v2`
- Created: `2026-08-03` (Asia/Seoul)
- Nearest project authority: user-supplied global `AGENTS.md`; no project-local authority found

## Raw Requests

### Initial request

> 이 프로젝트는 codex나 claude 사용할때 사용자가 질의를 하는 데, 사용자(사람)이 하는 질의 특성상 추상적이고 모호한 표현으로 할텐데 이런 질의를 ai가 그대로 반영하여 작업을 하면, 최종 결과물이 사용자 입장에선 만족스럽운 결과를 받을 확률이 적어 왜냐하면 사용자의 암묵지와 함의가 반영이 안된 결과물을 생성할테니, 따라서 이런 함의나 암묵지를 ai가 역질의와 근거자료,입증자료,벤치마크자료, sota자료들을 딥리서치해서 top3를 제안하여 모호성을 제거해가며 사용자의 암묵지와 함의를 찾아가며 추론하며 실체화하는 플러그인이야, 얇은 하네스로 만들거야 순정의 codex 와 claudecode의 도구 중에 선택지를 제안하는 도구들이있어, 이 도구들을 이용해서 암묵지와 함의를 찾아가는 플러그인을 만들거야 총 2개의 플러그인을 만드는거야 codex용, claude용

### Ralph/termination amendment

> 꼭 후보 top3가 아니여도 되, codex, claude 각각의 내부 도구를 내부문서나 공식자료를 통해 확인하고 정하면될거같아 또한 흐름을 한번만 진행하는게 아니라 완전히 모호성 해결과, 암묵지 해결이 될때 까지 ralph loop 해야해 따라서 ralph 종료조건도 찾아가야해 딥리서치를 통해 관련 연구나 실험 자료를 찾아보고 얼마나 진행되었는지 인지, 방향을 잡고 sota자료나 벤치마크 자료들로 깊은 추론 가장 정합한 종료조건 산식이나 조건을 구축해야해 리서치 스코프도 cs나 과학,수학에만 진행하는게 아니라 철학관련해서도 찾아봐야해 예로 소크라테스리즈닝

### Automatic-routing amendment

> 또한 추가로 최종 사용자는 odex와 claude를 평소 사용하듯이 질의해도 thyquery 가 모델한데 라우팅하여 모호성 감소와 암묵지 해결 랄프 루프를 진행하는거야 (질의 훅을 통해 자동 라우팅되도록)

## Authority Split

### Authoritative Product Intent
- Outcome: ordinary Codex and Claude Code prompts are transparently intercepted before substantive work, routed through ThyQuery triage, and—when materially ambiguous—iteratively resolved into an accepted intent contract before stock execution.
- End-user experience: the user types exactly as they normally do; no `/thyquery`, special launcher prompt, or manual preprocessing step is the primary flow.
- Deliverables: one thin Codex plugin and one thin Claude Code plugin.
- Must: use a current officially supported host query/prompt hook or exact equivalent; run the router exactly once for each genuine user prompt; fast-pass concrete low-risk prompts; block substantive execution for materially ambiguous prompts; run the evidence-backed Ralph-style epistemic loop; hand the resolved contract back to the stock host; expose cancel/opt-out and honest unresolved states.
- Must prevent: hook re-entry on ThyQuery-generated questions, loop continuations, tool messages, and resolved handoffs; duplicate execution of the original prompt; silently substituting a wrapper or slash command for an unsupported automatic hook; resource exhaustion being labeled resolution.
- Research-process constraint: only flat root-owned subagents; no recursive delegation; completed branches are cleaned immediately.
- Explicit approvals: `SK@v2` was approved for its older bounded research scope; this material routing change requires fresh approval of `SK@v3`.

### Provisional Items
- Factual premise: both current hosts expose a sufficiently early, blocking, plugin-available prompt hook that can route ordinary user prompts without replacing the stock client.
- Factual premise: the hook can invoke or influence a model/tool loop, persist session state, and distinguish genuine user prompts from internal continuation traffic.
- Inferred first-version model path: use the current host's model and tools rather than requiring a separate external model service; research may contradict this.
- Success hypothesis: transparent triage plus an evidence-derived closure loop improves task-relevant intent recovery without unacceptable latency or user burden.
- Proposed exclusions: long-term memory/RAG, model training, standalone SaaS GUI, third-host support, and substantive execution before closure.

## Normalized Direction
- Outcome: transparently mediate ordinary host prompts through a stateful ambiguity/tacit-intent resolution layer before normal agent execution.
- Target/context: users of stock Codex and Claude Code surfaces for which official evidence establishes an automatic prompt-hook path.
- Deliverable: two host-native plugins plus a shared router/intent-contract/loop protocol and conformance fixtures, if the host gate passes.
- Included: automatic prompt interception; origin and re-entrancy markers; triage; low-overhead bypass; ambiguity blocking; adaptive questions/research; progress measurement; closure/accepted-residual/block outcomes; resolved-contract handoff; audit receipts; cancel/opt-out; parity and negative fixtures.
- Excluded: a manual command as the primary UX; silently changing the user's normal client; wrapper-only fallback presented as compliant; fixed Top 3; one-pass flow; stock-agent replacement; deployment/publication.
- Must / avoid: verify the exact hook event, timing, mutation/blocking semantics, model visibility, and surface availability from current local/official evidence; never infer automatic interception merely from generic plugin or Stop-hook support.
- Candidate solutions: (A) host-native pre-prompt hook plus same-session state/model, (B) host-native pre-prompt hook plus a shared local ThyQuery controller, (C) no compliant implementation if a host lacks an official blocking prompt hook—wrapper/command fallback requires explicit scope revision.
- Done signal: in each supported stock host, an ordinary unannotated prompt triggers ThyQuery exactly once; concrete requests pass through within a calibrated overhead budget; ambiguous requests cannot begin substantive work before closure; internal loop traffic never recursively re-enters; cancellation and stalled progress terminate honestly; the accepted contract is executed once by the stock host.
- Open item: whether the current host model can perform the loop in-session or the verified hook requires a separate local controller/model call.

### Canonical Skeleton

> For ordinary Codex and Claude Code users, build two thin host-native plugins whose officially supported query hooks transparently route each genuine user prompt through ThyQuery exactly once, fast-pass concrete requests, block and iteratively resolve materially ambiguous requests, prevent internal-message re-entry, and hand one accepted intent contract back to stock execution; treat missing automatic-hook support as a feasibility contradiction rather than silently substituting a command or wrapper.

## Required Runtime State Machine — Research Target

`USER_PROMPT → HOOK_CAPTURE → ORIGIN_CHECK → TRIAGE → PASS_THROUGH | THYQUERY_LOOP → RESOLVED_CONTRACT | ACCEPTED_RESIDUAL | BLOCK/CANCEL → STOCK_EXECUTION`

Required invariants:
1. A genuine user prompt is captured once before substantive planning/tool execution.
2. `origin=thyquery` and continuation/session identifiers bypass root-prompt reclassification.
3. The original prompt is not separately executed after an ambiguity branch begins.
4. Only `RESOLVED_CONTRACT` or explicit `ACCEPTED_RESIDUAL` can authorize stock execution.
5. Hard caps, stalls, hook failures, or cancellation cannot emit `RESOLVED`.

## Provisional Closure Model

The `SK@v2` falsifiable scaffold remains unchanged and unvalidated:

`STOP_t := C_t >= tau_c AND R_t <= tau_r AND X_t = 0 AND D_(t-k:t) <= epsilon AND max_a(EVI(a|state_t) - Cost(a)) <= 0 AND A_t = 1`

Automatic routing adds two non-epistemic preconditions: hook integrity must be intact, and the current message must have valid user origin without duplicate/re-entrant processing.

## Approval Ledger
| State | Artifact | Decision and scope | Authority | Locator | Date | Status |
|---|---|---|---|---|---|---|
| Prior skeleton | `SK@v2` / `264b40…ace3` | Bounded read-only R1–R6 under older routing scope | User | Approval receipt | 2026-08-03 | `SUPERSEDED_FOR_NEW_DISPATCH` |
| Skeleton revision | `SK@v3` + external SHA-256 receipt | Bounded read-only research only | User | Current task | 2026-08-03 | `PENDING` |
| Synthesized design | `DS@v1` (not created) | Implementation planning only | User | Future explicit message | — | `PENDING` |
| Implementation | Approved design + plan | Scoped code/verification | User | Future explicit message | — | `PENDING` |

## Revised Research Manifest

New external/deep research dispatch count under `SK@v3` is zero until exact approval. Research topology is flat; agents may not spawn descendants.

### Stage H — prerequisite host feasibility, two flat parallel lanes

| Lane | Exclusive questions | Bound and sources | Output | Stop/escalate | Status |
|---|---|---|---|---|---|
| H1/R1 — Codex automatic hook | Does current Codex expose a plugin-available event for every ordinary user prompt before stock execution? Can it inspect/modify/block/route, invoke model/tools, persist state, mark continuations, and work across CLI/IDE/Desktop? | Local code/help/schema first; official OpenAI sources only; 75 min / 15 sources | Exact capability matrix and evidence rows | Any missing required capability is explicit `insufficient` or `contradicts_premise`; no wrapper substitution | `NOT_AUTHORIZED` |
| H2/R2 — Claude automatic hook | Same questions for Claude Code; distinguish UserPromptSubmit, Stop, command, skill, and agent surfaces | Local code/help/schema first; official Anthropic sources only; 75 min / 15 sources | Exact capability matrix and evidence rows | Same rule | `NOT_AUTHORIZED` |

### Stage E — run only after host-gate evidence is synthesized

R3 empirical elicitation, R4 formal progress/stopping, R5 philosophy/Socratic reasoning, and R6 Ralph/evaluation retain their `SK@v2` questions and bounds. They remain independent, flat root-owned lanes with no shared writes and no recursive delegation. If either required host gate contradicts automatic routing, the root pauses Stage E and prepares a revision/fallback for user choice.

## Evidence Ledger

| Claim ID | Skeleton field | Finding | Tag | Source/date | Scope match | Implication | Proposed delta |
|---|---|---|---|---|---|---|---|
| U6 | End-user UX | Users must prompt Codex/Claude normally and ThyQuery must route automatically through a query hook. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | Manual invocation is non-compliant. | Add transparent hook invariant |
| U7 | Loop entry | The hook routes the prompt to the model for ambiguity/tacit-intent reduction and Ralph iteration. | `directly_supported` | User amendment, 2026-08-03 | Exact current project | Model/loop availability at hook time is a host gate. | Expand H1/H2 |
| L2 | Local Codex snapshot | Codex CLI 0.146.0 exposes plugins and a hook-trust flag in help, but local help alone does not establish a per-user-prompt blocking hook. | `near_match_only` | Local CLI help, 2026-08-03 | Exact version, incomplete semantics | Do not claim automatic routing yet. | H1/R1 |
| L3 | Local Claude snapshot | Claude Code 2.1.220 exposes plugins and hooks; an official Ralph plugin uses a Stop hook, but this does not establish a pre-prompt routing hook. | `near_match_only` | Local CLI/cache, 2026-08-03 | Exact version, different hook phase | Verify UserPromptSubmit semantics. | H2/R2 |
| H3 | Codex automatic routing | Required hook timing/mutation/blocking/model semantics are unverified. | `insufficient` | New research not approved | Exact host unknown | Codex plugin feasibility remains unknown. | H1/R1 |
| H4 | Claude automatic routing | Required hook timing/mutation/blocking/model semantics are unverified. | `insufficient` | New research not approved | Exact host unknown | Claude plugin feasibility remains unknown. | H2/R2 |
| H5 | Model path | Same-session host model versus separate local controller is unresolved. | `insufficient` | New research not approved | Architecture unknown | Keep both as research alternatives. | H1/H2 |

## Field-Level Diff from `SK@v2`

| Field | `SK@v2` | `SK@v3` | Approval impact |
|---|---|---|---|
| Invocation | Host-native action selection, invocation mode not fixed | Every ordinary prompt is automatically intercepted; no separate command | Material |
| Routing timing | Pre-execution intent loop | Verified hook must run before substantive planning/tool execution | Material |
| Fast path | Adaptive deep research | Every prompt is triaged, concrete prompts fast-pass | Material |
| Loop safety | General caps/stall/cancel | Adds origin marking, idempotency, no duplicate execution, no hook re-entry | Material |
| Feasibility order | R1–R6 parallel | H1/H2 host gate first; R3–R6 second | Material |

## Next Action
- Current state: `SKELETON_APPROVAL_PENDING(SK@v3)`
- Authorized action: user review/revision only
- Prohibited action: new external/deep research, any subagent dispatch, code/scaffolding, installation/configuration, deployment
- Next checkpoint: explicit `SK@v3` approval for the revised bounded read-only research sequence

