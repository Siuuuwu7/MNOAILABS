import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <img src="/logo.png" alt="MNO AI LABS" onError={(e) => { e.target.style.display = 'none' }} />
              <span>MNO <b>AI</b> LABS</span>
            </div>
            <div className="footer-tagline">Applied AI, built in Bangladesh.</div>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <h6>Industries</h6>
            <Link to="/industries/industrial-monitoring">Industrial Monitoring</Link>
            <Link to="/industries/manufacturing">RMG & Manufacturing</Link>
            <Link to="/industries/finance">Finance & Fintech</Link>
            <Link to="/industries/ecommerce">E-commerce</Link>
            <Link to="/industries/agriculture">Agriculture</Link>
            <Link to="/industries/healthcare">Healthcare</Link>
          </div>
          <div>
            <h6>Services</h6>
            <Link to="/#services">Agents</Link>
            <Link to="/#services">Vision</Link>
            <Link to="/#services">LLM & RAG</Link>
            <Link to="/#services">Analytics</Link>
          </div>
          <div>
            <h6>Contact</h6>
            <a href="mailto:mnoailabs@gmail.com">mnoailabs@gmail.com</a>
            <a href="tel:+8801629472747">01629 472747</a>
            <Link to="/#contact">Start a project</Link>
            <span className="footer-addr">Khulna, Bangladesh</span>
          </div>
          <div>
            <h6>Hours</h6>
            <span className="footer-addr">Sun – Thu · 10:00 – 19:00</span>
            <span className="footer-addr">By appointment on Fri / Sat</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MNO AI LABS. All rights reserved.</span>
          <span>Built with care in Bangladesh.</span>
        </div>
      </div>
    </footer>
  )
}
