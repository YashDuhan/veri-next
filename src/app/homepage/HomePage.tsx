"use client";
import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, CheckCircle, Activity } from "lucide-react";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 border-primary/20 shadow-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none" />
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                {user?.imageUrl ? (
                  <Image 
                    src={user.imageUrl} 
                    alt="Profile" 
                    width={70} 
                    height={70} 
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[70px] h-[70px] bg-primary/10 flex items-center justify-center rounded-full">
                    <span className="text-xl font-bold text-primary">{user?.firstName?.charAt(0) || '?'}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  Welcome To VeriTrust {user?.firstName ? `${user.firstName}` : ''} 
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Unveil the truth behind every food label. Scan product details, verify brand claims, 
                  and make informed choices with confidence. 🚀
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Get Started
              </CardTitle>
              <CardDescription>
                Use the sidebar to navigate through different features of VeriTrust:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <span className="font-medium">Verify products</span> via{" "}
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">manual input</span>{" "}
                  <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">URL scanning</span>{" "}
                  <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">image upload</span>
                </li>
                <li>
                  <span className="font-medium">Check if products match your health profile</span>
                </li>
                <li>
                  <span className="font-medium">Explore trending and popular products</span>
                </li>
                <li>
                  <span className="font-medium">Manage your profile and preferences</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Why VeriTrust?
              </CardTitle>
              <CardDescription>
                Our platform offers several key benefits:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <span className="font-medium">Accurate verification</span> of product claims and ingredients
                </li>
                <li>
                  <span className="font-medium">Multiple verification methods</span> to suit your needs
                </li>
                <li>
                  <span className="font-medium">Personalized health recommendations</span> based on your profile
                </li>
                <li>
                  <span className="font-medium">Community-driven insights</span> from other users
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 