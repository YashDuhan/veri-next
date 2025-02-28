import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, ExternalLink, AlertTriangle } from "lucide-react";
import { extractFromUrl, checkRawText } from '@/app/integration/integration-core';
import { ManualVerificationResponse, AlternativesResponse } from '@/app/integration/integration-types';
import { API_BASE_URL } from '@/app/api/api';
import PreviewResponse from './previewResponse';

export default function URLVerification() {
  const [url, setUrl] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');
  const [verificationResult, setVerificationResult] = useState<ManualVerificationResponse | null>(null);
  const [showResult, setShowResult] = useState(false);

  const validateUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleVerify = async () => {
    setError('');
    setShowResult(false);
    setVerificationResult(null);
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    
    setIsValidating(true);
    
    try {
      // Step 1: Extract data from URL
      const extractionResult = await extractFromUrl(url);
      
      if (extractionResult.status === 'not_parsed' && extractionResult.raw_response) {
        // Step 2: Send the raw response to check-raw endpoint
        const verificationResponse = await checkRawText(extractionResult.raw_response);
        
        // Step 3: Fetch alternatives directly(MAIN ROUTE ISN'T WORKING)
        try {
          const alternativesResponse = await fetch(`${API_BASE_URL}/suggestions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json'
            },
            body: JSON.stringify({
              claims: extractionResult.raw_response,
              ingredients: ''
            }),
          });
          
          if (alternativesResponse.ok) {
            const alternativesData = await alternativesResponse.json() as { response: string };
            if (alternativesData.response) {
              try {
                const parsedAlternatives = JSON.parse(alternativesData.response) as AlternativesResponse;
                verificationResponse.alternatives = parsedAlternatives.alternatives;
              } catch (error) {
                console.error('Failed to parse alternatives:', error);
              }
            }
          }
        } catch (error) {
          console.error('Failed to fetch alternatives:', error);
        }
        
        // Step 4: Set the verification result
        setVerificationResult(verificationResponse);
        setShowResult(true);
      } else {
        setError('Failed to extract data from URL');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during verification');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSearchAgain = () => {
    setShowResult(false);
    setUrl('');
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium">
              Deployment Notice
            </p>
            <p className="text-sm text-amber-700 mt-1">
              This feature will only work locally, as our backend is running on a serverless instance. 
              We could have hosted on AWS EC2 but still needed a valid SSL certificate to get HTTPS.
            </p>
          </div>
        </div>
      </div>

      {!showResult ? (
        <Card>
          <CardHeader>
            <CardTitle>URL Verification</CardTitle>
            <CardDescription>
              Enter a product URL to verify its claims.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 w-full flex flex-col items-center justify-center mb-4">
              <ExternalLink className="h-16 w-16 text-primary/40 mb-4" />
              <p className="text-center text-muted-foreground mb-4">
                Enter the product URL below to verify its authenticity and claims.
              </p>
              <div className="w-full max-w-md">
                <Input 
                  type="url" 
                  placeholder="https://example.com/product" 
                  value={url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUrl(e.target.value);
                    setError('');
                  }}
                  className={`mb-2 ${error ? 'border-red-500' : ''}`}
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              </div>
            </div>
            <Button 
              className="mt-2"
              onClick={handleVerify}
              disabled={!url || isValidating}
            >
              {isValidating ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Verifying...
                </>
              ) : (
                <>
                  <Link className="h-4 w-4 mr-2" />
                  Verify URL
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <PreviewResponse 
          isLoading={isValidating} 
          result={verificationResult} 
          onSearchAgain={handleSearchAgain} 
        />
      )}
    </div>
  );
}
