import { SemverVersionPairRequest, SemverDiffResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Report which part changed between two versions: "major", "minor",
 * "patch", or "prerelease" — with a "pre" prefix (e.g. "preminor") when the
 * higher of the two versions is itself a prerelease. `equal` is true (and
 * `release_type` empty) when the two versions are identical.
 *
 * Examples: diff("1.0.0", "1.1.0") -> "minor". diff("1.2.3", "1.2.3-beta.1")
 * -> "prerelease" is NOT what happens — going TO a prerelease from a release
 * on the same [major,minor,patch] is "prerelease"; going from "1.0.0-1" to
 * "1.0.0" is "major" (node-semver's own special-casing for the
 * prerelease-with-only-a-major case — see its diff() implementation).
 *
 * A malformed version1/version2 is a structured error, not a crash.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function diff(ax: AxiomContext, input: SemverVersionPairRequest): SemverDiffResult {
  const out = new SemverDiffResult();
  try {
    const v1 = input.getVersion1();
    const v2 = input.getVersion2();
    checkLen(v1, 'version1', MAX_VERSION_CHARS);
    checkLen(v2, 'version2', MAX_VERSION_CHARS);

    // diff() has no options parameter — it always parses strictly
    // (node-semver's own implementation choice). `loose` on this shared
    // request shape is a Compare-only field; Diff ignores it, same as
    // Compare ignores `consider_build`... except the reverse: here it is
    // Diff that has nothing to accept.
    const result = semver.diff(v1, v2);
    if (result === null) {
      out.setEqual(true);
      out.setReleaseType('');
      return out;
    }

    out.setEqual(false);
    out.setReleaseType(result);
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'diffing versions'));
    return out;
  }
}
