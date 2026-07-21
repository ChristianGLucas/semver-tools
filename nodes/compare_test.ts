import { SemverVersionPairRequest } from '../gen/messages_pb';
import { compare } from './compare';
import { ctx, SPEC_PRECEDENCE_ORDER } from './testkit';

function cmp(v1: string, v2: string, considerBuild = false) {
  const input = new SemverVersionPairRequest();
  input.setVersion1(v1);
  input.setVersion2(v2);
  input.setConsiderBuild(considerBuild);
  return compare(ctx, input);
}

describe('Compare', () => {
  it('agrees with every adjacent pair of the SemVer spec precedence oracle', () => {
    // INDEPENDENT ORACLE: SPEC_PRECEDENCE_ORDER is transcribed from the
    // SemVer 2.0.0 spec's own worked example (testkit.ts), not derived by
    // calling this implementation.
    for (let i = 0; i < SPEC_PRECEDENCE_ORDER.length - 1; i++) {
      const lower = SPEC_PRECEDENCE_ORDER[i];
      const higher = SPEC_PRECEDENCE_ORDER[i + 1];
      const result = cmp(lower, higher);
      expect(result.getComparison()).toBe(-1);
      expect(result.getRelation()).toBe('lt');
    }
  });

  it('reports equality for identical versions', () => {
    const result = cmp('1.2.3', '1.2.3');
    expect(result.getComparison()).toBe(0);
    expect(result.getRelation()).toBe('eq');
  });

  it('is antisymmetric: swapping arguments flips the sign', () => {
    const forward = cmp('1.0.0', '2.0.0');
    const backward = cmp('2.0.0', '1.0.0');
    expect(forward.getComparison()).toBe(-1);
    expect(backward.getComparison()).toBe(1);
    expect(backward.getRelation()).toBe('gt');
  });

  it('ignores build metadata by default (spec: build metadata does not affect precedence)', () => {
    const result = cmp('1.2.3+build1', '1.2.3+build2');
    expect(result.getComparison()).toBe(0);
  });

  it('consider_build breaks a build-metadata tie for a total order', () => {
    const result = cmp('1.2.3+aaa', '1.2.3+bbb', true);
    expect(result.getComparison()).toBe(-1);
  });

  it('returns a structured error for a malformed version rather than throwing', () => {
    const result = cmp('not-a-version', '1.0.0');
    expect(result.getError()).not.toBe('');
  });
});
