import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, delay = 0, className = '', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setTimeout(() => setShown(true), delay); io.disconnect() }
      })
    }, { threshold: 0.1 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`reveal ${shown ? 'in-view' : ''} ${className}`} {...rest}>
      {children}
    </div>
  )
}
