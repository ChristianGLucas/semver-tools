import { SemverSatisfiesRequest, SemverSatisfiesResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Test whether a version satisfies a range, e.g. satisfies("1.2.3",
 * "^1.0.0") -> true, satisfies("2.0.0", "^1.0.0") -> false,
 * satisfies("1.2.3", "~1.2") -> true. `include_prerelease` widens matching
 * to admit a prerelease version even when the range carries no prerelease
 * tag on the same [major,minor,patch] tuple (off by default, per the
 * SemVer spec's own prerelease-exclusion rule).
 *
 * An unparseable version or an invalid range both come back as
 * `satisfies: false` with `error` set — matching node-semver's own
 * behavior of treating a bad version as simply "does not satisfy" rather
 * than throwing, but distinguished here from a syntactically bad range.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function satisfies(ax: AxiomContext, input: SemverSatisfiesRequest): SemverSatisfiesResult {
  const out = new SemverSatisfiesResult();
  try {
    const version = input.getVersion();
    const range = input.getRange();
    checkLen(version, 'version', MAX_VERSION_CHARS);

    const opts = {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    };

    if (semver.validRange(range, opts) === null) {
      out.setSatisfies(false);
      out.setError('not a valid range');
      return out;
    }

    out.setSatisfies(semver.satisfies(version, range, opts));
    return out;
  } catch (e) {
    out.setSatisfies(false);
    out.setError(errorMessage(e, 'testing satisfies'));
    return out;
  }
}
