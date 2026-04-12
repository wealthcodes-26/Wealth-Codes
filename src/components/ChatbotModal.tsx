import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal = ({ isOpen, onClose }: ChatbotModalProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello! I'm your WealthCodes AI assistant. How can I help you with your mutual fund investments today? You can ask me about SIPs, Index Funds, or different types of market cap funds!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

   try {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();

  const botResponse =
    data.reply || "No response from AI";

  setMessages(prev => [
    ...prev,
    { role: "bot", content: botResponse }
  ]);

     
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [...prev, { role: 'bot', content: "I'm having a bit of trouble connecting right now. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[600px]"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-600 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold leading-tight text-base sm:text-lg">WealthCodes AI</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-[10px] text-emerald-100 uppercase tracking-wider font-semibold">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-zinc-50/50 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={cn(
                    "flex gap-3 max-w-[90%] sm:max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-zinc-200" : "bg-emerald-100"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-zinc-600" /> : <Bot className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div className={cn(
                    "p-3 sm:p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-100" 
                      : "bg-white border border-zinc-100 text-zinc-700 shadow-sm rounded-tl-none"
                  )}>
                    <div className="markdown-body prose prose-sm max-w-none">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="p-3 sm:p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                    <span className="text-xs text-zinc-400 font-medium">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6 bg-white border-t border-zinc-100 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about SIP, Index Funds..."
                  className="w-full bg-zinc-100 border-none rounded-2xl py-3.5 sm:py-4 pl-5 sm:pl-6 pr-14 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-zinc-900"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-zinc-400">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Powered by WealthCodes AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotModal;
