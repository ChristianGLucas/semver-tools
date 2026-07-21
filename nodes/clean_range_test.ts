import { SemverRangeRequest } from '../gen/messages_pb';
import { cleanRange } from './clean_range';
import { ctx, RANGE_GRAMMAR_EQUIVALENCE } from './testkit';

function cr(range: string) {
  const input = new SemverRangeRequest();
  input.setRange(range);
  return cleanRange(ctx, input);
}

describe('CleanRange', () => {
  it('normalizes every tilde/caret range to its documented comparator form', () => {
    // INDEPENDENT ORACLE: RANGE_GRAMMAR_EQUIVALENCE (testkit.ts) is
    // transcribed from npm's own published range-grammar documentation,
    // not derived by calling this implementation.
    for (const { range, equivalent } of RANGE_GRAMMAR_EQUIVALENCE) {
      const result = cr(range);
      expect(result.getOk()).toBe(true);
      expect(result.getRange()).toBe(equivalent);
    }
  });

  it('passes through an already-normalized comparator range unchanged', () => {
    const result = cr('>=1.2.3 <2.0.0');
    expect(result.getOk()).toBe(true);
    expect(result.getRange()).toBe('>=1.2.3 <2.0.0');
  });

  it('fails on a syntactically invalid range', () => {
    const result = cr('not a range');
    expect(result.getOk()).toBe(false);
    expect(result.getRange()).toBe('');
    expect(result.getError()).not.toBe('');
  });

  it('rejects an oversized range as a structured error', () => {
    const result = cr('>=1.0.0 <2.0.0 '.repeat(500));
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toContain('longer than');
  });
});
