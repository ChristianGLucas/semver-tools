import { SemverTwoRangeRequest } from '../gen/messages_pb';
import { intersects } from './intersects';
import { ctx } from './testkit';

function inter(range1: string, range2: string) {
  const input = new SemverTwoRangeRequest();
  input.setRange1(range1);
  input.setRange2(range2);
  return intersects(ctx, input);
}

describe('Intersects', () => {
  it('detects overlapping ranges', () => {
    const result = inter('>=1.0.0 <2.0.0', '>=1.5.0 <3.0.0');
    expect(result.getResult()).toBe(true);
    expect(result.getError()).toBe('');
  });

  it('detects disjoint ranges', () => {
    expect(inter('<1.0.0', '>=2.0.0').getResult()).toBe(false);
  });

  it('a range intersects itself', () => {
    expect(inter('^1.0.0', '^1.0.0').getResult()).toBe(true);
  });

  it('reports a structured error for an invalid range1', () => {
    const result = inter('not a range', '^1.0.0');
    expect(result.getError()).toContain('range1');
  });

  it('reports a structured error for an invalid range2', () => {
    const result = inter('^1.0.0', 'not a range');
    expect(result.getError()).toContain('range2');
  });
});
