# Installation

## Claude Code: install from the marketplace

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

## Codex: install from the marketplace

Start Codex, then run these inside the session:

```
/plugins marketplace add umyunsang/ThyQuery
/plugins add codex-thyquery@thyquery
```

`$thyquery` is then available, and `/plugins` with no arguments opens the manager for removing it later.

The equivalent from a shell, if you would rather script it:

```sh
codex plugin marketplace add umyunsang/ThyQuery
codex plugin add codex-thyquery@thyquery
```

Either way the install identifier is `codex-thyquery@thyquery`: the left half is the package name in `.codex-plugin/plugin.json`, the right half the catalogue name in `.agents/plugins/marketplace.json`. Codex prints both when it resolves the marketplace, and `codex plugin remove codex-thyquery@thyquery` is the shell form of removal.

**Read this before installing.** The Claude package has been exercised against a model; this one has not. Loading is verified — the section below shows the host materializing the package — but no conformance case has ever been run on Codex, so how the skill behaves under a model is unmeasured. The two claims are separate and [support-matrix.md](support-matrix.md) keeps them separate.

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

Each host reads its own catalogue at the repository root, and each catalogue lists exactly one package: `.claude-plugin/marketplace.json` declares the Claude package, `.agents/plugins/marketplace.json` the Codex one. Neither lists the other, because a host handed the wrong package fails on a manifest it cannot find.

| Host | Step | Command | What it changes | How to reverse |
|---|---|---|---|---|
| Claude Code | 1 | `/plugin marketplace add umyunsang/ThyQuery` | Registers this repository as a marketplace in your Claude Code configuration | Remove the marketplace from the `/plugin` manager |
| Claude Code | 2 | `/plugin install thyquery@thyquery` | Installs the Claude package into `~/.claude/plugins` and makes `/thyquery:start` available in every session | Uninstall it from the `/plugin` manager |
| Codex | 1 | `/plugins marketplace add umyunsang/ThyQuery` | Adds a `[marketplaces.thyquery]` entry to `$CODEX_HOME/config.toml` (`~/.codex` by default) | Remove the marketplace from the `/plugins` manager |
| Codex | 2 | `/plugins add codex-thyquery@thyquery` | Copies the package into `$CODEX_HOME/plugins/cache/thyquery/codex-thyquery/<version>` and enables it under `[plugins."codex-thyquery@thyquery"]` | Uninstall it from the `/plugins` manager |

Step 2 is the one that changes behaviour globally on either host. Until then the plugin only exists in sessions you explicitly point at it.

Claude's two steps accept `--scope project` to confine the change to the current repository instead of your user configuration. On both hosts a local checkout path works in place of the repository slug in step 1, if you would rather install from something you can read first.

Installing does not make the plugin act on its own. Each package disables implicit selection in its host's own grammar — `disable-model-invocation: true` in the Claude skill, `allow_implicit_invocation: false` in the Codex one — so it runs only when you invoke it, and it refuses unless stock Plan mode is already active. See [getting-started.md](getting-started.md).

## What the Codex package was actually waiting on

Earlier revisions of this document said publication waited on "a Codex release exposing a session-only path for a local candidate". That was a misdiagnosis, and it survived because nobody tested it — the missing piece was a file in this repository, not a feature in Codex.

Codex 0.146.0 looks for a marketplace catalogue at four paths, in priority order: `.agents/plugins/marketplace.json`, `.agents/plugins/api_marketplace.json`, `.claude-plugin/marketplace.json`, `.cursor-plugin/marketplace.json`. The repository carried only the third, and it listed only the Claude package, so there was nothing for Codex to find. The repair was to write the first one.

The isolation half was wrong too. `CODEX_HOME` redirects the entire Codex configuration root, so pointing it at a throwaway directory loads a local candidate without touching real marketplace, configuration, or cache state — which is what a session-only loader would have bought. Verification on 2026-08-04 used exactly that:

```sh
TQ_PROBE_HOME=$(mktemp -d)
CODEX_HOME=$TQ_PROBE_HOME codex plugin marketplace add . --json
CODEX_HOME=$TQ_PROBE_HOME codex plugin add codex-thyquery@thyquery --json
rm -rf "$TQ_PROBE_HOME"
```

The host resolved the catalogue and reported where it had read the package from:

```json
{
  "pluginId": "codex-thyquery@thyquery",
  "name": "codex-thyquery",
  "marketplaceName": "thyquery",
  "source": { "source": "local", "path": "<repo>/plugins/codex-thyquery" },
  "marketplaceSource": { "sourceType": "local", "source": "<repo>" }
}
```

Three things follow, each of them the host's answer rather than this project's assumption. A `source` of `./plugins/codex-thyquery` resolves against the marketplace root — the repository — not against the directory holding the manifest two levels down. The install identifier pairs the package manifest's name with the catalogue's name. And `plugin list --available` offered only the Codex package, so `.agents/plugins/marketplace.json` does take precedence over the Claude catalogue sitting in the same repository; a Codex user is never handed a package their loader would reject.

The installed tree contained all eight package files, including the skill and its five references. `~/.codex/config.toml` hashed identically before and after. `tools/validate-manifests.mjs` now enforces every rule above, so the next edit cannot quietly break one.

What none of this establishes is behaviour. No conformance case has ever run on Codex. See [support-matrix.md](support-matrix.md) for which claims carry evidence and which do not.

## Before installing persistently

Two things are worth knowing, because neither is obvious from the plugin description.

**ThyQuery only runs when you invoke it.** Both packages disable implicit selection, so neither fires on an ordinary prompt. If you install one and forget it exists, nothing changes.

**Stock Plan mode must already be active.** Invoking outside Plan mode returns `PLAN_MODE_REQUIRED` and does nothing else — no question, no research, no plan. The plugin never switches modes for you; that is a deliberate constraint, not a limitation to work around.

See [getting-started.md](getting-started.md) for what a first invocation actually looks like.
