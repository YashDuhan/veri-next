"use client";

import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function Verify() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-6">Verify Brand Claims</h1>
        <p className="text-lg mb-4">
          This is the verification page where users can verify brand claims.
        </p>
        {/* Add your verification form or content here */}
      </div>
    </ProtectedRoute>
  );
} 