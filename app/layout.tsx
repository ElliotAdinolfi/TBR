import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import SearchBar from '@/components/home/searchBar';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';

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
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

const Navbar = () => {
  return (
    <div className="w-screen h-12 flex bg-orange-300 shadow-lg lg:px-16">
      <div className="flex w-1/2 p-2 text-2xl font-bold">
        <Link href="/">
          <h1>TBR</h1>
        </Link>
      </div>
      <div className="w-1/3">
        <SearchBar />
      </div>
      <div className="flex w-1/2 p-2 justify-end">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </div>
  );
};
