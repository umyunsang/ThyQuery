# Task Plan: ThyQuery two-host plugin intake

## Goal
Define, research, design, and only after later explicit approvals implement two thin host-native, Plan-first plugins—Codex `$thyquery <query>` and Claude Code `/thyquery:thyquery <query>`—whose evidence-backed Ralph intent-resolution process is governed or evaluated by a typed graph with canonical invocation state and conditional edges, and which end after one operationally native plan without execution.

## Authority State
- Current state: `RUNNER_REVIEW_REPAIRED(LVP@v3-A)` after exact approval was bound to the verified `LVP_v3.md` fingerprint, the cross-session hardening gate was repaired, and all seven independent-review findings were closed at `npm run check` exit 0
- Authorized work active: workspace-local runner construction, read-only Codex help/schema feasibility inspection, recorded synthetic-stream fixtures, and deterministic dry-validation only
- Not authorized now: recursive subagents, plugin loading, host/model invocation, persistent plugin installation or enablement, marketplace registration, real configuration/cache mutation, plugin-runtime helper or external framework addition, live/paid host runs, efficacy evaluation, deployment, publication, messaging, purchasing, or plan execution
- Nearest project authority: project-local `AGENTS.md`, created within the approved implementation as the durable product/safety boundary; the user-supplied global instructions remain the parent authority

## Next Step
The three onboarding defects are repaired. Codex isolation and packaging remain open; persistent installation is still gated by `installation-pending.md` and now has a written path to gate.

## Current Phase
Phase 10: Live host conformance (partial)

## Phases

### Phase 1: Intake and project skeleton
- [x] Preserve and normalize the request
- [x] Inspect the bounded local project state and prior exact-scope context
- [x] Create `SK@v1` with research lanes and approval boundary
- [x] Incorporate the user's loop, adaptive-tool, termination, and philosophy-scope corrections as `SK@v2`
- [x] Incorporate transparent automatic query-hook routing and re-entrancy safeguards as `SK@v3`
- [x] Withdraw unapproved automatic routing and specify explicit `$thyquery <final-user-query>` invocation as `SK@v4`
- [x] Add the Plan-mode preflight/transition direction without treating unverified automatic switching or Claude parity as fact in `SK@v5`
- [x] Remove mode switching and define ThyQuery as a Plan-only Ralph pre-layer whose successful output is consumed by the unchanged native planner in `SK@v6`
- [x] Restore mandatory automatic Plan entry from every supported invocation mode while retaining the Ralph pre-layer and native-plan output in `SK@v7`
- **Status:** complete

### Phase 2: Bounded read-only research
- [x] Verify current official Codex cross-mode invocation, forced Plan transition, native-question, and stock-plan handoff surfaces
- [x] Verify current official Claude Code cross-mode invocation, forced Plan transition, native-question, and stock-plan handoff surfaces
- [x] Research empirical ambiguity, preference, and tacit-requirement elicitation methods
- [x] Research formal optimal-stopping, convergence, calibration, and value-of-information criteria
- [x] Research relevant philosophical traditions, including Socratic reasoning and tacit-knowledge theory
- [x] Research Ralph-style loop implementations, safeguards, and benchmark design
- [x] Build the evidence ledger with exact-scope tags
- **Status:** complete

### Phase 3: Synthesis and design approval
- [x] Compare 2–3 thin-harness/product-contract paths
- [x] Specify shared pre-plan intent contract, host adapters, stock-planner handoff, failure handling, and tests
- [x] Create and hash-verify `DS@v1`
- [x] Obtain exact `DS@v1-B` approval
- [x] Create and hash-verify `SK@v8-B`
- [x] Supersede unapproved `SK@v8-B` when the user materially amended the architecture and evidence scope
- **Status:** complete (Path B retained; pre-graph skeleton superseded before approval)

### Phase 4: Graph-engineering amendment intake
- [x] Preserve and normalize the graph-engineering request
- [x] Separate control graphs, reasoning graphs, knowledge graphs, and computation/program graphs
- [x] Treat Microsoft/Anthropic/Stanford performance assertions as provisional exact-scope claims
- [x] Create and hash-verify `SK@v9-B`
- [x] Obtain exact `SK@v9-B` approval
- **Status:** complete (`SKELETON_APPROVED_FOR_RESEARCH(SK@v9-B)`)

### Phase 5: Bounded graph-engineering research
- [x] G1 Microsoft primary-source audit
- [x] G2 Anthropic primary-source audit
- [x] G3 Stanford primary-source audit
- [x] G4 independent graph-reasoning evidence and counterevidence
- [x] G5 framework and runtime comparison
- [x] G6 graph state, routing, termination, and verification
- [x] G7 evaluation architecture and two-host transfer
- [x] Validate and integrate the evidence ledger; clean every completed flat branch/session immediately
- **Status:** complete (`RESEARCH_SYNTHESIS_READY(SK@v9-B)`)

### Phase 6: Graph/loop synthesis and design approval
- [x] Compare 2–3 evidence-supported hybrid architectures
- [x] Specify the canonical state, nodes, conditional edges, guards, terminal invariants, framework boundary, and evaluation protocol
- [x] Create and hash-verify `DS@v2`
- [x] Obtain exact `DS@v2-B` approval
- **Status:** complete (`B-GUARDED` selected)

### Phase 7: Implementation planning
- [x] Record and fingerprint the exact `DS@v2-B` approval receipt
- [x] Write `IP@v1-B` for the approved design
- [x] Verify and fingerprint `IP@v1-B`
- [x] Obtain exact `IP@v1-B` approval
- **Status:** complete (`IP@v1-B` approved and receipted)

### Phase 8: Workspace implementation and deterministic verification
- [x] Implement the framework-neutral specification, development oracle, Codex package, and Claude Code package within approved scope
- [x] Run contract, graph, replay, privacy, handoff, negative-fixture, parity, and non-installing static/package checks
- [x] Produce a change-review packet and separately fingerprinted live-validation proposal
- [x] Run the first independent change review and classify its explicit-invocation blocker
- [x] Repair confirmed blockers with red-first regression tests and rerun deterministic/static proof
- [x] Run the second independent review and classify its three blockers
- [x] Repair R2 blockers, refresh the LVP fingerprint, and rerun deterministic/static proof
- [x] Complete the third independent change review: host/receipt axis PASS; core axis FAIL on four blockers
- [x] Repair R3 blockers, supersede the stale proposal with `LVP@v3`, and rerun deterministic/static proof
- [x] Complete a final independent change review
- **Status:** complete (`WORKSPACE_IMPLEMENTATION_REVIEW_PASS(IP@v1-B)`)

### Phase 9: LVP@v3-A runner construction and deterministic dry-validation
- [x] Reverify and receipt exact `LVP@v3-A 승인`
- [x] Pass the non-Git workspace isolation gate and freeze the mutation/protected-path boundary
- [x] Establish meaningful red tests for runner safety, command proposals, counters, receipts, and cleanup assertions
- [x] Implement the dependency-free runner, recorded synthetic streams, Codex read-only feasibility probe, and documentation
- [x] Run focused and aggregate deterministic/no-network proof
- [x] Repair the cross-session hardening RED gate: session-persistence/environment profile guards, receipt schema and counter validation, non-echoing CLI argument errors, and the host-owned `.claude` allowlist entry
- [x] Fingerprint the resulting host disposition and correct its bound digests and proof counts
- [x] Complete an independent read-only change review of the repaired runner surface
- [x] Repair all seven review findings: frozen-argv value enforcement, placeholder discipline, argv/budget agreement, sanitized failure messages, host-owned allowlist tolerance, constant diagnostics, and derived proof counts
- **Status:** complete (`RUNNER_REVIEW_REPAIRED(LVP@v3-A)`; 78/78, `npm run check` exit 0, no live scope requested)

### Phase 10: Live host conformance and efficacy evaluation
- [x] Obtain separate authority for isolated live-host runs — `LVP@v6-A 승인`; the API-credit blocker was self-imposed via `--bare` and is resolved (subscription-billed, `apiKeySource: none`)
- [x] Run per-host G0/G1 conformance — Claude 7 of 9 pass (`A-G0-02`/`03`/`04`, `A-G1-02`/`04`/`05`, plus `A-G0-01` Plan evidence); `A-G1-01`/`03` excluded as not honestly runnable; Codex unrun
- [ ] Only after both eligible host cells pass, obtain and run a frozen pilot/confirmatory A/B/C/D evaluation
- **Status:** pending (separately gated)

### Phase 12: Specification hardening
Opened retroactively on 2026-08-03: this work ran outside the phase structure after Phase 10 was blocked, and is recorded here so the plan reflects what actually happened. Scope is documentation and specification only; no live scope, no host call, no new approval token.

- [x] Bring both host capability snapshots up to the evidence, including the `--bare` authentication constraint that blocks Phase 10
- [x] State the graph's own evidence status (`NO_GRAPH_BENEFIT_SHOWN`, `NO_RUNTIME_SELECTED`) in the durable spec, not only in planning history
- [x] Correct the question-surface overclaim: separate established existence and mode gating from the open `--print` and used-to-policy questions
- [x] Close the `CAL_OK` gap in the shipped instructions and split the history/current test bindings it exposed
- [x] Audit the remaining nine closure conjuncts; record the future-dated calibration hazard
- [x] Restore product-contract consistency with the closure policy and define `material` and `decision-sufficient`
- [x] Persist the five discoveries to `findings.md` rather than leaving them in the session log
- [x] Audit the remaining specification files and the schemas; found and repaired cross-host skill drift, dropped two candidate findings that did not survive checking
- [x] Extend the parity checker to cover hand-written skills, and verify the new guard adversarially
- **Status:** complete (all items done; `npm run check` exit 0 at 79/79 after every change)

### Phase 13: Loop-control explicitness and native-surface audit
Opened 2026-08-03 after a precise report on loop exit conditions surfaced the same defect class as `CAL_OK`: load-bearing loop values left undefined in the shipped instructions.

- [x] Audit whether the packages actually use the stock planner, the stock question surface, and stock tools for the whole loop
- [x] State the transition budget explicitly in the shipped instructions instead of leaving the model to invent one
- [x] Give the externally supplied stall signals stated criteria, as `philosophical_ok` already has
- [x] State the P8 net-value ranking and its frozen tie-break in the instructions
- [x] Regenerate, verify propagation by content match, and rebind digests
- **Status:** complete (loop obligation, budget default, stall tests, and net-value rule now shipped; parity guard extended)

### Phase 11: Installation and release decision
- [ ] Review evidence-backed support claims and unresolved hosts
- [ ] Obtain separate authority before persistent install, enablement, marketplace publication, or distribution
- **Status:** pending (separately gated)

## Decisions Made
| Decision | Rationale |
|---|---|
| Keep delegation strictly flat | Per the user's explicit instruction, only root-owned R1–R6 agents may be created; no research agent may spawn descendants. |
| Clean completed lanes immediately | As soon as a lane result is integrated, the root audits and stops/closes that agent branch instead of retaining idle sessions. |
| Use explicit opt-in invocation | ThyQuery runs only when the user invokes `$thyquery <final-user-query>`; ordinary Codex/Claude prompts remain untouched. |
| Verify syntax parity rather than assume it | `$thyquery` is the desired common user surface, but each host's current native command/skill grammar must be confirmed from local and official evidence. |
| Do not fake cross-host parity | If one host cannot natively expose the exact `$thyquery` form, research must report the mismatch and alternatives for user choice rather than silently translating or adding a wrapper. |
| Make explicit invocation authorize Plan entry | `$thyquery` must work from every declared supported mode and atomically force verified stock Plan mode before the loop. |
| Allow no manual or prose fallback | If exact official mode forcing is unavailable, that host/version is incompatible and cannot be claimed as a compliant plugin target. |
| Keep mode entry idempotent | Invocation while already in Plan mode performs no transition but runs the identical downstream flow. |
| Keep ThyQuery pre-planning only | ThyQuery owns ambiguity/tacit-intent convergence; it does not replace the stock planner or execute the resulting plan. |
| Let the native planner own the final artifact | After epistemic closure, the accepted contract is handed to the same host's stock Plan function, which writes the final concretized plan. |
| Separate the two completion events | Ralph epistemic closure authorizes native plan generation; native plan completion is the terminal product event. |
| Keep Claude tool behavior provisional | Local Claude help confirms a `plan` permission mode exists, but its exact Plan-mode invocation, native question surface, and stock-planner handoff still require evidence. |
| Treat the current two-host request as authoritative | It explicitly supersedes the older provisional Codex-first direction. |
| Keep the product as a thin harness | The user explicitly wants to preserve the stock Codex and Claude Code runtimes and select the appropriate native interaction tools only after current documentation is verified. |
| Share a behavioral contract before sharing runtime code | Host extension and interaction surfaces may differ; research must establish the narrowest viable common boundary. |
| Remove fixed Top 3 cardinality | The user explicitly made option count and interaction form adaptive to each host's verified tools and the current epistemic gap. |
| Make elicitation iterative | The user requires a Ralph-style loop rather than a one-pass clarification flow. |
| Treat the stop rule as a research output | A defensible closure condition must be derived from exact-scope empirical, formal, benchmark, and philosophical evidence rather than invented during intake. |
| Do not implement SK@v7 as currently stated for Codex 0.146.0 | R1 found that only the host client can select Plan before `turn/start`; a running standard `$thyquery` skill cannot cross that boundary, so the no-exception plugin contract is `HOST_UNSUPPORTED`. |
| Do not implement SK@v7 as currently stated for Claude Code 2.1.220 | R2 found that plugin skills use slash syntax, not literal `$thyquery`, and no official atomic skill-to-Plan composition/provenance contract satisfies the exact no-exception requirement. |
| Define closure as decision-sufficient, not exhaustive mind-reading | Formal and philosophical evidence both contradict exhaustive recovery of tacit intent; unresolved material residuals must remain explicit. |
| Treat iteration caps as non-success | A hard cap ensures termination but never proves closure; it maps to a typed block/exhaustion outcome unless informed residual acceptance already passed. |
| Select Path B | The user explicitly approved `DS@v1-B`; the product is now Plan-first with host-native invocation and two thin plugins. |
| Use host-native invocation grammar | Codex uses `$thyquery`; Claude Code uses canonical `/thyquery:thyquery`; a bare Claude alias is optional and non-portable. |
| Remove automatic mode entry | ThyQuery never changes modes; outside Plan it returns `PLAN_MODE_REQUIRED` and performs no loop or handoff. |
| Use operational native-plan provenance | Require verified stock Plan, contract continuity, native plan surface, one plan and no execution; do not claim exclusive token authorship. |
| Preserve Path B while reopening architecture research | Plan-first invocation, two host-native plugins, and no execution remain authoritative; graph control changes the pending skeleton rather than undoing the selected product path. |
| Separate graph categories | Control/workflow graphs, graph-structured reasoning, knowledge graphs, and computation/program graphs have different claims and transfer boundaries. |
| Keep institutional claims provisional | Microsoft, Anthropic, and Stanford claims require exact primary artifacts, experiments, baselines, budgets, effects, and limitations before they guide design. |
| Evaluate graph increment separately from loop benefit | Use stock, loop-only, graph-plus-loop, and oracle-ceiling arms so a graph cannot receive credit for clarification already produced by Ralph iteration. |
| Keep graph runtime optional | Research framework capability and thinness, but allow a framework-neutral graph specification if every runtime adds unjustified weight or violates host boundaries. |
| Reject graph-primary Candidate A under current evidence | Direct counterevidence and unmatched budgets yield `NO_GRAPH_BENEFIT_SHOWN`; graph terminology cannot substitute for a causal result. |
| Recommend `B-GUARDED` for approval | One deterministic outer graph owns state, safety, closure, and handoff; bounded Ralph refinement retains loop simplicity without a second authority. |
| Select no runtime framework | The framework-neutral typed contract is the only `ADOPT_CANDIDATE`; every inspected runtime remains reference-only or out of scope. |
| Separate boundedness from epistemic success | A decreasing transition budget proves finite internal work only; cap, repeat, SCC, or stall always remains a typed non-success unless closure was independently satisfied first. |
| Preserve host uncertainty | Codex 0.146.0 and Claude Code 2.1.220 are `CONFORMANCE_UNTESTED` for the not-yet-built plugins; design approval cannot create a compatibility pass. |
| Select `B-GUARDED` | The user explicitly approved `DS@v2-B`; the deterministic outer graph owns state, guard precedence, terminals, and handoff while the bounded Ralph region owns no commits or success authority. |
| Keep implementation separately gated | `DS@v2-B` authorizes creation of `IP@v1-B` only; no code, package, configuration, prototype, or execution authority follows from design approval. |
| Use an instruction-first plugin candidate | It is the thinnest host-native surface; a zero-dependency reference controller is development-only and cannot be relabeled as runtime enforcement. |
| Stop instead of silently adding a helper | If later live G0/G1 traces show instruction-only guard/state failure, emit the narrow failure and require a design revision covering runtime and privacy consequences. |
| Gate live validation separately | `IP@v1-B` can authorize source implementation plus deterministic/static checks, but not persistent installation, interactive/paid host runs, or A/B/C/D evaluation. |
| Keep the LVP@v3-A runner inert by construction | The exact approval permits fixture replay, future-command rendering, and read-only local help/schema inspection only; no CLI subcommand may execute a proposed live host command. |

## Errors Encountered
| Error | Resolution |
|---|---|
| Current directory is not a Git repository | Record as live state; do not initialize Git without later authorization. |
| First combined `SK@v6` plan patch missed an expected hunk and was rejected atomically | Re-read exact numbered lines and applied smaller non-overlapping patches; no partial change from the failed attempt. |
| A local `rg` authority search returned no matches and short-circuited a following file-list command joined with `&&` | Interpreted the no-match result correctly, reran the bounded file listing independently, and made no state-changing recovery action. |
| One combined four-page Anthropic web-open response exceeded the tool output budget and was truncated | Retained no unsupported detail from the truncated output; relied on the fully read G2 artifact and switched any further validation to targeted single-page opens/finds. |
| The AAAI landing page for the GoT DOI timed out during one root cross-check | Preserved the published DOI/AAAI attribution from the audited G3 source chain and used the authors' arXiv/paper plus official repository for any further scope validation; no claim depends on the failed fetch. |
| A zsh `ls` probe over unfinished G4/G5 glob patterns emitted `no matches found` before `ls` ran | Treated it as a shell-glob diagnostic only; made no state change and used explicit paths or `rg --files` thereafter. |
| One combined final verification command failed at zsh parse time with `unmatched "` because an `rg` pattern mixed a backtick with shell quoting | No verification subcommand ran and no file changed; record the error and rerun with a simpler literal-safe pattern. |
