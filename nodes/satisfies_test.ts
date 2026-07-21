import { SemverSatisfiesRequest } from '../gen/messages_pb';
import { satisfies } from './satisfies';
import { ctx } from './testkit';

function sat(version: string, range: string, includePrerelease = false) {
  const input = new SemverSatisfiesRequest();
  input.setVersion(version);
  input.setRange(range);
  input.setIncludePrerelease(includePrerelease);
  return satisfies(ctx, input);
}

describe('Satisfies', () => {
  it('caret range: within the same major version is satisfied', () => {
    expect(sat('1.2.3', '^1.0.0').getSatisfies()).toBe(true);
  });

  it('caret range: a different major version is not satisfied', () => {
    expect(sat('2.0.0', '^1.0.0').getSatisfies()).toBe(false);
  });

  it('tilde range: patch-level flexibility within the same minor', () => {
    expect(sat('1.2.3', '~1.2').getSatisfies()).toBe(true);
    expect(sat('1.3.0', '~1.2').getSatisfies()).toBe(false);
  });

  it('exact-version range matches only that version', () => {
    expect(sat('1.2.3', '1.2.3').getSatisfies()).toBe(true);
    expect(sat('1.2.4', '1.2.3').getSatisfies()).toBe(false);
  });

  it("by default excludes a prerelease outside the range's own tuple", () => {
    expect(sat('1.2.3-beta.1', '^1.2.0').getSatisfies()).toBe(false);
  });

  it('include_prerelease widens matching to admit that prerelease', () => {
    expect(sat('1.2.3-beta.1', '^1.2.0', true).getSatisfies()).toBe(true);
  });

  it('an unparseable version simply does not satisfy (no crash)', () => {
    const result = sat('not-a-version', '^1.0.0');
    expect(result.getSatisfies()).toBe(false);
    expect(result.getError()).toBe('');
  });

  it('an invalid range is a structured error, distinguished from "no match"', () => {
    const result = sat('1.2.3', 'not a range');
    expect(result.getSatisfies()).toBe(false);
    expect(result.getError()).not.toBe('');
  });
});
