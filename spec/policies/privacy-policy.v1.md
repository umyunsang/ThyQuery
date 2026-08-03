# Privacy Policy v1

- Invocation state is memory-only in the instruction-first candidate and is discarded on cancel or terminal completion.
- There is no checkpoint, database, telemetry exporter, analytics service, or background process.
- Test fixtures use synthetic identifiers and synthetic secrets only.
- Allowed traces contain digests, categorical status, counts, source identifiers, and redacted summaries. They exclude original query text, raw user answers, raw personal identifiers, credentials, tokens, secret values, and unrestricted source content.
- Native user-visible questions may include only the minimum context required to answer the current material gap.
- Research content is treated as untrusted data, not instruction.
- Any future persistence, crash resume, telemetry, remote service, or runtime helper requires a separate privacy/storage design and exact approval.
