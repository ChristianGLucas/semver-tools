import { SemverCleanRequest, SemverVersionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Clean a decorated version string into strict normalized SemVer form —
 * strips a leading "v"/"=" and surrounding whitespace, e.g.
 * "  =v1.2.3 " -> "1.2.3". The input must still contain exactly one valid
 * version; Clean does not search free-form prose for one (use Coerce for
 * that). `ok` is false and `version` is empty when the input is not a
 * cleanable version.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function clean(ax: AxiomContext, input: SemverCleanRequest): SemverVersionResult {
  const out = new SemverVersionResult();
  try {
    const version = input.getVersion();
    checkLen(version, 'version', MAX_VERSION_CHARS);

    const cleaned = semver.clean(version, { loose: input.getLoose() });
    if (cleaned === null) {
      out.setOk(false);
      out.setError('not a cleanable SemVer version');
      return out;
    }

    out.setOk(true);
    out.setVersion(cleaned);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'cleaning version'));
    return out;
  }
}
