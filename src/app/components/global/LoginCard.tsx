import React, { useEffect, useRef } from 'react';
import { SignIn } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

interface LoginCardProps {
  onClose: (e?: React.MouseEvent) => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const isPurpleMode = resolvedTheme === 'purple';

  // Get the appropriate Clerk theme based on the current theme
  const getClerkTheme = () => {
    if (isDarkMode) return dark;
    if (isPurpleMode) return shadesOfPurple;
    return undefined; // Default light theme
  };

  // Ensure the container is scrolled to the top when it mounts
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative bg-background rounded-lg max-w-md w-full overflow-y-auto max-h-[90vh] my-8 shadow-2xl z-[100000]"
      onClick={(e) => e.stopPropagation()}
    >
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-2 top-2 z-[100001] bg-background/80 backdrop-blur-sm hover:bg-background" 
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </Button>
      <SignIn 
        routing="hash"
        fallbackRedirectUrl="/Home"
        appearance={{
          baseTheme: getClerkTheme(),
          elements: {
            rootBox: "mx-auto z-[100000]",
            card: "shadow-xl border-border",
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground border-none",
            formFieldInput: "border-border focus:border-primary",
            formFieldInputShowPasswordButton: "border-none",
            socialButtonsBlockButton: "border-border",
            socialButtonsBlockButtonText: "text-foreground",
            footerActionLink: "text-primary hover:text-primary/80",
            identityPreviewEditButton: "text-primary hover:text-primary/80",
            formResendCodeLink: "text-primary hover:text-primary/80",
            userPreviewMainIdentifier: "text-foreground",
            userPreviewSecondaryIdentifier: "text-muted-foreground",
            userButtonPopoverCard: "border-border",
            userButtonPopoverActionButton: "hover:bg-secondary",
            userButtonPopoverActionButtonText: "text-foreground",
            userButtonPopoverActionButtonIcon: "text-muted-foreground",
            userButtonPopoverFooter: "border-border"
          }
        }}
      />
    </div>
  );
};

export default LoginCard; 