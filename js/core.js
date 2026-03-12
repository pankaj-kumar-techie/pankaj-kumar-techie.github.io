/* ─── PANKAJ.AI CORE PRODUCTION JS ─── */

// ─── CURSOR ───
const cur = document.getElementById('cur');
const trail = document.getElementById('cur-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  if (cur) {
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  }
});

function animTrail() {
  if (trail) {
    tx += (mx - tx) * .1;
    ty += (my - ty) * .1;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
  }
  requestAnimationFrame(animTrail);
}
animTrail();

// ─── TOUCH INTERACTION ───
document.addEventListener('touchstart', e => {
  mx = e.touches[0].clientX;
  my = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', e => {
  mx = e.touches[0].clientX;
  my = e.touches[0].clientY;
  if (cur) {
    cur.style.left = mx + 'px';
    cur.style.top = my + 'px';
  }
}, { passive: true });

// ─── SCROLL PROGRESS ───
const progBar = document.createElement('div');
progBar.id = 'scroll-progress';
document.body.appendChild(progBar);

window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (progBar) progBar.style.width = scrolled + "%";
}, { passive: true });

document.querySelectorAll('a, button, .cap-card, .log, .pf, .met, .nav-proj, .back-all, .btn-more, .arch-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const style = getComputedStyle(document.body);
    const rgb = style.getPropertyValue('--accent-rgb') || '0, 255, 200';
    if (cur) {
      cur.style.width = '28px';
      cur.style.height = '28px';
      cur.style.background = `rgba(${rgb},0.15)`;
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cur) {
      cur.style.width = '16px';
      cur.style.height = '16px';
      cur.style.background = '';
    }
  });
});


// ─── NEURAL CANVAS ───
const canvas = document.getElementById('neural');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let nodes = [];
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  function createNodes() {
    nodes = [];
    const n = Math.min(60, Math.floor(window.innerWidth * window.innerHeight / 18000));
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * 0.4,
        vy: (Math.random() - .5) * 0.4,
        r: 1.5
      });
    }
  }
  createNodes();
  
  function drawNeural() {
    const style = getComputedStyle(document.body);
    const rgb = style.getPropertyValue('--accent-rgb') || '0, 255, 200';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${rgb},${(1 - dist / 140) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},0.5)`;
      ctx.fill();
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });
    requestAnimationFrame(drawNeural);
  }
  drawNeural();
}

// ─── CLOCK ───
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const clockEl = document.getElementById('live-clock') || document.getElementById('clock');
  if (clockEl) clockEl.textContent = h + ':' + m + ':' + s;
}
setInterval(updateClock, 1000);
updateClock();

// ─── SCROLL REVEAL ───
const rObs = new IntersectionObserver(ents => {
  ents.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('v');
      const kids = e.target.querySelectorAll('.cap-card, .met, .log, .pf, .sg, .r, .r2');
      kids.forEach((k, i) => setTimeout(() => k.classList.add('v'), i * 80));
    }
  });
}, { threshold: 0.06 });

document.querySelectorAll('.s-tag, .s-head, .cap-grid, .metrics-grid, .log-list, .proof-list, .stack-groups, .r, .r2').forEach(el => rObs.observe(el));

// ─── COUNTER ANIMATION ───
function animCount(el) {
  const target = parseFloat(el.dataset.count);
  const suf = el.dataset.suffix || '';
  let start = null;
  const dur = 1400;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const cObs = new IntersectionObserver(ents => {
  ents.forEach(e => {
    if (e.isIntersecting) {
      animCount(e.target);
      cObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el));
