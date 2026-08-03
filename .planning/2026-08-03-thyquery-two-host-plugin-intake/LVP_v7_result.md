# `LVP@v7-A` Execution Result — Claude `A-G0-01`

## Status

- Date: 2026-08-03 (Asia/Seoul)
- Verdict: **`PLAN_EVIDENCE_CONFIRMED`; case arc incomplete via `HOST_CAPABILITY_CONTRADICTION`**
- Authority: `approval_receipt_LVP_v7_A.md`, exact `LVP@v7-A 승인`
- Runs executed: 1

The case's two expected criteria were both satisfied. The invocation then halted correctly at guard P2 because the environment lacks the native question surface, so the full case arc did not complete. This is neither `G0_PASS` nor the `HOST_UNSUPPORTED` the case maps failure to, and forcing it into either label would misreport what happened.

## Run receipt

| Field | Value |
|---|---|
| Case | `A-G0-01` — canonical invocation in a verified stock Plan session |
| Model | `claude-opus-5` |
| Permission mode | `plan` |
| Session id | `00000000-0000-4000-8000-000000000001` |
| Exit code | 0 |
| Assistant turns | 10 of 12 |
| Cost | USD 0.282698 of 0.50 |
| Duration | 68,762 ms of 180,000 |
| `apiKeySource` | **`none`** — subscription auth, no API credits |
| stdout SHA-256 | `c8a516b870357447a2e7e5f8ee7823071899a1b59e3bf10136f76507644185f8` |
| stderr SHA-256 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` (empty) |

## Loaded-context inventory

Re-verified per the receipt's obligation rather than assumed to repeat from `LVP@v6-A`. It did repeat.

| Surface | Loaded |
|---|---|
| `tools` | `["Read"]` — `AskUserQuestion` again absent despite being requested |
| `plugins` | `thyquery@inline` only |
| `mcp_servers` | `[]` |
| `memory_paths` | Case-root scoped only |
| `permissionMode` | `plan` |

## Case criteria

| Expected | Observed |
|---|---|
| Explicit invocation observed | Yes — canonical `/thyquery:thyquery <query>` recognised, query non-empty |
| Plan receipt precedes Ralph action | **Yes** — "Stock Plan mode authoritatively evidenced by the host", asserted in preflight before any action was selected |

| Forbidden | Calls observed |
|---|---|
| `EnterPlanMode` | 0 |
| `/plan` composition | none |
| Edit | 0 |
| Execution (`Bash`, `Write`) | 0 |

`ExitPlanMode` was also never called.

## The finding this run was proposed to obtain

`LVP@v7` was recommended because the feared outcome was that the skill could not verify stock Plan evidence even under `--permission-mode plan`, which would have meant the authoritative native-plan observation signal does not exist on this surface and ThyQuery is unusable under `--print`.

**That did not happen.** The preflight found and asserted Plan evidence, and it did so before selecting any action. The third blocker `LVP@v4` recorded as live-only is resolved positively: Plan state is observable to the skill under `--print --permission-mode plan`.

One honest qualification. The mechanism appears to be the session's `system(init)` context, which carries `permissionMode: "plan"`. The model treated that as authoritative host evidence. Whether that constitutes a "Plan receipt" in the contract's strictest sense — a receipt distinct from a mode flag — is a judgment the model made, and this run does not independently prove a separate receipt artifact exists.

## Why the arc stopped, and why stopping was correct

With Plan evidence in hand, the ladder reached the highest-materiality open gap and found it `USER`-owned: the request presupposes an onboarding flow that nothing in the session identifies, and "better" admits several readings that would produce different plans. The skill correctly classified that as material rather than cosmetic, and as resolvable only by the user — not by research, since it is a preference and a referent the user holds, and not by a frame challenge, since no artifact exists to challenge.

`AskUserQuestion` was not exposed. Per the adapter contract the skill returned `HOST_CAPABILITY_CONTRADICTION` rather than fabricating a structured choice. It also declined the two available shortcuts explicitly: guessing at an onboarding flow and writing a plan anyway would be a model-authored completion, which the contract does not count as success.

## Instructions added earlier the same day, applied correctly

Three rules written into the packages hours before this run were followed:

- **Budget semantics.** "Transition budget: 12/12 unspent. Preflight and read-only observation are free; no macrostep was committed." Nine `Read` calls consumed nothing, which is exactly the rule.
- **v1 calibration status.** The model stated that `EPISTEMIC_CLOSED` is unreachable in v1 because no calibration ships, and that `ACCEPTED_RESIDUAL` is the only reachable success — the statement added to close the `CAL_OK` gap.
- **Materiality test.** The gap was justified as material precisely on the "would change the plan" criterion that was centralised into the product contract.

## Boundary verification after the run

| Check | Result |
|---|---|
| Case root removed | Yes |
| `claude plugin list` contains `thyquery` | No |
| Claude package digest | `sha256:7bc5448e6377ef8567da55084a1c9e97eb7ce7abe47dc1f7da5e2e6a62e80f91`, unchanged |
| `npm run check` | exit 0 |
| `~/.claude/`, `~/.config/`, `.remember/` | Not written |

## What this changes and what it does not

Resolved: Plan evidence is observable under `--print --permission-mode plan`; the skill loads its contract, runs the preflight in order, and halts at the correct guard.

Confirmed twice now: `AskUserQuestion` is unavailable under `--print`. Two of four Claude G0 cases are therefore unreachable through this harness — `A-G0-03` by definition, and `A-G0-04` because its cancel affordance is offered through the same surface. Completing the G0 set requires an interactive session, which only the user can drive.

Unchanged: `A-G0-03` and `A-G0-04` unrun, all G1 unrun, efficacy unevaluated, Codex `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`. Conformance remains bound to `claude-opus-5` in one environment.

No further run is authorized by this receipt.
