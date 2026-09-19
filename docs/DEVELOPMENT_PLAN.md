# Development plan | Piano di sviluppo

## Delivery rule | Regola di consegna

Each milestone must leave the repository buildable, tested and documented. A detector is complete only with positive, negative and borderline fixtures, unit tests, rationale text and an evidence trace. Security or privacy changes require an update to the relevant documents.

Ogni milestone deve lasciare la repository compilabile, testata e documentata. Un detector e completo solo con fixture positive, negative e borderline, unit test, testo di rationale e traccia delle evidenze. Le modifiche a sicurezza o privacy richiedono l'aggiornamento dei documenti pertinenti.

| Milestone | Outcome in English | Risultato in italiano | Exit criteria |
| --- | --- | --- | --- |
| M0 | Governance and architecture foundation | Fondazioni di governance e architettura | License, repository metadata, docs, ADR and CI baseline exist |
| M1 | Browser shell and canonical contracts | Shell browser e contratti canonici | MV3 extension loads; mocked page becomes a valid `Listing` |
| M2 | Deterministic rule engine | Rule engine deterministico | Versioned rules validate and evaluate reproducibly |
| M3 | Detectors, evidence and risk UI | Detector, evidenze e UI rischio | Priority detectors have full fixture matrices and explanation view |
| M4 | First Vinted adapter | Primo adapter Vinted | Non-invasive extraction is documented and tested on a supported page shape |
| M5 | Subito and eBay adapters | Adapter Subito ed eBay | Shared adapter conformance suite passes |
| M6 | Local tool and local OCR | Tool locale e OCR locale | URL/HTML/text/screenshot flow exports local JSON/Markdown reports |
| M7 | Optional AI gateway BYOK | AI gateway BYOK opzionale | Explicit consent, local secure storage boundary and provider contract verified |
| M8 | Local AI providers | Provider AI locali | Cloud-free optional provider path available |
| M9 | Android companion | Companion Android | Reuses core without continuous capture or assumed unrestricted overlay |
| M10 | iOS companion | Companion iOS | Uses only supported extension/share capabilities |
| M11 | Rule registry ecosystem | Ecosistema registro regole | Signed/versioned community rule distribution with review policy |

## M1 implementation sequence | Sequenza di implementazione M1

1. Select the Node and TypeScript toolchain and lock supported runtime versions.
2. Create `packages/core` types and a fixture loader before any detector.
3. Add the MV3 manifest, a manual Analyze action, a content-script adapter interface and a side-panel placeholder.
4. Add lint, formatting, typecheck and test runners to CI.
5. Prove the complete mock-page-to-`Listing` path with an integration test.

1. Selezionare toolchain Node e TypeScript e fissare le versioni runtime supportate.
2. Creare i tipi di `packages/core` e un fixture loader prima di qualsiasi detector.
3. Aggiungere manifest MV3, azione manuale Analyze, interfaccia adapter content-script e placeholder side panel.
4. Aggiungere lint, formattazione, typecheck e test runner alla CI.
5. Dimostrare il percorso completo mock-page-to-`Listing` con un integration test.

## Priority fixture matrix | Matrice prioritaria delle fixture

| Detector | Positive | Negative | Borderline |
| --- | --- | --- | --- |
| PHOTO_ONLY | PS5 claim with buried "selling photo" clause | Explicit artistic photograph | Disclosure in title |
| SUBSTITUTE_ITEM | Charizard claim with common-card delivery | Correctly named accessory | Ambiguous bundle |
| PRICE_BAIT | Unrealistically low price plus mismatch | Discounted but coherent item | Low price with partial disclosure |
| UNOFFICIAL_AUCTION | "Highest offer wins" wording | Official platform auction flow | Informal price negotiation |
| EXTERNAL_PAYMENT | Telegram, WhatsApp or off-platform transfer request | Platform payment mention | External contact without payment request |
| OBJECT_MISMATCH | Title, image and conditions conflict | Consistent listing | Incomplete listing |
| DISCLOSURE_BURIED | Material condition far from main claim | Clear up-front condition | Short description with condition |

La matrice definisce per ogni detector una fixture positiva, negativa e borderline. Non si deve aumentare lo score per una singola parola priva di contesto.
