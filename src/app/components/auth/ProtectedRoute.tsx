"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Wait for auth to be loaded before redirecting
    if (isLoaded && !isSignedIn) {
      setIsRedirecting(true);
      router.replace("/");
    }
  }, [isSignedIn, isLoaded, router]);

  // If auth is still loading or user is not signed in, show loading state
  if (!isLoaded || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-foreground">
            {!isLoaded ? "Loading..." : "Redirecting to login..."}
          </p>
        </div>
      </div>
    );
  }

  // If not signed in but somehow still here, redirect
  if (!isSignedIn) {
    return null;
  }

  // If signed in, show the children
  return <>{children}</>;
};

export default ProtectedRoute; 