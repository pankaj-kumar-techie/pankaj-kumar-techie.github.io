/* ─── PANKAJ.AI ADVANCED AGENTIC TERMINAL (V5) ─── */
const BOT_URL = 'https://023c-2409-40d7-51-d179-7a14-4991-6cfc-cf3.ngrok-free.app';

const isReturning = localStorage.getItem('pankaj_returning');
const GREETING = isReturning ? "Welcome back, agent. Resuming secure session..." : "Welcome, visitor. I am Pankaj's AI Analyst.";
if (!isReturning) localStorage.setItem('pankaj_returning', 'true');

const BOOT_SEQUENCE = [
  { text: "SYSTEM_BOOT: INITIALIZING NEURAL_CORE_V4...", delay: 400 },
  { text: "SIGNAL_STRENGTH: 98% [ESTABLISHED]", delay: 300 },
  { text: "ENCRYPTION: AES-256 [ACTIVE]", delay: 300 },
  { text: "FETCHING_GEOLOCATION... [INDIA/NEW_DELHI]", delay: 500 },
  { text: "VERIFYING_BIOMETRICS... [GUEST_ACCESS]", delay: 400 },
  { text: "AGENT_ID: PK-0x7F3A [ONLINE]", delay: 200 },
  { text: GREETING, delay: 800 }
];

const INITIAL_MESSAGE = "I'm monitoring this session to help you automate your business. What brings you to PANKAJ.AI today?";

const LOCAL_RESPONSES = {
  'hi': 'Hello! Are you looking to build an AI agent or automate a workflow?',
  'hello': 'Greetings. I can help you with AI automation. What are you looking to build?',
  'who are you': 'I am Pankaj AI, a specialized assistant. You can hire Pankaj for AI development.',
  'contact': 'START_INTAKE',
  'hire': 'START_INTAKE'
};

const INTAKE_STEPS = [
  "Great! To provide a custom quote, I need some details. What is your **Full Name**?",
  "Thanks! What is your **Work Email**?",
  "And finally, what **Problem** are we solving with AI today?"
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

// Helper to add messages with typing animation
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
  
  // Prune messages if too many (keep last 30 to save performance/size)
  const allMsgs = termBody.querySelectorAll('.msg');
  if (allMsgs.length > 30) {
    allMsgs[0].remove();
  }
  
  // Trigger animation
  setTimeout(() => {
    msg.classList.add('show');
    termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
  }, 10);
}

async function captureVisit() {
  const meta = {
    visitorId: visitorId,
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: `${window.innerWidth}x${window.innerHeight}`,
    url: window.location.href,
    referrer: document.referrer,
    timestamp: new Date().toISOString()
  };
  
  try {
    await fetch(`${BOT_URL}/webhook/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta)
    });
  } catch (e) {
    console.warn("Analytics ping failed.");
  }
}

async function analyzeLead(message) {
  try {
    await fetch(`${BOT_URL}/webhook/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: visitorId,
        message: message,
        history: chatHistory,
        source: 'Terminal Analyst'
      })
    });
  } catch (e) {
    console.warn("Analysis failed.");
  }
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
    addMsg('bot', "ANALYZING REQUIREMENTS... CONNECTING TO CORE.");

    await fetch(`${BOT_URL}/webhook/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Verified Portfolio Lead',
        visitorId: visitorId,
        clientName: leadData.name,
        description: `**Project:** ${leadData.problem}\n**Email:** ${leadData.email}`,
        url: window.location.href
      })
    });

    addMsg('bot', "✅ **LEAD VERIFIED.** Pankaj has received your mission brief. Expect a response at " + leadData.email + " within 4 hours.");
    intakeActive = false;
    currentStep = 0;
  }
}

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
  if (LOCAL_RESPONSES[lowVal]) {
    if (LOCAL_RESPONSES[lowVal] === 'START_INTAKE') {
      intakeActive = true;
      addMsg('bot', INTAKE_STEPS[0]);
    } else {
      addMsg('bot', LOCAL_RESPONSES[lowVal]);
    }
    return;
  }

  if (val.length < 5) {
    addMsg('bot', "I'm listening. Tell me about your project, or type 'hire' to start the intake.");
    return;
  }

  isProcessing = true;
  termInput.placeholder = "AI ANALYST PROCESSING...";
  try {
    const response = await fetch(`${BOT_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val, history: chatHistory, visitorId: visitorId })
    });
    const data = await response.json();
    if (data.response) {
      addMsg('bot', data.response);
      chatHistory.push({ role: "user", parts: [{ text: val }] });
      chatHistory.push({ role: "model", parts: [{ text: data.response }] });
    }
  } catch (e) {
    addMsg('sys', 'OFFLINE: Unable to reach core.');
  } finally {
    isProcessing = false;
    termInput.placeholder = "Ask me anything...";
  }
}

// Initial Boot Sequence
async function boot() {
  if (hasBooted) return;
  hasBooted = true;
  
  for (const item of BOOT_SEQUENCE) {
    addMsg('bot', item.text);
    await new Promise(r => setTimeout(r, item.delay));
  }
  
  setTimeout(() => {
    addMsg('bot', INITIAL_MESSAGE);
    captureVisit();
    termInput.placeholder = "Ask me anything about AI agents...";
  }, 400);
}

// Intersection Observer to trigger boot when visible
const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(boot, 500); // Small delay for effect
      termObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const termEl = document.getElementById('terminal');
if (termEl) termObserver.observe(termEl);

// Event Listeners
termInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

const termSend = document.getElementById('term-send');
if (termSend) {
  termSend.addEventListener('click', sendMessage);
}

