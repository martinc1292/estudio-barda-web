# design-sync notes — Barda Design System

## Shape: `handmade` (off-script)

This repo is a **Next.js 16 application**, not a bundlable component library or
Storybook. The `/design-sync` converter (which expects a compiled `dist/` or a
Storybook harness) does not apply. The Barda design system is therefore authored
**by hand** into the Claude Design upload layout.

Target project: **Barda Design System**
`7f2cb9d9-5f25-423e-a69c-038e4589bd65`
→ https://claude.ai/design/p/7f2cb9d9-5f25-423e-a69c-038e4589bd65

## Sources of truth (extract changes from here)

- Tokens / palette / themes → `app/globals.css`
- Fonts (Archivo, IBM Plex Mono) → `app/layout.tsx`
- UI patterns → `app/components/*` and `app/**/page.tsx`
  (Navbar, Footer, Isotipo, HeroInteractivo, ModularSection, page sections)

## Build → upload pipeline (all under scratchpad `gen.mjs` / `anchor.mjs`)

The uploaded bundle lives in `ds-bundle/` (gitignored — regenerable):

- `styles.css` → `@import`s `tokens/colors.css`, `tokens/typography.css`,
  `_ds_bundle.css`, plus Google Fonts. This is the single stylesheet designs get.
- `_ds_bundle.js` → self-contained React components on `window.BardaDS`
  (`React.createElement`, no JSX build step needed). Header: `@ds-bundle name="BardaDS"`.
- `components/<Group>/<Name>/{.html,.jsx,.d.ts,.prompt.md}` with `@dsCard` first line.
- `_ds_sync.json` → hand-rolled anchor (sha256:12 file hashes). Lets a future
  re-sync diff what changed.

## Verification done at author time

- All 14 preview cards rendered via Playwright (fonts + tokens + layout) — faithful.
- Runtime bundle smoke-tested under React 18: 12 components export, render with
  zero errors. Screenshot matched the source site 1:1.
- Conventions header validated: every token/class/component name it enumerates
  exists in the built artifacts.

## To update the system later

Re-run the scratchpad generators (or re-author by hand) after changing the
sources above, regenerate `_ds_sync.json`, then upload with `DesignSync`
following the atomic path (project is now non-empty). The conventions file
(`.design-sync/conventions.md`) is human-editable — do not rewrite it wholesale;
re-validate its names against the fresh build and fix any that drift.
