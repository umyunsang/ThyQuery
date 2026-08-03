# Transition Invariants v1

1. One invocation has one logical writer and one ordered event sequence.
2. Every committed event pins schema, policy, reducer, invocation, predecessor version, and predecessor hash.
3. Same idempotency key plus the same canonical payload is a no-op replay; the same key plus a different payload is `STATE_CORRUPT(KEY_COLLISION)`.
4. Active macrosteps consume exactly one natural-number transition unit. Preflight, guard recomputation, pure replay, and read-only observation consume none.
   An exact repeated user response is an observed non-progress event, not an active macrostep: it consumes zero transition units, preserves prior stall diagnostics, and sets exact-repeat evidence.
5. Budget zero authorizes only `RESOURCE_EXHAUSTED` unless an independently valid closure or residual acceptance already existed at the boundary.
6. P0–P8 are evaluated against one canonical snapshot in frozen order. An unresolved equal-priority conflict is `STATE_CORRUPT(EDGE_CONFLICT)`.
7. Model, host, research, and user inputs are proposed events. No proposal mutates state before validation and commit.
8. `EPISTEMIC_CLOSED` and `ACCEPTED_RESIDUAL` are handoff authorizers, not end-product terminals.
9. One accepted invocation/contract digest can create at most one logical handoff key. Unknown host application is never retried blindly.
   `NOT_APPLIED` is absorbing `BLOCKED`; after a handoff intent, refinement cannot alter the fenced contract.
10. `COMPLETE_AFTER_PLAN` is absorbing. A second plan, edit, shell mutation, approval continuation, or execution is forbidden.
11. Verification replay is a pure fold and may emit no question, network, planner, filesystem, or execution effect.
12. Structural reachability or a decreasing budget proves bounded controller work only; it never proves epistemic correctness.

## Evidence status of the graph itself

These invariants define how the controller must behave. They do not establish that a graph is the right shape for this problem, and the project's own research declined to claim that it is.

- The bounded graph-engineering research returned `NO_GRAPH_BENEFIT_SHOWN`: no demonstrated incremental benefit for a graph-primary architecture over an equivalent guarded loop for ThyQuery's workload. The graph-primary candidate was rejected on that basis, and the selected `B-GUARDED` design uses the graph as a governing and accounting structure rather than as a claimed performance win.
- The same research returned `NO_RUNTIME_SELECTED`: no external graph or workflow framework met the thinness, semantics, two-host, privacy, and efficacy gates. Only the framework-neutral typed contract was an adopt candidate, which is why the shipped packages contain no runtime and `src/reference/` is a development oracle rather than a dependency.

The value these invariants do carry is auditability: a typed state with frozen guard precedence makes non-progress, absorption, and closure checkable after the fact. That is a different and smaller claim than "the graph makes the agent better", and this specification makes only the smaller one.
