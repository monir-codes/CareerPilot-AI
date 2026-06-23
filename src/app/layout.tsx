import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import { QueryProvider } from '@/core/providers/QueryProvider';
import { PageTransition } from '@/components/PageTransition';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerPilot AI | Your AI Career Mentor',
  description: 'AI-Powered Career Mentor Platform. Generate resumes, cover letters, and master interviews.',
  icons: {
    icon: '/favicon.ico',
  }
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased min-h-screen flex flex-col">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryProvider>
              <PageTransition>
                {children}
                <Toaster position="top-center" />
              </PageTransition>
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
