"use client";

import React from 'react';
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { UserProfile } from '@clerk/nextjs';
import { dark, shadesOfPurple } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function Profile() {
  const { resolvedTheme } = useTheme();

  // Determine the appropriate theme
  const getClerkTheme = () => {
    if (resolvedTheme === 'dark') {
      return dark;
    } else if (resolvedTheme === 'purple') {
      return shadesOfPurple;
    }
    return undefined; // Default light theme
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
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
    </ProtectedRoute>
  );
}
