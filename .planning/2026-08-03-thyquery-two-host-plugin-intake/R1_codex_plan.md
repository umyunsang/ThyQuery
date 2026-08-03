# R1 — Codex forced Plan composition

## Research receipt

- Lane: R1 — Codex forced Plan composition
- Governing artifact: `SK@v7`, SHA-256 `d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56`
- Research date: 2026-08-03 (Asia/Seoul)
- Local runtime: Codex CLI `0.146.0`, macOS 26.5 (25F71)
- Codex executable: `/opt/homebrew/Caskroom/codex/0.146.0/bin/codex`
- Executable SHA-256: `ae1d3ffe6d48aec6a4dc3f50e7eb8e0d11962485a6a9406c5a7012139383da02`
- Mutation boundary: read-only local help/schema inspection and ephemeral, read-only app-server probes only; no project code, plugin, configuration, installation, or packaging was created or changed
- Source boundary: bounded local runtime evidence plus official OpenAI documentation and the official OpenAI Codex repository

## Executive verdict

**Codex 0.146.0 has an official host-client mechanism that can start one turn directly in stock Plan mode, but the current standard skill/plugin surface cannot invoke that mechanism after the user has entered `$thyquery <query>`.** The app-server client may include `collaborationMode.mode = "plan"` in the same `turn/start` request that contains the original query and explicit skill input. A live ephemeral probe confirmed that this ordering activates Plan instructions before the turn starts, enables native `requestUserInput`, and emits a native `plan` item in that same turn.

That capability belongs to the **client/host integration boundary**, not to a skill or plugin executing inside an already-started turn. Explicit `$skill` invocation is turn input. By the time the skill runs, the client has already selected the turn's collaboration mode. The official skill/plugin metadata, hook outputs, `turn/steer`, and `thread/resume` schemas expose no field that lets an invoked skill mutate the current turn to Plan or transparently replace it with one Plan turn while retaining a single invocation identity.

Therefore the SK@v7 no-exception contract receives this current verdict:

> **`HOST_UNSUPPORTED` for a standard thin Codex plugin invoked as `$thyquery <query>` from Default mode.**

This verdict is narrowly scoped. It does not mean Codex lacks Plan mode or that ThyQuery cannot run when Plan is already active. It means the required automatic transition is not plugin-callable on the inspected current host. A custom app-server client could perform the atomic composition, but SK@v7 expressly excludes an external/client wrapper presented as a compliant thin plugin. Manual `/plan`, a second invocation, or prose questions are also prohibited fallbacks.

## Capability boundary in one view

| Question | Current answer | Evidence tag | SK@v7 consequence |
|---|---|---|---|
| Does current Codex expose stock Default and Plan collaboration modes? | Yes. The live `collaborationMode/list` response contained exactly `default` and `plan`. | `directly_supported` | There is a real stock Plan target. |
| Can a host client start a turn in Plan mode? | Yes. `turn/start.collaborationMode` is an official app-server field and the live probe activated Plan before `turn/started`. | `directly_supported` | Atomic composition is technically available to a client that owns turn submission. |
| Is `$thyquery <query>` valid explicit skill syntax? | Yes for Codex skill invocation: official docs prescribe `$<skill-name>` in user text; app-server additionally supports a typed `skill` input item. | `directly_supported` | The desired spelling can select a skill named `thyquery`. |
| Can that invoked skill/plugin force its already-started Default turn into Plan? | No supported skill/plugin-callable transition was found in the closed schemas and documented extension outputs; mode is selected before skill execution. | `contradicts_premise` | Required Default-to-Plan behavior cannot be claimed for a standard plugin. |
| Can a prompt hook rewrite the current turn's mode? | No documented hook output has a mode or re-dispatch field. `UserPromptSubmit` may block or add context only, and receives the already-effective permission mode. | `contradicts_premise` | A plugin hook cannot repair the boundary. |
| Is native structured questioning available after a client-selected Plan transition? | Yes in the live probe. `item/tool/requestUserInput` was emitted and answered successfully. Default-mode use was separately rejected. | `directly_supported` | The Ralph elicitation layer is viable after verified Plan entry. |
| Is there a distinct plugin API that invokes an unchanged “stock planner”? | No such separate planner call is documented. Stock Plan behavior is supplied by built-in collaboration-mode instructions; completion is rendered as a native `plan` item. | `insufficient` | Handoff can be semantic inside Plan, but exclusive stock authorship cannot be proven from a separate planner invocation. |
| Can native plan provenance be observed? | Partly. Active `plan` settings plus native `item.type = "plan"` are observable. They do not cryptographically separate built-in-plan influence from skill instructions seen by the same model. | `insufficient` | Native surface provenance is testable; strict exclusive `PLAN_PROVENANCE = STOCK_HOST` is not fully attestable. |

## Current Codex modes and extension surfaces

### Collaboration modes

The local app-server `collaborationMode/list` probe returned two built-in modes:

| Display name | Protocol mode | Probe settings |
|---|---|---|
| Default | `default` | stock default collaboration mode |
| Plan | `plan` | stock Plan collaboration mode; reasoning effort reported as `medium` by the listing |

The generated v2 protocol schema likewise closes `ModeKind` to the enum `plan | default`. No third current collaboration mode is asserted by this R1 result. Feature output marks the older `collaboration_modes` feature flag as removed; that does not remove the protocol's two built-in mode values.

### Relevant surfaces

| Surface | Explicit `$thyquery` skill selection | Who can select Plan for a new turn? | Standard plugin can force current Default turn? | R1 status |
|---|---|---|---|---|
| Codex CLI composer | Official skills docs support `$<skill-name>`; `/plan` is a separate built-in composer command. | User/client before submission through `/plan`; no inspected CLI flag exposes per-turn collaboration mode. | No supported path. | Default start: incompatible; already-Plan start: viable pre-layer. |
| Codex Desktop/app client | Plugins are an official Codex app surface; the underlying host client can submit turn settings. | Host client, before the turn begins. | No plugin-owned transition API was found. | Would require a product/client change, not merely the plugin bundle. |
| Codex IDE skill surface | Official skills docs support explicit `$` invocation; official plugin docs do not claim the full plugin bundle surface for the IDE extension. | Host UI/client if it exposes Plan before submission. | No supported skill-owned path. | Skill syntax is supported; plugin parity and forced entry are not established. |
| Codex app-server integration | Text plus a typed `{type:"skill", name, path}` input can explicitly invoke a skill; `turn/start` accepts `collaborationMode`. | The app-server **client** on `turn/start`. | Not from the executing skill; yes only if the custom client composes the request first. | Technically sufficient as a custom host integration, out of scope as a standard thin plugin. |

The surface distinction is material: an official API can exist without being callable by the plugin whose feasibility is under review.

## Exact invocation syntax

OpenAI's current skills documentation says a user can explicitly invoke a skill by typing `$` and selecting it, and illustrates the form `$skill-creator`. The app-server documentation recommends including `$<skill-name>` in the input text and, when a client knows the skill, adding the adjacent typed input item:

```json
[
  {"type": "text", "text": "$thyquery <final-user-query>"},
  {"type": "skill", "name": "thyquery", "path": "/installed/path/to/thyquery/SKILL.md"}
]
```

This supports the requested visible spelling, subject to the skill actually being installed and named `thyquery`. It does **not** make `$thyquery` a composer command equivalent to `/plan`. `$thyquery` selects skill instructions for a model turn; `/plan` is a stock composer/client command that changes how a turn is submitted.

Official `agents/openai.yaml` skill metadata provides interface labels, invocation policy, and dependency declarations. The documented invocation policy can disable implicit invocation while keeping explicit `$skill` invocation. No documented metadata key requires or changes collaboration mode.

## Local protocol and runtime evidence

### Closed protocol fields

The local `codex app-server generate-json-schema` v2 output was inspected in a temporary directory and then removed. The relevant closed request shapes were:

- `TurnStartParams`: required `threadId` and `input`; optional `collaborationMode` with the description that it sets a preset collaboration mode and takes precedence over model, reasoning effort, and developer instructions for that turn.
- `CollaborationMode`: `{ mode, settings }`, where `mode` is `plan` or `default` and settings include the model and optional reasoning/developer-instruction values.
- `TurnSteerParams`: only `threadId`, optional `expectedTurnId`, and `input`; it has no collaboration-mode override.
- `ThreadResumeParams`: no collaboration-mode field.
- Server-to-client requests include approvals, dynamic tool calls, and `item/tool/requestUserInput`; there is no server request asking the client to change collaboration mode.
- User input supports a typed `skill` item, which loads the skill as turn input rather than granting client-control authority to it.

This field placement establishes the ordering boundary: the client selects mode while constructing `turn/start`; the selected skill executes only after that request has begun.

### Live Plan-composition probe

An ephemeral thread was started through the local app-server with a read-only sandbox and `approvalPolicy = never`. One `turn/start` carried the original probe prompt and:

```json
{
  "collaborationMode": {
    "mode": "plan",
    "settings": {
      "model": "gpt-5.6-terra",
      "reasoning_effort": "low",
      "developer_instructions": null
    }
  }
}
```

Observed event order and outcome:

1. `thread/settings/updated` reported `collaborationMode.mode = "plan"` and the built-in Plan instructions.
2. `turn/started` followed.
3. The model emitted `item/tool/requestUserInput` with two structured options.
4. The client answered the native request with `Alpha`.
5. The same turn emitted `item.type = "plan"`, `item/plan/delta`, and the completed native plan text `1. Proceed with Alpha.`
6. `turn/completed` followed.

The probe confirms all of the following in its exact scope:

- a client-owned `turn/start` can activate stock Plan before model execution;
- the native structured-question protocol is callable after that activation;
- the answer can resume the same turn;
- the host emits a native plan item, not merely ordinary assistant text;
- the operation can remain one turn and one ephemeral thread.

It does not prove that an installed skill can cause the client to add the field. The probe deliberately exercised the app-server client boundary directly.

### Default-mode control

In the current Default-mode Codex task, a real native structured-choice call failed with the exact runtime result:

```text
request_user_input is unavailable in Default mode
```

This is a useful negative control for the current runtime. Tool presence in a registry is not sufficient; effective Plan mode must be established before the Ralph loop relies on the question surface.

## Transition candidates

### A1 — standard plugin attempts same-session mutation after `$thyquery`

```text
User submits "$thyquery Q" while Default is active
  -> client sends turn/start using Default settings
  -> server starts the turn
  -> skill input is loaded and ThyQuery instructions run
  -> ThyQuery needs requestUserInput
  -> Default-mode gate rejects it
  -> no model-callable collaboration-mode transition exists
  -> HOST_CAPABILITY_CONTRADICTION / no plan
```

This candidate fails the mode-entry predicate. The failure is not merely that one convenient tool is missing: the required control belongs to an earlier host-client phase. Once `$thyquery` is executing, its current turn has already crossed that phase.

**Verdict:** `contradicts_premise` for SK@v7 approach A when “the invoked plugin changes the current session” is interpreted literally on Codex 0.146.0.

### A2 — host client atomically composes Plan plus skill input

```text
Custom client recognizes explicit "$thyquery Q" before submission
  -> client preserves Q and creates one turn/start
  -> input contains text plus typed ThyQuery skill reference
  -> collaborationMode is set to stock plan on that same request
  -> settings/updated(plan) precedes turn/started
  -> ThyQuery runs inside verified Plan
  -> native requestUserInput drives the Ralph loop
  -> closure contract is retained in turn context
  -> Plan instructions yield native plan item
```

This is the thinnest technically functioning sequence found. It can preserve the original input, thread, and one-turn identity because the transition and skill selection are attributes of the same request. It uses an official protocol field.

However, it requires a custom client or a change to an existing Codex client so that `$thyquery` is recognized before `turn/start`. A standard installed skill/plugin cannot install this behavior through any documented manifest or hook output. Under SK@v7, a client wrapper cannot be relabeled as the required thin plugin.

**Verdict:** `directly_supported` as an app-server host-integration sequence; `near_match_only` for the authorized plugin product; non-compliant with the current wrapper exclusion.

### B — transparent Plan re-dispatch

No official sequence was found that lets a running skill cancel/rewrite its Default turn and atomically re-dispatch the same logical invocation as one Plan turn:

- `/plan` is a built-in user/composer command and is unavailable while Codex is already working. Text added by a skill or hook is not documented as a new composer command.
- `turn/steer` can add input to the active turn but has no collaboration-mode field.
- `thread/resume` resumes a thread but has no collaboration-mode field.
- `UserPromptSubmit` hook output may block or add developer context; it has no mode mutation or official re-dispatch output.
- A `Stop`-style continuation is a new continuation prompt, not a documented mode-changing reconstruction of the original turn.
- Launching another client/session externally would be a wrapper and would require separately proving context, permissions, and invocation-identity continuity.

**Verdict:** `contradicts_premise` for a standard plugin-native B sequence in the inspected version. Search absence alone would be insufficient, but the relevant documented closed request and hook-output schemas affirmatively lack the necessary control fields.

### C — prohibited fallbacks

The following may look operationally convenient but are expressly outside SK@v7 and must not be offered as compatibility:

- tell the user to enter `/plan` and invoke `$thyquery` again;
- accept `$thyquery` only after the user manually enters Plan;
- ask numbered questions as prose in Default mode;
- launch an external wrapper or second Codex session and call it native same-session behavior;
- let ThyQuery produce an ordinary-text imitation of a native plan;
- execute twice and merge the results.

## Ralph loop feasibility after verified Plan entry

Once Plan is already active—either because the user entered it beforehand or because a client selected it before the turn—the remaining thin-layer concept is feasible at the protocol level:

1. Stock Plan instructions explicitly permit native `request_user_input` during intent/decision work.
2. The skill can maintain an evidence ledger and intent-contract state in conversation context.
3. It can call the native question surface repeatedly as material uncertainty changes.
4. It can defer plan finalization until the researched closure predicate succeeds, the user accepts a residual uncertainty, or the process blocks/cancels.
5. Stock Plan finalization uses the host's proposed-plan convention; app-server renders the result as a native `plan` item and plan deltas.

The official Plan template is consistent with this sequence: it distinguishes intent/decision work from finalization, directs use of `request_user_input` when user input is needed, and says a final plan is produced when decisions are sufficiently complete. The template also warns that using `update_plan` does not itself enter or leave Plan mode. Thus `update_plan` cannot repair entry and should not be treated as a planner handoff mechanism.

## Native planner handoff and provenance

### What is directly observable

A conformance probe can require all of these before accepting native-plan emission:

- `thread/settings/updated` or equivalent authoritative settings receipt reports `collaborationMode.mode = plan` before the target turn begins;
- the target query digest and thread ID match the submitted invocation;
- the Ralph interaction occurs inside that same target turn/thread as defined by the chosen client protocol;
- the host emits `item.type = "plan"` and, where available, `item/plan/delta`;
- exactly one accepted native plan item is completed;
- no plan execution follows automatically.

This supports a defensible `NATIVE_PLAN_SURFACE = STOCK_HOST` claim.

### What is not currently distinguishable

There is no separately exposed “stock planner” service receiving a typed intent-contract handoff. In Plan mode, the same model receives built-in Plan instructions, project/developer instructions, user input, and skill instructions, then generates the plan. Consequently:

- a skill can semantically stop its elicitation phase and instruct the model to follow the unchanged built-in Plan finalization rules;
- the native plan item proves the host recognized/rendered the Plan result;
- the event stream does not prove that every plan token was authored exclusively by an isolated stock-planner component rather than influenced by the skill.

Therefore strict `PLAN_PROVENANCE = STOCK_HOST` is `insufficient` if it means exclusive authorship or cryptographic component provenance. R1 recommends that later design work either:

1. define provenance operationally as **verified stock Plan mode plus native plan-item emission and no substitute renderer**, or
2. retain the stricter wording and treat Codex as unsupported until OpenAI exposes a distinct planner-handoff/provenance receipt.

This is a specification decision for later synthesis, not something R1 silently resolves.

## Per-starting-mode capability matrix

The matrix separates a standard plugin from the technically stronger custom app-server client composition.

| Starting mode | Standard `$thyquery` plugin behavior | `PLAN_ENTRY_OK` | Custom app-server composition | Contract status |
|---|---|---:|---|---|
| Plan | Skill can run in the already-active stock mode; native questions and native plan output are supported. Entry is an idempotent no-op. | Potentially yes, subject to context/provenance receipts. | Client may preserve Plan on `turn/start`; live native question/plan behavior is supported. | Viable Plan-only pre-layer, but this does not satisfy “from any supported mode” by itself. |
| Default | Turn is already Default when the skill begins. Native question call is rejected and no skill-callable mode switch exists. | No. | Client can put the same new turn in Plan before it starts and include the skill input. | Standard plugin: `HOST_UNSUPPORTED`; custom client: technically viable but out of authorized product boundary. |

Because current Codex exposes both `default` and `plan`, declaring Codex generally supported under SK@v7 requires both rows to pass through the packaged plugin. Partial Plan-only success cannot be rounded up.

## Evidence ledger

All material claims use exactly one required evidence tag.

| ID | Claim/finding | Evidence | Tag | Exact implication |
|---|---|---|---|---|
| R1-C01 | Local inspected runtime is Codex CLI 0.146.0 at the recorded path and hash. | Local `command -v`, `--version`, `readlink`, and `shasum -a 256`, 2026-08-03. | `directly_supported` | Verdict is version-scoped and reproducible against one binary. |
| R1-C02 | Current app-server advertises exactly stock `default` and `plan` modes. | Live `collaborationMode/list`; generated v2 `ModeKind` enum. | `directly_supported` | These are the starting modes relevant to the local per-mode gate. |
| R1-C03 | `$<skill-name>` is an official explicit skill invocation form. | [OpenAI Skills documentation](https://learn.chatgpt.com/docs/build-skills), “Invoke a skill” and metadata sections, retrieved 2026-08-03. | `directly_supported` | `$thyquery <query>` is viable naming syntax for an installed skill. |
| R1-C04 | App-server clients can explicitly identify a skill through text plus a typed skill input item. | [OpenAI App Server documentation](https://learn.chatgpt.com/docs/app-server), skill-invocation input section, retrieved 2026-08-03. | `directly_supported` | A custom client can compose unambiguous skill selection. |
| R1-C05 | A client can select collaboration mode on `turn/start`. | Local generated v2 schema plus [OpenAI App Server documentation](https://learn.chatgpt.com/docs/app-server), turn-start/collaboration-mode sections. | `directly_supported` | Official atomic host-client Plan entry exists before the model turn. |
| R1-C06 | Plan activation occurs before model execution when the client supplies it. | Live ephemeral event order: `settings/updated(plan)` before `turn/started`. | `directly_supported` | Same-request Plan-plus-skill composition can satisfy entry ordering at the client layer. |
| R1-C07 | Native structured questions work after client-selected Plan entry. | Live ephemeral `item/tool/requestUserInput` request and successful `Alpha` answer. | `directly_supported` | Ralph elicitation is technically available inside verified Plan. |
| R1-C08 | The same Plan probe emitted a native plan item and plan delta. | Live ephemeral `item.type=plan`, `item/plan/delta`, then `turn/completed`. | `directly_supported` | Native plan-surface emission is testable. |
| R1-C09 | The current Default task rejects the same native question capability. | Live result: `request_user_input is unavailable in Default mode`. | `directly_supported` | Preflight must test effective callability, not merely schema presence. |
| R1-C10 | Explicit skill invocation executes as turn input after the client has chosen turn settings. | Official app-server lifecycle and local field/event ordering. | `directly_supported` | The executing skill is downstream of the mode-selection boundary. |
| R1-C11 | Current skill metadata has no documented required-collaboration-mode key. | Official Skills documentation for `agents/openai.yaml` fields. | `contradicts_premise` | A standard skill manifest cannot force Plan on invocation. |
| R1-C12 | Current plugin composition adds skills/connectors/hooks but documents no special mode-control authority. | [OpenAI Plugins documentation](https://learn.chatgpt.com/docs/plugins) and [Build plugins](https://learn.chatgpt.com/docs/build-plugins), retrieved 2026-08-03. | `contradicts_premise` | Packaging a skill as a plugin does not cross the host-client boundary. |
| R1-C13 | `UserPromptSubmit` cannot return a collaboration-mode mutation or official re-dispatch. | [OpenAI Hooks documentation](https://learn.chatgpt.com/docs/hooks), common output and UserPromptSubmit output fields; local live ordering. | `contradicts_premise` | A plugin hook cannot implement forced entry for the current turn. |
| R1-C14 | `turn/steer` cannot change collaboration mode. | Closed local v2 `TurnSteerParams` and official app-server steering docs. | `contradicts_premise` | Steering cannot serve as transparent Plan re-dispatch. |
| R1-C15 | `/plan` is a built-in composer command and cannot be issued while Codex is already working. | [OpenAI Codex developer commands](https://learn.chatgpt.com/docs/developer-commands?surface=cli), `/plan` section, retrieved 2026-08-03. | `directly_supported` | Manual pre-turn Plan entry exists, but a running skill cannot use it as its own transition. |
| R1-C16 | Stock Plan is driven by built-in collaboration-mode instructions and final proposed-plan formatting. | [Official Codex Plan template](https://github.com/openai/codex/blob/main/codex-rs/collaboration-mode-templates/templates/plan.md), retrieved 2026-08-03. | `directly_supported` | The skill should defer to built-in Plan finalization once closure is reached. |
| R1-C17 | `update_plan` does not enter or exit Plan mode. | Official Codex Plan template. | `directly_supported` | A planning-state tool is not a mode switch or planner handoff. |
| R1-C18 | A custom app-server client can atomically combine Plan selection and ThyQuery skill input in one turn request. | R1-C04 through R1-C08; one live Plan request, with skill input composition supported by official schema/docs. | `directly_supported` | Technically viable host integration exists if the client is in product scope. |
| R1-C19 | The standard plugin invoked from Default cannot itself perform that client operation. | R1-C10 through R1-C14; closed extension/control surfaces. | `contradicts_premise` | SK@v7 approach A fails for the requested plugin boundary. |
| R1-C20 | No official standard-plugin B sequence preserves one logical invocation while re-dispatching it into Plan. | Closed `turn/steer`, resume, hook-output, and server-request schemas; `/plan` lifecycle restriction. | `contradicts_premise` | No compliant fallback from A was established. |
| R1-C21 | A custom client qualifies as a thin standard plugin under SK@v7. | It uses an official API, but requires client-side interception/composition outside the documented plugin bundle. | `near_match_only` | It may inform a future scope change, not current compatibility. |
| R1-C22 | Native mode plus native plan-item events prove exclusive stock-planner authorship. | No separate planner invocation or token-level provenance receipt exists in inspected docs/schema. | `insufficient` | The strict provenance clause needs operational relaxation or a future host feature. |
| R1-C23 | The standard plugin can be advertised as generally Codex-compatible under SK@v7. | Default row fails required entry; Plan row alone is partial. | `contradicts_premise` | Final current-host verdict is `HOST_UNSUPPORTED`. |

## Negative and conformance fixtures for later design

These are research outputs only; no fixture code was created.

| Fixture | Setup/action | Required oracle | Failure caught |
|---|---|---|---|
| N1 — Default skill-only invocation | Start stock Default; submit `$thyquery Q` through normal skill invocation. | No prose fallback and no plan; return/record `HOST_UNSUPPORTED` or preflight incompatibility before advertising support. | False claim that a skill mention changes mode. |
| N2 — hook mode-field injection | Configure a test `UserPromptSubmit` hook that attempts an undocumented `collaborationMode` output. | Schema rejection or ignored unknown field; settings remain Default; test must fail closed. | Treating arbitrary hook JSON as host control. |
| N3 — hook adds `/plan` text | Hook returns `/plan` as additional context. | Text is not accepted as a composer command; no Plan receipt. | Prompt injection masquerading as UI mode control. |
| N4 — steer override | Send `turn/steer` with a `collaborationMode` member. | Closed schema rejects it; active mode unchanged. | Assuming steering can mutate turn settings. |
| N5 — resume override | Attempt to resume a thread while passing a mode override. | Closed resume schema rejects/does not accept the field; no inferred continuity. | Repackaging a new turn as same invocation without evidence. |
| N6 — manual two-step | User enters `/plan`, then invokes `$thyquery Q`. | Functional Plan-only behavior may pass, but SK@v7 compliance oracle marks it prohibited/manual. | Rounding a workaround up to automatic entry. |
| N7 — custom-client atomic composition | One app-server `turn/start` carries Q, skill item, and Plan mode. | Settings receipt precedes start; one thread/turn; native question; one native plan item. Classify as host-integration-only. | Conflating technical feasibility with standard-plugin feasibility. |
| N8 — already-Plan idempotence | Activate stock Plan before `$thyquery Q`. | No second transition/restart; same turn handles native questions and emits exactly one plan. | Duplicate entry or unnecessary mode churn. |
| N9 — provenance spoof | In Default, have a skill output text containing `<proposed_plan>`. | Reject as native completion unless authoritative settings show Plan and a native plan item is emitted. | Accepting formatting imitation as host provenance. |
| N10 — duplicate re-dispatch | A shim submits the original Default turn and then a second Plan turn. | `invocation_count != 1`; fail `PLAN_ENTRY_OK` even if the second turn produces a plan. | Hidden double execution and context drift. |
| N11 — query/context continuity | Embed a nonce and context facts in Q, then perform client-level atomic Plan composition. | Pre/post query digest, thread ID, permission snapshot, and nonce-derived plan constraint agree. | Silent query truncation or new-session context loss. |
| N12 — no automatic execution | Complete a native Plan after Ralph closure. | Turn ends with native plan; no plan step or tool execution begins automatically. | Planner/executor boundary violation. |

## Contradictions, residual unknowns, and reassessment triggers

### Contradictions preserved

1. **Required plugin-owned Default-to-Plan transition vs current control boundary.** SK@v7 requires it; Codex currently assigns mode at client `turn/start`, before the skill runs.
2. **Required standard thin plugin vs only verified atomic solution.** The verified solution is a custom app-server client behavior, not documented plugin behavior.
3. **Strict stock-plan provenance vs one-model instruction composition.** Native rendering is observable, exclusive authorship is not.

These contradictions must not be papered over by redefining `$thyquery`, silently narrowing support to Plan mode, or calling a wrapper a plugin.

### Residual unknowns

- Whether a future Codex Desktop release will add plugin manifest metadata such as “requires Plan” and perform the transition before `turn/start`.
- Whether a future app/CLI client will expose a first-class plugin-triggered pre-submit command that can atomically set collaboration mode.
- Whether OpenAI will expose an attestable, separately addressed stock-planner handoff or provenance receipt.
- Whether plugin support will expand/change across Desktop, CLI, and IDE surfaces; current documentation must be rechecked per declared package target.

### Reopen R1 when any of these occurs

- local Codex version or app-server protocol version changes;
- `TurnStartParams`, `TurnSteerParams`, hook outputs, skill metadata, or plugin manifest schemas add a mode/control field;
- Codex publishes an official pre-submit command API for skills/plugins;
- the product boundary is explicitly changed to authorize a custom app-server client;
- the strict provenance predicate is redefined or a new host provenance event appears.

## Final R1 compatibility decision

For Codex CLI/app version 0.146.0 under the exact SK@v7 contract:

```text
STANDARD_CODEX_PLUGIN_COMPATIBLE = false
DEFAULT_TO_PLAN_BY_INVOKED_SKILL = unsupported
PLAN_ALREADY_ACTIVE_PRELAYER = supported_at_protocol_level
CUSTOM_APP_SERVER_ATOMIC_COMPOSITION = supported_but_out_of_scope
NATIVE_QUESTION_AFTER_PLAN_ENTRY = supported
NATIVE_PLAN_SURFACE = supported
EXCLUSIVE_STOCK_PLAN_PROVENANCE = insufficient
FINAL_R1_VERDICT = HOST_UNSUPPORTED
```

R1 therefore does not recommend implementation or packaging of a Codex plugin under the current no-exception claim. The only evidence-backed paths are to (a) change the product scope to include a custom client integration, (b) relax the contract back to Plan-first invocation, or (c) wait for a first-class plugin-callable pre-turn mode requirement. Choosing among those is outside this research lane and requires a later approved design decision.
