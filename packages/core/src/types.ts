export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Evidence {
  type: string;
  value: string;
  source: string;
}

export interface Finding {
  detectorId: string;
  severity: Severity;
  confidence: number;
  evidence: Evidence[];
  rationale: string;
  suggestedAction: string;
}

export interface Listing {
  id: string;
  url: string;
  platform: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  seller: {
    id: string;
    name: string;
    rating?: number;
  };
  images: string[];
}
