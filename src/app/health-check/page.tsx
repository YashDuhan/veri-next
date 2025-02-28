"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HealthCheck() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 bg-primary/10 border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Health Check</CardTitle>
            <CardDescription className="text-base">
              Analyze products based on your health profile and dietary preferences.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
