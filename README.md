# @zynactra/payload-admin-theme

Zynactra's theme for the [Payload CMS](https://payloadcms.com) admin panel. By default it uses Zynactra's design language (Instrument Sans, near-black ink on white, the purple → pink → orange gradient). Every brand value can be replaced per client.

## Install

Projects install it straight from a Git tag (the repo is public, so no tokens are needed, locally or on App Platform):

```bash
pnpm add github:Zynactra/payload-admin-theme#v0.1.0
```

```ts
// payload.config.ts
import { adminTheme } from '@zynactra/payload-admin-theme'

export default buildConfig({
  plugins: [adminTheme()],
})
```

Then regenerate the import map (`pnpm payload generate:importmap`; a `generate:importmap && next build` build script already does this).

## Per-client branding

Pass only what differs from the Zynactra defaults:

```ts
adminTheme({
  name: 'Intent Advisory Group',
  logo: '/img/logo_full.png', // login screen; without it, `name` is shown as a wordmark
  icon: '/img/logo_mark.png', // nav icon; without it, a monogram tile is shown
  colors: { ink: '#0A2B2F', accent: '#C9A45C', onAccent: '#0E3A3F' },
  font: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  radius: { s: '2px', m: '2px', l: '4px', button: '2px' },
})
```

| Option | Default (Zynactra) | What it does |
| --- | --- | --- |
| `name` | `Zynactra` | Wordmark on the login screen and the logo's alt text |
| `logo` | none | Image URL for the login-screen logo |
| `icon` | none | Image URL for the nav icon (shown in an 18px square) |
| `colors.canvas` | `#FFFFFF` | Light-mode background |
| `colors.ink` | `#0A0A0A` | Darkest text. The admin's whole gray scale is mixed from `canvas` and `ink`, and Payload flips it for dark mode |
| `colors.accent` | Zynactra button gradient | Primary buttons, wordmark dot, monogram, login glow. A colour or a CSS gradient |
| `colors.onAccent` | `#FFFFFF` | Text on the accent |
| `font` | Instrument Sans (bundled) | CSS `font-family` for the whole admin |
| `radius.s` / `m` / `l` | `8px` / `10px` / `16px` | Inputs / cards / large panels |
| `radius.button` | `999px` (pill) | Primary and secondary buttons |
| `mode` | user's choice | `'light'` or `'dark'` locks the admin to one mode |

**Fonts:** Instrument Sans ships with the package. Any other font must be loaded by the project, e.g. in `src/app/(payload)/custom.scss`:

```scss
@import '../(frontend)/fonts/fonts'; // the site's self-hosted @font-face rules
```

A `Logo` or `Icon` set directly in the project's `admin.components.graphics` takes precedence over the theme's.

## What it changes

Only the admin panel; the website's own pages are untouched.

- Payload's gray scale, body font and corner radii, through Payload's CSS variables
- Primary buttons filled with the accent, secondary buttons as outlines that fill with ink on hover
- Cards: plain background, hairline border and a faint shadow
- Login screen: a soft glow of the accent behind the form, and the logo or wordmark
- Nav icon: the brand mark or a monogram

Payload's styles live in `@layer payload-default`, so the theme's plain CSS wins without `!important`. Tested with Payload 3.93; after a Payload upgrade, look over the login screen, a list and an edit screen in light and dark mode.

## Develop and release

```bash
pnpm install
pnpm build   # src/ → dist/ (dist/ is committed, because projects install from Git)
pnpm test
```

To release: bump `version` in `package.json`, run `pnpm build`, commit (including `dist/`), then tag and push:

```bash
git tag v0.2.0 && git push && git push --tags
```

Projects upgrade by changing the tag in their `package.json`. CI fails if `dist/` doesn't match `src/`.

Instrument Sans is licensed under the SIL Open Font License ([`src/fonts/OFL.txt`](src/fonts/OFL.txt)).
