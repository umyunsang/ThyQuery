# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: SK
- Version: v7
- Stable locator: .planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v7.md
- Status: SKELETON_APPROVAL_PENDING(SK@v7)
- Base: SK@v6 at SHA-256 108ca29e5a16edace645038fe41de9a713da45880962891ac9a47f494c5858f7
- Transition: REVISION_REQUIRED(SK@v6 → SK@v7)
- Created: 2026-08-03 (Asia/Seoul)

All SK@v6 behavior after verified Plan entry remains effective. This version replaces only the Plan-mode entry contract and the host-feasibility questions affected by it.

## New Raw Request

> 흐름은 이대로 유지하되, 다른 모드에서 $thyquery <질의> 했을때에는 강제로 plan 모드로 변경하고 최종 흐름으로 진행되도록하고 싶어, 예외를 두고 싶지 않아

## Non-Negotiable Product Contract
- $thyquery <최종사용자질의> must accept invocation from every mode declared supported for the installed Codex or Claude Code host/version.
- The explicit invocation itself authorizes an automatic transition into the same host's stock Plan mode.
- Before any ambiguity question, research action, or plan work, ThyQuery must force Plan mode and verify that the effective mode and native structured-interaction surface are active.
- If already in Plan mode, entry is an idempotent no-op.
- The transition must preserve the original query, relevant conversation and workspace context, permissions, and a single logical invocation identity.
- The Ralph pre-layer then follows SK@v6 unchanged: native elicitation, evidence-backed iteration, researched epistemic closure, accepted pre-plan contract, unchanged stock planner, and native plan output.
- ThyQuery stops after the native plan is emitted. It does not execute the plan and does not automatically leave Plan mode.
- There is no manual-switch, prose-question, skipped-transition, or wrapper-presented-as-native fallback.
- A host/version that cannot satisfy forced Plan entry through an official supported mechanism is incompatible and must not be advertised, packaged, or accepted as a compliant ThyQuery target.
- A declared-supported runtime whose transition fails emits HOST_CAPABILITY_CONTRADICTION and no plan. This is an integrity failure, not an exception path or successful degradation.
- Ordinary prompts remain untouched; only explicit $thyquery invocation triggers the transition and loop.
- Research delegation remains flat and root-owned, with no recursive agents and immediate cleanup of every completed branch and session.

## Confirmed Evidence Versus Premises

### Confirmed in current local scope
- The current Codex Default-mode task rejects request_user_input.
- This task exposes no model-callable collaboration-mode switch, and its active mode changes only through host/developer-level control.
- Local Claude Code 2.1.220 accepts plan as a --permission-mode launch or session configuration value.

### Still unverified
- A Codex skill or plugin can force the current task into Plan mode.
- A Claude Code plugin or command can force an already-running interaction into Plan mode.
- Either host can preserve all relevant context and one-invocation semantics during the transition.
- The desired exact $thyquery invocation spelling is native in both hosts.
- The stock question interface and native planner remain available to the invoked plugin immediately after transition.

The required behavior is authoritative; these capability claims remain provisional. Exact official evidence may prove a required host target infeasible.

## Normalized Direction
- Outcome: wherever a supported user invokes $thyquery, the host is atomically placed in verified stock Plan mode and produces a more concrete native plan after the ThyQuery Ralph pre-layer closes.
- Target: every explicitly declared supported mode and surface of current Codex and Claude Code.
- Deliverables: two thin host-native plugins plus a shared mode-entry receipt, pre-plan intent contract, Ralph state and evidence ledger, closure predicate, native-plan provenance receipt, and cross-host conformance fixtures.
- Included: mode detection; official forced Plan entry; transition verification; context continuity; native questions and choices; ambiguity and tacit-intent loop; deep evidence actions when warranted; closure; native-planner handoff; native plan emission.
- Excluded: ordinary-prompt interception; manual switching; unsupported-host fallback; prose simulation of the native choice UI; wrapper-only parity; independent ThyQuery plan rendering; plan execution; automatic Plan exit; fixed Top 3.
- Done signal: for every declared supported starting mode in both hosts, one $thyquery invocation demonstrably yields verified Plan mode, one uninterrupted logical loop, an accepted contract, and one stock-authored native plan; negative fixtures prove that no prohibited fallback is taken.
- Open research item: whether the current official host extension surfaces can satisfy this no-exception contract at all.

## Mode-Entry Approaches to Verify

| Approach | Shape | Compliance status |
|---|---|---|
| A — official same-session mode mutation | The invoked plugin changes the current session to Plan, verifies it, and continues with the same query/context | Preferred and thinnest if officially supported |
| B — official transparent Plan re-dispatch | A host-native command atomically re-dispatches the same logical invocation into stock Plan mode with verified context and identity continuity | Potentially compliant only if official evidence and tests prove semantic continuity |
| C — manual switch, wrapper, or prose fallback | Ask the user to change modes, launch an external wrapper, or emulate structured choices | Explicitly non-compliant |

No architecture may weaken the no-exception contract. If neither A nor a provably equivalent B exists for a required host, synthesis must return HOST_UNSUPPORTED rather than choose C.

## Revised Runtime State Machine

    EXPLICIT $thyquery <QUERY> FROM ANY DECLARED SUPPORTED MODE
      -> CAPTURE QUERY, CONTEXT DIGEST, PERMISSIONS, INVOCATION ID
      -> DETECT CURRENT MODE
           | PLAN: IDEMPOTENT ENTRY
           | OTHER: FORCE STOCK PLAN MODE THROUGH OFFICIAL HOST SURFACE
      -> VERIFY MODE = PLAN
      -> VERIFY CONTEXT AND INVOCATION CONTINUITY
      -> VERIFY NATIVE STRUCTURED-INTERACTION SURFACE
           | ANY FAILURE: HOST_CAPABILITY_CONTRADICTION, NO PLAN
           | ALL PASS: INITIALIZE PRE-PLAN CONTRACT
      -> RALPH EPISTEMIC LOOP
      -> EPISTEMIC_CLOSED | ACCEPTED_RESIDUAL | CANCEL | BLOCK
      -> ON SUCCESS, HAND CONTRACT TO UNCHANGED STOCK PLANNER
      -> STOCK PLANNER WRITES NATIVE PLAN
      -> VERIFY NATIVE_PLAN_EMITTED AND STOCK PROVENANCE
      -> THYQUERY COMPLETE IN PLAN MODE

## Mode-Entry Predicate

    PLAN_ENTRY_OK :=
      effective_mode = PLAN
      AND native_question_surface = AVAILABLE
      AND query_digest_after = query_digest_before
      AND context_continuity = VERIFIED
      AND invocation_count = 1
      AND transition_surface = OFFICIAL_HOST

When the starting mode is already Plan, transition_surface may be IDEMPOTENT_NOOP. No other clause is optional.

## Completion Contract

    THYQUERY_COMPLETE :=
      PLAN_ENTRY_OK
      AND EPISTEMIC_CLOSED_OR_ACCEPTED_RESIDUAL
      AND NATIVE_HANDOFF_CONFIRMED
      AND NATIVE_PLAN_EMITTED
      AND PLAN_PROVENANCE = STOCK_HOST

Cancellation, blocking, resource exhaustion, transition failure, context loss, duplicate invocation, or a plugin-authored substitute plan cannot satisfy completion.

## Compatibility Policy
- The no-exception requirement applies to every mode explicitly listed as supported by the plugin package.
- A host/version is supported only after every relevant starting-mode fixture passes mode entry, continuity, Ralph-loop, handoff, and native-plan provenance checks.
- Partial support cannot be rounded up to host support.
- Unsupported host/version combinations are rejected before normal use and are not given a manual runtime workaround.
- Capability drift in a later host release reopens R1 or R2 and may withdraw compatibility until revalidated.

## Revised Research Manifest

External and deep research dispatch count remains zero until exact SK@v7 approval. All lanes are read-only, non-overlapping, flat, root-owned, and forbidden from spawning descendants. The root integrates and immediately closes each completed branch and session.

| Lane | Exclusive questions | Allowed sources and bound | Output | Stop or escalate | Status |
|---|---|---|---|---|---|
| R1 — Codex forced Plan composition | Enumerate current Codex modes/surfaces; exact $thyquery syntax; plugin-callable official mode transition; same-session or equivalent continuity; request_user_input after transition; native planner handoff and plan provenance | Bounded local help, schemas, code, config, and live non-mutating probes first; official OpenAI sources only; 90 min or 18 material sources | Per-mode capability matrix, transition sequence, evidence rows, A/B verdict | Any required missing capability is contradicts_premise; never propose C | NOT_AUTHORIZED |
| R2 — Claude Code forced Plan composition | Enumerate permission modes/surfaces; exact command/skill syntax; plugin-callable Plan transition versus launch-only configuration; AskUserQuestion or equivalent availability; context continuity; native planner handoff and provenance | Bounded local help, schemas, installed official plugins, config, and non-mutating probes first; official Anthropic sources only; 90 min or 18 material sources | Per-mode capability matrix, transition sequence, evidence rows, A/B verdict | Same rule as R1 | NOT_AUTHORIZED |
| R3 — elicitation and plan quality | Empirical clarification, grounding, requirements and tacit-knowledge elicitation; user burden; measures linking intent recovery to downstream native-plan quality | Primary papers, official datasets/evals, systematic reviews; 90 min or 20 material sources | Observable state and paired plan-quality variables | Stop at bound or saturation; preserve contradictions | NOT_AUTHORIZED |
| R4 — progress and stopping | Active learning, Bayesian design, information gain and VOI, sequential analysis, calibration, convergence, optimal stopping, and task-relative closure | Primary mathematical, statistical, and ML sources; 90 min or 20 material sources | Candidate estimators and closure predicates with assumptions and failure cases | Escalate if variables are not observable or calibratable | NOT_AUTHORIZED |
| R5 — philosophy and Socratic reasoning | Socratic elenchus and maieutics, hermeneutic iteration, pragmatics, epistemic humility, tacit knowledge, and operational mappings | Primary texts where practical, scholarly references, peer-reviewed cross-disciplinary work; 90 min or 18 material sources | Mechanism-to-loop mappings with evidence tags | Decorative analogy remains near_match_only | NOT_AUTHORIZED |
| R6 — Ralph, transition, and paired evaluation | Ralph safeguards; loop pathologies; every-starting-mode negative fixtures; context-loss and duplicate-execution tests; stock Plan versus ThyQuery-plus-stock-Plan benchmark; native-plan provenance | Primary implementations/docs, empirical agent-eval papers, official benchmarks; 90 min or 20 material sources | Guard set, test matrix, benchmark and provenance protocol | Escalate on missing baseline control or unverifiable transition | NOT_AUTHORIZED |

## Evidence Ledger Delta

| Claim ID | Finding | Evidence tag | Implication |
|---|---|---|---|
| U13 | $thyquery must force Plan mode when invoked from another mode and then run the unchanged final flow | directly_supported | Automatic Plan entry is a non-negotiable contract |
| U14 | No manual or degraded exception is acceptable | directly_supported | Unsupported capability blocks host compatibility |
| U15 | Invocation while already in Plan mode follows the same final flow | directly_supported | Entry must be idempotent |
| C4 | This current Codex task exposes no model-callable collaboration-mode switch | directly_supported for this task only | R1 must find an exact plugin/host surface or report contradiction |
| A3 | Claude Code 2.1.220 exposes plan through --permission-mode | directly_supported for local CLI launch/config scope | It does not yet prove plugin-controlled in-session transition |
| H5 | Both host plugins can force Plan mode with context continuity | insufficient | First feasibility gate for R1 and R2 |

## Approval Ledger

| Artifact | Scope | Status |
|---|---|---|
| SK@v6 / 108ca2…58f7 | Plan-only invocation and Ralph pre-layer research | SUPERSEDED_FOR_NEW_DISPATCH |
| SK@v7 plus external SHA-256 receipt | No-exception forced Plan entry plus unchanged Ralph-to-native-plan flow; R1–R6 bounded read-only research | PENDING |
| DS@v1 | Synthesized architecture and implementation-planning authority | NOT_CREATED |
| Implementation authorization | Code, scaffolding, installation, configuration, and tests | NOT_GRANTED |

## Field-Level Diff from SK@v6

| Field | SK@v6 | SK@v7 |
|---|---|---|
| Starting mode | User must already be in Plan | Any declared supported mode |
| Mode behavior | No switching | Explicit invocation forces and verifies stock Plan |
| Failure behavior | PLAN_MODE_REQUIRED | Compatibility contradiction; no manual/degraded fallback |
| Already Plan | Required precondition | Idempotent entry into identical flow |
| Ralph loop | Thin pre-plan layer | Unchanged |
| Final artifact | Stock-authored native plan | Unchanged |
| Exit behavior | Remain in Plan; no execution | Unchanged |
| Host gate | Plan-only composition | Per-mode forced-entry and continuity matrix |

## Next Action
- Current state: SKELETON_APPROVAL_PENDING(SK@v7)
- Authorized now: user review and bounded local skeleton validation only
- Not authorized: external or deep research, subagent dispatch, code, scaffolding, installation, configuration, deployment, publication, or plan execution
- Next checkpoint: exact SK@v7 approval for the six bounded read-only research lanes
