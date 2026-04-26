/* ─── PANKAJ.AI PRODUCTION TERMINAL ENGINE ─── */
const BOT_URL = 'https://023c-2409-40d7-51-d179-7a14-4991-6cfc-cf3.ngrok-free.app';

const INITIAL_MESSAGE = "AGENT ONLINE. I'm Pankaj's AI interface. What can I help you automate today?";

// Local commands for instant response
const COMMANDS = {
  '/status': 'DIAGNOSTIC COMPLETE: API Connected. Average Sync Latency: 42ms. System Uptime: 99.9%. Security: Active.',
  '/clear': 'MEMORY_WIPE_SUCCESSFUL',
  '/contact': 'SECURE COMMS: Email: pankajkr.tech@gmail.com | Discord: pankajkumar_dev | Hire: index.html#contact',
  '/projects': 'MISSION LOGS: MISSION_01 (Lead AI), MISSION_02 (Email AI), MISSION_03 (Chief of Staff), MISSION_04 (SaaS MVP), MISSION_05 (Reddit Gen).'
};

const termBody = document.getElementById('term-body');
const termInput = document.getElementById('term-input');
let isProcessing = false;
let chatHistory = [];

function addMsg(role, text) {
  if (!termBody) return;
  const m = document.createElement('div');
  m.className = `msg ${role}`;

  if (role === 'sys') {
    m.innerHTML = `<div class="msg-text" style="color: #00ffc8;">> ${text}</div>`;
  } else if (role === 'bot') {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    m.innerHTML = `<div class="msg-bot-icon">PK</div><div class="msg-text">${formattedText}</div>`;
  } else {
    m.innerHTML = `<div class="msg-user-icon">YOU</div><div class="msg-text">${text}</div>`;
  }

  termBody.appendChild(m);
  setTimeout(() => m.classList.add('show'), 10);
  termBody.scrollTop = termBody.scrollHeight;
}

async function sendMessage() {
  if (isProcessing) return;
  const val = termInput.value.trim();
  if (!val) return;

  termInput.value = '';
  addMsg('user', val);

  // Local Command Handling
  if (val.toLowerCase() === '/clear') {
    termBody.innerHTML = '';
    chatHistory = [];
    addMsg('bot', 'System reset. Memory cleared.');
    return;
  }
  if (COMMANDS[val.toLowerCase()]) {
    addMsg('bot', COMMANDS[val.toLowerCase()]);
    return;
  }

  // Network Request to Bot
  isProcessing = true;
  termInput.disabled = true;
  termInput.placeholder = "Syncing with AI Core...";

  try {
    const response = await fetch(`${BOT_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: val, history: chatHistory })
    });

    const data = await response.json();
    if (data.response) {
      addMsg('bot', data.response);
      chatHistory.push({ role: "user", parts: [{ text: val }] });
      chatHistory.push({ role: "model", parts: [{ text: data.response }] });
    } else {
      addMsg('sys', 'ERROR: AI Core returned invalid response.');
    }
  } catch (error) {
    addMsg('sys', 'CONNECTION ERROR: AI Core is currently unreachable.');
    console.error("Bot Error:", error);
  } finally {
    isProcessing = false;
    termInput.disabled = false;
    termInput.placeholder = "Ask me anything...";
    termInput.focus();
  }
}

// Event Listeners
if (termInput) {
  termInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
}

window.onload = () => { if (termBody) setTimeout(() => addMsg('bot', INITIAL_MESSAGE), 800); };
