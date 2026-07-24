import { SemverRangeRequest, SemverVersionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { errorMessage } from './lib';

/**
 * Compute the lowest version that could possibly satisfy a range —
 * structurally, from the range alone, not from any supplied list of real
 * versions. minVersion(">=1.2.3 <2.0.0") -> "1.2.3". minVersion("~1.2") ->
 * "1.2.0". Use this to find a floor for a dependency range; use
 * MinSatisfying when you have an actual list of published versions to pick
 * from.
 *
 * `ok` is false when the range is invalid, or (rare) has no possible
 * minimum.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function minVersion(ax: AxiomContext, input: SemverRangeRequest): SemverVersionResult {
  const out = new SemverVersionResult();
  try {
    const range = input.getRange();

    const opts = {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    };

    if (semver.validRange(range, opts) === null) {
      out.setOk(false);
      out.setError('not a valid range');
      return out;
    }

    const result = semver.minVersion(range, opts);
    if (result === null) {
      out.setOk(false);
      out.setError('range has no possible minimum version');
      return out;
    }

    out.setOk(true);
    out.setVersion(result.version);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'computing min version'));
    return out;
  }
}
