import { SemverRangeRequest } from '../gen/messages_pb';
import { toComparators } from './to_comparators';
import { ctx } from './testkit';

function toComp(range: string) {
  const input = new SemverRangeRequest();
  input.setRange(range);
  return toComparators(ctx, input);
}

describe('ToComparators', () => {
  it('splits an OR range into one set per branch', () => {
    const result = toComp('1.2.3 || >=2.0.0');
    const sets = result.getSetsList().map((s) => s.getComparatorsList());
    expect(sets).toEqual([['1.2.3'], ['>=2.0.0']]);
    expect(result.getError()).toBe('');
  });

  it('expands a tilde range into its equivalent comparator pair', () => {
    const result = toComp('~1.2');
    const sets = result.getSetsList().map((s) => s.getComparatorsList());
    expect(sets).toEqual([['>=1.2.0', '<1.3.0-0']]);
  });

  it('a plain comparator range is a single one-comparator set', () => {
    const result = toComp('>=1.2.3');
    const sets = result.getSetsList().map((s) => s.getComparatorsList());
    expect(sets).toEqual([['>=1.2.3']]);
  });

  it('fails on a syntactically invalid range', () => {
    const result = toComp('not a range');
    expect(result.getSetsList()).toEqual([]);
    expect(result.getError()).not.toBe('');
  });
});
