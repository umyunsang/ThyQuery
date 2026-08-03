import { createHash } from "node:crypto";

function normalize(value, seen) {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("Canonical values cannot contain non-finite numbers");
    }
    return Object.is(value, -0) ? 0 : value;
  }

  if (Array.isArray(value)) {
    if (seen.has(value)) {
      throw new TypeError("Canonical values cannot contain cycles");
    }
    seen.add(value);
    const result = value.map((item) => normalize(item, seen));
    seen.delete(value);
    return result;
  }

  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      throw new TypeError("Canonical values must use plain objects");
    }
    if (seen.has(value)) {
      throw new TypeError("Canonical values cannot contain cycles");
    }
    seen.add(value);
    const result = {};
    for (const key of Object.keys(value).sort()) {
      const item = value[key];
      if (item === undefined) {
        throw new TypeError(`Canonical value at ${key} is undefined`);
      }
      result[key] = normalize(item, seen);
    }
    seen.delete(value);
    return result;
  }

  throw new TypeError(`Unsupported canonical value type: ${typeof value}`);
}

export function canonicalValue(value) {
  return normalize(value, new Set());
}

export function canonicalize(value) {
  return JSON.stringify(canonicalValue(value));
}

export function sha256(value) {
  const bytes = typeof value === "string" ? value : canonicalize(value);
  return createHash("sha256").update(bytes, "utf8").digest("hex");
}

export function digest(value) {
  return `sha256:${sha256(value)}`;
}
