import { SemverSatisfiesRequest } from '../gen/messages_pb';
import { versionVsRange } from './version_vs_range';
import { ctx } from './testkit';

function pos(version: string, range: string) {
  const input = new SemverSatisfiesRequest();
  input.setVersion(version);
  input.setRange(range);
  return versionVsRange(ctx, input);
}

describe('VersionVsRange', () => {
  it('reports "above" when the version exceeds everything the range could match', () => {
    const result = pos('2.0.0', '<1.0.0');
    expect(result.getPosition()).toBe('above');
    expect(result.getError()).toBe('');
  });

  it('reports "below" when the version is under everything the range could match', () => {
    expect(pos('0.5.0', '>=1.0.0').getPosition()).toBe('below');
  });

  it('reports "within" when the version satisfies the range', () => {
    expect(pos('1.5.0', '>=1.0.0 <2.0.0').getPosition()).toBe('within');
  });

  it('an impossible range has no well-defined position: reported as an error, not a guess', () => {
    const result = pos('1.5.0', '>2.0.0 <1.0.0');
    expect(result.getPosition()).toBe('');
    expect(result.getError()).not.toBe('');
  });

  it('a malformed version is a structured error', () => {
    const result = pos('not-a-version', '^1.0.0');
    expect(result.getError()).not.toBe('');
  });

  it('a malformed range is a structured error', () => {
    const result = pos('1.0.0', 'not a range');
    expect(result.getError()).not.toBe('');
  });
});
