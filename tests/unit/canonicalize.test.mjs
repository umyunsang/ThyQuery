import test from "node:test";
import assert from "node:assert/strict";

import {
  canonicalize,
  digest,
  sha256,
} from "../../src/reference/canonicalize.mjs";

test("canonicalization sorts object keys recursively but preserves array order", () => {
  const left = { z: 1, a: { y: 2, x: [3, 4] } };
  const right = { a: { x: [3, 4], y: 2 }, z: 1 };
  assert.equal(canonicalize(left), canonicalize(right));
  assert.equal(digest(left), digest(right));
  assert.notEqual(digest([1, 2]), digest([2, 1]));
});

test("canonicalization normalizes negative zero and rejects lossy values", () => {
  assert.equal(canonicalize(-0), "0");
  assert.throws(() => canonicalize({ missing: undefined }), /undefined/);
  assert.throws(() => canonicalize(Number.NaN), /non-finite/);
  const cyclic = {};
  cyclic.self = cyclic;
  assert.throws(() => canonicalize(cyclic), /cycles/);
});

test("digest prefixes a lowercase SHA-256 receipt", () => {
  assert.match(digest({ a: 1 }), /^sha256:[0-9a-f]{64}$/);
  assert.equal(sha256("abc").length, 64);
});
