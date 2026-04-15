/* ─── PANKAJ.AI DATABASE INITIALIZATION ─── */
const PANKAJ_DB = {
  projects: [
    {
      id: 'MISSION_01',
      code: 'LEAD AI',
      name: 'Lead Qualification Engine',
      tagline: 'Autonomous AI that qualifies inbound leads in real-time, sorting junk from gold.',
      description: 'Built a real-time lead qualification system using OpenClaw agents and NLP scoring. Reduces manual review by 85%, increases conversion through smart routing.',
      chips: ['2× Conversion', '99.7% Uptime', '<1min Response'],
      url: 'portfolio.html?portfolio=lead-qualification'
    },
    {
      id: 'MISSION_02',
      code: 'EMAIL AI',
      name: 'Email Automation Manager',
      tagline: '85% autonomous email handling with 98.2% accuracy and 6 hours saved daily.',
      description: 'Autonomous email agent powered by OpenClaw that reads, prioritizes, and drafts responses. Client approves with one click. Zero critical emails missed.',
      chips: ['85% Autonomous', '6hrs/day Freed', '98.2% Accuracy'],
      url: 'portfolio.html?portfolio=email-automation'
    },
    {
      id: 'MISSION_03',
      code: 'CHIEF OF STAFF',
      name: 'AI Daily Briefing Agent',
      tagline: 'Autonomous daily briefing that saves 45 minutes each morning and never misses a meeting.',
      description: 'Reads calendar, email, Slack, and news feeds — delivers personalized briefing at 7am. Zero manual input required. Learns preferences over time.',
      chips: ['45min Saved Daily', '0 Missed Meetings', 'Zero Prompts'],
      url: 'portfolio.html?portfolio=ai-chief-of-staff'
    },
    {
      id: 'MISSION_04',
      code: 'SAAS',
      name: 'Real Estate Operations SaaS',
      tagline: 'Production-ready multi-tenant SaaS platform shipped with zero revisions and a 5★ Upwork review.',
      description: 'Full-stack multi-tenant SaaS with role-based access, audit logs, Kanban boards, automated notifications, and daily exports. Delivered on time, zero revisions.',
      chips: ['Zero Revisions', 'Multi-tenant', '5★ Review'],
      url: 'portfolio.html?portfolio=real-estate-saas'
    },
    {
      id: 'MISSION_05',
      code: 'REDDIT BOT',
      name: 'Lead Gen → Discord Pipeline',
      tagline: '24/7 Reddit monitoring bot that identifies intent signals and delivers qualified leads to Discord.',
      description: 'Autonomous system monitoring 50+ subreddits, identifies buying intent signals, routes qualified prospects to Discord instantly. Delivers 8-12 qualified leads daily.',
      chips: ['24/7 Monitor', 'Intent Signals', 'n8n + AI'],
      url: 'portfolio.html?portfolio=reddit-lead-gen'
    },
    {
      id: 'MISSION_06',
      code: 'WHATSAPP AI',
      name: 'AI WhatsApp Business Briefing Assistant',
      tagline: 'Daily WhatsApp briefings that aggregate key business metrics across platforms.',
      description: 'Built an OpenClaw-based assistant that aggregates sales, ads, traffic, and inbox insights into one concise WhatsApp briefing every morning.',
      chips: ['Daily Briefings', 'Zero Dashboard', 'Multi-platform'],
      url: 'portfolio.html?portfolio=whatsapp-briefing'
    },
    {
      id: 'MISSION_07',
      code: 'MARKETING AI',
      name: 'AI Marketing & Content Automation Suite',
      tagline: 'Automates ad creation, campaign planning, and content production across Meta, Google, and more.',
      description: 'A multi-functional AI system that generates ad copy, builds campaign plans, produces content, and analyzes performance automatically.',
      chips: ['Ad Copy Generator', 'Campaign Planner', 'Content Repurposing'],
      url: 'portfolio.html?portfolio=marketing-automation'
    },
    {
      id: 'MISSION_08',
      code: 'AGENT SUITE',
      name: 'AI Multi-Agent System for Digital Companies',
      tagline: 'Scalable multi-agent AI system to automate operations, marketing, and content for digital businesses.',
      description: 'A unified multi-agent platform that automates sales, campaigns, creative delivery, and team workflows across Salesforce, Slack, and internal tools.',
      chips: ['Sales Automation', 'Creative AI', 'Real-time Alerts'],
      url: 'portfolio.html?portfolio=multi-agent-system'
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
const HOME_FEATURED_PROJECTS = 3;

function renderMissionLog() {
  const container = document.getElementById('mission-log-container');
  if (!container) return;

  const featuredProjects = PANKAJ_DB.projects.slice(0, HOME_FEATURED_PROJECTS);

  container.innerHTML = featuredProjects.map(p => `
    <a href="${p.url}" class="log">
      <div class="log-id">${p.id} · ${p.code}</div>
      <div class="log-name">${p.name}</div>
      <div class="log-tagline">${p.tagline}</div>
      <div class="log-description">${p.description}</div>
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
