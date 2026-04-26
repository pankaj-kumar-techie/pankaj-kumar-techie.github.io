/* ─── PANKAJ.AI AGENTIC TERMINAL (INTELLIGENCE ENGINE) ─── */
const BOT_URL = 'https://023c-2409-40d7-51-d179-7a14-4991-6cfc-cf3.ngrok-free.app';

const isReturning = localStorage.getItem('pankaj_returning');
const GREETING = isReturning ? "Welcome back. System ready for mission analysis." : "Welcome. I am Pankaj's AI Solution Architect.";
if (!isReturning) localStorage.setItem('pankaj_returning', 'true');

const INITIAL_MESSAGE = "I build AI agents that handle your repetitive tasks so you can focus on high-impact work. What process would you like to automate today?";

const LOCAL_RESPONSES = {
  'hi': 'Hello! Are you looking to build an AI agent or automate a workflow?',
  'hello': 'Greetings. Tell me about your workflow, and I\'ll suggest an AI solution.',
  'who are you': 'I am Pankaj AI, a specialized assistant. I help teams reclaim 15+ hours/week through smart automation.',
  'contact': 'START_INTAKE',
  'hire': 'START_INTAKE'
};

const INTAKE_STEPS = [
  "Excellent. Let's draft a solution. What is your Full Name?",
  "Thanks! What is your Work Email?",
  "And finally, describe the Task or Process you want to boost with AI."
];

let intakeActive = false;
let currentStep = 0;
let leadData = { name: '', email: '', problem: '' };
let chatHistory = [];
let isProcessing = false;
let hasBooted = false;
let visitorId = localStorage.getItem('pankaj_visitor_id') || 'V-' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('pankaj_visitor_id', visitorId);

const termBody = document.getElementById('term-body');
const termInput = document.getElementById('term-input');

function addMsg(role, text) {
  const msg = document.createElement('div');
  msg.className = `msg ${role}`;
  const icon = document.createElement('div');
  icon.className = role === 'bot' ? 'msg-bot-icon' : (role === 'sys' ? 'msg-bot-icon sys' : 'msg-user-icon');
  icon.textContent = role === 'bot' ? 'PK' : (role === 'sys' ? '!!' : 'US');
  const content = document.createElement('div');
  content.className = 'msg-text';
  content.innerHTML = text;
  msg.appendChild(icon);
  msg.appendChild(content);
  termBody.appendChild(msg);

  const allMsgs = termBody.querySelectorAll('.msg');
  if (allMsgs.length > 40) allMsgs[0].remove();

  setTimeout(() => {
    msg.classList.add('show');
    termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
  }, 10);
}

function showTyping() {
  const loader = document.createElement('div');
  loader.className = 'typing-indicator';
  loader.id = 'term-loader';
  loader.innerHTML = '<span></span><span></span><span></span><small style="margin-left:8px; font-size:8px; opacity:0.6">CONSULTING CORE...</small>';
  termBody.appendChild(loader);
  termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
}

function hideTyping() {
  const loader = document.getElementById('term-loader');
  if (loader) loader.remove();
}

async function captureVisit() {
  try {
    const geoRes = await fetch('https://ipapi.co/json/');
    const geo = await geoRes.json();
    const meta = {
      visitorId, timestamp: new Date().toISOString(), url: window.location.href,
      ip: geo.ip, city: geo.city, country: geo.country_name, org: geo.org,
      device: { platform: navigator.platform, agent: navigator.userAgent }
    };
    await fetch(`${BOT_URL}/webhook/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta)
    });
  } catch (e) {
    const basicMeta = { visitorId, url: window.location.href, agent: navigator.userAgent, timestamp: new Date().toISOString() };
    fetch(`${BOT_URL}/webhook/visit`, { method: 'POST', body: JSON.stringify(basicMeta) });
  }
}

async function analyzeLead(message) {
  try { fetch(`${BOT_URL}/webhook/analyze`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visitorId, message, history: chatHistory, source: 'Terminal Architect' }) }); } catch (e) { }
}

async function handleIntake(val) {
  if (currentStep === 0) {
    leadData.name = val;
    currentStep++;
    addMsg('bot', INTAKE_STEPS[1]);
  } else if (currentStep === 1) {
    leadData.email = val;
    currentStep++;
    addMsg('bot', INTAKE_STEPS[2]);
  } else if (currentStep === 2) {
    leadData.problem = val;
    addMsg('bot', "ANALYZING WORKFLOW... GENERATING SOLUTION ARCHITECTURE.");
    await fetch(`${BOT_URL}/webhook/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Mission-Critical Lead',
        visitorId,
        clientName: leadData.name,
        description: `Project Brief: ${leadData.problem}\nDirect Contact: ${leadData.email}`,
        url: window.location.href
      })
    });
    addMsg('bot', "✅ MISSION LOGGED. I have transmitted your brief directly to Pankaj's secure Discord channel. Expect a response at " + leadData.email + " within 4 hours.");

    intakeActive = false;
    currentStep = 0;
  }
}

const MISSION_DATA = "My mission is to build the autonomous future. I design AI systems that don't just 'assist'—they take over entire workflows, allowing human teams to focus on 100% creative growth.";
const SOTA_DATA = "Current Stack: [YOLOv10] for Vision, [GPT-4o/Claude-3.5] for Logic, [Pinecone/Weaviate] for Memory, and [TensorRT] for Inference Speed.";

async function sendMessage() {
  const val = termInput.value.trim();
  if (!val || isProcessing) return;
  termInput.value = '';
  addMsg('user', val);
  analyzeLead(val);

  if (intakeActive) {
    handleIntake(val);
    return;
  }

  const lowVal = val.toLowerCase();
  if (lowVal === 'mission') { addMsg('bot', MISSION_DATA); return; }
  if (lowVal === 'sota') { addMsg('bot', SOTA_DATA); return; }

  if (LOCAL_RESPONSES[lowVal]) {
    if (LOCAL_RESPONSES[lowVal] === 'START_INTAKE') {
      intakeActive = true;
      currentStep = 0;
      addMsg('bot', INTAKE_STEPS[0]);
    } else {
      addMsg('bot', LOCAL_RESPONSES[lowVal]);
    }
    return;
  }

  if (val.includes('@')) {
    intakeActive = true;
    currentStep = 1;
    leadData.email = val;
    addMsg('bot', "Email detected. I'm starting your solution brief. What is your Full Name?");
    return;
  }

  isProcessing = true;
  termInput.placeholder = "CONSULTING ARCHITECT CORE...";
  showTyping();

  try {
    const response = await fetch(`${BOT_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val, history: chatHistory, visitorId })
    });
    const data = await response.json();
    hideTyping();

    if (data.response) {
      addMsg('bot', data.response.replace(/\*\*/g, ''));
      chatHistory.push({ role: "user", parts: [{ text: val }] });
      chatHistory.push({ role: "model", parts: [{ text: data.response }] });
    }
  } catch (e) {
    hideTyping();
    addMsg('sys', 'OFFLINE: Unable to reach core. MISSION CRITICAL: Please connect via alternate channels:');
    addMsg('bot', `
      <div class="fallback-links">
        <a href="mailto:pankajkumar.techie@gmail.com" class="fb-link">Email Pankaj</a>
      </div>
    `);
  } finally {
    isProcessing = false;
    termInput.placeholder = "Ask me about your workflow...";
  }
}

async function boot() {
  if (hasBooted) return;
  hasBooted = true;

  let geo = { city: 'UNKNOWN', country_code: '...', ip: '...', org: '...' };
  try {
    const res = await fetch('https://ipapi.co/json/');
    geo = await res.json();
  } catch (e) { }

  const BOOT_LOGS = [
    { t: "INITIALIZING NEURAL_CORE...", d: 400 },
    { t: "--- VISITOR SYSTEM AUDIT ---", d: 200 },
    { t: "▸ TARGET_IP: " + (geo.ip || '...'), d: 200 },
    { t: "▸ LOC_IDENT: " + (geo.city || 'VISITOR').toUpperCase() + ", " + (geo.country_code || '??'), d: 200 },
    { t: "▸ NETWORK: " + (geo.org || 'UNKNOWN').split(' ')[0].toUpperCase(), d: 200 },
    { t: "▸ SYS_OS: " + (navigator.platform || 'UNKNOWN').split(' ')[0].toUpperCase(), d: 200 },
    { t: "--- AUDIT COMPLETE ---", d: 300 },
    { t: GREETING, d: 800 }
  ];

  for (const item of BOOT_LOGS) {
    addMsg('bot', item.t);
    await new Promise(r => setTimeout(r, item.d));
  }

  setTimeout(() => {
    addMsg('bot', INITIAL_MESSAGE);
    captureVisit();
    termInput.placeholder = "Describe a process to automate...";
  }, 400);
}

const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(boot, 500);
      termObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const termEl = document.getElementById('terminal');
if (termEl) termObserver.observe(termEl);

termInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
const termSend = document.getElementById('term-send');
if (termSend) { termSend.addEventListener('click', sendMessage); }
