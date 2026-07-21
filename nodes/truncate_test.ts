import { SemverTruncateRequest } from '../gen/messages_pb';
import { truncate } from './truncate';
import { ctx } from './testkit';

function trunc(version: string, truncation: string) {
  const input = new SemverTruncateRequest();
  input.setVersion(version);
  input.setTruncation(truncation);
  return truncate(ctx, input);
}

describe('Truncate', () => {
  it('truncates to minor precision, clearing patch and prerelease', () => {
    const result = trunc('2.3.4-alpha.1', 'minor');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('2.3.0');
  });

  it('truncates to major precision, clearing minor, patch, and prerelease', () => {
    expect(trunc('2.3.4-alpha.1', 'major').getVersion()).toBe('2.0.0');
  });

  it('truncates to patch precision by only dropping the prerelease tag', () => {
    expect(trunc('2.3.4-alpha.1', 'patch').getVersion()).toBe('2.3.4');
  });

  it('a pre* truncation type is a no-op (already prerelease granularity)', () => {
    expect(trunc('2.3.4-alpha.1', 'prerelease').getVersion()).toBe('2.3.4-alpha.1');
  });

  it('rejects an unknown truncation type with a clear structured error', () => {
    const result = trunc('1.2.3', 'bogus');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toContain('truncation must be one of');
  });

  it('rejects a malformed version with a structured error', () => {
    const result = trunc('not-a-version', 'minor');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).not.toBe('');
  });
});
