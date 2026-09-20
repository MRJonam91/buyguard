/**
 * Runtime validation for the canonical contracts.
 *
 * Deliberately dependency-free. THREAT_MODEL.md lists supply-chain compromise
 * as a tracked threat and the whole product ships inside a browser extension,
 * so the boundary validator does not pull in a schema library.
 *
 * Volutamente senza dipendenze: il validatore di confine non introduce una
 * libreria di schema in un'estensione browser.
 */

import {
  EVIDENCE_FIELDS,
  type EvidenceField,
  type EvidenceSpan,
  type Listing,
  evidenceFieldText,
} from "./types";

export class ListingValidationError extends Error {
  readonly path: string;

  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = "ListingValidationError";
    this.path = path;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(source: Record<string, unknown>, key: string, path: string): string {
  const value = source[key];
  if (typeof value !== "string") {
    throw new ListingValidationError(`${path}.${key}`, `expected string, received ${typeof value}`);
  }
  return value;
}

function optionalString(
  source: Record<string, unknown>,
  key: string,
  path: string,
): string | undefined {
  if (source[key] === undefined) return undefined;
  return requireString(source, key, path);
}

function requireStringArray(source: Record<string, unknown>, key: string, path: string): string[] {
  const value = source[key];
  if (!Array.isArray(value)) {
    throw new ListingValidationError(`${path}.${key}`, "expected an array of strings");
  }
  value.forEach((entry, index) => {
    if (typeof entry !== "string") {
      throw new ListingValidationError(`${path}.${key}[${index}]`, "expected string");
    }
  });
  return value as string[];
}

/**
 * Validate an unknown value against the `Listing` contract.
 *
 * This is the function every adapter output must pass through. It is what makes
 * "a mocked page becomes a valid Listing" a testable statement rather than an
 * assertion in a document.
 */
export function parseListing(input: unknown, path = "listing"): Listing {
  if (!isRecord(input)) {
    throw new ListingValidationError(path, "expected an object");
  }

  const id = requireString(input, "id", path);
  if (id.trim() === "") {
    throw new ListingValidationError(`${path}.id`, "must not be empty");
  }

  const url = requireString(input, "url", path);
  try {
    // Rejects relative or malformed URLs before they reach a detector.
    new URL(url);
  } catch {
    throw new ListingValidationError(`${path}.url`, `not an absolute URL: ${url}`);
  }

  const priceCents = input.priceCents;
  if (typeof priceCents !== "number" || !Number.isInteger(priceCents) || priceCents < 0) {
    throw new ListingValidationError(
      `${path}.priceCents`,
      "expected a non-negative integer in the currency minor unit",
    );
  }

  const currency = requireString(input, "currency", path);
  if (!/^[A-Z]{3}$/.test(currency)) {
    throw new ListingValidationError(
      `${path}.currency`,
      `expected an uppercase ISO 4217 code, received ${currency}`,
    );
  }

  const capturedAt = requireString(input, "capturedAt", path);
  if (Number.isNaN(Date.parse(capturedAt))) {
    throw new ListingValidationError(`${path}.capturedAt`, "expected an ISO 8601 timestamp");
  }

  const sellerInput = input.seller;
  if (!isRecord(sellerInput)) {
    throw new ListingValidationError(`${path}.seller`, "expected an object");
  }
  const rating = sellerInput.rating;
  if (rating !== undefined && (typeof rating !== "number" || !Number.isFinite(rating))) {
    throw new ListingValidationError(`${path}.seller.rating`, "expected a finite number");
  }

  const provenanceInput = input.provenance;
  if (!isRecord(provenanceInput)) {
    throw new ListingValidationError(`${path}.provenance`, "expected an object");
  }
  for (const [key, entry] of Object.entries(provenanceInput)) {
    if (!isRecord(entry)) {
      throw new ListingValidationError(`${path}.provenance.${key}`, "expected an object");
    }
    requireString(entry, "kind", `${path}.provenance.${key}`);
    requireString(entry, "locator", `${path}.provenance.${key}`);
  }

  return {
    id,
    url,
    platform: requireString(input, "platform", path),
    title: requireString(input, "title", path),
    description: requireString(input, "description", path),
    category: optionalString(input, "category", path),
    priceCents,
    currency,
    seller: {
      id: requireString(sellerInput, "id", `${path}.seller`),
      name: requireString(sellerInput, "name", `${path}.seller`),
      ...(rating === undefined ? {} : { rating }),
    },
    images: requireStringArray(input, "images", path),
    links: requireStringArray(input, "links", path),
    provenance: provenanceInput as Listing["provenance"],
    capturedAt,
  };
}

export function isEvidenceField(value: unknown): value is EvidenceField {
  return typeof value === "string" && (EVIDENCE_FIELDS as readonly string[]).includes(value);
}

/**
 * Check that a span actually addresses the text it claims to quote.
 *
 * A detector that cites the wrong offsets produces an explanation the user
 * cannot verify, which is the failure mode README.md calls out as the product's
 * main risk. Tests assert this invariant for every fixture.
 */
export function isSpanConsistent(listing: Listing, span: EvidenceSpan): boolean {
  if (!isEvidenceField(span.field)) return false;
  if (!Number.isInteger(span.start) || !Number.isInteger(span.end)) return false;
  if (span.start < 0 || span.end <= span.start) return false;
  const source = evidenceFieldText(listing, span.field);
  if (span.end > source.length) return false;
  return source.slice(span.start, span.end) === span.text;
}
