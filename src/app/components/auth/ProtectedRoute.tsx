"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to be loaded before redirecting
    if (isLoaded && !isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, isLoaded, router]);

  // If user is not signed in, render nothing
  // prevents any flash of content before redirect
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  // If signed in, show the children
  return <>{children}</>;
};

export default ProtectedRoute; 