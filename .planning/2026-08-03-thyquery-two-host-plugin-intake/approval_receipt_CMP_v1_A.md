# Approval Receipt — CMP@v1-A

- Date: 2026-08-04 (Asia/Seoul)
- Approved artifact: the Codex marketplace publication plan, held outside the repository at `~/.claude/plans/claude-codex-kind-dahl.md`
- Approved artifact SHA-256: `edfa21c38b680a2f67c99784d573e8f495be7108f669ef8c3982cda2f1ff7121`
- Pre-repair Codex package digest: `sha256:465f16316a2ad5083c91f4267e93446b3d7495eff72d01614c8802ef850ab7f1`
- Pre-repair Claude package digest: `sha256:63dea8e0095120b92d16d3079a7b77d267b607b720dd16bf564dc6fd6bfc482b`
- Post-repair Codex package digest: `sha256:17beab550b98bd48a22584520a3c936d39e3ea8fd8fd4928958ed2bef9583bad`
- Post-repair Claude package digest: `sha256:dbbb2982b2fae7bfc654bebe9b8682d8ac1ace343dc8b22c66cb373547088355`

## How this was approved

Three separate user decisions, taken through the native structured-question surface during a `/thyquery:start` invocation and then a direct instruction:

1. **Scope** — "지금 설치 가능하게만": make the Codex package installable now, without the costly live conformance run. The option text stated plainly that this opens an install path for runtime-unverified behaviour and that `docs/installation.md` had explicitly refused exactly that. It was selected with that stated.
2. **Loader verification** — "포함 — 일회용 CODEX_HOME에서 확인": include a zero-model-cost load check in a disposable configuration root, with the note that `AGENTS.md` names marketplace registration as an approval-gated action.
3. **Execution** — "구현해줘", after the plan was presented and approved through the native plan surface.

## Authorized

- Create `.agents/plugins/marketplace.json` at the repository root declaring the Codex package by relative path, leaving `.claude-plugin/marketplace.json` untouched.
- Give both packages and the workspace one shared version. The plan said `0.2.0`; implementation found that tag already released and pushed, so the shared version is `0.3.0` and the released record was left alone. The approved intent was parity, not the specific number.
- Extend `tools/validate-manifests.mjs` with marketplace-catalogue validation, including the cross-host contamination guard, and add `tests/packaging/marketplace.test.mjs`.
- Register a marketplace and install the Codex package **into a disposable `CODEX_HOME` only**, then delete that root and confirm the real `~/.codex/config.toml` unchanged by hash.
- Rewrite the publication language in `README.md`, `docs/installation.md`, `docs/installation-pending.md`, and `docs/support-matrix.md` to match what is now evidenced.
- Rebind the Codex package digest in `docs/implementation-evidence.md`, which the readiness test holds to current state.

## Not authorized

- Live G0/G1 conformance runs on Codex, or any paid or interactive model call
- Efficacy evaluation on either host
- Any registration, install, enablement, or configuration change against a real `CODEX_HOME` or a real Claude configuration
- Editing the three `*.generated.md` files, or the live manifests in `tests/fixtures/`, which stay bound by hash to `LVP@v3-A`
- Publication or distribution beyond listing the package in this repository's own catalogue

## Residuals accepted by the user

1. **An install path opens for behaviour that has never been measured.** No conformance case has run on Codex. Mitigated by stating the limit in `README.md` and `docs/installation.md` at the point of install rather than in a footnote, and by keeping every behavioural row in `docs/support-matrix.md` untested. Reversible by deleting one file.
2. **The marketplace schema was inferred** from strings in the Codex 0.146.0 binary before being confirmed. The loader probe confirmed that the manifest loads and that its source resolves; it did not exercise every optional field.
3. **Catalogue precedence** was unverified when the plan was written. The probe resolved it: `.agents/plugins/marketplace.json` wins over `.claude-plugin/marketplace.json` in the same repository, and the validator now enforces that neither catalogue lists the other host's package.
4. **`interface.category` acceptance** was unverified when the plan was written. The probe resolved it: the install succeeded with the field present.

Residual 1 is a deliberate departure from the standard `docs/installation.md` previously set — "Listing it would offer an install path for something whose behaviour is entirely unverified" — made by the user with that sentence quoted back to them. Residuals 2 through 4 were open at planning time and closed by the verification this receipt authorizes.

## One item did not go as planned

The implementation was first dispatched to the Codex specialist bridge, which is where this project's global instructions route implementation work. It returned `BLOCKED`: `mkdir: .agents: Operation not permitted`. Codex's own permission profile protects `.agents/` as an agent-configuration directory, so the specialist could not create the very file the task required, and no files were changed. The user was told this and chose to suspend the routing rule for this task rather than widen the permission profile. The work was then done in the main Claude conversation.
