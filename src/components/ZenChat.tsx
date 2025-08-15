import React, { useState, useRef, useEffect } from 'react';
import { Mic, Smile, Send, Volume2, CheckCircle, User, Bot } from 'lucide-react';

const positiveAffirmations = [
  "You are stronger than you think.",
  "Every emotion is valid. You are not alone.",
  "Peace begins with a single breath.",
  "You are worthy of love and happiness.",
  "This too shall pass. Brighter days are ahead!"
];

const botReplies = [
  "Thank you for sharing. I'm here to listen and support you.",
  "That sounds tough. Remember, it's okay to feel this way.",
  "Let's take a deep breath together. You're doing great.",
  "Would you like a calming exercise or a positive affirmation?",
  "I'm always here for you. Would you like to talk more about it?"
];


const distressPhrases = [
  "i'm upset", "i'm distressed", "i'm overwhelmed", "i want to die", "i'm suicidal"
];
const unrelatedTopics = ["politics", "technology", "finance", "medical"];

const determineResponse = (message: string) => {
  for (const topic of unrelatedTopics) {
    if (message.toLowerCase().includes(topic)) {
      return `As ZenChat, I focus on emotional well-being and inner peace. Let me know if I can support you on your personal journey.`;
    }
  }
  for (const phrase of distressPhrases) {
    if (message.toLowerCase().includes(phrase)) {
      return `I hear your pain and I'm here to support you. However, I strongly encourage you to reach out to mental health professionals who can provide the help you need. Please contact a mental health helpline or counselor immediately. You are not alone in this journey.`;
    }
  }
  return null;
};

const ZenChat = () => {
  const [input, setInput] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chat, setChat] = useState([
    { sender: 'bot', text: "Hi, I'm ZenChat. How are you feeling today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const chatId = useRef<string>(crypto.randomUUID());

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat]);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  // Simulate audio recording (for demo)
  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setAudioFile(new File(["dummy audio"], "emotion.wav"));
      handleSend("[Audio message]");
    }, 3000);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
      handleSend("[Audio message]");
    }
  };

  // DivineChat WebSocket logic
  const connectWebSocket = (message: string) => {
    // Mental health check
    const predefinedResponse = determineResponse(message);
    if (predefinedResponse) {
      setChat((prev) => [...prev, { sender: 'bot', text: predefinedResponse }]);
      setLoading(false);
      return;
    }

    // Close previous connection
    if (websocketRef.current) {
      websocketRef.current.close();
    }

    const url = "wss://backend.buildpicoapps.com/api/chatbot/chat";
    websocketRef.current = new WebSocket(url);
    setLoading(true);

    websocketRef.current.addEventListener("open", () => {
      websocketRef.current?.send(
        JSON.stringify({
          chatId: chatId.current,
          appId: "quality-among",
          systemPrompt: "You are ZenChat, a compassionate emotional wellness guide. Respond with empathy, mindfulness, and supportive advice. Avoid medical, financial, or political topics.",
          message: message,
        })
      );
    });

    websocketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'error') {
          setLoading(false);
          setChat((prev) => [...prev, { sender: 'bot', text: "I'm having trouble connecting right now. Please try again later." }]);
          return;
        }
        if (data.message || data.content) {
          setLoading(false);
          setChat((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.sender === 'bot') {
              return [...prev.slice(0, -1), { ...last, text: last.text + " " + (data.message || data.content) }];
            } else {
              return [...prev, { sender: 'bot', text: data.message || data.content }];
            }
          });
        }
      } catch (e) {
        if (event.data !== '[DONE]') {
          setLoading(false);
          setChat((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.sender === 'bot') {
              return [...prev.slice(0, -1), { ...last, text: last.text + " " + event.data }];
            } else {
              return [...prev, { sender: 'bot', text: event.data }];
            }
          });
        }
      }
    };

    websocketRef.current.onerror = () => {
      setLoading(false);
      setChat((prev) => [...prev, { sender: 'bot', text: "I'm having trouble connecting right now. Please try again later." }]);
    };

    websocketRef.current.onclose = (event) => {
      setLoading(false);
      if (event.code !== 1000) {
        setChat((prev) => [...prev, { sender: 'bot', text: "The connection was interrupted. Please try again." }]);
      }
    };
  };

  const handleSend = (message?: string) => {
    const userMessage = message || input.trim();
    if (!userMessage) return;
    setChat((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput("");
    setAudioFile(null);
    setLoading(true);
    connectWebSocket(userMessage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  // Handle Enter to send, Shift+Enter for newline
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Sanitize bot response to avoid extra spaces and join split name fragments if user's last message was a single word (name)
  const sanitizeText = (text: string) => {
    let cleaned = text.replace(/\s{2,}/g, ' ').trim();
    // Try to join split name fragments if user's last message was a single word
    const lastUserMsg = [...chat].reverse().find(m => m.sender === 'user');
    if (lastUserMsg && lastUserMsg.text && lastUserMsg.text.trim().split(/\s+/).length === 1) {
      const name = lastUserMsg.text.trim();
      if (name.length > 2) {
        // Build a regex that matches the name split into any number of spaces, any case, and any grouping
        // e.g., for "yeswanth" match "Y E S W A N T H", "Yes Wan th", "Y e s w a n t h", etc.
        // This regex will match the name's letters in order, with any number of spaces between them, case-insensitive
        const pattern = name.split('').map(c => `[${c.toLowerCase()}${c.toUpperCase()}] *`).join('');
        const regex = new RegExp(pattern, 'gi');
        cleaned = cleaned.replace(regex, name);
      }
    }
    return cleaned;
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-200 via-white to-purple-200 px-4 py-12 pt-24 relative overflow-hidden">
      {/* Animated floating shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute animate-float-slow left-10 top-10 w-32 h-32 bg-gradient-to-br from-teal-300 to-purple-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute animate-float-medium right-20 top-32 w-24 h-24 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-20 blur-2xl" />
        <div className="absolute animate-float-fast left-1/2 bottom-10 w-40 h-40 bg-gradient-to-br from-purple-200 to-teal-100 rounded-full opacity-20 blur-2xl" />
      </div>
      <div className="w-full max-w-8xl bg-white/80 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col items-center relative overflow-hidden h-[90vh] min-h-[700px] border border-teal-100 z-10 backdrop-blur-xl">
        {/* Header */}
        <div className="w-full flex flex-col items-center py-4 px-2 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-purple-50/80 shadow-sm relative">
          <Smile className="h-16 w-16 text-teal-500 mb-2 animate-bounce-slow drop-shadow-xl -mt-6" />
          <h1 className="text-4xl font-extrabold text-gray-900 mb-1 text-center tracking-tight drop-shadow">ZenChat</h1>
          <p className="text-lg text-gray-600 mb-2 text-center max-w-lg font-medium">Your safe space to share, reflect, and feel better. Type or record your feelings below.</p>
        </div>
        {/* Chat window */}
        <div className="flex-1 w-full overflow-y-auto px-4 py-6 bg-white/70 rounded-xl mb-2 shadow-inner transition-all duration-300" style={{ minHeight: 0, maxHeight: '75vh' }}>
          {chat.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 transition-all duration-300`}>
              <div className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-lg text-base whitespace-pre-line transition-all duration-300 ${msg.sender === 'user' ? 'bg-gradient-to-r from-teal-400 to-purple-400 text-white border-2 border-teal-200' : 'bg-gradient-to-r from-teal-50 to-purple-50 text-gray-900 border-2 border-teal-100'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5 text-teal-600 animate-bounce-slow" />}
                  <span className="font-semibold text-xs tracking-wide">{msg.sender === 'user' ? 'You' : 'ZenBot'}</span>
                </div>
                {sanitizeText(msg.text)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-2">
              <div className="max-w-[75%] px-5 py-4 rounded-3xl shadow-lg text-base bg-gradient-to-r from-teal-50 to-purple-50 text-gray-900 animate-pulse border-2 border-teal-100">
                ZenBot is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        {/* Input area */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row items-center gap-2 px-4 pb-8 bg-gradient-to-t from-white/80 to-transparent">
          <textarea
            className="flex-1 rounded-xl border-2 border-teal-200 p-4 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none bg-white/90 shadow-md font-medium text-gray-800 placeholder:text-teal-400"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            disabled={isRecording || loading}
            required={!audioFile}
            rows={1}
            style={{ minHeight: 48 }}
          />
          <div className="flex flex-col gap-1 items-center md:flex-row md:gap-2">
            <button
              type="button"
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition shadow-lg ${isRecording ? 'bg-teal-400 text-white' : 'bg-gradient-to-r from-teal-500 to-purple-500 text-white hover:from-teal-600 hover:to-purple-600'}`}
              onClick={handleRecord}
              disabled={isRecording || loading}
            >
              <Mic className="h-5 w-5" />
              {isRecording ? 'Recording...' : 'Record'}
            </button>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              id="audio-upload"
              onChange={handleAudioUpload}
              disabled={isRecording || loading}
            />
            <label htmlFor="audio-upload" className="cursor-pointer text-teal-600 hover:underline text-sm mt-1 md:mt-0 font-semibold">Upload Audio</label>
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-purple-500 text-white px-7 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:from-teal-600 hover:to-purple-600 transition text-lg"
              disabled={isRecording || loading || (!input && !audioFile)}
            >
              <Send className="h-5 w-5" />
              Send
            </button>
          </div>
        </form>
      </div>
      {/* Custom Animations */}
      <style>{`
        @keyframes float-slow { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }
        @keyframes float-medium { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
        @keyframes float-fast { 0% { transform: translateY(0); } 50% { transform: translateY(-50px); } 100% { transform: translateY(0); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 2.5s infinite; }
      `}</style>
    </section>
  );
};

export default ZenChat; 