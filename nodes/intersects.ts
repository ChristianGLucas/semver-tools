import { SemverTwoRangeRequest, SemverBoolResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { errorMessage } from './lib';

/**
 * Test whether two ranges share at least one version that satisfies both,
 * e.g. intersects(">=1.0.0 <2.0.0", ">=1.5.0 <3.0.0") -> true (they share
 * [1.5.0, 2.0.0)); intersects("<1.0.0", ">=2.0.0") -> false. Useful for
 * detecting a dependency conflict between two version constraints before
 * trying to resolve one.
 *
 * `result` is false with `error` set when either range is syntactically
 * invalid.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function intersects(ax: AxiomContext, input: SemverTwoRangeRequest): SemverBoolResult {
  const out = new SemverBoolResult();
  try {
    const range1 = input.getRange1();
    const range2 = input.getRange2();

    const opts = {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    };

    if (semver.validRange(range1, opts) === null) {
      out.setError('range1 is not a valid range');
      return out;
    }
    if (semver.validRange(range2, opts) === null) {
      out.setError('range2 is not a valid range');
      return out;
    }

    out.setResult(semver.intersects(range1, range2, opts));
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'testing range intersection'));
    return out;
  }
}
