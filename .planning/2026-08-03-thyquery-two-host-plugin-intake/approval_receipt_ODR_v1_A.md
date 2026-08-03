# Approval Receipt — ODR@v1-A

- Date: 2026-08-03 (Asia/Seoul)
- User message: `ODR@v1-A 승인`
- Approved artifact: `ODR_v1.md`
- Approved artifact SHA-256: `1557c9254e26ec6b2e749091e66dd1d827086c73d96ca6e4088cfa4f41102d7f` (reverified at approval)
- Pre-repair Claude package digest: `sha256:3db4dc02e5c9e8e5ce4f6455d5e680e4e3bd18f865e2984f241fbba3fd2b1f69`
- Pre-repair Codex package digest: `sha256:24568cf1b6b78e0a30c1de2bf37cc921419f8eaf1a6626138f48613be21ccf71`

## Authorized

- **D2** — state in `README.md` that v1 ships no calibration, `EPISTEMIC_CLOSED` is unreachable, and `ACCEPTED_RESIDUAL` is the only reachable success; add a test binding the README to the closure policy so they cannot drift apart silently again.
- **D3** — restate the five outcome strings in both `copy.md` files as meanings to preserve, with Korean kept as one reference rendering and English added alongside, plus an explicit rule that output language follows the user's query language and an explicit request overrides. The five meanings are preserved exactly.
- **D1** — create `.claude-plugin/marketplace.json` at the repository root naming both packages by relative path, and `docs/installation.md` recording the command sequence, what each command changes, and how to reverse it. Point `docs/installation-pending.md` at it while keeping its prohibitions intact.
- The digest rebinding that follows the D3 package change, and new tests for D2 and D3.

## Not authorized

- Executing any installation command, registering a marketplace, or installing or enabling either plugin
- Publication, deployment, distribution
- Any live host run or efficacy evaluation
- Touching the three `*.generated.md` files
- Rewording the five outcome meanings — D3 unpins language, it does not rewrite outcomes

## The reading this receipt rests on

`docs/installation-pending.md` fences *execution* of installation instructions. Writing a manifest and documenting commands is not executing them. That reading was stated as the proposal's one open question and approved with it; if it later proves wrong, the repair is fully reversible by deleting two files.
