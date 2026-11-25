// ---------- Typing effect ----------
const typedEl = document.getElementById('typed');
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lines = [
  'build_backend_services()',
  '> Python + FastAPI + PostgreSQL',
  'build_software()',
  '> Java + Docker + Git'
];

async function typeLoop() {
  if (!typedEl) return;

  if (prefersReducedMotion) {
    typedEl.textContent = lines[0];
    return;
  }

  let lineIndex = 0;

  while (true) {
    const line = lines[lineIndex];

    for (let i = 0; i <= line.length; i++) {
      typedEl.textContent = line.slice(0, i);
      await sleep(22);
    }

    await sleep(1400);

    for (let i = line.length; i >= 0; i--) {
      typedEl.textContent = line.slice(0, i);
      await sleep(12);
    }

    await sleep(300);

    lineIndex = (lineIndex + 1) % lines.length;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

typeLoop();


// ---------- Decorative node graph ----------
(function buildNodeGraph() {
  const group = document.getElementById('node-graph-lines');

  if (!group) return;

  const NS = 'http://www.w3.org/2000/svg';

  const points = [
    { x: 40, y: 80 },
    { x: 110, y: 42 },
    { x: 185, y: 72 },
    { x: 275, y: 45 },
    { x: 320, y: 120 },
    { x: 245, y: 145 },
    { x: 145, y: 135 },
    { x: 60, y: 170 },
    { x: 105, y: 245 },
    { x: 205, y: 220 },
    { x: 305, y: 250 },
    { x: 165, y: 315 }
  ];

  const connections = [
    [0,1], [1,2], [2,3], [3,4],
    [0,6], [1,6], [2,5], [4,5],
    [5,6], [6,7], [6,9], [7,8],
    [8,9], [9,10], [9,11], [10,4]
  ];

  connections.forEach(([a,b]) => {
    const line = document.createElementNS(NS, 'line');

    line.setAttribute('x1', points[a].x);
    line.setAttribute('y1', points[a].y);
    line.setAttribute('x2', points[b].x);
    line.setAttribute('y2', points[b].y);

    line.setAttribute('stroke', '#4A55E0');
    line.setAttribute('stroke-opacity', '.25');
    line.setAttribute('stroke-width', '1');

    group.appendChild(line);
  });

  points.forEach((point, index) => {
    const circle = document.createElementNS(NS, 'circle');

    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', index % 3 === 0 ? '5' : '3');

    circle.setAttribute(
      'fill',
      index % 3 === 0 ? '#4A55E0' : '#18B6A4'
    );

    circle.setAttribute('fill-opacity', '.72');

    group.appendChild(circle);
  });
})();


// ---------- Mobile navigation ----------
const nav = document.querySelector('header nav');

if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll(
  '.project-card, .skill-group, .timeline-item, .cert-card, .achievement, .stat-card'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.classList.add('reveal-item');
  revealObserver.observe(el);
});
