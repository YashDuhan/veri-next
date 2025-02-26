"use client";

import HomePage from "../components/homepage/HomePage";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
} 