import { SemverListRangeRequest } from '../gen/messages_pb';
import { maxSatisfying } from './max_satisfying';
import { ctx } from './testkit';

function maxSat(versions: string[], range: string) {
  const input = new SemverListRangeRequest();
  input.setVersionsList(versions);
  input.setRange(range);
  return maxSatisfying(ctx, input);
}

describe('MaxSatisfying', () => {
  it('picks the highest version in the list that satisfies the range', () => {
    const result = maxSat(['1.2.3', '1.3.0', '2.0.0'], '^1.0.0');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.3.0');
  });

  it('skips invalid entries in the list rather than failing outright', () => {
    const result = maxSat(['1.2.3', 'garbage', '1.5.0'], '^1.0.0');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.5.0');
  });

  it('ok is false (no error) when nothing in the list satisfies', () => {
    const result = maxSat(['3.0.0', '4.0.0'], '^1.0.0');
    expect(result.getOk()).toBe(false);
    expect(result.getVersion()).toBe('');
    expect(result.getError()).toBe('');
  });

  it('ok is false WITH an error when the range itself is invalid', () => {
    const result = maxSat(['1.2.3'], 'not a range');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).not.toBe('');
  });

  it('handles a large versions list without a crash (size is the platform\'s concern, not this node\'s)', () => {
    const result = maxSat(new Array(5000).fill('1.0.0'), '^1.0.0');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.0.0');
  });
});
