import { SemverCoerceRequest } from '../gen/messages_pb';
import { coerce } from './coerce';
import { ctx } from './testkit';

describe('Coerce', () => {
  it('extracts a version out of decorated text (node-semver README example)', () => {
    const input = new SemverCoerceRequest();
    input.setText('next-9.3.5');
    const result = coerce(ctx, input);
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('9.3.5');
  });

  it('defaults missing minor/patch segments to 0', () => {
    const input = new SemverCoerceRequest();
    input.setText('  v2  ');
    const result = coerce(ctx, input);
    expect(result.getOk()).toBe(true);
    expect(result.getVersion()).toBe('2.0.0');
  });

  it('right_to_left picks the right-most coercible run', () => {
    const ltr = new SemverCoerceRequest();
    ltr.setText('1.2.3.4');
    expect(coerce(ctx, ltr).getVersion()).toBe('1.2.3');

    const rtl = new SemverCoerceRequest();
    rtl.setText('1.2.3.4');
    rtl.setRightToLeft(true);
    expect(coerce(ctx, rtl).getVersion()).toBe('2.3.4');
  });

  it('fails when no coercible version exists anywhere in the text', () => {
    const input = new SemverCoerceRequest();
    input.setText('no digits here at all');
    const result = coerce(ctx, input);
    expect(result.getOk()).toBe(false);
    expect(result.getVersion()).toBe('');
    expect(result.getError()).not.toBe('');
  });

  it('rejects oversized text as a structured error', () => {
    const input = new SemverCoerceRequest();
    input.setText('x'.repeat(20_000));
    const result = coerce(ctx, input);
    expect(result.getOk()).toBe(false);
    expect(result.getError()).toContain('longer than');
  });
});
