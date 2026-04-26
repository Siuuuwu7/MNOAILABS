import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" data-hover>
            <img src="/logo.png" alt="MNO AI LABS" onError={(e) => { e.target.style.display = 'none' }} />
            <span>MNO <b>AI</b> LABS</span>
          </Link>
          <nav className="nav-links">
            <Link to="/#services" data-hover>Services</Link>
            <Link to="/#industries" data-hover>Industries</Link>
            <Link to="/#capabilities" data-hover>Capabilities</Link>
            <Link to="/#process" data-hover>Process</Link>
            <Link to="/#contact" data-hover>Contact</Link>
          </nav>
          <Link to="/#contact" className="nav-cta" data-hover>
            <span>Start a project</span>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="menu">
            <span /><span /><span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
        <Link to="/">Home</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#industries">Industries</Link>
        <Link to="/#capabilities">Capabilities</Link>
        <Link to="/#process">Process</Link>
        <Link to="/#contact">Contact</Link>
      </div>
    </>
  )
}
