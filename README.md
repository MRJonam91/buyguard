# BUYGUARD

> Privacy-first browser extension and local toolkit for spotting potentially misleading marketplace listings, price bait, hidden conditions and risky purchase patterns - rule-based first, optional AI later.

> Estensione browser e toolkit locale orientati alla privacy per segnalare annunci potenzialmente fuorvianti, price bait, condizioni nascoste e pattern di acquisto rischiosi - prima regole deterministiche, AI opzionale in seguito.

## Project status | Stato del progetto

BUYGUARD has completed the repository foundation and is developing **M1: canonical contracts and the Manifest V3 browser shell**. The current extension can extract limited page metadata for the M1 development flow; it does not yet provide production-grade marketplace detectors, legal or policy guidance, OCR, AI review, or safety guarantees.

BUYGUARD ha completato le fondazioni della repository e sta sviluppando **M1: contratti canonici e shell browser Manifest V3**. L'estensione attuale puo estrarre metadati limitati della pagina per il flusso di sviluppo M1; non offre ancora detector marketplace pronti per la produzione, guide legali o policy, OCR, revisione AI o garanzie di sicurezza.

## What BUYGUARD will do | Cosa fara BUYGUARD

- Analyze a listing page locally and show evidence-led visual and textual signals.
- Start with Chrome, Chromium and Edge through Manifest V3.
- Run deterministic detectors first: PHOTO_ONLY, SUBSTITUTE_ITEM, PRICE_BAIT, UNOFFICIAL_AUCTION, EXTERNAL_PAYMENT, OBJECT_MISMATCH and DISCLOSURE_BURIED.
- Prepare sourced, editable report guidance for supported marketplace and jurisdiction contexts.
- Provide web, desktop and local tools for user-supplied HTML, screenshots and text, with safe URL handling.
- Keep cloud AI disabled by default and optional through a replaceable provider gateway.

- Analizzare localmente una pagina di annuncio e mostrare segnali visivi e testuali basati su evidenze.
- Partire da Chrome, Chromium e Edge tramite Manifest V3.
- Usare prima detector deterministici: PHOTO_ONLY, SUBSTITUTE_ITEM, PRICE_BAIT, UNOFFICIAL_AUCTION, EXTERNAL_PAYMENT, OBJECT_MISMATCH e DISCLOSURE_BURIED.
- Preparare guide alla segnalazione documentate e modificabili per contesti marketplace e giurisdizioni supportate.
- Offrire strumenti web, desktop e locali per HTML, screenshot e testo forniti dall'utente, con gestione sicura degli URL.
- Mantenere la AI cloud disabilitata per impostazione predefinita e opzionale tramite un provider gateway sostituibile.

## Principles | Principi

1. **Browser-first and local-first.** The browser extension is the first product. Mobile companions come later and reuse the core.
2. **No AI required.** The MVP works without an account, API key or AI request.
3. **Evidence, not accusations.** A risk signal explains its evidence and never labels a seller as a fraudster or makes legal conclusions.
4. **Human-controlled reporting.** BUYGUARD prepares evidence and instructions; the user reviews and submits through official channels.
5. **Platform respect.** No botting, mass scraping, protection bypasses, automatic purchases, credential capture, keylogging or continuous screen recording.
6. **Minimal data.** Listing content is not stored by default; telemetry is opt-in and minimized.

1. **Browser-first e local-first.** L'estensione browser e il primo prodotto. I companion mobile arriveranno dopo e riuseranno il core.
2. **AI non richiesta.** L'MVP funziona senza account, API key o richieste AI.
3. **Evidenze, non accuse.** Un segnale di rischio spiega le proprie evidenze e non definisce un venditore truffatore ne trae conclusioni legali.
4. **Segnalazione controllata dalla persona.** BUYGUARD prepara evidenze e istruzioni; l'utente verifica e invia tramite i canali ufficiali.
5. **Rispetto delle piattaforme.** Niente bot, scraping massivo, bypass di protezioni, acquisti automatici, cattura credenziali, keylogging o registrazione continua dello schermo.
6. **Dati minimi.** Il contenuto degli annunci non viene salvato per default; la telemetria e opt-in e ridotta al minimo.

## Architecture | Architettura

The monorepo separates applications, platform adapters and reusable analysis packages. The canonical data flow is:

`Page or local input -> platform adapter -> canonical Listing -> deterministic analysis -> policy context -> signals and report guidance -> optional AI review`

`Pagina o input locale -> adapter piattaforma -> Listing canonico -> analisi deterministica -> contesto policy -> segnali e guida alla segnalazione -> revisione AI opzionale`

Read [ARCHITECTURE.md](ARCHITECTURE.md) for boundaries, [docs/PRODUCT_REVIEW_V3.md](docs/PRODUCT_REVIEW_V3.md) for the revised product, and [docs/impact-and-evaluation.md](docs/impact-and-evaluation.md) for the meaning of the 90% target.

Leggere [ARCHITECTURE.md](ARCHITECTURE.md) per i confini, [docs/PRODUCT_REVIEW_V3.md](docs/PRODUCT_REVIEW_V3.md) per il prodotto rivisto e [docs/impact-and-evaluation.md](docs/impact-and-evaluation.md) per il significato del target 90%.

Official-source research and the first editable reporting guides are in [docs/research](docs/research) and [docs/reporting-playbooks](docs/reporting-playbooks).

La ricerca su fonti ufficiali e le prime guide modificabili alla segnalazione sono in [docs/research](docs/research) e [docs/reporting-playbooks](docs/reporting-playbooks).

## Repository layout | Struttura della repository

```text
apps/       Product entry points: extension, local tool, future mobile companions
packages/   Reusable domain and analysis modules
docs/       Product requirements, detector specifications, platform rules and ADRs
fixtures/   Sanitized positive, negative and borderline test listings
tests/      Cross-package integration and end-to-end tests
.github/    CI, security automation and repository templates
```

## Privacy and security | Privacy e sicurezza

Read [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md) and [THREAT_MODEL.md](THREAT_MODEL.md) before implementing a connector, persistence layer or AI provider. AI and outbound network actions require an explicit user choice and a clear disclosure of the data sent.

Leggere [PRIVACY.md](PRIVACY.md), [SECURITY.md](SECURITY.md) e [THREAT_MODEL.md](THREAT_MODEL.md) prima di implementare un connettore, un livello di persistenza o un provider AI. La AI e le azioni di rete in uscita richiedono una scelta esplicita dell'utente e una chiara informativa sui dati inviati.

## License and contributions | Licenza e contributi

Code and documentation are licensed under [Apache-2.0](LICENSE). This permits reuse under its terms; it is not a promise that copying is impossible. Brand use is covered separately in [TRADEMARK.md](TRADEMARK.md). See [COPYRIGHT.md](COPYRIGHT.md), [NOTICE](NOTICE) and [CONTRIBUTING.md](CONTRIBUTING.md).

Codice e documentazione sono concessi con [Apache-2.0](LICENSE). La licenza permette il riuso alle proprie condizioni; non promette che la copia sia impossibile. L'uso del brand e disciplinato separatamente in [TRADEMARK.md](TRADEMARK.md). Vedere [COPYRIGHT.md](COPYRIGHT.md), [NOTICE](NOTICE) e [CONTRIBUTING.md](CONTRIBUTING.md).

## Limitations and disclaimer | Limiti e disclaimer

BUYGUARD provides decision-support signals, not legal, financial, safety or fraud determinations. A LOW score is not a guarantee; a HIGH score is not proof of wrongdoing. Users remain responsible for reviewing a listing and using marketplace safeguards.

BUYGUARD fornisce segnali di supporto alla decisione, non determinazioni legali, finanziarie, di sicurezza o di frode. Un punteggio LOW non e una garanzia; un punteggio HIGH non e prova di illecito. L'utente resta responsabile della valutazione dell'annuncio e dell'uso delle tutele del marketplace.
