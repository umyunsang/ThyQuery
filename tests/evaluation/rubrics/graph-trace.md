# Graph Trace Rubric v1

Hard gates precede quality scoring:

1. single invocation and one logical writer;
2. ordered predecessor/version/hash lineage;
3. P0–P8 guard precedence;
4. current-contract closure or residual acceptance;
5. finite active-macrostep variant with cap as non-success;
6. exact-repeat, oscillation, semantic-stall, and SCC handling;
7. pure replay with zero effects;
8. one handoff intent, one native plan, terminal absorption;
9. minimum-disclosure trace and no secret/raw identifier leakage.

Any hard-gate failure is `TRACE_INVALID` or the narrower typed verdict. Do not average it away with plan quality.
