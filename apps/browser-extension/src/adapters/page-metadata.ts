/**
 * Generic page-metadata adapter | Adapter generico sui metadati di pagina
 *
 * This is deliberately NOT a Vinted adapter. `docs/platform-rules/README.md`
 * states that no selectors are written until the adapter work begins and its
 * permitted interaction model has been checked, and that check has not happened
 * yet. This adapter therefore reads only the OpenGraph / schema.org metadata a
 * page publishes for link previews - the same data any chat client reads when
 * you paste a URL - and nothing platform-specific.
 *
 * Questo NON e l'adapter Vinted: legge solo i metadati OpenGraph/schema.org che
 * la pagina pubblica per le anteprime dei link. L'adapter Vinted arriva in M4,
 * dopo la verifica del modello di interazione consentito.
 *
 * It exists so the M1 path - page to canonical `Listing` - is real and testable.
 * M4 replaces it with a reviewed Vinted adapter behind the same contract.
 */

import {
  type ExtractListingResult,
  type FieldProvenance,
  type Listing,
  parseListing,
} from "@buyguard/core";

export interface PageMetadata {
  url: string;
  title: string | null;
  description: string | null;
  priceAmount: string | null;
  priceCurrency: string | null;
  category: string | null;
  sellerName: string | null;
  images: string[];
  links: string[];
}

function metaContent(doc: Document, selectors: string[]): string | null {
  for (const selector of selectors) {
    const element = doc.querySelector(selector);
    const content = element?.getAttribute("content")?.trim();
    if (content) return content;
  }
  return null;
}

/**
 * Convert a human price string to an integer number of minor units.
 *
 * Handles the separator conventions BUYGUARD will actually meet across European
 * storefronts: "35.00", "35,00", "1.234,56" and "1,234.56". Returns null rather
 * than guessing when the string is not a price.
 *
 * Restituisce null invece di indovinare quando la stringa non e un prezzo.
 */
export function parsePriceToCents(raw: string | null): number | null {
  if (raw === null) return null;
  const cleaned = raw.replace(/[^\d.,]/g, "");
  if (cleaned === "") return null;

  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  let normalized: string;

  if (lastComma === -1 && lastDot === -1) {
    normalized = cleaned;
  } else {
    // The right-most separator is the decimal one only when it is followed by
    // one or two digits; otherwise every separator groups thousands.
    const decimalIndex = Math.max(lastComma, lastDot);
    const decimals = cleaned.length - decimalIndex - 1;
    if (decimals >= 1 && decimals <= 2) {
      const integerPart = cleaned.slice(0, decimalIndex).replace(/[.,]/g, "");
      const fractionPart = cleaned.slice(decimalIndex + 1);
      normalized = `${integerPart}.${fractionPart}`;
    } else {
      normalized = cleaned.replace(/[.,]/g, "");
    }
  }

  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}

/** Read the metadata a page publishes about itself. No platform selectors. */
export function readPageMetadata(doc: Document, href: string): PageMetadata {
  const anchors = Array.from(doc.querySelectorAll("a[href]"));
  const links = anchors
    .map((anchor) => anchor.getAttribute("href") ?? "")
    .filter((value) => /^https?:\/\//i.test(value));

  const images = Array.from(doc.querySelectorAll("meta[property='og:image']"))
    .map((element) => element.getAttribute("content") ?? "")
    .filter((value) => /^https?:\/\//i.test(value));

  return {
    url: href,
    title: metaContent(doc, ["meta[property='og:title']", "meta[name='title']"]),
    description: metaContent(doc, ["meta[property='og:description']", "meta[name='description']"]),
    priceAmount: metaContent(doc, [
      "meta[property='product:price:amount']",
      "meta[itemprop='price']",
    ]),
    priceCurrency: metaContent(doc, [
      "meta[property='product:price:currency']",
      "meta[itemprop='priceCurrency']",
    ]),
    category: metaContent(doc, ["meta[property='product:category']"]),
    sellerName: metaContent(doc, ["meta[property='product:retailer_title']"]),
    // De-duplicated, capped: a page controls this list and BUYGUARD must not let
    // it drive unbounded work (THREAT_MODEL.md: cap resource use).
    images: Array.from(new Set(images)).slice(0, 20),
    links: Array.from(new Set(links)).slice(0, 50),
  };
}

function listingIdFor(href: string): string {
  try {
    const parsed = new URL(href);
    const slug = `${parsed.hostname}${parsed.pathname}`.replace(/[^a-zA-Z0-9]+/g, "-");
    return slug.replace(/^-+|-+$/g, "").slice(0, 120) || "listing";
  } catch {
    return "listing";
  }
}

const PAGE_METADATA: FieldProvenance = {
  kind: "page-metadata",
  locator: "meta[property^='og:'], meta[property^='product:']",
};

/**
 * Build a canonical `Listing` from page metadata, or explain why it cannot.
 *
 * The returned value always passes `parseListing` when `ok` is true, which is
 * the M1 exit criterion expressed as code rather than prose.
 */
export function buildListing(
  metadata: PageMetadata,
  options: { platform: string; capturedAt: string },
): ExtractListingResult {
  const priceCents = parsePriceToCents(metadata.priceAmount);

  if (metadata.title === null || priceCents === null) {
    return {
      ok: false,
      reason: "insufficient-metadata",
      detail: metadata.title === null ? "no title metadata" : "no parsable price metadata",
    };
  }

  const candidate: Listing = {
    id: listingIdFor(metadata.url),
    url: metadata.url,
    platform: options.platform,
    title: metadata.title,
    description: metadata.description ?? "",
    ...(metadata.category === null ? {} : { category: metadata.category }),
    priceCents,
    currency: (metadata.priceCurrency ?? "EUR").toUpperCase(),
    seller: {
      id: "unknown",
      name: metadata.sellerName ?? "unknown",
    },
    images: metadata.images,
    links: metadata.links,
    provenance: {
      title: PAGE_METADATA,
      description: PAGE_METADATA,
      priceCents: PAGE_METADATA,
      images: PAGE_METADATA,
      links: { kind: "dom", locator: "a[href]" },
    },
    capturedAt: options.capturedAt,
  };

  try {
    return { ok: true, listing: parseListing(candidate) };
  } catch (error) {
    return {
      ok: false,
      reason: "internal-error",
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

export function extractListingFromDocument(
  doc: Document,
  options: { href: string; platform: string; capturedAt: string },
): ExtractListingResult {
  return buildListing(readPageMetadata(doc, options.href), options);
}
