# Claude Code Adapter v1

## Canonical surface

- Invocation: `/thyquery:thyquery <query>` because both plugin namespace and skill name are `thyquery`.
- `$ARGUMENTS`: original query payload.
- Mode: stock Claude Code Plan must already be active and authoritatively evidenced.
- Mode mutation: forbidden. Do not call `EnterPlanMode` or compose with `/plan`.
- Question: `AskUserQuestion` only within the verified Plan flow.
- Research: current read-only web/search surface only for bounded external facts.
- Plan: observable stock Plan presentation, never a plugin substitute.
- Runtime helper, hook, persistent checkpoint, telemetry, and automatic prompt routing: absent.

## Native question mapping

Ask one material question at a time. Choose only genuine alternatives and preserve direct correction, unsure, defer, and cancel paths when the native surface supports them. A selection is a proposed observation until validated against the current contract.

If an open response is essential and the native surface cannot preserve it, return `HOST_CAPABILITY_CONTRADICTION` instead of coercing the answer.

## Capability receipts

A compliant live trace must later show explicit namespaced invocation, authoritative Plan evidence before the first Ralph action, native question callability when needed, accepted-contract continuity, one native plan, and zero post-plan effects.

Static manifest validation does not establish any of these runtime properties. Until a separately approved live run supplies them, this adapter is `CONFORMANCE_UNTESTED`.
