# R5 — 철학·대화이론을 ThyQuery의 운용 규칙으로 변환

## 조사 메타데이터

- 조사일: 2026-08-03 (Asia/Seoul)
- 범위: 소크라테스식 문답·아포리아·엘렝코스, 해석학적 순환, 대화적 공동기반과 함축, 암묵지, 성찰적 실천, 지적 겸손, 인식적 부정의, 요구사항 도출, 유도질문·거짓 합의 위험
- 재료 출처: 18/18개. SK@v7의 R5 한도에 도달했고, 설계 결정을 뒤집을 새 독립 기제가 더 이상 나오지 않아 이 범위에서 중단했다.
- 산출물 성격: 읽기 전용 연구 합성. 구현·패키징·설치·호스트 설정 변경을 승인하거나 수행하지 않는다.
- 증거 태그: 각 실질 주장에는 다음 중 하나만 붙인다.
  - `[directly_supported]`: 인용한 자료가 그 자료의 원래 범위 안에서 직접 뒷받침한다.
  - `[contradicts_premise]`: 자료가 ThyQuery의 잠정 전제 또는 강한 표현을 직접 반박한다.
  - `[near_match_only]`: 원 자료의 기제를 플러그인 설계에 유추 적용한 것으로, 제품 효과는 별도 검증이 필요하다.
  - `[insufficient]`: 현 자료만으로 결정하거나 수치화할 수 없다.

## 결론 요약

1. ThyQuery가 찾아야 할 것은 사용자의 마음속에 이미 완성된 “정답 의도”가 아니라, 사용자가 소유·확인한 약속, 반례를 거친 선택, 아직 표현되지 못한 잔여를 포함한 **과업-충분 계약**이다. 소크라테스식 문답은 답을 대신 주입하는 절차가 아니라 답변자의 믿음으로 후보를 만들고 시험하는 절차로 읽는 편이 타당하다. `[near_match_only]`
2. 엘렝코스에서 드러난 모순은 현재 믿음 집합의 국소적 비일관성을 뜻할 뿐, 반대 명제가 참이거나 요구사항이 완전하다는 보증이 아니다. 따라서 `contradictions = 0`은 종료의 필요 가드 후보이지 충분조건이 아니다. `[directly_supported]`
3. 아포리아는 실패도 완료도 아니라 “현재 프레임으로는 답할 수 없음”을 드러내는 중간 상태다. 루프는 이 상태에서 예시·반례·비교·시나리오·프로토타입 같은 다른 표현 수단으로 전환해야 한다. `[near_match_only]`
4. 대화의 함축과 공동기반은 사실로 자동 승격하면 안 된다. 고영향 함축은 취소 가능한 가설로 보존하고, 현재 계획 목적에 충분한지 사용자가 확인해야 한다. `[near_match_only]`
5. Polanyi의 암묵지와 Gadamer의 해석학은 “모든 암묵지와 함의를 완전히 제거하고 최종적으로 투명하게 만든다”는 목표와 양립하지 않는다. 종료조건은 완전 추출이 아니라, 중요 잔여가 확인·거절·명시적 잔여 중 하나로 처리된 **결정-충분성**이어야 한다. `[contradicts_premise]`
6. 선택지는 사용자의 발견을 돕는 가설이어야 한다. 열린 답변을 먼저 허용하고, `해당 없음`, 직접 수정, 보류, 취소를 항상 제공하며, 침묵·피로·반복 동의를 수락으로 간주하지 않아야 한다. `[near_match_only]`
7. 철학 자료만으로 `coverage`, `residual risk`, `stability`, `VOI` 임계값이나 최대 반복 횟수를 보정할 수 없다. R3·R4의 측정 연구와 제품별 실험이 결합돼야 한다. `[insufficient]`

## 1. 목표 개념의 교정

### 1.1 “암묵지 해결”의 운용 정의

Polanyi가 말하는 암묵적 차원은 단순히 아직 질문하지 않은 문장 목록이 아니다. 아는 방식의 일부가 명시적 진술로 환원되지 않는다는 주장이다. 그러므로 플러그인이 암묵지를 전부 텍스트로 추출한다고 약속하면 개념 자체를 잘못 사용한다. `[contradicts_premise]`

ThyQuery에서 “암묵지 해결”은 다음의 더 약하고 검증 가능한 상태로 정의하는 것이 적합하다: **현재 작업 결과를 바꿀 수 있는 암묵적 전제·선호·제약을 가능한 만큼 표면화하고, 표면화되지 않은 중요 잔여는 존재·영향·처리 방식을 기록한다.** `[near_match_only]`

### 1.2 “함의 해결”의 운용 정의

Grice의 대화 함축은 발화의 문자적 내용 밖에서 추론되지만 취소 가능하다. 따라서 모델이 그럴듯하게 추론했다는 사실은 사용자가 그 내용을 약속했다는 뜻이 아니다. `[directly_supported]`

ThyQuery에서 함의는 `IMPLICATURE_HYPOTHESIS`로만 생성하며, 사용자의 명시적 확인 전에는 `EXPLICIT_COMMITMENT`로 승격하지 않는 것이 적합하다. `[near_match_only]`

### 1.3 “모호성 제거”의 운용 정의

Gadamer의 해석학적 순환에서는 부분의 의미가 전체에 의존하고, 전체 이해도 부분을 통해 계속 수정된다. 이해는 상황적·역사적이며 완전히 투명한 종착점이 아니다. `[directly_supported]`

그러므로 ThyQuery의 목표는 모든 가능한 해석을 0으로 만드는 것이 아니라, **현재 계획의 중대한 분기를 바꾸는 해석 차이를 사용자와 함께 해소하거나 잔여 위험으로 명시하는 것**이어야 한다. `[near_match_only]`

## 2. Ralph 루프를 위한 상태 모델

아래 상태는 철학적 개념을 제품 내부의 관찰 가능한 기록 단위로 번역한 후보이며, 철학 문헌이 이 정확한 상태기계를 검증한 것은 아니다. `[near_match_only]`

| 상태 | 운용 의미 | 승격·해제 조건 |
|---|---|---|
| `EXPLICIT_COMMITMENT` | 사용자가 직접 진술하거나 정확한 요약을 확인한 목표·선호·제약 | 원문/사용자 확인 근거를 보존; 추론만으로 생성 금지 |
| `IMPLICATURE_HYPOTHESIS` | 발화 맥락상 가능하지만 취소 가능한 함의 | 확인 시 commitment, 거절 시 rejected, 판단 불가 시 residual |
| `COMMON_GROUND_CANDIDATE` | 양측이 공유한다고 가정하는 배경·용어·사실 | 중요한 항목은 확인 또는 근거 조사 후 사용 |
| `ELENCHUS_CONFLICT` | 사용자 소유 약속들 사이의 모순, 또는 반례와 충돌 | 어느 약속을 수정할지 사용자가 선택하거나 잔여로 수락 |
| `APORIA` | 현 프레임/어휘로 사용자가 선택하기 어려운 상태 | 질문 반복이 아니라 표현 매체·프레임 변경 |
| `FRAME_REVISION` | 부분-전체 재해석 또는 새 사례로 계약 구조가 바뀜 | 변경 내용을 보여 주고 재확인 |
| `TACIT_RESIDUAL` | 완전히 진술되지는 않았지만 결과에 영향을 줄 수 있다고 확인된 요소 | 영향·불확실성·후속 검증/수용 방법 기록 |
| `EPISTEMIC_LIMIT` | 모델·사용자·근거의 지식 한계 | 누가 무엇을 모르는지와 검증 비용 기록 |
| `USER_GROUNDED` | 사용자가 현재 계획 목적에 충분한 이해라고 확인한 상태 | 요약을 수정·거절할 실제 기회를 제공한 뒤에만 성립 |

## 3. 루프 연산자와 질문 정책

### 3.1 한 라운드의 권장 순서

1. **소유 약속 추출:** 사용자 발화의 명시적 목표·제약·성공조건을 원문과 함께 제시한다. 답변자가 자신의 믿음에서 답해야 한다는 엘렝코스의 조건을 제품 규칙으로 옮긴 것이다. `[near_match_only]`
2. **열린 질문 우선:** “어느 것이 맞습니까?”보다 먼저 사용자가 자신의 표현으로 수정·추가할 수 있게 한다. 이후 선택지를 제시하더라도 그것이 가설임을 밝힌다. 유도질문과 거짓 대안 위험을 줄이는 설계 전이다. `[near_match_only]`
3. **부분-전체 재검토:** 새 세부 제약이 전체 목표를 바꾸는지, 바뀐 전체가 기존 세부를 다시 해석하게 하는지 갱신한다. `[near_match_only]`
4. **엘렝코스 테스트:** 동시 만족이 어려운 두 약속, 경계 사례, 실패 사례를 하나씩 제시하고 무엇을 우선할지 묻는다. 모순을 발견했다고 곧바로 정답을 선언하지 않는다. `[near_match_only]`
5. **아포리아 분기:** 사용자가 “모르겠다/둘 다 아니다/설명하기 어렵다”고 하면 동일 질문을 강화하지 않고 사례 비교, 산출물 스케치, 프로토타입, 기존 예시의 수정으로 전환한다. `[near_match_only]`
6. **재료의 반응 수집:** 시나리오·예시·초안이 예상과 다르게 느껴지는 지점을 새 증거로 삼는다. Schön의 `seeing–moving–seeing`을 대화형 계획 구체화에 옮긴 것이다. `[near_match_only]`
7. **함축과 잔여 처리:** 고영향 추론마다 `확인`, `거절`, `잔여로 수락` 중 하나를 기록한다. 확인되지 않은 추론은 계약에 숨겨 넣지 않는다. `[near_match_only]`
8. **목적-상대적 grounding:** 최종 요약을 사용자가 수정할 수 있게 보여 주고, “이 계획을 작성하기에 충분한가”를 확인한다. 완전한 정신상태 일치가 아니라 현재 목적에 충분한 공동 이해를 묻는다. `[near_match_only]`

### 3.2 질문 생성 가드

| 가드 | 금지 또는 요구되는 동작 | 철학·실험 근거의 설계 전이 상태 |
|---|---|---|
| `NO_INFERENCE_AS_COMMITMENT` | 모델 추론을 사용자 확정 요구사항으로 기록하지 않는다. | `[near_match_only]` |
| `NO_CONSISTENCY_EQUALS_TRUTH` | 모순이 사라졌다는 이유만으로 진실·완전성을 선언하지 않는다. | `[directly_supported]` |
| `NO_APORIA_AS_SUCCESS` | 사용자의 당혹·무응답을 “해결됨”으로 표시하지 않는다. | `[near_match_only]` |
| `NO_SILENCE_AS_ACCEPTANCE` | 침묵, 타임아웃, 반복 클릭, 피로 신호를 명시적 수락으로 보지 않는다. | `[near_match_only]` |
| `NO_FULL_TACIT_EXTRACTION` | 암묵지가 모두 언어화됐다고 주장하지 않는다. | `[contradicts_premise]` |
| `NO_FALSE_CONSENSUS` | AI가 만든 후보를 “대부분의 사용자가 원하는 것”처럼 제시하지 않는다. | `[near_match_only]` |
| `OPEN_FIRST` | 중요한 선호는 자유 응답을 먼저 받고, 선택지는 탐색 보조로 제시한다. | `[near_match_only]` |
| `NONLEADING_CHOICES` | 균형 잡힌 표현, `해당 없음`, 직접 수정, 보류·취소를 제공한다. | `[near_match_only]` |
| `USER_FRAME_AUTHORITY` | 사용자가 문제 프레임과 자신의 선호에 관한 최종 수정권을 가진다. | `[near_match_only]` |
| `LEAST_COLLABORATIVE_EFFORT` | 정보가치가 낮은 질문을 반복하지 않고 사용자와 시스템의 총 협업 비용을 제한한다. | `[near_match_only]` |
| `RESIDUAL_LEDGER_REQUIRED` | 해소되지 않은 고영향 모호성·암묵지는 잔여 목록과 영향으로 인계한다. | `[near_match_only]` |

### 3.3 선택지 도구 사용 원칙

선택지의 개수는 고정 `top 3` 철학에서 나오지 않는다. 후보 수는 상호 배타성, 인지 부담, 조사 근거, 자유 입력 가능성에 따라 조절해야 하며, 현 R5 자료만으로 최적 개수를 정할 수 없다. `[insufficient]`

선택지 도구를 사용할 때 각 후보는 다음을 포함하는 것이 적합하다: `(a)` 무엇을 뜻하는지, `(b)` 계획이 어떻게 달라지는지, `(c)` 근거/불확실성, `(d)` 사용자가 수정하거나 거절할 경로. `[near_match_only]`

“추천” 표시는 객관적 최선, 다수의 합의, 사용자의 내심을 뜻하지 않는다. 추천 근거가 비용·위험·관행·벤치마크 중 무엇인지 분리해서 밝혀야 한다. `[near_match_only]`

## 4. 철학적 종료 가드

### 4.1 제안식

다음은 최종 종료식이 아니라, R3·R4의 정량 종료조건 앞에 놓을 **필수 철학 가드 후보**다. 이 식의 구성은 문헌 기제를 제품 상태로 번역한 것이며 아직 제품 실험으로 검증되지 않았다. `[near_match_only]`

```text
PHILOSOPHICAL_CLOSURE_GUARD(t) :=
  no_material_conflict(user_endorsed_commitments_t)
  AND every_high_impact_implicature_t IN
      {explicitly_confirmed, explicitly_rejected, explicitly_residualized}
  AND grounding_for_current_plan_purpose_t = user_confirmed
  AND counterexample_or_scenario_probe_completed_t = true
  AND no_unaccepted_frame_revision_t = true
  AND user_agency_guard_t = true
  AND epistemic_limits_and_tacit_residuals_recorded_t = true
```

`user_confirmed`는 단순 클릭이 아니라 요약을 보고 수정·거절·보류할 기회가 있었음을 포함해야 한다. Clark와 Brennan의 grounding은 현재 목적에 충분한 상호 이해를 요구하지만, 사용자와 모델의 정신상태가 동일함을 보증하지 않는다. `[near_match_only]`

`counterexample_or_scenario_probe_completed`는 적어도 하나의 중대한 경계 사례나 산출물 예시가 계약을 흔드는지 시험했음을 뜻한다. 이것이 실제 품질을 얼마나 높이는지는 ThyQuery 실험이 필요하다. `[insufficient]`

### 4.2 전체 종료식과의 결합

SK@v7의 잠정 종료 구조와 결합하면 철학 연구가 직접 제약할 수 있는 부분은 `contradictions = 0`, `acceptance = true`, 고영향 잔여의 명시, 프레임 변경의 사용자 수락이다. `[near_match_only]`

```text
STOP_t :=
  PHILOSOPHICAL_CLOSURE_GUARD(t)
  AND coverage_t >= tau_c
  AND residual_risk_t <= tau_r
  AND contract_delta_(t-k:t) <= epsilon
  AND max_net_VOI(next_action) <= 0
```

철학·대화이론은 `tau_c`, `tau_r`, `k`, `epsilon`, 질문 비용, `net_VOI`의 수치를 제공하지 않는다. 이 값들은 위험등급별 벤치마크, 실제 사용자 교정률, 재개율, 계획 변경률, 질문 피로 데이터를 통해 보정해야 한다. `[insufficient]`

### 4.3 종료·중단·차단을 분리

- **Resolved stop:** 철학 가드와 정량 가드를 모두 통과하고 사용자가 현재 목적에 충분하다고 확인한다. 이 명칭과 상태 구분은 설계 제안이다. `[near_match_only]`
- **Accepted-residual stop:** 고영향 잔여가 있지만 사용자에게 영향이 공개됐고, 사용자가 잔여를 안고 순정 Plan으로 진행하기로 선택한다. 완전한 모호성 해결로 기록하면 안 된다. `[near_match_only]`
- **Blocked:** 필요한 사실·권한·자료가 없거나 중대한 모순을 사용자가 아직 결정하지 않았고, 다음 질문의 순정보가치가 양수가 아니어서 안전하게 계획할 수 없다. 차단 임계값 자체는 현 자료로 보정되지 않았다. `[insufficient]`
- **Cancelled:** 사용자가 루프를 중단한다. 취소는 실패한 동의나 암묵적 수락이 아니다. `[near_match_only]`

## 5. 사용자 주권과 윤리 위험

| 위험 | 실패 양상 | 필요한 완화책 | 증거 상태 |
|---|---|---|---|
| 유도질문 | 선호를 찾는 대신 질문 문구가 선호를 만든다. | 열린 질문 우선, 중립 문구, `해당 없음`, 자유 수정, 선택 순서 편향 점검 | `[near_match_only]` |
| 거짓 대안 | AI가 만든 선택지만 가능한 세계처럼 보인다. | “후보일 뿐”을 표시하고 사용자 프레임 추가·거절 허용 | `[near_match_only]` |
| 반복을 통한 압박 | 같은 질문을 바꿔 묻다가 피로 동의를 얻는다. | 거절된 프레임 재질문 금지, 정체 시 요약·잔여 수락·취소 제공 | `[near_match_only]` |
| 거짓 합의 | 모델의 기본값을 사회적 합의나 사용자 내심으로 오인한다. | 다수 주장에는 별도 근거 요구, 추천 이유와 불확실성 공개 | `[near_match_only]` |
| 인식적 가부장주의 | 사용자의 자기보고·선호를 모델이 “진짜 의도”로 덮어쓴다. | 자기 선호에는 사용자 수정권 우선; 세계 사실과 자기보고를 구분 | `[near_match_only]` |
| 해석 자원의 격차 | 사용자가 표현할 어휘가 없다는 이유로 요구가 무시된다. | 예시·비유·부정 사례·산출물 수정 등 복수 표현 수단 제공 | `[near_match_only]` |
| 허위 종결 | 친절한 동의나 선택지 클릭을 충분한 grounding으로 본다. | 역요약, 수정 기회, 고영향 항목별 확인, 잔여 목록 제시 | `[near_match_only]` |
| 과도한 내면 추론 | 제품이 성향·감정·숨은 동기를 불필요하게 추정한다. | 현재 작업에 필요한 최소 정보만 질문하고 심리 진단성 표현 금지 | `[near_match_only]` |
| 아포리아의 수치화 | “모르겠다”를 사용자 결함처럼 표현한다. | 사람 대신 계약·프레임의 미결 상태로 중립적으로 표시 | `[near_match_only]` |
| 무한 루프 | 정보가치가 없는 질문도 “완전 해결” 명목으로 계속한다. | 협업 총비용, 잔여 수락, 차단·취소 경로를 종료 상태로 포함 | `[near_match_only]` |

Fricker의 인식적 부정의는 사회적 권력과 편견의 맥락을 다루므로 ThyQuery를 곧바로 “인식적 부정의 시스템”이라고 진단할 수는 없다. 다만 사용자의 증언을 부당하게 감점하거나 표현 자원 부족을 사용자 무능력으로 처리하지 말라는 윤리 가드로의 전이는 유용하다. `[near_match_only]`

## 6. 근거 원장 — 18개 재료 출처

### S01. Plato, *Theaetetus* 150b–d

- 원문/번역: Fowler 번역(1921), Perseus, [150쪽·150b–d](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0172%3Atext%3DTheaet.%3Apage%3D150), 접근 2026-08-03.
- Socrates는 자신이 지혜를 넣어 주는 사람이 아니라 상대가 낳은 생각이 참인지 허상인지 시험하는 산파로 자신을 묘사한다. `[directly_supported]`
- ThyQuery 전이: AI가 숨은 답을 소유한다고 가정하지 말고 사용자 소유 후보를 표면화·시험한다. `[near_match_only]`

### S02. Plato, *Meno* 80a–e, 86c

- 원문/번역: Lamb 번역(1967), Perseus, [80a–e](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0178%3Atext%3DMeno%3Apage%3D80), [86c](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0178%3Atext%3DMeno%3Asection%3D86c), 접근 2026-08-03.
- Meno의 당혹은 탐구 불가능성 문제를 만들고, Socrates는 자신의 의심을 인정한 뒤 함께 탐구하자고 제안한다. `[directly_supported]`
- ThyQuery 전이: 아포리아는 해결 완료가 아니라 공동 탐구와 프레임 전환을 요구하는 상태다. `[near_match_only]`

### S03. Paul Woodruff, “Plato’s Shorter Ethical Works,” SEP §2–3

- 자료: Stanford Encyclopedia of Philosophy, [§2 Elenchus 및 §3 Socratic Definition](https://plato.stanford.edu/entries/plato-ethics-shorter/), 접근 2026-08-03.
- 엘렝코스의 답변자는 자기 믿음으로 답하고 결과 판단에 참여하며, 믿음 집합의 모순만으로 단일 명제의 거짓이 곧바로 확정되는지는 철학적 문제로 남는다. `[directly_supported]`
- ThyQuery 전이: 사용자 소유성, 일반성·배제·설명력 테스트, `consistency ≠ truth` 가드를 둔다. `[near_match_only]`

### S04. Gregory Vlastos, “The Socratic Elenchus” (1983)

- 자료: *Oxford Studies in Ancient Philosophy* 1, 27–58, 특히 30쪽의 표준 엘렝코스 규정. [PhilPapers 서지](https://philpapers.org/rec/VLATSE-3), 접근 2026-08-03.
- 표준 엘렝코스는 답변자가 소유한 명제와 추가 믿음들에서 그 명제의 부정을 도출하는 대립적 진리 탐구로 제시된다. `[directly_supported]`
- 이 구조만으로 어떤 요구사항이 참인지, 완전한지, 실행 가능한지 보장한다고 볼 수는 없다. `[insufficient]`

### S05. André M. Archie, “The Anatomy of a Dialogue” (2010)

- 자료: *Journal of Philosophical Research* 35, 129–146, DOI 10.5840/jpr_2010_10. [출판사 초록](https://www.pdcnet.org/jpr/content/jpr_2010_0035_0129_0146), 접근 2026-08-03.
- 논문은 엘렝코스가 참여자의 자율성을 전제하고 질문이 대화 상대의 목표·포부와 관련돼야 한다고 논증한다. `[directly_supported]`
- ThyQuery 전이: 질문의 목적·영향을 공개하고 사용자가 문제 프레임과 답변 경로를 통제하게 한다. `[near_match_only]`

### S06. SEP, “Hans-Georg Gadamer” §2.1–2.2, §3.1–3.3

- 자료: Stanford Encyclopedia of Philosophy, [Hans-Georg Gadamer](https://plato.stanford.edu/entries/gadamer/), 접근 2026-08-03.
- 이해는 부분과 전체의 순환, 수정 가능한 선판단, 대화 속 지평의 변화로 설명되며 최종적이고 완전히 투명한 이해를 보증하는 방법으로 제시되지 않는다. `[directly_supported]`
- “Ralph loop가 사용자의 모든 함의를 완전히 제거한 뒤 종결한다”는 강한 전제는 이 설명과 충돌한다. `[contradicts_premise]`

### S07. H. P. Grice, “Logic and Conversation” (1975)

- 자료: *Syntax and Semantics* 3, 41–58, DOI 10.1163/9789004368811_003. [출판사 서지](https://brill.com/abstract/book/edcoll/9789004368811/BP000003.xml), [원문 PDF 사본](https://lawandlogic.org/wp-content/uploads/2018/07/grice1975logic-and-conversation.pdf), 특히 45–47쪽과 57–58쪽, 접근 2026-08-03.
- 대화 함축은 협력적 대화 추론에서 생기며 취소 가능성을 갖는다. `[directly_supported]`
- ThyQuery 전이: 함축 후보는 명시 확인 전까지 확정 요구사항과 분리한다. `[near_match_only]`

### S08. Robert Stalnaker, “Common Ground” (2002)

- 자료: *Linguistics and Philosophy* 25, 701–721, DOI 10.1023/A:1020867916902. [저자 배포 PDF](https://semantics.uchicago.edu/kennedy/classes/f09/semprag1/stalnaker02.pdf), 특히 701쪽, 접근 2026-08-03.
- 공동기반은 참여자들이 배경으로 공유한다고 전제하거나 그렇게 행동하는 공적·사회적 태도이며 대화 속에서 변한다. `[directly_supported]`
- ThyQuery 전이: “공유됐다고 추정한 것”과 “사실이거나 사용자가 확인한 것”을 별도 상태로 둔다. `[near_match_only]`

### S09. Herbert H. Clark & Susan E. Brennan, “Grounding in Communication” (1991)

- 자료: *Perspectives on Socially Shared Cognition*, 127–149, DOI 10.1037/10096-006. [저자 배포 PDF](https://web.stanford.edu/~clark/1990s/Clark%2C%20H.H.%20_%20Brennan%2C%20S.E.%20_Grounding%20in%20communication_%201991.pdf), 특히 129쪽, 134–135쪽, 147쪽, 접근 2026-08-03.
- 공동행위의 grounding 기준은 현재 목적에 충분한 수준으로 이해됐다는 상호 믿음이며, 참여자의 총 협업 노력을 함께 고려한다. `[directly_supported]`
- ThyQuery 전이: 종료는 완전 이해가 아니라 계획 목적에 충분한 사용자 확인과 최소 협업 비용을 요구한다. `[near_match_only]`

### S10. Michael Polanyi, *The Tacit Dimension* (1966/2009)

- 자료: University of Chicago Press 재판, 1장 “Tacit Knowing”, 특히 4쪽. [출판사 페이지](https://press.uchicago.edu/ucp/books/book/chicago/T/bo6035368.html), 접근 2026-08-03.
- Polanyi는 인간의 앎이 명시적으로 말할 수 있는 내용보다 넓고 개인적·암묵적 차원을 가진다고 주장한다. `[directly_supported]`
- “플러그인이 암묵지를 전부 명시 지식으로 추출한다”는 제품 전제는 이 개념과 충돌한다. `[contradicts_premise]`

### S11. Donald A. Schön, “Designing as Reflective Conversation with the Materials of a Design Situation” (1992)

- 자료: *Knowledge-Based Systems* 5(1), 3–14, DOI 10.1016/0950-7051(92)90020-G. [출판사 페이지](https://www.sciencedirect.com/science/article/pii/095070519290020G), 접근 2026-08-03.
- 설계자는 보고–움직이고–다시 보는 실험 속에서 의도치 않은 결과와 재료의 반응을 만나며 설계 의도 자체를 진화시킨다. `[directly_supported]`
- ThyQuery 전이: 언어적 자기비평만 반복하지 말고 시나리오·예시·프로토타입의 반응으로 프레임을 시험한다. `[near_match_only]`

### S12. Whitcomb, Battaly, Baehr & Howard-Snyder, “Intellectual Humility: Owning Our Limitations” (2017)

- 자료: *Philosophy and Phenomenological Research* 94(3), 509–539, DOI 10.1111/phpr.12228. [저자 아카이브](https://philarchive.org/archive/WHIIHO-3v3), 접근 2026-08-03.
- 지적 겸손은 자신의 지적 한계에 적절히 주의를 기울이고 그것을 소유하는 태도로 제시되며, 무시와 과도한 집착 사이의 적절성을 포함한다. `[directly_supported]`
- ThyQuery 전이: 모델의 한계 원장을 두되, “더 알아야 한다”는 명목으로 모든 불확실성에 집착해 질문을 무한히 늘리지 않는다. `[near_match_only]`

### S13. Miranda Fricker, *Epistemic Injustice* (2007)

- 자료: Oxford University Press, [서론](https://academic.oup.com/book/32817/chapter-abstract/274999524), [1장 9–29쪽](https://academic.oup.com/book/32817/chapter-abstract/274999720), 접근 2026-08-03.
- 증언적 부정의는 편견으로 인한 신뢰성 결손을, 해석학적 부정의는 집단적 해석 자원의 공백으로 경험을 이해하기 어려운 불이익을 다룬다. `[directly_supported]`
- ThyQuery 전이: 사용자의 자기보고를 부당하게 무시하지 말고, 표현 어휘가 부족할 때 복수의 표현 수단을 제공한다. `[near_match_only]`

### S14. Alistair Sutcliffe & Peter Sawyer, “Requirements Elicitation: Towards the Unknown Unknowns” (2013)

- 자료: IEEE RE 2013, 92–104, DOI 10.1109/RE.2013.6636709. [기관 저장소 서지·초록](https://research.aston.ac.uk/en/publications/requirements-elicitation-towards-the-unknown-unknowns/), 접근 2026-08-03.
- 요구사항 도출에서 알려진 정도와 공동기반을 구분하고 인터뷰·시나리오·프로토타입을 사용해 미지의 요구를 탐색하지만, unknown unknowns는 가장 어려운 범주로 남는다. `[directly_supported]`
- 모든 미지의 미지를 루프로 제거할 수 있다는 보장은 이 연구에서 나오지 않는다. `[insufficient]`

### S15. Vincenzo Gervasi et al., “Unpacking Tacit Knowledge for Requirements Engineering” (2013)

- 자료: *Managing Requirements Knowledge*, 23–47, DOI 10.1007/978-3-642-34419-0_2. [기관 저장소 서지·초록](https://research.aston.ac.uk/en/publications/unpacking-tacit-knowledge-for-requirements-engineering/), 접근 2026-08-03.
- 암묵지는 공동 이해가 있을 때 소통을 경제적으로 만들지만 배경이 다른 참여자 사이에서는 오해와 소프트웨어 불일치를 만들 수 있다. `[directly_supported]`
- ThyQuery 전이: 모든 배경을 설명시키기보다 결과를 바꾸는 공동기반 차이를 우선 탐색한다. `[near_match_only]`

### S16. Mitzi G. Pitts & Glenn J. Browne, “Improving Requirements Elicitation: an empirical investigation of procedural prompts” (2007)

- 자료: *Information Systems Journal* 17(1), 89–110, DOI 10.1111/j.1365-2575.2006.00240.x. [출판사 초록](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1365-2575.2006.00240.x), 접근 2026-08-03.
- 연구의 인간 분석가 실험에서는 절차적 프롬프트가 단순 의문형 프롬프트보다 추가적인 의미 있는 요구사항 도출에 유리했다. `[directly_supported]`
- 이 결과가 LLM 플러그인의 적응형 질문에도 동일하게 나타나는지는 별도 비교 실험이 필요하다. `[insufficient]`

### S17. Lee Ross, David Greene & Pamela House, “The ‘false consensus effect’” (1977)

- 자료: *Journal of Experimental Social Psychology* 13(3), 279–301, DOI 10.1016/0022-1031(77)90049-X. [출판사 페이지](https://www.sciencedirect.com/science/article/pii/002210317790049X), 접근 2026-08-03.
- 네 연구에서 참가자들은 자신의 행동 선택과 판단이 다른 사람에게도 얼마나 흔한지 과대평가하는 경향을 보였다. `[directly_supported]`
- 인간의 거짓 합의 효과를 LLM이 만든 후보 순위에 그대로 동일시할 수는 없지만, AI 기본값을 사회적 합의로 포장하지 말아야 한다는 위험 가드에는 유사성이 있다. `[near_match_only]`

### S18. Vanja Erčulj & Ajda Šulc, “Swayed by leading questions” (2024/2025)

- 자료: *Quality & Quantity* 59, 191–209, DOI 10.1007/s11135-024-01934-6. [오픈 액세스 논문](https://link.springer.com/article/10.1007/s11135-024-01934-6), 접근 2026-08-03.
- 슬로베니아 성인 613명의 소수집단 태도 온라인 설문에서 부정적 유도 문구가 응답에 영향을 주었고, 저자 분류상 suggestible 27%와 contra-suggestible 38%를 합친 susceptibility는 65%였지만 이 수치는 해당 설계·주제·표본에 한정된다. `[directly_supported]`
- 이 효과크기를 ThyQuery 임계값으로 이식할 근거는 없으나, 닫힌 거짓 대안·전제 포함 질문·편향된 문구를 제품 실험에서 점검할 근거는 된다. `[near_match_only]`

## 7. 전이 금지선

- 소크라테스 문헌은 철학적·교육적 대화 연구이지 AI 플러그인 성능 벤치마크가 아니다. `[directly_supported]`
- 엘렝코스는 추가 전제가 참이라는 보증 없이 믿음 집합의 모순만 보여 줄 수 있으므로, 반대 선택지가 참이라고 자동 결론내리면 안 된다. `[directly_supported]`
- 아포리아를 “사용자가 충분히 생각했다”는 완료 지표로 사용할 근거는 없다. `[insufficient]`
- 해석학적 순환은 수치적 수렴 알고리즘이나 반복 횟수 공식을 제공하지 않는다. `[insufficient]`
- Polanyi의 암묵지는 “숨은 텍스트 슬롯”과 동일하지 않으며 완전 명시화 약속을 정당화하지 않는다. `[contradicts_premise]`
- 공동기반은 공유된 것으로 취급하는 태도이지, 참여자 머릿속의 사실적 동일성을 측정한 값이 아니다. `[directly_supported]`
- Grice의 협력 원리는 인간의 대화 추론에 관한 분석이며 LLM의 추론 정확도 보증이 아니다. `[directly_supported]`
- Schön의 연구는 주로 설계 실천 맥락이므로 모든 질의 유형에 같은 probe가 유효하다고 볼 수 없다. `[insufficient]`
- 요구사항 도출 실험은 인간 분석가와 이해관계자 맥락이므로 Codex·Claude Code에서 효과를 다시 검증해야 한다. `[insufficient]`
- 거짓 합의 연구는 인간 판단 연구이며 AI 선택지 생성의 편향 정도를 직접 측정하지 않는다. `[insufficient]`
- S18의 65%는 특정 국가·주제·설문 방식의 맥락값이므로 제품의 안전 임계치로 사용하면 안 된다. `[directly_supported]`
- Fricker의 개념은 사회적 권력과 편견에 관한 규범적 분석이다. 제품 가드로 참고할 수 있지만 개별 상호작용을 임상적·도덕적으로 진단하는 도구가 아니다. `[near_match_only]`

## 8. DS@v1에 넘길 설계 결정 후보

1. 제품 표현을 “암묵지 완전 해결”에서 “결정에 중요한 암묵 전제의 표면화와 잔여 명시”로 교정한다. `[contradicts_premise]`
2. 계약 필드의 출처를 `user_explicit`, `user_confirmed`, `model_inferred`, `evidence_derived`, `residual`로 구분하고 `model_inferred`는 확인 전 계획 확정값으로 쓰지 않는다. `[near_match_only]`
3. Ralph 라운드는 `open elicitation → implicature/common-ground ledger → counterexample/scenario probe → frame revision → user grounding`의 최소 골격을 가진다. `[near_match_only]`
4. `PHILOSOPHICAL_CLOSURE_GUARD`를 R3·R4 종료식의 필요 가드로 결합하되 단독 충분조건이나 수치 임계값으로 취급하지 않는다. `[near_match_only]`
5. 순정 선택지 도구는 고정 top-3가 아니라 상황별 후보를 제공하고, 자유입력·해당없음·수정·보류·취소를 보존한다. 후보 수의 최적값은 실험 전 미정으로 둔다. `[insufficient]`
6. `resolved`, `accepted_residual`, `blocked`, `cancelled`를 구분하고, 피로·침묵·타임아웃은 어떤 경우에도 `resolved`로 승격하지 않는다. `[near_match_only]`
7. 최종 인계물에는 사용자 확인 계약뿐 아니라 `tacit_residuals`, `epistemic_limits`, `rejected_inferences`, `unresolved_conflicts`를 포함해 순정 planner가 불확실성을 사실처럼 소비하지 않게 한다. `[near_match_only]`

## 9. 미해결 질문과 검증 요구

- 어떤 중요도부터 함축을 사용자에게 재확인할지, 위험 등급별 질문 예산을 어떻게 둘지는 R5에서 정할 수 없다. `[insufficient]`
- “열린 질문 우선”이 실제 Codex·Claude Code 작업에서 교정률을 높이고 사용자 부담을 낮추는지 A/B 또는 교차 설계 검증이 필요하다. `[insufficient]`
- 반례·시나리오 probe가 계획 변경률, 사후 재개율, 구현 중 요구 변경을 얼마나 줄이는지 측정 자료가 없다. `[insufficient]`
- 순정 호스트의 선택지 도구가 자유 입력·취소·모드 전환 상태를 어떤 방식으로 보존하는지는 R1·R2의 현재 공식 문서/실행 검증에 의존한다. `[insufficient]`
- 사용자 확인을 받았더라도 사회적 바람직성, 권위 편향, 피로 동의가 남을 수 있으므로 “확인됨”의 품질을 평가할 제품 지표가 필요하다. `[insufficient]`
- 철학 가드 통과 후 순정 planner가 잔여·한계 메타데이터를 실제로 보존하는지 두 호스트별 계약 테스트가 필요하다. `[insufficient]`

## 최종 판정

R5의 가장 강한 결론은 “더 오래 질문하면 사용자의 완전한 암묵 의도에 도달한다”가 아니다. 오히려 문헌은 그 강한 전제를 반박하며, 정당한 종결을 **사용자가 소유한 약속의 국소 정합성, 고영향 함축의 명시적 처리, 현재 목적에 충분한 grounding, 반례/산출물에 의한 프레임 시험, 사용자 주권, 그리고 남은 암묵지·인식 한계의 공개**로 제한하도록 요구한다. `[contradicts_premise]`

이 철학 가드는 종료조건의 규범적 구조는 제공하지만 수치 보정이나 제품 효과를 제공하지 않는다. 따라서 DS@v1에서는 R3·R4의 실증 종료조건과 결합하고, 두 호스트에서 별도로 검증될 때까지 제품 성능 주장은 보류해야 한다. `[insufficient]`
