import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

import SearchBar from '@/components/home/searchBar';

export default async function Home() {
  const user = await currentUser();
  return (
    <div>
      <div className="flex flex-col items-center min-h-screen py-8"></div>
    </div>
  );
}
