# ThyQuery Project Skeleton

## Metadata

- Skeleton ID: `SK`
- Version: `v8-B`
- Stable locator: `.planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v8_B.md`
- Status: `SKELETON_APPROVAL_PENDING(SK@v8-B)`
- Base: `DS@v1` at SHA-256 `e0ca37515aa338314cbbe5984efba241c88f957fb16d38cfc1974805ddb2845f`
- Selection receipt: exact user message `DS@v1-B 승인` on 2026-08-03
- Transition: `SK@v7 HOST_UNSUPPORTED → PATH_B_SELECTED → SK@v8-B`
- Created: 2026-08-03 (Asia/Seoul)

This skeleton supersedes SK@v7 wherever the two conflict. It preserves the researched ThyQuery Ralph pre-layer while replacing common dollar invocation, automatic cross-mode Plan entry, and strict exclusive planner provenance with the approved Path B contract.

## Selected Product Contract

- Produce two thin host-native plugins: one for current Codex and one for current Claude Code.
- ThyQuery is a Plan-first pre-planning layer. The user enters the host's stock Plan mode before invoking ThyQuery.
- ThyQuery never changes permission/collaboration mode, starts a wrapper session, or intercepts ordinary prompts.
- Invocation uses each host's documented native grammar:
  - Codex: `$thyquery <최종사용자질의>`
  - Claude Code canonical plugin form: `/thyquery:thyquery <최종사용자질의>`
  - Claude Code `/thyquery <질의>` may be tested as a conflict-free convenience alias, but it is not a portability or conformance guarantee.
- Invocation while stock Plan is active performs an idempotent Plan/capability preflight and then starts the same shared Ralph protocol.
- Invocation outside verified stock Plan fails closed as `PLAN_MODE_REQUIRED`; it asks no ThyQuery questions, performs no ThyQuery research, writes no plan, and does not simulate the native interface in prose.
- The user may then enter Plan through the stock host controls and invoke ThyQuery again. The second command is a new explicit invocation, not hidden continuation or automatic re-dispatch.
- Successful epistemic closure produces a canonical pre-plan intent contract in the same Plan session. The host's normal Plan finalization then emits the native plan.
- ThyQuery never emits a substitute final plan, approves the plan, executes it, or automatically exits Plan.
- Native-plan provenance is operational rather than exclusive-token provenance: verified stock Plan, contract continuity, native plan surface/event, no substitute renderer, exactly one observed plan, and no execution.
- Ordinary non-ThyQuery prompts remain untouched.
- Fixed Top 3, fixed question count, model-authored completion promises, blind prompt repetition, and cap-as-success are prohibited.

## User-Facing Flow

### Codex

```text
User enters stock Plan mode through the host's native Plan control
  -> user invokes: $thyquery <query>
  -> Plan/capability preflight
  -> Ralph intent-resolution loop using native request_user_input
  -> accepted intent contract
  -> stock Plan finalization
  -> native Codex plan item
  -> ThyQuery stops; no execution
```

### Claude Code

```text
User enters stock Plan mode through the host's native Plan control
  -> user invokes: /thyquery:thyquery <query>
  -> Plan/capability preflight
  -> Ralph intent-resolution loop using native AskUserQuestion
  -> accepted intent contract
  -> stock Plan presentation/finalization
  -> native Claude Plan surface
  -> ThyQuery stops before user approval/execution changes mode
```

The host-specific entry ceremony is intentional in Path B. The plugins must not claim automatic Plan entry or cross-host invocation-spelling parity.

## Preflight Contract

```text
PLAN_FIRST_OK :=
  effective_mode = STOCK_PLAN
  AND native_question_surface = AVAILABLE
  AND original_query_is_present
  AND relevant_context_is_available
  AND no_permission_or_authority_escalation
  AND invocation_is_explicit_and_host_native
```

- Each adapter must use an official observable mode/capability signal where available.
- A tool listed in a schema but rejected at runtime is unavailable.
- If reliable mode observation is unavailable, the adapter must fail closed or use a bounded native capability check whose user-visible effect is specified and tested; it must not infer Plan merely from prompt text.
- `request_user_input` is the current Codex Plan elicitation target. The current Default-mode rejection remains a negative control.
- `AskUserQuestion` is the current Claude native elicitation target. Even though it is not intrinsically Plan-only, ThyQuery still enforces the Plan-first product contract.
- Host/version/surface combinations are supported independently. A passing CLI fixture does not prove Desktop, IDE, web, or remote parity.

## Thin Architecture

### Shared specification layer

Share only portable behavior and data contracts:

- intent-contract schema and field provenance;
- ambiguity/materiality taxonomy;
- question/research/action-selection policy;
- evidence-quality and intent-drift policy;
- Ralph lifecycle and typed terminals;
- closure predicate and calibration metadata;
- cross-host semantic fixtures and paired evaluation protocol.

### Codex adapter

- Distributed as a Codex plugin/skill named `thyquery` using the official `$skill` invocation form.
- Uses only Plan-available native questions and read-only research/inspection tools allowed by the current task.
- Does not call app-server mode mutation, a custom client, or an external controller.
- Accepts native Codex plan-item emission as the operational final surface.

### Claude Code adapter

- Distributed as a Claude Code plugin named `thyquery` with a skill named `thyquery`, yielding canonical `/thyquery:thyquery` invocation.
- Uses `AskUserQuestion` for structured elicitation and host-native Plan presentation/finalization behavior.
- Does not call `EnterPlanMode` as a fallback, rewrite `$thyquery`, use prompt interception, or launch a nested Claude/SDK controller.
- Measures completion at native plan presentation before any user approval causes mode exit or execution.

### State and helper boundary

- No always-on daemon, remote service, model proxy, wrapper CLI, long-term memory/RAG, or separate planner.
- Deterministic helpers may validate schemas, hashes, state transitions, evidence tags, or fixtures if later implementation planning proves they can run without violating Plan/read-only semantics.
- Runtime state is session- and invocation-scoped. It must not leak between users, tasks, or projects.
- Project source files must not be modified merely to maintain the Ralph loop.
- Crash/restart durability may be claimed only when a host-approved, tested state surface exists. In-context state alone cannot be advertised as durable recovery.

## Pre-Plan Intent Contract

Every material field stores:

- value and criticality;
- provenance and source turn/evidence;
- disposition and user receipt where required;
- last material change;
- uncertainty/calibration version when applicable;
- dependencies invalidated by a later revision.

Minimum field groups:

- original query and relevant context manifest;
- goal, deliverable, audience and use context;
- inclusions, exclusions and non-goals;
- environment, inputs, constraints and authority boundaries;
- priorities, trade-offs and reversibility;
- evidence standard, benchmark/SOTA relevance and source lineage;
- acceptance criteria and verification surfaces;
- explicit commitments and user-confirmed terminology;
- implicature hypotheses and common-ground candidates;
- evidence-derived and model-inferred proposals;
- rejected interpretations, contradictions and infeasible combinations;
- tacit residuals, epistemic limits and accepted discovery steps;
- burden, progress, stability and candidate-action value diagnostics.

Allowed field provenance includes:

`user_explicit`, `user_confirmed`, `evidence_derived`, `model_inferred`, `rejected`, `deferred`, `residual`.

A material `evidence_derived` or `model_inferred` value cannot become accepted intent without an explicit user disposition. Verbatim, already-concrete user commitments are not repeatedly re-asked unless later evidence creates a material conflict.

## Ralph Action Policy

For each iteration:

1. Separate specification uncertainty, model/evidence uncertainty and host/capability uncertainty.
2. Identify open dimensions that could materially change the native plan, authorization, cost, risk, acceptance test or irreversible action.
3. Generate admissible next actions: native question, bounded research, source comparison, counterexample/scenario probe, contract-delta confirmation, residual acceptance, capability disclosure, block or cancel.
4. Research external facts; ask users about their preferences, authority and trade-offs; disclose/reframe host or model incapability.
5. Rank questions by expected downstream risk reduction, answerability, evidence quality and materiality minus time, cognitive burden, redundancy, privacy exposure and intent-drift risk.
6. Ask one plan-changing decision per item unless multiple questions are independent and the native tool's current schema safely supports batching.
7. Use open input when the frame is uncertain. Choices are evidence-linked hypotheses with neutral wording and `Other`/correction, `none`, `unsure/defer` and `cancel` paths wherever the host supports them.
8. Record the material contract delta and its consequence. Do not count rephrasing or unsupported self-critique as progress.
9. Recompute closure and either continue, hand off, or enter a typed non-success terminal.

Question count and candidate count are adaptive to material information need and the verified native host limits. No shared numeric cardinality is a product rule.

## Closure Contract

“Complete tacit knowledge recovered” is not an observable claim. Success means decision-sufficient, user-grounded closure for the current planning task, with remaining limits visible.

```text
INTEGRITY_OK_t :=
  PLAN_FIRST_OK
  AND evidence_provenance_valid
  AND state_and_invocation_ownership_valid
  AND no_nonwaivable_authority_or_safety_failure

PHILOSOPHICAL_GUARD_t :=
  no_material_conflict_among_user_endorsed_commitments
  AND every_high_impact_implicature IN {confirmed, rejected, residualized}
  AND required_counterexample_or_scenario_probe_completed
  AND no_unaccepted_frame_revision
  AND user_had_real_correct_defer_cancel_paths
  AND tacit_residuals_and_epistemic_limits_recorded

EPISTEMIC_CLOSED_t :=
  INTEGRITY_OK_t
  AND PHILOSOPHICAL_GUARD_t
  AND all_critical_fields_closed
  AND LCB(critical_coverage_t) >= tau_C[risk_tier]
  AND UCB(residual_decision_risk_t) <= tau_R[risk_tier]
  AND unresolved_critical_contradictions_t = 0
  AND targeted_challenge_passed
  AND UCB(semantic_decision_delta_t) <= epsilon_D[risk_tier]
  AND UCB(max_net_value_of_admissible_1_to_H_step_action_t) <= 0
  AND calibration_valid_for_current_stratum
  AND plan_input_ready
  AND no_unauthorized_intent_drift
  AND explicit_resolved_acceptance_when_material_deltas_exist
```

- One-step VOI is insufficient unless a diminishing-returns/no-synergy condition is proved; otherwise use the approved bounded lookahead guard.
- `tau_C`, `tau_R`, `epsilon_D`, stability window, lookahead horizon and burden/resource budgets are not universal constants. They must be host/domain/risk-versioned and calibrated on held-out data.
- Before calibration is valid for a stratum, the plugin cannot claim calibrated `EPISTEMIC_CLOSED`. A controlled pilot may hand off only through an explicitly disclosed `ACCEPTED_RESIDUAL` path that names the calibration limitation.
- A concrete query with no material model/research-added delta does not require ceremonial re-confirmation of every verbatim field; any new material inference or residual does.

## Typed Outcomes

| Outcome | Native-plan handoff | Meaning |
|---|---:|---|
| `EPISTEMIC_CLOSED` | Yes | Calibrated, decision-sufficient closure and required acceptance passed. |
| `ACCEPTED_RESIDUAL` | Yes | Authorized user explicitly accepts enumerated residuals, consequences and mitigations; no non-waivable gate failed. |
| `PLAN_MODE_REQUIRED` | No | Invocation did not begin in verified stock Plan. |
| `CANCELLED` / `USER_STOP` | No | User ended the invocation. |
| `BLOCKED` / `INFEASIBLE` | No | Required evidence, authority, capability or feasible interpretation is absent. |
| `STALLED` | No | No justified information-changing action remains. |
| `RESOURCE_EXHAUSTED` | No | A host/time/turn/token/source/cost cap ended work; never success. |
| `STATE_CORRUPT` | No | Ownership, schema, digest, version or replay integrity failed. |
| `HOST_CAPABILITY_CONTRADICTION` | No | A previously declared host capability failed its runtime receipt/fixture. |

Only `EPISTEMIC_CLOSED` and `ACCEPTED_RESIDUAL` authorize one native-plan handoff.

## Operational Native-Plan Provenance

```text
OPERATIONAL_NATIVE_PLAN_OK :=
  verified_stock_plan_at_thyquery_entry
  AND accepted_contract_continuity
  AND native_plan_item_or_approval_surface_observed
  AND no_thyquery_substitute_plan_renderer
  AND exactly_one_plan_observed_for_the_invocation
  AND no_plan_step_execution
```

- This predicate proves use of the host's native Plan surface under the accepted operational definition. It does not claim exclusive token authorship by an isolated stock-planner component.
- The plugin must not include a competing final-plan template or label ordinary assistant text as a native plan.
- Contract-to-plan fidelity is a quality metric separate from provenance. A native plan that omits a critical accepted constraint fails quality even if the native surface receipt passes.

## Ralph Safeguards

- Every continuing round adds user evidence, source evidence, a counterexample result, a material contract delta or a justified uncertainty update.
- Semantically equivalent repeated actions increase a stall counter; they do not increase progress.
- A model-authored word, promise, confidence statement or fake receipt cannot trigger success.
- User interruption, cancellation and host stop are not epistemic closure.
- Hard caps map to `RESOURCE_EXHAUSTED` or `STALLED`, never success.
- Rejected frames are not repeatedly presented until the user acquiesces.
- Source evidence and user preference remain distinct; counterevidence is not discarded to produce agreeable convergence.
- Resume/retry must be idempotent and must not duplicate answers, handoffs or native plans.

## Evaluation and Claim Gates

### Compatibility Gate 0

For each declared host/version/surface, verify:

- canonical native invocation;
- Plan-first rejection and already-Plan success;
- native question callability;
- query/context and permission continuity;
- state ownership and cancellation;
- typed success and all material non-success terminals;
- exactly one operational native-plan surface;
- no substitute plan and no execution;
- retry/resume idempotency.

### Paired benefit evaluation

Use pinned host/version conditions and three arms:

- A: raw query → stock Plan;
- B: raw query → ThyQuery → accepted contract → identical stock Plan;
- C: user-authored fully specified contract → identical stock Plan as an oracle ceiling.

Co-primary outcomes are critical plan success, blinded real-user/domain-author intent acceptance and burden non-inferiority. Report contract recovery separately from planner fidelity. Secondary outcomes include useful-question precision, unsupported invention, provenance accuracy, contradiction closure, contract-to-plan fidelity, acceptance-test coverage, clear-query no-harm, VOI calibration, repeated-trial `pass^k`, latency, tokens, sources and cost.

No efficacy, SOTA, universal-closure or burden claim may be made before a pre-registered host-versioned pilot and confirmatory evaluation supports it.

## MVP Boundary

Included after later approvals:

- two locally testable host-native plugin bundles;
- shared protocol/schema/fixtures as source artifacts, not a required shared runtime service;
- Plan-first capability preflight;
- native adaptive elicitation and bounded evidence research;
- intent contract and evidence/residual ledger;
- typed Ralph lifecycle;
- operational native-plan handoff/provenance;
- host conformance, negative fixtures and paired evaluation harness.

Excluded:

- automatic Plan entry or mode mutation;
- one common invocation spelling across hosts;
- ordinary-prompt hooks or automatic routing;
- external controller/wrapper or second agent session;
- prose simulation of native choices or native plan;
- strict exclusive-token stock-planner provenance claim;
- plan approval, execution or automatic Plan exit;
- long-term memory/RAG, model training, SaaS/GUI or a third host;
- fixed Top 3, fixed-turn success or uncalibrated universal thresholds.

## Definition of Done for a Later Implementation

Both plugins must independently satisfy:

1. canonical invocation is recognized on each declared host surface, while successful ThyQuery execution is gated to verified stock Plan;
2. non-Plan invocation fails as `PLAN_MODE_REQUIRED` with zero loop/handoff activity;
3. native questions operate without prose fallback;
4. contract provenance, contradictions, residuals and user dispositions are auditable;
5. every loop continuation is evidence-changing and every terminal is typed;
6. only `EPISTEMIC_CLOSED` or valid `ACCEPTED_RESIDUAL` hands off;
7. exactly one native plan surface is observed and no plan action executes;
8. negative fixtures cover mode errors, false choices, false completion, state corruption, cancellation, replay, duplicates, context drift, provenance spoofing and cap exhaustion;
9. Codex and Claude results are reported separately before any parity claim;
10. benefit claims remain disabled until paired real-user evaluation passes pre-registered quality and burden gates.

## Field-Level Diff from SK@v7

| Field | SK@v7 | SK@v8-B |
|---|---|---|
| Invocation | Common `$thyquery` | Codex `$thyquery`; Claude `/thyquery:thyquery` |
| Starting mode | Any declared supported mode | Verified stock Plan only |
| Mode behavior | Plugin forces Plan | Plugin never changes mode |
| Outside-Plan behavior | Host incompatibility if forced entry unavailable | `PLAN_MODE_REQUIRED`, zero loop/handoff |
| Wrapper/client | Prohibited fallback | Still prohibited |
| Structured questions | Available after forced entry | Native Plan-capability preflight then host-native tool |
| Planner provenance | Strict `PLAN_PROVENANCE = STOCK_HOST` | Operational native Plan surface predicate; no exclusive-token claim |
| Ralph closure | Researched but provisional | Decision-sufficient gated rule with calibration limitation explicit |
| Fixed Top 3 / cap | Prohibited | Prohibited |
| Final behavior | One native plan, no execution, remain in Plan | Same, measured before any approval-driven exit on Claude |

## Approval and Authority Ledger

| Artifact | Scope | Status |
|---|---|---|
| `SK@v7` | No-exception cross-mode common invocation research | SUPERSEDED WHERE SK@v8-B DIFFERS |
| `DS@v1` / `e0ca37…2845f` | Research synthesis and three path choices | PATH B APPROVED |
| `SK@v8-B` plus external SHA-256 receipt | Plan-first native-invocation two-plugin skeleton | PENDING EXACT APPROVAL |
| Implementation plan | Detailed file/component/test plan | NOT AUTHORIZED |
| Implementation | Code, scaffolding, packaging, installation, configuration and tests | NOT AUTHORIZED |

## Next Action

- Current state: `SKELETON_APPROVAL_PENDING(SK@v8-B)`
- Authorized now: user review and hash verification of this skeleton
- Not authorized: implementation planning, code, scaffolding, packaging, installation, configuration mutation, deployment, publication or plan execution
- Next checkpoint: exact `SK@v8-B 승인`
