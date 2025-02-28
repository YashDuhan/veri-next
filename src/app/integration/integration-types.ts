// API response type
export interface ImageTextExtractionResponse {
  'extracted-text': string;
}

// Image check result
export interface ImageCheckResult {
  extractedText: string;
  success: boolean;
  error?: string;
}

// Manual verification response type
export interface ManualVerificationResponse {
  verdict: string;
  why: string;
  detailed_explanation: string;
  trustability_score: number;
}

// Manual verification result with loading state
export interface ManualVerificationResult {
  isLoading: boolean;
  data?: ManualVerificationResponse;
  error?: string;
}
