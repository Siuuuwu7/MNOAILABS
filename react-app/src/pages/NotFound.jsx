import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', paddingTop: 160 }}>
      <div className="section-inner" style={{ textAlign: 'center', width: '100%' }}>
        <div className="eyebrow center">404</div>
        <h1 style={{ marginTop: 12, marginBottom: 16 }}>Page not found</h1>
        <p style={{ marginBottom: 32 }}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          <span>Back home</span>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </section>
  )
}
