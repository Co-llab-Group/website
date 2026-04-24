// Co-Llab — minimal client JS

// Footer year
document.getElementById('footer-year').textContent = `© ${new Date().getFullYear()} The Collab Group`;

// Nav shrinks on scroll past hero
const nav = document.getElementById('nav');
const hero = document.querySelector('.hero');
if (nav && hero) {
  const io = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('nav-over-light', !entry.isIntersecting),
    { rootMargin: '-80px 0px 0px 0px' }
  );
  io.observe(hero);
}

// Rise-in on scroll for sections
const risers = document.querySelectorAll('section h2, .layer-card, .stack-card, .comp-col, .layers-viz');
const rio = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        rio.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
risers.forEach((el) => rio.observe(el));

// Hero rotor — cycles through audiences in the eyebrow chip
(function initHeroRotor() {
  const rotor = document.getElementById('hero-rotor');
  if (!rotor) return;
  const items = Array.from(rotor.querySelectorAll('.hero-rotor-item'));
  if (items.length < 2) return;
  let i = 0;

  function advance() {
    const prev = items[i];
    i = (i + 1) % items.length;
    const next = items[i];
    prev.classList.remove('is-active');
    prev.classList.add('is-leaving');
    next.classList.remove('is-leaving');
    // reflow so the next item animates from below
    void next.offsetWidth;
    next.classList.add('is-active');
    setTimeout(() => prev.classList.remove('is-leaving'), 600);
  }

  let timer = setInterval(advance, 2400);

  // Pause on hover
  rotor.addEventListener('mouseenter', () => { clearInterval(timer); timer = null; });
  rotor.addEventListener('mouseleave', () => { if (!timer) timer = setInterval(advance, 2400); });
})();

// Layers viz — auto-cycle through the 4 phases, pause on hover, only run in-view
(function initLayersViz() {
  const viz = document.getElementById('layers-viz');
  if (!viz) return;
  const phaseLabel = document.getElementById('viz-phase-label');
  const dots = viz.querySelectorAll('.viz-dot');
  const cards = document.querySelectorAll('.layer-card');
  const cycleMs = 1800;

  const phases = [
    { n: '01', name: 'PARCEL' },
    { n: '02', name: 'ZONING' },
    { n: '03', name: 'ENVELOPE' },
    { n: '04', name: 'MASSING' },
  ];

  let current = 1;
  let timer = null;
  let resumeTimer = null;
  let isInView = false;
  let isHovering = false;

  function setPhase(n, options = {}) {
    const next = Math.min(Math.max(Number(n) || 1, 1), phases.length);
    current = next;
    viz.classList.remove('p-1', 'p-2', 'p-3', 'p-4');
    viz.classList.add('p-' + next);
    const p = phases[next - 1];
    if (phaseLabel) phaseLabel.textContent = `${p.n} · ${p.name}`;
    dots.forEach((d, i) => {
      const active = i === next - 1;
      d.classList.toggle('active', active);
      d.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((c) => {
      const phase = Number(c.dataset.phase);
      const active = phase === next;
      c.classList.toggle('layer-active', active);
      c.setAttribute('aria-pressed', String(active));
    });
    if (options.manual) scheduleResume();
  }

  function advance() {
    setPhase(current >= 4 ? 1 : current + 1);
  }
  function start() {
    if (timer || !isInView || isHovering) return;
    timer = setInterval(advance, cycleMs);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function scheduleResume() {
    stop();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      resumeTimer = null;
      start();
    }, cycleMs);
  }

  dots.forEach((d, i) => {
    d.addEventListener('click', () => setPhase(i + 1, { manual: true }));
  });
  cards.forEach((card) => {
    const phase = Number(card.dataset.phase);
    if (!phase) return;
    card.addEventListener('click', () => setPhase(phase, { manual: true }));
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      setPhase(phase, { manual: true });
    });
  });
  viz.addEventListener('mouseenter', () => { isHovering = true; stop(); });
  viz.addEventListener('mouseleave', () => { isHovering = false; start(); });

  const vizIO = new IntersectionObserver(([entry]) => {
    isInView = entry.isIntersecting;
    if (entry.isIntersecting) { setPhase(1); start(); }
    else { stop(); }
  }, { threshold: 0.25 });
  vizIO.observe(viz);
})();
