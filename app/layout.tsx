import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TBR - To Be Read',
  description:
    'TBR, or To Be Read, is a website for book lovers to keep track of their reading lists, as well as share their thoughts on books they have read. TBR is a place for book lovers to connect with each other and share their love of reading.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
