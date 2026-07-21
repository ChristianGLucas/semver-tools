import { SemverListRangeRequest } from '../gen/messages_pb';
import { minSatisfying } from './min_satisfying';
import { ctx } from './testkit';

function minSat(versions: string[], range: string) {
  const input = new SemverListRangeRequest();
  input.setVersionsList(versions);
  input.setRange(range);
  return minSatisfying(ctx, input);
}

describe('MinSatisfying', () => {
  it('picks the lowest version in the list that satisfies the range', () => {
    const result = minSat(['1.2.3', '1.3.0', '2.0.0'], '^1.0.0');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3');
  });

  it('ok is false (no error) when nothing in the list satisfies', () => {
    const result = minSat(['3.0.0', '4.0.0'], '^1.0.0');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toBe('');
  });

  it('ok is false WITH an error when the range itself is invalid', () => {
    const result = minSat(['1.2.3'], 'not a range');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).not.toBe('');
  });
});
