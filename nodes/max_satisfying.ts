import { SemverListRangeRequest, SemverVersionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import {
  MAX_VERSION_CHARS,
  MAX_RANGE_CHARS,
  MAX_LIST_ENTRIES,
  checkLen,
  checkListLen,
  errorMessage,
} from './lib';

/**
 * Pick the highest version in `versions` that satisfies `range`, e.g.
 * maxSatisfying(["1.2.3", "1.3.0", "2.0.0"], "^1.0.0") -> "1.3.0". Entries
 * of `versions` that are not themselves valid SemVer versions are silently
 * skipped (node-semver's own `satisfies`-based filtering behavior) rather
 * than failing the whole call.
 *
 * `ok` is false when the range is invalid, OR when no entry in `versions`
 * satisfies it — `error` is set only for the former; a genuine "no match"
 * is not an error condition.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function maxSatisfying(ax: AxiomContext, input: SemverListRangeRequest): SemverVersionResult {
  const out = new SemverVersionResult();
  try {
    const versions = input.getVersionsList();
    const range = input.getRange();
    checkListLen(versions, 'versions', MAX_LIST_ENTRIES);
    versions.forEach((v, i) => checkLen(v, `versions[${i}]`, MAX_VERSION_CHARS));
    checkLen(range, 'range', MAX_RANGE_CHARS);

    const opts = {
      loose: input.getLoose(),
      includePrerelease: input.getIncludePrerelease(),
    };

    if (semver.validRange(range, opts) === null) {
      out.setOk(false);
      out.setError('not a valid range');
      return out;
    }

    const result = semver.maxSatisfying(versions, range, opts);
    if (result === null) {
      out.setOk(false);
      return out;
    }

    out.setOk(true);
    out.setVersion(result);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'finding max satisfying version'));
    return out;
  }
}
