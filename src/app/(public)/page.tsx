import { Hero } from '@/features/marketing/components/Hero';
import { TrustedCompanies } from '@/features/marketing/components/TrustedCompanies';
import { AIFeatures } from '@/features/marketing/components/AIFeatures';
import { FeaturedCareerPaths } from '@/features/marketing/components/FeaturedCareerPaths';
import { Statistics } from '@/features/marketing/components/Statistics';
import { HowItWorks } from '@/features/marketing/components/HowItWorks';
import { Testimonials } from '@/features/marketing/components/Testimonials';
import { FAQ } from '@/features/marketing/components/FAQ';
import { Newsletter } from '@/features/marketing/components/Newsletter';
import { CTA } from '@/features/marketing/components/CTA';

export const metadata = {
  title: 'CareerPilot AI | Your Personal Career Mentor',
  description: 'AI-driven career advice, resume analysis, and interview prep.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <AIFeatures />
      <FeaturedCareerPaths />
      <Statistics />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CTA />
    </>
  );
}
