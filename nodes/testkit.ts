// Shared test context and independent oracles for semver-tools node unit
// tests. Not a node and not a test file (no describe/it), so it is neither
// registered as a node nor collected by jest.
import {
  AxiomContext,
  AxiomLogger,
  AxiomSecrets,
  AxiomReflection,
  AxiomMutation,
} from '../gen/axiomContext';

const reflection: AxiomReflection = {
  flow: {
    nodes: [],
    edges: [],
    loopEdges: [],
    position: { currentInstance: 0, depth: 0, loopIterations: {}, subflowStackGraphIds: [] },
    graphId: '',
  },
};

const mutation: AxiomMutation = {
  flow: {
    addNode: (_p: string, _v: string) => 0,
    addEdge: (_s: number, _d: number) => {},
  },
};

export const ctx: AxiomContext = {
  log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} } satisfies AxiomLogger,
  secrets: { get: (_n: string): [string, boolean] => ['', false] } satisfies AxiomSecrets,
  executionId: 'test-execution-id',
  flowId: 'test-flow-id',
  tenantId: 'test-tenant-id',
  reflection,
  mutation,
};

/**
 * INDEPENDENT ORACLE #1 — the SemVer 2.0.0 spec's OWN worked precedence
 * example (https://semver.org/spec/v2.0.0.html, "Precedence" section),
 * quoted verbatim as strictly ascending order:
 *
 *   1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta <
 *   1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0
 *
 * This is the spec authors' own hand-picked example of every precedence
 * rule at once (numeric-vs-alphanumeric identifier comparison, identifier
 * count as a tiebreaker, prerelease-before-release) — not derived by
 * running node-semver, so agreement with it is evidence the wrapped
 * library actually implements the spec, not merely that it agrees with
 * itself. Extended on both ends with plain release versions for the
 * plain-major/minor/patch-ordering cases the spec's own example doesn't
 * cover.
 */
export const SPEC_PRECEDENCE_ORDER: string[] = [
  '0.9.9',
  '1.0.0-alpha',
  '1.0.0-alpha.1',
  '1.0.0-alpha.beta',
  '1.0.0-beta',
  '1.0.0-beta.2',
  '1.0.0-beta.11',
  '1.0.0-rc.1',
  '1.0.0',
  '1.0.1',
  '1.1.0',
  '2.0.0',
];

/**
 * INDEPENDENT ORACLE #2 — npm's own PUBLISHED range grammar
 * (https://github.com/npm/node-semver#ranges, the "Advanced Range Syntax"
 * table), which defines what ^ and ~ MEAN independent of any one
 * implementation of it: "Tilde Ranges" and "Caret Ranges" each state a
 * closed-form equivalence to a plain comparator pair. These pairs are
 * transcribed from that spec text, not computed by calling
 * semver.validRange — so a test asserting CleanRange(range) equals the
 * transcribed comparator form is checking the implementation against its
 * own published spec, not against itself.
 */
export const RANGE_GRAMMAR_EQUIVALENCE: Array<{ range: string; equivalent: string }> = [
  // Tilde: allows patch-level changes if a minor version is specified.
  { range: '~1.2.3', equivalent: '>=1.2.3 <1.3.0-0' },
  // Tilde with only major.minor: allows patch-level changes.
  { range: '~1.2', equivalent: '>=1.2.0 <1.3.0-0' },
  // Tilde with only major: allows minor-level changes.
  { range: '~1', equivalent: '>=1.0.0 <2.0.0-0' },
  // Caret: allows changes that do not modify the left-most non-zero digit.
  { range: '^1.2.3', equivalent: '>=1.2.3 <2.0.0-0' },
  // Caret with a leading zero major: locked to the minor.
  { range: '^0.2.3', equivalent: '>=0.2.3 <0.3.0-0' },
  // Caret with major and minor both zero: locked to the patch.
  { range: '^0.0.3', equivalent: '>=0.0.3 <0.0.4-0' },
];
