import { createElement } from 'react'

export default function BorderGradient({
  as: Tag = 'button',
  children,
  className = '',
  innerClassName = '',
  ...rest
}) {
  return createElement(
    Tag,
    { className: `border-gradient ${className}`, ...rest },
    <span className={`border-gradient-inner ${innerClassName}`}>
      {children}
    </span>
  )
}
