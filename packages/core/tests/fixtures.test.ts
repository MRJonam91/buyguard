import { describe, expect, it } from "vitest";
import { loadListingFixture } from "../src/fixtures";
import type { Finding } from "../src/types";

describe("Core Types & Fixtures", () => {
  it("should load a valid mock listing fixture", () => {
    const listing = loadListingFixture("test-123");
    expect(listing.id).toBe("test-123");
    expect(listing.price).toBe(99.99);
  });

  it("should be able to create a Finding", () => {
    const finding: Finding = {
      detectorId: "MOCK_DETECTOR",
      severity: "LOW",
      confidence: 0.8,
      evidence: [],
      rationale: "Testing finding structure",
      suggestedAction: "None",
    };
    expect(finding.severity).toBe("LOW");
  });
});
