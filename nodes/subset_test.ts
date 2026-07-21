import { SemverTwoRangeRequest } from '../gen/messages_pb';
import { subset } from './subset';
import { ctx } from './testkit';

function sub(range1: string, range2: string) {
  const input = new SemverTwoRangeRequest();
  input.setRange1(range1);
  input.setRange2(range2);
  return subset(ctx, input);
}

describe('Subset', () => {
  it('a single exact version is a subset of a caret range that spans it', () => {
    const result = sub('1.2.3', '^1.0.0');
    expect(result.getResult()).toBe(true);
    expect(result.getError()).toBe('');
  });

  it('a wider caret range is NOT a subset of a narrower one', () => {
    expect(sub('^2.0.0', '^1.0.0').getResult()).toBe(false);
  });

  it('order matters: A subset of B does not imply B subset of A', () => {
    expect(sub('~1.2.3', '^1.0.0').getResult()).toBe(true);
    expect(sub('^1.0.0', '~1.2.3').getResult()).toBe(false);
  });

  it('a range is a subset of itself', () => {
    expect(sub('^1.0.0', '^1.0.0').getResult()).toBe(true);
  });

  it('reports a structured error for an invalid range1', () => {
    expect(sub('not a range', '^1.0.0').getError()).toContain('range1');
  });

  it('reports a structured error for an invalid range2', () => {
    expect(sub('^1.0.0', 'not a range').getError()).toContain('range2');
  });
});
