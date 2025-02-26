"use client";
import { useUser } from '@clerk/nextjs';
import Header from '../global/Header';

export default function HomePage() {
  const { isSignedIn, user } = useUser();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">
            {isSignedIn 
              ? `Hello, ${user?.firstName || 'User'}!` 
              : 'Welcome to VeriTrust'}
          </h1>
          <p className="text-xl text-gray-600">
            {isSignedIn 
              ? 'Thank you for logging in to our platform.' 
              : 'Please log in to access your personalized dashboard.'}
          </p>
        </div>
      </main>
    </div>
  );
} 