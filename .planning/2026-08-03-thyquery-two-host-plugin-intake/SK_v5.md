# ThyQuery Project Skeleton

## Metadata
- Skeleton ID: SK
- Version: v5
- Stable locator: .planning/2026-08-03-thyquery-two-host-plugin-intake/SK_v5.md
- Status: SKELETON_APPROVAL_PENDING(SK@v5)
- Base: SK@v4 at SHA-256 dce89fa3681d62a64562d17c52876b4b73eb67e429243f0dec5d8f2a2460fa95
- Transition: REVISION_REQUIRED(SK@v4 → SK@v5)
- Created: 2026-08-03 (Asia/Seoul)

All SK@v4 fields remain effective unless this document changes them. Approval of SK@v5 authorizes only the revised bounded read-only research manifest below.

## New Raw Request

> 플랜모드에서만 순정 도구 호출이 가능하다는거네? 달러thyquery를 사용할때는 강제로 플랜모드로 변경하도록 하는 방향이 좋아보이네 아마 claude code도 플랜모드에서만 호출될거 같아

## Authority Split

### Authoritative Direction
- Keep the explicit invocation $thyquery <최종사용자질의>.
- Prefer entering a planning and elicitation-capable host mode before the ambiguity and tacit-intent loop begins.
- The loop should use the stock host question and proposal tools rather than simulating a choice UI in ordinary text when a verified native interface is available.
- Ordinary prompts remain untouched.
- Delegated research remains flat and root-owned, with no recursive agents and immediate cleanup of every completed branch and session.

### Confirmed Current Evidence
- In this current Codex Default-mode task, a real request_user_input call was rejected with request_user_input is unavailable in Default mode.
- This confirms a Plan-mode gate for that one structured-choice interface in this current runtime. It does not prove that all Codex native tools are Plan-only.
- The current Codex task exposes no model-callable collaboration-mode switch. In this runtime, a user request alone does not change the active mode.
- Local Claude Code 2.1.220 help lists plan among the accepted values of --permission-mode. This confirms that Claude Code has a Plan permission mode at session configuration or launch.

### Provisional Premises
- A Codex plugin or skill can force the current session into Plan mode when $thyquery is invoked.
- A Claude Code plugin or command can switch an already-running session into Plan mode rather than merely being launched with that mode.
- Claude Code question or choice tools are available only in Plan mode.
- Both hosts can return from Plan mode to an execution-capable state after intent closure without losing the accepted contract.
- The exact dollar-prefixed invocation is native in both hosts.

None of these provisional premises is approved as fact. R1 and R2 must verify them from current local schemas and official sources.

## Normalized Direction
- Outcome: an explicit $thyquery invocation reaches a verified interaction-capable planning state, performs the evidence-backed Ralph loop, and emits an accepted intent contract for stock-host execution.
- Included: mode and capability preflight; official Plan-mode entry when supported; fail-closed handling when not supported; native structured questions and choices; adaptive evidence research; progress and closure measurement; resumable state; accepted-contract handoff.
- Excluded: automatic interception of ordinary prompts; claiming that every native tool is Plan-only; assuming Claude parity from Codex behavior; silently faking a mode change; using a wrapper as native parity without later approval; implementation before design approval.
- Done signal for the research stage: each host has an exact matrix for invocation syntax, current-mode detection, structured-question availability by mode, same-session transition authority, failure behavior, state preservation, and post-closure handoff.

## Candidate Mode-Entry Approaches

| Approach | Behavior | Trade-off |
|---|---|---|
| A — capability preflight plus official auto-entry, fail closed otherwise | $thyquery checks the active mode and native choice capability; it automatically enters Plan only through an official host mechanism, or stops with a clear mode-switch requirement and resumable state | Recommended because it honors the desired experience without claiming authority the plugin may not possess |
| B — unconditional programmatic force | Every invocation attempts to mutate the current session to Plan before any other work | Smoothest if officially supported, but currently unverified and may be impossible or surprising |
| C — no Plan dependency | Run the loop in the current mode and fall back to prose questions | Broad compatibility, but it weakens the requirement to use the verified stock proposal interface |

Provisional recommendation: Approach A. Approach B becomes the concrete implementation only where exact host evidence proves safe same-session switching. Approach C is not the default and would require an explicit scope decision if neither host can satisfy A.

## Revised Runtime State Machine

    EXPLICIT $thyquery INVOCATION
      -> CAPTURE ORIGINAL QUERY
      -> MODE AND TOOL CAPABILITY PREFLIGHT
      -> PLAN_READY
           | YES: BEGIN EPISTEMIC LOOP
           | NO + OFFICIAL AUTO-ENTRY: ENTER PLAN, VERIFY, BEGIN LOOP
           | NO + NO OFFICIAL AUTO-ENTRY: NEEDS_PLAN_MODE, SAVE RESUME STATE, STOP
      -> QUESTION | RESEARCH | TEST | SUMMARIZE | CONFIRM
      -> UPDATE INTENT CONTRACT AND EVIDENCE LEDGER
      -> TEST RESEARCHED CLOSURE CONDITION
      -> CONTINUE | RESOLVED | ACCEPTED_RESIDUAL | CANCEL | BLOCK
      -> VERIFIED POST-CLOSURE HANDOFF

Required invariants:
1. The plugin never reports a mode transition until the host confirms the effective mode and required choice interface.
2. Failure to enter Plan cannot degrade silently into a fake structured-choice interaction.
3. The original query and loop receipt survive a user-controlled mode-switch pause when the host supports resumable state.
4. Claude behavior is not inferred from Codex behavior or vice versa.
5. Resource exhaustion, a mode error, or a failed transition never emits RESOLVED.
6. Post-closure execution occurs only through a verified host transition or an explicit user-confirmed handoff.

## Revised Host Research Gate

External or deep research remains paused until exact SK@v5 approval. Research topology is flat and root-owned; no lane may spawn descendants.

### R1 — Codex invocation, choice tool, and mode transition
- Verify exact $thyquery skill or plugin invocation and argument delivery.
- Verify request_user_input availability and semantics in every relevant current Codex mode and surface.
- Determine whether a plugin or skill can detect, request, or force Plan mode in the same task.
- Distinguish developer or host mode configuration from model-callable tools.
- Determine how a loop pauses and resumes if the user must switch modes manually.
- Determine how an accepted intent contract returns to execution after Plan.
- Bound: local read-only help, schemas, code, and configuration first; then official OpenAI sources only; 75 minutes or 15 material sources.

### R2 — Claude Code invocation, choice tool, and mode transition
- Verify exact native plugin, skill, or command invocation grammar and whether dollar syntax is supported.
- Verify the actual user-question or choice tool and its availability by permission mode.
- Determine whether --permission-mode plan is launch-only, configurable in-session, or controllable from an invoked plugin.
- Determine how loop state survives a required mode change and how the accepted contract returns to execution.
- Bound: local read-only help, schemas, installed official plugins, and configuration first; then official Anthropic sources only; 75 minutes or 15 material sources.

### R3 through R6
- Retain the approved-question candidates from SK@v4 for empirical elicitation, formal progress and stopping, philosophy and Socratic reasoning, and Ralph-loop evaluation.
- Add mode-transition failure, user-mode-switch burden, and lost-state recovery to benchmark and negative-fixture coverage.
- Each lane remains independent, read-only, bounded, non-overlapping, and forbidden from spawning descendants.

## Evidence Ledger Delta

| Claim ID | Finding | Evidence tag | Scope and implication |
|---|---|---|---|
| U8 | The user prefers $thyquery to force or enter Plan mode before native proposal interactions | directly_supported | Exact current product direction; operational mechanism remains provisional |
| C1 | request_user_input was rejected in the current Codex Default-mode task | directly_supported | Exact current task only; verifies one tool-mode gate |
| C2 | All Codex native tools work only in Plan mode | contradicts_premise | Shell, file, and other stock tools are currently callable in Default; only the tested structured-input tool was mode-blocked |
| C3 | A ThyQuery plugin can change Codex collaboration mode itself | insufficient | No callable switch is exposed in the current task; R1 required |
| A1 | Claude Code 2.1.220 supports a plan permission mode | directly_supported | Local CLI help; establishes mode existence, not plugin transition |
| A2 | Claude question tools are Plan-only and plugin-switchable | insufficient | Local help does not establish either property; R2 required |

## Approval Ledger

| Artifact | Scope | Status |
|---|---|---|
| SK@v4 / dce89f…0fa95 | Explicit-command research before the new Plan-mode direction | SUPERSEDED_FOR_NEW_DISPATCH |
| SK@v5 plus external SHA-256 receipt | R1–R6 bounded read-only research with mode-transition gates | PENDING |
| DS@v1 | Synthesized architecture and implementation-planning authority | NOT_CREATED |
| Implementation authorization | Code, scaffolding, installation, configuration, and verification | NOT_GRANTED |

## Field-Level Diff from SK@v4

| Field | SK@v4 | SK@v5 |
|---|---|---|
| Loop precondition | Verified native interaction tool in actual mode | Explicit Plan and capability preflight |
| Desired transition | Mode availability researched | Official automatic Plan entry preferred |
| Unsupported transition | General host mismatch | Fail closed with resumable NEEDS_PLAN_MODE state |
| Codex claim | request_user_input mode-gated in current task | Same fact retained; universal Plan-only claim rejected |
| Claude claim | Native question surface unknown | Plan mode existence observed; question restriction and plugin switching remain unknown |
| Post-closure | Stock-host handoff | Explicitly research Plan-to-execution transition |

## Next Action
- Current state: SKELETON_APPROVAL_PENDING(SK@v5)
- Authorized now: user review and bounded local skeleton validation only
- Not authorized: new external or deep research, subagent dispatch, code, scaffolding, installation, configuration change, deployment, or publication
- Next checkpoint: exact SK@v5 approval for the revised R1–R6 read-only research scope
