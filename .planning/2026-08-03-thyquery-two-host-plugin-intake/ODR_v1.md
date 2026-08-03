# Onboarding Defect Repair Proposal — `ODR@v1`

## Metadata and binding

- Date: 2026-08-03 (Asia/Seoul)
- Status: `REPAIR_APPROVAL_REQUIRED`
- Origin: three defects `A-G1-02` found in ThyQuery's own onboarding while running as the product under test
- Claude package digest: `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69`
- Codex package digest: `sha256:24568cf1b6b78e0a30c1de2bf37cc921419f8eaf1a6626138f48613be21ccf71`
- `npm run check`: exit 0; `npm test` 79/79 PASS

## All three defects independently verified

The plugin reported them; they were confirmed here rather than taken on trust.

| # | Defect | Verification |
|---|---|---|
| D1 | No `marketplace.json` anywhere | `find` across the repository returns nothing; no `.claude-plugin/` at the root |
| D2 | README describes closure as reachable | `README.md:18` — "Closure is a conjunction of … calibrated decision sufficiency …", with no statement that v1 cannot reach it |
| D3 | Korean outcome strings hardcoded | Five literals in each `copy.md` (lines 7, 19, 23, 31, 35), directly under the file's own heading "Keep host wording natural" |

D3 carries a further irony worth recording: **the document violates its own stated principle in the line immediately following it.** And the evidence was already in hand — the `A-G0-02` run answered an English query in Korean this morning. That was noted at the time as "the copy came from `copy.md`" and not recognised as a defect. The plugin saw it first.

## Scope split by blast radius

The three repairs are not equivalent in risk, so they are separated rather than bundled.

| Repair | Touches | Digest impact |
|---|---|---|
| D2 README | `README.md` | None — outside both packages |
| D1 marketplace | New `.claude-plugin/marketplace.json` at the repository root | None — `PACKAGES` covers only `plugins/*`, so the root manifest is outside package validation |
| D3 copy | Both `copy.md` files | **Both package digests change** |

## D1 — installation path

The defect is real and consequential: the plugin loads today through `--plugin-dir`, which is how every run in this project invoked it, but nothing documents that and no marketplace manifest exists. A new user has no reproducible entry.

**A marketplace manifest is proposed; registering or installing it is not.** `docs/installation-pending.md` fences *execution* of installation instructions. Writing a manifest and documenting the commands is not executing them, and this proposal does not run `/plugin marketplace add`, `/plugin install`, or any equivalent.

That reading of the fence is mine, and it is the one open question in this proposal. If you read the fence as also barring the manifest's creation, take option `ODR@v1-B` instead, which repairs D2 and D3 only.

Content: a minimal manifest naming both packages by **relative** path (`./plugins/claude-thyquery`, `./plugins/codex-thyquery`). The root is outside `validate-packages.mjs`'s scan, so the absolute-path and remote-endpoint prohibitions do not formally apply there — relative paths are used anyway, because the rule exists for a reason that does not stop at a directory boundary.

Also proposed: `docs/installation.md` recording the exact command sequence, what each command changes, and how to reverse it — explicitly not executed. `docs/installation-pending.md` gains a pointer to it and keeps its existing prohibitions intact.

## D2 — README expectation alignment

`README.md:18` describes closure without saying that its principal conjunct is false in v1. A reader who reaches `ACCEPTED_RESIDUAL` — the only success the release can produce — has been set up to read it as a shortfall.

This is the `CAL_OK` correction failing to propagate. It was applied to the closure policy, the generator template, and both skills; the README was not in that pass, and nothing checked it. **The same gap could recur**, so the repair adds a check.

Proposed: state in `README.md` that v1 ships no calibration, that `EPISTEMIC_CLOSED` is therefore unreachable, and that `ACCEPTED_RESIDUAL` is the only reachable success outcome — and that this is a release fact, not a judgment. Add a test asserting the README carries that statement while the closure policy does, so the two cannot drift apart again silently.

## D3 — output language

Both `copy.md` files hardcode five Korean outcome strings while instructing "Keep host wording natural, but preserve the following meanings". The instruction is right and the content contradicts it. An English speaker's first failure screen is in Korean.

Proposed: restate each outcome as **the meaning to preserve** rather than a fixed string, with the existing Korean rendering kept as one reference example and an English rendering added alongside. Add an explicit rule that output language follows the user's query language, and that an explicit language request from the user overrides.

The five current Korean meanings are preserved exactly. This unpins the language; it does not reword the outcomes.

Both packages change, so both digests move and `docs/implementation-evidence.md`, `docs/change-review.md`, and the parity vocabulary follow as they have on every prior package change.

## Constraints that bound the work

- `validate-packages.mjs`: package files must be `.json`, `.md`, or `.yaml`; no absolute paths; no `http(s)://` inside a package. `docs/installation.md` lives outside the packages, so command examples there are unconstrained; nothing resembling a URL may enter `copy.md`.
- `copy.md` is hand-written, not generated. `render-plugin-resources.mjs` produces only the three `*.generated.md` files, which must not be touched.
- The two `copy.md` files already differ by invocation grammar and must continue to.

## Verification

`npm run check` (test, validate, fixtures, runner doctor and dry) must exit 0 after each repair, with `npm run validate` printing "two self-contained instruction-only packages validate" and no generated mismatch. New tests: a README/closure-policy consistency assertion for D2, and a `copy.md` assertion for D3 that both files carry the language rule and neither pins a single language.

Manual: parse the new manifest as JSON for validity only. **No installation command is run.**

## Options

### `ODR@v1-A` — recommended: all three

D2 first (no digest impact, closes a propagation gap and adds the check that prevents its recurrence), then D3 (the user-visible defect), then D1.

### `ODR@v1-B` — D2 and D3 only

Repairs both defects that need no judgment about the installation fence, and leaves D1 for a decision made on its own terms. Choose this if the fence reading above is wrong.

### `ODR@v1-C` — D2 only

The smallest honest step: the README currently misleads about what success looks like.

## Recommendation and exact gate

`ODR@v1-A`. All three are real, all three are cheap, and D1 is the one that decides whether anyone but you can run this at all.

Exact `ODR@v1-A 승인` authorizes the three repairs, their tests, and the digest rebinding that follows.

It does not authorize executing any installation command, registering a marketplace, enabling or installing either plugin, publication, deployment, any live host run, or efficacy evaluation.
