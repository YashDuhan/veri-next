"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Sidebar from "@/app/components/sidebar/sidebar";
import ProtectedRoute from "@/app/components/auth/ProtectedRoute";
import { UserProfile } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';

// Import existing page components
import HomePage from "@/app/homepage/HomePage";
import VerifyPage from "@/app/verify/page";
import ExplorePage from "@/app/explore/page";
import HealthCheckPage from "@/app/health-check/page";

export default function Home() {
  const { isSignedIn } = useUser();
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { signOut } = useClerk();
  const [currentRoute, setCurrentRoute] = useState('/Home');

  // Determine the appropriate theme based on the system theme
  const getClerkTheme = () => {
    if (resolvedTheme === 'dark') {
      return dark;
    } else if (resolvedTheme === 'purple') {
      return shadesOfPurple;
    }
    return undefined; // Default light theme
  };

  // Handle navigation without page reload
  const handleNavigation = (href: string) => {
    if (href === '/logout') {
      // Handle logout directly
      signOut(() => {
        router.push('/');
      });
    } else if (href !== currentRoute) {
      // Only navigate if the route is different
      setCurrentRoute(href);
      
      // For routes that require authentication, check if user is signed in
      if ((href === '/verify' || href === '/health-check' || href === '/explore') && !isSignedIn) {
        // redirect to login page
        router.push('/');
        return;
      }
    }
  };

  // Render content based on current route
  const renderContent = () => {
    switch (currentRoute) {
      case '/Home':
        return <div className="container mx-auto"><HomePage /></div>;
      case '/verify':
        return <div className="container mx-auto"><VerifyPage /></div>;
      case '/health-check':
        return <div className="container mx-auto"><HealthCheckPage /></div>;
      case '/explore':
        return <div className="container mx-auto"><ExplorePage /></div>;
      case '/profile':
        return (
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                <p className="mt-2 text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <UserProfile 
                  routing="hash"
                  appearance={{
                    baseTheme: getClerkTheme(),
                    variables: { 
                      colorPrimary: resolvedTheme === 'purple' ? '#47049f' : undefined 
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        );
      default:
        return <div className="container mx-auto"><HomePage /></div>;
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar 
          onNavigate={handleNavigation} 
          currentRoute={currentRoute}
        />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </ProtectedRoute>
  );
} 