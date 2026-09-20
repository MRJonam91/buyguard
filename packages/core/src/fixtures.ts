import type { Listing } from "./types";

/**
 * Funzione mock per caricare fixture nei test.
 * In futuro leggerà file da system o JSON pre-generati.
 */
export function loadListingFixture(fixtureId: string): Listing {
  return {
    id: fixtureId,
    url: `https://example.com/item/${fixtureId}`,
    platform: "mock",
    title: "Mock Item",
    description: "This is a mocked item for testing.",
    price: 99.99,
    currency: "EUR",
    seller: {
      id: "s123",
      name: "Mock Seller",
    },
    images: [],
  };
}
