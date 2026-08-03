<!-- GENERATED; source of truth is spec/. -->
# ThyQuery Guarded Graph Snapshot v1

- Source digest: `sha256:2996d5c0e063ec66fb21599a8e89099aa79430b4008be0be6e46765fcca84ff6`
- Start node: `PREFLIGHT`
- Declared nodes: 21
- Declared edges: 25

## Frozen guard precedence

0. `P0_CANCEL_EFFECT_FENCE` — Trusted cancel, uncertain handoff, post-plan absorption, and forbidden-effect fencing
1. `P1_INTEGRITY_ABSORPTION` — Schema, version, predecessor, idempotency, reducer, and terminal-integrity failures
2. `P2_HOST_NON_WAIVABLE` — Verified stock Plan and host capability requirements
3. `P3_RESOLVED` — Independently recomputed epistemic closure bound to the current contract
4. `P4_ACCEPTED_RESIDUAL` — Explicit, informed residual acceptance bound to the current contract
5. `P5_RESOURCE_EXHAUSTION` — Finite transition budget reached without success
6. `P6_PROGRESS_FAILURE` — Exact repeat, oscillation, semantic stall, or unproductive SCC
7. `P7_UNCERTAINTY_OWNER` — Route the highest-materiality open gap to its legitimate owner
8. `P8_ACTION_RANKING` — Select a deterministic positive-net-value action with a frozen tie-break

Evaluate every guard against one canonical snapshot. Success is checked before cap exhaustion, but only after cancel, integrity, and non-waivable host conditions. Equal-priority incompatible edges without a frozen tie-break are `STATE_CORRUPT(EDGE_CONFLICT)`.

Only `EPISTEMIC_CLOSED` and `ACCEPTED_RESIDUAL` may reach `HANDOFF_READY`. All product terminals are absorbing.
