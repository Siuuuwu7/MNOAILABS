import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { BentoGrid, BentoGridItem } from '../components/Bentogrids.jsx'

export default function IndustryPage({ data }) {
  useEffect(() => {
    document.title = data.metaTitle || `${data.name} — MNO AI LABS`
    const meta = document.querySelector('meta[name="description"]')
    if (meta && data.metaDesc) meta.setAttribute('content', data.metaDesc)
  }, [data])

  const html = (s) => ({ __html: s })

  return (
    <>
      <section className="sub-hero">
        <div className="sub-hero-inner">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/#industries">Industries</Link>
            <span className="sep">/</span>
            <span>{data.name}</span>
          </div>
          <div className="sub-hero-grid">
            <Reveal>
              <span className="industry-label">{data.tagline}</span>
              <h1 dangerouslySetInnerHTML={html(data.title)} />
              <p className="sub-lead">{data.lead}</p>
              <div className="sub-hero-cta">
                <Link to="/#contact" className="btn btn-primary" data-hover>
                  <span>Talk to us</span>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </Link>
                <a href="#usecases" className="btn btn-ghost" data-hover>See use cases</a>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="sub-hero-visual">
                <span className="visual-tag"><span className="dot"></span> {data.heroTag}</span>
                <img src={data.hero} alt={data.name} loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <Reveal className="feature-row">
            <div>
              <span className="industry-label">Why this, why now</span>
              <h3 style={{ marginTop: 20 }}>{data.whyTitle}</h3>
              <p>{data.whyText}</p>
              <ul>
                {data.whyList.map((li, i) => <li key={i} dangerouslySetInnerHTML={html(li)} />)}
              </ul>
            </div>
            <div className="media-stage">
              <span className="tag">{data.featureTag}</span>
              <img src={data.featureImg} alt="" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="usecases">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">01 — Use cases</div>
            <h2 className="section-title">What we build for {data.name.toLowerCase()}.</h2>
          </div>

          {data.useCaseGroups.map((group, gi) => (
            <div key={gi}>
              <h3 className="uc-group-title" dangerouslySetInnerHTML={html(group.title)} />
              <BentoGrid className="usecases">
                {group.items.map((uc, i) => (
                  <Reveal key={i} delay={i * 50}>
                    <BentoGridItem className="usecase">
                      <span className={`uc-tag ${uc.color || ''}`}><span className="d"></span> {uc.tag}</span>
                      <h4 dangerouslySetInnerHTML={html(uc.title)} />
                      <p dangerouslySetInnerHTML={html(uc.desc)} />
                      <div className="uc-tech">
                        {uc.tech.map((t, j) => <span key={j}>{t}</span>)}
                      </div>
                    </BentoGridItem>
                  </Reveal>
                ))}
              </BentoGrid>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="eyebrow">02 — Pipeline</div>
            <h2 className="section-title" dangerouslySetInnerHTML={html(data.pipeline.title)} />
          </div>
          <BentoGrid className="pipeline">
            {data.pipeline.steps.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <BentoGridItem className="pipe-step">
                  <span className="n">{s.n}</span>
                  <h5>{s.title}</h5>
                  <p dangerouslySetInnerHTML={html(s.desc)} />
                </BentoGridItem>
              </Reveal>
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="gallery">
            {data.gallery.map((g, i) => (
              <figure key={i}><img src={g.src} alt={g.cap} loading="lazy" /><figcaption>{g.cap}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="cta-inner">
          <span className="eyebrow center">Let's build</span>
          <h2 className="cta-title" dangerouslySetInnerHTML={html(data.ctaTitle)} />
          <p className="cta-sub">{data.ctaSub}</p>
          <Link to="/#contact" className="btn btn-primary" data-hover>
            <span>Start a conversation</span>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </Link>
          <div className="contact-alt">Or email <a href="mailto:mnoailabs@gmail.com">mnoailabs@gmail.com</a> · call <a href="tel:+8801629472747">01629 472747</a></div>
        </div>
      </section>
    </>
  )
}
