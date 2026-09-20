import { describe, expect, it } from "vitest";
import { loadListingFixture } from "../src/fixtures";
import {
  MESSAGE_PROTOCOL_VERSION,
  extractListingRequest,
  extractListingResponse,
  isExtractListingRequest,
  isExtractListingResponse,
} from "../src/messages";

describe("message guards", () => {
  it("accepts a request it produced itself", () => {
    expect(isExtractListingRequest(extractListingRequest())).toBe(true);
  });

  it("accepts a response it produced itself", () => {
    const response = extractListingResponse({
      ok: true,
      listing: loadListingFixture("clean-jacket"),
    });
    expect(isExtractListingResponse(response)).toBe(true);
  });

  it.each([
    ["null", null],
    ["a string", "buyguard/extract-listing"],
    ["an unrelated object", { kind: "something-else", protocolVersion: 1 }],
    ["a mismatched protocol version", { kind: "buyguard/extract-listing", protocolVersion: 99 }],
    ["a missing protocol version", { kind: "buyguard/extract-listing" }],
  ])("rejects %s", (_label, value) => {
    expect(isExtractListingRequest(value)).toBe(false);
  });

  it("pins the protocol version so a surface mismatch is explicit", () => {
    expect(MESSAGE_PROTOCOL_VERSION).toBe(1);
  });
});
