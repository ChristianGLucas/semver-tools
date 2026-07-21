import { SemverIncrementRequest, SemverVersionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import {
  MAX_VERSION_CHARS,
  INCREMENT_RELEASE_TYPES,
  checkLen,
  errorMessage,
} from './lib';

/**
 * Increment a version by a release type: major, minor, patch, premajor,
 * preminor, prepatch, prerelease, or release. Examples: inc("1.2.3",
 * "patch") -> "1.2.4". inc("1.2.3", "minor") -> "1.3.0". inc("1.2.3-beta.1",
 * "prerelease") -> "1.2.3-beta.2". inc("1.2.3", "premajor", identifier=
 * "beta") -> "2.0.0-beta.0". inc("1.2.3-beta.5", "release") -> "1.2.3"
 * (drops the prerelease tag without bumping the numeric version).
 *
 * `identifier` names the prerelease tag for the pre* types and for
 * `prerelease` itself (e.g. "beta", "rc"); ignored by the other types.
 * `identifier_base` sets the starting number for a NEW prerelease
 * identifier ("0", the default, or "1"); leave empty for the library
 * default.
 *
 * `ok` is false when `release_type` is not one of the eight above, or when
 * `version` does not parse — `error` distinguishes the two.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function increment(ax: AxiomContext, input: SemverIncrementRequest): SemverVersionResult {
  const out = new SemverVersionResult();
  try {
    const version = input.getVersion();
    const releaseType = input.getReleaseType();
    checkLen(version, 'version', MAX_VERSION_CHARS);

    if (!(INCREMENT_RELEASE_TYPES as readonly string[]).includes(releaseType)) {
      out.setOk(false);
      out.setError(
        `release_type must be one of: ${INCREMENT_RELEASE_TYPES.join(', ')}`
      );
      return out;
    }

    const identifierBaseRaw = input.getIdentifierBase();
    if (identifierBaseRaw !== '' && identifierBaseRaw !== '0' && identifierBaseRaw !== '1') {
      out.setOk(false);
      out.setError('identifier_base must be "0", "1", or empty');
      return out;
    }

    const loose = input.getLoose();
    const identifier = input.getIdentifier() || undefined;
    const identifierBase: semver.inc.IdentifierBase | undefined =
      identifierBaseRaw === '' ? undefined : identifierBaseRaw;

    const result = semver.inc(
      version,
      releaseType as semver.ReleaseType,
      { loose },
      identifier,
      identifierBase
    );

    if (result === null) {
      out.setOk(false);
      out.setError(
        semver.valid(version, { loose })
          ? 'increment failed'
          : 'not a valid SemVer version'
      );
      return out;
    }

    out.setOk(true);
    out.setVersion(result);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'incrementing version'));
    return out;
  }
}
