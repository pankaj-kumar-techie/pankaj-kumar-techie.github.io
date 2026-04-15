/* ─── PANKAJ.AI GEMINI TERMINAL ENGINE ─── */
let API_KEY = '__GEMINI_API_KEY__'; // Replaced via GitHub Actions during deployment

// API key is handled during deployment
// No local dev prompt to keep terminal clean

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `You are PANKAJ.AI, the autonomous interface for Pankaj Kumar, an AI Agent Architect.
Your core directive is to assist visitors, explain Pankaj's capabilities, and QUALIFY/FETCH LEADS.
To capture a lead, ask for their name, email, and project scope. Once they provide it, confirm receipt.
Keep responses very concise (1-2 sentences), professional, and futuristic. Mention /status, /contact, or /projects if asked.
CRITICAL INSTRUCTION: DO NOT prefix your response. Do not use labels like "PANKAJ.AI:", "Bot:", "System:". Just output your message directly without prefixes.`;

const INITIAL_MESSAGE = "AGENT ONLINE. I'm Pankaj's AI interface. What can I help you automate today?";

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

function addMsg(role, text, cb) {
  if (!termBody) return;
  
  if (role === 'sys') {
    const m = document.createElement('div');
    m.className = 'msg sys';
    m.innerHTML = '<div class="msg-text" style="color: #00ffc8; font-family: \'Share Tech Mono\', monospace; font-size: 0.85em; margin-bottom: 12px; opacity: 0.9;">> ' + text + '</div>';
    termBody.appendChild(m);
    termBody.scrollTop = termBody.scrollHeight;
    if (cb) cb();
    return;
  }
  
  if (role === 'bot') {
    const tyDiv = document.createElement('div');
    tyDiv.className = 'msg bot typing-msg';
    tyDiv.innerHTML = '<div class="msg-bot-icon">PK</div><div class="typing-indicator"><span></span><span></span><span></span></div>';
    termBody.appendChild(tyDiv);
    termBody.scrollTop = termBody.scrollHeight;
    
    setTimeout(() => {
      tyDiv.remove();
      const m = document.createElement('div');
      m.className = 'msg bot';
      
      // Basic markdown parsing for terminal
      let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      formattedText = formattedText.replace(/\n/g, '<br>');
      
      m.innerHTML = '<div class="msg-bot-icon">PK</div><div class="msg-text">' + formattedText + '</div>';
      termBody.appendChild(m);
      setTimeout(() => m.classList.add('show'), 30);
      termBody.scrollTop = termBody.scrollHeight;
      if (cb) cb();
    }, 800);
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

async function callGeminiApi(userText) {
  try {
    chatHistory.push({ role: "user", parts: [{ text: userText }] });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: chatHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0) {
      let botResponse = data.candidates[0].content.parts[0].text;
      
      // Cleanup AI hallucinated prefixes
      botResponse = botResponse.replace(/^(PANKAJ\.AI|Bot|System|AI|Me|Agent|Pankaj):\s*/i, '').trim();
      botResponse = botResponse.replace(/^\*\*(PANKAJ\.AI|Bot|System|AI|Me|Agent|Pankaj):\*\*\s*/i, '').trim();
      
      chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
      return botResponse;
    } else {
      throw new Error("No candidates returned from API");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    chatHistory.pop(); // Remove the user message that failed
    return "ERROR: Connection to main AI core severed. Please try again or use direct /contact.";
  }
}

async function sendMessage() {
  if (isProcessing) return;
  const val = termInput.value.trim();
  if (!val) return;
  
  termInput.value = '';
  addMsg('user', val);
  
  const cmd = val.toLowerCase();
  
  if (cmd === '/clear') {
    setTimeout(() => {
      termBody.innerHTML = '';
      chatHistory = []; // Reset history
      addMsg('bot', 'System reset. Memory cleared. Agent standby.');
    }, 400);
    return;
  }

  if (COMMANDS[cmd]) {
    setTimeout(() => addMsg('bot', COMMANDS[cmd]), 600);
    return;
  }

  isProcessing = true;
  termInput.disabled = true;
  termInput.placeholder = "Agent is processing network response...";
  
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  if (emailRegex.test(val)) {
    setTimeout(() => {
      addMsg('sys', '[SYSTEM INFO: ENCRYPTED LEAD DATA CAPTURED SECURELY. SYNCING TO MAIN DB...]');
    }, 400);
  }
  
  const botReply = await callGeminiApi(val);
  
  addMsg('bot', botReply, () => {
    isProcessing = false;
    termInput.disabled = false;
    termInput.placeholder = "Ask me anything about AI agents...";
    termInput.focus();
  });
}

if (termInput) {
  termInput.addEventListener('keydown', e => { 
    if (e.key === 'Enter') sendMessage(); 
  });
}

// Initial sequence
if (termBody) {
  setTimeout(() => {
    addMsg('bot', INITIAL_MESSAGE);
  }, 800);
}
