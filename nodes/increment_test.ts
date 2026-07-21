import { SemverIncrementRequest } from '../gen/messages_pb';
import { increment } from './increment';
import { ctx } from './testkit';

function inc(version: string, releaseType: string, identifier = '', identifierBase = '') {
  const input = new SemverIncrementRequest();
  input.setVersion(version);
  input.setReleaseType(releaseType);
  input.setIdentifier(identifier);
  input.setIdentifierBase(identifierBase);
  return increment(ctx, input);
}

describe('Increment', () => {
  it('increments patch/minor/major (hand-known SemVer arithmetic)', () => {
    expect(inc('1.2.3', 'patch').getVersion()).toBe('1.2.4');
    expect(inc('1.2.3', 'minor').getVersion()).toBe('1.3.0');
    expect(inc('1.2.3', 'major').getVersion()).toBe('2.0.0');
  });

  it('minor/major reset the finer components to 0', () => {
    expect(inc('1.2.3', 'minor').getVersion()).toBe('1.3.0');
    expect(inc('1.2.3', 'major').getVersion()).toBe('2.0.0');
  });

  it('bumps an existing prerelease number', () => {
    const result = inc('1.2.3-beta.1', 'prerelease');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3-beta.2');
  });

  it('premajor with an identifier starts a new prerelease at .0', () => {
    const result = inc('1.2.3', 'premajor', 'beta');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('2.0.0-beta.0');
  });

  it('release drops the prerelease tag without bumping the numeric version', () => {
    const result = inc('1.2.3-beta.5', 'release');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3');
  });

  it('rejects an unknown release_type with a clear structured error', () => {
    const result = inc('1.2.3', 'bogus-type');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toContain('release_type must be one of');
  });

  it('rejects a malformed version with a structured error', () => {
    const result = inc('not-a-version', 'patch');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).not.toBe('');
  });

  it('rejects an invalid identifier_base', () => {
    const result = inc('1.2.3', 'prerelease', 'beta', 'bogus');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toContain('identifier_base');
  });

  it('is deterministic across repeated calls', () => {
    const a = inc('1.2.3', 'minor');
    const b = inc('1.2.3', 'minor');
    expect(a.toObject()).toEqual(b.toObject());
  });
});
