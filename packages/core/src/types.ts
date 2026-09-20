/**
 * BUYGUARD canonical contracts | Contratti canonici BUYGUARD
 *
 * Adapters normalize only visible or user-supplied content into `Listing`.
 * Detectors consume a `Listing` and return zero or more `Finding` values whose
 * evidence points back at exact character ranges of the normalized text, so the
 * UI can show the user the words that produced a signal.
 *
 * Gli adapter normalizzano in `Listing` solo contenuto visibile o fornito
 * dall'utente. I detector restituiscono `Finding` la cui evidenza punta a range
 * di caratteri esatti nel testo normalizzato.
 */

/** Stable detector identifiers. Adding one is a deliberate, reviewed change. */
export const DETECTOR_IDS = [
  "PHOTO_ONLY",
  "SUBSTITUTE_ITEM",
  "PRICE_BAIT",
  "UNOFFICIAL_AUCTION",
  "EXTERNAL_PAYMENT",
  "OBJECT_MISMATCH",
  "DISCLOSURE_BURIED",
] as const;

export type DetectorId = (typeof DETECTOR_IDS)[number];

export function isDetectorId(value: unknown): value is DetectorId {
  return typeof value === "string" && (DETECTOR_IDS as readonly string[]).includes(value);
}

export const SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;
export type Severity = (typeof SEVERITIES)[number];

/**
 * Text fields a detector is allowed to cite. Evidence must point at one of
 * these, which is what makes an explanation auditable.
 */
export const EVIDENCE_FIELDS = ["title", "description", "category", "sellerName"] as const;
export type EvidenceField = (typeof EVIDENCE_FIELDS)[number];

/**
 * Classifier confidence in [0, 1]. Branded so a bare number cannot be assigned
 * by accident. This is NOT factual or legal certainty.
 *
 * Confidenza del classificatore, non certezza fattuale o giuridica.
 */
export type Confidence = number & { readonly __confidence: unique symbol };

export function confidence(value: number): Confidence {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new RangeError(`confidence must be a finite number in [0, 1], received ${value}`);
  }
  return value as Confidence;
}

/**
 * A half-open character range `[start, end)` into a normalized `Listing` field.
 * `text` is carried alongside so an exported report stays readable without the
 * original `Listing`.
 */
export interface EvidenceSpan {
  field: EvidenceField;
  start: number;
  end: number;
  text: string;
  /** Which versioned rule produced this span. */
  ruleId: string;
}

/** How a field reached the `Listing`, so an explanation can be audited. */
export type ProvenanceKind = "dom" | "page-metadata" | "user-input" | "ocr" | "derived";

export interface FieldProvenance {
  kind: ProvenanceKind;
  /** Adapter-specific locator: a CSS selector, a meta name, an input field. */
  locator: string;
}

export type ProvenanceKey = EvidenceField | "priceCents" | "images" | "links";

export interface ListingSeller {
  id: string;
  name: string;
  /** Rating visible on the page, when the page shows one. */
  rating?: number;
}

export interface Listing {
  id: string;
  url: string;
  /** Adapter that produced this listing, e.g. "vinted" or "local-tool". */
  platform: string;
  title: string;
  description: string;
  category?: string;
  /**
   * Price as an integer in the currency's minor unit (cents for EUR).
   * Not a float: PRICE_BAIT does arithmetic on this value and binary floats
   * make thresholds irreproducible.
   */
  priceCents: number;
  /** ISO 4217 code, uppercase, e.g. "EUR". */
  currency: string;
  seller: ListingSeller;
  /** Absolute image URLs. BUYGUARD never fetches them automatically. */
  images: string[];
  /** Outbound links found in the listing. Never followed automatically. */
  links: string[];
  /** Per-field provenance. Absent key means the adapter did not supply it. */
  provenance: Partial<Record<ProvenanceKey, FieldProvenance>>;
  /** ISO 8601 timestamp of when the adapter captured the page. */
  capturedAt: string;
}

export interface Finding {
  detectorId: DetectorId;
  severity: Severity;
  confidence: Confidence;
  evidence: EvidenceSpan[];
  /** Neutral description of what was observed. Never an accusation. */
  rationale: string;
  /** A concrete next step for the user, e.g. a question to ask the seller. */
  suggestedAction: string;
  /**
   * What this finding does NOT establish. Required, not optional: it is the
   * structural guard that stops a false positive from reading as a verdict.
   *
   * Cosa questo finding NON dimostra. Obbligatorio.
   */
  limitations: string[];
}

export interface AnalysisResult {
  listingId: string;
  findings: Finding[];
  /** Version of the rule set used, so a report is reproducible. */
  ruleSetVersion: string;
  analyzedAt: string;
}

/** Resolve an evidence span against the listing it was produced from. */
export function evidenceFieldText(listing: Listing, field: EvidenceField): string {
  switch (field) {
    case "title":
      return listing.title;
    case "description":
      return listing.description;
    case "category":
      return listing.category ?? "";
    case "sellerName":
      return listing.seller.name;
  }
}
