# Closure Policy v1

## Resolved closure

```text
EPISTEMIC_CLOSED :=
  GRAPH_OK
  AND PHILOSOPHICAL_OK
  AND COVERAGE_OK AND RISK_OK AND CONFLICT_OK
  AND STABLE_OK AND VOI_OK AND CAL_OK
  AND plan_input_ready
  AND no_unauthorized_intent_drift
  AND explicit_resolved_acceptance_binds_current_contract_digest
```

Each conjunct is represented and recomputed independently. Recomputing the predicates clears prior acceptance. A separate validated native `USER` response must bind a non-empty response receipt, confirmed authority, confirmed comprehension, and the exact current contract digest after the latest recomputation. A model confidence score, controller/model-authored acceptance field, elapsed time, repetition count, stable answer, or completed plan cannot replace the conjunction. An uncalibrated task/risk/language stratum cannot emit resolved closure.

`PHILOSOPHICAL_OK` means material user commitments are conflict-challenged; high-impact implications are confirmed, rejected, or residualized; at least one suitable counterexample/scenario/representation probe has occurred when frame risk is material; and the user retained correction, deferral, and cancellation authority.

### Calibration status in v1

`CAL_OK` means a calibration valid for the current task, risk, and language stratum exists. **No such calibration exists in v1.** No thresholds for coverage, risk, stability, value of information, or question cost have been calibrated on held-out cases, and none are shipped; the evaluation thresholds are recorded as unset pending a pilot. No universal cross-domain constants are available to substitute for them.

Therefore `CAL_OK` is false for every stratum in v1, `EPISTEMIC_CLOSED` is unreachable, and `ACCEPTED_RESIDUAL` is the only reachable success outcome. This is a stated fact about this release, not a judgment to be made per invocation.

Do not infer, estimate, or assume a calibration in order to satisfy this conjunct. A task that feels low-risk, an answer that feels complete, a confident model estimate, and a stratum that merely resembles a calibrated one are all insufficient — inventing a threshold at run time reintroduces exactly the unsupported constant this policy refuses to ship. Route through the residual path and let the user accept what remains open, which is the honest outcome rather than a degraded one.

This changes only when a calibration artifact exists: thresholds fitted per task and risk tier on held-out cases, frozen before evaluation, and versioned so `CAL_OK` can name the version it relies on.

## Accepted residual

Residual acceptance is distinct from resolved closure. It must enumerate each residual's provenance, expected impact, mitigation, reversibility, and owner; bind both the residual-ledger digest and current contract digest; mark every per-item disposition `EXPLICITLY_ACCEPTED`; and carry a validated native `USER` receipt confirming authority and comprehension. A model or controller event cannot self-authorize it.

## Non-success

Budget exhaustion, cycle, stall, unavailable evidence/tooling, invalid calibration, conflict, state corruption, missing Plan, host contradiction, cancel, and uncertain handoff remain typed non-success outcomes.
