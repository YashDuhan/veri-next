'use client';

import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import TermsOfServiceModal from './TermsOfServiceModal';

interface FooterProps {
  onOpenTerms?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenTerms }) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleTermsClick = () => {
    if (onOpenTerms) {
      onOpenTerms();
    } else {
      setShowTermsModal(true);
    }
  };

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8">
      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/ai.png" alt="logo" width={32} height={32} />
              <span className="font-semibold text-lg">VeriTrust</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              VeriTrust uses AI to verify brand claims and analyze ingredients to determine if they are suitable for users. 
              Our objective is not to harm any brand&apos;s image, but to provide transparency. 
              Please note that AI-based verifications may not always be 100% accurate.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Disclaimer</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              VeriTrust only analyzes claims and ingredients to check their suitability for users. 
              We do not make judgments about brands or their products beyond this analysis. 
              Users should always consult official sources and professionals for critical decisions.
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} VeriTrust. All rights reserved.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={handleTermsClick}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal*/}
      {!onOpenTerms && showTermsModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowTermsModal(false)}
        >
          <TermsOfServiceModal onClose={() => setShowTermsModal(false)} />
        </div>
      )}
    </footer>
  );
};

export default Footer; 