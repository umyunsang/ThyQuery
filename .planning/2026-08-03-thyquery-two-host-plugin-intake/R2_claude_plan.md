# R2 — Claude Code forced Plan composition

## Metadata

- Lane: R2 only
- Authority: approved `SK@v7`, SHA-256 `d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56`
- Research date: 2026-08-03 (Asia/Seoul)
- Local runtime: Claude Code `2.1.220`, executable `/Users/um-yunsang/.local/bin/claude`
- Local executable SHA-256: `8addc857f3fe64d5a0368af9ee50321b50afb4a6918ba3ef018ab84f5dbbe081`
- Scope: read-only host feasibility research; no plugin implementation, installation, configuration mutation, or session persistence
- Evidence vocabulary: `directly_supported`, `contradicts_premise`, `near_match_only`, `insufficient`
- Source bound used: 12 material source groups, below the 18-source R2 cap

## Executive verdict

`HOST_UNSUPPORTED(claude-code@2.1.220, SK@v7-exact-contract)`

- **[contradicts_premise]** Claude Code's documented user-invoked plugin workflow is a slash skill such as `/my-plugin:thyquery` (with a possible bare `/thyquery` alias when there is no conflict), not `$thyquery`. `$ARGUMENTS` is a substitution token *inside* skill content, not an invocation prefix. Therefore the exact required spelling `$thyquery <query>` is not a native Claude Code plugin command. Evidence: official Plugins lines 101–117, 176–177, 184–217, 221–239; official Skills lines 339–348 and 475–493; local official `command-development/SKILL.md` lines 7–13, 34–39, 212–229.
- **[directly_supported]** Claude Code does expose the three relevant stock tools: `EnterPlanMode`, `AskUserQuestion`, and `ExitPlanMode`. The tools reference describes them respectively as switching to Plan, gathering multiple-choice clarification, and presenting the plan for approval/exiting Plan. Evidence: official Tools Reference lines 69–87 and 169–171.
- **[insufficient]** The official plugin and hook contracts do not document a parser-level operation by which one custom skill invocation atomically invokes the built-in `/plan` command or sets the current session mode before the model receives the expanded skill. A skill is a prompt workflow loaded through the existing `Skill` tool; `UserPromptSubmit` and `UserPromptExpansion` may block or add context, but their documented decision outputs do not include `setMode`. Evidence: official Tools Reference lines 69–70; Skills lines 449–451; Hooks lines 1169–1205 and 1221–1265.
- **[near_match_only]** A native slash skill can instruct Claude to call the official `EnterPlanMode` tool as its first action, then use `AskUserQuestion`, and later call `ExitPlanMode`. This is the thinnest same-session candidate, but the transition is model-mediated rather than command-parser-atomic, its per-surface availability is not guaranteed by skill metadata, and the local non-interactive 2.1.220 probe did not expose `EnterPlanMode` or `AskUserQuestion` in its initialized tool set.
- **[near_match_only]** The built-in `/plan [description]` command provides the desired direct single-prompt Plan entry and carries a task description, but it is a different invocation and no official source documents aliasing or composing it behind a custom plugin skill while retaining `$thyquery` as the one logical invocation. Evidence: official Commands lines 48–55 and 138–145; Permission Modes lines 183–190.
- **[near_match_only]** `PermissionRequest` is the only documented hook decision surface here that can emit an in-memory `setMode: plan`. It runs only after a permission-requiring or auto-denied tool call reaches permission handling, not at direct skill expansion, so it cannot establish the required unconditional pre-question, pre-research, atomic transition from every mode. Evidence: official Hooks lines 1579–1587 and 1615–1662.
- **[contradicts_premise]** A session with bypass permissions available does not enforce Plan-mode edit/command blocks even if its displayed/effective mode is Plan. Such a starting mode cannot satisfy SK@v7's verified stock-Plan safety semantics. Evidence: official Permission Modes lines 376–380.
- **[insufficient]** Official docs show same-conversation skill persistence and a native Plan approval surface, but no stock-planner provenance receipt that proves an accepted ThyQuery contract was consumed by an *unchanged* stock planner rather than merely influencing the same model turn. An observed `ExitPlanMode` call is a useful proxy, not proof of stock authorship.
- **[directly_supported]** Under SK@v7, any required capability that is contradicted or remains unverified must yield `HOST_UNSUPPORTED`; manual switching, wrappers, prose questions, changed invocation spelling, and plugin-authored substitute plans are not compliant fallbacks.

The verdict does **not** mean Claude Code lacks native Plan or native structured questions. It means the current official Claude plugin contract does not prove the exact, no-exception composition required by SK@v7, and one required surface—the literal `$thyquery` native invocation—is directly contradicted.

## Contract-to-host mapping

| SK@v7 clause | Claude Code 2.1.220 evidence | Tag | R2 consequence |
|---|---|---|---|
| Exact `$thyquery <query>` is the plugin invocation | Official plugin skills are invoked with `/plugin-name:skill-name`; a conflict-free bare slash alias may work. `$ARGUMENTS` is only argument substitution. | `contradicts_premise` | Exact native invocation gate fails before mode entry. |
| Invocation forces stock Plan before any other work | `EnterPlanMode` is a stock model tool; `/plan` is a stock built-in command. No skill frontmatter or direct-expansion hook output sets mode. | `insufficient` | A deterministic, parser-atomic plugin transition is not established. |
| Already-Plan entry is idempotent | Starting with `--permission-mode plan` is documented and locally observed; a ThyQuery skill can inspect hook `permission_mode` fields, but no official ThyQuery-specific no-op composition exists yet. | `near_match_only` | Feasible state check, not a complete invocation path. |
| Query/context/permissions and one logical identity persist | Inline skill content enters the current conversation as one message and persists. `EnterPlanMode` is described as a session switch. | `near_match_only` | Same-session A is plausible; digest/identity receipts are not host-provided. |
| Native structured elicitation after entry | `AskUserQuestion` is a built-in no-permission tool for multiple-choice clarification; the official plugin-dev guide documents conditional, iterative, and validation-loop patterns. | `directly_supported` for an eligible interactive tool surface | Ralph elicitation can use a stock tool once availability and effective mode are verified. |
| Elicitation works from `dontAsk` after forced entry | `dontAsk` explicitly denies `AskUserQuestion`; whether an inline skill can always switch first and thereby remove that denial was not proven in an interactive live fixture. | `insufficient` | Must fail closed until an exact fixture passes. |
| Stock Plan semantics survive every declared mode | Bypass-enabled sessions do not enforce Plan blocks. | `contradicts_premise` for `bypassPermissions` | Do not declare this starting mode compatible. Narrow declarations cannot cure the exact `$` failure. |
| Accepted contract is handed to unchanged stock planner | Skill instructions remain in the same conversation; `ExitPlanMode` presents a native plan approval surface. | `near_match_only` | Continuity is plausible; unchanged-stock provenance is not verifiable from current contracts. |
| ThyQuery stops after native plan, remains in Plan | Plan approval normally exits Plan; `ExitPlanMode` itself presents approval and exits on approval. Keeping the session in Plan requires not approving/executing at ThyQuery completion. | `near_match_only` | A fixture must distinguish “plan emitted/presented” from “plan approved/exited.” |

## Exact invocation grammar

### Registered native forms

| Surface | Documented form | Tag | Implication |
|---|---|---|---|
| Plugin skill | `/plugin-name:skill-name [args]` | `directly_supported` | A plugin named `thyquery` with skill `thyquery` is canonically `/thyquery:thyquery …`. |
| Conflict-free bare plugin alias | `/skill-name [args]` may resolve unless another command already uses the name | `directly_supported` for current Skills docs | `/thyquery …` can be tested as a convenience alias, but remains slash syntax. |
| Standalone user/project skill | `/directory-name [args]` | `directly_supported` | This is not a distributable namespaced-plugin spelling. |
| Built-in Plan command | `/plan [description]` | `directly_supported` | Direct Plan entry exists, but it is not ThyQuery invocation. |
| Skill arguments | Text after slash command; `$ARGUMENTS` or named `$name` placeholders inside `SKILL.md` | `directly_supported` | The dollar sign belongs to template substitution, not command dispatch. |
| Literal `$thyquery <query>` | Ordinary submitted prompt text; it is not listed as a command or skill grammar | `contradicts_premise` | Claude Code does not natively register the required literal command. |

- **[near_match_only]** A plugin-wide `UserPromptSubmit` hook could *observe* ordinary prompt text beginning with `$thyquery` and add context or block it. That would be ordinary-prompt interception, not a registered command, and the hook still cannot set the mode at this phase. It is excluded by SK@v7 and is not an invocation workaround.
- **[near_match_only]** `UserPromptExpansion` is narrower and sees the command name, args, source, original prompt, and current permission mode, but it fires for slash-command/MCP-prompt expansion, not the literal dollar prefix. It can only block or add context.
- **[insufficient]** Current docs allow chaining up to six *skills* at the start of a message, but they do not establish that a built-in `/plan` and a plugin skill can be composed into one atomic dispatch. `/plan /thyquery …` and `/thyquery /plan …` must therefore be treated as negative fixtures, not architecture.

## Mode and surface capability matrix

The matrix separates “the stock host can enter Plan somehow” from “the one exact ThyQuery invocation forces and verifies it.” The final column applies the full SK@v7 contract.

| Starting mode / surface | Stock Plan entry documented | Model `EnterPlanMode` candidate | Native `AskUserQuestion` after verified Plan | Exact `$thyquery` native | Stock Plan caveat | Full verdict |
|---|---|---|---|---|---|---|
| CLI interactive `plan` | Already active; `Shift+Tab`, `/plan`, or startup flag are documented | Idempotent call should be unnecessary; no official idempotence receipt | Official tool exists | No | Native plan/approval UI exists | `HOST_UNSUPPORTED` (`contradicts_premise`: invocation syntax) |
| CLI interactive `default` / Manual | `Shift+Tab`, `/plan`, startup flag | Official tool exists, but skill-first deterministic call not contractually guaranteed | Yes after successful verified transition; not live-tested here | No | Same-session continuity plausible | `HOST_UNSUPPORTED` (`contradicts_premise` + `insufficient`) |
| CLI interactive `acceptEdits` | `Shift+Tab` cycle or `/plan` | Same model-mediated candidate | Same conditional availability | No | Must prove no edit can precede transition | `HOST_UNSUPPORTED` |
| CLI interactive `auto` | Mode controls or `/plan` | Same model-mediated candidate | Same conditional availability | No | Classifier behavior cannot substitute for Plan receipt | `HOST_UNSUPPORTED` |
| CLI interactive `dontAsk` | `/plan` or startup controls exist; `dontAsk` is not in normal Shift+Tab cycle | Candidate is unproven from a skill | Explicitly denied while `dontAsk` remains effective | No | Transition must precede the first question without relying on a denied question | `HOST_UNSUPPORTED` |
| CLI interactive `bypassPermissions` available | `/plan` can instruct planning | Tool presence does not restore Plan enforcement | Tool may exist, but not sufficient | No | Plan edit/command blocks are not enforced | `HOST_UNSUPPORTED` (`contradicts_premise`) |
| CLI non-interactive `-p`, any non-Plan start | Startup `--permission-mode plan` works, but that is launch-time configuration | Local safe/no-persistence init did not expose `EnterPlanMode` | Local safe/no-persistence init did not expose `AskUserQuestion` | No | `/plan` probe remained in default and reported unavailable in that surface | `HOST_UNSUPPORTED` for in-session forced entry |
| CLI non-interactive `-p --permission-mode plan` | Starts in Plan; locally observed init `permissionMode: "plan"` | Not needed | Not exposed in the bounded local safe-mode probe | No | Starting flag is not plugin-controlled in an existing invocation | `HOST_UNSUPPORTED` for full contract |
| VS Code interactive | Mode selector and initial-mode setting are documented | Tools reference is host-general; plugin-specific transition not separately guaranteed | Official built-in tool, availability not live-tested | No | UI/user control is not plugin composition | `HOST_UNSUPPORTED` |
| JetBrains interactive | Uses CLI terminal; Shift+Tab/start flag documented | Same uncertainty as CLI interactive | Same uncertainty as CLI interactive | No | No separate atomic plugin API documented | `HOST_UNSUPPORTED` |
| Claude Desktop local session | Mode selector/default setting documented | No plugin-specific transition contract located | Built-in tool presumed by host docs but not live-tested | No | A user mode selector is manual control, excluded as fallback | `HOST_UNSUPPORTED` |
| Claude Code web/cloud or Remote Control | UI mode dropdown and surface-specific mode subsets documented | No plugin composition contract located | Surface availability and permissions differ | No | Cloud maps/omits some local modes; Remote Control has reporting caveats | `HOST_UNSUPPORTED` / `insufficient` per exact surface |

### Mode enumeration finding

- **[directly_supported]** Current official mode values are `default` (shown as Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, and `bypassPermissions`; current local CLI help additionally accepts `manual` as the alias for `default`.
- **[directly_supported]** The local 2.1.220 help lists `--permission-mode` as a session/startup option with `acceptEdits`, `auto`, `bypassPermissions`, `manual`, `dontAsk`, and `plan`; it does not advertise a plugin command API for changing an already-running session.
- **[directly_supported]** Official Permission Modes says the mode is selected through mode controls rather than by asking Claude in chat, while the Tools Reference separately lists `EnterPlanMode` as a model tool. These statements establish a user-control path and a model-tool path, not a deterministic custom-command composition contract.

## Approach A — official same-session mode mutation

### Best evidence-backed candidate sequence

1. **[contradicts_premise]** User invokes the native-equivalent slash form `/thyquery …` or `/thyquery:thyquery …`; the required literal dollar form cannot enter this sequence through the command registry.
2. **[directly_supported]** Claude Code expands the skill content and arguments into one message in the current conversation; the content persists across later turns.
3. **[near_match_only]** The skill directs Claude that its first and only permissible semantic action is `EnterPlanMode` with the captured query unchanged.
4. **[directly_supported]** If the tool is available and called, `EnterPlanMode` is the stock tool whose documented effect is to switch the session into Plan.
5. **[insufficient]** A hook can observe a later event's common `permission_mode` field, but no documented atomic receipt is returned by skill expansion itself proving that the transition completed before all other model output/actions.
6. **[directly_supported]** Once effective Plan and question availability are verified, `AskUserQuestion` can gather multiple-choice clarifications, including an automatic free-text `Other` path; official plugin-dev material demonstrates conditional and iterative patterns.
7. **[near_match_only]** Skill-persistent instructions can maintain the Ralph state and loop in the same conversation. This provides continuity, but the host supplies no query/context digest or single-logical-invocation receipt.
8. **[directly_supported]** `ExitPlanMode` is the stock tool that presents a plan for approval and exits Plan upon approval.
9. **[insufficient]** Observing `ExitPlanMode` plus a native plan artifact does not by itself prove `PLAN_PROVENANCE = STOCK_HOST` in the stronger SK@v7 sense of an unchanged planner consuming a formally accepted contract.

### A verdict

`A = NONCOMPLIANT_FOR_SK@v7`, although it is the closest host-native experimental candidate after a future contract revision.

- **[contradicts_premise]** It requires slash invocation rather than the literal `$thyquery` registry form.
- **[insufficient]** The official skill contract gives the model instructions; it does not guarantee an atomic first tool call or expose a direct skill frontmatter `permissionMode` transition.
- **[insufficient]** Interactive fixtures across `default`, `acceptEdits`, `auto`, and `dontAsk` are required to establish per-mode availability and ordering; the bounded headless probe cannot substitute for them.
- **[contradicts_premise]** `bypassPermissions` cannot meet the required enforced-Plan invariant.

## Approach B — official transparent Plan re-dispatch

### Candidate surfaces examined

| Candidate | Evidence | Tag | Why it does not satisfy B |
|---|---|---|---|
| Built-in `/plan <description>` | Directly enters Plan from one prompt and accepts a task description | `near_match_only` | Wrong invocation; no documented custom alias or continuation into a plugin Ralph pre-layer. |
| Launch `claude --permission-mode plan` | Starts a session in Plan; works with `-p` | `near_match_only` | Launch-only/new-session control, not one in-session plugin invocation; context/identity continuity is not provided by the plugin contract. |
| Persistent `permissions.defaultMode: "plan"` | Makes Plan the default for future sessions | `near_match_only` | Configuration mutation and future-session behavior; not explicit per-invocation dispatch. |
| `UserPromptExpansion` hook | Sees slash command args/source and current mode; can block/add context | `near_match_only` | Cannot set mode or redispatch the built-in `/plan` command. |
| `UserPromptSubmit` hook | Sees all submitted prompts; can block/add context | `near_match_only` | Intercepts ordinary prompt text, cannot set mode, and violates the required native invocation boundary. |
| `PermissionRequest.updatedPermissions setMode` | Can set in-memory `plan` when allowing a permission request | `near_match_only` | Fires conditionally and later, only when permission handling occurs; cannot be the unconditional first transition across all modes. |
| Nested `claude` command or SDK process | Could launch Plan with explicit flags | `near_match_only` | Wrapper/new-session architecture, explicitly excluded by SK@v7. |
| Hidden local `--plan-mode-instructions` | Local binary strings describe replacing the Plan workflow body in `-p` | `near_match_only` | Undocumented CLI-internal surface, print-only, launch-time, and would change the stock planner rather than preserve it. |

### B verdict

`B = NOT ESTABLISHED`.

- **[insufficient]** No current official source documents an atomic custom-command-to-built-in-`/plan` alias, transparent re-dispatch, or continuation token that preserves one logical plugin invocation.
- **[directly_supported]** The official hook output schemas enumerate the available direct-expansion decisions; `setMode` appears only in the later `PermissionRequest` decision schema.
- **[near_match_only]** The built-in `/plan` command demonstrates that Claude Code itself can perform the desired parser-level transition, but the plugin extension surface cannot currently claim that operation as its own exact invocation.

## Why the PermissionRequest `setMode` path is not Approach A or B

- **[directly_supported]** `PermissionRequest` fires when Claude Code is about to ask for tool permission, or would auto-deny in a surface that cannot prompt; `PreToolUse` fires earlier on every tool call.
- **[directly_supported]** An allowing PermissionRequest decision can return `updatedPermissions`, including `setMode` with destination `session`, and `plan` is a valid value.
- **[near_match_only]** This proves that an official session-mode mutation primitive exists inside one hook phase.
- **[contradicts_premise]** It does not fire at literal command recognition or direct skill expansion and requires a prior permission-path tool attempt. Therefore it cannot prove `PLAN_ENTRY_OK` before every research/question/action.
- **[insufficient]** Auto-approved, no-permission, and bypass paths do not guarantee the same PermissionRequest event. Manufacturing a permission request would add another model/tool action and still lack atomicity.

## Native structured elicitation and Ralph-loop fit

| Requirement | Finding | Tag | Boundary |
|---|---|---|---|
| Native choices | `AskUserQuestion` is a stock tool for multiple-choice clarification and requires no permission in the ordinary tool table. | `directly_supported` | Tool must actually be present and not denied on the active surface. |
| Free-form answer | Official behavior provides an `Other` row/notes path. | `directly_supported` | This supports tacit-intent correction without prose emulation. |
| Adaptive questioning | Official plugin-dev guidance shows conditional follow-ups and iterative collection. | `directly_supported` as a supported command pattern | Guidance is not a convergence/termination proof. |
| Validation loop | Official plugin-dev guidance contains a re-question-on-validation-failure pattern. | `near_match_only` | It illustrates mechanics, not ThyQuery's researched Ralph stopping rule. |
| Plan affinity | Changelog 2.0.21 says Claude asks more questions in Plan mode. | `near_match_only` | Frequency is not exclusivity or guaranteed availability. |
| `dontAsk` | Official mode behavior denies `AskUserQuestion`. | `directly_supported` | No prose fallback is allowed; a verified transition must precede it. |
| Headless `-p` | Bounded local init did not list `AskUserQuestion`; ToolSearch found no deferred match. | `directly_supported` for that exact probe only | Do not generalize to normal interactive sessions. |
| Ralph persistence | Inline skill content remains in the current conversation; hooks can be skill-scoped. | `near_match_only` | Host-native loop mechanics exist, but termination design belongs to R3–R6. |

## Native planner handoff and provenance

### What current evidence supports

- **[directly_supported]** Plan mode is the host's research-and-propose mode and blocks source edits before approval except when bypass permissions are available.
- **[directly_supported]** When ready, Claude presents a plan with native approval/refinement options; approval exits Plan and selects the subsequent permission mode.
- **[directly_supported]** The official stock `ExitPlanMode` tool is the mechanism that presents a plan for approval and exits Plan.
- **[directly_supported]** An invoked inline skill's rendered instructions and arguments remain in the same conversation, so an accepted contract can remain visible to the model that later creates the Plan artifact.

### What current evidence does not support

- **[insufficient]** No public plugin API identifies a separate “stock planner” component or provides a cryptographic/typed receipt that it, rather than the ThyQuery skill instructions, authored the plan.
- **[insufficient]** No official field binds a specific accepted contract digest to a later plan artifact.
- **[insufficient]** No official field records `query_digest_before`, `query_digest_after`, or `invocation_count = 1` across a mode transition.
- **[near_match_only]** A transcript event showing the stock `ExitPlanMode` tool and native plan approval UI can be used as a test oracle for “native Plan surface reached,” but it cannot prove the stronger unchanged-stock authorship claim.
- **[near_match_only]** A plugin can instruct Claude to stop after presenting the plan and not approve/execute it; the user's act of approving would exit Plan, so “native plan emitted while still in Plan” must be measured before approval.

### Minimum future provenance fixture

This is a research acceptance fixture, not an implementation proposal.

| Required observation | Pass meaning | Evidence status now |
|---|---|---|
| One user input event carrying the exact invocation | `invocation_count = 1` | `insufficient`; `$` is not a registered command |
| Mode receipt before first research/question event | effective mode is stock `plan` | `insufficient`; hook schemas expose mode but not an atomic invocation receipt |
| Same session/conversation ID before and after | same-session continuity | `near_match_only`; A appears same-session |
| Original query digest retained | no query loss or rewrite | `insufficient`; plugin must instrument, host has no native digest |
| `AskUserQuestion` tool events | native elicitation rather than prose | `directly_supported` as an available event/tool class |
| Accepted-contract digest recorded | precise handoff input | `insufficient`; no stock field |
| Stock `ExitPlanMode` event and native approval UI | native plan surface produced | `near_match_only` for stock authorship |
| No edit/execute events before completion | Plan safety and no execution | `contradicts_premise` in bypass-enabled sessions; testable elsewhere |

## Bounded local probes

All model probes used `--safe-mode --no-session-persistence`; they did not install/enable/disable plugins, modify settings, write project files, or retain a resumable Claude session. Their findings are scoped to non-interactive `-p` and must not be generalized to interactive CLI/IDE/Desktop.

| Probe | Exact relevant command shape | Observation | Tag |
|---|---|---|---|
| Version/help | `claude --version`; `claude --help`; `claude plugin --help` | Runtime `2.1.220`; `--permission-mode` lists six CLI values/alias; `--plugin-dir` and plugin management exist; `--bare` says skills resolve via `/skill-name`. | `directly_supported` for local snapshot |
| Default headless tool init | `claude -p --safe-mode --no-session-persistence --output-format stream-json --verbose --tools default <prompt requesting EnterPlanMode>` | Init reported `permissionMode: "default"`; initialized tool list omitted `EnterPlanMode`, `ExitPlanMode`, and `AskUserQuestion`; ToolSearch found no deferred `EnterPlanMode`. | `directly_supported` for this exact probe |
| Plan headless init | same flags with `--permission-mode plan` and a no-tool diagnostic prompt | Init reported `permissionMode: "plan"`. | `directly_supported` for startup-flag behavior |
| Plan headless question probe | same Plan flags with a request to call `AskUserQuestion` | Initialized tool list omitted it and ToolSearch found no deferred match. | `directly_supported` for this exact probe |
| Built-in command in headless safe mode | same default flags with prompt beginning `/plan` | Init remained `permissionMode: "default"`; response reported `/plan` unavailable in that environment. | `directly_supported` for this exact probe; `insufficient` for interactive behavior |
| Executable inspection | `file`, `shasum -a 256`, and bounded `strings | rg` over the local executable | Mach-O arm64; hash recorded above; strings include `EnterPlanMode`, `ExitPlanMode`, a confirmation string, an agent-context exclusion, and hidden Plan-mode flags. | `near_match_only`; implementation strings are not a public support contract |

## Contradictions and unresolved unknowns

### Contract contradictions

| ID | Finding | Tag | Consequence |
|---|---|---|---|
| C-R2-01 | Literal `$thyquery` is not the documented native plugin/skill invocation grammar. | `contradicts_premise` | Exact invocation cannot be advertised for Claude Code 2.1.220. |
| C-R2-02 | `bypassPermissions` availability disables Plan-mode enforcement blocks. | `contradicts_premise` | This starting mode cannot satisfy verified stock Plan semantics. |
| C-R2-03 | A PermissionRequest hook changes mode only after a permission-path tool attempt, not atomically at invocation. | `contradicts_premise` for use as SK@v7 A/B | It cannot be promoted as the required forced-entry mechanism. |
| C-R2-04 | A hook that recognizes literal `$thyquery` is ordinary-prompt interception, not standard command registration. | `contradicts_premise` under SK@v7 exclusion | Do not relabel it as native dollar-command support. |

### Evidence gaps

| ID | Unknown | Tag | Required evidence to reopen |
|---|---|---|---|
| U-R2-01 | Whether an inline plugin skill can make `EnterPlanMode` the guaranteed first action in every non-Plan interactive mode | `insufficient` | Official deterministic-composition contract plus per-mode interactive event traces |
| U-R2-02 | Whether `EnterPlanMode` succeeds from `dontAsk` early enough to re-enable native questions | `insufficient` | Non-mutating interactive trace: skill expansion → EnterPlanMode success → mode receipt → AskUserQuestion |
| U-R2-03 | Whether the host exposes an atomic query/context/invocation continuity receipt | `insufficient` | Official typed event/schema or exact live trace with stable IDs/digests |
| U-R2-04 | Whether a built-in `/plan` can be legally chained/aliased behind a plugin invocation | `insufficient` | Official command-composition contract, not model inference |
| U-R2-05 | Whether `ExitPlanMode` event plus native plan artifact proves unchanged stock-planner authorship | `insufficient` | Official provenance definition and a bindable plan/contract receipt |
| U-R2-06 | Interactive tool availability across CLI, VS Code, JetBrains, Desktop, web/cloud, and Remote Control | `insufficient` | Surface/version-specific official matrix and clean live fixtures |
| U-R2-07 | Behavior of `EnterPlanMode` when already in Plan | `insufficient` | Official idempotence statement or exact trace |

## Negative fixtures required by SK@v7

These fixtures define expected fail-closed behavior; they do not authorize implementation.

| Fixture | Input/start | Required observation | Required result |
|---|---|---|---|
| NF-R2-01 exact syntax | `$thyquery design auth` from Manual | Host does not resolve a registered dollar skill | `HOST_UNSUPPORTED`; never silently reinterpret as `/thyquery` |
| NF-R2-02 slash near-match | `/thyquery design auth` from Manual | Skill may load, but spelling differs and no atomic mode receipt exists | No compliant success claim |
| NF-R2-03 built-in-only | `/plan design auth` | Stock Plan starts without the ThyQuery pre-layer | Not `THYQUERY_COMPLETE` |
| NF-R2-04 assumed composition | `/plan /thyquery design auth` and inverse ordering | No official built-in-plus-skill atomicity contract | Fail closed; do not infer chaining |
| NF-R2-05 no first transition | Any candidate emits prose, reads, searches, or questions before verified Plan | Event ordering violates entry predicate | `HOST_CAPABILITY_CONTRADICTION`, no plan |
| NF-R2-06 `dontAsk` question denial | Start `dontAsk`; transition absent/failed; attempt `AskUserQuestion` | Native question is denied | Stop with capability contradiction; no prose question |
| NF-R2-07 bypass safety | Start with bypass available; enter displayed Plan; attempt edit/command | Host permits action despite Plan | Starting mode incompatible; no success |
| NF-R2-08 headless missing tools | `-p` default then invoke candidate | Init lacks transition/question tools | `HOST_UNSUPPORTED` for that surface |
| NF-R2-09 context drift | Query/context digest differs across transition | Continuity predicate false | No plan |
| NF-R2-10 duplicate dispatch | Nested/new Claude process or second user invocation appears | `invocation_count != 1` | No plan; wrapper/redirection rejected |
| NF-R2-11 fake structured input | Native `AskUserQuestion` absent and model prints numbered choices | Prose emulation detected | No plan |
| NF-R2-12 fake native plan | Plugin prints its own plan without stock `ExitPlanMode`/native UI evidence | Provenance predicate false | No plan completion claim |
| NF-R2-13 approval exits Plan | User approves native plan during the ThyQuery completion measurement | Mode changes out of Plan | Measure completion before approval; otherwise predicate false |
| NF-R2-14 ordinary prompt isolation | Ordinary prompt not beginning with a registered native ThyQuery invocation | No ThyQuery hook/loop side effect | Pass only if untouched |

## Compatibility decision

### Current declaration

| Host/version | Supported invocation | Supported starting modes | Status | Reason |
|---|---|---|---|---|
| Claude Code 2.1.220 | Required literal `$thyquery <query>` | None | `HOST_UNSUPPORTED` | Native invocation grammar contradiction; atomic plugin-to-Plan composition and stock provenance unproven |

- **[directly_supported]** This is a compatibility gate, not a suggestion to weaken the product contract.
- **[directly_supported]** R2 offers no manual mode switch, wrapper, prose-question path, changed command spelling, or plugin-authored-plan fallback.
- **[near_match_only]** If a future user-approved contract changed the invocation to native slash syntax and accepted a model-mediated `EnterPlanMode` transition, `/thyquery …` plus the three stock tools would be the closest thin-layer experiment. That future possibility does not change this verdict and is not proposed as SK@v7 compliance.

### Reopen conditions

Claude support may be re-evaluated only if all of the following become directly supported and pass exact fixtures:

1. **[insufficient]** An official native registration or equivalent host-native command contract for literal `$thyquery <query>`.
2. **[insufficient]** An official plugin-callable transition that is atomic before model work, or an officially specified equivalent re-dispatch preserving one invocation.
3. **[insufficient]** A mode receipt proving effective stock Plan and native question availability before the first Ralph action.
4. **[insufficient]** Query, conversation/workspace context, permissions, and identity continuity receipts.
5. **[insufficient]** Per-declared-mode fixtures, with bypass excluded unless Anthropic restores enforceable Plan semantics there.
6. **[insufficient]** An observable stock-planner handoff/provenance contract binding the accepted intent contract to the native plan.

## Evidence ledger

| Ref | Claim scope | Exact locator | Retrieved/version | Tag | Implication |
|---|---|---|---|---|---|
| E-R2-01 | Plugin invocation and namespacing | [Create plugins](https://code.claude.com/docs/en/plugins), “When to use plugins,” “Create your first plugin,” HTML snapshot lines 99–117, 155–177, 184–239 | Retrieved 2026-08-03 | `directly_supported` | Plugin skills use slash names and `$ARGUMENTS` is post-name text substitution. |
| E-R2-02 | Current skill naming, lifecycle, arguments | [Extend Claude with skills](https://code.claude.com/docs/en/slash-commands), “How a skill gets its command name,” “Skill content lifecycle,” “Pass arguments,” lines 339–348, 449–451, 475–493 | Retrieved 2026-08-03; current docs include v2.1.216/2.1.202 notes | `directly_supported` | Confirms slash grammar, possible bare alias, same-conversation persistence, and argument handling. |
| E-R2-03 | Built-in `/plan` and command parsing | [Commands](https://code.claude.com/docs/en/commands), lines 48–55 and 138–145 | Retrieved 2026-08-03 | `directly_supported` | `/plan [description]` is built in and distinct from prompt-based skills. |
| E-R2-04 | Permission modes and user controls | [Choose a permission mode](https://code.claude.com/docs/en/permission-modes), lines 74–95 and 103–166 | Retrieved 2026-08-03 | `directly_supported` | Enumerates modes/surfaces and documented control paths. |
| E-R2-05 | Plan behavior and approval | [Choose a permission mode](https://code.claude.com/docs/en/permission-modes), lines 183–218 | Retrieved 2026-08-03 | `directly_supported` | Defines stock Plan behavior, `/plan`, startup flag, approval/refinement, and exit semantics. |
| E-R2-06 | `dontAsk` and bypass contradictions | [Choose a permission mode](https://code.claude.com/docs/en/permission-modes), lines 365–380 | Retrieved 2026-08-03 | `directly_supported` | `dontAsk` denies native questions; bypass availability defeats Plan enforcement. |
| E-R2-07 | Stock tools | [Tools reference](https://code.claude.com/docs/en/tools-reference), lines 64–87 and 169–171 | Retrieved 2026-08-03 | `directly_supported` | Confirms native transition, question, and plan-approval tools. |
| E-R2-08 | Prompt/expansion hook limits | [Hooks reference](https://code.claude.com/docs/en/hooks), “UserPromptSubmit” and “UserPromptExpansion,” lines 1169–1205 and 1221–1265 | Retrieved 2026-08-03 | `directly_supported` | Direct invocation hooks may block/add context but cannot set mode. |
| E-R2-09 | Conditional hook mode mutation | [Hooks reference](https://code.claude.com/docs/en/hooks), “PermissionRequest,” lines 1579–1587 and 1615–1662 | Retrieved 2026-08-03 | `directly_supported` | `setMode: plan` exists only in a later conditional permission phase. |
| E-R2-10 | Feature/version chronology | [Claude Code changelog](https://code.claude.com/docs/en/changelog), 2.1.220 lines 418–426; 2.1.72 lines 4852–4861; 2.0.21 lines 5433–5439 | Retrieved 2026-08-03; 2.1.220 released 2026-07-25 | `directly_supported` | Local version matches current release row; `/plan`, skill hooks, and interactive questions are established features. |
| E-R2-11 | Official installed plugin-author guidance | `/Users/um-yunsang/.claude/plugins/cache/claude-plugins-official/plugin-dev/unknown/skills/command-development/SKILL.md`, lines 7–13, 34–39, 61–82, 178–229, 560–639; `references/interactive-commands.md`, lines 1–76, 339–425, 543–575 | Local cache inspected 2026-08-03; skill version 0.2.0, plugin version directory `unknown` | `directly_supported` for installed guidance; `near_match_only` for current public contract | Confirms slash prompt workflows and native question-loop patterns; unknown plugin package version limits authority. |
| E-R2-12 | Local runtime and bounded probes | `/Users/um-yunsang/.local/bin/claude`; `claude --version`, `--help`, `plugin --help`; safe/no-persistence stream-json probes; bounded executable strings | Runtime 2.1.220, inspected 2026-08-03, SHA-256 above | `directly_supported` for exact observations; `near_match_only` outside probe scope | Verifies local mode flags and headless limitations without claiming interactive parity. |

## Research accounting and safety receipt

- **[directly_supported]** Material source groups used: 12/18.
- **[directly_supported]** External claims rely only on official Anthropic/Claude Code documentation; local evidence comes from the installed Claude executable and installed official `claude-plugins-official` cache.
- **[directly_supported]** No subagents were spawned by R2.
- **[directly_supported]** No plugin was installed, enabled, disabled, updated, scaffolded, or validated; no Claude settings/configuration were changed.
- **[directly_supported]** No interactive persisted Claude session was created; bounded model probes used `--no-session-persistence` and `--safe-mode`.
- **[directly_supported]** The only R2 write is this authorized research artifact.

