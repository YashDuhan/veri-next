import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Search } from "lucide-react";
import { ManualVerificationResponse } from '@/app/integration/integration-types';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Alternatives from './Alternatives';

interface PreviewResponseProps {
  isLoading: boolean;
  result: ManualVerificationResponse | null;
  onSearchAgain: () => void;
}

export default function PreviewResponse({ isLoading, result, onSearchAgain }: PreviewResponseProps) {
  const getTrustabilityColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case 'trustworthy':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'misleading':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-red-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {getVerdictIcon(result.verdict)}
            <div className="space-y-3 w-full">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Verdict: <span className="capitalize">{result.verdict}</span></h3>
                <span className={`font-bold ${getTrustabilityColor(result.trustability_score)}`}>
                  Score: {result.trustability_score}/100
                </span>
              </div>
              <p className="font-medium">{result.why}</p>
              <p className="text-sm text-muted-foreground">{result.detailed_explanation}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onSearchAgain}
          >
            <Search className="h-4 w-4 mr-2" />
            Check Another
          </Button>
        </CardFooter>
      </Card>
      
      {result.alternatives && result.alternatives.length > 0 && (
        <Alternatives alternatives={result.alternatives} />
      )}
    </div>
  );
}
