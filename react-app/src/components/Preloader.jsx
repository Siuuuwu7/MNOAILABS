import { useEffect, useState } from 'react'

export default function Preloader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1300)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`preloader ${done ? 'done' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="preloader-logo">MNO <b>AI</b> LABS</div>
        <div className="preloader-bar"><span /></div>
      </div>
    </div>
  )
}
