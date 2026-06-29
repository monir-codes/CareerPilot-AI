"use client";
import { ScrollReveal } from '@/components/ScrollReveal';
import { UserPlus, Target, Zap, TrendingUp } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    { icon: UserPlus, title: 'Create an Profile', desc: 'Sign up and share your current experience, skills, and goals.' },
    { icon: Target, title: 'Discover Roles', desc: 'Our AI analyzes your profile and suggests the best-fitting careers.' },
    { icon: Zap, title: 'Prepare & Train', desc: 'Use our AI mock interviews and ATS resume analyzer to get ready.' },
    { icon: TrendingUp, title: 'Land the Job', desc: 'Apply with confidence and track your progress all in one place.' },
  ];

  return (
    <section className="py-24 bg-background border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How CareerPilot Works</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Your journey from uncertainty to a signed offer letter, powered by AI.</p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-all duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
