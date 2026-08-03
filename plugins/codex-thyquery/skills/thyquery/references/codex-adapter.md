# Codex Adapter v1

## Canonical surface

- Invocation: `$thyquery <query>`.
- Mode: stock Codex Plan must already be active and authoritatively evidenced.
- Mode mutation: forbidden. Do not simulate, request, or claim a transition.
- Question: `request_user_input` only when exposed and callable in the verified Plan session.
- Research: current read-only web/search surface only for bounded external factual gaps.
- Plan: the active stock Plan response, never a ThyQuery substitute renderer.
- Runtime helper, hook, persistent checkpoint, telemetry, and automatic prompt routing: absent.

## Native question mapping

Submit one material question at a time. The native selector requires two or three mutually exclusive options; put a justified recommendation first and rely on the native direct-input path for correction or a non-listed answer. Where material, include defer or cancel as real outcomes rather than hidden prose.

If an open response is essential and the native surface cannot preserve it, return `HOST_CAPABILITY_CONTRADICTION` instead of coercing the answer.

## Capability receipts

Do not treat tool-schema presence as callability. A compliant live trace must later show:

1. explicit skill invocation;
2. authoritative Plan evidence before the first Ralph action;
3. native question callability when needed;
4. accepted-contract continuity into one native plan;
5. one observed native plan and zero post-plan effects.

Until a separately approved live run supplies those receipts, this adapter is `CONFORMANCE_UNTESTED`.
