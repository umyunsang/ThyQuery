# Action Policy v1

Select one current material gap, then choose its legitimate owner:

- `USER`: ask one neutral native question for a preference, commitment, authority, risk choice, or acceptance.
- `EXTERNAL`: perform bounded primary-source research only when the fact can materially change the plan.
- `FRAME`: test a potentially wrong hypothesis using a counterexample, scenario, open-world challenge, or representation change.
- `SHARED`: propose a small adaptive set of interpretations or trade-offs, with edit/defer/cancel paths.

Rank enabled actions by expected downstream plan-loss reduction, then lower user burden, then stable edge ID. The choice count is adaptive; Top 3 is allowed but never mandatory.

An action is admissible only when its net value is positive: `net_value = expected_plan_loss_reduction − user_burden`, using an explicit `net_value` when one is supplied. Actions with a non-finite or non-positive net value are not eligible, and when no admissible action remains the outcome is a typed non-success, not a lower bar. The three sort keys are applied in the frozen order above; the edge-ID key exists so that two equally ranked actions resolve deterministically rather than by model preference.

## Loop obligation

Selecting and committing one action is one macrostep, not the end of the invocation. After every committed macrostep the controller returns to guard recomputation and evaluates the full precedence ladder again from a fresh snapshot. The loop exits only when a guard fires — a terminal outcome, a success outcome, budget exhaustion, or progress failure — never because an action completed or because the contract looks finished.

## Transition budget

The budget is a finite count of committed active macrosteps, decremented exactly once per commit. **The default is 12.** It is a bounded-work guard, not a calibrated quality threshold: it exists so the loop cannot run unbounded, and reaching zero yields `RESOURCE_EXHAUSTED`, which is a typed non-success and never an upgraded result.

Preflight, guard recomputation, pure replay, read-only observation, and an exact repeated user response consume no budget. An exact repeat instead records non-progress evidence, so repeating an answer cannot drain the budget into a forced termination.

Do not invent a different figure per invocation. A caller may configure the budget explicitly; absent that, use 12 rather than inferring a number from how difficult the request feels.

Every question must explain why the gap matters and allow correction. Where meaningful, include `모름`, direct input, defer, and cancel. Silence, timeout, repeated selection, fatigue, or casual assent is not acceptance.

## Progress failure signals

Four signals route to `STALLED`. Each has a stated test, so none is a matter of impression:

- `exact_repeat` — the same canonical user-response content, disposition, targets, and acceptance payload arrives again under a fresh event key. Computed, not judged.
- `oscillation` — the contract returns to a previously committed digest and leaves it again, so the same field is being set back and forth rather than converging.
- `semantic_stall` — a macrostep committed but no contract field changed, no residual changed, and no new evidence disposition was recorded: motion without a delta.
- `unproductive_scc` — the refinement region has been re-entered without any of coverage, contradiction count, or residual set improving since the previous entry.

Report a signal only when its test is met. Fatigue, slow progress, a long conversation, or a subjective sense that the loop is going nowhere are not stall evidence, and using them as such converts a recoverable state into a false terminal.

An action counts as progress only when it adds user/source/counterexample evidence or commits a material contract/uncertainty delta. The same canonical user-response content, disposition, targets, and acceptance payload under a fresh event key is exact-repeat stall evidence: it consumes no progress budget, clears no prior stall flag, and creates no duplicate provenance. Rephrasing and unchanged confidence are stall evidence.
