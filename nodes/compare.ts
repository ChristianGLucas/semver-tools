import { SemverVersionPairRequest, SemverCompareResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Compare two versions and return their ordering: -1 if version1 < version2,
 * 0 if equal, 1 if version1 > version2 — mirrored in `relation` as "lt",
 * "eq", or "gt". Comparison follows the SemVer 2.0.0 precedence rules
 * (numeric-then-alphanumeric prerelease comparison; build metadata ignored
 * by default).
 *
 * `consider_build` breaks a tie between two versions the spec considers
 * equal (which ignores build metadata) using their build metadata as a
 * final tiebreaker, giving a total order — useful when sorting/deduping
 * versions that legitimately differ only by build tag.
 *
 * A malformed version1/version2 is a structured error, not a crash.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function compare(ax: AxiomContext, input: SemverVersionPairRequest): SemverCompareResult {
  const out = new SemverCompareResult();
  try {
    const v1 = input.getVersion1();
    const v2 = input.getVersion2();
    checkLen(v1, 'version1', MAX_VERSION_CHARS);
    checkLen(v2, 'version2', MAX_VERSION_CHARS);

    const opts = { loose: input.getLoose() };
    const result = input.getConsiderBuild()
      ? semver.compareBuild(v1, v2, opts)
      : semver.compare(v1, v2, opts);

    out.setComparison(result);
    out.setRelation(result < 0 ? 'lt' : result > 0 ? 'gt' : 'eq');
    return out;
  } catch (e) {
    out.setError(errorMessage(e, 'comparing versions'));
    return out;
  }
}
