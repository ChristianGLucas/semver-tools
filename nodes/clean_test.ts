import { SemverCleanRequest } from '../gen/messages_pb';
import { clean } from './clean';
import { ctx } from './testkit';

describe('Clean', () => {
  it('strips a leading "=v" and surrounding whitespace', () => {
    const input = new SemverCleanRequest();
    input.setVersion('  =v1.2.3 ');
    const result = clean(ctx, input);
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('1.2.3');
    expect(result.getError()).toBe('');
  });

  it('passes through an already-clean version unchanged', () => {
    const input = new SemverCleanRequest();
    input.setVersion('2.0.0');
    const result = clean(ctx, input);
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('2.0.0');
  });

  it('fails on text that is not a version at all (use Coerce for prose)', () => {
    const input = new SemverCleanRequest();
    input.setVersion('next-9.3.5');
    const result = clean(ctx, input);
    expect(result.getOk()).toBe(false);
    expect(result.getVersion()).toBe('');
    expect(result.getError()).not.toBe('');
  });

  it('rejects an oversized input as a structured error', () => {
    const input = new SemverCleanRequest();
    input.setVersion('v' + '1'.repeat(1000));
    const result = clean(ctx, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toContain('longer than');
  });
});
