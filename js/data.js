/* ─── PANKAJ.AI DATABASE INITIALIZATION ─── */
const PANKAJ_DB = {
  projects: [
    {
      id: 'MISSION_01',
      code: 'LEAD AI',
      name: 'Lead Qualification Engine',
      chips: ['2× Conversion', '99.7% Uptime', '<1min Response'],
      url: 'lead-qualification.html'
    },
    {
      id: 'MISSION_02',
      code: 'EMAIL AI',
      name: 'Email Automation Manager',
      chips: ['85% Autonomous', '6hrs/day Freed', '98.2% Accuracy'],
      url: 'email-automation.html'
    },
    {
      id: 'MISSION_03',
      code: 'CHIEF OF STAFF',
      name: 'AI Daily Briefing Agent',
      chips: ['45min Saved Daily', '0 Missed Meetings', 'Zero Prompts'],
      url: 'ai-chief-of-staff.html'
    },
    {
      id: 'MISSION_04',
      code: 'SAAS',
      name: 'Real Estate Operations SaaS',
      chips: ['Zero Revisions', 'Multi-tenant', '5★ Review'],
      url: 'real-estate-saas.html'
    },
    {
      id: 'MISSION_05',
      code: 'REDDIT BOT',
      name: 'Lead Gen → Discord Pipeline',
      chips: ['24/7 Monitor', 'Intent Signals', 'n8n + AI'],
      url: 'reddit-lead-gen.html'
    }
  ],
  reviews: [
    {
      stars: '★★★★★',
      text: "Implemented everything exactly as envisioned — great attention to detail. Excellent experience from start to finish.",
      who: "REAL ESTATE CLIENT · SaaS",
      badge: "UPWORK 5.0"
    },
    {
      stars: '★★★★★',
      text: "Responded right away to all questions and handled multiple edits perfectly. A true pleasure to work with.",
      who: "PETER T. · AI CHATBOT",
      badge: "UPWORK 5.0"
    },
    {
      stars: '★★★★★',
      text: "Did more than what he was paid for. Communication on point. Goes above and beyond every single time.",
      who: "LONG-TERM CLIENT · CRM",
      badge: "UPWORK 5.0"
    }
  ]
};

// ─── DYNAMIC RENDERER ───
function renderMissionLog() {
  const container = document.getElementById('mission-log-container');
  if (!container) return;
  container.innerHTML = PANKAJ_DB.projects.map(p => `
    <a href="${p.url}" class="log">
      <div class="log-id">${p.id} · ${p.code}</div>
      <div class="log-name">${p.name}</div>
      <div class="log-chips">
        ${p.chips.map(c => `<span class="lchip">${c}</span>`).join('')}
      </div>
    </a>
  `).join('');
}

function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;
  container.innerHTML = PANKAJ_DB.reviews.map(r => `
    <div class="pf">
      <div class="pf-stars">${r.stars}</div>
      <p class="pf-text">"${r.text}"</p>
      <div class="pf-meta"><span class="pf-who">${r.who}</span><span class="pf-badge">${r.badge}</span></div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderMissionLog();
  renderReviews();
});
