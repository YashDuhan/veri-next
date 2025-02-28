"use client";
import { useState } from "react";
import { useUser, UserButton } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useTheme } from 'next-themes';

interface HeaderProps {
  onLoginClick?: () => void;
  onTermsClick?: () => void;
}

function Header({ onLoginClick, onTermsClick }: HeaderProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const isPurpleMode = resolvedTheme === 'purple';

  // Update Clerk theme based on the current theme
  const getClerkTheme = () => {
    if (isDarkMode) return dark;
    if (isPurpleMode) return shadesOfPurple;
    return undefined; // Default light theme
  };

  // Logic to set active link
  const [activeLink, setActiveLink] = useState<string>("Home");
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavClick = (link: string, path: string, requiresAuth: boolean = true) => {
    // Special case for Terms of Service
    if (link === "Terms" && onTermsClick) {
      onTermsClick();
      return;
    }
    
    setActiveLink(link);
    
    if (requiresAuth && !isSignedIn) {
      // Show toast for non-logged in users
      toast.error("Authentication Required", {
        description: "You need to sign in to access this feature.",
        action: {
          label: "Sign In",
          onClick: () => onLoginClick ? onLoginClick() : null,
        },
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
        duration: 1000, // 1 seconds timeout
      });
    } else {
      // Prevent multiple clicks
      if (isNavigating) return;
      
      setIsNavigating(true);
      
      // Show loading toast
      const toastId = toast.loading("Navigating to page...", {
        duration: 2500, // 2.5 seconds timeout
      });
      
      // Navigate after a short delay
      setTimeout(() => {
        toast.dismiss(toastId);
        router.push(path);
        setIsNavigating(false);
      }, 2500); // 2.5 seconds timeout
    }
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image src="/images/ai.png" alt="logo" width={40} height={40} />
          <span className="font-semibold text-lg hidden md:inline-block">VeriTrust</span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            className={`text-sm font-medium transition-colors hover:text-primary ${activeLink === "Home" ? "text-primary" : "text-muted-foreground"}`} 
            onClick={() => handleNavClick("Home", "/Home", false)}
            disabled={isNavigating}
          >
            Home
          </button>

          <button 
            className={`text-sm font-medium transition-colors hover:text-primary ${activeLink === "Verify" ? "text-primary" : "text-muted-foreground"}`} 
            onClick={() => handleNavClick("Verify", "/verify")}
            disabled={isNavigating}
          >
            Verify
          </button>

          <button 
            className={`text-sm font-medium transition-colors hover:text-primary ${activeLink === "Explore" ? "text-primary" : "text-muted-foreground"}`} 
            onClick={() => handleNavClick("Explore", "/explore")}
            disabled={isNavigating}
          >
            Explore
          </button>

          <button 
            className={`text-sm font-medium transition-colors hover:text-primary ${activeLink === "Terms" ? "text-primary" : "text-muted-foreground"}`} 
            onClick={() => handleNavClick("Terms", "", false)}
            disabled={isNavigating}
          >
            Terms of Service
          </button>
        </nav>

        {/* Profile & Auth Buttons */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isSignedIn ? (
            <UserButton 
              appearance={{
                baseTheme: getClerkTheme(),
                elements: {
                  userButtonAvatarBox: "w-10 h-10 border-border",
                  userButtonTrigger: "focus:shadow-outline-primary border-border",
                  userButtonPopoverCard: "border-border",
                  userButtonPopoverActionButton: "hover:bg-secondary",
                  userButtonPopoverActionButtonText: "text-foreground",
                  userButtonPopoverActionButtonIcon: "text-muted-foreground",
                  userButtonPopoverFooter: "border-border"
                }
              }}
            />
          ) : (
            <Button 
              onClick={onLoginClick} 
              variant="default" 
              className="bg-primary hover:bg-primary/90"
              disabled={isNavigating}
            >
              Log In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  onLoginClick: undefined,
  onTermsClick: undefined
};

export default Header; 