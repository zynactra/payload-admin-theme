import assert from 'node:assert/strict'
import { test } from 'node:test'

import { adminTheme, themeCSS, ZYNACTRA } from '../dist/index.js'

test('defaults to the Zynactra design language', () => {
  const css = themeCSS()
  assert.match(css, /^:root\{.*\}$/)
  assert.ok(css.includes(`--zt-accent:${ZYNACTRA.colors.accent}`))
  assert.ok(css.includes('--zt-ink:#0A0A0A'))
  assert.ok(css.includes("--zt-font:'Instrument Sans'"))
})

test('client values override the defaults, one key at a time', () => {
  const css = themeCSS({ colors: { ink: '#0E3A3F' }, radius: { s: '2px' }, font: 'Manrope, sans-serif' })
  assert.ok(css.includes('--zt-ink:#0E3A3F'))
  assert.ok(css.includes('--zt-canvas:#FFFFFF'), 'unset colours keep the default')
  assert.ok(css.includes('--zt-radius-s:2px;--zt-radius-m:10px;--zt-radius-l:16px;--zt-radius-button:999px'))
  assert.ok(css.includes('--zt-font:Manrope, sans-serif'))
})

test('a single accent colour becomes a flat gradient', () => {
  assert.ok(themeCSS({ colors: { accent: '#C9A45C' } }).includes('--zt-accent:linear-gradient(90deg, #C9A45C, #C9A45C)'))
})

test('refuses values that could break out of the style tag', () => {
  assert.throws(() => themeCSS({ colors: { ink: 'red}</style><script>' } }), /invalid character/)
  assert.throws(() => themeCSS({ font: 'x; color: red' }), /invalid character/)
})

test('plugin adds the provider and graphics without dropping project settings', () => {
  const Existing = { path: '/x', exportName: 'P' }
  const config = adminTheme({ name: 'Acme', logo: '/logo.png', mode: 'light' })({
    admin: { meta: { titleSuffix: ' — Acme' }, components: { providers: [Existing], graphics: { Icon: '/own#Icon' } } },
  })
  const { components } = config.admin
  assert.equal(config.admin.theme, 'light')
  assert.equal(config.admin.meta.titleSuffix, ' — Acme')
  assert.deepEqual(components.providers[0], Existing)
  assert.equal(components.providers[1].exportName, 'ThemeStyles')
  assert.deepEqual(components.graphics.Logo.clientProps, { name: 'Acme', src: '/logo.png' })
  assert.equal(components.graphics.Icon, '/own#Icon', "the project's own Icon wins")
})

test('plugin leaves the theme mode alone unless asked', () => {
  assert.equal(adminTheme()({ admin: { theme: 'dark' } }).admin.theme, 'dark')
  assert.equal(adminTheme()({}).admin.theme, undefined)
})
