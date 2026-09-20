# BUYGUARD architecture | Architettura BUYGUARD

## Decision | Decisione

BUYGUARD is a TypeScript monorepo with multiple product surfaces over one local-first analysis and assistance core. The browser extension is the first production surface; web, desktop, CLI, Android and iOS reuse canonical contracts and versioned knowledge packs. The deterministic path is complete without AI. Cloud AI is a secondary, explicit and replaceable review path.

BUYGUARD e un monorepo TypeScript con piu superfici di prodotto sopra un unico core local-first di analisi e assistenza. L'estensione browser e la prima superficie di produzione; web, desktop, CLI, Android e iOS riusano contratti canonici e pacchetti di conoscenza versionati. Il percorso deterministico e completo senza AI. La AI cloud e un percorso secondario di revisione, esplicito e sostituibile.

## System flow | Flusso di sistema

```text
Visible page or user input / Pagina visibile o input utente
                         |
                  Platform adapter
                         |
                 Canonical Listing
                         |
       Deterministic Analysis Engine facade
       rules + detectors + evidence + risk
                         |
        Findings with evidence and limits
                         |
      Policy context + Reporting Guidance
                         |
        Signals + editable Report Packet
                         |
             Optional explicit AI review
```

The analysis result remains valid when policy guidance, AI, network access or reporting assistance is unavailable. Optional stages enrich a result; they do not silently rewrite or remove deterministic evidence.

Il risultato dell'analisi resta valido quando guide policy, AI, rete o assistenza alla segnalazione non sono disponibili. Gli stadi opzionali arricchiscono un risultato; non riscrivono o rimuovono silenziosamente le evidenze deterministiche.

## Deep modules and interfaces | Moduli profondi e interfacce

Each external seam has one small interface. Complexity such as scoring, rule ordering, policy freshness, provider differences and report wording stays inside a deep module. Tests exercise the same interfaces as product surfaces.

Ogni seam esterno ha una piccola interfaccia. Complessita come scoring, ordine delle regole, freschezza policy, differenze tra provider e formulazione delle segnalazioni resta dentro un modulo profondo. I test usano le stesse interfacce delle superfici di prodotto.

| Module | Small interface | Hidden implementation / Implementazione nascosta |
| --- | --- | --- |
| Platform adapter / Adapter piattaforma | `extract(input): Listing` | DOM selectors, page variants, provenance, normalization |
| Analysis engine / Motore analisi | `analyze(listing, options): AnalysisResult` | Rules, detector ensemble, evidence validation, severity, confidence calibration |
| Policy engine / Motore policy | `resolve(context, findings): PolicyContext` | Platform and jurisdiction packs, applicability, source freshness, unsupported states |
| Guidance engine / Motore guida | `prepare(result, policy): ReportPacket` | Evidence checklist, official path, step order, bilingual factual draft, limitations |
| AI review gateway / Gateway revisione AI | `review(request, provider): AIReview` | BYOK, provider-supported delegated authorization, redaction, provider schema, failure handling |
| Evaluation harness / Sistema di valutazione | `evaluate(build, dataset): BenchmarkReport` | Stratification, metrics, calibration, regression comparison and confidence intervals |

Only the platform seam starts with multiple adapters because Vinted, eBay, Subito and manual input actually vary. AI provider adapters become a real seam only when at least two provider implementations exist. Until then, avoid speculative provider abstractions.

Solo il seam di piattaforma parte con piu adapter perche Vinted, eBay, Subito e input manuale variano realmente. Gli adapter dei provider AI diventano un seam reale solo quando esistono almeno due implementazioni. Fino ad allora evitare astrazioni speculative sui provider.

## Repository boundaries | Confini della repository

| Area | Responsibility in English | Responsabilita in italiano |
| --- | --- | --- |
| `apps/browser-extension` | Manifest V3, explicit permissions, content adapter, in-page signal and side panel | Manifest V3, permessi espliciti, content adapter, segnale in pagina e side panel |
| `apps/web` | User-supplied text, HTML, image and report review; no arbitrary URL fetch by default | Testo, HTML, immagini e revisione report forniti dall'utente; nessun fetch URL arbitrario per default |
| `apps/desktop` | Local files, local OCR, report archive and optional CLI integration | File locali, OCR locale, archivio report e integrazione CLI opzionale |
| `apps/local-tool` | Scriptable local CLI and developer analysis entry point | CLI locale automatizzabile ed entry point di analisi per sviluppatori |
| `apps/android`, `apps/ios` | Explicit share and supported browser-extension flows; future | Flussi espliciti di condivisione ed estensione browser supportata; futuri |
| `packages/core` | Canonical `Listing`, `Finding`, `Evidence`, `AnalysisResult` and messages | Contratti canonici `Listing`, `Finding`, `Evidence`, `AnalysisResult` e messaggi |
| `packages/analysis-engine` | Stable analysis facade for every product surface | Facade di analisi stabile per ogni superficie di prodotto |
| `packages/rule-engine` | Human-readable versioned rules and deterministic evaluation | Regole versionate leggibili e valutazione deterministica |
| `packages/detectors` | Concern-specific detection implementation and registry | Implementazioni di rilevamento specifiche e registro |
| `packages/evidence-engine` | Source spans, provenance and explanation composition | Span delle fonti, provenienza e composizione spiegazioni |
| `packages/risk-engine` | Severity, ensemble score, confidence calibration and thresholds | Gravita, score ensemble, calibrazione confidenza e soglie |
| `packages/policy-engine` | Versioned marketplace and jurisdiction guidance packs | Pacchetti versionati di guide marketplace e giurisdizione |
| `packages/guidance-engine` | Reporting steps, evidence checklist and editable draft | Passi di segnalazione, checklist evidenze e bozza modificabile |
| `packages/ocr` | Optional local-only OCR interface and implementation | Interfaccia e implementazione OCR opzionale solo locale |
| `packages/ai-gateway` | Optional provider review after deterministic analysis | Revisione provider opzionale dopo l'analisi deterministica |
| `packages/evaluation` | Offline quality, calibration, regression and impact measurement | Misurazione offline di qualita, calibrazione, regressione e impatto |

## Canonical analysis contract | Contratto canonico di analisi

Every adapter normalizes visible or user-supplied content into `Listing`. The analysis engine returns a reproducible result:

Ogni adapter normalizza contenuto visibile o fornito dall'utente in `Listing`. Il motore di analisi restituisce un risultato riproducibile:

```ts
type Finding = {
  detectorId: string;
  concern: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  confidence: number;
  evidence: Evidence[];
  rationale: string;
  suggestedActions: string[];
  limitations: string[];
};

type AnalysisResult = {
  listingId: string;
  findings: Finding[];
  ruleSetVersion: string;
  analyzerVersion: string;
  analyzedAt: string;
};
```

The running M1 code currently implements the narrower initial contract. Concern taxonomy, multiple suggested actions and analyzer version are planned contract migrations and require tests and protocol-version review before implementation.

Il codice M1 in corso implementa attualmente il contratto iniziale piu ristretto. Tassonomia dei problemi, azioni suggerite multiple e versione analyzer sono migrazioni pianificate e richiedono test e revisione della versione del protocollo prima dell'implementazione.

## Policy and legal guidance as data | Guide policy e legali come dati

A policy pack records platform, locale, source URLs, reviewed date, applicability, relevant report categories and limitations. A legal guidance pack additionally records jurisdiction and the responsible official source. Expired or inapplicable packs return an explicit unavailable or stale result; they never fall back to uncited generic legal text.

Un pacchetto policy registra piattaforma, lingua o area, URL fonti, data di revisione, applicabilita, categorie di segnalazione rilevanti e limiti. Un pacchetto guida legale registra anche giurisdizione e fonte ufficiale responsabile. Pacchetti scaduti o non applicabili restituiscono uno stato esplicito non disponibile o obsoleto; non ricadono mai su testo legale generico non citato.

## Visual and textual signals | Segnali visivi e testuali

The extension uses an accessible combination of icon, label, severity word and short rationale. The detailed panel separates observed evidence, interpretation, confidence, missing information, policy context and next steps. LOW signals remain quiet; MEDIUM signals appear in the panel; HIGH and CRITICAL signals are prominent but non-blocking by default.

L'estensione usa una combinazione accessibile di icona, etichetta, parola di gravita e breve motivazione. Il pannello dettagliato separa evidenze osservate, interpretazione, confidenza, informazioni mancanti, contesto policy e passi successivi. I segnali LOW restano discreti; MEDIUM compare nel pannello; HIGH e CRITICAL sono evidenti ma non bloccanti per default.

## AI trust flow | Flusso di fiducia AI

Cloud review is disabled by default. Before transmission, the UI lists provider, exact fields, purpose and whether images are included. Credentials remain in the strongest supported local storage and are never written to reports, logs, telemetry, source control or a BUYGUARD backend. Provider output is untrusted input, must cite supplied evidence, and is visually separated from deterministic findings.

La revisione cloud e disabilitata per default. Prima dell'invio la UI elenca provider, campi esatti, scopo e presenza di immagini. Le credenziali restano nello storage locale piu sicuro supportato e non vengono mai scritte in report, log, telemetria, controllo sorgente o backend BUYGUARD. L'output del provider e input non attendibile, deve citare le evidenze fornite ed e separato visivamente dai finding deterministici.

## Non-goals | Non-obiettivi

No credential capture, automatic reporting, mass scraping, seller verdict, legal determination, automatic purchase, account action, unrestricted URL fetch, continuous screen capture, hidden cloud call or mandatory AI. A hosted backend is optional and cannot become a dependency of the core analysis path.

Nessuna cattura credenziali, segnalazione automatica, scraping massivo, verdetto sul venditore, determinazione legale, acquisto automatico, azione sull'account, fetch URL senza limiti, cattura continua dello schermo, chiamata cloud nascosta o AI obbligatoria. Un backend ospitato e opzionale e non puo diventare dipendenza del percorso di analisi core.
