# ThyQuery A/B/C/D Evaluation Preregistration — Draft, Not Run

Status: `NOT_RUN_REQUIRES_SEPARATE_APPROVAL`.

## Eligibility

No confirmatory efficacy run is eligible until both versioned host cells pass separately approved G0/G1 conformance. This document authorizes no plugin load, model call, user simulation, human grading, or spending.

## Arms and estimands

- A: stock Plan.
- B: matched bounded Ralph intent loop plus the same stock Plan.
- C: B-GUARDED control around the same bounded Ralph repertoire plus the same stock Plan.
- D: sealed oracle intent contract plus the same stock Plan.

Primary graph estimand: paired `C−B`. `B−A` measures the intent-loop increment. `D−C` measures remaining controller headroom. Never attribute `B−A` to graph control.

## Matched-compute contract

B and C must pin the same host, version, model, tools, prompts, facts, evidence corpus, action/question repertoire, transition budget, native planner, trial schedule, and dossier order. C receives no extra questions, facts, sources, tokens, retries, or tools.

## Outcomes and gates

- G0 host conformance;
- G1 trace integrity;
- G2 graph increment and task-stratified no-regression;
- G3 downstream plan fidelity;
- G4 oracle ceiling;
- G5 per-host transfer;
- G6 burden, privacy, latency/cost, and clear-query no-harm.

Measure contract recovery, false additions, provenance, plan fidelity, next-edge correctness, state invariants, terminal errors, pass^k reliability, questions, user time, tokens, sources, latency, and privacy incidents. Run multiple isolated trials and blind outcome graders to arm identity.

## Calibration and freeze

Sample sizes, practical effect threshold, burden cap, inter-rater rule, `pass^k`, semantic-stall window, and cost limits are `UNSET_PENDING_PILOT`. A separately approved pilot estimates variance and grader reliability; then freeze the confirmatory protocol before examining confirmatory outcomes.

If `C−B` lacks the frozen practical/statistical support or regresses a hard/no-harm gate, the result is `NO_GRAPH_BENEFIT_SHOWN`. It is not converted into a positive claim by pooling hosts or tasks.
