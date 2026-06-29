"use client";
import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Loader2, Plus, MessageSquare, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = { _id?: string; role: 'user' | 'ai'; content: string };
type Session = { _id: string; title: string; updatedAt: string };

export default function AIChatPage() {
  const { getToken, userId } = useAuth();
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  const getAuthHeaders = async () => {
    const headers: any = {};
    try {
      const token = await getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    } catch (e) {}
    if (userId) headers['x-test-user-id'] = userId;
    return headers;
  };

  const fetchSessions = async () => {
    try {
      const headers = await getAuthHeaders();
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai/chat/sessions', { headers });
      const data = await res.json();
      if (data.success) setSessions(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSession = async (id: string) => {
    setIsLoading(true);
    setCurrentSessionId(id);
    setIsSidebarOpen(false);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/ai/chat/sessions/${id}`, { headers });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const createNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const headers = await getAuthHeaders();
      headers['Content-Type'] = 'application/json';

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') + '/api/v1/ai/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: input,
          sessionId: currentSessionId
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        const finalMessages = [...newMessages, { role: 'ai' as const, content: data.data.text }];
        setMessages(finalMessages);
        
        if (!currentSessionId) {
          setCurrentSessionId(data.data.sessionId);
          fetchSessions(); // refresh sidebar
        }
      } else {
        throw new Error(data.message || 'Failed to get response');
      }
    } catch (err: any) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { role: 'ai', content: `Sorry, an error occurred: ${err.message || 'Unknown error'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white dark:bg-[#09090b] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden absolute inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`absolute md:relative z-50 h-full w-72 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
           <button onClick={createNewChat} className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-primary-hover transition">
              <Plus className="w-4 h-4" /> New Chat
           </button>
           <button className="md:hidden ml-2 p-2" onClick={() => setIsSidebarOpen(false)}>
             <X className="w-5 h-5 text-slate-500" />
           </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Recent Chats</p>
          {sessions.map(s => (
            <button 
              key={s._id}
              onClick={() => loadSession(s._id)}
              className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${currentSessionId === s._id ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate text-sm">{s.title}</span>
            </button>
          ))}
          {sessions.length === 0 && <p className="text-xs text-slate-400 px-2">No history yet.</p>}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-white dark:bg-[#09090b]">
           <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
             <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
           </button>
           <span className="font-bold">AI Mentor</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {messages.length === 0 && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center">
                 <Bot className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">CareerPilot Assistant</h2>
              <p className="text-slate-500">I can analyze resumes, draft cover letters, simulate interviews, and build career roadmaps. How can I help you today?</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                    <div className={`px-6 py-4 rounded-2xl max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-900 rounded-tl-none text-slate-800 dark:text-slate-200 shadow-sm'}`}>
                      {msg.role === 'user' ? (
                        <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
                      ) : (
                        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:my-5 prose-headings:mt-8 prose-headings:mb-4 prose-li:my-2 prose-pre:bg-slate-800 prose-pre:text-slate-100">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Bot className="w-5 h-5 text-slate-500" />
              </div>
              <div className="px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900 rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                <span className="text-slate-500 font-medium text-sm">Pilot is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#09090b]">
          <form onSubmit={sendMessage} className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-primary outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="px-5 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
