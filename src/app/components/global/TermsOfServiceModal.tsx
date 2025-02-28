'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsOfServiceModalProps {
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ onClose }) => {
  // Prevent scrolling of the body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden relative z-[100000]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold">Terms of Service</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="h-[70vh]">
        <div className="p-6">
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">1. Service Description</h3>
            <p className="text-muted-foreground mb-4">
              VeriTrust provides a platform that uses artificial intelligence to analyze brand claims and product ingredients. 
              Our service aims to provide users with information about whether products may be suitable for their specific needs.
            </p>
          </section>
          
          <Separator className="my-4" />
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">2. AI Verification Disclaimer</h3>
            <p className="text-muted-foreground mb-4">
              The verification and analysis provided by VeriTrust is powered by artificial intelligence and may not always be 
              100% accurate. Our AI systems are continuously learning and improving, but users should be aware of potential 
              limitations in the analysis provided.
            </p>
          </section>
          
          <Separator className="my-4" />
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">3. Brand Neutrality</h3>
            <p className="text-muted-foreground mb-4">
              VeriTrust does not aim to harm any brand&apos;s image or reputation. Our objective is to provide transparent 
              information about products based on available data. We do not make judgments about brands or their products, 
              but rather present analysis based on factual information.
            </p>
          </section>
          
          <Separator className="my-4" />
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">4. Scope of Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Our service analyzes claims and ingredients to determine if they are suitable for users based on general 
              information and research. This analysis is not a substitute for professional advice, and users should consult 
              with appropriate professionals for specific concerns.
            </p>
          </section>
          
          <Separator className="my-4" />
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">5. User Responsibility</h3>
            <p className="text-muted-foreground mb-4">
              Users are responsible for making their own decisions based on the information provided by VeriTrust. 
              For critical decisions, users should always consult official sources, product labels, and seek professional advice.
            </p>
          </section>
          
          <Separator className="my-4" />
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">6. Limitation of Liability</h3>
            <p className="text-muted-foreground mb-4">
              VeriTrust is not liable for any decisions made by users based on the information provided through our service. 
              We do not guarantee the accuracy, completeness, or usefulness of any information provided, and users utilize 
              our service at their own risk.
            </p>
          </section>
          
          <Separator className="my-4" />
          
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">7. Updates to Terms</h3>
            <p className="text-muted-foreground mb-4">
              VeriTrust reserves the right to update these Terms of Service at any time. Users will be notified of significant 
              changes to these terms, and continued use of the service after such changes constitutes acceptance of the updated terms.
            </p>
          </section>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t flex justify-end">
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default TermsOfServiceModal; 