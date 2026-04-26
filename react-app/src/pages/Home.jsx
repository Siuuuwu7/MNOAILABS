import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import BorderGradient from '../components/BorderGradient.jsx'
import { BentoGrid, BentoGridItem } from '../components/Bentogrids.jsx'
import { industries } from '../data/industries.js'

const services = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    title: 'AI Agents',
    desc: 'Autonomous, tool-using agents that do the multi-step work your team keeps starting and never finishing.',
    chips: ['LangGraph', 'Tools', 'RAG', 'Eval'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
    title: 'Computer Vision',
    desc: 'Edge + cloud vision that works on your cameras, your lines, your factories — in Bangladeshi conditions.',
    chips: ['YOLO', 'Detectron', 'Jetson', 'H100'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: 'LLM & RAG',
    desc: 'Private LLM stacks grounded in your documents, catalogues and policies — Bangla-first when it matters.',
    chips: ['GPT', 'Claude', 'Llama', 'pgvector'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>,
    title: 'ML & Analytics',
    desc: 'Forecasting, classification, recommendation and optimization — from your warehouse, for your warehouse.',
    chips: ['XGBoost', 'LightGBM', 'Prophet', 'Feast'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: 'Voice & Bangla NLP',
    desc: 'Bangla ASR, TTS and NLU for call-centres, field staff and rural channels — where English-only stacks fail.',
    chips: ['Whisper', 'Bangla TTS', 'Diarization'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
    title: 'MLOps & Platform',
    desc: 'On-prem or cloud pipelines, monitoring, eval gates and audit trails — so your AI ships and keeps shipping.',
    chips: ['Kubernetes', 'Airflow', 'MLflow', 'Evals'],
  },
]

const scenes = [
  { tag: 'Factory vision', title: 'Defects, caught live', desc: 'Overhead camera on a sewing line detecting stitch defects in real time.', img: '/images/Factory-sewing.png', wide: true },
  { tag: 'Bangla copilot', title: 'Operator speaks, AI logs', desc: 'Supervisors dictate in Bangla; the system opens tickets and dispatches maintenance.', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80' },
  { tag: 'Edge inference', title: 'Cameras + Jetson', desc: 'Edge boxes run models on-site — nothing leaves your network.', img: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=900&q=80' },
  { tag: 'Farmer voice', title: 'Ask it in Bangla', desc: 'Farmers ask a question in Bangla voice; the assistant answers with care and context.', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80' },
  { tag: 'Radiology triage', title: 'Flagged, never decided', desc: 'AI highlights findings; the radiologist stays in charge.', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80', wide: true },
]

const capabilities = [
  { n: '01', title: 'Private deployments', desc: 'Run on your VPC, on-prem GPUs, or a Bangladesh-region cloud with clean access controls.' },
  { n: '02', title: 'Bangla-first, English-ready', desc: 'Bangla for users and operators, English for dashboards, analytics and audit workflows.' },
  { n: '03', title: 'Edge to cloud', desc: 'Jetson, x86 edge and H100 clusters share one pipeline, right-sized for each step.' },
  { n: '04', title: 'Explainable outputs', desc: 'Every model ships with reasons, sources and confidence so teams can trust the result.' },
  { n: '05', title: 'Audit + eval built in', desc: 'Prompts, evidence, decisions and edits stay archived for regulators, QA and reviews.' },
  { n: '06', title: 'Human-in-the-loop', desc: 'AI drafts the work while people approve, especially for clinical, financial and safety use.' },
  { n: '07', title: 'Low-data techniques', desc: 'Few-shot learning, synthetic data and domain priors help when labels are scarce.' },
  { n: '08', title: 'Real integrations', desc: 'SAP, Oracle, SCADA, EMR, MFS, WhatsApp, Telegram and Zoho fit into your stack.' },
]

const process = [
  { n: '01', title: 'Scope the pain', desc: 'Floor visits, data audits and stakeholder interviews reveal the real bottleneck before we build.' },
  { n: '02', title: '4–6 week pilot', desc: 'One workflow, one team and one baseline turn the pilot into measured production evidence.' },
  { n: '03', title: 'Signal over hype', desc: 'We define the metric before shipping, then tune outputs until the workflow is useful.' },
  { n: '04', title: 'Production rollout', desc: 'Monitoring, evals, release gates and on-call support keep deployment dependable after launch.' },
  { n: '05', title: 'New workflows', desc: 'Each win compounds into reusable patterns that make future workflows cheaper and faster.' },
]

const toolkitLogos = [
  { name: 'FastAPI', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'AngularJS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Kubernetes', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'OpenAI', src: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
]

const toolkitTickerItems = Array.from({ length: 4 }, () => toolkitLogos).flat()

const heroStats = [
  { value: 6, suffix: '+', label: 'Industries' },
  { value: 24, suffix: '/7', label: 'Bangla & English' },
  { value: 100, suffix: '%', label: 'Private-deploy ready' },
]

function BlurFadeText({ as = 'span', className = '', parts, delay = 0, step = 38 }) {
  const Tag = as
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => {
      setShown(entry.isIntersecting)
    }, { threshold: 0.25 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  let wordIndex = 0

  return (
    <Tag ref={ref} className={`blur-fade-text ${shown ? 'in-view' : ''} ${className}`}>
      {parts.map((part, partIndex) => (
        <span key={partIndex} className={part.className || undefined}>
          {part.text.split(/(\s+)/).map((chunk, chunkIndex) => {
            if (!chunk.trim()) return chunk
            const current = wordIndex++
            return (
              <span
                key={`${partIndex}-${chunkIndex}`}
                className="blur-word"
                style={{ '--blur-delay': `${delay + current * step}ms` }}
              >
                {chunk}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

function CountUpStat({ value, suffix = '', label, delay = 0 }) {
  const ref = useRef(null)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0)
  const [isVisible, setIsVisible] = useState(reduceMotion)

  useEffect(() => {
    const node = ref.current
    if (!node || reduceMotion) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.55 })

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    if (!isVisible || reduceMotion) return

    let frame = 0
    let startedAt = 0
    const duration = 2200
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

    const tick = (now) => {
      if (!startedAt) startedAt = now + delay
      const elapsed = Math.max(0, now - startedAt)
      const progress = Math.min(elapsed / duration, 1)

      setDisplayValue(Math.round(value * easeOutQuart(progress)))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [delay, isVisible, reduceMotion, value])

  return (
    <div className={`hero-meta-item ${isVisible ? 'is-counting' : ''}`} ref={ref}>
      <span className="num" aria-label={`${value}${suffix}`}>
        <span className="num-value">{displayValue}</span>
        <span className="num-suffix">{suffix}</span>
      </span>
      <span className="label">{label}</span>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section className="hero" id="top">
        <div className="hero-grid">
          <Reveal>
            <div className="hero-badge"><span className="live"></span> Applied AI · Bangladesh · 2026</div>
            <h1>
              Industrial-grade <span className="keep-together">AI, <span className="gradient">built in</span></span><br/>
              <span className="gradient">Bangladesh.</span>
            </h1>
            <p className="hero-lead">
              We build vision, LLM and agent systems for Bangladesh's factories, banks, hospitals and marketplaces — on your infrastructure, in your language, with your team.
            </p>
            <div className="hero-cta">
              <BorderGradient as={Link} to="/#contact" className="btn-border-wrap hero-fill-cta" innerClassName="btn btn-primary" data-hover>
                <span>Start a project</span>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </BorderGradient>
              <Link to="/#industries" className="btn btn-ghost" data-hover>
                <span>See industries</span>
              </Link>
            </div>
            <div className="hero-meta">
              {heroStats.map((stat, index) => (
                <CountUpStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={index * 140}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="hero-visual">
              <div className="hv-main">
                <img src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80" alt="Computer vision at work" />
                <div className="hv-scan"></div>
                <div className="hv-box hv-box-1" data-label="line-A · op-14"></div>
                <div className="hv-box hv-box-2" data-label="defect · 0.94"></div>
              </div>
              <div className="hv-card hv-card-1">
                <div className="dot v"></div>
                <div>
                  <div>vision.frame_12847</div>
                  <div className="sub">inferred in 18ms</div>
                </div>
              </div>
              <div className="hv-card hv-card-2">
                <div className="dot c"></div>
                <div>
                  <div>LLM agent · Bangla</div>
                  <div className="sub">অপারেটর কে সতর্ক করা হচ্ছে</div>
                </div>
              </div>
              <div className="hv-card hv-card-3">
                <div className="dot m"></div>
                <div>
                  <div>ticket #2048 opened</div>
                  <div className="sub">auto-dispatched</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="toolkit-ticker">
        <div className="toolkit-ticker-label">
          <p>Our toolkit</p>
        </div>

        <div className="ticker-shell">
          <div className="ticker-edge"></div>
          <div className="ticker-wrap">
            <div className="ticker-track">
              {toolkitTickerItems.map((logo, i) => (
                <div key={`${logo.name}-${i}`} className="ticker-item">
                  <img src={logo.src} alt={logo.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">01 — Services</div>
            <BlurFadeText
              as="h2"
              className="section-title"
              parts={[
                { text: 'Everything you need to ship ' },
                { text: 'real AI', className: 'blur-accent' },
                { text: '.' },
              ]}
            />
            <BlurFadeText
              as="p"
              className="section-lead section-lead-wide blur-fade-lead"
              delay={180}
              step={34}
              parts={[
                { text: 'Not tutorials, not demos. Production AI systems that your team owns, on infrastructure you control.' },
              ]}
            />
          </div>
          <BentoGrid className="services-grid">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <BentoGridItem className="service-card">
                  <div className="service-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="chip-row">
                    {s.chips.map((c, j) => <span key={j} className="chip">{c}</span>)}
                  </div>
                </BentoGridItem>
              </Reveal>
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="section" id="in-action">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">02 — In action</div>
            <BlurFadeText
              as="h2"
              className="section-title"
              parts={[
                { text: 'What our systems look like ' },
                { text: 'in the wild', className: 'blur-accent' },
                { text: '.' },
              ]}
            />
            <BlurFadeText
              as="p"
              className="section-lead blur-fade-lead"
              delay={130}
              step={24}
              parts={[
                { text: 'Snippets from deployments across factories, farms, clinics and marketplaces.' },
              ]}
            />
          </div>
          <BentoGrid className="scenes-grid">
            {scenes.map((s, i) => (
              <Reveal key={i} className={`scene-frame ${i === 0 ? 'featured' : ''}`} delay={i * 80}>
                <BentoGridItem className={`scene ${i === 0 ? 'featured' : ''}`}>
                  <img src={s.img} alt={s.title} loading="lazy" />
                  <div className="scene-overlay">
                    <span className="scene-tag">{s.tag}</span>
                    <h4 className="scene-title">{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </BentoGridItem>
              </Reveal>
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="section" id="industries">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">03 — Industries</div>
            <BlurFadeText
              as="h2"
              className="section-title"
              parts={[
                { text: 'Six industries. ' },
                { text: 'One belief', className: 'blur-accent' },
                { text: ' — AI belongs in production, not PowerPoint.' },
              ]}
            />
            <BlurFadeText
              as="p"
              className="section-lead section-lead-wide blur-fade-lead"
              delay={130}
              step={24}
              parts={[
                { text: 'Each industry gets a deep playbook of use cases, reference architectures and a 6-week pilot path.' },
              ]}
            />
          </div>
          <div className="industries-grid">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={i * 60}>
                <Link to={`/industries/${ind.slug}`} className="industry-card" data-hover>
                  <img src={ind.hero} alt={ind.name} loading="lazy" />
                  <div className="industry-overlay">
                    <h3>{ind.name}</h3>
                    <p>{ind.tagline}</p>
                    <span className="industry-arrow">
                      Explore
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">04 — Capabilities</div>
            <BlurFadeText
              as="h2"
              className="section-title"
              parts={[
                { text: 'Built to survive ' },
                { text: 'Bangladesh reality', className: 'blur-accent' },
                { text: '.' },
              ]}
            />
            <BlurFadeText
              as="p"
              className="section-lead blur-fade-lead"
              delay={130}
              step={24}
              parts={[
                { text: 'Imperfect data, patchy networks, tight regulation. Our stack is designed around that — not against it.' },
              ]}
            />
          </div>
          <BentoGrid className="cap-grid">
            {capabilities.map((c, i) => (
              <Reveal key={i} delay={i * 40}>
                <BentoGridItem className="cap-card">
                  <span className="n">{c.n}</span>
                  <h5>{c.title}</h5>
                  <p>{c.desc}</p>
                </BentoGridItem>
              </Reveal>
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">05 — Process</div>
            <BlurFadeText
              as="h2"
              className="section-title"
              parts={[
                { text: 'From first call to ' },
                { text: 'first KPI', className: 'blur-accent' },
                { text: ' in six weeks.' },
              ]}
            />
            <BlurFadeText
              as="p"
              className="section-lead blur-fade-lead"
              delay={130}
              step={24}
              parts={[
                { text: "We don't do 12-month roadmaps. We ship small, measure, and compound." },
              ]}
            />
          </div>
          <BentoGrid className="pipeline">
            {process.map((s, i) => (
              <Reveal key={i} delay={i * 70}>
                <BentoGridItem className="pipe-step">
                  <span className="n">{s.n}</span>
                  <h5>{s.title}</h5>
                  <p>{s.desc}</p>
                </BentoGridItem>
              </Reveal>
            ))}
          </BentoGrid>
        </div>
      </section>

      <ContactSection />

      <section className="section cta-section">
        <div className="cta-inner">
          <span className="eyebrow center">Let's talk</span>
          <BlurFadeText
            as="h2"
            className="cta-title"
            parts={[
              { text: 'Ready to ship ' },
              { text: 'real AI?', className: 'blur-accent' },
            ]}
          />
          <BlurFadeText
            as="p"
            className="cta-sub blur-fade-lead"
            delay={130}
            step={24}
            parts={[
              { text: "A 30-minute discovery call, a short written brief, and we'll tell you honestly what's worth building — and what isn't." },
            ]}
          />
          <BorderGradient as={Link} to="/#contact" className="btn-border-wrap" innerClassName="btn btn-primary" data-hover>
            <span>Start a conversation</span>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </BorderGradient>
          <div className="contact-alt">Or email <a href="mailto:mnoailabs@gmail.com">mnoailabs@gmail.com</a> · call <a href="tel:+8801629472747">01629 472747</a></div>
        </div>
      </section>
    </>
  )
}

function ContactSection() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', msg: '' })
    const form = e.target
    const data = new FormData(form)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const out = await res.json()
      if (out.success) {
        setStatus({ state: 'success', msg: "Got it. We'll reply within a business day." })
        form.reset()
      } else {
        setStatus({ state: 'error', msg: out.message || 'Something went wrong. Please email us directly.' })
      }
    } catch {
      setStatus({ state: 'error', msg: 'Network error. Please email mnoailabs@gmail.com.' })
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <Reveal className="contact-info">
          <div className="eyebrow">06 — Contact</div>
          <h2>Tell us <i>what hurts</i>. We'll tell you what to build.</h2>
          <p style={{ marginTop: 20, maxWidth: 460 }}>
            A short brief is enough. We reply within one business day with questions, a rough approach, and whether we think we're the right team for it.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:mnoailabs@gmail.com">mnoailabs@gmail.com</a>
            </div>
            <div className="contact-detail">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+8801629472747">01629 472747</a>
            </div>
            <div className="contact-detail">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Khulna, Bangladesh
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="form" onSubmit={onSubmit}>
            <input type="hidden" name="access_key" value="5c004d3e-9b68-4fad-993e-ca0a42438064" />
            <input type="hidden" name="subject" value="New MNO AI LABS enquiry" />
            <input type="hidden" name="from_name" value="mnoailabs.tech" />
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

            <div className="form-row">
              <div>
                <label>Name</label>
                <input type="text" name="name" required placeholder="Your name" />
              </div>
              <div>
                <label>Company</label>
                <input type="text" name="company" placeholder="Your company" />
              </div>
            </div>
            <div className="form-row">
              <div>
                <label>Email</label>
                <input type="email" name="email" required placeholder="you@company.com" />
              </div>
              <div>
                <label>Phone</label>
                <input type="tel" name="phone" placeholder="01xxxxxxxxx" />
              </div>
            </div>
            <div>
              <label>Industry</label>
              <select name="industry" defaultValue="">
                <option value="" disabled>Pick one</option>
                <option>Industrial Monitoring</option>
                <option>RMG & Manufacturing</option>
                <option>Finance & Fintech</option>
                <option>E-commerce & D2C</option>
                <option>Agriculture & Agritech</option>
                <option>Healthcare & Pharma</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>What you want to build</label>
              <textarea name="message" required placeholder="One paragraph is plenty — what's the pain, what systems you have, what would 'good' look like."></textarea>
            </div>

            {status.state === 'success' && <div className="form-status success">{status.msg}</div>}
            {status.state === 'error' && <div className="form-status error">{status.msg}</div>}

            <button type="submit" className="form-submit" disabled={status.state === 'sending'} data-hover>
              {status.state === 'sending' ? 'Sending…' : (
                <>
                  <span>Send message</span>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" style={{ width: 16, height: 16 }}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

