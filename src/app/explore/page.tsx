"use client";

import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Explore() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 bg-primary/10 border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Explore Products</CardTitle>
            <CardDescription className="text-base">
              Discover new products and see what others are verifying.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
} 