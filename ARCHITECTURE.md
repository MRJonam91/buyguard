# BUYGUARD architecture | Architettura BUYGUARD

## Decision | Decisione

BUYGUARD is a TypeScript monorepo with platform-specific input adapters and a platform-independent deterministic analysis core. The initial deliverable is a Manifest V3 browser extension; the local tool is a second entry point over the same core. AI, backend and mobile are deliberately excluded from the MVP critical path.

BUYGUARD e un monorepo TypeScript con adapter di input specifici per piattaforma e un core di analisi deterministico indipendente dalla piattaforma. Il primo deliverable e un'estensione browser Manifest V3; lo strumento locale e un secondo entry point sullo stesso core. AI, backend e mobile sono deliberatamente esclusi dal percorso critico dell'MVP.

## Boundaries | Confini

| Area | Responsibility in English | Responsabilita in italiano |
| --- | --- | --- |
| `apps/browser-extension` | Manifest, content scripts, side panel, consent and browser storage boundary | Manifest, content script, side panel, consenso e confine dello storage browser |
| `apps/local-tool` | Manual URL/HTML/image/text input and local report export | Input manuale URL/HTML/immagine/testo ed export locale dei report |
| `packages/core` | Canonical `Listing`, `Finding`, `Evidence` and configuration contracts | Contratti canonici `Listing`, `Finding`, `Evidence` e configurazione |
| `packages/rule-engine` | Versioned rules, pattern matching and rule evaluation | Regole versionate, pattern matching e valutazione regole |
| `packages/detectors` | Stable detector implementations and detector registry | Implementazioni stabili dei detector e relativo registro |
| `packages/evidence-engine` | Evidence spans, source references, explanation composition | Span di evidenza, riferimenti alle fonti, composizione spiegazioni |
| `packages/risk-engine` | Severity, confidence aggregation and configurable thresholds | Aggregazione gravita/confidenza e soglie configurabili |
| `packages/ocr` | Local-only OCR interface and adapters, initially optional | Interfaccia e adapter OCR solo locali, inizialmente opzionali |
| `packages/ai-gateway` | Future opt-in provider interface; no key handling in core | Interfaccia futura provider opt-in; nessuna gestione chiavi nel core |

## Canonical contract | Contratto canonico

Every adapter normalizes only visible or user-supplied content into `Listing`. A detector receives `Listing` plus evaluated rules and returns zero or more `Finding` values:

```ts
type Finding = {
  detectorId: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  confidence: number; // classifier confidence, not factual or legal certainty
  evidence: Evidence[];
  rationale: string;
  suggestedAction: string;
};
```

Ogni adapter normalizza nel `Listing` solo contenuto visibile o fornito dall'utente. Un detector riceve `Listing` e regole valutate e restituisce zero o piu valori `Finding`. `confidence` misura la confidenza del classificatore, non una certezza fattuale o giuridica.

## Data and trust flow | Flusso dei dati e della fiducia

1. The entry point obtains content following the platform's permitted interaction model.
2. The adapter extracts and labels provenance for title, price, description, category, visible seller information, links and images.
3. The core normalizes text and evaluates deterministic rules.
4. Detectors produce traceable evidence; the risk engine aggregates it without hiding individual findings.
5. The UI renders a non-accusatory explanation and optional local export.
6. Only after explicit consent may an optional AI gateway receive the minimum disclosed data.

1. L'entry point ottiene contenuto secondo il modello di interazione consentito dalla piattaforma.
2. L'adapter estrae e marca la provenienza di titolo, prezzo, descrizione, categoria, informazioni visibili del venditore, link e immagini.
3. Il core normalizza il testo e valuta regole deterministiche.
4. I detector producono evidenze tracciabili; il risk engine le aggrega senza nascondere i singoli finding.
5. La UI mostra una spiegazione non accusatoria e un export locale opzionale.
6. Solo dopo consenso esplicito un AI gateway opzionale puo ricevere il minimo di dati dichiarati.

## Non-goals for M0-M4 | Non-obiettivi per M0-M4

No hosted BUYGUARD backend, credential collection, automatic marketplace action, remote listing corpus, mobile overlay, generalized scraping or required AI integration.

Nessun backend BUYGUARD ospitato, raccolta credenziali, azione automatica sui marketplace, corpus remoto di annunci, overlay mobile, scraping generalizzato o integrazione AI obbligatoria.
