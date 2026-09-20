import { describe, expect, it } from "vitest";
import { loadListingFixture } from "../src/fixtures";
import { ListingValidationError, isSpanConsistent, parseListing } from "../src/listing";
import type { EvidenceSpan } from "../src/types";
import { confidence } from "../src/types";

const VALID = {
  id: "x-1",
  url: "https://example.invalid/item/x-1",
  platform: "fixture",
  title: "Titolo",
  description: "Descrizione",
  priceCents: 1000,
  currency: "EUR",
  seller: { id: "s-1", name: "venditore" },
  images: [],
  links: [],
  provenance: {},
  capturedAt: "2026-09-20T09:00:00.000Z",
};

describe("parseListing", () => {
  it("accepts a well-formed listing", () => {
    const listing = parseListing(VALID);
    expect(listing.priceCents).toBe(1000);
    expect(listing.category).toBeUndefined();
  });

  it.each([
    ["a relative url", { url: "/item/x-1" }],
    ["a float price", { priceCents: 19.99 }],
    ["a negative price", { priceCents: -1 }],
    ["a lowercase currency", { currency: "eur" }],
    ["a non-ISO timestamp", { capturedAt: "yesterday" }],
    ["a missing seller", { seller: undefined }],
    ["images that are not strings", { images: [42] }],
  ])("rejects %s", (_label, patch) => {
    expect(() => parseListing({ ...VALID, ...patch })).toThrow(ListingValidationError);
  });

  it("names the offending path in the error", () => {
    expect(() => parseListing({ ...VALID, currency: "eur" })).toThrow(/listing\.currency/);
  });
});

describe("confidence", () => {
  it("accepts values inside [0, 1]", () => {
    expect(confidence(0)).toBe(0);
    expect(confidence(1)).toBe(1);
  });

  it.each([1.1, -0.1, Number.NaN, Number.POSITIVE_INFINITY])("rejects %s", (value) => {
    expect(() => confidence(value)).toThrow(RangeError);
  });
});

describe("isSpanConsistent", () => {
  const listing = loadListingFixture("external-payment-sneakers");
  const start = listing.description.indexOf("Telegram");

  it("accepts a span whose offsets resolve to the quoted text", () => {
    const span: EvidenceSpan = {
      field: "description",
      start,
      end: start + "Telegram".length,
      text: "Telegram",
      ruleId: "test/telegram",
    };
    expect(isSpanConsistent(listing, span)).toBe(true);
  });

  it("rejects a span whose quoted text does not match its offsets", () => {
    const span: EvidenceSpan = {
      field: "description",
      start,
      end: start + "Telegram".length,
      text: "WhatsApp",
      ruleId: "test/telegram",
    };
    expect(isSpanConsistent(listing, span)).toBe(false);
  });

  it("rejects a span that runs past the end of the field", () => {
    const span: EvidenceSpan = {
      field: "title",
      start: 0,
      end: listing.title.length + 10,
      text: listing.title,
      ruleId: "test/overflow",
    };
    expect(isSpanConsistent(listing, span)).toBe(false);
  });
});
