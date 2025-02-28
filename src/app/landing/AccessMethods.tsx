'use client';

import { FaGlobe, FaAndroid, FaChrome } from 'react-icons/fa';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AccessMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  id: number;
  openInNewTab?: boolean;
}

export default function AccessMethods() {
  const methods: AccessMethod[] = [
    {
      icon: <FaGlobe className="h-12 w-12 text-primary" />,
      title: "Web Application",
      description: "Access VeriTrust directly from your browser on any device. No installation required.",
      buttonText: "Open Web App",
      buttonLink: "/",
      id: 1,
      openInNewTab: false
    },
    {
      icon: <FaAndroid className="h-12 w-12 text-primary" />,
      title: "Android App",
      description: "Download our Android app for a native mobile experience.",
      buttonText: "Download APK",
      buttonLink: "https://github.com/VeriTrust/veritrust-android",
      id: 2,
      openInNewTab: true
    },
    {
      icon: <FaChrome className="h-12 w-12 text-primary" />,
      title: "Chrome Extension",
      description: "Verify claims while browsing with our convenient Chrome extension.",
      buttonText: "Get Extension",
      buttonLink: "https://github.com/VeriTrust/veritrust-browser-extension",
      id: 3,
      openInNewTab: true
    }
  ];

  return (
    <div className="w-full py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Access VeriTrust Anywhere
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to use VeriTrust with our multiple platform options
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((method) => (
            <Card 
              key={method.id}
              className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-primary/20"
            >
              <CardHeader className="flex flex-col items-center text-center pb-2">
                <div className="mb-4">{method.icon}</div>
                <CardTitle className="text-xl text-primary">{method.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow items-center text-center">
                <CardDescription className="text-base mb-6">{method.description}</CardDescription>
                <div className="mt-auto pt-4">
                  <Button asChild>
                    <a 
                      href={method.buttonLink} 
                      target={method.openInNewTab ? "_blank" : undefined} 
                      rel={method.openInNewTab ? "noopener noreferrer" : undefined}
                    >
                      {method.buttonText}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 