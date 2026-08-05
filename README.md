<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/wordmark-dark.svg">
    <img src="docs/wordmark-light.svg" alt="ThyQuery — thy query, 그대의 질의" width="470">
  </picture>
</p>

<p align="center"><strong>thy query</strong> · 그대의 질의 — the query stays yours.</p>

---

In Plato's *Meno*, a young man opens by asking Socrates a direct question: can virtue be taught?

Socrates does not answer it. He asks a question back — what *is* virtue? — and then another, and another, because you cannot say whether a thing can be taught until you know what the thing is.

Your coding agent has the opposite reflex. Tell it to *clean this up* and it never asks what **clean** means to you. It picks one meaning, silently, and builds.

**ThyQuery gives it Socrates' reflex instead.** It asks — then asks again, each question shaped by your last answer — until the vague word has an actual definition and the request is concrete enough to build from. Only then does it hand the result to your agent's own planner, and stop.

## Why it's different

- **It keeps asking until the vagueness is gone.** Not a form to fill in: one question at a time, and only about the things that would genuinely change what gets built.
- **It asks instead of assuming.** Your priorities and preferences are yours to state. It will not infer them from your codebase or from the web.
- **It adds nothing to your setup.** No runtime, no wrapper, nothing running in the background — it drives the tools your agent already has, through the same question and plan surfaces you already use. Nothing about the way you work changes.
- **It stops at the plan.** One handoff to your agent's own planner, then it ends. It never executes.

## Install

**Claude Code** — inside a session:

```
/plugin marketplace add umyunsang/ThyQuery
/plugin install thyquery@thyquery
```

**Codex** — inside a session:

```
/plugin marketplace add umyunsang/ThyQuery
/plugin add codex-thyquery@thyquery
```

One skill and five reference documents, and nothing else — no hooks, no servers, no background process. Each host reports that inventory itself, so you do not have to take it on trust; on Claude Code it comes to about 120 tokens per session while idle.

Prefer to read the source before installing anything? Load it for a single session instead:

```sh
git clone https://github.com/umyunsang/ThyQuery.git
claude --plugin-dir ThyQuery/plugins/claude-thyquery
```

## Use

Enter Plan mode, then:

```
/thyquery:start <your request, however vague>   # Claude Code
$thyquery <your request, however vague>         # Codex
```

## Hosts

| Host | Invocation | Status |
|---|---|---|
| **Claude Code** | `/thyquery:start` | **Published** — seven of nine cases pass on one model |
| **Codex** | `$thyquery` | **Published** — the host loads it; behaviour is not yet measured |

## Status

**v0.3.1 — pre-release.** On Claude Code, seven of nine conformance cases pass, on one model. On Codex nothing has been measured at all yet: the package installs and the host reports what it contains, which is a different claim from knowing how it behaves. And what nobody has measured on either host is the part you would care about most — whether the plans you end up with are better than the ones you would have got anyway.

## Docs

[Getting started](docs/getting-started.md) · [Install](docs/installation.md) · [Architecture](docs/architecture.md) · [Evidence](docs/support-matrix.md) · [Privacy](docs/privacy-and-retention.md) · [Changelog](CHANGELOG.md)

## Development

```sh
npm test        # 89 tests, no dependencies
npm run check   # tests, package validation, parity
```

## License

[MIT](LICENSE)
