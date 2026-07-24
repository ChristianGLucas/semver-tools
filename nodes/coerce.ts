import { SemverCoerceRequest, SemverVersionResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import * as semver from 'semver';
import { errorMessage } from './lib';

/**
 * Extract a version out of arbitrary, loosely-versioned text — the widest of
 * the parsing nodes. Where Parse and Clean require the input to already BE a
 * version, Coerce searches for a version-shaped substring anywhere in `text`,
 * e.g. "next-9.3.5" -> "9.3.5", "  v2  " -> "2.0.0", "2.3.4.5" -> "2.3.4"
 * (extra dotted segments beyond patch are dropped). Missing minor/patch
 * segments default to 0.
 *
 * `right_to_left` finds the right-most coercible run instead of the
 * left-most, so "1.2.3.4" coerces to "2.3.4" instead of "1.2.3".
 * `include_prerelease` additionally captures a trailing prerelease/build tag
 * when one immediately follows the coerced version.
 *
 * `ok` is false and `version` is empty when no coercible version is found
 * anywhere in the text.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function coerce(ax: AxiomContext, input: SemverCoerceRequest): SemverVersionResult {
  const out = new SemverVersionResult();
  try {
    const text = input.getText();

    const coerced = semver.coerce(text, {
      includePrerelease: input.getIncludePrerelease(),
      rtl: input.getRightToLeft(),
    });
    if (!coerced) {
      out.setOk(false);
      out.setError('no coercible version found in text');
      return out;
    }

    out.setOk(true);
    out.setVersion(coerced.version);
    return out;
  } catch (e) {
    out.setOk(false);
    out.setError(errorMessage(e, 'coercing version'));
    return out;
  }
}
