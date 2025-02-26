'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '../global/Header';

const FeatureCards = dynamic(() => import('./FeatureCards'), {
  ssr: true
});

export default function LandingPage() {
  return (
    <div className="outlet">
      <Header />
      {/* Hero Section */}
      <div className="flexCol min-h-[85vh] px-4 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-transparent bg-clip-text bg-300% animate-gradient text-center">
          Verify Brand Claims in Seconds
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-transparent bg-clip-text bg-300% animate-gradient text-center">
          Don&apos;t Trust, Just Verify it!
        </h2>
        <p className="text-lg mb-8 text-gray-700 text-center">
          AI Powered Accuracy | Instant Analysis | Ethical Consumerism
        </p>
        <Link 
          href="/login"
          className="button"
        >
          Get Started
        </Link>
      </div>

      {/* Feature Cards Section */}
      <FeatureCards />
    </div>
  );
} 