'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function ResultContent() {
  const params = useSearchParams();
  const [worthy, setWorthy] = useState<boolean | null>(null);

  useEffect(() => {
    const isWorthy = params.get('worthy') === 'true';
    setWorthy(isWorthy);
  }, [params]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-6">
      <div className="fixed inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none opacity-35">
        <Image
          src="/blacksun.png"
          alt="Spinning Black Sun"
          className="w-[90vmin] opacity-10 animate-spin-slow"
          width={1440}
          height={1440}
          priority
        />
      </div>
      <h1 className="text-4xl font-extrabold mb-6">
        {worthy === null ? 'Judging...' : worthy ? 'ACCESS GRANTED' : 'REJECTED'}
      </h1>

      <div className="text-center max-w-xl">
        {worthy === null ? (
          <p className="text-gray-400">Peering into your soul...</p>
        ) : worthy ? (
          <>
            <p className="text-green-400 text-lg mb-4">
              Your face radiates with ancient Aryan Agarthan essence. The gate opens for you...
            </p>
            <p className="italic">&quot;Vril has accepted you, billions must drink raw milk.&quot;</p>
            <div className="mt-6">
              <Image
                src="/nordic-alien.png"
                alt="vril"
                className="rounded-2xl shadow-lg w-[200px] h-auto mx-auto"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
                width={200}
                height={200}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-red-400 text-lg mb-4">
              You lack the divine Aryan symmetry required to enter. The Vril reject you.
            </p>
            <p className="italic">&quot;Agartha ain&apos;t ur place bud, go back to Thugland.&quot;</p>
            <div className="mt-6">
              <Image
                src="/yakub.png"
                alt="vril"
                className="rounded-2xl shadow-lg w-[200px] h-auto mx-auto"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
                width={200}
                height={200}
              />
            </div>
          </>
        )}
      </div>

      <Link href="/scan">
        <button className="mt-8 bg-purple-700 hover:bg-purple-800 px-5 py-3 rounded-xl text-white font-semibold shadow-lg transition-all">
          Retry Judgment
        </button>
      </Link>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}