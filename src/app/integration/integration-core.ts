import { API_BASE_URL } from '@/app/api/api';
import { ImageTextExtractionResponse, ManualVerificationResponse } from './integration-types';

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
    return parsedResult;
  } catch (error) {
    throw new Error('Failed to parse');
  }
}

// URL Extraction route
export async function extractFromUrl(url: string): Promise<{ status: string; raw_response: string; message?: string }> {
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
  return await apiResponse.json() as { status: string; raw_response: string; message?: string };
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
  } catch (error) {
    throw new Error('Failed to parse verification result');
  }
}
