// Shared bounds and small helpers for the semver-tools nodes. Not a node and
// not a test file, so it is neither registered nor collected.
//
// The algorithmically hard part — parsing, comparing, and range-matching a
// SemVer version — is entirely owned by node-semver; nothing here
// re-implements any of it. What lives here is purely: (a) defense-in-depth
// length bounds on top of what node-semver itself already enforces, and (b)
// turning a thrown Error into this package's structured error contract,
// since node-semver's own functions are a mix of "throw on bad input" (the
// class constructors, compare, diff, inc, sort) and "return null/false on bad
// input" (parse, clean, coerce, satisfies, validRange) — a caller of THIS
// package should never have to know which convention a given operation uses.
//
// Cost bound rationale: node-semver 7.x itself already caps a single VERSION
// string at 256 characters (classes/semver.js, MAX_LENGTH) — that guard is
// upstream and this package inherits it for free. It does NOT cap a RANGE
// string (a range is built by splitting on "||"/whitespace, and an
// adversarially long one does linear-ish extra regex work per comparator) or
// the free-form text Coerce searches, or the length of a versions[] list a
// caller supplies to MaxSatisfying/MinSatisfying/Sort. Those three are capped
// here as a deliberately simple, generous, defense-in-depth ceiling — not
// because a legitimate range/list ever approaches it.

import * as semverModule from 'semver';

/** Generous ceiling for a single version string, matching node-semver's own
 * internal MAX_LENGTH so this package's error message fires before node-semver's
 * generic one does. */
export const MAX_VERSION_CHARS = 256;

/** Ceiling for a range string. A real-world range (even a hand-built
 * "1.2.3 || 2.x || >=3.0.0 <4.0.0") is well under 200 characters; this leaves
 * two full orders of magnitude of headroom while still bounding cost. */
export const MAX_RANGE_CHARS = 2_000;

/** Ceiling for the free-form text Coerce searches for a version inside. */
export const MAX_TEXT_CHARS = 10_000;

/** Ceiling for a versions[] list (MaxSatisfying / MinSatisfying / Sort). */
export const MAX_LIST_ENTRIES = 2_000;

export class BoundsError extends Error {}

/** Rejects an oversized string field before it reaches node-semver. */
export function checkLen(value: string, field: string, max: number): void {
  if (value.length > max) {
    throw new BoundsError(`${field} is longer than ${max} characters`);
  }
}

/** Rejects an oversized list before it reaches node-semver. */
export function checkListLen(values: string[], field: string, max: number): void {
  if (values.length > max) {
    throw new BoundsError(`${field} has more than ${max} entries`);
  }
}

/** Turns a caught value (node-semver throws plain Errors) into a stable message. */
export function errorMessage(e: unknown, context: string): string {
  if (e instanceof Error) {
    return `${context}: ${e.message}`;
  }
  return `${context}: ${String(e)}`;
}

/** The release types node-semver's own inc() accepts, for input validation
 * with a clear message instead of node-semver's generic "invalid increment
 * argument" — see classes/semver.js's inc() switch. */
export const INCREMENT_RELEASE_TYPES = [
  'major', 'minor', 'patch',
  'premajor', 'preminor', 'prepatch',
  'prerelease', 'release',
] as const;

/** The release types node-semver's truncate() accepts — see functions/truncate.js
 * (any RELEASE_TYPES entry; "release" is not one of them for truncate). */
export const TRUNCATE_RELEASE_TYPES = [
  'major', 'minor', 'patch',
  'premajor', 'preminor', 'prepatch',
  'prerelease',
] as const;

/**
 * Typed access to node-semver's `truncate()` export.
 *
 * @types/semver@7.7.x has not yet caught up with node-semver@7.8.x's
 * `truncate` export — the runtime module DOES export it (confirmed against
 * node_modules/semver/index.js); only the .d.ts is behind. A `declare module
 * 'semver' { ... }` augmentation was tried first, but Axiom's local dev
 * server compiles nodes/ through ts-node against the assembled .axiom/dev/
 * build context, and the augmentation's declaration merge did not take
 * effect there even though `axiom test`'s plain jest/ts-jest run picked it
 * up fine — so it looked correct until the first `axiom dev` invoke. This
 * single narrow cast is the contained, environment-independent fix; every
 * call site gets the real `(version, truncation, options) => string | null`
 * signature back.
 */
export const semverTruncate: (
  version: string,
  truncation: string,
  options?: { loose?: boolean }
) => string | null = (semverModule as unknown as { truncate: typeof semverTruncate }).truncate;
