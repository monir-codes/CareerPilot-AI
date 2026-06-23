import { Target, Users, Zap, Shield, Globe, Award } from 'lucide-react';

export const metadata = { title: 'About Us | CareerPilot AI' };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 dark:bg-black py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent dark:from-black dark:via-black/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold text-sm mb-8">
            <Globe className="w-4 h-4" /> Democritizing Career Growth
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Career Mentorship</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We built CareerPilot AI because traditional career coaching is expensive, inaccessible, and often outdated. We believe everyone deserves world-class guidance.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          <div className="py-4 md:py-0">
            <div className="text-4xl md:text-5xl font-black text-primary mb-2">100k+</div>
            <div className="text-slate-500 font-medium">Resumes Analyzed</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl md:text-5xl font-black text-emerald-500 mb-2">5M+</div>
            <div className="text-slate-500 font-medium">AI Tokens Processed</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl md:text-5xl font-black text-cyan-500 mb-2">98%</div>
            <div className="text-slate-500 font-medium">Interview Success Rate</div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Core Values</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">We are driven by a simple philosophy: technology should empower humans, not replace them.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Target, title: 'Data-Driven Accuracy', desc: 'We train our models on millions of successful career trajectories to give you precise, actionable advice.', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
            { icon: Zap, title: 'Instant Accessibility', desc: 'No more waiting weeks for an appointment. Your AI mentor is available 24/7, ready to help you pivot.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
            { icon: Shield, title: 'Privacy First', desc: 'Your career data is sensitive. We employ enterprise-grade encryption to ensure your information stays yours.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
            { icon: Users, title: 'Built for Everyone', desc: 'Whether you are a college student or a seasoned executive, our tools adapt to your specific experience level.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
            { icon: Globe, title: 'Global Reach', desc: 'We understand international job markets, ATS systems, and diverse corporate cultures across the globe.', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
            { icon: Award, title: 'Continuous Evolution', desc: 'The job market changes daily. Our AI constantly learns new frameworks, tools, and hiring trends.', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
          ].map((val, i) => (
            <div key={i} className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#09090b] hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${val.bg} ${val.color}`}>
                <val.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{val.title}</h3>
              <p className="text-slate-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
