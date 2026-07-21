import { SemverParseRequest, SemverVersion } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { MAX_VERSION_CHARS, checkLen, errorMessage } from './lib';

/**
 * Parse a version string into its structured components: major, minor,
 * patch, dot-separated prerelease identifiers, and dot-separated build
 * identifiers. `version` in the result is the normalized form (leading "v",
 * surrounding whitespace, etc. stripped) — for example "  =v1.2.3 " parses
 * with `loose: true` to major=1, minor=2, patch=3, version="1.2.3".
 *
 * A prerelease identifier that is itself numeric (e.g. the "1" in
 * "1.2.3-alpha.1") is reported as its decimal string, not specially typed.
 *
 * `valid` is false and every other field is at its zero value when the input
 * does not parse as SemVer 2.0.0 (optionally loosened by `loose`) — `error`
 * then explains why. Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function parse(ax: AxiomContext, input: SemverParseRequest): SemverVersion {
  const out = new SemverVersion();
  try {
    const version = input.getVersion();
    checkLen(version, 'version', MAX_VERSION_CHARS);

    const parsed = semver.parse(version, { loose: input.getLoose() });
    if (!parsed) {
      out.setValid(false);
      out.setError('not a valid SemVer version');
      return out;
    }

    out.setValid(true);
    out.setVersion(parsed.version);
    out.setMajor(parsed.major);
    out.setMinor(parsed.minor);
    out.setPatch(parsed.patch);
    out.setPrereleaseList(parsed.prerelease.map((p) => String(p)));
    out.setBuildList(parsed.build.map((b) => String(b)));
    return out;
  } catch (e) {
    out.setValid(false);
    out.setError(errorMessage(e, 'parsing version'));
    return out;
  }
}
