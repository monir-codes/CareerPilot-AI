"use client";
import { motion } from 'framer-motion';
import { Bot, FileText, Target, Video } from 'lucide-react';

const features = [
  { title: 'AI Resume Analysis', desc: 'Get instant ATS scoring and actionable feedback.', icon: <FileText className="w-6 h-6 text-indigo-500" /> },
  { title: 'Mock Interviews', desc: 'Practice with a voice-enabled AI recruiter.', icon: <Video className="w-6 h-6 text-cyan-500" /> },
  { title: 'Career Path Mapping', desc: 'Discover stepping stones to your dream role.', icon: <Target className="w-6 h-6 text-emerald-500" /> },
  { title: '24/7 AI Mentor', desc: 'Ask anything, anytime, about your career trajectory.', icon: <Bot className="w-6 h-6 text-purple-500" /> },
];

export const AIFeatures = () => {
  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Supercharge Your Growth</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Everything you need to land your next big role, powered by state-of-the-art AI.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:shadow-xl transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center mb-6 shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-slate-500 dark:text-slate-400">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
