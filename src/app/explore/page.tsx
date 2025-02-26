"use client";

import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function Explore() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Explore</h1>
        <p className="text-lg mb-4">
          This is the explore page where users can discover new content.
        </p>
        {/* Add your explore content here */}
      </div>
    </ProtectedRoute>
  );
} 