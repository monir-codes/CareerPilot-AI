"use client";
import { ScrollReveal } from '@/components/ScrollReveal';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: 'How does the ATS Resume Analyzer work?', a: 'Our analyzer uses advanced natural language processing to parse your resume exactly like enterprise ATS software. It compares your content against standard job descriptions to give you a match score and actionable feedback.' },
    { q: 'Is CareerPilot completely free?', a: 'We offer a generous free tier that includes basic resume analysis and limited chatbot interactions. For unlimited mock interviews and advanced roadmaps, we offer a Premium subscription.' },
    { q: 'Which industries does the AI support?', a: 'Our AI is trained on millions of job postings across all major industries including Tech, Finance, Healthcare, Marketing, and Engineering.' },
    { q: 'Can I use this to transition to a new career?', a: 'Absolutely! Our Career Roadmaps feature is specifically designed to help you identify knowledge gaps and provide a step-by-step learning plan to transition into a new field.' },
  ];

  return (
    <section className="py-24 bg-background border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Everything you need to know about CareerPilot.</p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div 
                className={clsx(
                  "border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300",
                  openIdx === idx ? "bg-slate-50 dark:bg-slate-900/30" : "bg-white dark:bg-[#09090b]"
                )}
              >
                <button 
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{faq.q}</h3>
                  <ChevronDown className={clsx("w-5 h-5 text-slate-500 transition-transform duration-300", openIdx === idx && "rotate-180")} />
                </button>
                <div 
                  className={clsx(
                    "overflow-hidden transition-all duration-300 px-6",
                    openIdx === idx ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
