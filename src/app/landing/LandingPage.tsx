'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import { Button } from "@/components/ui/button";
import LoginCard from '../components/global/LoginCard';
import TermsOfServiceModal from '../components/global/TermsOfServiceModal';

const FeatureCards = dynamic(() => import('./FeatureCards'), {
  ssr: true
});

const AccessMethods = dynamic(() => import('./AccessMethods'), {
  ssr: true
});

export default function LandingPage() {
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showLoginCard || showTermsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoginCard, showTermsModal]);

  const toggleLoginCard = () => {
    setShowLoginCard(!showLoginCard);
  };

  const closeLoginCard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setShowLoginCard(false);
  };

  const openTermsModal = () => {
    setShowTermsModal(true);
  };

  const closeTermsModal = () => {
    setShowTermsModal(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onLoginClick={toggleLoginCard} onTermsClick={openTermsModal} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-8 landing-hero">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Verify Brand Claims <span className="text-primary">in Seconds</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
            Don&apos;t Trust, Just Verify it!
          </h2>
          <p className="text-lg max-w-2xl text-muted-foreground">
            AI Powered Accuracy | Instant Analysis | Ethical Consumerism
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90" onClick={toggleLoginCard}>
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="mt-4 border-primary/20 hover:border-primary/40 text-primary hover:bg-primary/10" 
              onClick={openTermsModal}
            >
              Terms of Service
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="mt-4 border-primary/20 hover:border-primary/40 text-primary hover:bg-primary/10"
              asChild
            >
              <a href="/landing/APIDocs">API Documentation</a>
            </Button>
          </div>
        </div>

        {/* Feature Cards Section */}
        <FeatureCards />

        {/* Access Methods Section */}
        <AccessMethods />
      </main>
      
      <Footer onOpenTerms={openTermsModal} />

      {showLoginCard && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[99999] p-4 overflow-y-auto modal-container" 
          onClick={closeLoginCard}
        >
          <div className="my-auto">
            <LoginCard onClose={closeLoginCard} />
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 overflow-y-auto modal-container"
          onClick={closeTermsModal}
        >
          <TermsOfServiceModal onClose={closeTermsModal} />
        </div>
      )}
    </div>
  );
} 