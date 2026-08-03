# Installation

## Recommended: install from the marketplace

Start Claude Code, then run these inside the session:

```
/plugin marketplace add umyunsang/ThyQuery
/plugin install thyquery@thyquery
```

`/thyquery:start` is then available in every session, and `/plugin` with no arguments opens the manager for disabling or removing it later.

**This path has been executed against the published repository.** The marketplace resolved and cloned over HTTPS, the install succeeded, and the host's own component inventory reported what the package contains:

```
Component inventory
  Skills (1)  thyquery
  Agents (0)
  Hooks (0)
  MCP servers (0)
  LSP servers (0)

Projected token cost
  Always-on:   ~119 tok   added to every session
  On-invoke:   ~3.3k tok
```

That inventory is the host describing the package, not the package describing itself, so it is the independent confirmation of the runtime boundary. The verification ran at project scope and was removed afterwards; what it proves is that the sequence works, not that any particular machine still has it installed.

## Alternative: load it for one session

To read the source before installing anything, or to try it without changing your configuration:

```sh
claude --plugin-dir /path/to/ThyQuery/plugins/claude-thyquery
```

Nothing is installed, nothing is enabled, and `claude plugin list` stays empty afterwards. The load lasts exactly one session. Every conformance run in this project used this path.

Check a package without loading it at all:

```sh
claude plugin validate --strict plugins/claude-thyquery
claude --plugin-dir plugins/claude-thyquery plugin details thyquery
```

## What each step changes

`.claude-plugin/marketplace.json` at the repository root declares the Claude package, and only that one — see below for why the Codex package is excluded.

| Step | Command | What it changes | How to reverse |
|---|---|---|---|
| 1 | `/plugin marketplace add umyunsang/ThyQuery` | Registers this repository as a marketplace in your Claude Code configuration | Remove the marketplace from the `/plugin` manager |
| 2 | `/plugin install thyquery@thyquery` | Installs the Claude package into `~/.claude/plugins` and makes `/thyquery:start` available in every session | Uninstall it from the `/plugin` manager |

Step 2 is the one that changes behaviour globally. Until then the plugin only exists in sessions you explicitly point at it.

Both steps accept `--scope project` to confine the change to the current repository instead of your user configuration, and a local checkout works in place of the repository slug in step 1 if you would rather install from a path you can read first.

Installing does not make the plugin act on its own. The skill sets `disable-model-invocation: true`, so it runs only when you invoke it, and it refuses unless stock Plan mode is already active. See [getting-started.md](getting-started.md).

## The Codex package is in this repository and is not published yet

`plugins/codex-thyquery` ships in the source tree but is **deliberately absent from `.claude-plugin/marketplace.json`**, so it cannot be installed through the marketplace.

That is not an oversight. The Codex package has never been loaded into Codex, never run, and never conformance-tested: it is `CONFORMANCE_UNTESTED` with `ISOLATION_METHOD_UNRESOLVED`, because the inspected Codex CLI exposes no session-only local loader and no safe method for loading a local candidate without touching real marketplace, configuration, or cache state has been demonstrated. Listing it would offer an install path for something whose behaviour is entirely unverified.

It remains in the tree because the two packages share one specification and are generated together, and publishing it is planned. What that waits on is a loader: a Codex release exposing a session-only path for a local candidate, so the package can be run and conformance-tested before anyone is offered an install. Until that exists, treat it as source rather than as a product.

See [support-matrix.md](support-matrix.md) for the per-surface evidence.

## Before installing persistently

Two things are worth knowing, because neither is obvious from the plugin description.

**ThyQuery only runs when you invoke it.** The skill sets `disable-model-invocation: true`, so it never fires on an ordinary prompt. If you install it and forget it exists, nothing changes.

**Stock Plan mode must already be active.** Invoking outside Plan mode returns `PLAN_MODE_REQUIRED` and does nothing else — no question, no research, no plan. The plugin never switches modes for you; that is a deliberate constraint, not a limitation to work around.

See [getting-started.md](getting-started.md) for what a first invocation actually looks like.
