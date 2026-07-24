import { SemverSatisfiesRequest, SemverRangePositionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Report where a version sits relative to a range: "below" (lower than
 * every version the range could match), "within" (satisfies the range), or
 * "above" (higher than every version the range could match). Combines
 * node-semver's separate `gtr`/`ltr` convenience functions into one
 * three-way answer, since "is it above, below, or inside" is one question a
 * caller actually asks, not two independent booleans.
 *
 * Example: versionVsRange("2.0.0", "<1.0.0") -> "above".
 * versionVsRange("0.5.0", ">=1.0.0") -> "below".
 * versionVsRange("1.5.0", ">=1.0.0 <2.0.0") -> "within".
 *
 * `position` is empty (with `error` set) when the version or range is
 * invalid, OR when the range itself is impossible to satisfy (e.g.
 * ">2.0.0 <1.0.0") — such a range is neither above nor below any version,
 * so "position" has no well-defined answer.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function versionVsRange(ax: AxiomContext, input: SemverSatisfiesRequest): SemverRangePositionResult {
  const out = new SemverRangePositionResult();
  try {
    const version = input.getVersion();
    const range = input.getRange();
    checkLen(version, 'version', MAX_VERSION_CHARS);

    const opts = {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    };

    if (semver.valid(version, opts) === null) {
      out.setError('not a valid SemVer version');
      return out;
    }
    if (semver.validRange(range, opts) === null) {
      out.setError('not a valid range');
      return out;
    }

    if (semver.satisfies(version, range, opts)) {
      out.setPosition('within');
    } else if (semver.gtr(version, range, opts)) {
      out.setPosition('above');
    } else if (semver.ltr(version, range, opts)) {
      out.setPosition('below');
    } else {
      // Neither satisfies, above, nor below: the range itself matches no
      // possible version (e.g. ">2.0.0 <1.0.0"), so "position relative to
      // the range" has no well-defined answer. Reported as an error rather
      // than guessing, since guessing "below" here would be simply wrong.
      out.setError('range matches no possible version; position is undefined');
    }
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'comparing version to range'));
    return out;
  }
}
