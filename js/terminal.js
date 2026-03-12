/* ─── PANKAJ.AI TERMINAL ENGINE ─── */
const CONVO = [
  { role: 'bot', text: 'AGENT ONLINE. I\'m Pankaj\'s AI interface. What can I help you with today?' },
  { role: 'user', text: 'What kind of AI agents do you build?' },
  { role: 'bot', text: 'I specialize in autonomous OpenClaw agents — they connect to WhatsApp, Slack, Discord and run 24/7 without human input. Also RAG chatbots trained on your data, n8n automation pipelines, and full SaaS MVPs. What\'s your use case?' },
  { role: 'user', text: 'How fast do you typically deliver?' },
  { role: 'bot', text: 'Depends on scope — a lead qualification agent typically ships in 5-7 days. A full SaaS MVP in 3-4 weeks. I have a zero-revision track record. What are you looking to automate?' },
];

const REPLIES = [
  "That sounds like a great project for AI automation. Tell me more and I'll build it for you.",
  "I can handle that. My typical turnaround is 5-7 days for agent systems. Want to discuss scope?",
  "Great question. Let me route you to the right solution — drop me an email at pankajkr.tech@gmail.com",
  "I've built exactly that kind of system before. Check out my case studies above for similar work.",
  "OpenClaw is perfect for that use case. It runs autonomously, connects to any API, and scales infinitely.",
  "RAG pipelines trained on your data would solve that completely. Deployed in under a week.",
  "n8n automation would handle that end-to-end. 15+ hours/week saved is the typical result.",
  "100% Job Success on Upwork — every client gets exactly what they need, on time.",
];

const COMMANDS = {
  '/help': 'SYSTEM DIRECTORY: [/status] Check agent health, [/clear] Wipe terminal memory, [/contact] Direct comms, [/projects] View mission logs.',
  '/status': 'DIAGNOSTIC COMPLETE: 14 Autonomous Agents Online. Avg. Latency: 38ms. System Uptime: 99.8%. Security: Enforced.',
  '/clear': 'MEMORY_WIPE_SUCCESSFUL',
  '/contact': 'SECURE COMMS: Email: pankajkr.tech@gmail.com | Discord: pankajkumar_dev | Hire: index.html#contact',
  '/projects': 'MISSION LOGS: MISSION_01 (Lead AI), MISSION_02 (Email AI), MISSION_03 (Chief of Staff), MISSION_04 (SaaS MVP), MISSION_05 (Reddit Gen).'
};

const termBody = document.getElementById('term-body');
const termInput = document.getElementById('term-input');
let rIdx = 0;

function addMsg(role, text, cb) {
  if (!termBody) return;
  if (role === 'bot') {
    const tyDiv = document.createElement('div');
    tyDiv.className = 'msg bot';
    tyDiv.innerHTML = '<div class="msg-bot-icon">PK</div><div class="typing-indicator"><span></span><span></span><span></span></div>';
    termBody.appendChild(tyDiv);
    termBody.scrollTop = termBody.scrollHeight;
    setTimeout(() => {
      tyDiv.remove();
      const m = document.createElement('div');
      m.className = 'msg bot';
      m.innerHTML = '<div class="msg-bot-icon">PK</div><div class="msg-text">' + text + '</div>';
      termBody.appendChild(m);
      setTimeout(() => m.classList.add('show'), 30);
      termBody.scrollTop = termBody.scrollHeight;
      if (cb) cb();
    }, 1200);
  } else {
    const m = document.createElement('div');
    m.className = 'msg user';
    m.innerHTML = '<div class="msg-user-icon">YOU</div><div class="msg-text">' + text + '</div>';
    termBody.appendChild(m);
    setTimeout(() => m.classList.add('show'), 30);
    termBody.scrollTop = termBody.scrollHeight;
    if (cb) cb();
  }
}

function runScript(i) {
  if (i >= CONVO.length) return;
  const delay = i === 0 ? 1200 : 600;
  setTimeout(() => {
    addMsg(CONVO[i].role, CONVO[i].text, () => runScript(i + 1));
  }, delay);
}

function sendMessage() {
  const val = termInput.value.trim();
  if (!val) return;
  addMsg('user', val);
  termInput.value = '';
  const cmd = val.toLowerCase();
  
  if (cmd === '/clear') {
    setTimeout(() => {
      termBody.innerHTML = '';
      addMsg('bot', 'System reset. Memory cleared. Agent standby.');
    }, 400);
    return;
  }

  let reply = '';
  if (COMMANDS[cmd]) {
    reply = COMMANDS[cmd];
  } else if (cmd.includes('price') || cmd.includes('cost') || cmd.includes('budget')) {
    reply = "Project scope dictates hardware/API costs. Simple agents start at $500, complex RAG-SaaS systems are custom-quoted. Mission briefing recommended.";
  } else if (cmd.includes('stack') || cmd.includes('tech') || cmd.includes('how')) {
    reply = "Architecture: OpenClaw + LangChain core. Integrations via n8n/Make. Deployment: AWS/Docker. Logic: Python/TypeScript.";
  } else if (cmd.includes('speed') || cmd.includes('fast') || cmd.includes('delivery')) {
    reply = "Execution speed: 5-7 days for autonomous agents. 21-30 days for end-to-end SaaS platforms. I ship production code, not prototypes.";
  } else {
    reply = REPLIES[rIdx % REPLIES.length];
    rIdx++;
  }
  setTimeout(() => addMsg('bot', reply), 600);
}

if (termInput) {
  termInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
}

// Initial sequence
if (termBody) runScript(0);
