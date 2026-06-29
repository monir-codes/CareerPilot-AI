import { ArrowRight, Sparkles, Target, Zap, CheckCircle2, FileText, Compass, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import Link from 'next/link';
import { TrendingCareers } from '@/components/TrendingCareers';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 lg:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1000px] h-[400px] md:h-[500px] opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-[80px] md:blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-background to-background dark:from-indigo-950/20 dark:via-background dark:to-background -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mt-8 md:mt-0">
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-bold mb-6 md:mb-8 shadow-sm hover:shadow-md transition-shadow">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-500" /> Powered by Gemini 1.5 Pro
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-6 md:mb-8 text-slate-900 dark:text-white leading-[1.15] md:leading-[1.1]">
              Elevate your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-sm">career trajectory.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl lg:max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Stop guessing what hiring managers want. Get instant ATS resume analysis, dynamic learning roadmaps, and AI-powered mock interviews tailored to your exact profile.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2 sm:px-0 w-full">
              <Button href="/sign-up" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 group text-base md:text-lg px-6 py-5 md:px-8 md:py-6 rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
                Start Free Trial <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button href="/explore" variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center text-base md:text-lg px-6 py-5 md:px-8 md:py-6 rounded-2xl border-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                Explore Careers
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-10 md:py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center md:divide-x md:divide-slate-200 md:dark:divide-slate-800">
              {[
                { value: '45,000+', label: 'Resumes Analyzed' },
                { value: '1.2M', label: 'Tokens Processed' },
                { value: '98%', label: 'Interview Success' },
                { value: '12,000+', label: 'Active Users' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">{stat.value}</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TrendingCareers />
      <HowItWorks />

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">A complete suite of AI tools.</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">Everything you need to plan, prepare, and land your dream role.</p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { href: '/dashboard/resume', icon: Target, title: 'ATS Resume Analyzer', desc: 'Instantly extract text, score against ATS algorithms, and provide bullet rewrites.', items: ['0-100 Scoring', 'Grammar Checks', 'Skill Detection'] },
              { href: '/dashboard/roadmaps', icon: Compass, title: 'Dynamic Roadmaps', desc: 'Generate a customized weekly timeline bridging your knowledge gap.', items: ['Weekly Goals', 'Resources', 'Projects'] },
              { href: '/dashboard/interviews', icon: Users, title: 'AI Mock Interviews', desc: 'Engage in a dynamic Q&A session where the AI evaluates your technical responses.', items: ['Question Banks', 'Real-time Scoring', 'Tone Feedback'] },
              { href: '/dashboard/ai-chat', icon: FileText, title: 'Cover Letter Gen', desc: 'Generate a highly targeted, professionally toned cover letter instantly.', items: ['Tone Customization', 'Company Targeting', 'PDF Export'] },
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Link href={feature.href} className="group relative h-full flex flex-col p-8 md:p-12 rounded-3xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] overflow-hidden cursor-pointer block">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <feature.icon className="w-10 h-10 text-primary mb-6 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed flex-1">{feature.desc}</p>
                  <ul className="space-y-3 shrink-0">
                    {feature.items.map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover:text-emerald-400 transition-colors"/> {item}</li>
                    ))}
                  </ul>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-800 opacity-90" />
        <ScrollReveal>
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to pilot your career?</h2>
            <p className="text-xl text-white/80 mb-10">Join 12,000+ users who are leveraging AI to land better jobs, faster.</p>
            <Button href="/sign-up" variant="secondary" size="lg" className="text-indigo-900 hover:bg-slate-50">
              Create your free account
            </Button>
            <p className="text-sm text-white/60 mt-6">No credit card required. 14-day free trial on Pro features.</p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
