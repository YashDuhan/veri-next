"use client";

import React, { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HealthCheckFields from './HealthCheckFields';
import PreviewResponse from './previewResponse';
import { HealthCheckResponse } from '@/app/integration/integration-core';

export default function HealthCheck() {
  const [healthResponse, setHealthResponse] = useState<HealthCheckResponse | null>(null);

  const handleFormSubmit = (data: HealthCheckResponse) => {
    setHealthResponse(data);
    // Scroll to the response section
    setTimeout(() => {
      const responseElement = document.getElementById('response-section');
      if (responseElement) {
        responseElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 bg-primary/10 border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Health Check</CardTitle>
            <CardDescription className="text-base">
              Analyze your health profile and get personalized recommendations.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="mb-10">
          <HealthCheckFields onSubmitSuccess={handleFormSubmit} />
        </div>

        {healthResponse && (
          <div id="response-section" className="mt-10 pt-6 border-t">
            <h2 className="text-2xl font-bold mb-6">Your Health Assessment</h2>
            <PreviewResponse data={healthResponse} />
          </div>
        )}
      </div>
    </div>
  );
}
