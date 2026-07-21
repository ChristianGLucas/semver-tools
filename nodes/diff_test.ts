import { SemverVersionPairRequest } from '../gen/messages_pb';
import { diff } from './diff';
import { ctx } from './testkit';

function d(v1: string, v2: string) {
  const input = new SemverVersionPairRequest();
  input.setVersion1(v1);
  input.setVersion2(v2);
  return diff(ctx, input);
}

describe('Diff', () => {
  it('reports the release-type boundary crossed, for each of major/minor/patch', () => {
    expect(d('1.0.0', '1.1.0').getReleaseType()).toBe('minor');
    expect(d('1.2.3', '2.0.0').getReleaseType()).toBe('major');
    expect(d('1.2.3', '1.2.4').getReleaseType()).toBe('patch');
  });

  it('reports equal (empty release_type) for identical versions', () => {
    const result = d('1.0.0', '1.0.0');
    expect(result.getEqual()).toBe(true);
    expect(result.getReleaseType()).toBe('');
  });

  it('going from a release to a same-tuple prerelease is "patch"', () => {
    // node-semver's own special-casing: 1.2.3 -> 1.2.3-beta.1 has no numeric
    // change on [major,minor,patch], so it reports patch, not "prerelease".
    const result = d('1.2.3', '1.2.3-beta.1');
    expect(result.getEqual()).toBe(false);
    expect(result.getReleaseType()).toBe('patch');
  });

  it('a prerelease-to-prerelease change gets the "pre" prefix', () => {
    expect(d('1.2.3-beta.1', '1.2.4-beta.1').getReleaseType()).toBe('prepatch');
  });

  it('a prerelease with only a major component always diffs as major', () => {
    expect(d('1.0.0-1', '1.0.0').getReleaseType()).toBe('major');
    expect(d('1.0.0-1', '1.1.1').getReleaseType()).toBe('major');
  });

  it('returns a structured error for a malformed version rather than throwing', () => {
    const result = d('nope', '1.0.0');
    expect(result.getError()).not.toBe('');
  });
});
