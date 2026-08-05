# Claude Code Outcome Copy v1

Keep host wording natural, but preserve the following meanings.

**Output language follows the user's query language.** Render every outcome in the language the user wrote in; an explicit language request from the user overrides that default. The Korean and English renderings below are reference examples of the meaning to preserve, not strings to emit verbatim — a user writing in a third language should be answered in theirs.

## `PLAN_MODE_REQUIRED`

ThyQuery did not start. Stock Plan mode could not be confirmed for this session. Say that no question, research, or plan was produced, and that re-invoking `/thyquery:start <query>` from Plan mode is what resumes it.

- Korean: `ThyQuery를 시작하지 않았습니다. 현재 세션의 순정 Plan 모드를 확인할 수 없습니다. Plan 모드에서 /thyquery:start <질의>를 다시 호출하세요. 질문·조사·플랜 생성은 수행하지 않았습니다.`
- English: `ThyQuery did not start. Stock Plan mode could not be verified for this session. Re-invoke \`/thyquery:start <query>\` from Plan mode. No question, research, or plan was produced.`

## `ACCEPTED_RESIDUAL`

List each unresolved item, expected plan impact, mitigation, reversibility, and owner. Ask whether the user explicitly accepts that exact current ledger; never describe it as fully resolved.

## `STALLED`

Name the exact repeat, oscillation, unchanged material state, or unproductive cycle and the still-open gaps. Stability alone is not correctness.

## `RESOURCE_EXHAUSTED`

The fixed internal transition limit was reached. Say plainly that reaching it proves nothing about resolved ambiguity or surfaced tacit knowledge, and that no plan handoff occurred.

- Korean: `정해진 내부 전이 한도에 도달했습니다. 이는 모호성 해결이나 암묵지 해소를 입증하지 않습니다. 플랜 핸드오프를 수행하지 않았습니다.`
- English: `The fixed internal transition limit was reached. This proves nothing about resolved ambiguity or surfaced tacit knowledge. No plan handoff was performed.`

## `CANCELLED`

ThyQuery was cancelled. Say that there is no plan handoff and no follow-on work.

- Korean: `ThyQuery를 취소했습니다. 플랜 핸드오프와 후속 작업은 없습니다.`
- English: `ThyQuery is cancelled. No plan handoff and no follow-on work.`

## `BLOCKED`

No admissible action remains for a material gap owned by someone else, most often a user-owned gap the user declined to answer. Name the still-open gap and its owner, say that being stuck is not being finished, and state that no plan handoff is authorized. If a host-authenticated `NOT_APPLIED` handoff outcome caused the block, say that `BLOCKED` is absorbing and can never later be rewritten as applied.

- Korean: `허용되는 다음 조치가 없어 중단했습니다. 남은 공백과 그 소유자는 위에 적었습니다. 막힌 것은 끝난 것이 아니며, 플랜 핸드오프는 수행하지 않았습니다.`
- English: `Stopped: no admissible action remains. The open gap and its owner are stated above. Being stuck is not the same as being finished, and no plan handoff was performed.`

## `STATE_CORRUPT`

State the exact integrity reason and recovery boundary. Do not guess, silently rebuild, or continue.

## `HOST_CAPABILITY_CONTRADICTION`

A contract-required host capability is unavailable in this session. Name the exact missing capability and stop; most concretely, say when the required native structured-question surface is not callable. Do not fabricate a structured choice or use research in place of a user-owned answer, and authorize no plan handoff.

- Korean: `계약에 필요한 호스트 기능을 이 세션에서 쓸 수 없어 중단했습니다. 무엇이 없는지는 위에 적었습니다. 그 자리를 대신할 것을 지어내지 않았고, 플랜 핸드오프도 수행하지 않았습니다.`
- English: `Stopped: a capability the contract requires is not available in this session. What is missing is stated above. Nothing was fabricated in its place, and no plan handoff was performed.`

## `HANDOFF_OUTCOME_UNKNOWN`

Stopped because whether the stock Plan was applied could not be confirmed reliably. Say that no automatic retry follows, because a blind retry risks a duplicate plan.

- Korean: `순정 Plan 적용 여부를 신뢰성 있게 확인할 수 없어 중단했습니다. 중복 플랜 위험 때문에 자동 재시도하지 않습니다.`
- English: `Stopped: whether the stock Plan was applied could not be reliably confirmed. No automatic retry, because that risks a duplicate plan.`

## `COMPLETE_AFTER_PLAN`

One stock Plan was observed. Say that ThyQuery ends here and does not continue into approval, implementation, or execution.

- Korean: `순정 Plan 1개를 확인했습니다. ThyQuery는 여기서 종료하며 승인·구현·실행으로 이어가지 않습니다.`
- English: `One stock Plan was observed. ThyQuery ends here and does not continue into approval, implementation, or execution.`
