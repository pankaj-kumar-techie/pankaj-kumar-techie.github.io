/* ─── PANKAJ.AI – TERMINAL BOT (OPTIMIZED) ─── */

const WORKER_URL = 'https://pankaj-portfolio-worker.pankajkumar-techie.workers.dev';
const BOT_NAME = 'Pankaj AI Assistant';
const BOT_AVATAR = '🤖';

// ================= STATE =================
let intakeActive = false;
let currentStep = 0;
let leadData = { name: '', email: '', problem: '' };
let chatHistory = [];
let isProcessing = false;
let hasBooted = false;
let visitorId = localStorage.getItem('pankaj_visitor_id') || 'V-' + Math.random().toString(36).substr(2, 9);
localStorage.setItem('pankaj_visitor_id', visitorId);

// ================= DOM ELEMENTS =================
const termBody = document.getElementById('term-body');
const termInput = document.getElementById('term-input');

// ================= UTILITIES =================
function addMsg(role, text, isHtml = false) {
  const msg = document.createElement('div');
  msg.className = `msg ${role}`;

  const icon = document.createElement('div');
  icon.className = role === 'bot' ? 'msg-bot-icon' : (role === 'sys' ? 'msg-bot-icon sys' : 'msg-user-icon');
  icon.textContent = role === 'bot' ? BOT_AVATAR : (role === 'sys' ? '⚠️' : '👤');

  const content = document.createElement('div');
  content.className = 'msg-text';
  if (isHtml) content.innerHTML = text;
  else content.textContent = text;

  msg.appendChild(icon);
  msg.appendChild(content);
  termBody.appendChild(msg);

  // Keep terminal scroll manageable
  const allMsgs = termBody.querySelectorAll('.msg');
  if (allMsgs.length > 50) allMsgs[0].remove();

  setTimeout(() => {
    msg.classList.add('show');
    termBody.scrollTo({ top: termBody.scrollHeight, behavior: 'smooth' });
  }, 10);
}

function showTyping() {
  const loader = document.createElement('div');
  loader.className = 'typing-indicator';
  loader.id = 'term-loader';
  loader.innerHTML = `<span></span><span></span><span></span><small style="margin-left:8px; font-size:8px; opacity:0.6">${BOT_NAME} is thinking...</small>`;
  termBody.appendChild(loader);
  termBody.scrollTop = termBody.scrollHeight;
}

function hideTyping() {
  const loader = document.getElementById('term-loader');
  if (loader) loader.remove();
}

// ================= BACKEND CALLS =================
async function sendMessageToWorker(message, history) {
  const response = await fetch(`${WORKER_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, visitorId })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data.response;
}

async function sendLeadToWorker(lead) {
  const response = await fetch(`${WORKER_URL}/webhook/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientName: lead.name,
      email: lead.email,
      description: lead.problem,
      visitorId,
      source: 'Terminal Intake'
    })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
}

async function logVisit() {
  try {
    await fetch(`${WORKER_URL}/webhook/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, url: window.location.href })
    });
  } catch (e) { /* silent */ }
}

// ================= LEAD INTAKE FLOW =================
const INTAKE_STEPS = [
  "Let's get started. What is your full name?",
  "Thanks! And your email address?",
  "Finally, in one sentence: what business process would you like to automate or improve with AI?"
];

async function handleIntake(userInput) {
  if (currentStep === 0) {
    leadData.name = userInput;
    currentStep++;
    addMsg('bot', INTAKE_STEPS[1]);
  } else if (currentStep === 1) {
    if (!userInput.includes('@') || !userInput.includes('.')) {
      addMsg('bot', "Please enter a valid email address:");
      return;
    }
    leadData.email = userInput;
    currentStep++;
    addMsg('bot', INTAKE_STEPS[2]);
  } else if (currentStep === 2) {
    leadData.problem = userInput;
    addMsg('bot', "✨ Analyzing your requirements...");
    showTyping();
    try {
      await sendLeadToWorker(leadData);
      hideTyping();
      addMsg('bot', `✅ **Lead captured successfully!** Pankaj will personally review your request and reply to **${leadData.email}** within 4 hours. Thank you!`, true);
      intakeActive = false;
      currentStep = 0;
      leadData = { name: '', email: '', problem: '' };
    } catch (err) {
      hideTyping();
      addMsg('sys', '⚠️ Submission error. Please email pankajkumar.techie@gmail.com directly.', true);
      intakeActive = false;
    }
  }
}

// ================= MESSAGE HANDLER =================
async function sendMessage() {
  const rawMessage = termInput.value.trim();
  if (!rawMessage || isProcessing) return;
  termInput.value = '';
  addMsg('user', rawMessage);

  if (intakeActive) {
    await handleIntake(rawMessage);
    return;
  }

  const lowerMsg = rawMessage.toLowerCase();
  if (lowerMsg === 'clear') { termBody.innerHTML = ''; return; }
  if (lowerMsg === 'help') {
    addMsg('bot', `**Available commands:** help, contact, mission, clear`, true);
    return;
  }
  if (lowerMsg === 'mission') {
    addMsg('bot', "My mission is to help businesses reclaim 15+ hours/week through autonomous AI agents. I'm here to understand your needs and connect you with Pankaj.");
    return;
  }

  if (lowerMsg === 'contact' || lowerMsg === 'hire') {
    intakeActive = true;
    currentStep = 0;
    addMsg('bot', INTAKE_STEPS[0]);
    return;
  }

  if (rawMessage.includes('@') && rawMessage.includes('.')) {
    intakeActive = true;
    currentStep = 1;
    leadData.email = rawMessage;
    addMsg('bot', "Email detected. Let's continue. What is your full name?");
    return;
  }

  isProcessing = true;
  termInput.placeholder = "Consulting AI...";
  showTyping();

  try {
    const aiResponse = await sendMessageToWorker(rawMessage, chatHistory);
    hideTyping();
    addMsg('bot', aiResponse, true); // Enabled HTML
    chatHistory.push({ role: "user", parts: [{ text: rawMessage }] });
    chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
  } catch (err) {
    hideTyping();
    addMsg('sys', '⚠️ Service Interrupted. Please <a href="mailto:pankajkumar.techie@gmail.com" style="color:#00ff00;">Email Pankaj Directly</a>.', true);
  } finally {
    isProcessing = false;
    termInput.placeholder = "Ask about AI automation...";
  }
}

// ================= BOOT SEQUENCE =================
async function boot() {
  if (hasBooted) return;
  hasBooted = true;

  const bootLines = [
    { t: `🔄 Initializing ${BOT_NAME}...`, d: 300 },
    { t: `👤 Visitor ID: ${visitorId}`, d: 200 },
    { t: `✅ System online. I'm an AI assistant that helps qualify projects for Pankaj.`, d: 500 },
    { t: `💡 Tip: Type \`help\` for commands, or \`contact\` to start the intake form.`, d: 600, html: true },
    { t: "How can I help you today?", d: 400 }
  ];

  for (const line of bootLines) {
    addMsg('bot', line.t, line.html);
    await new Promise(r => setTimeout(r, line.d));
  }

  if (!sessionStorage.getItem('pankaj_visit_logged')) {
    logVisit();
    sessionStorage.setItem('pankaj_visit_logged', 'true');
  }
  termInput.disabled = false;
  termInput.focus();
}

const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasBooted) {
      setTimeout(boot, 300);
      termObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const terminalElement = document.getElementById('terminal');
if (terminalElement) termObserver.observe(terminalElement);

// ================= EVENT LISTENERS =================
termInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !isProcessing) sendMessage();
});
const sendBtn = document.getElementById('term-send');
if (sendBtn) sendBtn.addEventListener('click', sendMessage);

let startTime = Date.now();
function sendSessionEnd() {
  const duration = Math.floor((Date.now() - startTime) / 1000);
  if (duration > 5) {
    navigator.sendBeacon(`${WORKER_URL}/webhook/session_end`, JSON.stringify({ visitorId, duration }));
  }
}
window.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') sendSessionEnd(); });
window.addEventListener('pagehide', sendSessionEnd);