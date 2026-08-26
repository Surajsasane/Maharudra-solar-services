import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Send, Trash2 } from 'lucide-react';

type Msg = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  ts: number;
};

const STORAGE_KEY = 'maharudra_solar_chat_messages_v1';
const OPENROUTER_API_KEY = (import.meta.env.VITE_OPENROUTER_API_KEY as string) || '';
const OPENROUTER_MODEL = (import.meta.env.VITE_OPENROUTER_MODEL as string) || 'openai/gpt-4o-mini';

const INITIAL_WELCOME: Msg = {
  id: 'welcome-init',
  sender: 'bot',
  text: 'Hello! I am Rudra AI from Maharudra Solar. How can I help you with your rooftop solar planning or subsidy guidance today?',
  ts: 0,
};

const quickQuestions = [
  'What solar system size for ₹2,500 bill?',
  'How much does a 3 kW system generate?',
  'What documents are needed for solar subsidy?',
  'What is the installation process?',
];

function loadMessages(): Msg[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [INITIAL_WELCOME];
    const parsed = JSON.parse(raw) as Msg[];
    return parsed.length > 0 ? parsed : [INITIAL_WELCOME];
  } catch {
    return [INITIAL_WELCOME];
  }
}

function saveMessages(messages: Msg[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
}

function isSolarQuestion(input: string): boolean {
  const text = input.toLowerCase();
  const solarKeywords = [
    'solar',
    'rooftop',
    'panel',
    'inverter',
    'battery',
    'on-grid',
    'off-grid',
    'grid',
    'pv',
    'generation',
    'power',
    'sun',
    'installation',
    'install',
    'subsidy',
    'surya ghar',
    'pmsuryaghar',
    'net meter',
    'roof',
    'kilowatt',
    'kw',
    'kwh',
    'electricity bill',
    'bill',
    'energy savings',
    'energy',
    'quote',
    'system size',
    'system',
    'cost',
    'price',
    'save',
    'document',
    'aadhaar',
    'discom',
    'maharudra',
  ];
  return solarKeywords.some((keyword) => text.includes(keyword));
}

function buildSolarFallbackReply(input: string): string {
  const text = input.toLowerCase();
  const mentionsBill = /\b(\d{3,7})\b/.exec(input) || null;
  const billValue = mentionsBill ? Number(mentionsBill[1]) : null;

  if (billValue !== null) {
    if (billValue <= 3000) {
      return `For a monthly bill of ₹${billValue.toLocaleString('en-IN')}, Maharudra Solar recommends a 3 kW rooftop system (6 × 540W panels, ~330–390 units/month, ~240–300 sq.ft roof area). Pricing starts around ₹1,90,000 before applicable subsidies.`;
    }
    if (billValue <= 5000) {
      return `For a monthly bill of ₹${billValue.toLocaleString('en-IN')}, Maharudra Solar recommends a 5 kW rooftop system (9–10 × 540W panels, ~550–650 units/month, ~400–500 sq.ft roof area). Pricing is approx. ₹2,90,000 before applicable subsidies.`;
    }
    return `For a monthly bill of ₹${billValue.toLocaleString('en-IN')}, Maharudra Solar recommends a Custom Solar Solution designed specifically for your higher load and roof geometry. Please submit an enquiry to receive a tailored engineering proposal.`;
  }

  if (text.includes('3 kw') || text.includes('3kw') || text.includes('three kw')) {
    return 'Maharudra Solar 3 kW System: Uses 6 × 540W MNRE-approved panels, generates ~330–390 units/month (4,000–4,700 units/year), requires 240–300 sq.ft roof area. Best for monthly bills up to ₹3,000.';
  }

  if (text.includes('5 kw') || text.includes('5kw') || text.includes('five kw')) {
    return 'Maharudra Solar 5 kW System: Uses 9–10 × 540W MNRE-approved panels, generates ~550–650 units/month (6,600–7,800 units/year), requires 400–500 sq.ft roof area. Best for monthly bills between ₹3,001 and ₹5,000.';
  }

  if (text.includes('document') || text.includes('paper') || text.includes('aadhaar') || text.includes('proof')) {
    return 'Documents required for Government Solar Scheme (PM Surya Ghar): 1) Aadhaar / PAN card, 2) Recent electricity bill with consumer number, 3) Property tax receipt or registry proof, 4) Bank passbook / cancelled cheque for subsidy DBT, 5) Rooftop photographs, 6) Passport size photos.';
  }

  if (text.includes('subsidy') || text.includes('surya ghar') || text.includes('pm') || text.includes('scheme')) {
    return 'Under PM Surya Ghar Muft Bijli Yojana, residential households can get central government subsidies up to ₹78,000 for rooftop solar installations. Maharudra Solar assists with complete portal registration and DISCOM net-metering.';
  }

  if (text.includes('install') || text.includes('process') || text.includes('step')) {
    return 'Our 7-step process: 1) Initial Contact, 2) Site Survey & Shade Analysis, 3) Solar Engineering Planning, 4) Quotation & Approvals, 5) Professional Installation, 6) Net-meter Testing & Setup, 7) Dedicated After-Sales Support.';
  }

  if (text.includes('cost') || text.includes('quote') || text.includes('price')) {
    return 'Our standard pricing: 3.10 kW System is ₹1,90,000 and 5 kW System is ₹2,90,000 (inclusive of MNRE panels, on-grid inverter, GI structure, cabling, ACDB/DCDB, lightning arrestor, earthing & Wi-Fi monitoring). Custom plans are quoted based on load.';
  }

  return 'I am Rudra AI from Maharudra Solar. I can assist you with system sizing (3 kW / 5 kW / Custom), government solar subsidies, required documentation, estimated generation, and booking a site survey!';
}

async function requestBotReply(userText: string): Promise<string> {
  const fallbackAnswer = buildSolarFallbackReply(userText);

  if (!isSolarQuestion(userText)) {
    return 'I can help with rooftop solar installation, system sizing (3 kW / 5 kW / Custom), PM Surya Ghar subsidy, required documents, savings estimates, and quotes for Maharudra Solar. Please ask a solar-related question.';
  }

  if (!OPENROUTER_API_KEY) {
    return fallbackAnswer;
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://maharudrasolar.com',
        'X-Title': 'Maharudra Solar Chat',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are Rudra AI, the solar assistant for Maharudra Solar Services (Maharashtra, India). Only answer questions relating to solar energy, rooftop solar systems, 3 kW (₹1,90,000, 6 panels, 330-390 units/mo) and 5 kW (₹2,90,000, 9-10 panels, 550-650 units/mo) plans, PM Surya Ghar subsidies, required documents (Aadhaar, electricity bill, property proof, bank cheque), installation process, and energy savings. Keep responses warm, professional, concise, and helpful. If a query is unrelated to solar, politely redirect to solar topics.',
          },
          { role: 'user', content: userText },
        ],
        temperature: 0.6,
      }),
    });

    if (!response.ok) {
      return fallbackAnswer;
    }

    const data = await response.json();
    const apiReply = data?.choices?.[0]?.message?.content?.trim();
    return apiReply || fallbackAnswer;
  } catch {
    return fallbackAnswer;
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => loadMessages());
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages]);

  const handleSend = useCallback(async (customText?: string) => {
    const trimmed = (customText ?? text).trim();
    if (!trimmed || loading) return;

    const userMessage: Msg = {
      id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      sender: 'user',
      text: trimmed,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setText('');
    setLoading(true);

    const delay = 600 + Math.floor(Math.random() * 400);

    try {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const reply = await requestBotReply(trimmed);
      const botMessage: Msg = {
        id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: 'bot',
        text: reply,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: Msg = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: 'I can help answer questions about 3 kW vs 5 kW solar systems, required scheme documents, or how to get a quote from Maharudra Solar.',
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [loading, text]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  function clearChat() {
    setMessages([INITIAL_WELCOME]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }

  return (
    <div>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-24 z-50">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open Rudra AI Solar Chat"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-solar-700 text-white shadow-xl transition hover:scale-105 hover:bg-solar-800"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      </div>

      {/* Floating Chat Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.18 }}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
        className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[94vw]"
      >
        <div className="overflow-hidden rounded-2xl border border-solar-100 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-solar-100 bg-solar-900 px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <MessageCircle className="h-5 w-5 text-solar-yellow" />
              </div>
              <div>
                <div className="text-sm font-bold">Rudra AI</div>
                <div className="text-xs text-solar-200">Maharudra Solar Assistant</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button title="Clear chat" onClick={clearChat} className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition">
                <Trash2 className="h-4 w-4" />
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-1.5 text-white/80 hover:bg-white/10 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={listRef} className="max-h-[340px] min-h-[220px] overflow-y-auto px-4 py-3 bg-[#fbfdfb]">
            {messages.map((m) => (
              <div key={m.id} className={`mb-3 flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`${
                    m.sender === 'user'
                      ? 'bg-solar-700 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-solar-100 shadow-sm rounded-bl-none'
                  } max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6`}
                >
                  {m.text}
                  {m.ts > 0 && (
                    <div className={`mt-1 text-[10px] ${m.sender === 'user' ? 'text-white/60' : 'text-slate-400'} text-right`}>
                      {new Date(m.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="bg-white border border-solar-100 rounded-2xl rounded-bl-none px-4 py-2.5 shadow-sm text-xs text-slate-500 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-solar-500 animate-pulse" />
                  Rudra AI is typing...
                </div>
              </div>
            )}

            {!loading && (
              <div className="mt-4 pt-2 border-t border-solar-100/60">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Suggested Questions</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => void handleSend(question)}
                      className="rounded-xl border border-solar-200 bg-white px-2.5 py-1 text-left text-[11px] font-medium text-solar-800 transition hover:bg-solar-50 shadow-2xs"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="border-t border-solar-100 bg-white px-3 py-3">
            <div className="flex gap-2">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about 3 kW, 5 kW, subsidies..."
                rows={1}
                className="h-10 w-full resize-none rounded-xl border border-solar-200 bg-solar-50 px-3 py-2 text-sm outline-none transition focus:border-solar-400 focus:bg-white focus:ring-2 focus:ring-solar-200"
              />
              <button
                onClick={() => void handleSend()}
                aria-label="Send message"
                disabled={loading || !text.trim()}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-solar-700 text-white transition hover:bg-solar-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
