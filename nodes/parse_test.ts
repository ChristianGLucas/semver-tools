import { SemverParseRequest } from '../gen/messages_pb';
import { parse } from './parse';
import { ctx } from './testkit';

describe('Parse', () => {
  it('breaks a full version with prerelease and build into its components', () => {
    const input = new SemverParseRequest();
    input.setVersion('1.2.3-alpha.1+build.5');
    const result = parse(ctx, input);
    expect(result.getValid()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3-alpha.1');
    expect(result.getMajor()).toBe(1);
    expect(result.getMinor()).toBe(2);
    expect(result.getPatch()).toBe(3);
    expect(result.getPrereleaseList()).toEqual(['alpha', '1']);
    expect(result.getBuildList()).toEqual(['build', '5']);
    expect(result.getError()).toBe('');
  });

  it('parses a plain release version with no prerelease/build', () => {
    const input = new SemverParseRequest();
    input.setVersion('4.5.6');
    const result = parse(ctx, input);
    expect(result.getValid()).toBe(true);
    expect(result.getVersion()).toBe('4.5.6');
    expect(result.getPrereleaseList()).toEqual([]);
    expect(result.getBuildList()).toEqual([]);
  });

  it('tolerates a leading "v" even in strict mode (SemVer.parse convention)', () => {
    const input = new SemverParseRequest();
    input.setVersion('v1.2.3');
    input.setLoose(false);
    const result = parse(ctx, input);
    expect(result.getValid()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3');
  });

  it('loose:true additionally tolerates a leading zero in a numeric segment', () => {
    const strict = new SemverParseRequest();
    strict.setVersion('1.02.3');
    strict.setLoose(false);
    expect(parse(ctx, strict).getValid()).toBe(false);

    const loose = new SemverParseRequest();
    loose.setVersion('1.02.3');
    loose.setLoose(true);
    const result = parse(ctx, loose);
    expect(result.getValid()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3');
  });

  it('returns a structured error for unparseable input rather than throwing', () => {
    const input = new SemverParseRequest();
    input.setVersion('not-a-version');
    const result = parse(ctx, input);
    expect(result.getValid()).toBe(false);
    expect(result.getMajor()).toBe(0);
    expect(result.getError()).not.toBe('');
  });

  it('rejects an oversized version string as a structured error, not a crash', () => {
    const input = new SemverParseRequest();
    input.setVersion('1.' + '0'.repeat(1000) + '.0');
    const result = parse(ctx, input);
    expect(result.getValid()).toBe(false);
    expect(result.getError()).toContain('longer than');
  });

  it('is deterministic across repeated calls', () => {
    const input = new SemverParseRequest();
    input.setVersion('2.3.4-rc.2');
    const a = parse(ctx, input);
    const b = parse(ctx, input);
    expect(a.toObject()).toEqual(b.toObject());
  });
});
