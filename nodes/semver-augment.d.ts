// @types/semver@7.7.x has not yet caught up with node-semver@7.8.x's
// `truncate` export (added upstream but still untyped as of this writing —
// the runtime module DOES export it; only the .d.ts is behind). This
// augmentation adds just that one missing signature rather than reaching
// for `(semver as any).truncate` at every call site.
export {};

declare module 'semver' {
  function truncate(
    version: string | SemVer,
    truncation: ReleaseType,
    optionsOrLoose?: boolean | Options
  ): string | null;
}
