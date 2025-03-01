// Declared types to fix lints

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

// Explore product suitability item interface
export interface SuitabilityItem {
  text: string;
  positive: boolean;
}

// Explore product nutrient highlight interface
export interface NutrientHighlight {
  text: string;
  positive: boolean;
}

// Explore product interface
export interface ExploreProduct {
  id: number;
  title: string;
  brand: string;
  images: string[];
  description: string;
  overview: string;
  nutrition: string;
  ingredients: string;
  claims: string;
  personalizedOverview: string;
  suitability: SuitabilityItem[];
  safeConsumption: string;
  nutrientHighlights: NutrientHighlight[];
  matchScore: number;
}

// Explore products response interface
export interface ExploreProductsResponse {
  data: {
    products: ExploreProduct[];
  };
}
