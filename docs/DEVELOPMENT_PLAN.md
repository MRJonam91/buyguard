# Development plan | Piano di sviluppo

## Delivery rule | Regola di consegna

Each milestone must leave the repository buildable, tested and documented. A detector is complete only with a written definition, positive, negative and borderline fixtures, unit tests, rationale, evidence trace, limitations and benchmark results. A policy or legal-guidance change is complete only with official sources, applicability, reviewed date and expiry behavior.

Ogni milestone deve lasciare la repository compilabile, testata e documentata. Un detector e completo solo con definizione scritta, fixture positive, negative e borderline, unit test, motivazione, traccia evidenze, limiti e risultati benchmark. Una modifica a policy o guida legale e completa solo con fonti ufficiali, applicabilita, data di revisione e comportamento alla scadenza.

## Milestones | Milestone

| Milestone | Outcome in English | Risultato in italiano | Exit criteria |
| --- | --- | --- | --- |
| M0 complete | Governance, license and architecture foundation | Fondazioni di governance, licenza e architettura | Public repository metadata, Apache-2.0, docs and CI baseline |
| M1 in progress | Canonical listing contracts and minimal MV3 shell | Contratti annuncio canonico e shell MV3 minima | Extension loads, explicit permission flow, supported mock page becomes a valid `Listing`, tests pass |
| M1.1 | Revised concern and assistance contracts | Contratti rivisti per problemi e assistenza | `Concern`, multiple suggested actions, analyzer version, report packet and protocol migration tests |
| M2 | Deep deterministic analysis facade and evaluation harness | Facade profonda di analisi deterministica e sistema di valutazione | One `analyze` interface, versioned dataset, metrics and calibration report |
| M3 | Priority deception and payment detectors | Detector prioritari per inganno e pagamenti | PHOTO_ONLY, SUBSTITUTE_ITEM, PRICE_BAIT, UNOFFICIAL_AUCTION, EXTERNAL_PAYMENT, OBJECT_MISMATCH and DISCLOSURE_BURIED meet release gates |
| M4 | Vinted adapter, accessible signals and reporting playbook | Adapter Vinted, segnali accessibili e guida alla segnalazione | Supported page shapes documented; in-page signal and side panel work; official route and sourced draft available |
| M5 | eBay and Subito adapters and policy packs | Adapter eBay e Subito e pacchetti policy | Shared adapter conformance suite; versioned official reporting paths; stale-pack behavior |
| M6 | Authenticity, spam, prohibited-item and safety families | Famiglie autenticita, spam, oggetti vietati e sicurezza | Each concern has definition, evidence requirements, limitations and independent quality report |
| M7 | Website, desktop app, CLI and local OCR | Sito, app desktop, CLI e OCR locale | Pasted/uploaded inputs work locally; URL handling threat model; JSON/Markdown report export |
| M8 | Jurisdiction-aware DSA and legal-guidance assistance | Assistenza DSA e guida legale consapevole della giurisdizione | Policy vs alleged-illegal path separated; user confirms jurisdiction and good faith; no auto-submission |
| M9 | Optional AI review with BYOK | Revisione AI opzionale con BYOK | Deterministic baseline remains complete; OpenAI, Anthropic and Gemini API-key adapters; explicit transmission preview |
| M9.1 | Google delegated authorization | Autorizzazione delegata Google | Per-platform OAuth clients, minimum scopes, secure token handling and provider review; no implied ChatGPT or Claude login |
| M10 | Local AI providers | Provider AI locali | Cloud-free optional AI review with same interface and privacy controls |
| M11 | Android and iOS companions | Companion Android e iOS | User-initiated share/extension flow, no continuous capture, platform-policy review |
| M12 | Reviewed rule and playbook registry | Registro revisionato di regole e guide | Signed/versioned distribution, maintainer review, source-expiry process and rollback |

## Immediate implementation sequence | Sequenza di implementazione immediata

1. Keep the existing M1 extraction and message tests green.
2. Add the domain migration as a backward-compatible protocol revision: concern taxonomy, analyzer version and multiple suggested actions.
3. Create `packages/analysis-engine` as the only product-facing analysis interface; compose existing rule, detector, evidence and risk modules behind it.
4. Create the evaluation dataset schema before implementing scoring, so the 90% precision target is testable from the first detector.
5. Implement the seven priority detectors test-first, beginning with PHOTO_ONLY and EXTERNAL_PAYMENT because their evidence can be made highly specific.
6. Implement accessible visual signals and a static mock reporting playbook before live marketplace policy packs.
7. Add the Vinted adapter and sourced playbook only after current official procedures are represented as versioned data.

1. Mantenere verdi i test M1 esistenti su estrazione e messaggi.
2. Aggiungere la migrazione di dominio come revisione retrocompatibile del protocollo: tassonomia problemi, versione analyzer e azioni suggerite multiple.
3. Creare `packages/analysis-engine` come unica interfaccia di analisi per i prodotti; comporre dietro di essa i moduli regole, detector, evidenze e rischio esistenti.
4. Creare lo schema del dataset di valutazione prima dello scoring, cosi il target 90% di precision e verificabile dal primo detector.
5. Implementare test-first i sette detector prioritari, iniziando da PHOTO_ONLY ed EXTERNAL_PAYMENT perche le loro evidenze possono essere molto specifiche.
6. Implementare segnali visivi accessibili e una guida di segnalazione mock statica prima dei pacchetti policy live.
7. Aggiungere adapter Vinted e guida documentata solo dopo aver rappresentato le procedure ufficiali correnti come dati versionati.

## Detector release gates | Criteri di rilascio detector

| Gate | Requirement / Requisito |
| --- | --- |
| Definition | Narrow written condition and explicit non-claims / Condizione scritta ristretta e non-affermazioni esplicite |
| Evidence | Every HIGH or CRITICAL result has auditable evidence / Ogni risultato HIGH o CRITICAL ha evidenza verificabile |
| Quality | >= 90% precision, >= 80% recall and <= 5% benign false positives on the declared evaluation scope |
| Calibration | Displayed confidence has measured calibration; otherwise show qualitative confidence only / La confidenza mostrata ha calibrazione misurata; altrimenti mostrare solo confidenza qualitativa |
| Coverage | Platform, language, category, sample size and unsupported cases published / Piattaforma, lingua, categoria, numerosita e casi non supportati pubblicati |
| Safety | No seller verdict, legal conclusion or automatic report / Nessun verdetto sul venditore, conclusione legale o segnalazione automatica |

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

## Evidence needed before impact claims | Evidenze necessarie prima delle affermazioni di impatto

Do not market the improvement hypotheses in [impact-and-evaluation.md](impact-and-evaluation.md) as measured benefits. First publish the benchmark dataset version, test method, participant count, confidence intervals and deterministic-only versus AI-assisted results.

Non presentare le ipotesi di miglioramento in [impact-and-evaluation.md](impact-and-evaluation.md) come benefici misurati. Pubblicare prima versione del dataset benchmark, metodo di test, numero di partecipanti, intervalli di confidenza e risultati solo deterministici rispetto a quelli assistiti da AI.
