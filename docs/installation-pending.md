# Installation Pending

The workspace packages are intentionally uninstalled.

Current approval covers source implementation, deterministic no-network tests, and non-installing static validation only. It does not authorize:

- Codex marketplace registration or plugin add;
- Claude plugin loading or enablement;
- mutation of real host configuration or persistent session state;
- interactive or paid model calls;
- live conformance, efficacy evaluation, deployment, or publication.

Before any installation instructions are executed, a separate approval must freeze the exact package hashes, disposable or recoverable host state, commands, configuration targets, cost ceiling, cleanup/restore procedure, and success/failure receipts. Live G0/G1 conformance should precede any persistent installation decision.

## The commands now exist on paper

[installation.md](installation.md) records the exact sequence, what each command changes, and how to reverse it. **None of it has been run.** Writing the procedure down is not executing it, and the fence above is unchanged: every prohibition in this document still applies, and the separate approval is still required before a single one of those commands is carried out.

The distinction matters because the absence of a written path was itself a defect — the plugin loaded through `--plugin-dir` in every run, and no user could have discovered that. Documenting it removes the mystery without weakening the gate.

Claude G0/G1 conformance has since been exercised: seven of nine cases pass on `claude-opus-5` in an interactive session, with two excluded as not honestly runnable on the available harness. That satisfies the "should precede" clause above for Claude. It does not authorize installation, and Codex remains entirely unrun.
