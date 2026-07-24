import { SemverTwoRangeRequest, SemverBoolResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { errorMessage } from './lib';

/**
 * Test whether range1 is a subset of range2 — i.e. every version that
 * satisfies range1 also satisfies range2. subset("1.2.3", "^1.0.0") -> true
 * (the single version 1.2.3 is within ^1.0.0's span). subset("^2.0.0",
 * "^1.0.0") -> false. Order matters: subset(A, B) asks "is A entirely
 * contained in B", not the reverse.
 *
 * `result` is false with `error` set when either range is syntactically
 * invalid.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function subset(ax: AxiomContext, input: SemverTwoRangeRequest): SemverBoolResult {
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

    out.setResult(semver.subset(range1, range2, opts));
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'testing range subset'));
    return out;
  }
}
