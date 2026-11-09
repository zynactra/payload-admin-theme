'use client'
import type { ReactNode } from 'react'

import './theme.css'

/** Sets the theme's CSS variables for the whole admin (added by the plugin as a provider). */
export function ThemeStyles({ css, children }: { css: string; children?: ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </>
  )
}

type BrandProps = { name: string; src?: string }

/** Login-screen logo: the brand image, or the name as a wordmark with an accent dot. */
export function Logo({ name, src }: BrandProps) {
  if (src) return <img className="zt-logo" src={src} alt={name} />
  return (
    <span className="zt-wordmark">
      {name}
      <span className="zt-dot">.</span>
    </span>
  )
}

/** Nav icon: the brand mark, or a monogram tile in the accent. */
export function Icon({ name, src }: BrandProps) {
  if (src) return <img className="zt-icon" src={src} alt="" />
  return (
    <span className="zt-monogram" aria-hidden="true">
      {name.charAt(0)}
    </span>
  )
}
