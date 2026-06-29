"use client";
import { ScrollReveal } from '@/components/ScrollReveal';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Testimonials = () => {
  const testimonials = [
    { name: 'Sarah Jenkins', role: 'Software Engineer at TechCorp', text: 'CareerPilot completely transformed my job search. The ATS resume analyzer pointed out flaws I never would have noticed, and I landed 3 offers within a month!', image: 'https://i.pravatar.cc/150?img=1' },
    { name: 'David Lee', role: 'Product Manager', text: 'The mock interviews are insanely realistic. I used to get so nervous, but practicing with the AI helped me refine my STAR method answers perfectly.', image: 'https://i.pravatar.cc/150?img=11' },
    { name: 'Maria Garcia', role: 'Data Scientist', text: 'I was transitioning from academia to industry and had no idea where to start. The AI Roadmap gave me a week-by-week plan that was incredibly easy to follow.', image: 'https://i.pravatar.cc/150?img=5' },
  ];

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Job Seekers</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Don&apos;t just take our word for it. See how we&apos;re helping professionals worldwide.</p>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative flex w-full">
        <motion.div 
          className="flex gap-8 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {marqueeItems.map((t, idx) => (
            <div key={idx} className="w-[350px] md:w-[450px] shrink-0 bg-white dark:bg-[#09090b] p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <p className="text-slate-600 dark:text-slate-400 italic mb-8 flex-1 text-lg leading-relaxed">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-4">
                <Image src={t.image} alt={t.name} width={56} height={56} className="rounded-full ring-2 ring-indigo-500/20" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-slate-50 dark:from-[#09090b]/80 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-slate-50 dark:from-[#09090b]/80 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};
