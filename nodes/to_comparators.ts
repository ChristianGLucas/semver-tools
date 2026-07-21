import { SemverRangeRequest, SemverComparatorSets, SemverComparatorSet } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_RANGE_CHARS, checkLen, errorMessage } from './lib';

/**
 * Decompose a range into its normal form: an OR-list of ANDed comparator
 * sets. A range's top-level "||" branches become separate sets; the
 * space-separated comparators within one branch become that set's
 * `comparators` list. Example: toComparators("1.2.3 || >=2.0.0") ->
 * [{comparators: ["1.2.3"]}, {comparators: [">=2.0.0"]}].
 * toComparators("~1.2") -> [{comparators: [">=1.2.0", "<1.3.0-0"]}] (a
 * single range keyword expands to its equivalent comparator pair).
 *
 * Use this to inspect or re-render a range's structure; Satisfies/
 * CleanRange are almost always the right node for testing or normalizing a
 * range as a whole.
 *
 * `sets` is empty with `error` set when the range is not syntactically
 * valid.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function toComparators(ax: AxiomContext, input: SemverRangeRequest): SemverComparatorSets {
  const out = new SemverComparatorSets();
  try {
    const range = input.getRange();
    checkLen(range, 'range', MAX_RANGE_CHARS);

    const opts = {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    };

    const sets = semver.toComparators(range, opts);
    out.setSetsList(
      sets.map((comparators) => {
        const set = new SemverComparatorSet();
        set.setComparatorsList(comparators);
        return set;
      })
    );
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'decomposing range'));
    return out;
  }
}
