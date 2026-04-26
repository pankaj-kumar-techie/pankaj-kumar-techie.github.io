/* ─── PANKAJ.AI TOKEN-SAVER TERMINAL (V3) ─── */
const BOT_URL = 'https://023c-2409-40d7-51-d179-7a14-4991-6cfc-cf3.ngrok-free.app';

const INITIAL_MESSAGE = "AGENT ONLINE. How can I help you automate your business today?";

// Handle these locally to save $0.00
const LOCAL_RESPONSES = {
  'hi': 'Hello! Are you looking to build an AI agent or automate a workflow?',
  'hello': 'Greetings. I can help you with AI automation. What are you looking to build?',
  'who are you': 'I am Pankaj AI, a specialized assistant. You can hire Pankaj for AI development.',
  'contact': 'START_INTAKE', // Special command to trigger local form
  'hire': 'START_INTAKE'
};

const INTAKE_STEPS = [
  "Great! Let's get started. What is your **Name**?",
  "Thanks! What is your **Email Address**?",
  "Finally, briefly describe your **Project or Problem**."
];

let intakeActive = false;
let currentStep = 0;
let leadData = { name: '', email: '', problem: '' };
let chatHistory = [];
let isProcessing = false;

// ... (addMsg and visitorMeta functions remain same as V2)

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
    addMsg('bot', "Processing your request... Connecting to Pankaj's core.");

    // ONE-SHOT SYNC: Send everything to Discord now
    await fetch(`${BOT_URL}/webhook/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'Verified Portfolio Lead',
        clientName: leadData.name,
        description: `**Project:** ${leadData.problem}\n**Email:** ${leadData.email}`,
        url: window.location.href
      })
    });

    addMsg('bot', "✅ **Lead Captured.** Pankaj has been notified and will email you at " + leadData.email + " soon.");
    intakeActive = false;
    currentStep = 0;
  }
}

async function sendMessage() {
  const val = termInput.value.trim();
  if (!val || isProcessing) return;
  termInput.value = '';
  addMsg('user', val);

  // 1. Handle Active Intake (No AI used)
  if (intakeActive) {
    handleIntake(val);
    return;
  }

  const lowVal = val.toLowerCase();

  // 2. Handle Local Responses (No AI used)
  if (LOCAL_RESPONSES[lowVal]) {
    if (LOCAL_RESPONSES[lowVal] === 'START_INTAKE') {
      intakeActive = true;
      addMsg('bot', INTAKE_STEPS[0]);
    } else {
      addMsg('bot', LOCAL_RESPONSES[lowVal]);
    }
    return;
  }

  // 3. Only use AI for long, complex messages (Token Saving)
  if (val.length < 10) {
    addMsg('bot', "I didn't quite catch that. Could you tell me more about what you need, or type 'contact' to get a quote?");
    return;
  }

  // 4. Serious Inquiry - Use AI
  isProcessing = true;
  termInput.placeholder = "Consulting AI Core...";
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
    }
  } catch (e) {
    addMsg('sys', 'Connection Error.');
  } finally {
    isProcessing = false;
    termInput.placeholder = "Ask me anything...";
  }
}
