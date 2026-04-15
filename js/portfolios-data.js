/* ─── PORTFOLIO DATA ─── */
/* DRY (Don't Repeat Yourself) structure for easy scaling */

const PORTFOLIO_DATA = {
  'lead-qualification': {
    mission_id: 'MISSION_01',
    code: 'LEAD AI',
    title: 'Lead Qualification Engine',
    tagline: 'Autonomous AI that qualifies inbound leads in real-time, sorting junk from gold.',
    tags: ['OpenClaw', 'FastAPI', 'PostgreSQL', 'Real-time Scoring', 'Intent Detection'],
    chips: ['2× Conversion', '99.7% Uptime', '<1min Response'],
    theme: 'red',
    prev_mission: null,
    next_mission: 'email-automation',

    // Dynamic content sections
    brief: 'Built a real-time lead qualification engine that automatically scores and categorizes inbound leads using OpenClaw agents and NLP scoring models. Reduces manual lead review by 85%, increases conversion through smart routing.',
    problem: 'Client was manually reviewing hundreds of inbound leads daily. Most were unqualified. Qualified leads sat in queues waiting for human screening — costing 15+ hours per day and losing conversion opportunities.',
    solution: [
      'Runs real-time scoring on every lead (qualification likelihood, budget, intent signals)',
      'Routes hot leads directly to sales (< 60 seconds)',
      'Batches low-quality leads for off-peak review',
      'Learns from feedback to improve accuracy over time'
    ],
    tech_stack: {
      'Agent Engine': 'OpenClaw · Intent Detection Models',
      'API': 'FastAPI · Real-time endpoints',
      'Data': 'PostgreSQL · Redis caching',
      'Monitoring': 'Prometheus · Real-time dashboards',
      'Integration': 'Webhooks · Slack alerts'
    },
    metrics: [
      '2× Conversion rate improvement',
      '99.7% System uptime',
      '< 1 min Lead response time',
      '85% Manual work eliminated'
    ],
    outcomes: [
      'Every qualified lead reaches sales within 60 seconds',
      'Unqualified leads automatically logged for audit trail',
      'Feedback loop retrains model weekly for 3-5% monthly accuracy gains',
      'Team can focus on closing, not screening'
    ],
    cta: 'High-volume leads destroying your team\'s productivity? Let\'s build a qualification engine that runs 24/7 without human intervention.'
  },

  'email-automation': {
    mission_id: 'MISSION_02',
    code: 'EMAIL AI',
    title: 'Email Automation Manager',
    tagline: '85% autonomous email handling with 98.2% accuracy and 6 hours saved daily.',
    tags: ['OpenClaw Agents', 'GPT-4', 'Email APIs', 'IMAP/SMTP', 'Context Windows'],
    chips: ['85% Autonomous', '6hrs/day Freed', '98.2% Accuracy'],
    theme: 'red',
    prev_mission: 'lead-qualification',
    next_mission: 'ai-chief-of-staff',

    brief: 'Built an autonomous email agent powered by OpenClaw that reads, prioritizes, and drafts responses to 85% of incoming emails. Client approves with one click. Saves 6+ hours daily while maintaining 98%+ accuracy on response quality.',
    problem: 'Client\'s inbox was chaos. Admin drowning in 200+ emails daily. Most were routine (scheduling, confirmations, simple Q&A) but mixed with critical requests. Manual triage was impossible. Important messages were missed. Time to response: 1-2 days.',
    solution: [
      'Reads every incoming email and extracts intent',
      'Categorizes as Urgent, Important, or Routine',
      'Auto-drafts responses for 85% of cases',
      'Flags the 15% that need human judgment',
      'Learns from corrections (feedback training)'
    ],
    tech_stack: {
      'Agent Engine': 'OpenClaw · GPT-4 · Intent Classification',
      'Email Protocol': 'IMAP/SMTP · Gmail API',
      'Context': '32k token context window · Full thread memory',
      'Backend': 'FastAPI · Task queue (Celery)',
      'Storage': 'PostgreSQL · Email archive'
    },
    metrics: [
      '85% Autonomous handling rate',
      '6+ hrs/day Time freed',
      '98.2% Response accuracy',
      '< 2 min Average response time'
    ],
    outcomes: [
      'Admin time reduced from 6 hours to <1 hour per day',
      'Response time dropped from 1-2 days to 30 minutes average',
      'Zero critical emails missed (all Urgent flagged)',
      'Built-in learning loop: model improves 2-3% monthly'
    ],
    cta: 'Drowning in email? Let\'s give your team back 5-6 hours daily with an agent that handles routine communications flawlessly.'
  },

  'ai-chief-of-staff': {
    mission_id: 'MISSION_03',
    code: 'CHIEF OF STAFF',
    title: 'AI Daily Briefing Agent',
    tagline: 'Autonomous daily briefing agent that saves 45 minutes each morning and never misses a critical meeting.',
    tags: ['OpenClaw', 'n8n', 'Calendar Integration', 'Slack', 'Real-time Alerts'],
    chips: ['45min Saved Daily', '0 Missed Meetings', 'Zero Prompts'],
    theme: 'red',
    prev_mission: 'email-automation',
    next_mission: 'real-estate-saas',

    brief: 'Built an autonomous "Chief of Staff" agent that reads calendar, email, Slack, and news feeds — then delivers a 2-minute personalized briefing each morning at 7am. Zero missed meetings. Zero manual input required. Client saves 45+ minutes daily.',
    problem: 'Founder was spending 45+ minutes each morning on routine tasks: checking calendar conflicts, reading critical emails, scanning for urgent Slack mentions, remembering key meetings. Important context was scattered across 5 different apps. One missed meeting could derail the day.',
    solution: [
      'Reads calendar 48 hours ahead (finds conflicts, prep notes)',
      'Scans email overnight (flags urgent items)',
      'Monitors Slack for @mentions (priority alerts)',
      'Watches news feeds for industry signals',
      'Generates a 2-minute briefing automatically at 7am',
      'Posts directly to founder\'s Slack · Zero prompts needed'
    ],
    tech_stack: {
      'Agent Engine': 'OpenClaw · GPT-4',
      'Automation': 'n8n workflows · Scheduled triggers',
      'Integrations': 'Google Calendar · Gmail · Slack API',
      'Intelligence': 'Context synthesis · Priority scoring',
      'Delivery': 'Slack → DM @ 7am IST'
    },
    metrics: [
      '45+ min/day Time saved',
      '0 Missed meetings (historically)',
      '0 Manual prompts required',
      '98% Context accuracy'
    ],
    outcomes: [
      'Every morning starts with a clear, actionable briefing',
      'Calendar conflicts caught 48 hours in advance',
      'Critical emails never slip past',
      'Founder regains 45 minutes for revenue-generating work',
      'Agent learns preferences over time (improves accuracy weekly)'
    ],
    cta: 'Stop manual morning routines. Let an agent handle it while you focus on what matters.'
  },

  'real-estate-saas': {
    mission_id: 'MISSION_04',
    code: 'SAAS',
    title: 'Real Estate Operations SaaS',
    tagline: 'Production-ready multi-tenant SaaS platform shipped with zero revisions and a 5★ Upwork review.',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Role-based Auth', 'Stripe', 'AWS'],
    chips: ['Zero Revisions', 'Multi-tenant', 'Full Audit Trail', '5★ Review'],
    theme: 'red',
    prev_mission: 'ai-chief-of-staff',
    next_mission: 'reddit-lead-gen',

    brief: 'Built a full-stack multi-tenant SaaS platform for a real estate operations firm. Role-based access, audit logs, Kanban boards, automated notifications, and daily exports. Delivered to exact spec, on time, zero revisions requested — a rare result in custom software development.',
    problem: 'Client was managing property operations across multiple agencies using spreadsheets and email chains. No audit trail, no role separation, no visibility. They needed a production SaaS — not a prototype.',
    solution: [
      'Built from scratch: Next.js 14 frontend with role-based access (Admin/Manager/Agent)',
      'FastAPI backend, PostgreSQL with full audit logging',
      'Kanban boards per property, automated email + WhatsApp notifications on status changes',
      'Daily CSV export jobs. Deployed on AWS with CI/CD'
    ],
    tech_stack: {
      'Frontend': 'Next.js 14 · TypeScript · Tailwind CSS',
      'Backend': 'FastAPI · Python · JWT Auth',
      'Database': 'PostgreSQL · Full audit log schema',
      'Notifications': 'Email · WhatsApp Business API',
      'Infrastructure': 'AWS EC2 · RDS · S3 · GitHub Actions CI/CD'
    },
    metrics: [
      '0 Revisions Needed',
      '3 User Roles',
      '100% On-time Delivery',
      '5★ Upwork Review'
    ],
    outcomes: [
      'Delivered exactly on spec — zero change requests or revision rounds',
      'Full role-based access control: Admin, Manager, Agent with permission layers',
      'Complete audit trail: every user action timestamped and logged permanently',
      'Automated notifications triggered on every property status change',
      'Production AWS deployment with CI/CD pipeline — zero manual deploys'
    ],
    cta: 'I can build the same system — customised to your workflow — within 7 days. Let\'s talk.'
  },

  'reddit-lead-gen': {
    mission_id: 'MISSION_05',
    code: 'REDDIT BOT',
    title: 'Lead Gen → Discord Pipeline',
    tagline: '24/7 Reddit monitoring bot that identifies intent signals and delivers qualified leads to Discord.',
    tags: ['Python Scrapers', 'NLP Intent Detection', 'n8n', 'Reddit API', 'Discord Webhooks'],
    chips: ['24/7 Monitor', 'Intent Signals', 'n8n + AI'],
    theme: 'red',
    prev_mission: 'real-estate-saas',
    next_mission: null,

    brief: 'Built a fully autonomous Reddit lead discovery system that monitors 50+ subreddits 24/7, identifies buying intent signals in real-time, and routes qualified prospects directly to Discord. Zero manual review. Delivers 8-12 qualified leads daily.',
    problem: 'Client was manually browsing Reddit for inbound demand signals. Finding leads was inefficient (1-2 hours/day) and random. Most promising prospects were missed. Needed a system that never sleeps and catches every qualified signal.',
    solution: [
      'Monitors 50+ subreddits in real-time via Reddit API',
      'Parses posts for buying intent keywords (budget mentions, pain points)',
      'Scores each post using NLP classification model',
      'Routes high-intent posts to Discord instantly',
      'Includes prospect details (username, karma, post history context)',
      'Teammate can message within minutes of posting'
    ],
    tech_stack: {
      'Scraping': 'Python · Reddit PRAW API',
      'NLP': 'Intent classification · Keyword extraction',
      'Automation': 'n8n workflows · Cron scheduling',
      'Delivery': 'Discord Webhooks · Real-time messages',
      'Data': 'PostgreSQL · Lead history · Conversion tracking'
    },
    metrics: [
      '24/7 Continuous monitoring',
      '8-12 Qualified leads/day',
      '< 2 min Lead delivery time',
      '~6% Intent detection accuracy'
    ],
    outcomes: [
      'Zero manual Reddit browsing needed',
      'Leads captured within minutes of posting',
      'Team responds while prospect is actively researching',
      'Easy to scale to additional subreddits (copy-paste)',
      'Monthly conversion tracking built-in'
    ],
    cta: 'Prospect discovery shouldn\'t be manual. Let an agent find your leads 24/7 while you sleep.'
  }
};

// ─── TEMPLATE ENGINE ───
function generatePortfolioContent(portfolio) {
  const { brief, problem, solution, tech_stack, metrics, outcomes, cta } = portfolio;

  return `# Mission Brief

${brief}

---

## The Problem

${problem}

## The Solution

${solution.map(item => `- ${item}`).join('\n')}

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
${Object.entries(tech_stack).map(([layer, tech]) => `| **${layer}** | ${tech} |`).join('\n')}

---

## Performance Data

${metrics.map(metric => `- **${metric.split(' ')[0]}** ${metric.substring(metric.indexOf(' ') + 1)}`).join('\n')}

---

## Mission Outcomes

${outcomes.map(outcome => `- ${outcome}`).join('\n')}

---

## Want This For Your Biz?

${cta}`;
}

// Generate content for all portfolios
Object.keys(PORTFOLIO_DATA).forEach(key => {
  PORTFOLIO_DATA[key].content = generatePortfolioContent(PORTFOLIO_DATA[key]);
});
