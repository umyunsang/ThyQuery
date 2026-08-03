# G6 — Graph State, Routing, Termination, and Verification

## Research receipt

- Scope: G6 only under approved `SK@v9-B`; read-only research plus this uniquely owned artifact. The approved skeleton was re-hashed locally as `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c`. **Tag: `directly_supported`.**
- Prior evidence read first: `R4_stopping.md`, the relevant `R6_ralph_eval.md` safeguards/fixtures, and `SK_v9_B.md` graph contract/terminal invariants. They are prior project research, not substitutes for live primary-source validation. **Tag: `directly_supported`.**
- External evidence bound used: 14 primary papers, standards, or current official technical-documentation artifacts; all URLs were live-checked on 2026-08-03 (Asia/Seoul). **Tag: `directly_supported`.**
- Authority boundary: no framework selection, installation, prototype execution, implementation plan, code, host/config mutation, deployment, or external action occurred. **Tag: `directly_supported`.**
- Evidence vocabulary: each material claim below carries exactly one of `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`; a transfer tagged `near_match_only` is a candidate ThyQuery rule, not a result established for ThyQuery by its source. **Tag: `directly_supported`.**

## Executive verdict

| ID | Finding | Tag | Exact ThyQuery transfer |
|---|---|---|---|
| V1 | A single mutable model-visible state object is not a sufficient canonical authority for retries, stale writers, replay, or audit. The candidate should instead use a logically append-only ordered event stream and a deterministic, versioned reducer that derives the canonical invocation view; snapshots are caches, not independent truth. | `near_match_only` | One invocation has one commit owner. Nodes and models propose typed deltas; only the controller validates, orders, commits, and reduces them. |
| V2 | Event sourcing gives rebuild/replay/history only when every authoritative change is represented as an event; it does not by itself guarantee tamper resistance, privacy-safe retention, deterministic reducers, or exactly-once external effects. | `directly_supported` | Preserve immutable logical history with superseding/redaction events, but separately test integrity, retention, reducer determinism, and side-effect fencing. |
| V3 | Conditional edges require deterministic conflict semantics. W3C SCXML demonstrates explicit enabledness, conflict, priority, and run-to-completion rules; model preference or iteration order is not an acceptable implicit tie-break for ThyQuery safety edges. | `near_match_only` | Evaluate all guards over one canonical snapshot, choose one edge by a frozen precedence table, and fail closed on an unresolved equal-priority conflict. |
| V4 | Reachability and SCC decomposition are necessary structural checks, but an SCC is not itself a livelock and an exit edge is not proof that its guard is satisfiable or eventually chosen. | `directly_supported` | Compile-time reachability/SCC checks must be paired with guard satisfiability fixtures, runtime progress/variant checks, and counterexample traces. |
| V5 | A finite well-founded transition budget can prove finite internal execution, but only under explicit assumptions that every committed active transition decreases the variant and that the reducer/guard computation terminates. | `near_match_only` | Every active macrostep consumes at least one transition credit. Zero credit routes to `RESOURCE_EXHAUSTED`, never to a success state. |
| V6 | Wall-clock liveness cannot be proved from a transition cap when the graph can wait indefinitely for user or host input. | `contradicts_premise` | Represent waiting as `WAITING_EXTERNAL`, require a host-observable reply/cancel/deadline event to resume, and report host delivery/cancellation guarantees as unknown until verified. |
| V7 | Duplicate suppression and idempotent controller requests can establish at-most-once logical handoff, but exactly-once native-planner effect is not established without host-owned idempotency or a queryable authoritative planner receipt. | `insufficient` | Record a unique handoff intent, reconcile after uncertainty, and never blindly retry a non-idempotent planner call. Host effect remains `HANDOFF_OUTCOME_UNKNOWN` when reconciliation is impossible. |
| V8 | Replay must be computationally inert with respect to host tools, questions, and planner handoff. Current LangGraph documentation explicitly says replay re-executes later LLM/API/interrupt steps, so generic framework replay cannot be assumed safe for ThyQuery effects. | `contradicts_premise` | Use a pure reducer replay to verify state; external effects appear only as recorded receipts and are never re-issued during verification replay. |
| V9 | The prior R4 decision-sufficient closure rule remains the epistemic gate, augmented—not replaced—by graph integrity, legal-transition, cycle/stall, and handoff invariants. Model self-judgment, stability, an SCC exit, or cap exhaustion cannot emit closure. | `near_match_only` | A deterministic guard recomputes `GRAPH_OK AND R4_RESOLVED_GATE`; only that result or valid explicit residual acceptance can prepare handoff. |
| V10 | No reviewed source supplies universal ThyQuery thresholds for semantic progress, repeated-state equivalence, SCC productivity, risk, coverage, lookahead, user burden, or deadlines. | `insufficient` | Freeze task/host/risk-stratified thresholds on held-out calibration data; unsupported strata block rather than inherit global constants. |

## 1. Candidate transition-system contract

The following transition system is a research candidate, not an approved design or implementation specification. **Tag: `near_match_only`.**

### 1.1 Formal objects

```text
G        = (V, E, Q, q0, QT, Event, Delta, Rv, Guards, Priority)
L_t      = [e_0, e_1, ..., e_t]                  # ordered committed events
S_t      = fold(Rv, S_empty, L_t)                # canonical derived state
delta    = step(S_t, e_candidate) -> (decision, S_t+1, receipt)
fullHash = H(canonical_encode(S_t))
semHash  = H(project_transition_relevant_semantics(S_t))
```

`fullHash` covers all authoritative state fields used for integrity/replay. `semHash` deliberately excludes timestamps, event sequence numbers, and monotonically decreasing budgets so exact semantic repetition can be observed rather than hidden by bookkeeping changes. **Tag: `near_match_only`.**

### 1.2 Event envelope

Every proposed event must carry the following fields before it can affect canonical state. **Tag: `near_match_only`.**

```text
event_id                 globally unique logical event identifier
invocation_id            owner invocation
event_type               member of a closed versioned enum
schema_version           event schema
expected_state_version   compare-and-set predecessor
expected_state_hash      predecessor fullHash
idempotency_key          stable logical-operation key
producer_kind            USER | HOST | TOOL | MODEL_PROPOSAL | CONTROLLER
producer_receipt          host/user/tool provenance when required
payload                   typed data only; external instructions remain data
evidence_refs             source/user/host lineage
policy_version            guard/priority/calibration version
reducer_version           deterministic reducer version
created_at                audit metadata, never an ordering authority
```

An event with a reused `event_id` or `idempotency_key` and identical canonical payload returns the prior receipt without a new transition; the same key with a different payload is an integrity conflict. **Tag: `near_match_only`.**

### 1.3 Canonical-state ownership

| Actor | May read | May propose | May commit authoritative state | Testable rule | Tag |
|---|---|---|---|---|---|
| Invocation controller/reducer | Current snapshot and ordered log | Guard decisions and validated system events | Yes, as the sole writer for one invocation | Two concurrent commits with the same predecessor cannot both succeed; exactly one version advances. | `near_match_only` |
| Model node | Scoped snapshot | Typed `DeltaProposal`, action candidates, interpretations, source summaries | No | Direct terminal/state text is ignored unless converted into a validated proposal event. | `directly_supported` |
| User/native question surface | Presented question and contract digest | Explicit answer, revision, acceptance, residual acceptance, cancel | No direct mutation; controller records a provenance-bound event | Answer/acceptance must bind to invocation, question/contract digest, and host receipt. | `near_match_only` |
| Host adapter | Minimum scoped state | Plan-mode, lifecycle, planner, and native-plan receipts | No independent state ownership | Host claim without an observable host-owned receipt remains unknown. | `insufficient` |
| Research/tool adapter | Query plus minimum authority | Source/evidence result with scope/freshness | No | Tool result cannot contain a lifecycle command; it is evidence data. | `directly_supported` |
| Replay/verifier | Entire persisted event stream plus versioned reducers | Divergence/corruption report | No normal transition or external effect | Replay mode must have zero host/tool/question/planner effects. | `near_match_only` |

Single-writer ownership is a ThyQuery simplification, not a claim that all workflow engines require central control; Schneider's state-machine account supports deterministic commands and ordered requests under its fault-tolerance setting, while this invocation-scoped transfer remains unvalidated. **Tag: `near_match_only`.**

### 1.4 Append-only events versus mutation

| Candidate | Benefit | Failure surface | G6 disposition | Tag |
|---|---|---|---|---|
| Mutable shared object is canonical | Smallest apparent implementation | Lost provenance, stale overwrite, retry ambiguity, no independent replay check | Reject as canonical authority. It may exist only as an ephemeral projection derived from the log. | `near_match_only` |
| Append-only logical events only | Full causal history and replay input | Replay cost, schema evolution, privacy retention, side-effect replay risk | Keep as authority, subject to retention/redaction design and reducer-version pinning. | `near_match_only` |
| Events plus versioned snapshots | Bounded recovery cost and inspectable current view | Snapshot/log divergence and migration complexity | Preferred candidate: snapshot is accepted only if its event position and hash reproduce under pure replay. | `near_match_only` |

“Append-only” here is logical, not a prohibition on privacy deletion. Corrections must be represented as superseding facts so reasoning history is not silently rewritten, while physical retention/redaction/cryptographic-erasure policy remains a separate unresolved governance requirement. **Tag: `near_match_only`.**

### 1.5 Minimum canonical state

The canonical view should contain these partitions, each with an explicit schema version and provenance policy. **Tag: `near_match_only`.**

1. `identity`: invocation/session/host/version/surface, original-query digest, relevant-context manifest, permission/authority digest.
2. `lifecycle`: current control state, entered-at event, terminal kind/reason, pending external wait, cancellation observation.
3. `plan_preflight`: starting/effective mode and host-owned Plan receipt or explicit absence.
4. `contract`: versioned intent fields, values, status (`missing|hypothesized|evidenced|user_confirmed|rejected|deferred|residual`), dependencies, provenance.
5. `evidence`: source/user/host records, freshness/scope, contradictions, unsupported claims, redactions, supersessions.
6. `action_space`: admissible candidates, generator version, hard constraints, value/risk/burden estimates and their uncertainty.
7. `closure`: R4 `C,R,X,D,NVI,A` inputs/bounds, calibration stratum/version, open-world challenge, closure decision and receipt.
8. `progress`: material deltas, exact/semantic digest history, selected-action history, SCC membership, oscillation/stall diagnostics.
9. `budgets`: transition, question, tool/source, token, wall/deadline, privacy, and cost budgets with consumption events.
10. `integrity`: state version/hash, event position, reducer/policy/schema versions, replay check, rejected stale/conflicting events.
11. `handoff`: closure kind/contract hash, unique intent key, host attempt/receipt, planner event/plan hash, outcome certainty, count.
12. `privacy`: field classifications, minimum-disclosure projection, retention/redaction state, export/logging restrictions.

### 1.6 Validated delta and reducer contract

```text
validate(delta, S):
  require closed delta type and schema
  require delta.invocation_id == S.invocation_id
  require delta.expected_version == S.version
  require delta.expected_hash == S.fullHash
  require producer is authorized for every changed field
  require all changed fields include provenance and dependency invalidations
  require lifecycle transition is in the allow-list
  require no terminal field or handoff count is model-authored
  require no unknown keys, NaN/noncanonical values, or unbounded payloads

reduce(S, validated_delta):
  pure and deterministic under pinned reducer/policy versions
  update only named fields
  invalidate dependent conclusions after a material premise change
  preserve superseded facts and contradiction lineage
  increment state version exactly once
  recompute fullHash and semHash canonically
```

This exact validator/reducer contract is proposed for ThyQuery and has not been validated in either host. **Tag: `near_match_only`.**

Parallel authoritative reduction is excluded from the smallest candidate. If later design permits parallel writes, each reducer must have a proved deterministic merge law for the allowed batch ordering, or the controller must serialize the writes; current LangGraph documentation shows that multiple outgoing edges can run in parallel and reducers determine shared-state updates, but does not prove ThyQuery-specific confluence. **Tag: `near_match_only`.**

## 2. Candidate lifecycle graph

### 2.1 State families

```text
START
  -> PREFLIGHT_PLAN_AND_CAPABILITIES
  -> INGEST_AND_NORMALIZE
  -> DIAGNOSE_GAPS
  -> GENERATE_AND_SELECT_ACTION
       -> ASK_USER_NATIVE -----------+
       -> RESEARCH_BOUNDED ----------+-> VALIDATE_AND_REDUCE
       -> CHALLENGE_COUNTEREXAMPLE --+        -> RECOMPUTE_GRAPH_AND_CLOSURE
       -> CONFIRM_CONTRACT_DELTA -----+             -> DIAGNOSE_GAPS (cycle)
                                                      -> HANDOFF_READY
HANDOFF_READY -> HANDOFF_INTENT_RECORDED -> NATIVE_PLAN_OBSERVED -> COMPLETE_AFTER_PLAN

typed non-success terminals reachable from every active state:
PLAN_MODE_REQUIRED | CANCELLED | BLOCKED | STALLED | RESOURCE_EXHAUSTED |
STATE_CORRUPT | HOST_CAPABILITY_CONTRADICTION | HANDOFF_OUTCOME_UNKNOWN
```

`EPISTEMIC_CLOSED` and `ACCEPTED_RESIDUAL` are closure decisions that can create `HANDOFF_READY`; they are not permission to execute plan actions and are not the final absorbing invocation state. **Tag: `near_match_only`.**

### 2.2 Allowed transition classes

| From | Guard/event | To | Mandatory receipt/test | Tag |
|---|---|---|---|---|
| Any active state | Trusted explicit cancellation or host session cancellation | `CANCELLED` | Pending effects invalidated; no later question/tool/handoff/plan event. | `directly_supported` |
| Any active state | Replay/hash/schema/identity/version/transition invariant fails | `STATE_CORRUPT` or fail-closed external receipt if the log cannot be trusted | Zero handoff; name first divergent event. | `near_match_only` |
| `START/PREFLIGHT` | Verified Plan is absent but host can request it | `PLAN_MODE_REQUIRED` | No Ralph/research/handoff work. | `directly_supported` |
| `START/PREFLIGHT` | Required host capability contradicts the approved boundary | `HOST_CAPABILITY_CONTRADICTION` | Exact missing/contradictory capability. | `directly_supported` |
| Active compute state | Valid non-waivable authority/safety/privacy gate fails | `BLOCKED` | Reason and unresolved ledger; acceptance cannot waive it. | `near_match_only` |
| `RECOMPUTE_GRAPH_AND_CLOSURE` | `GRAPH_OK AND R4_RESOLVED_GATE` | `HANDOFF_READY(EPISTEMIC_CLOSED)` | Independently recomputed gate and accepted contract digest. | `near_match_only` |
| `RECOMPUTE_GRAPH_AND_CLOSURE` | Valid R4 residual gate | `HANDOFF_READY(ACCEPTED_RESIDUAL)` | Enumerated residual/impact/mitigation/authority receipt. | `near_match_only` |
| Active state | Transition/other hard budget is exhausted without a valid closure already committed | `RESOURCE_EXHAUSTED` | Cap reason; never a success label. | `directly_supported` |
| Active state | Exact repeat, calibrated semantic stall, dead end, oscillation, or unproductive SCC guard | `STALLED` | Counterexample trace and unresolved fields. | `near_match_only` |
| Active state | Exactly one admissible action remains after deterministic selection | Corresponding action node | Candidate set, rejected edges, priority rationale. | `near_match_only` |
| `HANDOFF_READY` | Closure receipt current, `handoff_count=0`, no cancellation/integrity failure | `HANDOFF_INTENT_RECORDED` | Unique `(invocation_id, contract_hash)` idempotency key. | `near_match_only` |
| `HANDOFF_INTENT_RECORDED` | Host-owned planner/plan receipt reconciles to the intent | `NATIVE_PLAN_OBSERVED` | Planner identity/event and plan hash; `handoff_count=1`. | `insufficient` |
| `HANDOFF_INTENT_RECORDED` | Crash/timeout and host cannot prove applied versus unapplied | `HANDOFF_OUTCOME_UNKNOWN` | No blind retry and no success claim. | `insufficient` |
| `NATIVE_PLAN_OBSERVED` | One valid native plan, no execution event | `COMPLETE_AFTER_PLAN` | Absorbing terminal; no ThyQuery re-entry. | `near_match_only` |

## 3. Guard precedence and edge-conflict resolution

The following total order is the candidate resolution policy; all predicates are evaluated against one canonical snapshot and the same incoming event. **Tag: `near_match_only`.**

1. **P0 — effect suppression on trusted cancel:** immediately fence all pending/new external effects. If the log is valid, commit `CANCELLED`; if lineage is corrupt, return fail-closed `STATE_CORRUPT(cancel_observed=true)` rather than trusting a new state write.
2. **P1 — identity/integrity/absorption:** invocation owner, terminal absorption, event deduplication, schema, predecessor version/hash, legal transition, replay status, reducer/policy version, and handoff-count invariants.
3. **P2 — host and non-waivable gates:** effective Plan, required native surfaces, authority, safety, privacy, and explicit host-capability contradictions.
4. **P3 — independently recomputed resolved closure:** `GRAPH_OK AND R4_RESOLVED_GATE`, including explicit resolved acceptance bound to the current contract digest.
5. **P4 — explicit valid residual acceptance:** only when every residual and its consequence/owner/mitigation is enumerated and no non-waivable gate fails.
6. **P5 — resource/variant exhaustion:** no new active action may begin at zero budget; emit `RESOURCE_EXHAUSTED`.
7. **P6 — progress failures:** exact repeated semantic state, calibrated stall, oscillation, dead end, non-decreasing variant, or unproductive SCC emits `STALLED` (or `STATE_CORRUPT` when caused by an invalid graph/reducer definition).
8. **P7 — uncertainty-kind routing:** frame correction before constrained choice; user-owned preference/authority/trade-off to native question; external factual uncertainty to bounded research; testable interpretation conflict to challenge; material contract delta to explicit confirmation.
9. **P8 — action ranking:** among remaining admissible actions, use the frozen decision-loss/value/burden policy and stable edge ID only as the final deterministic tie-break.

Cancellation wins over a simultaneous closure proposal. A closure already independently satisfied by evidence committed on the final permitted transition may still pass even when the post-transition remaining budget is zero, because the cap is not the reason for success; if closure is false, zero budget yields `RESOURCE_EXHAUSTED`. **Tag: `near_match_only`.**

W3C SCXML resolves enabled transition conflicts using explicit source-state/document-order priorities and run-to-completion macrosteps. ThyQuery should borrow the requirement for complete deterministic semantics, not SCXML's exact hierarchy/document-order priority. **Tag: `near_match_only`.**

If two incompatible edges remain enabled at the same explicit priority and the policy has no declared tie-break, the graph definition is nondeterministic and must fail closed as `STATE_CORRUPT(reason=EDGE_CONFLICT)`; arbitrary list order, model confidence, or whichever asynchronous task finishes first is forbidden. **Tag: `near_match_only`.**

## 4. Safety invariants

| ID | Invariant | Deterministic assertion | Tag |
|---|---|---|---|
| I1 | Invocation isolation | Every event/state/receipt owner equals the active `invocation_id`; cross-owner events are rejected. | `near_match_only` |
| I2 | Single authoritative writer | At most one committed successor exists for `(invocation_id, state_version, state_hash)`. | `near_match_only` |
| I3 | Monotone version | A successful commit changes `version` from `n` to `n+1`; rejected/duplicate input does not advance it. | `near_match_only` |
| I4 | Event-only authority | Canonical state equals pure fold of the ordered accepted event stream under pinned reducers. | `near_match_only` |
| I5 | Validated delta | No state field changes without an authorized typed delta, predecessor receipt, and provenance. | `near_match_only` |
| I6 | Legal edge | Every consecutive lifecycle pair belongs to the frozen transition allow-list and has a true guard receipt. | `near_match_only` |
| I7 | Deterministic route | Identical canonical state/event/policy versions yield the same selected edge and reducer result. | `near_match_only` |
| I8 | Model non-authority | Model text/proposals cannot directly set lifecycle, closure, acceptance, budget, integrity, or handoff fields. | `directly_supported` |
| I9 | Terminal absorption | After an absorbing terminal, no state except an idempotent retrieval of the terminal receipt is reachable. | `near_match_only` |
| I10 | Closure confinement | Only `EPISTEMIC_CLOSED` or valid `ACCEPTED_RESIDUAL` reaches `HANDOFF_READY`. | `directly_supported` |
| I11 | Cap separation | `RESOURCE_EXHAUSTED`, repeated state, stall, dead end, or cycle signal never implies a closure kind. | `directly_supported` |
| I12 | One logical handoff | `handoff_count` is initially zero, may change to one only after a reconciled host receipt, and never exceeds one. | `near_match_only` |
| I13 | No execution | No event after native-plan observation may be a tool/workspace/plan-action execution event. | `directly_supported` |
| I14 | Cancel dominance | Once a trusted cancellation is observed, all effect capabilities are fenced and no closure/handoff can be newly committed. | `near_match_only` |
| I15 | Replay equivalence | Pure replay under the recorded reducer/policy/schema versions reproduces every recorded state hash. | `near_match_only` |
| I16 | Replay effect fence | Verification replay issues zero user questions, tools, network effects, planner calls, or host mutations. | `near_match_only` |
| I17 | Evidence preservation | A revision supersedes rather than silently erases the prior claim; dependent conclusions are invalidated and recomputed. | `near_match_only` |
| I18 | Provenance separation | User preference, external fact, model inference, and host receipt remain distinct producer kinds. | `near_match_only` |
| I19 | Full/semantic digest separation | Integrity uses `fullHash`; repeat/oscillation uses the documented transition-relevant `semHash` projection. | `near_match_only` |
| I20 | Calibration versioning | Closure and semantic-stall decisions record the task/host/risk stratum, threshold set, and calibration version used. | `near_match_only` |

## 5. Reachability, SCCs, deadlock, and livelock

### 5.1 Static graph checks

The candidate graph must fail its design gate unless all checks below pass on the frozen abstract graph and guard model. **Tag: `near_match_only`.**

1. Forward reachability: every declared nonterminal node is reachable from `START`; every declared terminal has at least one explicit fixture path.
2. Reverse reachability: every reachable active node has a structural path to an absorbing terminal.
3. Dead edge: every edge has a satisfiable positive fixture and a negative fixture showing its guard can be false.
4. Guard totality: for every abstract reachable state class, exactly one precedence result exists, or the state is a declared `WAITING_EXTERNAL` state with a cancel/deadline route.
5. Terminal exclusion: no outgoing active edge from an absorbing terminal.
6. Handoff dominators: every path to `HANDOFF_READY` passes graph-integrity and R4 closure/residual gates; every path to plan observation passes the unique handoff intent.
7. Forbidden paths: model proposal, cap, repeated state, stall, corruption, cancellation, and host contradiction cannot reach handoff.
8. Mutation coverage: each authoritative state field has exactly one owner/reducer and at least one validation test.

Tarjan's algorithm computes SCCs in linear time in graph vertices plus edges, so SCC decomposition is a practical compile-time check even for a larger candidate graph. This does not determine whether natural-language guards are semantically correct. **Tag: `directly_supported`.**

### 5.2 SCC classification

| Class | Definition | Required action | Tag |
|---|---|---|---|
| Trivial acyclic component | One node without a self-loop | Ordinary reachability/guard tests. | `near_match_only` |
| Productive cyclic SCC | Contains a runtime loop, has at least one satisfiable exit, and every committed internal macrostep decreases the global transition variant; progress evidence is externally testable. | Permit only within the hard budget and runtime stall checks. | `near_match_only` |
| Structurally closed active SCC | Reachable nonterminal SCC with no outgoing path to any terminal in the abstract graph | Reject graph at compile/design verification. | `near_match_only` |
| Guard-closed SCC | Structural exit exists but all exit guards are unsatisfiable in a reachable abstract state | Reject after guard-satisfiability/model-check fixture. | `near_match_only` |
| Runtime unproductive SCC | Trace remains in one SCC while `semHash`/critical coverage/risk/contradiction state has no calibrated material improvement and no untried admissible positive-value exit remains | Emit `STALLED(UNPRODUCTIVE_SCC)`, never success. | `near_match_only` |

An SCC with an exit is not automatically live: scheduling/fairness and guard truth matter. SPIN's acceptance-cycle analysis likewise requires both reachability and return-to-self, with optional fairness assumptions made explicit. **Tag: `directly_supported`.**

### 5.3 Runtime deadlock and waiting

```text
DEAD_END(S) :=
  active(S)
  AND enabled_edges(S) = empty
  AND S.lifecycle != WAITING_EXTERNAL

INVALID_WAIT(S) :=
  S.lifecycle = WAITING_EXTERNAL
  AND no pending question/tool/host operation receipt

HOST_WAIT_CONTRADICTION(S) :=
  S.lifecycle = WAITING_EXTERNAL
  AND required native wait/resume/cancel surface is unavailable
```

`DEAD_END` routes to `STALLED(DEAD_END)` unless it exposes an illegal graph definition, in which case it is `STATE_CORRUPT`; `INVALID_WAIT` is corruption; `HOST_WAIT_CONTRADICTION` is a host capability terminal. **Tag: `near_match_only`.**

### 5.4 Repeated state, oscillation, and stall

```text
EXACT_REPEAT_t := semHash_t == semHash_j for some j < t
                 AND no exogenous user/source/host novelty between j and t

PERIODIC_t(p)  := semHash_t == semHash_(t-p)
                 AND action_class_t == action_class_(t-p)
                 AND no material progress over the period

SEMANTIC_STALL_t :=
  calibrated_equivalent(contract/evidence/action state over window m)
  AND no material critical-coverage gain
  AND no statistically distinguishable risk reduction
  AND no contradiction resolution
  AND no untried admissible action with positive upper net value
  AND required lookahead/synergy challenge completed
```

Exact deterministic repetition without new exogenous evidence is an immediate `STALLED(EXACT_REPEAT)` guard. Period length `p`, semantic window `m`, equivalence tolerances, “material” delta, and risk-change tests require held-out calibration; timestamps and iteration counters cannot manufacture progress. **Tag: `near_match_only`.**

Prediction/state stability can occur at a wrong fixed point, so low semantic delta supports a stall diagnosis but cannot support closure by itself. **Tag: `contradicts_premise`.**

## 6. Formal/testable termination and bounded liveness

### 6.1 Variant

Let `B(S) in N` be the remaining committed active-transition budget. The transition rules must satisfy: **Tag: `near_match_only`.**

```text
T1. B(START) = B0 < infinity.
T2. Every accepted nonterminal-to-nonterminal macrostep decreases B by exactly 1.
T3. Duplicate/rejected events do not change state and do not count as progress.
T4. No active action starts when B = 0.
T5. If B = 0 and no higher-priority valid closure/cancel/integrity terminal applies,
    the only transition is RESOURCE_EXHAUSTED.
T6. Each validator, reducer, and guard evaluation terminates for a bounded event/state payload.
```

Under T1–T6, internal execution reaches an absorbing terminal or `WAITING_EXTERNAL` in at most `B0 + c` committed macrosteps, where `c` is the fixed number of terminal/handoff bookkeeping steps permitted by the lifecycle. This is a conditional proof for the proposed system, not an empirical ThyQuery result. **Tag: `near_match_only`.**

Podelski and Rybalchenko characterize termination/liveness through disjunctively well-founded transition invariants in their program-verification setting; the simple natural-number budget is the candidate ThyQuery well-founded component, not a claim that their theorem directly validates dialogue semantics. **Tag: `near_match_only`.**

### 6.2 Wall-clock liveness assumption

For a bound from invocation start to terminal, add the explicit environment assumption:

```text
ENV. Every WAITING_EXTERNAL state eventually receives exactly one of:
     a matching result/answer, trusted cancellation, host failure, or deadline event.
```

Without `ENV`, the controller can prove finite internal work but cannot prove that an absent user or unavailable host eventually responds. No reviewed G6 source or current host evidence establishes `ENV` for both target hosts. **Tag: `insufficient`.**

### 6.3 Properties to model-check or exhaustively fixture

```text
SAFETY_TERMINAL:    always(terminal -> next terminal_same)
SAFETY_HANDOFF:     always(handoff_intent -> closure_kind in {CLOSED, RESIDUAL}
                           and handoff_count == 0 and GRAPH_OK)
SAFETY_AT_MOST_ONE: always(handoff_count <= 1)
SAFETY_CANCEL:      always(cancelled -> no_future_effect)
SAFETY_CAP:         always(resource_exhausted -> not closure_success)
SAFETY_REPLAY:      replay_same_log_versions -> same_state_hash_sequence
BOUNDED_INTERNAL:   active_compute -> terminal_or_wait within remaining B + c commits
NO_PROGRESS_CYCLE:  no reachable acceptance/non-progress cycle under declared fairness
```

SPIN directly supports reachability-style errors, invalid end states, and acceptance/non-progress cycle searches for finite verification models; a bounded abstraction of ThyQuery can use that verification pattern, but no model was executed in this research phase. **Tag: `near_match_only`.**

## 7. Priority-ordered controller pseudocode

```text
function handle(log, incoming_event):
    # P0: cancellation fences effects even before state is trusted
    if trusted_cancel_envelope(incoming_event):
        fence_all_pending_effects(incoming_event.invocation_id)

    replay = pure_replay(log, pinned_versions=true, effects=false)

    if trusted_cancel_envelope(incoming_event):
        if replay.valid:
            return commit_once(replay.state, CANCELLED_EVENT)
        return fail_closed_receipt(STATE_CORRUPT, cancel_observed=true)

    if not replay.valid:
        return fail_closed_receipt(STATE_CORRUPT, replay.first_divergence)

    S = replay.state

    if duplicate_same_event_or_key(incoming_event, S):
        return prior_receipt(incoming_event.idempotency_key)
    if duplicate_key_different_payload(incoming_event, S):
        return commit_once(S, STATE_CORRUPT(KEY_COLLISION))
    if is_absorbing_terminal(S):
        return terminal_receipt(S)  # no transition

    validation = validate_envelope_and_delta(incoming_event, S)
    if not validation.ok:
        return commit_once(S, STATE_CORRUPT(validation.reason))

    S1 = pure_reduce(S, validation.delta)
    checks = independently_recompute_all_guards(S1)

    edge = first_true_guard_by_frozen_priority(checks)
    if unresolved_equal_priority_conflict(edge):
        edge = STATE_CORRUPT(EDGE_CONFLICT)
    if edge is NONE and S1.lifecycle != WAITING_EXTERNAL:
        edge = STALLED(DEAD_END)

    receipt = atomic_append_decision_and_state_hash(log, S1, edge)
    return receipt
```

The pseudocode is a framework-neutral, testable controller proposal; calls named `atomic_*`, host receipt authenticity, and effect fencing are capability requirements rather than established host APIs. **Tag: `near_match_only`.**

## 8. Idempotency, handoff, replay, and corruption

### 8.1 Logical handoff protocol

```text
1. Recompute GRAPH_OK and closure on the current canonical contract hash.
2. Atomically append HandoffIntent(key = H(invocation_id, contract_hash), count_before = 0).
3. Submit only through a host surface that either:
   a. accepts that idempotency key, or
   b. exposes a queryable authoritative receipt by invocation/intent key.
4. On success, append the host-owned planner event and native-plan hash; set count to 1.
5. On timeout/crash, reconcile first. Retry only if the host proves no prior effect or documents
   idempotent semantics for the same key.
6. If applied/unapplied cannot be distinguished, emit HANDOFF_OUTCOME_UNKNOWN and stop.
```

This protocol can test controller deduplication and at-most-once logical intent. It cannot establish exactly-once native planner effect without the host condition in step 3. **Tag: `insufficient`.**

RFC 9110 defines idempotency as repeated identical requests having the same intended server effect, while explicitly allowing separate logging/history side effects; that is a useful semantic target, not evidence that either ThyQuery host planner is idempotent. **Tag: `near_match_only`.**

### 8.2 Pure replay and divergence

| Check | Passing condition | Failure outcome | Tag |
|---|---|---|---|
| Prefix replay | Every event prefix reproduces its recorded state version and hash. | `STATE_CORRUPT(REPLAY_DIVERGENCE)` with first event/version. | `near_match_only` |
| Reducer determinism | Repeating a fold under the same pinned versions yields byte-identical canonical encoding. | Block handoff; reducer/version defect. | `near_match_only` |
| Snapshot validation | Snapshot hash equals pure replay at its event position. | Discard/quarantine snapshot; replay from prior trusted position or block. | `near_match_only` |
| Event completeness | Sequence is contiguous; predecessor version/hash matches; no unknown schema. | `STATE_CORRUPT(MISSING_OR_UNKNOWN_EVENT)`. | `near_match_only` |
| Side-effect fence | Replay trace contains zero external-effect invocations. | Hard conformance failure and quarantine. | `near_match_only` |
| Migration | Old event is interpreted only by a pinned historical reducer or an explicit tested upcaster/migration receipt. | Unsupported schema blocks; no best-effort coercion. | `near_match_only` |

Fowler's event-sourcing article directly supports reconstructing state by replaying events and treating all domain changes as event-initiated; it is a 2005 draft pattern article and does not establish the integrity/security properties above. **Tag: `directly_supported`.**

Current LangGraph checkpointer documentation states that replay re-executes nodes after a checkpoint, including LLM calls, API requests, and interrupts. Therefore, ThyQuery state verification must not equate generic runtime replay with a pure reducer audit. **Tag: `contradicts_premise`.**

### 8.3 Corruption boundaries

A digest chain and replay comparison can detect many accidental omissions, reorderings, and divergent reductions, but without protected keys/storage they do not prove an adversary could not rewrite both events and hashes. Cryptographic authenticity and secure storage remain outside this evidence set. **Tag: `insufficient`.**

Privacy deletion can intentionally make old payloads unreplayable. Whether to retain encrypted events, retain only salted commitments, use tombstones, or make the invocation ephemeral cannot be chosen from G6 formal-method evidence alone. **Tag: `insufficient`.**

## 9. Calibrated terminal decisions

### 9.1 Graph gate added to R4 closure

```text
GRAPH_OK(S) :=
  invocation_identity_valid
  AND effective_plan_receipt_valid
  AND state_replay_and_lineage_valid
  AND current_transition_legal
  AND no_unresolved_edge_or_reducer_conflict
  AND not cancelled
  AND no_nonwaivable_gate_failed
  AND no_dead_end_repeat_stall_oscillation_or_unproductive_scc
  AND variant_nonnegative_and_policy_version_valid
  AND handoff_count = 0
  AND no_execution_effect_observed

EPISTEMIC_CLOSED(S) :=
  GRAPH_OK(S)
  AND R4_INTEGRITY_OK(S)
  AND R4_COVERAGE_OK(S)
  AND R4_RISK_OK(S)
  AND R4_CONFLICT_OK(S)
  AND R4_STABLE_OK(S)
  AND R4_VOI_OK(S)
  AND R4_CAL_OK(S)
  AND explicit_resolved_acceptance_binds_current_contract_digest
```

This compound gate integrates the prior decision-sufficient closure with graph integrity; it is not a theorem validated for natural-language intent resolution. **Tag: `near_match_only`.**

The model may generate evidence, candidate actions, or a closure proposal, but a controller-side guard must recompute the predicate from canonical state and calibrated estimators. A model-authored “done,” confidence score, repeated stable answer, or graph route label has zero terminal authority. **Tag: `directly_supported`.**

### 9.2 Residual acceptance

```text
ACCEPTED_RESIDUAL(S) :=
  GRAPH_OK_except_epistemic_thresholds(S)
  AND every residual is enumerated with provenance, impact, mitigation, reversibility, owner
  AND authorized user explicitly accepts the current residual-ledger digest
  AND no residual violates a non-waivable gate
```

This is a ThyQuery product-policy proposal; the reviewed sources do not validate comprehension, voluntariness, authority, or universal non-waivable classes. **Tag: `insufficient`.**

### 9.3 Cap and cycle semantics

`RESOURCE_EXHAUSTED`, `STALLED`, `STATE_CORRUPT`, `CANCELLED`, `BLOCKED`, `HOST_CAPABILITY_CONTRADICTION`, and `HANDOFF_OUTCOME_UNKNOWN` are honest typed non-success outcomes. None can be relabeled as “best effort success” without a separately valid residual-acceptance event that occurred before the blocking condition. **Tag: `directly_supported`.**

Finite-horizon decision work supports distinguishing terminal loss from continuation value and shows that one-step policies can underweight exploration; it does not make a maximum iteration count or a low one-step VOI estimate evidence of closure. **Tag: `directly_supported`.**

MacKay's information-objective analysis explicitly depends on a correct hypothesis space, so an unchanged contract and collapsed estimated information value inside a misspecified intent space contradict exhaustive-closure claims. **Tag: `contradicts_premise`.**

Howard et al.'s confidence sequences are uniformly valid over time only under their stochastic-process assumptions. They are a candidate tool for benchmarked observable losses, not automatic calibration of semantic correctness in one conversation. **Tag: `near_match_only`.**

Chajewska, Koller, and Parr show decision-relative elicitation that stops below a preset expected utility-loss threshold under a prior over utility functions. This supports task-relative decision sufficiency, not complete recovery of tacit intent or the exact ThyQuery gate. **Tag: `near_match_only`.**

## 10. Failure taxonomy and required guard/test

| ID | Failure | Observable counterexample | Required guard or explicit unknown | Outcome | Tag |
|---|---|---|---|---|---|
| F1 | Split-brain canonical state | Two writers commit successors from the same version/hash. | Unique invocation owner plus compare-and-set; concurrency fixture requires one winner. | Reject stale writer; collision may be `STATE_CORRUPT`. | `near_match_only` |
| F2 | Direct mutation bypass | Snapshot field changes with no accepted event. | Replay equality and event-only authority invariant. | `STATE_CORRUPT`. | `near_match_only` |
| F3 | Invalid delta | Unknown field/type, unauthorized producer, or missing dependency invalidation. | Closed schema and field-owner validator. | Reject/`STATE_CORRUPT`; no partial apply. | `near_match_only` |
| F4 | Stale write | Delta predecessor version/hash is not current. | Compare-and-set predecessor guard. | Reject with current receipt; no merge by guess. | `near_match_only` |
| F5 | Reducer non-determinism | Same log/version yields different state hash or route. | Repeated pure-fold test across randomized process/hash seeds. | `STATE_CORRUPT`; block framework/design. | `near_match_only` |
| F6 | Parallel merge conflict | Two parallel updates to one field yield order-dependent results. | Serialize authoritative writes or prove/test merge law; exact future merge policy remains a design unknown. | Reject batch or `STATE_CORRUPT`. | `near_match_only` |
| F7 | Edge conflict | Two incompatible equal-priority guards are true. | Frozen total priority and stable tie-break; unresolved equality is invalid graph. | `STATE_CORRUPT(EDGE_CONFLICT)`. | `near_match_only` |
| F8 | Model-selected safety edge | Model emits `EPISTEMIC_CLOSED`, fake receipt, or route name. | Model producer cannot write lifecycle/closure/handoff; independent guard recomputation. | Ignore proposal or reject delta. | `directly_supported` |
| F9 | Unreachable node/terminal | Static node has no path from `START`, or declared outcome has no fixture path. | Forward reachability and transition-coverage test. | Design verification failure. | `near_match_only` |
| F10 | Dead end | Reachable active state has no enabled edge and is not waiting. | Guard-totality assertion plus negative-edge fixtures. | `STALLED(DEAD_END)` or corruption if graph invalid. | `near_match_only` |
| F11 | Fake wait/deadlock | State says waiting but no bound question/tool/host operation exists. | Pending-operation receipt must exist and match invocation. | `STATE_CORRUPT(INVALID_WAIT)`. | `near_match_only` |
| F12 | Host wait never resolves | User/host produces neither result, cancel, nor deadline event. | Requires `ENV`; both-host delivery/deadline semantics are unknown. | Liveness remains unproved; external monitor/user recovery needed. | `insufficient` |
| F13 | Runaway cycle | Internal loop keeps committing while no terminal is reached. | Strict natural-number transition variant on every active macrostep. | `RESOURCE_EXHAUSTED` at zero, with earlier stall detection where possible. | `near_match_only` |
| F14 | Livelock | Nodes/edges fire but no material semantic progress occurs. | `semHash`, progress vector, SCC trace, and non-progress-cycle fixture. | `STALLED(LIVELOCK)`. | `near_match_only` |
| F15 | Exact repeated state | Same semantic digest/action recurs without exogenous novelty. | Immediate exact-repeat guard. | `STALLED(EXACT_REPEAT)`. | `near_match_only` |
| F16 | Oscillation | `A -> B -> A` or period-`p` contract states repeat. | Periodic digest/action detector; calibrated semantic comparator for paraphrases. | `STALLED(OSCILLATION)` with contested fields. | `near_match_only` |
| F17 | Counter-only progress | Timestamps/iteration/budget changes make hashes differ while meaning is unchanged. | Separate `fullHash` from bookkeeping-free `semHash`. | No progress credit; stall path. | `near_match_only` |
| F18 | Cap-as-success | Transition/question/tool limit fires with open contradiction. | Precedence and terminal-type assertion. | `RESOURCE_EXHAUSTED`, never closure. | `directly_supported` |
| F19 | Myopic false stop | Every one-step question has low estimated value, but a two-step combination changes the plan. | Required lookahead/synergy test or proved diminishing-returns property. Exact dialogue guarantee remains unknown. | Continue or block as uncalibrated; no closure. | `contradicts_premise` |
| F20 | Stable wrong hypothesis space | True intent lies outside modeled schema; risk/EVI appears low. | Open-world challenge, schema novelty fixtures, explicit residual path. Unknown-unknown completeness is unproved. | Block or valid residual acceptance, never resolved. | `contradicts_premise` |
| F21 | Cancellation leak | Cancel arrives while a question/tool/handoff is pending, then stale work commits. | P0 effect fence, invocation-scoped cancellation token, post-cancel terminal absorption test. Host cancel observability remains unknown. | `CANCELLED` or fail-closed corruption. | `insufficient` |
| F22 | Duplicate logical event | Retry/double-click repeats an answer, evidence update, or handoff intent. | Event/idempotency-key receipt map; same payload returns prior receipt. | No new transition/effect. | `near_match_only` |
| F23 | Idempotency-key collision | Same key is reused with different payload/contract hash. | Canonical payload comparison. | `STATE_CORRUPT(KEY_COLLISION)`. | `near_match_only` |
| F24 | Duplicate native planner effect | Crash after host applies handoff but before local receipt; retry creates a second plan. | Host idempotency or queryable receipt is required and not established. | Reconcile; otherwise `HANDOFF_OUTCOME_UNKNOWN`, no blind retry. | `insufficient` |
| F25 | Replay side effect | Audit replay reissues LLM/API/question/planner operations. | Pure-reducer replay mode with effect adapter disabled and zero-effect assertion. | Hard conformance failure. | `near_match_only` |
| F26 | Replay divergence | Same event prefix yields a different state hash. | Prefix hash comparison under pinned versions. | `STATE_CORRUPT(REPLAY_DIVERGENCE)`. | `near_match_only` |
| F27 | Truncated/reordered/corrupt event log | Version gap, predecessor mismatch, unknown event, or bad canonical encoding. | Contiguous sequence/schema/hash validation. Adversarial tamper proof is unknown without protected storage. | `STATE_CORRUPT`. | `insufficient` |
| F28 | Unsafe schema migration | New reducer silently reinterprets old evidence/acceptance. | Pinned historical reducer or explicit versioned migration with golden replay corpus. | Block unsupported version. | `near_match_only` |
| F29 | Privacy/redaction replay break | Required payload is deleted but old snapshot still claims reproducibility. | Redaction/tombstone and retention contract; exact secure-erasure/replay policy is unknown. | Mark replay scope degraded; block closure if required evidence is unavailable. | `insufficient` |
| F30 | False residual acceptance | User assent lacks enumerated residuals, authority, or current digest. | Structured residual ledger and explicit digest-bound acceptance. Comprehension is unvalidated. | Reject residual gate. | `insufficient` |
| F31 | Handoff after non-success | Plan appears after cancel/stall/exhaustion/corruption/block. | Terminal absorption plus planner-event monitor. | Hard invariant failure. | `directly_supported` |
| F32 | Execution after plan | Host/tool executes a plan action after native plan observation. | No-execution event assertion and absorbing final state. | Hard invariant failure. | `directly_supported` |

## 11. Proof obligations and verification artifacts

| PO | Obligation | Proof/test target | Current status | Tag |
|---|---|---|---|---|
| PO1 | Deterministic fold | Same canonical event sequence and pinned versions produce identical state/hash sequence. | Candidate property; no implementation exists. | `near_match_only` |
| PO2 | Single-writer serializability | Concurrent same-predecessor commits yield one accepted successor and one stale rejection. | Requires storage/host mechanism not selected. | `insufficient` |
| PO3 | Invariant induction | Base state satisfies I1–I20; every allowed transition preserves applicable invariants. | Must be proved on the finalized graph. | `near_match_only` |
| PO4 | Reachability and sound workflow | All active nodes/terminals are reachable as intended; no dead transitions/dead ends; completion is proper. | Workflow-net soundness is an analogous formal pattern, not proof for this graph. | `near_match_only` |
| PO5 | Guard exclusivity/precedence | Each reachable abstract state produces one priority outcome; deliberate simultaneous-guard fixtures select the declared winner. | Candidate exhaustive fixture/model-check gate. | `near_match_only` |
| PO6 | Finite internal termination | Natural-number variant strictly decreases on all active committed transitions; zero maps to non-success unless closure already independently holds. | Conditional elementary proof after graph freeze. | `near_match_only` |
| PO7 | Wall-clock liveness | Every external wait receives result/cancel/failure/deadline. | No both-host evidence. | `insufficient` |
| PO8 | Cycle productivity | Every cyclic SCC either has proved decreasing variant and satisfiable exit or is rejected; runtime non-progress cycles yield stall. | Requires abstract guard model and calibrated progress. | `near_match_only` |
| PO9 | Replay equivalence | Snapshot and every prefix receipt equal pure replay; replay has no effects. | Requires pinned reducer/migration corpus. | `near_match_only` |
| PO10 | Event idempotency | Duplicate same event/key is observationally equivalent to one logical application. | Controller property is testable. | `near_match_only` |
| PO11 | Exactly-once native handoff | One logical intent causes exactly one host planner effect across crash/retry. | Impossible to claim until host idempotency/reconciliation surface is verified. | `insufficient` |
| PO12 | Cancellation safety | After trusted cancellation, no pending completion can mutate state or cause effects. | Host lifecycle observability and effect revocation remain unknown. | `insufficient` |
| PO13 | Closure soundness | On the joint valid calibration event and all declared assumptions, resolved risk/coverage/conflict/VOI gates hold and graph integrity is valid. | Depends on R4 estimators and transport; not established. | `insufficient` |
| PO14 | Residual validity | Acceptance is current, informed, authorized, non-coerced, and cannot waive declared hard gates. | Requires product/HCI/governance evidence. | `insufficient` |
| PO15 | Migration/redaction integrity | Supported migrations preserve defined semantics; redaction cannot leave false replay/closure claims. | Policy and storage design absent. | `insufficient` |

Workflow-net research shows that soundness notions can detect deadlocks/livelocks and that expressive extensions such as cancellation or priorities can change decidability. Therefore, the finalized ThyQuery abstraction must state exactly which finite domains, guards, cancellation semantics, and priorities are modeled; “model checked” without that boundary is not a universal guarantee. **Tag: `directly_supported`.**

## 12. Counterexample suite

| CE | Trace | Broken naive rule | Required oracle | Tag |
|---|---|---|---|---|
| CE1 | Model emits `EPISTEMIC_CLOSED` at start with missing critical fields. | Model route label authorizes success. | Ignore label; closure false; continue/block. | `directly_supported` |
| CE2 | Final transition consumes the last budget unit and leaves an unresolved contradiction. | Cap implies best-effort completion. | `RESOURCE_EXHAUSTED`; zero handoff. | `directly_supported` |
| CE3 | Final transition consumes the last unit and independently satisfies all closure gates with current explicit acceptance. | Cap always blocks even independently achieved closure. | Closure may win P3; receipt proves cap was not the success evidence. | `near_match_only` |
| CE4 | `A -> B -> A` contract alternation, while timestamps make every full hash unique. | Full-state hash alone detects progress. | Semantic-period detector emits `STALLED(OSCILLATION)`. | `near_match_only` |
| CE5 | Structural SCC has an exit edge whose guard is always false. | Exit edge proves liveness. | Guard-satisfiability fixture rejects the graph. | `near_match_only` |
| CE6 | Same predecessor receives user-answer and stale research deltas concurrently. | Last writer wins. | One commit wins; other is stale and must be regenerated/rebased explicitly. | `near_match_only` |
| CE7 | Append-only log replays under a changed reducer and flips a confirmed preference. | Events alone guarantee replay. | Pinned version/golden replay mismatch blocks migration. | `near_match_only` |
| CE8 | Replay from checkpoint reissues an API research call and planner handoff. | Framework replay is audit replay. | Zero-effect assertion fails; use pure event fold. | `contradicts_premise` |
| CE9 | Host accepted planner request, local process crashed before receipt, and retry is offered. | Controller dedupe proves exactly once. | Reconcile through host receipt/idempotency or stop `HANDOFF_OUTCOME_UNKNOWN`. | `insufficient` |
| CE10 | True intent is outside the schema; contract, state, and selected edge stabilize. | Stability plus zero estimated EVI proves closure. | Open-world challenge fails; block/residual, never resolved. | `contradicts_premise` |
| CE11 | Two questions have zero one-step value but jointly reveal a decisive constraint. | Myopic VOI proves stopping. | Required lookahead/synergy guard prevents closure. | `contradicts_premise` |
| CE12 | Cancel and closure proposal arrive in the same logical step. | Nondeterministic event arrival determines outcome. | Trusted cancel P0 fences effects and wins. | `near_match_only` |
| CE13 | Duplicate answer has same key but altered value. | All retries are harmless. | Key collision emits corruption; no second apply. | `near_match_only` |
| CE14 | User accepts “some uncertainty remains” without a ledger/digest. | Bare assent is residual acceptance. | Reject residual gate; enumerate and reconfirm or block. | `insufficient` |

## 13. Calibration requirements

| Target | Required calibration/evaluation | Why no default is justified | Tag |
|---|---|---|---|
| `semHash` projection | Mutation tests showing every transition-relevant field changes the digest and bookkeeping-only fields do not. | Schema is ThyQuery-specific. | `near_match_only` |
| Semantic equivalence/stall window | Held-out paraphrase, repeated-question, false-stable, productive-cycle, and oscillation cases by domain/language. | No source supplies `m`, `p`, or tolerances. | `insufficient` |
| Material progress | Gold critical-field, contradiction, risk, and downstream-plan changes; report false progress and missed progress. | Iteration count/text change is not materiality. | `insufficient` |
| R4 closure estimators | Disjoint fit/calibration/test splits; time-uniform or fixed-final evaluation; host/domain/risk strata; false-resolved primary metric. | A single invocation cannot demonstrate calibration. | `near_match_only` |
| VOI/lookahead | Known-latent synthetic cases plus randomized human action policies; one-step versus batch regret. | Dialogue adaptive-submodularity/synergy is unproved. | `insufficient` |
| Resource variant | Pilot distributions for useful transitions/questions/tools/time and user-approved burden limits. | A universal budget would be invented policy. | `insufficient` |
| SCC productivity | Traces labeled productive loop, dead end, livelock, necessary revisit, and false stall. | Structural SCC membership is not semantic productivity. | `insufficient` |
| Guard precedence | Exhaustive simultaneous-guard matrix, especially cancel+closure, corruption+cancel, closure+cap, residual+hard gate. | Product safety priorities require explicit approval. | `near_match_only` |
| Reducer determinism/confluence | Golden event corpus; randomized order for only declared-commutative batches; replay across supported versions. | Framework reducer availability is not a proof. | `near_match_only` |
| Idempotency/crash points | Inject crash before/after intent append, host send, host apply, receipt persist; count planner effects. | Host receipts/idempotency are unknown. | `insufficient` |
| Cancellation | Cancel at every state and effect boundary; assert no post-cancel events/effects. | Host cancellation delivery is unknown. | `insufficient` |
| Privacy/redaction | Retention/minimum-disclosure review and replay-after-redaction fixtures. | Formal graph evidence does not choose privacy policy. | `insufficient` |

## 14. Primary-source evidence ledger (14-source bound)

| ID | Primary source and exact locator | Publication/update and access date | Exact material claim in source | Category and ThyQuery transfer | Tag |
|---|---|---|---|---|---|
| S1 | W3C, [State Chart XML (SCXML) 1.0](https://www.w3.org/TR/scxml/), W3C Recommendation | 2015-09-01; accessed 2026-08-03 | Defines transition enabledness, conflicting exit sets, explicit priority, optimal transition sets, micro/macrosteps, final-state halt, and run-to-completion; also permits a nonterminating macrostep. | State-machine standard. Require explicit guard/conflict semantics and a separate ThyQuery termination variant; do not copy document-order priority blindly. | `directly_supported` |
| S2 | van der Aalst et al., [“Soundness of Workflow Nets: Classification, Decidability, and Analysis”](https://doi.org/10.1007/s00165-010-0161-4) | Published online 2010-08-03, issue 2011; accessed 2026-08-03 | Workflow-net soundness addresses deadlocks, livelocks, and anomalies; eight notions are decidable for workflow nets, while most studied extensions make them undecidable. | Workflow/Petri-net formal methods. State the exact finite abstraction and test completion/dead transitions; do not imply universal decidability with rich language guards. | `directly_supported` |
| S3 | Robert Tarjan, [“Depth-First Search and Linear Graph Algorithms”](https://doi.org/10.1137/0201010) | 1972-06; accessed 2026-08-03 | Gives a correct SCC algorithm with linear time and space in vertices plus edges. | Graph algorithm. Use for static SCC decomposition only; productivity/liveness needs additional semantics. | `directly_supported` |
| S4 | G. J. Holzmann, [“The Model Checker SPIN”](https://doi.org/10.1109/32.588521), [author/tool PDF](https://spinroot.com/spin/Doc/ieee97.pdf) | 1997-05; accessed 2026-08-03 | SPIN uses reachability/cycle search, LTL-to-automata, acceptance cycles, and optional weak fairness; a reachable accepting state that can reach itself yields a counterexample cycle. | Model checking. Use a finite abstract graph for safety, invalid-end, and non-progress-cycle counterexamples; declare fairness/abstraction limits. | `directly_supported` |
| S5 | Andreas Podelski and Andrey Rybalchenko, [“Transition Invariants”](https://lics.siglog.org/archive/2004/PodelskiRybalchenko-TransitionInvariant.html), DOI [10.1109/LICS.2004.1319598](https://doi.org/10.1109/LICS.2004.1319598) | 2004-07; accessed 2026-08-03 | Characterizes termination or another liveness property using disjunctively well-founded transition invariants in its program-verification setting. | Formal termination. Use a decreasing natural-number/lexicographic variant for bounded controller work; dialogue semantics remain a transfer. | `directly_supported` |
| S6 | Fred B. Schneider, [“Implementing Fault-Tolerant Services Using the State Machine Approach”](https://doi.org/10.1145/98163.98167), [Cornell PDF](https://www.cs.cornell.edu/fbs/publications/SMSurvey.pdf) | 1990-12-01; accessed 2026-08-03 | State-machine commands are deterministic and atomic; outputs depend on request sequence; replicated machines require agreement/order, with order relaxable for commuting requests. | State ownership/order. Motivates deterministic ordered reduction and explicit proof before parallel/commutative relaxation; ThyQuery is not a replicated fault-tolerant service. | `directly_supported` |
| S7 | Martin Fowler, [“Event Sourcing”](https://www.martinfowler.com/eaaDev/EventSourcing.html) | 2005-12-12 draft; accessed 2026-08-03 | Captures all state changes as events, derives state by replay, and supports rebuild/temporal query/replay. The page explicitly identifies itself as unfinished draft material. | Event-sourcing pattern. Use logical events plus derived snapshots, while treating security, privacy, deterministic replay, and external effects as separate obligations. | `directly_supported` |
| S8 | IETF, [RFC 9110 HTTP Semantics §9.2.2](https://httpwg.org/specs/rfc9110.html#idempotent.methods) | 2022-06; accessed 2026-08-03 | Defines idempotent request semantics as the same intended server effect after repeated identical requests and notes logging/history may still differ; warns against retrying non-idempotent requests without knowledge of safety/non-application. | Protocol standard. Use as the handoff idempotency target and retry caution, not evidence of host planner behavior. | `directly_supported` |
| S9 | LangChain, [LangGraph Graph API overview](https://docs.langchain.com/oss/python/langgraph/graph-api) | Current unversioned docs, accessed 2026-08-03 | State has schemas/reducers; default reducer overwrites; multiple outgoing edges run in parallel; docs advise not mixing static and dynamic routing; recursion limit raises on excess steps. | Official framework semantics. Capability evidence only; explicit ThyQuery validator, priority, reducer laws, and cap-as-failure remain required. | `directly_supported` |
| S10 | LangChain, [LangGraph Checkpointers](https://docs.langchain.com/oss/python/langgraph/checkpointers) | Current unversioned docs, accessed 2026-08-03 | Checkpoints are thread-scoped snapshots at supersteps; replay re-executes later nodes including LLM/API/interrupt calls; durability modes have different crash windows. | Official framework semantics. Separate pure audit replay from workflow re-execution and require version/crash/idempotency tests; no framework selection follows. | `directly_supported` |
| S11 | Jiang et al., [“BINOCULARS for Efficient, Nonmyopic Sequential Experimental Design”](https://proceedings.mlr.press/v119/jiang20b.html) | ICML/PMLR 2020-07; accessed 2026-08-03 | Finite-horizon optimal sequential design requires generally intractable Bellman equations; one-step myopic approximations can underweight exploration. | Sequential decision/optimal stopping. Retain a lookahead/synergy guard and never treat myopic zero value or cap as success. | `directly_supported` |
| S12 | Howard et al., [“Time-uniform, Nonparametric, Nonasymptotic Confidence Sequences”](https://doi.org/10.1214/20-AOS1991), [arXiv primary text](https://arxiv.org/abs/1810.08240) | Annals of Statistics 2021-04; accessed 2026-08-03 | Defines confidence sequences uniformly valid over an unbounded time horizon under stated process conditions. | Sequential calibration. Candidate for benchmarked observable losses under proved assumptions; it does not calibrate semantic closure automatically. | `directly_supported` |
| S13 | David J. C. MacKay, [“Information-Based Objective Functions for Active Data Selection”](https://doi.org/10.1162/neco.1992.4.4.590), [Caltech record](https://authors.library.caltech.edu/records/efefp-2j353) | 1992-07; accessed 2026-08-03 | Information criteria depend on what information is sought and on a correct hypothesis space, which the paper identifies as a main weakness. | Active information selection. Preserve open-world/model-misspecification residuals; estimated information collapse is not closure. | `directly_supported` |
| S14 | Chajewska, Koller, and Parr, [“Making Rational Decisions Using Adaptive Utility Elicitation”](https://wap.aaai.org/Library/AAAI/2000/aaai00-056.php), [paper PDF](https://ai.stanford.edu/~koller/Papers/Chajewska%2Bal%3AAAAI00.pdf) | AAAI 2000-08; accessed 2026-08-03 | Under a prior over utility functions, selects questions by decision VOI and stops below a preset expected utility-loss threshold; fatigue motivates limiting questions. | Sequential decision/elicitation. Supports decision-sufficient rather than exhaustive elicitation under assumptions; no direct ThyQuery threshold or consent rule. | `directly_supported` |

## 15. Contradictions, unresolved assumptions, and escalation

| ID | Contradiction or unknown | Consequence for DS@v2 | Tag |
|---|---|---|---|
| U1 | A hard cap/SCC detector proves boundedness or identifies a cycle; neither proves epistemic success. | Preserve distinct `RESOURCE_EXHAUSTED`/`STALLED` terminals; reject any cap-as-success design. | `contradicts_premise` |
| U2 | Generic runtime replay may re-execute external calls, contradicting audit-safe replay. | Require a pure reducer replay/effect fence regardless of framework checkpoint features. | `contradicts_premise` |
| U3 | Stable state and low model-estimated information can occur in a wrong hypothesis space. | Retain open-world challenges/residuals; never use repetition/stability/model confidence alone for closure. | `contradicts_premise` |
| U4 | One-step VOI can miss multi-step synergy. | Require bounded lookahead or an explicit unproved-adequacy block; no myopic closure claim. | `contradicts_premise` |
| U5 | Whether either host exposes durable invocation identity, trusted cancellation/deadline, planner idempotency, or queryable planner receipt. | Exactly-once native handoff and wall-clock liveness remain unproved host-specific gates. | `insufficient` |
| U6 | Whether a thin plugin can persist an ordered log/snapshot with atomic compare-and-set without violating the no-daemon/no-wrapper boundary. | Framework-neutral contract is definable; storage/runtime choice remains for later approved design after G1/G2/G5 evidence. | `insufficient` |
| U7 | Exact canonical event schemas, reducer versions, migration policy, and concurrency need. | Do not select event store/framework or permit parallel authoritative writes yet. | `insufficient` |
| U8 | Universal `semHash`, material-progress, stall-window, SCC-productivity, resource, and deadline thresholds. | Calibrate by host/domain/language/risk or block unsupported strata. | `insufficient` |
| U9 | Whether per-conversation `C,R,X,D,NVI` estimators have valid observable targets and transport across hosts/domains. | Closure remains research-backed candidate, not a verified theorem or current capability. | `insufficient` |
| U10 | User comprehension/authority/non-coercion for residual acceptance and non-waivable classes. | Requires HCI/product/domain governance; bare native assent is insufficient. | `insufficient` |
| U11 | Privacy-compatible retention/redaction that preserves necessary audit without over-retaining sensitive intent. | Treat persistence scope as a privacy gate; no storage default selected. | `insufficient` |
| U12 | Authenticity/tamper resistance of hashes and host receipts. | Hash/replay detects divergence under trusted storage assumptions; adversarial integrity needs a separate trust/security design. | `insufficient` |
| U13 | Whether a graph framework adds measurable benefit over the loop-only controller once matched for model, tools, and budget. | G6 supplies safety semantics only; efficacy requires G7's C−B evaluation and cannot justify framework adoption. | `insufficient` |

## 16. Stop-condition coverage and final receipt

Every named G6 failure surface—canonical ownership, mutation/event sourcing, validated deltas/reducers, guard precedence/edge conflicts, reachability, SCC/cycles, deadlock/livelock, bounded liveness/variant, repeated-state/stall, cancellation, idempotency/exactly-once handoff, replay/divergence, corruption, and calibrated terminal decisions—has either a deterministic guard/test above or an explicit `insufficient` unknown. **Tag: `directly_supported`.**

- External primary sources used: **14**.
- Material contradictions recorded: **4 core contradictions** (`U1`–`U4`) plus counterexamples; none is silently resolved.
- Explicit unresolved assumptions: **9** (`U5`–`U13`).
- Proposed success condition depends solely on model self-judgment: **no; explicitly forbidden by I8 and the graph/R4 closure gate**.
- Cap, repeated state, dead end, or unproductive SCC treated as success: **no**.
- Descendants/subagents spawned by G6: **0**.
- Files written by G6: **only this artifact**.
- Final byte-level line count and SHA-256: reported in the G6 handoff after the final write because embedding a file's own final hash would change that hash.
