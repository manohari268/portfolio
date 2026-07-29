// ---------- Typing effect ----------
const typedEl = document.getElementById('typed');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lines = [
  'print(manohari.currently_building())',
  '> "Cloud-Based AI Smart Printing System"',
  'print(manohari.stack())',
  '> ["Python", "ML", "SQL", "Java"]'
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
  return new Promise((resolve) => setTimeout(resolve, ms));
}

typeLoop();

// ---------- Node graph background ----------
(function buildNodeGraph() {
  const g = document.getElementById('node-graph');
  if (!g) return;

  const NS = 'http://www.w3.org/2000/svg';
  const nodeCount = 14;
  const width = 360, height = 360;
  const points = [];

  for (let i = 0; i < nodeCount; i++) {
    points.push({
      x: 30 + Math.random() * (width - 60),
      y: 30 + Math.random() * (height - 60),
    });
  }

  // connect each node to its 2 nearest neighbors
  points.forEach((p, i) => {
    const distances = points
      .map((q, j) => ({ j, d: Math.hypot(p.x - q.x, p.y - q.y) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);

    distances.forEach(({ j }) => {
      const q = points[j];
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', p.x);
      line.setAttribute('y1', p.y);
      line.setAttribute('x2', q.x);
      line.setAttribute('y2', q.y);
      line.setAttribute('stroke-width', '1');
      g.appendChild(line);
    });
  });

  points.forEach((p, i) => {
    const circle = document.createElementNS(NS, 'circle');
    circle.setAttribute('cx', p.x);
    circle.setAttribute('cy', p.y);
    circle.setAttribute('r', i % 5 === 0 ? 5 : 3);
    circle.setAttribute('fill', i % 5 === 0 ? '#4A55E0' : '#E8A33D');
    circle.setAttribute('fill-opacity', i % 5 === 0 ? '0.9' : '0.7');
    circle.setAttribute('stroke', 'none');
    g.appendChild(circle);
  });
})();
