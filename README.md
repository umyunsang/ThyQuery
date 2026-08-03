<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/wordmark-dark.svg">
    <img src="docs/wordmark-light.svg" alt="ThyQuery — thy query, 그대의 질의" width="470">
  </picture>
</p>

<p align="center"><strong>thy query</strong> · 그대의 질의 — the query stays yours.</p>

---

Your coding agent never asks what you meant. It picks an interpretation, silently, and builds.

**ThyQuery makes it ask first** — one question, about the one thing that would change the plan. Your answer goes to the agent's own planner. Then it stops.

## Why it's different

- Asks **one** question, and only when the answer changes the plan.
- Never guesses your preferences. It asks you.
- Hands over one plan, then stops. It never executes.

## Install

Try it for one session:

```sh
git clone https://github.com/umyunsang/ThyQuery.git
claude --plugin-dir ThyQuery/plugins/claude-thyquery
```

Keep it — inside a Claude Code session:

```
/plugin marketplace add umyunsang/ThyQuery
/plugin install thyquery@thyquery
```

## Use

Enter Plan mode, then:

```
/thyquery:thyquery Make the onboarding flow better
```

## Hosts

| Host | Invocation | Status |
|---|---|---|
| **Claude Code** | `/thyquery:thyquery` | **Published** |
| **Codex** | `$thyquery` | Source in the tree, publication planned |

## Status

**v0.1.0 — pre-release.** Seven of nine conformance cases pass, on one model. Efficacy is unevaluated: the plugin does what it says, but whether the plans come out better has not been measured.

## Docs

[Getting started](docs/getting-started.md) · [Install](docs/installation.md) · [Architecture](docs/architecture.md) · [Evidence](docs/support-matrix.md) · [Privacy](docs/privacy-and-retention.md) · [Changelog](CHANGELOG.md)

## Development

```sh
npm test        # 81 tests, no dependencies
npm run check   # tests, package validation, parity
```

## License

[MIT](LICENSE)
