import { Inter } from 'next/font/google';
import { type ReactNode, Suspense } from 'react';
import Navbar from 'components/layout/navbar';
import './globals.css';
import AppProvider from 'components/providers/app/AppProvider';

const {
  TWITTER_CREATOR = '',
  TWITTER_SITE = '',
  SITE_NAME = 'NextJs Commerce',
} = process.env;

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(TWITTER_CREATOR &&
    TWITTER_SITE && {
      twitter: {
        card: 'summary_large_image',
        creator: TWITTER_CREATOR,
        site: TWITTER_SITE,
      },
    }),
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AppProvider>
      <html lang="en" className={inter.variable}>
        <body className="bg-white text-black selection:bg-teal-300 dark:bg-black dark:text-white dark:selection:bg-fuchsia-600 dark:selection:text-white">
          <Navbar />
          <Suspense>
            <main>{children}</main>
          </Suspense>
        </body>
      </html>
    </AppProvider>
  );
}
