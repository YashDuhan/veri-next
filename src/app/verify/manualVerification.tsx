import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Info, AlertCircle } from "lucide-react";
import { verifyManually } from '@/app/integration/integration-core';
import { ManualVerificationResponse } from '@/app/integration/integration-types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PreviewResponse from './previewResponse';

export default function ManualVerification() {
  const [claims, setClaims] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ManualVerificationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!claims.trim() || !ingredients.trim()) {
      setError('Please enter both claims and ingredients');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);
      
      const verificationResult = await verifyManually(claims, ingredients);
      setResult(verificationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchAgain = () => {
    // Clear the result to show the form again
    setResult(null);
    
    // Clear the input fields for a fresh start
    setClaims('');
    setIngredients('');
    
    // Clear any previous errors
    setError(null);
  };

  // If we're loading or have a result, show the PreviewResponse component
  if (isLoading || result) {
    return (
      <PreviewResponse 
        isLoading={isLoading} 
        result={result} 
        onSearchAgain={handleSearchAgain}
      />
    );
  }

  // Otherwise, show the verification form
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Verification</CardTitle>
        <CardDescription>
          Enter product claims and ingredients to verify their authenticity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label htmlFor="claims" className="block text-sm font-medium mb-2">
            Product Claims
          </label>
          <textarea 
            id="claims"
            value={claims}
            onChange={(e) => setClaims(e.target.value)}
            placeholder="Enter product claims (e.g., 'Organic', 'Gluten-Free', 'No Artificial Flavors')"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium mb-2">
            Product Ingredients
          </label>
          <textarea 
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter product ingredients list"
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleVerify} 
          disabled={isLoading || !claims.trim() || !ingredients.trim()}
        >
          <ClipboardCheck className="h-4 w-4 mr-2" />
          Verify Claims
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="mt-6 p-4 border rounded-lg bg-muted/30">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm mb-1">Example</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Claims:</strong> &quot;100% Organic, Non-GMO, No Artificial Preservatives, Sustainably Sourced&quot;</p>
                <p><strong>Ingredients:</strong> &quot;Organic rolled oats, organic honey, organic almonds, organic coconut oil, organic cinnamon, sea salt&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
