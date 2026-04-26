import { createElement } from 'react'
import GlowingEffect from './GlowingEffect.jsx'

export function BentoGrid({ children, className = '' }) {
  return <div className={`bento-grid ${className}`}>{children}</div>
}

export function BentoGridItem({
  children,
  className = '',
  as: Tag = 'div',
  glowing = true,
  ...rest
}) {
  return createElement(
    Tag,
    { className: `bento-card ${className}`, ...rest },
    <>
      {glowing && <GlowingEffect />}
      <div className="bento-card-inner">{children}</div>
    </>
  )
}
