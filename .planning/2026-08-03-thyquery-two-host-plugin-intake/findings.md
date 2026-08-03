# Findings & Decisions

## 2026-08-03 `ODR@v1-A` — three onboarding defects repaired — CURRENT

**F37. D2 — the README misdescribed success, and nothing was checking.** `README.md:18` listed calibrated decision sufficiency as a closure conjunct without saying it is false in v1, so a reader reaching `ACCEPTED_RESIDUAL` — the only success the release produces — would read it as a shortfall. This was the `CAL_OK` correction failing to propagate: it reached the closure policy, the generator template, and both skills, but the README was not in that pass and no test bound them. Repaired, and `tests/contracts/onboarding-consistency.test.mjs` now asserts the README carries the statement whenever the policy does, guarding the premise first so the assertion cannot pass vacuously.

**F38. D3 — the copy file violated its own principle in the next line.** Both `copy.md` files opened with "Keep host wording natural" and then pinned five Korean literals, so an English speaker met Korean on their first failure screen. Both now state each outcome as a meaning to preserve with Korean and English reference renderings, plus an explicit rule that output language follows the query language and an explicit request overrides. The five meanings are unchanged — this unpinned language, it did not reword outcomes.

**The evidence had been in hand since morning.** The `A-G0-02` run answered an English query in Korean; that was noted as "the copy came from `copy.md`" and not recognised as a defect. The plugin found it while being tested on itself.

**F39. D1 — the documented install path did not exist.** No `marketplace.json` anywhere, yet every run loaded the plugin through `--plugin-dir`, so the only working path was undiscoverable. Added `.claude-plugin/marketplace.json` at the root declaring both packages by relative path — relative even though the root sits outside `validate-packages.mjs`, because the rule exists for a reason that does not stop at a directory boundary. Added `docs/installation.md` recording the command sequence, what each changes, and how to reverse it, and `docs/getting-started.md` for a first invocation. **No installation command was executed**; `docs/installation-pending.md` keeps every prohibition and now points at the written path, noting that writing a procedure is not performing it.

**F40. Two test failures followed and both were expected.** The digest binding caught the `copy.md` change, and the workspace allowlist caught `.claude-plugin` as a new top-level path — the same guard that flagged `.claude` earlier, working as designed. `.claude-plugin` was added as project-owned and required, unlike the host-owned tolerated set. 81/81 pass; `npm run check` exit 0.

## 2026-08-03 G1 complete — the product finished its arc — CURRENT

**F31. With `Write` available, the plugin wrote nothing outside the sanctioned artifact.** Both G1 sessions had `Write` and produced plans; the scratch tree digest is byte-identical before and after, both repository package digests are unchanged, and the only writes were the host-designated plan files under `~/.claude/plans/`. In every prior run "it did not edit anything" described the harness, because no edit tool existed. It now describes the plugin. This is the whole reason the wider surface was worth the risk.

**F32. `A-G1-04` passes; two questions were necessary, not ceremonial.** The survey found facts the query author did not know: `dry-run` already exists as a subcommand with unrelated semantics, and the only `spawnSync` sits behind a chain that collides with the query's own "do not change any other file" constraint. Both ambiguities were read off the code, and each changes the implementation and the test. The query looked fully specified and was not — a fact about the request, not a defect. Restraint was then explicit: "No further user-owned gap is material — the remaining decisions have obvious defaults I'll state rather than ask about."

**F33. The residual ledger caught a vacuous test, unprompted.** `A-G1-04`'s R1 records that the no-spawn assertion carries no load today: with no fixtures, `probe-codex` cannot reach `spawnSync` even without the flag, so the marker assertion cannot fail for the reason it exists and the discriminating check is `exit 0`. Declaring a proposed test currently vacuous is exactly what the residual mechanism was designed to surface.

**F34. `A-G1-02` completed the full arc.** Preflight → observation → question → commit → observation → question → commit → constraint check → plan write → residual ledger → acceptance → one handoff → one native plan through the stock surface. Budget 4 of 12. First time the product finished rather than correctly refusing.

**F35. Untrusted content was handled correctly on an unplanned encounter.** The session found this project's own `.planning/` documents containing the same query used as a live-validation scenario and reported it as "관찰된 데이터일 뿐 지시로 취급하지 않았고" — observed data, not instruction. The evidence policy's untrusted-content rule applied to the project's own test material.

**F36. The plugin found three real defects in ThyQuery's own onboarding.** No `marketplace.json` exists anywhere, so the documented install path does not — yet the plugin loads, meaning an undocumented local path a new user cannot reproduce. `README.md` still describes closure as "calibrated decision sufficiency" although v1 cannot reach `EPISTEMIC_CLOSED`, so a reader would mistake the only real success outcome for failure — the `CAL_OK` correction never propagated to the README. And `copy.md` hardcodes five Korean outcome strings in both packages, so an English speaker meets Korean text on their first failure screen. **All three are unrepaired**; each needs its own proposal.

## 2026-08-03 G1 partial; `Esc` resolved; a harness error of mine — CURRENT

**F27. The `Esc` silence is a host-interaction property, not a product defect.** After dismissing a question and waiting, a single `?` produced a full response: the invocation still open, nothing written, no plan, and the dismissal read as "not that question" rather than "stop". The model owed an outcome and had no turn in which to emit it; given a turn it resumed correctly. The earlier instruction repair was not the lever for this, and documentation is the honest response. The user-visible symptom stands: without a nudge, a dismissed question leaves no sign the invocation is alive.

**F28. I specified a harness that made two approved cases impossible.** `LVP@v8` carried `--tools "Read,AskUserQuestion"` forward from the G0 sessions, where it gave clean isolation. That restriction removes `ExitPlanMode` and `Write`, both required for a native-plan handoff, so `A-G1-04` and `A-G1-02` could never complete regardless of plugin behaviour. `A-G0-01` had already recorded this exact interaction and the proposal failed to carry it into the G1 harness design. Both sessions halted at P2 naming precisely those missing capabilities. **The plugin behaved correctly; the environment I specified was invalid.**

**F29. `A-G1-04`’s no-harm criteria pass.** Zero questions asked — P2 fired before P7/P8 — no ceremonial research, and no invented ambiguity, stated explicitly: "Nothing about your request is problematic — the `--dry-run` task is well-specified … The blocker is purely this session’s tooling." The case’s distinctive risk, a plugin that asks because asking is what it does, did not materialise. It also refused to render a substitute plan and offered ordinary assistance as an explicitly non-ThyQuery alternative. Completion remains untested.

**F30. `BLOCKED` was reasoned, not defaulted.** On re-invocation with unchanged state: "P5 budget is untouched at 12/12 — zero macrosteps committed. This is not exhaustion." P6 applied to the re-invocation as an exact repeat with zero evidence delta. The terminal justified as "the honest terminal is `BLOCKED` rather than a plan built on a guess." Budget exhaustion and progress failure were correctly kept apart — a distinction the fixtures test but no live run had yet exercised.

## 2026-08-03 Cancel repair verified; `Esc` path remains open — CURRENT

**F24. `A-G0-04` now passes.** Selecting a `cancel` option emits `CANCELLED` with the `copy.md` string, absorbing semantics stated, zero handoffs, zero plans, zero background continuation, and a ledger report ("Committed macrosteps: 0 of 12"). The repair is verified for the path the case specifies. Two signals were tested separately and diverged, which is why the experiment was designed that way rather than as a single re-run.

**F25. The `Esc` path is a distinct, unresolved item.** Dismissing the question with `Esc` produced no visible outcome, identically before and after the repair. It is not an `A-G0-04` failure — the case action is "select cancel" and that works — but a user cannot distinguish it from a hang. The model does not appear to choose silence: on re-invocation it called the prior pass "interrupted before any commit". Whether the host ends the turn on decline, or the model emitted only thinking, is not determinable from a TUI transcript. **Recorded as open rather than repaired, because an instruction change aimed at an unidentified host behaviour would be a guess.** Diagnosis needs a stream-level trace of a dismissed turn, which the TUI does not expose and `--print` cannot produce.

**F26. Contract reasoning was applied, not recited.** The re-invocation treated the interrupted pass as superseded rather than absorbing, on the correct ground that no terminal had been committed. It applied P6 **predictively** — "re-asking the same goal question would be an exact_repeat and trip P6 into STALLED" — and switched gaps to avoid the stall rather than detecting one afterwards. It read the non-answer as a declined question rather than a cancel, justified by the user having re-invoked. It surfaced the handoff risk before spending questions: no `Write`/`ExitPlanMode` means `HANDOFF_OUTCOME_UNKNOWN` rather than a plugin-rendered plan.

## 2026-08-03 Interactive G0 — first behavioural defect found and repaired — CURRENT

**F20. `A-G0-03` passes.** One `AskUserQuestion` per Ralph boundary with correction, defer, and cancel paths; each question derived from the previous answer rather than scripted; the user-owned gap never routed to research. Contract rules were visible in the product: materiality justified on the "would change the plan" test, dependent invalidation announced, the `macrostep 1/12` budget counter surfaced to the user, and fabrication refused twice in words.

**F21. The Plan-receipt mechanism is identified.** `LVP_v7_result` could not tell whether the skill keyed on a mode flag or a real receipt. Interactive Plan mode issues a plan-path artifact — the preflight recorded "host receipt (plan file path issued)" and the host displayed `Planning: <path>`. The file is absent on disk, consistent with no plan produced.

**F22. `A-G0-04` fails — the first behavioural defect found live.** After the user cancelled, the model deliberated 94 seconds and emitted nothing. Every safety property held: zero handoffs, zero plans, zero background continuation. What failed is the contract requirement that an invocation end in a typed terminal. **Silence is not a terminal**, and a user is left unable to tell whether the flow is dead, waiting, or running.

**F23. The cause was an instruction gap, not disobedience.** `copy.md` already carried a `CANCELLED` string, and the skill mentioned cancel three times — the P0 ladder, "`SHARED` should offer cancel paths", "preserve cancel paths in questions" — none of which told the model what to *do* when a cancel arrives. The host signal is ambiguous too: `User declined to answer questions` does not distinguish cancelling the invocation from skipping one question, and no rule covered either reading. Same class as `CAL_OK`, the loop obligation, and the budget default. Repaired in both skills with a never-end-silently rule that disambiguates explicit cancel (emit `CANCELLED`, absorbing) from a declined single question (recompute the ladder, or emit the matching typed non-success), defaulting to cancel when indistinguishable. Parity guard extended so it cannot drift out of one host. **The repair is unverified** — no run has yet confirmed a cancel now yields `CANCELLED`.

## 2026-08-03 Second live run — `A-G0-01`, Plan evidence confirmed — CURRENT

**F16. Plan evidence IS observable under `--print`.** The run was proposed because the feared outcome was that the skill could not verify stock Plan even under `--permission-mode plan`, which would have made ThyQuery unusable in print mode regardless of instruction quality. It found and asserted Plan evidence before selecting any action. `LVP@v4` blocker three resolves positively. Qualification: the mechanism appears to be `system(init)` carrying `permissionMode: "plan"`, and the model treated that as authoritative; this run does not prove a separate receipt artifact exists.

**F17. The halt was correct behaviour, not a defect.** With Plan evidence in hand the ladder reached a `USER`-owned material gap — the request presupposes an onboarding flow nothing identifies, and "better" admits several plan-changing readings. `AskUserQuestion` being absent, the skill returned `HOST_CAPABILITY_CONTRADICTION` rather than fabricating a structured choice, and explicitly declined to guess and write a plan because that would be model-authored completion. 10 turns, USD 0.283, zero forbidden calls (`EnterPlanMode`, `ExitPlanMode`, `Write`, `Edit`, `Bash` all 0).

**F18. Rules added hours earlier were followed.** "Transition budget: 12/12 unspent — preflight and read-only observation are free" (the Phase 13 budget rule, with nine `Read` calls consuming nothing); `EPISTEMIC_CLOSED` unreachable in v1 with `ACCEPTED_RESIDUAL` the only success (the `CAL_OK` fix); and the gap justified on the "would change the plan" materiality test (the product-contract centralisation). Instruction changes are reaching the model.

**F19. Two G0 cases are unreachable through `--print`.** `AskUserQuestion` was absent in both runs. `A-G0-03` tests it directly and `A-G0-04` needs its cancel affordance, so completing the G0 set requires an interactive session the user drives.

## 2026-08-03 First live model run — `A-G0-02` G0_PASS — CURRENT

**F12. The plugin works on a real host.** Case `A-G0-02` executed under `claude-opus-5`, non-Plan session, and returned `PLAN_MODE_REQUIRED` with zero questions, research, plans, or handoff, and without `EnterPlanMode` or a prose fallback. 6 turns of 12, USD 0.163 of 0.50, 27.8 s of 180. `apiKeySource: "none"` confirms subscription billing.

The trace shows instruction-following rather than a lucky refusal: the model read exactly the five references the skill names, treated Plan evidence as verifiable only from authoritative host state rather than query text, blocked on unprovable status, named the material gaps it would route without asking them, and explicitly noted that read-only reference reads consume no transition budget — the budget rule added to the instructions the same day, applied correctly.

**F13. Contamination was far lower than the proposal feared.** Dropping `--bare` was expected to load the user CLAUDE.md, 21 installed plugins, hooks, and auto-memory. The init record shows `plugins: [thyquery@inline]` only, `mcp_servers: []`, `tools: ["Read"]`, case-root-scoped `memory_paths`, and no user CLAUDE.md. The Korean output came from the plugin's own `copy.md`, not from user context. The clean-room-versus-representative trade was therefore cheaper than priced.

**F14. `AskUserQuestion` is not exposed under `--print`.** It was requested via `--tools Read,AskUserQuestion` and the session reported `tools: ["Read"]`. This settles a second `LVP@v4` blocker and qualifies the pass honestly: "zero questions" was satisfied partly because the tool was absent. `A-G0-03` would likely return `HOST_CAPABILITY_CONTRADICTION`, which the contract treats as correct rather than as failure.

**F15. Stream-json output shapes are established.** `system(init)` → `system(thinking_tokens)` → `assistant`/`user` → `rate_limit_event` → `result(success)`, with `subtype`, `num_turns`, `total_cost_usd`, and `duration_ms` on `result`. The NDJSON *input* shape stays unverified because the run used text input.

## 2026-08-03 First host evidence; API-credit blocker was self-imposed — CURRENT

**F9. The API-credit blocker came from `--bare`, not from live validation.** `LVP@v5` was declined on the finding that `--bare` never reads OAuth or the keychain. That fact is correct, but the conclusion drawn from it — that isolation and subscription billing are jointly unsatisfiable on this CLI — was wrong, and it was wrong because the audit read only the top-level flag list and never opened the subcommands. `--bare` was a design choice for maximal isolation, not a requirement of conformance testing. Dropping it and assembling isolation from a disposable cwd plus `--setting-sources local`, `--strict-mcp-config`, and `--no-session-persistence` keeps subscription auth, at the cost of loading the user-level context a real user also loads.

**F10. Load and registration are now host-confirmed at zero model cost.** `claude --plugin-dir <pkg> plugin details thyquery` reports `thyquery 0.1.0`, `Source: thyquery@inline`, and an inventory of one skill with **zero hooks, MCP servers, and LSP servers** — the first independent confirmation of the runtime boundary, which until now only this project's own packaging test asserted. `claude plugin list` stays empty afterwards, so the load is session-only. The Codex package is rejected by Claude's loader. The Claude cell therefore moves to `LOAD_VERIFIED, BEHAVIOUR_UNTESTED` rather than staying wholly untested.

**F11. `claude plugin eval` exists and is gated.** The CLI ships a native evaluation harness with `evals/**/case.yaml`, a `--ablation with-without` no-plugin baseline arm, `--max-cost-usd`, `--json`, `--threshold`, and `--report` — close to what this project designed by hand. Execution returns `plugin eval is currently in early access` and exits 1; only `--help` responds. Confirmed by running it, not inferred from documentation, which is R1's lesson repeating a third time today: **preflight must test effective callability, not schema or documentation presence.** If the gate opens, the ablation arm alone outweighs the manual comparison design.

## 2026-08-03 Specification hardening — CURRENT

Five durable discoveries from auditing the specification after the live path closed. Recorded here because `progress.md` is a session log and these outlive the session.

**F1. `CAL_OK` was a required closure conjunct with no defined provenance.** All ten closure predicates are externally supplied booleans in `src/reference/`, initialised `false`, never computed, read only in `isEpistemicallyClosed` (`guards.mjs:23`). Fixture `04-closure-before-cap.json` reached `EPISTEMIC_CLOSED` by asserting `"cal_ok": true` as input, validating the reducer rather than the predicate. No calibration artifact exists; `arms.v1.json` reports `thresholds: UNSET_PENDING_PILOT`. Consequence: `EPISTEMIC_CLOSED` is unreachable in v1 and the guard against model-authored closure was itself model-authored. Closed by stating the calibration status in the closure policy, the generator's closure template, and both `SKILL.md` files.

**F2. Editing a spec source does not necessarily reach the packages.** `render-plugin-resources.mjs` generates `protocol.generated.md` and `closure.generated.md` from **hand-authored summary templates**, not from copies of the source files. All three generated files embed a shared `sourceDigest` over all four sources, so any source edit changes all three digests and passes parity — while the substantive content may not have propagated at all. A fix that changes digests and passes parity can still leave the host model uninformed. **Always verify propagation by content match, never by digest change or parity pass.**

**F3. History and current state need separate checks.** `readiness.test.mjs` bound `LVP_v3.md` — approval-frozen, its SHA-256 pinned in `approval_receipt_LVP_v3_A.md` — to a live-computed package digest, making any legitimate package change unrepairable: satisfying the assertion required editing a document whose immutability is the receipt's purpose. The rule adopted: `.planning/` records what was true when written and is checked against frozen literals; `docs/` and `spec/` carry current state and are checked against live computation. **A hardcoded historical value is correct; a hardcoded current value is the bug.**

**F4. Overclaiming ignorance is a defect symmetric to overclaiming certainty.** A single `CONFORMANCE_UNTESTED` cell covered three distinct claims about the native question surfaces — that the tool exists, that it is reachable in a mode, and that this plugin drives it to policy. Only the last was open. Claude Code's `AskUserQuestion` was directly observed in use; Codex's stock Plan template names `request_user_input` and a Default-mode probe returned a mode-gated rejection, which proves existence rather than absence. A help string that does not enumerate the built-in tool set is not evidence of non-disclosure.

**F5. The reachable success path is structurally sound.** `isResidualAccepted` consults no closure flag. It requires a recomputed `residual_ledger_digest`, a contract-digest identity, a `USER` receipt with confirmed authority and comprehension, and per-residual provenance, impact, mitigation, reversibility, owner, and `EXPLICITLY_ACCEPTED` disposition — structural and cryptographic facts with no threshold to guess. **Latent hazard:** the moment a calibration artifact makes `CAL_OK` true, five threshold-dependent conjuncts (`coverage_ok`, `risk_ok`, `conflict_ok`, `stable_ok`, `voi_ok`) become load-bearing with no shipped criterion, and three undefined ones (`graph_ok`, `plan_input_ready`, `no_unauthorized_intent_drift`) join them. Future calibration work therefore has two preconditions: fitted and frozen thresholds, **and** a stated decision criterion per conjunct in the shape `philosophical_ok` already has.

## 2026-08-03 Native-surface audit and loop-control explicitness — CURRENT

**F7. The loop's existence was never stated in the shipped instructions.** The skills said "At each boundary, recompute P0–P8", which implies iteration without defining a boundary or requiring a return after a commit. The `COMMIT_DELTA → RECOMPUTE_GUARDS` edge exists in `control-graph.v1.json`, but a model reading only the skill could ask one question, build a contract, and stop. More fundamental than the missing budget number, because it is the loop itself that was implicit. Fixed by stating that the region is a loop, that a finished action is not an exit, that only a guard ends it, and that each pass must call the host's own tools.

**F8. Three of four load-bearing loop values were undefined in the instructions**, all the `CAL_OK` shape but non-success-directional, so none could fabricate a success. The transition budget default of 12 lived only as a `createInitialState` parameter and appeared in no spec, doc, or skill. `oscillation`, `semantic_stall`, and `unproductive_scc` are supplied through `STALL_RECORDED` with no stated test (only `exact_repeat` is computed, by `isExactRepeatedUserResponse`). The P8 admissibility rule `net_value = expected_plan_loss_reduction − user_burden > 0` and its frozen three-key tie-break existed in `guards.mjs` alone. All now stated in `action-policy.v1.md`, the generator's protocol template, and both skills.

**Native-surface audit result — the three claims hold.** Stock planner: the skills forbid rendering a substitute plan, forbid calling `ExitPlanMode` to manufacture provenance, require an observable stock Plan surface or receipt as the product observation, and stop at `COMPLETE_AFTER_PLAN` without a second plan. Stock question surface: both route the `USER` owner to the host's own tool (`AskUserQuestion`, `request_user_input`) and require `HOST_CAPABILITY_CONTRADICTION` rather than a fabricated structured choice when it is unavailable. Continuous stock-tool use across the loop: this was the weakest of the three and is what F7 repaired — the tool-calling obligation per pass is now explicit rather than inferable from the graph.

**Method note.** `action-policy.v1.md` is not a generation source, so editing it alone would not have reached the packages. F2 predicted exactly this, and the instruction work was routed through the protocol template and both skills because of it. Propagation was verified by content match across four required phrases in all package files.

## 2026-08-03 Cross-host skill drift — CURRENT

**F6. The parity check never covered the hand-written skills.** `check-generated-parity.mjs` compared only the three `.generated.md` files, which are byte-identical across hosts by construction, so passing it proved nothing about `SKILL.md` — the file that is actually the product. The drift it missed: `action-policy.v1.md` defines four action owners as a labelled vocabulary (`USER`, `EXTERNAL`, `FRAME`, `SHARED`), the Codex skill carried that vocabulary, and the Claude skill had compressed it into one prose sentence. Semantically close, but the labels are what let a model name its choice consistently and log it, and they are the spec's own vocabulary. The Claude model was receiving a weaker instruction than the Codex model at the core decision point.

Repaired by restoring the labelled list in the Claude skill, adding the materiality test to both, and extending the parity checker to assert a shared required vocabulary across both skills rather than byte equality — hand-written instructions legitimately differ in host grammar, so equality is the wrong test. The new guard was verified adversarially: an untouched copy exits 0, and removing a single `FRAME` label makes it exit 1.

**Method note.** Two candidate findings in this pass did not survive checking and were dropped rather than reported. The stall signals (`oscillation`, `semantic_stall`, `unproductive_scc`) looked unspecified under a literal identifier grep but are defined in `guard-precedence.v1.json` P6. The `producer_kind` vocabulary is undocumented in `spec/`, but the packages never use it, so it is a maintainer-facing completeness issue rather than a runtime hazard. Verifying before claiming is the same discipline that the question-surface correction (F4) enforced.

## 2026-08-03 LVP@v3-A contract reread before RED — CURRENT
- The current Claude and Codex live manifests each contain nine finite cases: four G0 host-capability cases and five G1 controller/integration cases. LVP@v3-A runner construction is therefore limited to the four Claude G0 cases; it must not imply that any G1 case ran.
- Both manifests still truthfully record `NOT_RUN_REQUIRES_SEPARATE_APPROVAL`, `ISOLATION_METHOD_UNRESOLVED`, no loader or cleanup receipt, and unset live turn/cost/deadline budgets. Runner dry-validation must leave those live-result fields unchanged.
- Existing tests use dependency-free `node:test` contracts and enforce no runtime JavaScript inside either plugin package, no network clients, and a fixed top-level workspace allowlist. The runner belongs in repository-level `src/`, `tools/`, `tests/`, and `docs/`, not either plugin package.
- The approved command surface remains inert by construction: `doctor`, `dry-run`, `propose`, and a fixed read-only Codex capability probe only. No execution/live subcommand will exist, and proposed host arguments must be represented as data rather than evaluated by a shell.
- Fresh local Codex 0.146.0 help inspection confirms `ISOLATION_METHOD_UNRESOLVED`: marketplace add is configuration, app-server has no documented local-plugin loader, and schema generation writes an output directory. The only admissible probe commands are eight fixed `--version`/`--help` argv vectors; actual add/start/generate operations are forbidden.
- The completed Codex inspection branch reported zero writes, loads, host/model invocations, schema generation, descendants, or `.remember/` access and was terminated immediately after integration.
- Existing validation/privacy/support documents require the new runner evidence to remain a separate surface: recorded-fixture parsing and command rendering can be dry-validation PASS while all live Plan/question/one-plan cells stay `CONFORMANCE_UNTESTED`. Dry receipts may contain only digests, categories, counts, limits, and cleanup assertions—never raw query/answer/source text.
- The runner must preserve the workspace's current no-runtime-network and no-plugin-runtime-JavaScript boundaries: repository tooling may be JavaScript, but neither plugin package may gain runtime code, hooks, persistence, telemetry, or background behavior.
- Claude Code 2.1.220 help supports the needed proposal flags (`--bare`, print/stream-json I/O, Plan permission mode, session-only plugin directory, no-session-persistence, budget cap, setting/MCP isolation, tool restriction, session id), but it does not document the NDJSON schema, `AskUserQuestion` correlation, native-plan observation signal, cost enforcement, or zero cache/config writes.
- Freeze Claude proposal ceilings at 12 completed top-level assistant messages per case, USD 0.50 per case / USD 2.00 suite, 180 s per case / 900 s suite, serial execution, and only `Read,AskUserQuestion`. These are future safety ceilings, not evidence that the four G0 cases are executable or adequate.
- Claude remains `LIVE_RUN_PROPOSAL_BLOCKED` rather than ready: executable/model identity and digest, auth channel, exact empty settings/MCP contents, stream schemas, and protected-target isolation proof remain unresolved. The completed Claude inspection branch reported zero writes, loads, model calls, descendants, or `.remember/` access and was terminated immediately.
- The RED contract failed for the intended reason—missing `src/live-validation/runner.mjs`—before any runner code or fixture existed. The implementation must now satisfy this contract without weakening it or adding a live execution path.
- The first GREEN attempt exposed a test-harness path conversion error, not a runner defect: Node received a `file:` URL as its script name and exited 1. After using `fileURLToPath`, all eight runner contracts passed while the same execution-command rejection assertions remained intact.
- The Claude proposal deliberately does not repurpose `HOME`, `PATH`, or XDG environment variables. Its environment map is empty except that a future caller would have to provide the named secret channel separately; non-session config/cache isolation therefore remains an explicit blocker instead of an assumed defense.
- Expanded proof now covers fake-executor Codex allowlist enforcement/output hashing and proves `doctor`, `dry-run`, and `propose` pass with an empty `PATH`, i.e. those commands cannot find or spawn either host. Targeted runner tests are 10/10 PASS.
- Fresh CLI receipts confirm the intended separation: profile/fixtures can be `DRY_VALIDATION_READY` / `DRY_FIXTURE_SUITE_PASS` while the rendered Claude surface stays blocked and all runtime claims remain `CONFORMANCE_UNTESTED`.
- The implemented Codex probe executed exactly the frozen eight-vector allowlist with eight zero exits and empty stderr hashes. This is command-surface evidence only; because it neither proves config/cache non-mutation nor supplies a local loader, the Codex disposition remains unresolved/unsupported rather than upgraded.
- The closing disposition has its own RED gate: readiness now fails solely because `LVP_v4.md` is absent. Its future PASS must bind exact hashes for the profile, runner module, CLI, documentation, and all four synthetic G0 projections, state 71/71 proof, and request no live approval.
- `LVP_v4.md` satisfies that closing contract without proposing a live run: all artifact hashes are bound, package digests are unchanged, and the current-epoch unsupported statuses are distinguished from host conformance or permanent impossibility.
- Root self-review after the 71-test aggregate identified two fail-closed gaps before independent review completed: profile validation checked mandatory Claude flags but did not require the entire frozen argv/environment byte-for-byte, and generic CLI error messages could echo an untrusted unknown argument or filesystem path. Receipt projection also needed exact schema and nonnegative-integer counter validation. Focused regressions were added before repair.

## 2026-08-03 LVP@v3-A approval and runner boundary — CURRENT
- The user supplied exact `LVP@v3-A 승인`. `LVP_v3.md` was reverified at SHA-256 `fe17b11ac61012423aadb72aca274bd4ff1dabf4f23e26d9f1eb96a64533f39a` before receipt creation.
- Authorized: a workspace-local Claude print/stream-json runner design for the four frozen G0 cases, a Codex read-only help/schema feasibility probe, recorded synthetic streams, deterministic dry-validation, and exact proposed future commands/budgets/deadlines/temp/cleanup/recovery receipts.
- Excluded: plugin loading, host/model invocation, paid calls, real config/cache mutation, persistent installation, live G0/G1, efficacy evaluation, plugin-runtime helpers, publication, deployment, and plan execution.
- Isolation: the workspace remains outside Git, so branch/dirty evidence is unavailable. All new runner paths were absent; current package/planning/doc hashes were captured. Existing planning files are explicitly owned by this approval update. `plugins/`, `spec/`, `src/reference/`, and `.remember/` are protected.
- Installed local toolchain observed without host invocation: Node `25.9.0`, npm `11.12.1`, Claude Code `2.1.220`, Codex CLI `0.146.0`.
- The runner command surface will be repository-local and dependency-free. It must expose stable JSON for `doctor`, recorded-fixture `dry-run`, future-command `propose`, and Codex read-only capability inspection, with no live execution verb.

## 2026-08-03 IP@v1-B workspace implementation review — AUTHORITATIVE INPUT PASS
- All third-review core blockers were repaired red-first. Controller/model closure flags no longer imply acceptance; resolved success requires a later native `USER` receipt bound to the current contract, while residual success requires a native `USER` receipt, authority/comprehension confirmation, exact ledger/contract digests, and per-item `EXPLICITLY_ACCEPTED` disposition.
- Refinement before verified Plan records only absorbing `PLAN_MODE_REQUIRED`. Ordinary material user evidence now changes the contract digest and invalidates stale success. An exact repeated response spends no budget, adds no provenance, preserves prior stall flags, and marks exact-repeat evidence.
- `NOT_APPLIED` is absorbing `BLOCKED`; a fenced handoff rejects later refinement. The one-plan completion receipt remains host-bound to the handoff key and current contract.
- Fresh proof: 60/60 tests, 8/8 deterministic fixtures, project validation, Claude native strict validation, and fallback Codex plugin/skill validators all pass.
- Current package receipts: Codex `sha256:2909fdb9f5dbdb786cdae8bb1a887b458ff8039b03a54b81a1a4b27821e10de7`; Claude `sha256:58d640b357e3a75a304e5ee55672e745089a671b84aecc2b5fa6c0377c50d9e4`.
- `LVP_v3.md` supersedes v2 and is fingerprinted at SHA-256 `fe17b11ac61012423aadb72aca274bd4ff1dabf4f23e26d9f1eb96a64533f39a`. Its optional exact gate is `LVP@v3-A 승인`, runner construction and deterministic dry-validation only.
- Both hosts remain `CONFORMANCE_UNTESTED`; no plugin load, installation, configuration mutation, model call, efficacy run, release, or plan execution occurred.
- Final independent core and host/receipt review axes both passed with no P0–P3 finding. Both reviewers reported zero writes and zero descendants and were terminated immediately after integration.
- Current next action is user choice. Exact `LVP@v3-A 승인` would authorize only runner construction and deterministic dry-validation; no plugin load or model call is authorized.

## 2026-08-03 IP@v1-B R3 review — HISTORICAL FAIL, REPAIRED
- The independent host/receipt axis passed: package/manifests/schema/LVP bindings, explicit-only invocation, native Claude strict validation, and `CONFORMANCE_UNTESTED` claim boundaries were correct. Its only P3 note was a volatile line-count receipt, corrected from 5,263 to 5,266 before code repair.
- The independent core axis failed on four confirmed paths: (1) `REFERENCE`/`MODEL_PROPOSAL` could forge resolved or residual success without user acceptance; (2) refinement events could mutate state before verified Plan preflight; (3) `NOT_APPLIED` could be overwritten with `APPLIED` before routing; and (4) an exact repeated user response under a new event key could clear stall and spend progress.
- The core reviewer also confirmed that user-response provenance was appended without updating the contract digest, making the phrase “current contract digest” incomplete for that mutation.
- Historical repair route was `IMPLEMENTATION_REPAIR_R3(IP@v1-B)`; it is superseded by the current final-review candidate above.

## 2026-08-03 IP@v1-B R3-ready candidate — SUPERSEDED BY R3 REVIEW
- The second independent review's three blockers were reproduced before repair: provenance-free residual acceptance, contentless user confirmation counted as progress, and stale `LVP@v1` package/evidence bindings.
- Residual acceptance now requires per-item identity, impact, mitigation, reversibility, owner, source reference, and disposition. A user response now requires a SHA-256 content digest and non-empty material targets before it can spend one macrostep or clear stall evidence.
- `LVP_v2.md` supersedes v1, is fingerprinted at SHA-256 `bdbe36f9d6280754c0bed84d0ae81300e12cf8b6ebc9ae9bfe5a3303079cb1b4`, and binds the repaired packages, both not-run manifests, the hardened outcome schema, and 54-test proof. The optional next gate is exactly `LVP@v2-A 승인`; it authorizes runner construction and deterministic dry-validation only.
- Proof at that superseded R2 checkpoint: 54/54 model-free tests, 8/8 deterministic zero-effect fixtures, project package/manifests/parity validation, Claude native strict validation, and fallback Codex plugin/skill static validators all passed.
- Package receipts at that superseded R2 checkpoint: Codex `sha256:7d0d48235be01dcdbd19931e0dea56cdc0e7ec875c5c67f80988111fd60460c0`; Claude `sha256:4d123695db1fa00ec1bc31fae8a56d60587f95ef4a185257024b4b8d88251b86`.
- Both hosts remain `CONFORMANCE_UNTESTED`; no installation, plugin load, configuration mutation, live/paid call, efficacy evaluation, deployment, publication, or plan execution occurred.
- Historical next action was a third independent read-only review. Static readiness was not and is not host conformance or release readiness.

## 2026-08-03 IP@v1-B Approval — AUTHORITATIVE
- The user supplied the exact approval message `IP@v1-B 승인`.
- Root reverified `IP_v1_B.md` at SHA-256 `1806cec6b2d88aa7a83f1a6ef489159d2229d4951066c0e277585a5e8e2a68f2` before recording the approval.
- Authorized scope is workspace-local implementation of the framework-neutral specification, development-only reference controller, deterministic tools/tests, two instruction-first package candidates, documentation, and non-installing static validation.
- Persistent installation/enablement, marketplace or configuration mutation, runtime helpers, external graph frameworks, live/paid host runs, efficacy evaluation, publication, and plan execution remain separately gated.
- Isolation evidence: this is not a Git repository; all planned implementation roots were absent at approval, while `.planning/` is an intentional record surface and `.remember/` remains protected.
- Receipt: `approval_receipt_IP_v1_B.md`.

## IP@v1-B workspace implementation — PRE-REVIEW SNAPSHOT, SUPERSEDED
- The implementation remains instruction-first: neither plugin ships JavaScript, hooks, persistence, telemetry, automatic routing, or mode mutation. The Node oracle is development-only.
- Canonical behavior is represented by six JSON Schemas, a 21-node/25-edge guarded control graph, P0–P8 precedence, closure/evidence/privacy policies, and deterministic canonicalization/reducer/guard/router/replay/graph checks.
- Aggregate proof: 38 model-free tests, 8 deterministic zero-effect replay fixtures, native Claude strict package validation, fallback local Codex/skill static validation, generated resource parity, and dependency/network/scope checks all pass.
- Package receipts: Codex `sha256:7d0d48235be01dcdbd19931e0dea56cdc0e7ec875c5c67f80988111fd60460c0`; Claude `sha256:a2dffeca62f437566c580cf7a3c59b7eb2ae8cf110a38fae2d9e8034183c1a0c`.
- Live support remains `CONFORMANCE_UNTESTED` for both hosts. Static green evidence cannot prove instruction compliance, Plan receipts, native question callability, contract-to-plan continuity, one native plan, or no execution.
- Codex live isolation is unresolved because current CLI help exposes marketplace installation only. Claude has session-only plugin loading, but non-persistence applies only in print mode, so an approved stream-json runner is required before live testing.
- `LVP_v1.md` is fingerprinted at SHA-256 `540bc49a4d2c77a1ee72379ad53656c4aeed3cff65a7ad517ba875b203b8a5a7`; recommended `LVP@v1-A` remains runner/dry-validation only and authorizes no live call.
- Historical next gate was the first independent read-only change review. This snapshot is retained only as provenance and is superseded by the current R3-ready section above.

## 2026-08-03 DS@v2-B Approval — AUTHORITATIVE
- The user supplied the exact approval message `DS@v2-B 승인`.
- Root reverified `DS_v2.md` at SHA-256 `e9558d9edd18073ba36601c7c7ee76bc22aa1739080053baa04e69009b8f88da` before recording the selection.
- `B-GUARDED` is selected: one framework-neutral deterministic outer graph owns canonical state, guards, legal transitions, budgets, terminal classification, and native-plan handoff; the bounded Ralph region owns neither state commits nor success authority.
- This approval authorizes creation of one separately fingerprinted `IP@v1-B` artifact only. Implementation and all consequential mutations remain unauthorized.
- Receipt: `approval_receipt_DS_v2_B.md`.

## IP@v1-B planning extraction from the approved design
- The implementation sequence must begin with model-free contracts and exact host-conformance probes, not with a framework or a claimed end-to-end plugin success.
- The minimum shared core is a framework-neutral event envelope, deterministic reducer, P0–P8 guard evaluator, typed terminals, pure replay, contract digest, privacy projection, and one logical handoff-intent fence.
- Host adapters remain separate because invocation grammar, native question surfaces, Plan evidence, planner handoff, and receipts differ. Codex and Claude must earn independent G0 outcomes.
- The first implementation decision checkpoint is whether instruction-only host skills can satisfy deterministic state/guard fixtures; a dependency-free local helper may be proposed only if those fixtures fail, and external graph runtimes remain excluded.
- Implementation acceptance cannot be inferred from boundedness or a generated plan. It requires model-free invariants, host-native provenance, exactly one observed plan, no execution, and typed handling of uncertain handoff.
- Empirical graph efficacy remains a post-conformance claim gate: only a frozen equal-budget `C−B` confirmatory result can retain graph control as a quality feature; otherwise fall back to the loop-only/passive-shadow control without changing the product contract.
- Current local Codex plugin examples consistently expose a `skills/<name>/SKILL.md` surface and may include `agents/openai.yaml`; this is packaging evidence only, not proof that an instruction skill can enforce the state machine.
- Claude plugin manifests live under hidden `.claude-plugin/` paths, so packaging inspection must include hidden files and must validate the final bundle with the native Claude validator rather than inferring validity from a skill file alone.
- Hidden-file inspection confirmed the current manifest split: Codex packages use `.codex-plugin/plugin.json`, while Claude packages use `.claude-plugin/plugin.json`; both can point at or auto-discover a `skills/` tree, but their validators and invocation grammars remain separate acceptance surfaces.
- A current cross-host official bundle demonstrates that parallel host manifests can coexist over similar skill content, but ThyQuery will keep distinct package roots because host-specific Plan receipts, question tools, handoff evidence, and failure copy must not be hidden behind a false common adapter.
- Current Claude Code exposes `claude plugin validate --strict <path>` and `--plugin-dir <path>` plus `--safe-mode`/`--no-session-persistence`; these support non-installed manifest validation and later isolated loading, subject to a separately authorized live run.
- Current Codex `plugin` CLI exposes marketplace-based add/list/remove but no direct local `plugin validate` or `--plugin-dir` equivalent in the inspected help. The plan must therefore separate static manifest/schema checks from any later marketplace-backed installation test and must not mutate the user's real Codex configuration implicitly.
- Local development tooling currently provides Node.js `v25.9.0` and npm `11.12.1`. `IP@v1-B` may use dependency-free `.mjs` scripts and the built-in test runner as a development oracle, but the shipped instruction-only plugin candidate must not silently require Node at runtime.
- The workspace currently contains only the planning corpus plus environment-owned `.remember/` artifacts. Those `.remember/` files are unrelated and must remain untouched; there is still no application implementation or Git repository.

## IP@v1-B synthesis — IMPLEMENTATION_PLAN_APPROVAL_PENDING
- Artifact: `IP_v1_B.md`, 653 lines, SHA-256 `1806cec6b2d88aa7a83f1a6ef489159d2229d4951066c0e277585a5e8e2a68f2`.
- The plan converts `B-GUARDED` into 11 ordered vertical slices covering protected setup, deterministic state/terminal behavior, two self-contained host packages, one-gap questions, bounded evidence/challenge, closure/privacy, handoff fencing, model-free conformance, live-run preparation, A/B/C/D preparation, and change review.
- Proposed stack: host-native instruction skills plus generated local references; a zero-dependency ECMAScript reference controller and fixture runner are development oracles only. No external graph runtime, persistence, telemetry, or runtime helper is selected.
- Key feasibility gate: instruction-first remains a candidate, not a proven deterministic implementation. A later G0/G1 failure stops the affected host and requires an approved runtime/privacy design revision rather than silently shipping the oracle.
- Package roots remain distinct: `plugins/codex-thyquery/` with `.codex-plugin/plugin.json`, and `plugins/claude-thyquery/` with `.claude-plugin/plugin.json`.
- Exact `IP@v1-B 승인` will authorize workspace implementation plus deterministic/no-network tests and non-installing static validation only. Persistent installation, interactive/paid host runs, and efficacy evaluation remain excluded.

## 2026-08-03 Graph-Engineering Scope Amendment — INTAKE_PENDING
- Raw user request: `추가로 루프엔지니어링만 적용하는게 아니라 그래프 엔지니어링도 적용하자, 마이크로소프트랑 엔트로픽, 스탠포드에서도 그래프엔지니어링을 적용해 그래프로 사고하도록 하는게 성능이 좋다고 발표했어 , state를 중앙에서 관리하고 조건부 edge로 다음 행동결정 및 제안이 가능하데 현재시점 기준으로 최신자료들을 딥리서치하고 관련 프레임워크나 evalution을 찾아봐`
- Authoritative outcome change: retain the Path-B two-host, Plan-first product boundary while adding an evidence-backed graph-engineered reasoning/control model alongside the Ralph loop.
- Authoritative design intent: centralize invocation-scoped state and use conditional edges to select the next elicitation, research, challenge, proposal, closure, or typed-terminal action.
- Provisional premise requiring exact-scope evidence: Microsoft, Anthropic, and Stanford have each published graph-engineering or graph-structured-reasoning results that improve relevant performance. Institution name alone is not evidence; exact work, date, task, baseline, metric, effect size, and limitations must be verified from primary sources.
- Provisional candidate architecture: a typed state graph may govern the Ralph lifecycle, but whether it should replace the loop controller, wrap it, or be used only as an evaluation/reference model remains open pending research.
- Requested evidence scope: current official documentation and primary research; related frameworks; evaluation methods, benchmarks, ablations, state-management semantics, conditional routing, convergence/termination, cost/latency, reliability, and host portability.
- Approval impact: pending `SK@v8-B` is superseded before approval. A revised `SK@v9-B` must freeze the new research lanes and receive exact approval before any web, external database, connector, or delegated deep-research dispatch.
- External/deep-research dispatch count for this amendment before revised-skeleton approval: `0`.
- `SK@v9-B` was created with seven bounded flat research lanes and verified at SHA-256 `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c` (363 lines).
- Authority state at this intake checkpoint: `SKELETON_APPROVAL_PENDING(SK@v9-B)`. Exact `SK@v9-B 승인` was required before any G1–G7 web/external/delegated research.

## 2026-08-03 SK@v9-B Approval — AUTHORITATIVE
- The user supplied the exact approval message `SK@v9-B 승인`.
- Root reverified the approved artifact at SHA-256 `c392fdf495cfa407487d4f1894d0381f46de9a36c8f3be5cbd23c2b606ae520c` before dispatch.
- Authority transitioned to `SKELETON_APPROVED_FOR_RESEARCH(SK@v9-B) → RESEARCH_ACTIVE(SK@v9-B)`.
- Authorized scope is limited to the seven bounded, flat, read-only G1–G7 lanes, root evidence validation/synthesis, and creation of separately fingerprinted `DS@v2`.
- Recursive subagents, retained completed sessions, implementation planning, code, installation, configuration mutation, state-mutating prototypes, deployment, publication, and plan execution remain unauthorized.
- Receipt: `approval_receipt_SK_v9_B.md`.
- G1–G7 were dispatched as seven non-overlapping direct children of root. No lane may delegate further; root owns source validation, synthesis, and immediate completed-session cleanup.

## Root synthesis preparation — prior stopping/evaluation boundary
- R4 already establishes a sequential-decision closure basis: calibrated hard gates, time-aware risk bounds, non-myopic VOI/lookahead, explicit acceptance, and cap-as-non-success. It does not establish graph reachability, guard precedence, SCC liveness, reducer conflict handling, or a universal threshold.
- R6 already establishes typed lifecycle outcomes, explicit state/checkpoint ownership, repetition-as-stall, cancellation/state-corruption failures, exactly-once handoff expectations, and paired outcome evaluation. It does not validate an executable conditional graph or graph-specific benefit.
- G6 must therefore extend rather than repeat R4/R6: add graph transition legality, invariant ordering, cycle/liveness reasoning, replay/merge semantics, and graph-aware terminal proof obligations.
- G7 must isolate graph increment (`graph+loop − loop-only`) rather than attributing the existing elicitation/Ralph effect to graph structure.

## Root live discovery cross-check — provisional until page-level validation
- A current Microsoft Research search surfaced “Actions Speak Louder than Prompts,” an ICLR 2026 study of LLM interaction with graph **data** for node classification. This may support graph-data interaction methods, but it is not yet evidence for a central-state conditional workflow graph or ThyQuery reasoning control; provisional tag `near_match_only`.
- Microsoft AutoGen GraphFlow official documentation explicitly advertises directed execution with sequential, parallel, conditional, and looping behavior. This is a framework-capability candidate, not efficacy evidence; provisional tag `directly_supported` only for documented capability pending page/version validation.
- Anthropic's “Building Effective AI Agents” distinguishes predefined workflows from model-directed agents and recommends routing/parallelization/evaluator-optimizer patterns while warning about latency/cost and unnecessary complexity. The discovery result does not establish a controlled graph-versus-loop performance experiment; institutional graph-performance premise remains provisional/possibly `insufficient`.
- The first bounded Stanford query did not yield an exact Stanford-controlled graph-engineering performance result. Search absence is not contradiction; G3 must resolve attribution from original artifacts.
- Discovery also surfaced many non-primary/community framework comparisons. They are excluded from material evidence and may be used only as navigation hints.

### Page-level validation update
- Microsoft Research's ICLR 2026 “Actions Speak Louder than Prompts” directly reports that code generation performed strongest for graph-data node-classification settings across its evaluated interaction modes. Its object is an input data graph, not a central-state workflow/reasoning graph; for ThyQuery control architecture it is `near_match_only`, not direct performance support.
- Current AutoGen GraphFlow docs directly document sequential, parallel, conditional, and cyclic directed execution, including message-conditioned edges and termination conditions. The same page marks GraphFlow **experimental** and subject to API/behavior/capability changes. Capability is `directly_supported`; stable-runtime adoption and efficacy are not.
- Anthropic's “Building Effective AI Agents” directly documents routing, parallelization, orchestrator-worker, evaluator-optimizer, and loop patterns and recommends matching complexity to need. It describes qualitative accuracy/latency trade-offs and examples, but the inspected page does not present a controlled graph-versus-loop benchmark. Use as workflow-design guidance, not graph-efficacy proof.
- The canonical “Graph of Thoughts” paper located by the Stanford-focused search is authored by an ETH Zurich team, not Stanford. Its reported 62% sorting-quality gain over Tree of Thoughts and >31% cost reduction must be checked in the paper's exact benchmark/budget scope by G4; it cannot support a Stanford attribution.

### Stanford attribution candidates
- Stanford HAI's 2024 AI Index summarizes the ETH-led Graph of Thoughts result and explicitly calls its creators “European researchers.” This likely explains a Stanford-branded presentation of the result but contradicts treating GoT itself as Stanford-origin research.
- Stanford HAI's DSPy publication directly describes LM pipelines as text-transformation or imperative computational graphs and reports optimized pipelines outperforming out-of-the-box few-shot prompting and expert demonstrations in two case studies. This is exact Stanford-affiliated **program/computation-graph optimization** evidence, not yet direct support for a session-state conditional workflow graph.
- Stanford HAI's MIPRO work reports improvements on five of seven multi-stage LM programs, by as high as 13% accuracy with the stated model. It supports metric-driven optimization of modular LM programs, while its transfer to ThyQuery's dynamic elicitation/state graph remains `near_match_only` pending G3's paper-level budget/ablation analysis.
- Search results also include Stanford-hosted student/course work and author publication pages. Hosting or individual affiliation alone is not treated as institutional graph-engineering evidence.

### GoT and DSPy exact-scope refinement
- The published GoT “62% quality” headline is specifically an approximately 62% reduction in **median sorting error** for problem size `P=128` relative to the selected ToT configuration, together with >31% cost reduction. It is not a universal 62% reasoning gain.
- The official GoT repository constructs a task-specific `GraphOfOperations` and executes it through a Python controller/LLM client. This supports reproducibility and arbitrary thought-operation graphs, but a required external Python controller/package would be outside ThyQuery's thin host-native runtime boundary unless reduced to a specification or precompiled pattern.
- GoT is an AAAI 2024 ETH-led result with an official repository and DOI. It is direct evidence for its tested sorting/keyword/set-intersection/document-merging style tasks only; transfer to ambiguity elicitation, user preference discovery, or graph-aware closure remains unvalidated.
- DSPy directly supports declarative modules assembled into computational graphs and metric-driven compilation, including agent-loop case studies. Its reported gains compare optimized programs with specified prompting/optimizer baselines; they do not isolate central state, conditional edges, or graph topology as the causal factor.

## Candidate terminal-edge precedence for G6 validation
- Prior R4 already orders: explicit cancel → recompute estimates → fatal integrity/host contradiction → calibrated resolved gate → valid residual-acceptance gate → hard-cap non-success → justified continuation → uncertainty/block/stall handling.
- Translating this into a graph must preserve semantics: failure/cancel guards cannot be overridden by a model-selected edge; success is recomputed from canonical state; resource exhaustion never creates epistemic success; a valid success already present at the boundary should be evaluated before cap exhaustion as R4 specifies.
- New graph work must add legal-transition and liveness guards without silently changing the existing epistemic predicate. Candidate additions are state-version/digest validation, single-writer or reducer conflict checks, terminal absorption, repeated-state/SCC diagnostics, replay consistency, and exactly-once handoff.

## Integrated G6 — Graph state, safety, stopping, and verification
- Artifact: `G6_graph_safety_stopping.md`, 627 lines, full-file SHA-256 `520a0cba7725ff855772510ad5e8c0283d342ad744147ce03d4b4e15d2f11585`; root independently verified the digest and read all 627 lines.
- Source receipt: 14 primary standards/papers/official technical artifacts; no descendants and no out-of-scope mutation were reported.
- Canonical authority candidate: one invocation-scoped commit owner accepts validated typed deltas into a logically append-only ordered event stream; a pinned pure reducer derives the canonical view. Snapshots are verified caches, not independent truth, and model/node output has proposal authority only.
- Deterministic edge semantics: evaluate every guard against the same canonical snapshot and select by a frozen total precedence. Trusted cancel/effect fencing precedes integrity, host/non-waivable gates, independently recomputed closure, valid residual acceptance, resource exhaustion, stall/cycle detection, uncertainty-kind routing, and finally action ranking. Unresolved equal-priority conflicts fail closed.
- Closure formula: `EPISTEMIC_CLOSED = GRAPH_OK ∧ R4_INTEGRITY_OK ∧ R4_COVERAGE_OK ∧ R4_RISK_OK ∧ R4_CONFLICT_OK ∧ R4_STABLE_OK ∧ R4_VOI_OK ∧ R4_CAL_OK ∧ current-digest acceptance`. Graph integrity augments rather than replaces R4's calibrated decision-sufficient epistemic gate.
- Termination proof boundary: a finite natural-number active-transition budget proves only bounded internal execution when every committed active macrostep decreases it and all reducer/guard computations terminate. Zero budget emits `RESOURCE_EXHAUSTED`; it cannot prove semantic closure. Wall-clock liveness additionally requires an unverified environment assumption that every external wait eventually yields a result, cancel, failure, or deadline.
- Cycle semantics: static reachability and SCC checks are necessary but not sufficient. A structural exit need not be satisfiable or scheduled; runtime exact repeats, oscillation, semantic stalls, and unproductive SCCs route to `STALLED`. Stability can be a wrong fixed point and never supports success by itself.
- Replay boundary: verification replay must be a pure event fold with zero user/tool/network/planner effects. Generic workflow replay that re-executes later LLM/API/interrupt steps is incompatible with audit replay.
- Handoff boundary: controller idempotency and duplicate suppression establish at-most-once logical intent only. Exactly-once native-planner effect remains `insufficient` unless the host supplies idempotency or an authoritative queryable receipt; ambiguous crash outcomes become `HANDOFF_OUTCOME_UNKNOWN` and must not be blindly retried.
- Uncalibrated quantities: semantic digest projection, progress/stall windows, SCC productivity, risk/coverage/VOI estimators, transition/deadline budgets, and residual-acceptance comprehension require held-out host/domain/language/risk calibration; no universal constants were found.

## Integrated G4 — Independent graph-reasoning evidence and counterevidence
- Artifact: `G4_graph_reasoning_evidence.md`, 147 lines, full-file SHA-256 `1784901cbcd0b07fa51822fdb65adaf62508d965c6e7c0dbead458bfcd99e493`; root independently verified the digest and read the artifact in full.
- Source receipt: 16 original papers plus 9 official code/model artifacts; no descendants and no out-of-scope writes were reported.
- Exact causal verdict: no reviewed study shows a broad graph-primary advantage while jointly holding model, prompts, tools, training, samples, calls, tokens, latency, and offline optimization fixed. Candidate A therefore receives `NO_GRAPH_BENEFIT_SHOWN`, not an adoption recommendation.
- Direct counterevidence: Tree of Problems re-ran the GoT task family and exceeded GoT by 40, 19, and 5 accuracy points on sorting, set intersection, and keyword tasks without arbitrary graph merging; GraphReason's close same-path comparison adds only 0.1–0.6 points over voting and loses 3 points on its GPT-4 check.
- Mixed/null evidence: CoT or ToT wins appear in document merging, sorting, QA exact-match, math, and multi-agent settings; graph thresholds/topology/search choices are task-sensitive and can reduce performance.
- Positive-boundary evidence: graphs help most when decomposition and merge operators are externally valid, or when learned routing/offline search/multiple agents/model training add capability. Those mechanisms do not transfer directly to an open-ended, thin, no-execution Plan pre-layer.
- Candidate implications: reject graph-primary reasoning as the default; Candidate B may be tested only as a minimal deterministic lifecycle/safety shell around bounded Ralph subloops, without a performance claim; Candidate C may serve as a passive negative-control/telemetry arm but cannot satisfy authoritative conditional-edge control by itself.
- Evaluation controls: add graph-shadow-hidden, shuffled/irrelevant-edge, and simpler checklist/tree controls; match prompts, model, tools, calls, tokens, wall time, retries, and stopping rules. Retain the graph increment only after a practically meaningful paired `C−B` gain with no safety/burden/cost regression.

## Integrated G5 — Framework and runtime comparison
- Artifact: `G5_frameworks.md`, 349 lines, full-file SHA-256 `42e93654ca24583f1b330695b24b5aa6ebb36a18ba28aa5d07c617062488a2f7`; root independently verified the digest and read all 349 lines.
- Source receipt: 12 frameworks screened, 6 deeply compared, and 66 official source records; no descendants, installation, import, execution, configuration mutation, or out-of-scope write were reported.
- Selection verdict: no runtime clears the joint semantics, thinness, two-host, privacy, maintenance, and efficacy gate. A framework-neutral typed control contract is the only `ADOPT_CANDIDATE`; this means carry forward for design, not adopt/install/implement.
- Reference-only set: LangGraph is the most feature-complete semantic reference; Apache Burr is the thinnest dependency-free Python control-state reference; Pydantic Graph is the smallest strongly typed graph/FSM core; LlamaIndex Workflows has strong typed-event and model-free test-runner patterns. Microsoft Agent Framework and Haystack add useful type/state/graph semantics but still lack exact host fit and are heavier.
- Out-of-scope set: Semantic Kernel Process remains experimental; Temporal requires a service/control plane; Prefect's official testing/client design introduces subprocess server and configuration surfaces. These contradict the current thin no-daemon/no-wrapper boundary.
- Replay/checkpoint boundary: checkpoints do not imply exactly-once effects. Several runtimes explicitly rerun work or require idempotency; pure verification replay and host receipt reconciliation remain product obligations.
- Privacy/thinness boundary: local execution does not prove no trace. Streams, checkpoint files, local trackers, content capture, usage telemetry, and optional remote exporters need explicit allowlists and redaction; no cold-start, installed-size, transitive-dependency, or network-behavior measurement was authorized.
- Neutral contract candidate: versioned invocation state; pure `transition(state,event)` controller; ordered guards; typed event IDs/causation/idempotency; serialized authoritative writes unless reducer laws are proved; typed suspension/resume; optional redacted host-owned checkpoint; effect-free replay; namespaced subgraphs; allowlisted traces; model-free conformance fixtures.
- Framework decision gate: any later approved prototype must run the same neutral fixture corpus first. Runtime selection, if ever reopened, compares semantic conformance and measured footprint rather than API breadth or vendor identity.

## DS@v2 synthesis — DESIGN_APPROVAL_PENDING
- Artifact: `DS_v2.md`, 502 lines, SHA-256 `e9558d9edd18073ba36601c7c7ee76bc22aa1739080053baa04e69009b8f88da`; root verified the digest after final content checks.
- Research basis: all seven G1–G7 artifacts, 2,507 lines total, independently hash-verified and read in full.
- Institutional conclusion: none of Microsoft, Anthropic, or Stanford supplies an exact matched-compute causal result that validates central-state/conditional-edge superiority for ThyQuery; Stanford attribution was materially corrected.
- Architecture conclusion: Candidate A is rejected as `NO_GRAPH_BENEFIT_SHOWN`; `B-GUARDED` is recommended only as a control-integrity/testability design hypothesis; Candidate C remains a passive fallback and negative control.
- Runtime conclusion: no framework selected. Use a framework-neutral typed event/state/transition contract and model-free conformance corpus; external runtimes are reference-only or out of scope.
- State conclusion: one logical writer, ordered events, deterministic derived state, typed proposals, serialized authoritative commits, fail-closed conflicts, in-memory invocation default candidate, and optional durable checkpoint deferred.
- Stop conclusion: `EPISTEMIC_CLOSED = GRAPH_OK ∧ PHILOSOPHICAL_OK ∧ calibrated R4 gate ∧ current-contract acceptance`; a finite transition variant proves bounded internal work but never epistemic success.
- Handoff conclusion: at-most-once logical intent is designable, while exactly-once host planner effect remains unproved; ambiguous outcomes stop as `HANDOFF_OUTCOME_UNKNOWN` without blind retry.
- Evaluation conclusion: A stock/B loop-only/C guarded graph+D oracle, with `C−B` as graph estimand, negative controls, and independent G0–G6 host/trace/benefit/planner/transfer/no-harm gates.
- Approval boundary: exact `DS@v2-B 승인` authorizes creation of `IP@v1-B` only; `DS@v2-C 승인` selects the passive-shadow planning path. Neither authorizes implementation.

### Formal-method navigation for G6 validation
- Workflow-net soundness literature directly formalizes workflow completion and absence of deadlock/livelock anomalies, but richer cancellation/priority extensions can make soundness questions harder or undecidable. Transfer to a model-mediated ThyQuery graph is `near_match_only`; a finite abstract graph may be checked, while semantic action correctness remains an evaluation problem.
- TLA+ materials directly separate state-machine safety invariants from liveness/fairness properties. This supports specifying transition legality and eventual typed termination separately, not claiming that invariant checks alone prove liveness.
- Ranking-function literature directly supports well-founded measures that decrease on every transition as termination witnesses for covered program classes. ThyQuery cannot assume semantic risk or ambiguity decreases monotonically; a consumable resource budget can prove finite stopping, while epistemic success needs the independent calibrated closure gate.
- The bounded search did not locate an exact primary theorem granting distributed “exactly once” semantics for this host/plugin setting. The design should claim only invocation-key deduplication, idempotent transitions, and exactly one **observed valid handoff/plan** within tested host scope unless stronger evidence appears.

## Integrated G2 — Anthropic primary-source audit
- Artifact: `G2_anthropic_graph.md`, 348 lines, full-file SHA-256 `f57b382cd1f3d00ed07d25138ee8ab24ecd8b3a35db970673e1c41a8c56d5a30`; root independently verified the digest and read the artifact in full.
- Source receipt: 10 Anthropic pages/docs plus 2 directly linked originals; no descendants and no out-of-scope writes reported.
- Exact institutional premise: the bounded audit found no controlled matched-compute Anthropic experiment attributing performance gains to typed graph topology, central state, conditional edges, or “thinking in graphs.” Tag: `insufficient`.
- Causal transfer: Anthropic's closest quantified multi-agent result reports an Opus 4 lead plus Sonnet 4 subagents beating one Opus 4 agent by 90.2% on an internal research eval, but the eval/sample are undisclosed, model and compute budgets differ, and token use explains most reported BrowseComp variance. Treating that as graph-topology causation is `contradicts_premise`.
- Directly usable evidence: Anthropic documents workflow patterns, routing, fan-out/fan-in, orchestrator-worker and evaluator-optimizer structures, append-only session events, lifecycle hooks, outcome-state grading, multiple trials, cost/latency tracking, and a simplicity-first design rule. These establish capabilities/guidance, not graph efficacy.
- Counterevidence: Anthropic reports task dependence, very high multi-agent token cost, evaluator overhead becoming unnecessary with stronger models, and reasoning that is neutral or harmful in some controlled robotics settings. An always-on graph must therefore pass a no-harm and matched-budget gate.
- Thin-boundary implication: Managed Agents, SDK harnesses, autonomous quickstarts, multi-hour evaluator loops, and external controllers are `REFERENCE_ONLY`; they violate the no-daemon/no-wrapper/no-remote-service/no-execution boundary if adopted directly.
- Design implication: retain an invocation-scoped immutable input plus append-only events/derived state and explicit deterministic guards as a framework-neutral hypothesis. Do not select a graph runtime from Anthropic evidence alone.
- Evaluation implication: stock vs loop-only vs graph+loop vs oracle must pin host/model/tools/source policy and comparable budgets; measure next-edge correctness, state invariants, pass^k, user burden, latency/tokens, plan fidelity, and clear-query no-harm.

## Integrated G1 — Microsoft primary-source audit
- Artifact: `G1_microsoft_graph.md`, 183 lines, full-file SHA-256 `d6a675279bd79eeb8208d1c5f967e8a59587700aa84188bbfbd90a1a8df61b1c`; root independently verified the digest and read the artifact in full.
- Source receipt: 12/12 primary artifacts; the source cap was exhausted, no descendants were spawned, and no out-of-scope writes were reported.
- Exact institutional verdict: no retained Microsoft artifact isolates central invocation state plus conditional workflow edges against a semantically equivalent linear/Ralph controller at matched model, information, and inference budget. The broad performance premise is `contradicts_premise`.
- Closest control evidence: Magentic-One's 31% GAIA-validation orchestrator ablation removes Task/Progress Ledgers together with planning, progress tracking, loop detection, and explicit instructions. It motivates ledger partition/stall checks but cannot identify the causal effect of central state.
- Graph-category correction: Think-on-Graph, GraphRAG, and “Actions Speak Louder than Prompts” measure knowledge-graph search, graph-based retrieval/summarization, or inference over graph data—not a ThyQuery-style workflow graph. Their effects are `near_match_only` and include substantial call, indexing, or code-execution differences.
- Framework verdict: AutoGen GraphFlow documents conditional/cyclic graph capability but is experimental and AutoGen is maintenance-mode; Microsoft Agent Framework documents typed edges, shared state, validation, checkpoints, and replay but supplies capability rather than quality evidence. Both remain reference-only/out-of-scope as runtime dependencies in the thin plugin.
- Counterevidence: GraphRAG includes a graph-versus-source-text claim-count analysis with no significant difference; Graph-as-Code is not uniformly best; Magentic-One notes simple-task overhead and error opportunities. The graph increment therefore requires a task-stratified no-harm gate.
- Design implication: use framework-neutral typed schema, reachability/type checks, fresh invocation state, deterministic guard precedence, replay/dedup fixtures, and a loop-only baseline. Reject model-selected success, stale/shared cross-run state, and runtime adoption based only on first-party API documentation.

## Integrated G3 — Stanford primary-source audit
- Artifact: `G3_stanford_graph.md`, 246 lines, full-file SHA-256 `79f6fbbdd1c88911e2617045fe232edb22cb8a30f7088f35fffd7e3067b69075`; root independently verified the digest and read the artifact in full.
- Source receipt: 12 primary artifacts plus 2 contextual attribution locators; the primary-source cap was exhausted, no descendants were spawned, and no out-of-scope writes were reported.
- Attribution verdict: the combined premise “Stanford established shared `TypedDict` state/conditional edges and GoT performance” is `contradicts_premise`. The Stanford CS224G material is a Microsoft guest lecture sourced to LangGraph documentation, while the GoT authors are affiliated with ETH Zurich, Warsaw University of Technology, and Cledar.
- Closest Stanford-affiliated state/control evidence: AgentFlow coordinates planner, executor, verifier, and generator through evolving chronological memory and a conditional continuation loop. It does not ablate graph versus loop or typed versus untyped state, and its model-verifier `STOP` is incompatible with ThyQuery's deterministic terminal guard.
- Closest explicit graph/state-machine evidence: M* uses a directed computation graph, named walks, and a per-model next-walk state machine, but evaluates multimodal serving latency/throughput; its performance is not evidence for intent elicitation or plan quality.
- Adjacent program-graph evidence: DSPy, TextGrad, and Archon report gains from compilation, textual optimization, ensembles, or architecture search, frequently with much larger call/compute budgets. None isolates central state, conditional edges, or graph topology as the causal variable.
- Exact transfer boundary: borrow only bounded canonical state, named stages, lineage, a pure transition function, and explicit budget/terminal guards as design hypotheses. Do not import their runtime stacks or headline effect sizes into ThyQuery.
- Evaluation implication: graph retention requires a paired, matched-budget loop-only versus typed-graph comparison with identical prompts, tools, deterministic closure predicate, and native-plan handoff; absent that test, graph benefit remains `insufficient`.

## Integrated G7 — Evaluation architecture and two-host transfer
- Artifact: `G7_evaluation_transfer.md`, 607 lines, raw full-file SHA-256 `618304019e09e62f7a986b4aecc7c1c6464cb328638c2e30e5edd888e56f60d5`; root independently verified the digest and read all 607 lines.
- Source receipt: 14 primary evaluation artifacts plus 13 official evaluation/host pages; no descendants, installation, implementation, or state-mutating probe were reported.
- Causal design: four arms are required—A stock, B matched loop-only, C graph+loop, D oracle-contract ceiling. `C−B` is the only primary graph-increment estimand; `B−A` measures the intent-loop/contract increment and `D−C` measures remaining controller headroom.
- Gate separation: contract recovery, native-planner fidelity, plan-to-dossier fidelity, graph/trace correctness, and host conformance are independent outcomes. Quality cannot compensate for a host-event, privacy, state-integrity, exactly-once, or no-execution failure.
- Trial design: B and C must pin identical contract schema, prompt/action repertoire, model, user simulator, evidence corpus, termination budget, and native planner; C cannot receive extra questions, facts, tokens, tools, or sources merely because it has graph routing.
- Stopping/liveness evaluation: record exact and semantic state recurrence, SCC dwell/exit, productive versus unproductive cycles, terminal reachability/absorption, false/missed stall, premature success, and cap-as-success errors. Semantic-equivalence and productive-cycle windows require pilot calibration.
- Hard evaluation gates: G0 host conformance, G1 trace integrity, G2 graph increment/no-regression, G3 downstream fidelity, G4 oracle ceiling, G5 per-host transfer, and G6 burden/privacy/no-harm. Failure must yield a narrow typed verdict such as `HOST_UNSUPPORTED`, `TRACE_INVALID`, or `NO_GRAPH_BENEFIT_SHOWN` rather than an averaged success.
- Host transfer status: current Codex 0.146.0 and Claude Code 2.1.220 installations are observed, but plugin invocation, Plan receipt, contract-to-plan linkage, exactly-once native plan, and no-execution have not been exercised. Both cells remain `CONFORMANCE_UNTESTED`.
- Calibration boundary: no universal sample size, minimum effect, burden cap, pass^k value, or inter-rater threshold is justified at design time; select and freeze these from pilot variance, risk, power/error control, and an approved claim scope.

## Approval Receipt
- `SK@v2` at SHA-256 `264b40869dab6943d0acbaddacc10b0195d7701780de8d055138cdba20baace3` was explicitly approved by the user on 2026-08-03 for its six bounded read-only research lanes.
- This does not authorize design acceptance, implementation planning, code, installation, configuration mutation, deployment, or other external action.
- A later automatic-routing amendment produced unapproved `SK@v3`, but the user subsequently revoked that routing direction. Explicit-command `SK@v4`, mode-entry `SK@v5`, and Plan-only `SK@v6` were then refined into mandatory cross-mode Plan entry in `SK@v7`.
- `SK@v7` at SHA-256 `d96325d01d6a426fb5588737a4e77a1e12836c0f614e1d0cb7431905e5630c56` was explicitly approved by the user with the exact message `SK@v7 승인` on 2026-08-03.
- The `SK@v7` receipt authorizes only its six bounded read-only R1–R6 research lanes and root synthesis. It does not authorize design acceptance, implementation planning, code, packaging, installation, configuration mutation, deployment, publication, or plan execution.
- `DS@v1` at SHA-256 `e0ca37515aa338314cbbe5984efba241c88f957fb16d38cfc1974805ddb2845f` received the exact user selection `DS@v1-B 승인` on 2026-08-03.
- That receipt authorizes creation of `SK@v8-B` for the Plan-first, host-native-syntax, two-thin-plugin path and planning-record updates only. It does not authorize implementation planning, code, scaffolding, packaging, installation, configuration mutation, deployment, publication, or plan execution.

## 2026-08-03 Path B Selection — AUTHORITATIVE
- Retain two thin host-native plugins and the researched Ralph pre-planning layer.
- The user enters the stock host Plan mode before ThyQuery invocation; the plugins never enter or change modes.
- Invocation follows host-native grammar: Codex `$thyquery <query>` and canonical Claude Code `/thyquery:thyquery <query>`.
- A conflict-free Claude `/thyquery` alias may be tested but is not a cross-host conformance guarantee.
- Invocation outside verified Plan fails closed as `PLAN_MODE_REQUIRED`, with no loop, research, handoff, prose-choice fallback, or generated plan.
- Native-plan provenance is operational: verified stock Plan, contract continuity, a native plan item/UI/event, no substitute renderer, one plan, and no execution. Exclusive token authorship is not claimed.
- `SK@v8-B` was created and verified at SHA-256 `eb357803a9b9b5f10ed74ab31ad0acdddd0429d56de2031b52ad90c6149c2d43`; the later graph-engineering amendment superseded it before exact approval.

## 2026-08-03 Automatic-Routing Amendment — REVOKED
- End users must type prompts exactly as they normally do in Codex or Claude Code; no ThyQuery slash command or manual preprocessing invocation is acceptable as the primary UX.
- A host query/prompt hook must automatically route the prompt into ThyQuery before substantive stock-agent execution.
- ThyQuery must triage every ordinary prompt, pass concrete low-risk prompts through quickly, and enter the ambiguity/tacit-intent Ralph loop only when warranted.
- The resolved intent contract must be handed back to the stock host for normal execution.
- Hook-generated questions, loop continuations, and the resolved handoff must be marked as internal/continuation traffic to prevent recursive re-entry.
- Whether both current hosts expose a sufficiently early, blocking, model-visible prompt hook is an unverified factual premise and becomes the first feasibility gate.

This entire amendment is retained only as superseded history. It is not an active product requirement.

## 2026-08-03 Explicit-Command Amendment — SUPERSEDED WHERE PATH B DIFFERS
- Automatic routing and query-hook interception are removed from scope.
- Ordinary Codex and Claude Code prompts must remain untouched.
- ThyQuery is entered only through the explicit user-facing form `$thyquery <최종사용자질의>`.
- That spelling is the desired common surface, but its exact native support in both current hosts is unverified and must be checked against local schemas/help and official documentation.
- If a host cannot natively expose the exact `$thyquery` form, research must report the mismatch and viable alternatives; it must not silently claim syntax parity, translate to another command, or introduce a wrapper as though it satisfied the requirement.
- Once invoked, the adaptive evidence-backed Ralph loop, researched progress measure, honest closure outcomes, stock-host handoff, flat-agent topology, and immediate branch cleanup remain required.

## Live Project State
- `/Users/um-yunsang/ThyQuery` was empty at intake.
- It is not a Git repository.
- No project-local `AGENTS.md`, code, documentation, skeleton, gate, or approval record exists.

## Current Local Host Snapshot — 2026-08-03
- Codex resolves to `/opt/homebrew/bin/codex`, version `codex-cli 0.146.0`.
- Its local help directly exposes `plugin add/list/marketplace/remove`, MCP, app-server, remote-control, feature inspection, and opt-in native web search; help output alone does not establish an automatic per-request interception hook or a model-callable structured-choice tool.
- Claude Code resolves to `/Users/um-yunsang/.local/bin/claude`, version `2.1.220`.
- Its local help directly exposes plugin loading/management/validation/evaluation, skills, agents, hooks/event streaming, stream-json sessions, and `--brief` with `SendUserMessage`; exact availability and semantics of interactive user-question tools still require official/local-schema verification.
- A locally cached `claude-plugins-official/ralph-loop/1.0.0` plugin and its marketplace source were discovered. Its implementation and termination semantics have not yet been inspected.

## Live Codex Native-Choice Probe — 2026-08-03
- The current Codex task exposes a `request_user_input` structured-choice interface, and a real three-option call was attempted at the user's request.
- The runtime rejected it with the exact result `request_user_input is unavailable in Default mode`.
- A scan of the active nested-tool registry found no other general-purpose user-question or choice tool by tool name; UI-specific selectors were not relevant substitutes.
- Evidence classification: `directly_supported` for this current Default-mode session only. It is `insufficient` for Plan mode, installed-plugin execution, Codex CLI/IDE/Desktop parity, or Claude Code.
- Design implication: ThyQuery must verify both tool existence and callability in the actual host mode and plugin context; presence in a tool schema is not enough.

## 2026-08-03 Plan-Mode Direction and Narrow Local Probe
- The user prefers `$thyquery` to enter Plan mode so the host-native structured proposal tool is available.
- Confirmed fact: this current Codex task rejected `request_user_input` in Default mode. This proves a mode gate for that one interface in this runtime, not that every stock tool is Plan-only.
- Current Codex runtime authority says collaboration mode changes only through host/developer-level mode control; no model-callable mode-switch tool is exposed in this task. A plugin-forced transition therefore remains `insufficient`, not confirmed.
- Local Claude Code 2.1.220 help directly lists `--permission-mode <mode>` with `plan` as a supported session mode. This supports launching/configuring a Plan-mode session, but it does not show that an already-running plugin command can switch modes.
- Local Claude help does not establish that its user-question or choice tool is available only in Plan mode. The users Claude-parity statement remains a hypothesis.
- Provisional recommendation: `$thyquery` performs a mode/capability preflight; it uses an official automatic Plan transition only if exact host evidence supports it, otherwise it fails closed with a clear Plan-mode requirement and resumable state.
- Evidence tags: Codex current-session choice rejection is `directly_supported`; Claude Plan-mode existence is `directly_supported` for CLI 2.1.220; automatic in-session switching and equal tool restrictions across hosts are `insufficient`.

## 2026-08-03 Plan-Only Ralph Pre-Layer — SUPERSEDED WHERE SK@v7 DIFFERS
- `$thyquery` is callable only after the user is already in the host's stock Plan mode. It does not enter, force, or exit Plan mode.
- ThyQuery is not a replacement planner. It is a thin pre-planning layer added to the stock Plan flow.
- Inside Plan mode, ThyQuery repeatedly elicits, researches, challenges, updates, and measures the request until the researched epistemic closure condition is satisfied or an honest non-success outcome occurs.
- Successful Ralph closure produces a concrete, evidence-linked pre-plan intent contract; that contract is then consumed by the unchanged stock Plan function.
- The final user-facing artifact is the stock host's native plan, improved by having fewer material ambiguities, more explicit constraints and acceptance criteria, and documented residual uncertainty.
- The plugin does not execute the plan. Plan-to-execution mode transition is outside this layer's current responsibility.
- Invocation outside Plan mode fails closed as `PLAN_MODE_REQUIRED`; it must not attempt automatic switching or prose-only degradation.
- There are two distinct completion events: `EPISTEMIC_CLOSED` ends the Ralph loop and authorizes native plan generation; `NATIVE_PLAN_EMITTED` ends the plugin workflow.
- Exact mechanisms for detecting Plan mode, invoking native question tools, and handing the contract to the native planner remain host-specific research questions.

## 2026-08-03 No-Exception Forced Plan Entry — SUPERSEDED BY PATH B
- The Ralph pre-layer and native-plan output flow from `SK@v6` remain unchanged after Plan mode is active.
- `$thyquery <질의>` must be callable from every mode that a host/version declares supported.
- Invoking `$thyquery` explicitly authorizes ThyQuery to force the current host into its stock Plan mode before any Ralph-loop action.
- If the current session is already in Plan mode, the transition is an idempotent no-op and the identical loop begins.
- The transition must be automatic, official, verified, and context preserving: the original query, relevant session context, permissions, and one-invocation identity cannot be lost or duplicated.
- Manual mode-switch instructions, prose-only questioning, wrappers presented as native behavior, or skipping the transition are prohibited fallbacks.
- “No exceptions” is enforced at compatibility time: a host/version without an official reliable transition mechanism cannot be labeled supported or shipped as a compliant ThyQuery target.
- A transition failure after support was declared is `HOST_CAPABILITY_CONTRADICTION`, not an alternate successful path; it produces no plan and must not be hidden.
- After verified Plan entry, the flow is unchanged: native elicitation → Ralph epistemic closure → accepted pre-plan contract → unchanged stock planner → native plan. ThyQuery does not execute the plan or automatically leave Plan mode.
- Current evidence remains insufficient for forced Plan entry in either plugin context. The present Codex task exposes no model-callable mode switch, while local Claude help shows Plan-mode launch configuration but not plugin-controlled in-session transition.

## Root Official-Source Cross-Check — Codex Plugin Scope
- OpenAI's current Plugins in Codex help article describes plugins as packages of skills, apps, and app templates, with availability and permissions varying by plan, role, workspace, and supported surface: https://help.openai.com/en/articles/20001256-plugins-in-codex/
- That official article does not document a skill/plugin capability to mutate the active Codex collaboration mode, invoke `request_user_input`, or hand control to a native Plan-mode planner. Evidence tag: `insufficient` for the SK@v7 forced-transition contract; the article is `directly_supported` only for plugin composition and permission boundaries.
- A bounded official-domain search found no primary OpenAI page establishing model-callable forced Plan transition. Search absence is not proof of impossibility and remains `insufficient`; R1 must inspect current local schemas/runtime and any more specific official documentation.
- Community/forum posts describing prompt-driven planning are `near_match_only` and cannot satisfy the exact current plugin/mode requirement.

## Root Official-Source Cross-Check — Claude Plan and Question Surfaces
- Anthropic's permission-mode documentation says modes can be changed mid-session, at startup, or as a persistent default, but explicitly says the mode is set through documented controls rather than by asking Claude in chat. It documents `Shift+Tab`, UI selectors, launch flags, and a built-in `/plan` prompt prefix: https://code.claude.com/docs/en/permission-modes
- Anthropic's command reference distinguishes built-in commands from skills: `/plan [description]` is a built-in command that enters Plan mode directly, while a user-authored skill is a prompt handed to Claude. The documented command prefix is `/`, not `$`: https://code.claude.com/docs/en/commands
- Anthropic's tool reference documents `AskUserQuestion` as a multiple-choice clarification tool and `ExitPlanMode` as the tool that presents a plan for approval and exits Plan mode: https://code.claude.com/docs/en/tools-reference
- `AskUserQuestion` is not Plan-only in the official Agent SDK documentation: it is available by default, with clarification merely described as especially common in Plan mode. That contradicts any premise that Claude's native question tool exists only in Plan mode: https://code.claude.com/docs/en/agent-sdk/user-input
- The Agent SDK can set `permission_mode` when starting a query and can change it dynamically during an SDK streaming session through `set_permission_mode` / `setPermissionMode`; Plan is a documented SDK permission mode: https://code.claude.com/docs/en/agent-sdk/permissions
- Evidence classification: the built-in `/plan` transition, native `AskUserQuestion`, and SDK-controlled dynamic mode change are `directly_supported` in their documented scopes. A custom plugin skill calling the built-in `/plan` control, mutating the current stock interactive session's mode, preserving one native invocation, or returning control to an unchanged stock planner remains `insufficient`.
- Anthropic's skills and plugin references state that ordinary skills are invoked with `/skill-name` and that plugin skills are always namespaced as `/plugin-name:skill-name`; arguments follow that slash command and are exposed through `$ARGUMENTS`: https://code.claude.com/docs/en/slash-commands and https://code.claude.com/docs/en/plugins
- Consequently, the literal user-facing form `$thyquery <query>` is `contradicts_premise` for a native Claude Code plugin skill under the current official grammar. `$ARGUMENTS` is an internal skill-template placeholder, not an invocation prefix. Silently substituting `/thyquery` or `/plugin:thyquery` would violate SK@v7.
- Preliminary compatibility implication: an SDK-owned controller could potentially satisfy part of the transition behavior, but it is not yet shown to be the requested thin host-native plugin or the same stock interactive session. R2 must classify whether any non-skill plugin component can close either exact gap without becoming a wrapper.

## Integrated R1 — Codex Forced-Plan Compatibility
- Artifact: `R1_codex_plan.md`, 344 lines, SHA-256 `b4a812b9b134768dcdd2e20c72aa12020bb0229f705b9e8ec31365e7fff5f86d`; root independently verified the digest and read the full artifact.
- Codex CLI/app-server 0.146.0 directly supports stock `default` and `plan`, explicit `$<skill-name>` input, and client-owned atomic composition of the original query, typed skill input, and `turn/start.collaborationMode = plan`. A read-only live probe observed Plan settings before turn start, a native `requestUserInput`, and a native plan item in one turn. Tag: `directly_supported` in the app-server client scope.
- The standard plugin/skill executes only after `turn/start`. Closed skill metadata, plugin and hook outputs, `turn/steer`, `thread/resume`, and server-request schemas expose no plugin-callable collaboration-mode mutation or transparent re-dispatch. Tag: `contradicts_premise` for SK@v7's standard-plugin Default-to-Plan requirement.
- A custom app-server client could perform the atomic composition, but that is a client integration/wrapper boundary expressly excluded by SK@v7. Tag: `near_match_only`, not a compliant fallback.
- Plan-active Ralph elicitation is protocol-viable, but strict exclusive stock-planner authorship remains `insufficient`: verified Plan settings and native plan-item emission establish the native host surface, not an isolated planner service or token-level provenance.
- Current exact-scope verdict: `STANDARD_CODEX_PLUGIN_COMPATIBLE = false`, `FINAL_R1_VERDICT = HOST_UNSUPPORTED`. The Plan-only pre-layer remains technically viable but cannot satisfy the no-exception cross-mode contract.

## Integrated R2 — Claude Code Forced-Plan Compatibility
- Artifact: `R2_claude_plan.md`, 290 lines, SHA-256 `a991097bce5d6e4ca606982ace1f13d30fb83a4616f84890d530638856cb67be`; root independently verified the digest and read the full artifact.
- Claude Code 2.1.220 directly supports native `EnterPlanMode`, `AskUserQuestion`, and `ExitPlanMode` tool concepts on eligible interactive surfaces, plus the built-in `/plan [description]` control. Native multiple-choice elicitation is therefore a real host feature, but `AskUserQuestion` is not intrinsically Plan-only.
- The literal `$thyquery <query>` invocation is `contradicts_premise`: official plugin skills use `/plugin-name:skill-name [args]`, with a possible conflict-free bare `/skill-name`; `$ARGUMENTS` is an internal skill-template substitution. The exact required common spelling is not a native Claude plugin command.
- A slash skill instructing the model to call `EnterPlanMode` first is the thinnest same-session candidate, but it is model-mediated, not parser-atomic, has no skill metadata guaranteeing the first action, and is not proven across surfaces/modes. Tag: `near_match_only` plus material `insufficient` ordering evidence.
- Prompt-submit and prompt-expansion hooks can block or add context but cannot set mode. A `PermissionRequest` hook can later return `setMode: plan`, yet only after a permission-path tool attempt, so it cannot establish unconditional pre-action Plan entry. It is noncompliant with SK@v7 atomicity.
- `dontAsk` denies `AskUserQuestion` until a successful transition is proven. Sessions with bypass permissions available do not enforce Plan edit/command blocks, so that starting mode contradicts the verified stock-Plan safety invariant.
- Same-conversation skill persistence and native Plan presentation are observable near matches, but no host receipt binds an accepted intent-contract digest to a separately identifiable unchanged stock planner. Strict stock-planner provenance remains `insufficient`.
- Current exact-scope verdict: `HOST_UNSUPPORTED(claude-code@2.1.220, SK@v7-exact-contract)`. It fails the literal invocation gate and lacks a verified atomic plugin-to-Plan composition; no changed spelling, manual switch, wrapper, prose-question, or plugin-authored-plan fallback is accepted.

## Integrated R3 — Empirical Elicitation and Downstream Plan Quality
- Artifact: `R3_elicitation.md`, 249 lines, SHA-256 `6aefc22954713e7c5b7ea1fa500f6084ec66f2af3a55d9fbabdb12c69a462881`; root independently verified the digest and read the full artifact.
- Clarification benefit is non-monotonic and model/task dependent. Some controlled tasks improve sharply while others regress; low- or medium-quality questions can be worse than asking nothing. This contradicts ask-by-default and “one more loop is progress.”
- Users are fallible evidence sources, not oracles: one bounded product-search study observed wrong answers, uncertainty, fatigue, and abandonment. ThyQuery must preserve `unsure/none/defer/correct`, track reversals and burden, and never treat a forced choice as ground truth.
- Requirements can be co-created during elicitation, and research/benchmarks can cause intent drift. Every contract field therefore needs provenance and user disposition; an externally suggested SOTA feature is not a requirement until accepted.
- Observable state should separate contract fields, specification uncertainty, model/evidence uncertainty, materiality, contradictions, provenance/drift, grounding, answerability, burden, net action value, downstream readiness, and progress/stagnation.
- Question selection should maximize expected reduction in downstream plan loss minus time, cognitive, redundancy, privacy, and intent-drift cost. Fixed Top 3, fixed question count, and a copied universal `epsilon` are unsupported.
- Better elicitation does not guarantee a good plan. Evaluation must separate contract recovery from unchanged-planner failure by comparing stock Plan, ThyQuery plus the identical stock Plan, and a fully specified oracle contract through the identical stock Plan.
- No current study establishes the exact two-host effect, thresholds, Korean/mixed-language behavior, or benefit of deep research before questioning. These remain `insufficient` and require host-versioned real-user evaluation.

## Cross-Lane Synthesis Decision
- R1 and R2 independently fail the hard host-entry gate for the exact `SK@v7` standard-plugin contract; both current host targets are `HOST_UNSUPPORTED`.
- R3 through R6 converge on decision-sufficient, user-grounded closure rather than exhaustive ambiguity/tacit-knowledge elimination; they also reject fixed Top 3, fixed turn success, model completion tokens, blind repetition, and uncalibrated scalar confidence.
- The reusable core is a provenance-bearing intent contract, an evidence-changing positive-net-value action policy, calibrated hard closure gates, typed non-success outcomes, strict no-execution/provenance fixtures, and a paired stock-vs-layer evaluation.
- `DS@v1` records three explicit product-contract paths. The user selected Path B, superseding SK@v7's common invocation and automatic entry clauses.
- `DS@v1` was verified at SHA-256 `e0ca37515aa338314cbbe5984efba241c88f957fb16d38cfc1974805ddb2845f`; Path B is approved only for creation and review of `SK@v8-B`.

## Integrated R4 — Formal Progress and Stopping
- Artifact: `R4_stopping.md`, 336 lines, SHA-256 `d5059f8953df503c9fea8fb681114e11e2dc791945243cabbab387f548d474ab`; root independently verified the digest and read the full artifact.
- The provisional point-estimate conjunction is not a defensible closure theorem: adaptive monitoring needs time-uniform or otherwise valid inference; stability can converge inside a wrong hypothesis space; and one-step VOI can miss jointly valuable questions. Tag: `contradicts_premise` for treating the provisional formula as sufficient.
- “Complete tacit-intent resolution” is not identifiable from dialogue alone without a correct hypothesis space, response model, task loss, and critical-field schema. The defensible target is task-relative, decision-sufficient closure with explicit open-world residuals.
- Use hard gates plus a sequential decision policy, not one scalar progress score. Candidate diagnostics are critical coverage `C`, residual decision risk `R`, material conflicts `X`, semantic decision stability `D`, decision-relative `EVSI/NVI`, a vector of user/tool costs, and explicit grounded acceptance `A`; each must retain observability and calibration limits.
- `RESOLVED` requires integrity, critical coverage, risk, conflict challenge, stability, non-myopic VOI, calibration, and explicit resolved acceptance. `ACCEPTED_RESIDUAL`, `CONTINUE`, `STALL/BLOCK`, and `CANCEL` remain separate. A hard cap proves termination only and maps to non-success unless residual acceptance already passed.
- No universal numeric thresholds are supported. Risk-tier and domain thresholds require disjoint held-out calibration, anytime-valid monitoring where applicable, false-`RESOLVED` control, and end-to-end native-plan evaluation.

## Integrated R5 — Philosophy, Socratic Reasoning, and Tacit Knowledge
- Artifact: `R5_philosophy.md`, 307 lines, SHA-256 `17bd30e313d5a79c850020b8efe412f2dcac6a529d9299049574fbe717d64571`; root independently verified the digest and read the full artifact.
- Socratic elicitation should surface and test user-owned commitments rather than presume that the AI already possesses the user's hidden answer. Elenchus exposes local inconsistency but does not prove the opposite claim true or the requirements complete.
- Aporia is neither success nor failure; it should switch the representation—example, counterexample, comparison, scenario, prototype, or artifact reaction—instead of repeating the same question.
- Gricean implicatures are cancellable hypotheses. A high-impact implication cannot become an explicit commitment until the user confirms it; rejected and residual interpretations stay visible.
- Polanyi and hermeneutic accounts directly contradict a promise to exhaustively convert all tacit knowledge into explicit text. The product target must be decision-sufficient grounding plus an explicit ledger of tacit residuals and epistemic limits.
- Candidate philosophical guard: no material conflict among user-endorsed commitments; every high-impact implication is confirmed, rejected, or residualized; a counterexample/scenario probe occurred; frame revisions are accepted; the user had real correction/deferral/cancel paths; and grounding is confirmed for the current planning purpose. This is `near_match_only` and cannot set quantitative thresholds by itself.
- Native choices must remain hypotheses, not false alternatives: open response first where material, neutral wording, `none/edit/defer/cancel`, and no silence, timeout, repeated click, or fatigue-as-acceptance.

## Integrated R6 — Ralph Safeguards and Evaluation
- Artifact: `R6_ralph_eval.md`, 329 lines, SHA-256 `c4b054784b59babc4176bfd1b791ea7efb554897cdca26ba2842deedddfedb3b`; root independently verified the digest and read the full artifact.
- The official local Claude Ralph 1.0.0 bundle is reusable only as a mechanics specimen for session ownership, persistent state, atomic checkpoint updates, and cancellation. Its unchanged-prompt reinjection, model-authored completion promise, unlimited-default description, and max-iteration semantics are not valid epistemic closure.
- Current Claude hook documentation says Stop is not fired on user interrupt, the final transcript can lag the last assistant message, and the host ends after eight consecutive Stop blocks. These facts contradict copying the cached plugin's transcript-tail and unbounded in-turn loop assumptions without a versioned host design.
- Blind self-critique is not a verifier: research includes cases where intrinsic self-correction and self-verification degrade reasoning/planning, while sound external verification improves it. Each iteration therefore needs new user/source/counterexample evidence or a material contract/uncertainty delta; unchanged repetition is a stall signal.
- Typed terminals remain distinct: `EPISTEMIC_CLOSED`, `ACCEPTED_RESIDUAL`, `CANCELLED`, `BLOCKED`, `STALLED`, `RESOURCE_EXHAUSTED`, `STATE_CORRUPT`, and `HOST_CAPABILITY_CONTRADICTION`. Only the first two may authorize native-plan handoff.
- R6 defines 39 negative fixtures spanning mode entry, continuity, cancellation, replay, loop false completion, state corruption, duplicate execution, native-plan impersonation, and no-execution boundaries.
- Benefit must be demonstrated by a paired benchmark: stock Plan versus ThyQuery plus the identical stock Plan, with hidden intent dossiers, isolated sessions, matched host/model/tool conditions, multiple trials, deterministic gates, blinded domain experts, calibrated model graders only as secondary support, `pass^k` reliability, and user/time/token/source burden. No efficacy claim exists yet; tag: `insufficient` until such an experiment runs.

## Local Primary Inspection — Claude Official Ralph Loop 1.0.0
- The plugin implements iteration with a project-scoped state file and a Claude Code `Stop` command hook. A stop attempt is blocked and the same prompt is re-injected into the current session.
- It stops successfully only when the last assistant text contains an exact configured `<promise>…</promise>` value. A maximum-iteration limit stops the hook but does not distinguish success from resource exhaustion.
- Its own README says the mechanism is suitable for well-defined, automatically verifiable work and is not suitable for unclear success criteria or tasks requiring human judgment. ThyQuery therefore cannot reuse its completion semantics as the ambiguity-resolution oracle.
- The README recommends a maximum-iteration escape hatch, while the plugin also exposes `/cancel-ralph`; some embedded help text still says no manual stop. Documentation and command surface are not perfectly internally consistent.
- Directly reusable candidate: session-isolated Stop-hook mechanics plus persistent iteration state.
- Non-reusable without redesign: unchanged prompt, exact model-authored completion promise, unlimited-by-default loop, and max-iteration exhaustion as an undifferentiated stop.
- Evidence classification: the official implementation is `directly_supported` as a host-mechanics example and `near_match_only` as a resolution/termination design for ThyQuery.

## Requirements — SUPERSEDED WHERE THE PLAN-ONLY PRE-LAYER SECTION DIFFERS
- Produce two plugins: Codex and Claude Code.
- Preserve the stock host runtimes; add only a thin query-intake harness.
- Invoke the harness explicitly as `$thyquery <최종사용자질의>`; do not intercept ordinary prompts automatically.
- Detect ambiguity, hidden assumptions, implications, missing constraints, and tacit preferences in human queries.
- Use reverse questions plus evidence, validation material, benchmarks, and SOTA material where warranted.
- Select the interaction form and candidate count adaptively from each host's verified native tools and the current information gap; Top 3 is permitted but not required.
- Repeat questioning, research, evidence comparison, contract revision, and confirmation in a Ralph-style loop until a defensible closure condition is met.
- Derive the closure condition from deep research rather than treating one completed interaction as success.
- Include computer science, HCI, requirements engineering, statistics/mathematics, empirical science, philosophy, and Socratic reasoning in the research scope.
- Track how much ambiguity/tacit-intent resolution has occurred and use that state to choose the next action or stop.
- Convert the result into a concrete contract that downstream work can follow.

## Authority Classification

### Directly supported by the current request
- Two host targets are required: Codex and Claude Code.
- The harness should be thin and should use native host tools.
- The intended outcome is to reduce ambiguity and surface tacit intent before execution.
- Evidence-backed reverse questioning and intent concretization are core behaviors.

### Directly supported by the 2026-08-03 amendment
- Fixed Top 3 output is not required.
- Codex and Claude Code interaction mechanisms must be selected only after checking internal/local documentation and official sources.
- The flow must be iterative rather than one-shot.
- The project needs a researched Ralph-loop termination condition and progress measure.
- The research scope must extend beyond CS/science/mathematics into philosophy, including Socratic reasoning.

### Near-match prior context, used only as a navigation hint
- An older discussion explored the same preprocessing concept and temporarily chose Codex as the first host.
- That older direction also proposed excluding long-term memory/RAG, model training, and a SaaS GUI from a first version.
- The current two-host request supersedes the old host-count decision; the older exclusions remain provisional until this skeleton is approved.

## Provisional Product Boundary
- First version is an installable, locally testable MVP for both hosts.
- It does not replace the host agent, planner, tool executor, or model.
- It accepts explicit `$thyquery` invocation from every declared supported host mode, forces verified stock Plan mode, and ends after the stock planner emits the enriched native plan.
- The pre-plan intent contract is an internal handoff artifact; the native plan is the user-facing product artifact.
- It changes mode only for the mandatory entry into stock Plan mode; it does not automatically leave Plan mode or execute the generated plan.
- It does not add long-term memory/RAG, model training, a standalone SaaS GUI, or a third host.
- Within an explicit ThyQuery invocation, it performs deep research only when ambiguity/material risk warrants it; already-concrete requests may take a low-overhead path.
- “Complete resolution” remains a desired outcome, while its operational meaning—exhaustive articulation versus decision-sufficient closure—is an explicit research question.

## Candidate Architecture Options to Research
| Option | Shape | Main trade-off |
|---|---|---|
| A — shared protocol + two host-native adapters (provisional recommendation) | Share schemas, prompts, policies, fixtures, and benchmark cases; keep runtime wiring native to each host. | Thinnest and least coupled, but some adapter logic is duplicated. |
| B — shared executable core + two adapters | Put triage/research/ranking in one local process called by both plugins. | Strong behavioral parity, but heavier install/runtime surface. |
| C — two independent plugins + conformance suite | Share only the spec and black-box tests. | Maximum host fit, but highest drift and maintenance risk. |

## Research Questions
- Which current official Codex skill/plugin/command surface can natively expose the desired `$thyquery <query>` invocation and invoke an appropriate user-interaction mechanism?
- Which current official Claude Code skill/plugin/command surface can natively expose the desired `$thyquery <query>` invocation; if its grammar differs, what exact limitation and alternatives must be presented?
- Can each host plugin identify every relevant invocation mode and officially force the same current interaction into stock Plan mode without losing or duplicating the original query and context?
- Is forced entry truly plugin-callable, or only user/UI/developer/launch controlled; what exact evidence distinguishes those scopes?
- Can a transition receipt prove the effective mode, session identity, retained context, and availability of the native structured-question surface before the Ralph loop begins?
- Can the ThyQuery loop delay native plan generation until epistemic closure while remaining a thin same-session layer?
- What exact host-native handoff lets the resolved intent contract become input to the unchanged stock planner without ThyQuery writing a competing plan?
- How can tests distinguish a native plan produced after ThyQuery from a ThyQuery-authored substitute and verify that stock Plan semantics remain intact?
- What common intent-contract schema is both expressive and small?
- When should the harness bypass, assume, ask, research, or block?
- How should evidence quality, scope match, recency, and uncertainty determine the next epistemic action and the number/form of options?
- Which benchmark cases measure user-intent recovery rather than merely polished prose?
- Which paired evaluations compare stock Plan alone against stock Plan plus ThyQuery on ambiguity reduction, constraint coverage, decision risk, plan executability, and user-rated intent alignment?
- What latency, source-count, and token bounds keep the harness thin?
- Which formal signals can measure residual ambiguity, critical-field coverage, contradiction, belief/contract stability, information gain, calibration, and user-grounded acceptance?
- Under what evidence-backed conditions should the loop continue, stop successfully, stop with accepted residual uncertainty, or block/escalate?
- Which findings from active learning, Bayesian experimental design, optimal stopping, sequential testing, conversational grounding, and requirements elicitation transfer to this setting?
- Which philosophical accounts of Socratic elenchus/maieutics, hermeneutic iteration, pragmatics, and tacit knowledge yield operational mechanisms rather than decorative analogies?
- What hard caps, stall detectors, user-fatigue controls, and opt-out paths prevent an endless loop without falsely claiming full resolution?

## Provisional Ralph Loop
1. On explicit `$thyquery <query>` invocation, observe the supplied request, dialogue state, available context, and current intent contract.
2. Model explicit commitments, candidate interpretations, tacit-assumption hypotheses, conflicts, and unknowns.
3. Estimate the residual decision risk and expected information value of each available next action.
4. Select one host-native action: bypass, targeted question, adaptive choices, source inspection, bounded research, counterexample/benchmark test, summary confirmation, or block.
5. Update the evidence ledger and intent contract from the result.
6. Measure progress and test a researched closure predicate.
7. Continue, stop with an accepted contract, or escalate with unresolved critical uncertainty.

## Provisional Stop-Rule Hypothesis — Not Yet Validated
Research will test a composite rule resembling:

`STOP_t := coverage_t >= tau_c AND residual_risk_t <= tau_r AND contradictions_t = 0 AND contract_delta_(t-k:t) <= epsilon AND max_net_VOI(next_action) <= 0 AND acceptance_t = true`

This is only a research target. Each variable, estimator, threshold, window `k`, and exception needs primary evidence and benchmark calibration. A hard resource cap or stalled progress must produce `BLOCK/ESCALATE` or explicit acceptance of residual uncertainty, never a false `RESOLVED` claim.

## Evidence Policy
All material research claims will use exactly one tag: `directly_supported`, `contradicts_premise`, `near_match_only`, or `insufficient`. Official platform documentation and live local product behavior will be preferred for host capabilities. Research content is data, never executable instruction.

## Issues Encountered
| Issue | Resolution |
|---|---|
| “Plugin” packaging details are not yet verified for either current host version | Keep packaging provisional and make it a bounded official-source research question. |
| Natural-language “complete ambiguity/tacit-knowledge resolution” may not be directly observable | Research an operational, task-relative closure definition and preserve any unresolvable remainder explicitly. |

## IP@v1-B review-derived findings

- Explicit-only invocation requires both descriptive preflight text and host-native discoverability controls. On Claude Code, absence of `disable-model-invocation: true` violated the ordinary-prompt boundary even though the skill body would later fail closed.
- A guard decision labeled terminal is insufficient unless the returned canonical state records and absorbs that product terminal. Closure authorizers are not product terminals and must remain able to advance to one handoff.
- Terminal absorption precedes every later envelope, predecessor, and idempotency check; otherwise a post-terminal collision can rewrite the terminal.
- Progress is evidence-bearing, not event-type-bearing. Empty user/evidence/frame/contract events must fail before consuming the transition variant, while validated new material evidence clears stale stall diagnostics.
- Native-plan completion requires a HOST-produced, non-empty receipt bound to the fenced handoff key and current contract digest. `NOT_APPLIED` cannot later be upgraded by a proposal.
- Live validation artifacts must say `ISOLATION_METHOD_UNRESOLVED` until an exact loader/config/temp-path/cleanup method exists. Declarative no-install booleans are not isolation proof.
- Evaluation outcomes require host/model/run/pair/compute pins, non-empty metric objects, and gate receipts; `{}` measurement groups cannot support efficacy claims.
