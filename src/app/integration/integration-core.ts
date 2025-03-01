import { API_BASE_URL } from '@/app/api/api';
import { ImageTextExtractionResponse, ManualVerificationResponse, AlternativesResponse, AlternativeProduct, ExploreProduct, ExploreProductsResponse } from './integration-types';

// check-image API endpoint
export async function extractTextFromImage(imageBlob: Blob): Promise<string> {
  // Create form data
  const formData = new FormData();
  formData.append('file', imageBlob, 'image.png');
  
  // Send request to API
  const apiResponse = await fetch(`${API_BASE_URL}/check-image`, {
    method: 'POST',
    body: formData,
  });
  
  // Handle errors
  if (!apiResponse.ok) {
    throw new Error(`error: ${apiResponse.status}`);
  }
  
  // Parse response
  const data = await apiResponse.json() as ImageTextExtractionResponse;
  const extractedText = data['extracted-text'] || '';
  
  return extractedText;
}

// Health Check API endpoint
export interface HealthCheckInput {
  age: number;
  height: number;
  weight: number;
  gender: string;
  activity_level: string;
  medical_conditions: string;
  medications: string;
  diet: string;
  sleep: number;
  stress: number;
  exercise: string;
}

export interface HealthRisk {
  risk: string;
  severity: string;
  description: string;
}

export interface Recommendation {
  category: string;
  suggestion: string;
  importance: string;
}

export interface LifestyleChange {
  area: string;
  current_status: string;
  target: string;
  timeframe: string;
}

export interface HealthCheckResponse {
  general_assessment: string;
  bmi: {
    value: number;
    category: string;
    interpretation: string;
  };
  health_risks: HealthRisk[];
  recommendations: Recommendation[];
  lifestyle_changes: LifestyleChange[];
  overall_status: string;
}

export async function checkHealth(input: HealthCheckInput): Promise<HealthCheckResponse> {
  // Send request to API
  const apiResponse = await fetch(`${API_BASE_URL}/check-health`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(input),
  });
  
  // Handle errors
  if (!apiResponse.ok) {
    throw new Error(`error: ${apiResponse.status}`);
  }
  
  // Parse response
  const data = await apiResponse.json() as HealthCheckResponse;
  return data;
}

// Manual Verification route
export async function verifyManually(claims: string, ingredients: string): Promise<ManualVerificationResponse> {
  // Send request to API
  const apiResponse = await fetch(`${API_BASE_URL}/manual-check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      claims,
      ingredients
    }),
  });
  
  // Handle errors
  if (!apiResponse.ok) {
    throw new Error(`error: ${apiResponse.status}`);
  }
  
  // Parse response
  const data = await apiResponse.json() as { 'extracted-text': string };
  
  // Parse the JSON string from the extracted-text field
  try {
    const extractedText = data['extracted-text'] || '';
    const parsedResult = JSON.parse(extractedText) as ManualVerificationResponse;
    
    // Check if there's an alternatives response
    try {
      // Also fetch alternatives
      const alternativesResponse = await fetch(`${API_BASE_URL}/suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify({
          claims,
          ingredients
        }),
      });
      
      if (alternativesResponse.ok) {
        const alternativesData = await alternativesResponse.json() as { response: string };
        if (alternativesData.response) {
          try {
            const parsedAlternatives = JSON.parse(alternativesData.response) as AlternativesResponse;
            parsedResult.alternatives = parsedAlternatives.alternatives;
          } catch (error) {
            console.error('Failed to parse alternatives:', error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch alternatives:', error);
    }
    
    return parsedResult;
  } catch {
    throw new Error('Failed to parse');
  }
}

// URL Extraction route
export async function extractFromUrl(url: string): Promise<{ status: string; raw_response: string; message?: string; alternatives?: AlternativeProduct[] }> {
  // Send request to API
  const apiResponse = await fetch(`${API_BASE_URL}/extract-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({ url }),
  });
  
  // Handle API errors
  if (!apiResponse.ok) {
    throw new Error(`API error: ${apiResponse.status}`);
  }
  
  // Parse response
  const result = await apiResponse.json() as { 
    status: string; 
    raw_response: string; 
    message?: string;
    alternatives?: AlternativeProduct[] 
  };
  
  // Try to fetch alternatives if the extraction was successful
  if (result.status === 'success' && result.raw_response) {
    try {
      // Extract claims and ingredients from the raw response
      const responseData = JSON.parse(result.raw_response);
      const claims = responseData.claims || '';
      const ingredients = responseData.ingredients || '';
      
      if (claims && ingredients) {
        // Fetch alternatives
        const alternativesResponse = await fetch(`${API_BASE_URL}/suggestions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
            claims,
            ingredients
          }),
        });
        
        if (alternativesResponse.ok) {
          const alternativesData = await alternativesResponse.json() as { response: string };
          if (alternativesData.response) {
            try {
              const parsedAlternatives = JSON.parse(alternativesData.response) as AlternativesResponse;
              result.alternatives = parsedAlternatives.alternatives;
            } catch (error) {
              console.error('Failed to parse alternatives:', error);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch alternatives:', error);
    }
  }
  
  return result;
}

// Check Raw Text route
export async function checkRawText(rawText: string): Promise<ManualVerificationResponse> {
  // Send request to API
  const apiResponse = await fetch(`${API_BASE_URL}/check-raw?raw_text=${encodeURIComponent(rawText)}`, {
    method: 'POST',
    headers: {
      'accept': 'application/json'
    },
  });
  
  // Handle errors
  if (!apiResponse.ok) {
    throw new Error(`error: ${apiResponse.status}`);
  }
  
  // Parse response
  const data = await apiResponse.json() as { 'extracted-text': string };
  
  // Parse JSON string from the extracted-text field
  try {
    const extractedText = data['extracted-text'] || '';
    const parsedResult = JSON.parse(extractedText) as ManualVerificationResponse;
    return parsedResult;
  } catch {
    throw new Error('Failed to parse verification result');
  }
}

// Get Explore Products route
export async function getExploreProducts(): Promise<ExploreProduct[]> {
  // Send request to API
  const apiResponse = await fetch(`${API_BASE_URL}/get-from-s3`, {
    method: 'GET',
    headers: {
      'accept': 'application/json'
    },
  });
  
  // Handle errors
  if (!apiResponse.ok) {
    throw new Error(`API error: ${apiResponse.status}`);
  }
  
  // Parse response and return products directly
  const data = await apiResponse.json() as ExploreProductsResponse;
  return data.data.products;
}
