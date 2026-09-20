/**
 * Typed message contract between the extension surfaces.
 *
 * A content script receives messages from any extension context, and the page it
 * runs in is hostile by assumption (THREAT_MODEL.md: "treat content as data").
 * Every message therefore crosses a runtime type guard before it is acted on;
 * the TypeScript types alone are not a security control.
 *
 * Ogni messaggio attraversa un type guard a runtime: i tipi TypeScript da soli
 * non sono un controllo di sicurezza.
 */

import type { Listing } from "./types";

export const MESSAGE_PROTOCOL_VERSION = 1;

export const EXTRACT_LISTING = "buyguard/extract-listing" as const;
export const EXTRACT_LISTING_RESULT = "buyguard/extract-listing:result" as const;

export interface ExtractListingRequest {
  kind: typeof EXTRACT_LISTING;
  protocolVersion: number;
}

/** Why an extraction did not produce a listing. Rendered as plain UI copy. */
export type ExtractionFailure =
  | "unsupported-page"
  | "insufficient-metadata"
  | "no-active-tab"
  | "content-script-unavailable"
  | "internal-error";

export type ExtractListingResult =
  | { ok: true; listing: Listing }
  | { ok: false; reason: ExtractionFailure; detail?: string };

export interface ExtractListingResponse {
  kind: typeof EXTRACT_LISTING_RESULT;
  protocolVersion: number;
  result: ExtractListingResult;
}

export type BuyguardMessage = ExtractListingRequest | ExtractListingResponse;

export function extractListingRequest(): ExtractListingRequest {
  return { kind: EXTRACT_LISTING, protocolVersion: MESSAGE_PROTOCOL_VERSION };
}

export function extractListingResponse(result: ExtractListingResult): ExtractListingResponse {
  return {
    kind: EXTRACT_LISTING_RESULT,
    protocolVersion: MESSAGE_PROTOCOL_VERSION,
    result,
  };
}

function hasKind(value: unknown, kind: string): value is Record<string, unknown> {
  return (
    typeof value === "object" && value !== null && (value as Record<string, unknown>).kind === kind
  );
}

/**
 * Accept a request only if it carries the exact protocol version this build
 * speaks. An older or newer surface is rejected rather than half-understood.
 */
export function isExtractListingRequest(value: unknown): value is ExtractListingRequest {
  return hasKind(value, EXTRACT_LISTING) && value.protocolVersion === MESSAGE_PROTOCOL_VERSION;
}

export function isExtractListingResponse(value: unknown): value is ExtractListingResponse {
  if (!hasKind(value, EXTRACT_LISTING_RESULT)) return false;
  if (value.protocolVersion !== MESSAGE_PROTOCOL_VERSION) return false;
  const result = value.result;
  return typeof result === "object" && result !== null;
}
