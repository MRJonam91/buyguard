/**
 * Listing fixtures | Fixture di annunci
 *
 * The fixtures are data files, not literals returned by a function, and every
 * one of them is validated against `parseListing` on load. A fixture that
 * drifts from the contract fails the test suite instead of silently producing
 * an object no adapter could ever produce.
 *
 * Le fixture sono file di dati validati con `parseListing` al caricamento.
 *
 * Content is invented and sanitized: no real seller, listing or personal data.
 * Contenuto inventato e sanificato: nessun dato reale di venditori o annunci.
 */

import { parseListing } from "./listing";
import type { Listing } from "./types";

import cleanJacket from "./fixture-data/clean-jacket.json";
import externalPaymentSneakers from "./fixture-data/external-payment-sneakers.json";
import photoOnlyConsole from "./fixture-data/photo-only-console.json";

const RAW_FIXTURES: Record<string, unknown> = {
  "clean-jacket": cleanJacket,
  "photo-only-console": photoOnlyConsole,
  "external-payment-sneakers": externalPaymentSneakers,
};

export const LISTING_FIXTURE_IDS = Object.keys(RAW_FIXTURES);

export class UnknownFixtureError extends Error {
  constructor(fixtureId: string) {
    super(`Unknown listing fixture "${fixtureId}". Available: ${LISTING_FIXTURE_IDS.join(", ")}`);
    this.name = "UnknownFixtureError";
  }
}

/**
 * Load a fixture by id.
 *
 * Throws on an unknown id rather than fabricating a listing, so a typo in a
 * test is a failure instead of a passing assertion against invented data.
 */
export function loadListingFixture(fixtureId: string): Listing {
  const raw = RAW_FIXTURES[fixtureId];
  if (raw === undefined) {
    throw new UnknownFixtureError(fixtureId);
  }
  return parseListing(raw, `fixture(${fixtureId})`);
}

export function loadAllListingFixtures(): Listing[] {
  return LISTING_FIXTURE_IDS.map(loadListingFixture);
}
