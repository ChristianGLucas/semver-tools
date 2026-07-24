import { SemverRangeRequest, SemverRangeResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { errorMessage } from './lib';

/**
 * Validate a range and normalize it to its comparator-set form, e.g.
 * "~1.2" -> ">=1.2.0 <1.3.0-0", ">=1.2.3 <2.0.0" -> ">=1.2.3 <2.0.0"
 * (already normalized). Accepts every npm range syntax: exact versions,
 * comparators (>=, <=, >, <, =), caret (^), tilde (~), hyphen ranges
 * ("1.2.3 - 2.3.4"), x-ranges ("1.2.x", "1.x", "*"), and "||"-joined
 * unions.
 *
 * `ok` is false and `range` is empty when the input is not a syntactically
 * valid range.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function cleanRange(ax: AxiomContext, input: SemverRangeRequest): SemverRangeResult {
  const out = new SemverRangeResult();
  try {
    const range = input.getRange();

    const cleaned = semver.validRange(range, {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    });

    if (cleaned === null) {
      out.setOk(false);
      out.setError('not a valid range');
      return out;
    }

    out.setOk(true);
    out.setRange(cleaned);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'cleaning range'));
    return out;
  }
}
