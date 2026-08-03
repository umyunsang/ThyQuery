# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: SK
- Version: v6
- Stable locator: .planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v6.md
- Status: SKELETON_APPROVAL_PENDING(SK@v6)
- Base: SK@v5 at SHA-256 28f73152a9c156b45b2538719226ff5abf6598a2129d9929fd063d3be4d5c376
- Transition: REVISION_REQUIRED(SK@v5 → SK@v6)
- Created: 2026-08-03 (Asia/Seoul)

All earlier requirements remain effective only where they do not conflict with this version. Approval of SK@v6 authorizes the bounded read-only research manifest in this document, not implementation.

## New Raw Request

> 흐름을, 플랜모드에서만 $thyquery 가 사용할수있고, $thyquery는 순정 플랜모드와 다르게 기존 순정 플랜모드에서 ralph loop를 추가하는거야 얇은 레이어로 종료조건이 되어 종료되었을땐 순정 플랜기능으로 플랜이 작성되지만 좀더 실체화되고 모호성이 최소환된 플랜으로 작성되는거지

## Authoritative Product Direction
- $thyquery <최종사용자질의> is available only while the current host is already in its stock Plan mode.
- ThyQuery never enters, forces, leaves, or otherwise changes the host mode.
- An invocation outside Plan mode returns PLAN_MODE_REQUIRED and performs no ambiguity loop or planning work.
- ThyQuery is a thin pre-planning layer, not an alternative planner.
- It augments the stock Plan flow with an evidence-backed Ralph loop that elicits implications, tacit preferences, constraints, acceptance criteria, trade-offs, and unresolved risks.
- Question form and option count remain adaptive and use verified stock Plan-mode interaction tools.
- The Ralph loop ends only under the researched epistemic closure condition, explicit acceptance of documented residual uncertainty, cancellation, or honest blocking.
- On successful closure, ThyQuery passes a concretized pre-plan intent contract to the unchanged native Plan function.
- The stock Codex or Claude Code planner owns and writes the final user-facing plan.
- The final plan should be more concrete, less materially ambiguous, better evidenced, and more aligned with the user's intent than a stock Plan run over the raw request.
- ThyQuery stops after the native plan is emitted. It does not execute the plan.
- Research agents, if later approved, are flat and root-owned; they may not spawn descendants, and each completed branch and session is cleaned immediately.

## Explicitly Removed from SK@v5
- Automatic or forced entry into Plan mode.
- Mode-transition capability research as a product prerequisite.
- Resume state for a mid-flow user mode switch.
- Automatic return from Plan mode to an execution mode.
- A direct handoff from ThyQuery to substantive stock execution.

## Normalized Direction
- Outcome: within an already-active stock Plan session, turn the raw $thyquery query into an epistemically closed intent contract and use the stock planner to emit the final enriched plan.
- Target: Codex and Claude Code Plan-mode users.
- Deliverables: two thin host-native plugins plus a shared pre-plan intent-contract schema, Ralph state model, evidence ledger, researched closure predicate, audit receipt, and cross-host conformance and benchmark fixtures.
- Included: Plan-mode precondition check; native questions and choices; ambiguity and tacit-gap modeling; bounded research; counterexamples and benchmark evidence; iterative contract updates; progress and closure measurement; native-plan handoff; final plan provenance.
- Excluded: ordinary-prompt interception; mode switching; fixed Top 3; one-pass clarification; an independent ThyQuery plan renderer; stock planner replacement; plan execution; long-term memory or RAG; model training; standalone SaaS GUI; third host.
- Done signal: in both verified host surfaces, stock Plan mode plus $thyquery produces a native host plan after an honest Ralph closure; outside Plan mode it fails closed; paired tests show the native plan received a more complete and stable intent basis without losing stock Plan semantics.
- Open research item: the exact host mechanism that lets an invoked plugin defer stock planning, run the loop, and then return control plus the accepted contract to the same native planner.

## Thin-Layer Integration Candidates

| Approach | Shape | Trade-off |
|---|---|---|
| A — same-session pre-plan contract injection | $thyquery runs the Ralph loop inside Plan mode, then supplies the accepted contract as the authoritative planning input and lets the current stock planner continue | Recommended: thinnest and closest to the requested semantics, but requires a verified native continuation or handoff surface |
| B — two-phase native Plan handoff | $thyquery completes the loop and emits a sealed contract, then invokes or resumes a separate stock Plan primitive with that contract in the same host | Easier to isolate and test, but may add a visible second transition and duplicate context |
| C — ThyQuery-authored final plan | The plugin writes the final plan itself using stock-like formatting | Excluded: it replaces rather than augments the native planner |

R1 and R2 may select A or B only from exact host evidence. C cannot be presented as compliant.

## Runtime State Machine

    STOCK PLAN MODE ALREADY ACTIVE
      -> EXPLICIT $thyquery <QUERY>
      -> VERIFY PLAN MODE AND REQUIRED NATIVE INTERACTION SURFACE
           | NOT READY: PLAN_MODE_REQUIRED OR HOST_CAPABILITY_BLOCK, STOP
           | READY: INITIALIZE PRE-PLAN CONTRACT
      -> OBSERVE EXPLICIT REQUEST AND CONTEXT
      -> MODEL AMBIGUITIES, TACIT HYPOTHESES, CONFLICTS, AND RISKS
      -> SELECT HIGHEST-VALUE NATIVE EPISTEMIC ACTION
      -> QUESTION | RESEARCH | TEST | CHALLENGE | SUMMARIZE | CONFIRM
      -> UPDATE CONTRACT AND EVIDENCE LEDGER
      -> MEASURE PROGRESS AND TEST EPISTEMIC CLOSURE
           | CONTINUE
           | CANCEL OR BLOCK
           | EPISTEMIC_CLOSED
      -> HAND ACCEPTED CONTRACT TO STOCK PLAN FUNCTION
      -> STOCK PLANNER WRITES NATIVE PLAN
      -> VERIFY NATIVE_PLAN_EMITTED AND PROVENANCE
      -> THYQUERY COMPLETE

## Two-Level Completion Contract

### Level 1 — Ralph epistemic closure
The researched closure model determines whether further questioning, research, or challenge has positive decision value. The provisional formula from SK@v4 remains a falsifiable scaffold:

    EPISTEMIC_CLOSED_t :=
      C_t >= tau_c
      AND R_t <= tau_r
      AND X_t = 0
      AND D_(t-k:t) <= epsilon
      AND max_a(EVI(a | state_t) - Cost(a)) <= 0
      AND A_t = 1

This level does not mean that a plan has been written. Hard caps, stalls, timeouts, cancellation, or tool failure cannot satisfy it.

### Level 2 — native plan completion

    THYQUERY_COMPLETE :=
      EPISTEMIC_CLOSED
      AND NATIVE_HANDOFF_CONFIRMED
      AND NATIVE_PLAN_EMITTED
      AND PLAN_PROVENANCE = STOCK_HOST

The plugin must not claim completion if it writes a substitute plan or cannot verify that the stock planner consumed the accepted contract.

## Required Invariants
1. $thyquery is unavailable outside verified stock Plan mode.
2. ThyQuery does not change the current mode.
3. The stock question and proposal interface is used when verified; choice cardinality remains adaptive.
4. Native plan generation cannot begin before EPISTEMIC_CLOSED or explicit accepted residual uncertainty.
5. The pre-plan contract is traceable to user answers and evidence, but hidden internal hypotheses are never silently promoted to commitments.
6. The native planner, not ThyQuery, owns final plan generation and formatting.
7. The final receipt distinguishes the raw request, accepted contract, native plan, residual uncertainty, and both completion events.
8. The plugin never executes the resulting plan.

## Revised Research Manifest

External and deep research dispatch count remains zero until exact SK@v6 approval. All lanes are read-only, non-overlapping, flat, root-owned, and forbidden from spawning descendants. The root integrates and immediately closes every completed branch and session.

| Lane | Exclusive questions | Allowed sources and bound | Output | Stop or escalate | Status |
|---|---|---|---|---|---|
| R1 — Codex Plan-mode composition | Exact $thyquery skill/plugin syntax in Plan mode; Plan-mode detection; request_user_input and other native elicitation semantics; how to defer native planning; same-session contract handoff; how to prove the stock planner authored the final plan | Bounded local help, schema, code, and config first; official OpenAI sources only; 75 min or 15 material sources | Capability and sequence matrix, evidence rows, A/B mapping | Preserve unknowns; contradict if no compliant native handoff exists | NOT_AUTHORIZED |
| R2 — Claude Code Plan-mode composition | Exact native command/skill syntax; Plan-mode precondition; actual question/choice tool availability; plugin and native Plan composition; contract handoff; native plan provenance | Bounded local help, schemas, installed official plugins, and config first; official Anthropic sources only; 75 min or 15 material sources | Capability and sequence matrix, evidence rows, A/B mapping | Distinguish command, skill, hook, mode, and wrapper behavior | NOT_AUTHORIZED |
| R3 — elicitation and plan quality | Empirical clarification, grounding, requirements and tacit-knowledge elicitation; measures linking recovered intent to downstream plan quality and user burden | Primary papers, official datasets/evals, systematic reviews; 90 min or 20 material sources | Observable contract and plan-quality variables | Stop at bound or saturation; preserve contradictions | NOT_AUTHORIZED |
| R4 — progress and stopping | Active learning, Bayesian design, information gain and VOI, sequential analysis, calibration, convergence, optimal stopping, and task-relative closure | Primary mathematical, statistical, and ML sources; 90 min or 20 material sources | Candidate estimators and closure predicates with assumptions and failure cases | Escalate if dialogue variables are not observable or calibratable | NOT_AUTHORIZED |
| R5 — philosophy and Socratic reasoning | Socratic elenchus and maieutics, hermeneutic iteration, pragmatics, epistemic humility, tacit knowledge, and operational mappings to the pre-plan loop | Primary texts where practical, scholarly references, peer-reviewed cross-disciplinary work; 90 min or 18 material sources | Mechanism-to-loop mappings with evidence tags | Decorative analogy remains near_match_only | NOT_AUTHORIZED |
| R6 — Ralph and paired evaluation | Ralph implementations and safeguards; loop pathologies; negative fixtures; paired stock-Plan versus ThyQuery-plus-stock-Plan benchmarks; native-plan provenance checks | Primary implementations/docs, empirical agent-eval papers, official benchmarks; 75 min or 18 material sources | Guard set, benchmark protocol, termination and provenance tests | Escalate on missing provenance or invalid baseline control | NOT_AUTHORIZED |

## Evidence Ledger Delta

| Claim ID | Finding | Evidence tag | Implication |
|---|---|---|---|
| U9 | $thyquery is usable only after the user is already in stock Plan mode | directly_supported | Remove all automatic mode-entry behavior |
| U10 | ThyQuery adds a Ralph loop as a thin layer within the existing stock Plan flow | directly_supported | Product boundary is pre-planning augmentation |
| U11 | Successful closure must feed the stock Plan function, which writes the final plan | directly_supported | Native plan provenance is a core invariant |
| U12 | The intended benefit is a more concrete, minimally ambiguous native plan | directly_supported | R3 and R6 require paired downstream plan-quality evaluation |
| H3 | Both hosts expose a plugin-to-native-planner handoff that preserves stock authorship | insufficient | R1 and R2 are prerequisite feasibility gates |
| H4 | Native plan provenance and contract consumption are observable | insufficient | R1, R2, and R6 must define receipts and tests |

## Approval Ledger

| Artifact | Scope | Status |
|---|---|---|
| SK@v5 / 28f731…5c376 | Plan-mode entry and transition research | SUPERSEDED_FOR_NEW_DISPATCH |
| SK@v6 plus external SHA-256 receipt | Plan-only Ralph pre-layer and native-plan handoff; R1–R6 bounded read-only research | PENDING |
| DS@v1 | Synthesized architecture and implementation-planning authority | NOT_CREATED |
| Implementation authorization | Code, scaffolding, installation, configuration, and tests | NOT_GRANTED |

## Field-Level Diff from SK@v5

| Field | SK@v5 | SK@v6 |
|---|---|---|
| Mode behavior | Prefer automatic Plan entry, fail closed if unavailable | Already-active Plan mode is a strict prerequisite; no switching |
| Product role | Intent loop followed by general stock-host handoff | Ralph pre-layer inside the stock Plan flow |
| Final artifact | Accepted contract for later execution | Native stock-host plan generated from the accepted contract |
| Planner ownership | Unspecified handoff destination | Stock Plan function exclusively owns final plan writing |
| Terminal event | Verified post-closure handoff | EPISTEMIC_CLOSED then NATIVE_PLAN_EMITTED |
| Execution | Research Plan-to-execution transition | Explicitly outside current product scope |
| Evaluation | Loop and contract correctness | Adds paired stock Plan baseline and native-plan provenance |

## Next Action
- Current state: SKELETON_APPROVAL_PENDING(SK@v6)
- Authorized now: user review and bounded local skeleton validation only
- Not authorized: external or deep research, subagent dispatch, code, scaffolding, installation, configuration, deployment, publication, or plan execution
- Next checkpoint: exact SK@v6 approval for the six bounded read-only research lanes
