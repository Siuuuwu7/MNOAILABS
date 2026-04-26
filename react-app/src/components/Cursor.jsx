import { useEffect, useRef } from 'react'

export default function Cursor() {
  const lg = useRef(null)
  const sm = useRef(null)
  useEffect(() => {
    if (!lg.current) return
    let tx = 0, ty = 0, x = 0, y = 0
    const move = (e) => { tx = e.clientX; ty = e.clientY; if (sm.current) { sm.current.style.left = tx + 'px'; sm.current.style.top = ty + 'px' } }
    const loop = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18
      if (lg.current) { lg.current.style.left = x + 'px'; lg.current.style.top = y + 'px' }
      raf = requestAnimationFrame(loop)
    }
    let raf = requestAnimationFrame(loop)
    const onOver = (e) => { if (e.target.closest('a, button, [data-hover]')) lg.current.classList.add('is-hover') }
    const onOut = (e) => { if (e.target.closest('a, button, [data-hover]')) lg.current.classList.remove('is-hover') }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])
  return (
    <>
      <div className="cursor-lg" ref={lg} />
      <div className="cursor-sm" ref={sm} />
    </>
  )
}
