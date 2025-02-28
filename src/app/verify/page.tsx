"use client";

import React from 'react';
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, ExternalLink, Upload } from "lucide-react";

// Import verification components
import ManualVerification from './manualVerification';
import URLVerification from './urlVerification';
import MediaVerification from './mediaVerification';

export default function Verify() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6 bg-primary/10 border-0">
            <CardHeader>
              <CardTitle className="text-3xl">Verify Products</CardTitle>
              <CardDescription className="text-base">
                Scan or search for products to verify their claims and ingredients.
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="manual">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Manual Verification
              </TabsTrigger>
              <TabsTrigger value="scan">
                <ExternalLink className="h-4 w-4 mr-2" />
                URL Verification
              </TabsTrigger>
              <TabsTrigger value="upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manual">
              <ManualVerification />
            </TabsContent>
            
            <TabsContent value="scan">
              <URLVerification />
            </TabsContent>
            
            <TabsContent value="upload">
              <MediaVerification />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
} 