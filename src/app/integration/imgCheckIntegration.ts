import { extractTextFromImage } from './integration-core';
import { ImageCheckResult } from './integration-types';


// Converts image data to a Blob
async function imageDataToBlob(imageData: string): Promise<Blob> {
  if (imageData.startsWith('blob:')) {
    const response = await fetch(imageData);
    return await response.blob();
  } 
  
  if (imageData.startsWith('data:')) {
    const parts = imageData.split(';base64,');
    const contentType = parts[0].split(':')[1] || 'image/png';
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    
    return new Blob([uInt8Array], { type: contentType });
  }
  
  throw new Error('Unsupported image format');
}

// Checks an image and extracts text from it
export async function checkImage(imageData: string): Promise<ImageCheckResult> {
  try {
    const imageBlob = await imageDataToBlob(imageData);
    const extractedText = await extractTextFromImage(imageBlob);
    
    return {
      extractedText,
      success: true
    };
  } catch (error) {
    return {
      extractedText: '',
      success: false,
      error: error instanceof Error ? error.message : 'Error extracting text'
    };
  }
}
