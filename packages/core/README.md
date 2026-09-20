# @buyguard/core

Canonical contracts shared by every entry point: `Listing`, `Finding`,
`EvidenceSpan` and the extension message protocol.

Contratti canonici condivisi da ogni entry point.

## What lives here | Cosa contiene

| File | Purpose |
| --- | --- |
| `src/types.ts` | `Listing`, `Finding`, `EvidenceSpan`, `DetectorId`, branded `Confidence` |
| `src/listing.ts` | Dependency-free runtime validation (`parseListing`, `isSpanConsistent`) |
| `src/messages.ts` | Versioned, guard-checked message contract between extension surfaces |
| `src/fixtures.ts` | Loader over the sanitized listing fixtures in `src/fixture-data/` |

## Two invariants | Due invarianti

1. **Every adapter output passes `parseListing`.** An adapter that cannot
   produce a valid `Listing` fails at its own boundary, not inside a detector.
2. **Every evidence span passes `isSpanConsistent`.** A span whose offsets do
   not resolve to the text it quotes would give the user an explanation they
   cannot verify, which is the product's main risk.

1. Ogni output di un adapter supera `parseListing`.
2. Ogni span di evidenza supera `isSpanConsistent`.

## Notes | Note

`priceCents` is an integer in the currency's minor unit. Prices are never
floats: `PRICE_BAIT` will do arithmetic on this value and binary floats make
thresholds irreproducible.

`Finding.limitations` is required, not optional. It states what a finding does
*not* establish and is the structural guard against a false positive reading as
a verdict.

`priceCents` e un intero nell'unita minore della valuta. `Finding.limitations` e
obbligatorio: dichiara cosa il finding non dimostra.
