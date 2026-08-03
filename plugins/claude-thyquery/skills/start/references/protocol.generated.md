<!-- GENERATED; source of truth is spec/. -->
# ThyQuery Protocol Snapshot v1

- Source digest: `sha256:2996d5c0e063ec66fb21599a8e89099aa79430b4008be0be6e46765fcca84ff6`
- Runtime status: instruction-only candidate; the Node reference controller is development-only.
- Entry: verified stock Plan is mandatory. Missing proof yields `PLAN_MODE_REQUIRED` and no action.
- Commit authority: validated typed events through one canonical reducer; model/tool output is proposal-only.
- Handoff authority: only `EPISTEMIC_CLOSED` or `ACCEPTED_RESIDUAL` bound to the current contract digest. In v1 no calibration exists, so `EPISTEMIC_CLOSED` is unreachable and `ACCEPTED_RESIDUAL` is the only reachable success outcome.
- Materiality: a gap, fact, or contradiction is material only when resolving it differently would change the contract or the plan.
- Loop obligation: one committed macrostep is not the end. Return to guard recomputation after every commit and re-evaluate the whole ladder from a fresh snapshot. The loop exits only when a guard fires, never because an action finished or the contract looks complete.
- Transition budget: a finite count of committed active macrosteps, decremented once per commit, **default 12** unless the caller configures it. Preflight, guard recomputation, replay, read-only observation, and an exact repeated response consume none. Zero yields `RESOURCE_EXHAUSTED`, a typed non-success. Do not infer a different figure from how hard the request feels.
- Action admissibility: `net_value = expected_plan_loss_reduction − user_burden`. Non-positive or non-finite net value is inadmissible; with no admissible action the outcome is a typed non-success. Rank by loss reduction, then lower burden, then stable edge ID.
- Stall tests: `exact_repeat` is the same canonical response under a fresh key; `oscillation` is returning to a prior contract digest and leaving again; `semantic_stall` is a commit with no contract, residual, or evidence delta; `unproductive_scc` is re-entering refinement with no improvement in coverage, contradictions, or residuals. Fatigue and slow progress are not stall evidence.
- Product terminal: one observed native plan, then `COMPLETE_AFTER_PLAN`; never execute it.
- Non-success: cancel, block, stall, cap, integrity failure, host contradiction, and uncertain handoff authorize no plan.
- Replay: pure event fold with zero user, network, planner, filesystem, or execution effects.
