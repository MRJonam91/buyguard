import { parseListing } from "@buyguard/core";
import { describe, expect, it } from "vitest";
import {
  extractListingFromDocument,
  parsePriceToCents,
  readPageMetadata,
} from "../src/adapters/page-metadata";

function pageWith(head: string, body = ""): Document {
  return new DOMParser().parseFromString(
    `<!doctype html><html><head>${head}</head><body>${body}</body></html>`,
    "text/html",
  );
}

const LISTING_PAGE = `
  <meta property="og:title" content="Giacca di jeans taglia M" />
  <meta property="og:description" content="Giacca originale, indossata poche volte." />
  <meta property="product:price:amount" content="35,00" />
  <meta property="product:price:currency" content="eur" />
  <meta property="product:category" content="Abbigliamento" />
  <meta property="og:image" content="https://example.invalid/img/1.jpg" />
`;

const HREF = "https://example.invalid/items/123456-giacca";

/**
 * M1 exit criterion, stated as a test rather than as prose in a plan:
 * a mocked page becomes a valid canonical Listing.
 */
describe("M1: mocked page becomes a valid Listing", () => {
  it("produces a listing that passes the canonical contract", () => {
    const result = extractListingFromDocument(pageWith(LISTING_PAGE), {
      href: HREF,
      platform: "page-metadata",
      capturedAt: "2026-09-20T09:00:00.000Z",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    // Re-validating proves the adapter output is contract-conformant, not just
    // shaped like a Listing at the type level.
    const listing = parseListing(result.listing);
    expect(listing.title).toBe("Giacca di jeans taglia M");
    expect(listing.priceCents).toBe(3500);
    expect(listing.currency).toBe("EUR");
    expect(listing.category).toBe("Abbigliamento");
    expect(listing.images).toEqual(["https://example.invalid/img/1.jpg"]);
    expect(listing.id).toBe("example-invalid-items-123456-giacca");
  });

  it("records where every extracted value came from", () => {
    const result = extractListingFromDocument(pageWith(LISTING_PAGE), {
      href: HREF,
      platform: "page-metadata",
      capturedAt: "2026-09-20T09:00:00.000Z",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.listing.provenance.title?.kind).toBe("page-metadata");
    expect(result.listing.provenance.links?.kind).toBe("dom");
  });
});

describe("extraction failures", () => {
  it("reports insufficient metadata instead of inventing a title", () => {
    const result = extractListingFromDocument(
      pageWith(`<meta property="product:price:amount" content="35,00" />`),
      { href: HREF, platform: "page-metadata", capturedAt: "2026-09-20T09:00:00.000Z" },
    );
    expect(result).toMatchObject({ ok: false, reason: "insufficient-metadata" });
  });

  it("reports insufficient metadata instead of inventing a price", () => {
    const result = extractListingFromDocument(
      pageWith(`<meta property="og:title" content="Giacca" />`),
      { href: HREF, platform: "page-metadata", capturedAt: "2026-09-20T09:00:00.000Z" },
    );
    expect(result).toMatchObject({ ok: false, reason: "insufficient-metadata" });
  });
});

describe("parsePriceToCents", () => {
  it.each([
    ["35.00", 3500],
    ["35,00", 3500],
    ["1.234,56", 123456],
    ["1,234.56", 123456],
    ["35", 3500],
    ["EUR 42,50", 4250],
    ["42,5", 4250],
    ["1.234", 123400],
  ])("parses %s to %i cents", (input, expected) => {
    expect(parsePriceToCents(input)).toBe(expected);
  });

  it.each([null, "", "gratis", "n/a"])("returns null for %s instead of guessing", (input) => {
    expect(parsePriceToCents(input)).toBeNull();
  });
});

describe("resource caps", () => {
  it("caps the number of links a page can push into a Listing", () => {
    const anchors = Array.from(
      { length: 80 },
      (_unused, index) => `<a href="https://example.invalid/l/${index}">l</a>`,
    ).join("");
    const metadata = readPageMetadata(pageWith("", anchors), HREF);
    expect(metadata.links).toHaveLength(50);
  });

  it("ignores non-http links", () => {
    const metadata = readPageMetadata(
      pageWith("", `<a href="javascript:alert(1)">x</a><a href="mailto:a@b.invalid">y</a>`),
      HREF,
    );
    expect(metadata.links).toEqual([]);
  });
});
