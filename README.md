# semver-tools

Composable Axiom nodes for semantic versioning, wrapping [npm/node-semver](https://github.com/npm/node-semver)
(ISC license) — the reference implementation of the [SemVer 2.0.0 spec](https://semver.org/spec/v2.0.0.html)
and of npm's range syntax (`^`, `~`, comparators, hyphen ranges, x-ranges, `||` unions).

Built for the [Axiom](https://axiomide.com) marketplace, published under the `christiangeorgelucas` handle.

## Use it from your agent or app

Every node in this package is a **live, auto-scaling API endpoint** on the
[Axiom](https://axiomide.com) marketplace — call it from an AI agent or your own
code, with nothing to self-host.

**📦 See it on the marketplace:**
https://dev.axiomide.com/marketplace/christiangeorgelucas/semver-tools@0.1.0

**Hook it up to an AI agent (MCP).** Add Axiom's hosted MCP server to any MCP
client and every node becomes a typed tool your agent can call — search the
catalog, inspect a schema, and invoke it directly.

```bash
# Claude Code
claude mcp add --transport http axiom https://api.axiomide.com/mcp \
  --header "Authorization: Bearer $AXIOM_API_KEY"
```

Claude Desktop, Cursor, or any config-based client:

```json
{
  "mcpServers": {
    "axiom": {
      "type": "http",
      "url": "https://api.axiomide.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AXIOM_API_KEY" }
    }
  }
}
```

**Call it from the CLI.**

```bash
axiom invoke christiangeorgelucas/semver-tools/Parse --input '{ ... }'
```

**Call it over HTTP.**

```bash
curl -X POST https://api.axiomide.com/invocations/v1/nodes/christiangeorgelucas/semver-tools/0.1.0/Parse \
  -H "Authorization: Bearer $AXIOM_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ ... }'
```

> Input/output schema for each node is on the marketplace page above, or via
> `axiom inspect node christiangeorgelucas/semver-tools/Parse`.

### Get started free

Install the CLI:

```bash
# macOS / Linux — Homebrew
brew install axiomide/tap/axiom

# macOS / Linux — install script
curl -fsSL https://raw.githubusercontent.com/AxiomIDE/axiom-releases/main/install.sh | sh
```

**Windows:** download the `windows/amd64` `.zip` from the
[releases page](https://github.com/AxiomIDE/axiom-releases/releases), unzip it,
and put `axiom.exe` on your `PATH`.

Then `axiom version` to verify, `axiom login` (GitHub or Google) to authenticate,
and create an API key under **Console → API Keys**. Docs and sign-up at
**[axiomide.com](https://axiomide.com)**.

## What's here

Every node is a pure, stateless, deterministic function: version/range string(s) in, a structured
result out. Malformed input never crashes a node — it comes back as a populated `error` field.

**Single version:**
- `Parse` — break a version into major/minor/patch/prerelease/build.
- `Clean` — normalize a decorated version string (strip `v`/`=`/whitespace).
- `Coerce` — extract a version out of arbitrary text (e.g. `"next-9.3.5"` -> `"9.3.5"`).
- `Increment` — bump by release type (major/minor/patch/premajor/preminor/prepatch/prerelease/release).
- `Truncate` — coarsen a version's precision (e.g. `"2.3.4-alpha.1"` truncated to `minor` -> `"2.3.0"`).

**Two versions:**
- `Compare` — ordering (-1/0/1), with optional build-metadata tiebreaking.
- `Diff` — which part changed (major/minor/patch/prerelease, with a `pre` prefix where relevant).

**Version + range:**
- `Satisfies` — does a version satisfy a range.
- `VersionVsRange` — is a version below, within, or above everything a range could match.

**List of versions + range:**
- `MaxSatisfying` / `MinSatisfying` — the highest/lowest version in a list that satisfies a range.

**Range alone:**
- `CleanRange` — validate and normalize a range to comparator form.
- `MinVersion` — the lowest version a range could possibly match.
- `ToComparators` — decompose a range into its OR-of-ANDed comparator-set normal form.

**Two ranges:**
- `Intersects` — do two ranges share any satisfying version.
- `Subset` — is every version satisfying range1 also satisfying range2.

**List of versions:**
- `Sort` — SemVer precedence order, ascending or descending.

## Design

The domain has four natural entity shapes — a single version, a range, a pair of versions, and a
list of versions against a range — so this package reuses a small family of request/result envelopes
across its nodes wherever two nodes genuinely share a shape (e.g. `SemverVersionResult` is the output
of Clean, Coerce, Increment, Truncate, MinVersion, MaxSatisfying, and MinSatisfying), rather than
minting one-off messages per node. Every message name is prefixed `Semver`.

Nodes are bounded against oversized input (defense-in-depth on top of node-semver's own 256-character
version cap) and never re-implement anything the library already gets right — they are thin,
security-conscious wrappers.

## License

MIT. See `LICENSE`. Wraps node-semver, ISC licensed, zero runtime dependencies.
