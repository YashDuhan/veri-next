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

// Alternative product interface
export interface AlternativeProduct {
  product_name: string;
  brand: string;
  description: string;
  health_benefits: string;
  ingredient_comparison: string;
  certifications: string[];
  trust_score: string;
  user_reviews: string;
  price_range: string;
  availability: string;
}

// Alternatives response interface
export interface AlternativesResponse {
  alternatives: AlternativeProduct[];
}

// Manual verification response type
export interface ManualVerificationResponse {
  verdict: string;
  why: string;
  detailed_explanation: string;
  trustability_score: number;
  alternatives?: AlternativeProduct[];
}

// Manual verification result with loading state
export interface ManualVerificationResult {
  isLoading: boolean;
  data?: ManualVerificationResponse;
  error?: string;
}
