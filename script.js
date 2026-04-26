/* =========================================================
   MNO AI LABS — interactions
   ========================================================= */

/* -------- Preloader (minimal, matches logo) -------- */
(function () {
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const pre = document.getElementById('preloader');
  let p = 0;
  document.body.style.overflow = 'hidden';
  const int = setInterval(() => {
    p += Math.random() * 14 + 6;
    if (p >= 100) { p = 100; clearInterval(int); finish(); }
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = Math.round(p) + '%';
  }, 150);
  function finish() {
    setTimeout(() => {
      if (pre) pre.classList.add('done');
      document.body.style.overflow = '';
      // kick off hero word animation
      document.querySelectorAll('.hero-title .word').forEach(w => w.classList.add('in'));
    }, 300);
  }
})();

/* -------- Footer year -------- */
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* -------- Nav scroll state & mobile menu -------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const toggle = document.getElementById('navToggle');
const mobile = document.getElementById('mobileMenu');
if (toggle && mobile) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    mobile.classList.toggle('open');
    document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
  });
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      mobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* -------- Custom cursor -------- */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let cx = 0, cy = 0, dx = 0, dy = 0;
window.addEventListener('mousemove', (e) => { cx = e.clientX; cy = e.clientY; });
function raf() {
  dx += (cx - dx) * 0.18;
  dy += (cy - dy) * 0.18;
  if (cursor) { cursor.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`; }
  if (cursorDot) { cursorDot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`; }
  requestAnimationFrame(raf);
}
raf();
document.querySelectorAll('[data-hover], a, button, .service-card, .work-card, .industry-row').forEach(el => {
  el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hover'));
});

/* -------- Service card glow tracking -------- */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

/* -------- Reveal on scroll -------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* -------- GSAP scroll animations -------- */
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' },
      delay: (i % 3) * 0.08,
    });
  });

  gsap.utils.toArray('.industry-row').forEach(row => {
    gsap.from(row.querySelector('.industry-text'), {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 75%' },
    });
    gsap.from(row.querySelector('.industry-visual'), {
      y: 80, opacity: 0, scale: .95, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: row, start: 'top 75%' },
    });
    const img = row.querySelector('.visual-frame img');
    if (img) {
      gsap.to(img, {
        yPercent: -10,
        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  });

  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.from(card, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' },
      delay: (i % 2) * 0.1,
    });
  });

  gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
      y: 40, opacity: 0, duration: .8, ease: 'power3.out',
      scrollTrigger: { trigger: step, start: 'top 88%' },
      delay: i * 0.08,
    });
  });

  gsap.utils.toArray('.test-card').forEach((card, i) => {
    gsap.from(card, {
      y: 40, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 88%' },
      delay: i * 0.1,
    });
  });

  gsap.from('.cta-inner', {
    y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
  });

  gsap.to('.orb-1', { y: -120, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true } });
  gsap.to('.orb-2', { y: 200,  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true } });
  gsap.to('.orb-3', { y: -160, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true } });
}

/* -------- Hero canvas: animated neural network + particles -------- */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dpr;
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = canvas.offsetWidth * dpr;
    H = canvas.height = canvas.offsetHeight * dpr;
  }
  resize();
  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * dpr;
    mouse.y = (e.clientY - r.top) * dpr;
    mouse.active = true;
  });
  canvas.addEventListener('mouseleave', () => { mouse.active = false; });

  const N = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000));
  const pts = [];
  for (let i = 0; i < N; i++) {
    pts.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * 0.3 * dpr,
      vy: (Math.random() - .5) * 0.3 * dpr,
      r: (Math.random() * 1.4 + 0.6) * dpr,
      hue: Math.random() < .5 ? '#7c5cff' : (Math.random() < .5 ? '#2de2ff' : '#ff7bd9'),
    });
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H)/1.2);
    g.addColorStop(0, 'rgba(124,92,255,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      if (mouse.active) {
        const dx2 = mouse.x - p.x, dy2 = mouse.y - p.y;
        const d = Math.sqrt(dx2*dx2 + dy2*dy2);
        if (d < 180 * dpr) { p.x += dx2 / d * 0.5; p.y += dy2 / d * 0.5; }
      }
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx2 = a.x - b.x, dy2 = a.y - b.y;
        const d = Math.sqrt(dx2*dx2 + dy2*dy2);
        const max = 140 * dpr;
        if (d < max) {
          const alpha = (1 - d / max) * 0.55;
          ctx.strokeStyle = `rgba(140, 180, 255, ${alpha})`;
          ctx.lineWidth = 0.6 * dpr;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const p of pts) {
      ctx.beginPath();
      ctx.fillStyle = p.hue;
      ctx.shadowColor = p.hue;
      ctx.shadowBlur = 8 * dpr;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(tick);
  }
  tick();
})();

/* -------- Tilt effect -------- */
document.querySelectorAll('[data-tilt]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

/* -------- Smooth anchor scroll with nav offset -------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

/* -------- Contact form via Web3Forms (works on GitHub Pages) --------
   1. Go to https://web3forms.com
   2. Enter mnoailabs@gmail.com, get an access key by email.
   3. Replace YOUR_WEB3FORMS_ACCESS_KEY in index.html with that key.
   Nothing else required — submissions go straight to mnoailabs@gmail.com.
--------------------------------------------------------------------- */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');
  const btn = document.getElementById('submitBtn');
  const label = btn ? btn.querySelector('.btn-label') : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (status) { status.className = 'form-status'; status.textContent = ''; }

    const data = new FormData(form);
    if (btn) { btn.disabled = true; if (label) label.textContent = 'Sending…'; }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success !== false) {
        form.reset();
        if (status) { status.className = 'form-status success'; status.textContent = 'Thanks — your message is on its way. We\'ll be in touch within one business day.'; }
      } else {
        throw new Error((json && json.message) || 'Submission failed');
      }
    } catch (err) {
      if (status) { status.className = 'form-status error'; status.textContent = 'Could not send right now. Please try again in a moment, or email mnoailabs@gmail.com.'; }
    } finally {
      if (btn) { btn.disabled = false; if (label) label.textContent = 'Send message'; }
    }
  });
})();
