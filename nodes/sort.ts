import { SemverSortRequest, SemverSortResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Sort a list of versions in SemVer precedence order — ascending by
 * default, e.g. sort(["1.2.3", "1.0.0", "2.0.0"]) -> ["1.0.0", "1.2.3",
 * "2.0.0"]; `descending: true` reverses it. Unlike MaxSatisfying/
 * MinSatisfying, EVERY entry must be a valid SemVer version — node-semver's
 * sort() throws on the first unparseable entry rather than skipping it, and
 * this node mirrors that as a structured error (`versions` is then empty)
 * instead of silently dropping data a caller might not expect to lose.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function sort(ax: AxiomContext, input: SemverSortRequest): SemverSortResult {
  const out = new SemverSortResult();
  try {
    const versions = input.getVersionsList();
    versions.forEach((v, i) => checkLen(v, `versions[${i}]`, MAX_VERSION_CHARS));

    const loose = input.getLoose();
    const invalid = versions.find((v) => semver.valid(v, { loose }) === null);
    if (invalid !== undefined) {
      out.setError(`not a valid SemVer version: "${invalid}"`);
      return out;
    }

    const sorted = input.getDescending()
      ? semver.rsort(versions, { loose })
      : semver.sort(versions, { loose });

    out.setVersionsList(sorted);
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'sorting versions'));
    return out;
  }
}
