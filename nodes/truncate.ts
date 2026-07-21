import { SemverTruncateRequest, SemverVersionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import {
  MAX_VERSION_CHARS,
  TRUNCATE_RELEASE_TYPES,
  checkLen,
  errorMessage,
} from './lib';

/**
 * Truncate a version to a coarser precision, clearing everything finer and
 * dropping any prerelease tag: truncate("2.3.4-alpha.1", "minor") ->
 * "2.3.0". truncate("2.3.4-alpha.1", "major") -> "2.0.0".
 * truncate("2.3.4-alpha.1", "patch") -> "2.3.4" (patch is already the
 * finest non-prerelease precision, so only the prerelease tag is dropped).
 * A pre* truncation type (premajor, preminor, prepatch, prerelease) is a
 * no-op that returns the version unchanged (node-semver's own convention:
 * these types are "already at prerelease granularity").
 *
 * `ok` is false when `truncation` is not one of the seven listed, or when
 * `version` does not parse.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function truncate(ax: AxiomContext, input: SemverTruncateRequest): SemverVersionResult {
  const out = new SemverVersionResult();
  try {
    const version = input.getVersion();
    const truncation = input.getTruncation();
    checkLen(version, 'version', MAX_VERSION_CHARS);

    if (!(TRUNCATE_RELEASE_TYPES as readonly string[]).includes(truncation)) {
      out.setOk(false);
      out.setError(
        `truncation must be one of: ${TRUNCATE_RELEASE_TYPES.join(', ')}`
      );
      return out;
    }

    const loose = input.getLoose();
    const result = semver.truncate(version, truncation as semver.ReleaseType, { loose });

    if (result === null) {
      out.setOk(false);
      out.setError('not a valid SemVer version');
      return out;
    }

    out.setOk(true);
    out.setVersion(result);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'truncating version'));
    return out;
  }
}
