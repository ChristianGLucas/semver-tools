import { SemverRangeRequest } from '../gen/messages_pb';
import { minVersion } from './min_version';
import { ctx } from './testkit';

function minV(range: string) {
  const input = new SemverRangeRequest();
  input.setRange(range);
  return minVersion(ctx, input);
}

describe('MinVersion', () => {
  it('computes the floor of a comparator range', () => {
    const result = minV('>=1.2.3 <2.0.0');
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3');
  });

  it('computes the floor of a tilde range', () => {
    expect(minV('~1.2').getVersion()).toBe('1.2.0');
  });

  it('computes the floor of a caret range', () => {
    expect(minV('^1.2.3').getVersion()).toBe('1.2.3');
  });

  it('fails on a syntactically invalid range', () => {
    const result = minV('not a range');
    expect(result.getOk()).toBe(false);
    expect(result.getError()).not.toBe('');
  });
});
