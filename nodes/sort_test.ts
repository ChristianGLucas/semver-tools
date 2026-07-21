import { SemverSortRequest } from '../gen/messages_pb';
import { sort } from './sort';
import { ctx, SPEC_PRECEDENCE_ORDER } from './testkit';

function doSort(versions: string[], descending = false) {
  const input = new SemverSortRequest();
  input.setVersionsList(versions);
  input.setDescending(descending);
  return sort(ctx, input);
}

describe('Sort', () => {
  it('ascending-sorts a shuffled copy of the SemVer spec precedence oracle back to spec order', () => {
    // INDEPENDENT ORACLE: SPEC_PRECEDENCE_ORDER (testkit.ts) is transcribed
    // from the SemVer 2.0.0 spec, not derived from this implementation.
    const shuffled = [...SPEC_PRECEDENCE_ORDER].reverse();
    const result = doSort(shuffled);
    expect(result.getVersionsList()).toEqual(SPEC_PRECEDENCE_ORDER);
    expect(result.getError()).toBe('');
  });

  it('descending:true reverses the order', () => {
    const result = doSort([...SPEC_PRECEDENCE_ORDER], true);
    expect(result.getVersionsList()).toEqual([...SPEC_PRECEDENCE_ORDER].reverse());
  });

  it('a simple numeric case', () => {
    const result = doSort(['1.2.3', '1.0.0', '2.0.0']);
    expect(result.getVersionsList()).toEqual(['1.0.0', '1.2.3', '2.0.0']);
  });

  it('fails the whole call on any unparseable entry, rather than silently dropping it', () => {
    const result = doSort(['1.2.3', 'garbage']);
    expect(result.getVersionsList()).toEqual([]);
    expect(result.getError()).toContain('garbage');
  });

  it('rejects an oversized versions list as a structured error', () => {
    const result = doSort(new Array(5000).fill('1.0.0'));
    expect(result.getError()).toContain('more than');
  });
});
