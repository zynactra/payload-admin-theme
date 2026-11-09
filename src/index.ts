import type { Plugin } from 'payload'

export type ThemeOptions = {
  /** Brand name: the default wordmark on the login screen and the logo's alt text. */
  name?: string
  /** Image URL for the login-screen logo. Without it, `name` is shown as a wordmark. */
  logo?: string
  /** Image URL for the small square icon at the top of the nav. Without it, a monogram tile is shown. */
  icon?: string
  colors?: {
    /** Light-mode background. The admin's whole gray scale runs from `canvas` to `ink`. */
    canvas?: string
    /** Darkest text colour. */
    ink?: string
    /** Primary buttons, wordmark dot, monogram and login glow: a CSS colour or a CSS gradient. */
    accent?: string
    /** Text colour on `accent`. */
    onAccent?: string
  }
  /** CSS font-family for the whole admin. Any font other than the default must be loaded by the project. */
  font?: string
  /** Corner radius of inputs (s), cards (m), large panels (l) and primary/secondary buttons. */
  radius?: { s?: string; m?: string; l?: string; button?: string }
  /** Lock the admin to light or dark mode, or let each user choose ('all'). */
  mode?: 'all' | 'dark' | 'light'
}

// Zynactra's design language (zynactra-website): Instrument Sans, near-black ink on white,
// and the purple → pink → orange gradient of its primary buttons.
export const ZYNACTRA = {
  name: 'Zynactra',
  colors: {
    canvas: '#FFFFFF',
    ink: '#0A0A0A',
    accent:
      'linear-gradient(90deg, #C351C6 0%, #D14EAE 22.12%, #DD4C9B 37.5%, #E64A89 55.77%, #EB4B80 67.79%, #EB5B69 80.29%, #EA6759 87.98%, #EA7444 100%)',
    onAccent: '#FFFFFF',
  },
  font: "'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  radius: { s: '8px', m: '10px', l: '16px', button: '999px' },
} as const

const PKG = '@zynactra/payload-admin-theme/client'

// Values are written into a <style> tag, so anything that could close the rule or the tag is refused.
const safe = (key: string, value: string) => {
  if (/[<>{};]/.test(value)) throw new Error(`payload-admin-theme: "${key}" contains an invalid character: ${value}`)
  return value
}

/** The CSS variables the theme stylesheet reads, for the given options (defaults: Zynactra). */
export function themeCSS(options: ThemeOptions = {}): string {
  const c = { ...ZYNACTRA.colors, ...options.colors }
  const r = { ...ZYNACTRA.radius, ...options.radius }
  const accent = /gradient\(/.test(c.accent) ? c.accent : `linear-gradient(90deg, ${c.accent}, ${c.accent})`
  const vars = {
    canvas: c.canvas,
    ink: c.ink,
    accent,
    'on-accent': c.onAccent,
    font: options.font ?? ZYNACTRA.font,
    'radius-s': r.s,
    'radius-m': r.m,
    'radius-l': r.l,
    'radius-button': r.button,
  }
  return `:root{${Object.entries(vars)
    .map(([k, v]) => `--zt-${k}:${safe(k, v)}`)
    .join(';')}}`
}

/** Payload plugin: applies the theme to the admin panel. */
export const adminTheme =
  (options: ThemeOptions = {}): Plugin =>
  (config) => {
    const name = options.name ?? ZYNACTRA.name
    const components = config.admin?.components
    return {
      ...config,
      admin: {
        ...config.admin,
        theme: options.mode ?? config.admin?.theme,
        components: {
          ...components,
          // A Logo or Icon set directly in the project's config takes precedence.
          graphics: {
            Logo: { path: PKG, exportName: 'Logo', clientProps: { name, src: options.logo } },
            Icon: { path: PKG, exportName: 'Icon', clientProps: { name, src: options.icon } },
            ...components?.graphics,
          },
          providers: [...(components?.providers ?? []), { path: PKG, exportName: 'ThemeStyles', clientProps: { css: themeCSS(options) } }],
        },
      },
    }
  }
