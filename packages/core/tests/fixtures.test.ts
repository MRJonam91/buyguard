import { describe, expect, it } from "vitest";
import {
  LISTING_FIXTURE_IDS,
  UnknownFixtureError,
  loadAllListingFixtures,
  loadListingFixture,
} from "../src/fixtures";

describe("listing fixtures", () => {
  it("exposes more than one fixture", () => {
    expect(LISTING_FIXTURE_IDS.length).toBeGreaterThan(1);
  });

  it("returns distinct listings for distinct ids", () => {
    const a = loadListingFixture("clean-jacket");
    const b = loadListingFixture("photo-only-console");
    expect(a.id).toBe("clean-jacket");
    expect(b.id).toBe("photo-only-console");
    expect(a.title).not.toBe(b.title);
    expect(a.priceCents).not.toBe(b.priceCents);
  });

  it("throws on an unknown fixture id instead of inventing one", () => {
    expect(() => loadListingFixture("does-not-exist")).toThrow(UnknownFixtureError);
  });

  it("validates every fixture against the Listing contract", () => {
    const listings = loadAllListingFixtures();
    expect(listings).toHaveLength(LISTING_FIXTURE_IDS.length);
    for (const listing of listings) {
      expect(Number.isInteger(listing.priceCents)).toBe(true);
      expect(listing.currency).toMatch(/^[A-Z]{3}$/);
      expect(Object.keys(listing.provenance).length).toBeGreaterThan(0);
    }
  });

  it("keeps fixtures free of real marketplace hosts", () => {
    for (const listing of loadAllListingFixtures()) {
      expect(new URL(listing.url).hostname.endsWith(".invalid")).toBe(true);
    }
  });
});
