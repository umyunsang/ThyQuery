# ThyQuery Project Instructions

## Product boundary

- ThyQuery is an explicit, Plan-first pre-planning layer. Codex uses `$thyquery <query>` and Claude Code uses `/thyquery:thyquery <query>`.
- Never add automatic prompt routing, automatic mode switching, execution hooks, or post-plan continuation.
- Outside verified stock Plan mode, return `PLAN_MODE_REQUIRED` and perform no question, research, handoff, or plan generation.
- Only `EPISTEMIC_CLOSED` and `ACCEPTED_RESIDUAL` may authorize one native-plan handoff intent. Stop after one observed native plan.

## Authority and safety

- The current approved scope is workspace-local implementation and deterministic/static validation only.
- Do not install or enable plugins, register a marketplace, change real Codex/Claude configuration, call live or paid models, run efficacy evaluation, publish, deploy, or execute a generated plan without a new exact approval receipt.
- `.planning/` contains approval and research records. Update it only for intentional project records.
- `.remember/` is environment-owned and protected. Do not read, modify, delete, or include its contents in fixtures or reports.
- Tests must be dependency-free, no-network, deterministic, and use synthetic or redacted data.

## Source of truth

- `spec/` owns event/state schemas, graph edges, guard order, closure, privacy, evidence, and handoff policy.
- `src/reference/` is a development oracle only; shipped instruction skills must not imply that Node runs at plugin runtime.
- Generated plugin references must remain byte-equivalent across hosts and match the canonical spec digest.
- Host adapters may differ only where native invocation, question, Plan evidence, copy, or plan observation differs.

## Verification language

- Distinguish unit/static/package validation from live host conformance and efficacy.
- Until separately approved live traces pass, label both hosts `CONFORMANCE_UNTESTED`.
- A cap, repeat, stall, stable answer, model-authored completion token, or polished plan is never closure evidence by itself.
