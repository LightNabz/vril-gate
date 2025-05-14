// src/app/page.tsx

'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="fixed inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-35">
      <img
        src="/blacksun.png"
        alt="Spinning Black Sun"
        className="w-[90vmin] opacity-10 animate-spin-slow"
      />
      </div>
      <h1 className="text-5xl font-extrabold text-center glow mb-4">VRIL GATE</h1>
      <p className="text-center max-w-xl mb-8 text-lg">
        Dare to enter the Hollow Earth? Let your face decide. The ancient Vril awaits... if you're worthy.
      </p>
      <Link href="/scan">
        <button className="bg-purple-700 hover:bg-purple-800 transition-colors px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg">
          Begin the Ascension
        </button>
      </Link>
    </main>
  );
}
