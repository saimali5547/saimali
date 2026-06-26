// ── NAV scroll state ──
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  nav.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

// ── Mobile nav (simple toggle reveal) ──
const burger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = '#0B1220';
  navLinks.style.flexDirection = 'column';
  navLinks.style.padding = '24px 6vw';
  navLinks.style.borderBottom = '1px solid #232E45';
  navLinks.style.gap = '20px';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 980) navLinks.style.display = 'none';
  });
});

// ── Scroll reveal ──
const revealTargets = document.querySelectorAll(
  '.section-head, .about-lead, .about-facts, .service-card, .timeline-item, ' +
  '.skill-group, .skill-tags-col, .project-card, .blog-card, .contact-grid, .resume-download'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');

      // trigger skill bar fill when skills section is visible
      if (entry.target.classList.contains('skill-group')) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));

// ── Animated counters (hero stats) ──
const counters = document.querySelectorAll('.counter');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterIO.observe(c));

// ── Rank ticker in hero search mock: counts down from a high number to 1 ──
const rankEl = document.getElementById('rankNum');
if (rankEl) {
  let rank = 47;
  rankEl.textContent = rank;
  const rankInterval = setInterval(() => {
    rank -= 1;
    if (rank <= 1) {
      rank = 1;
      rankEl.textContent = rank;
      clearInterval(rankInterval);
      return;
    }
    rankEl.textContent = rank;
  }, 90);
}
