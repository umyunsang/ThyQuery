# Installation

**None of the commands below have been run.** They are recorded so the path exists and is reviewable; executing them is separately gated by [installation-pending.md](installation-pending.md), which freezes package hashes, host state, cost ceiling, recovery procedure, and receipts before any of this is carried out.

## What actually works today

Every live run in this project loaded the plugin session-only:

```sh
claude --plugin-dir /path/to/ThyQuery/plugins/claude-thyquery
```

Nothing is installed, nothing is enabled, and `claude plugin list` stays empty afterwards. The load lasts exactly one session. This is the path that has been exercised, and it is the one to use if you only want to try ThyQuery.

Verify a package without loading it at all:

```sh
claude plugin validate --strict plugins/claude-thyquery
claude --plugin-dir plugins/claude-thyquery plugin details thyquery
```

The second prints the component inventory — one skill, no hooks, no MCP servers, no LSP servers — which is how the runtime boundary was independently confirmed.

## Persistent installation — recorded, not performed

`.claude-plugin/marketplace.json` at the repository root declares both packages by relative path. With it present, the standard sequence is:

| Step | Command | What it changes | How to reverse |
|---|---|---|---|
| 1 | `claude plugin marketplace add /path/to/ThyQuery` | Registers this repository as a marketplace in your Claude Code configuration | `claude plugin marketplace remove thyquery` |
| 2 | `claude plugin install thyquery@thyquery` | Installs the Claude package into `~/.claude/plugins` and makes `/thyquery:thyquery` available in every session | `claude plugin uninstall thyquery` |
| 3 | `claude plugin disable thyquery` | Keeps it installed but inactive | `claude plugin enable thyquery` |

Step 2 is the one that changes behaviour globally. Until then the plugin only exists in sessions you explicitly point at it.

## The Codex package is in this repository and is not released

`plugins/codex-thyquery` ships in the source tree but is **deliberately absent from `.claude-plugin/marketplace.json`**, so it cannot be installed through the marketplace.

That is not an oversight. The Codex package has never been loaded into Codex, never run, and never conformance-tested: it is `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`, because the inspected Codex CLI exposes no session-only local loader and no safe method for loading a local candidate without touching real marketplace, configuration, or cache state has been demonstrated. Listing it would offer an install path for something whose behaviour is entirely unverified.

It remains in the tree because the two packages share one specification and are generated together, and because a future Codex release may supply the loader that is missing today. Treat it as source, not as a product.

See [support-matrix.md](support-matrix.md) for the per-surface evidence.

## Before installing persistently

Two things are worth knowing, because neither is obvious from the plugin description.

**ThyQuery only runs when you invoke it.** The skill sets `disable-model-invocation: true`, so it never fires on an ordinary prompt. If you install it and forget it exists, nothing changes.

**Stock Plan mode must already be active.** Invoking outside Plan mode returns `PLAN_MODE_REQUIRED` and does nothing else — no question, no research, no plan. The plugin never switches modes for you; that is a deliberate constraint, not a limitation to work around.

See [getting-started.md](getting-started.md) for what a first invocation actually looks like.
