# Product requirements | Requisiti di prodotto

## Product objective | Obiettivo di prodotto

Given a supported listing page or user-supplied content, BUYGUARD must identify defined misleading, authenticity, spam, platform-policy, regulatory, legal and safety concerns; show traceable evidence and uncertainty; and prepare the user for a safe next action. The complete base flow must work without AI, a remote account or an API key.

Data una pagina annuncio supportata o contenuto fornito dall'utente, BUYGUARD deve identificare possibili problemi definiti di contenuto fuorviante, autenticita, spam, policy piattaforma, regolamentazione, legge e sicurezza; mostrare evidenze tracciabili e incertezza; e preparare l'utente a un passo successivo sicuro. Il flusso base completo deve funzionare senza AI, account remoto o API key.

## Primary users | Utenti principali

- A buyer reviewing a listing before contacting, paying or meeting a seller.
- A user who has found a suspicious listing and needs help preserving evidence and reporting it.
- A consumer-support or trust-and-safety researcher reviewing sanitized individual cases without mass scraping.

- Un acquirente che valuta un annuncio prima di contattare, pagare o incontrare un venditore.
- Un utente che ha trovato un annuncio sospetto e necessita aiuto per conservare evidenze e segnalarlo.
- Un ricercatore di tutela consumatori o trust and safety che valuta singoli casi sanificati senza scraping massivo.

## Functional requirements | Requisiti funzionali

### Ingestion and normalization | Acquisizione e normalizzazione

1. Extract visible title, price, description, category, relevant links, visible seller information, image references and provenance from supported pages.
2. Accept user-supplied text, saved HTML and screenshots in local or desktop flows.
3. Never automatically follow external links or fetch arbitrary URLs in the core path.
4. Preserve field provenance and capture time in the canonical listing.

1. Estrarre titolo, prezzo, descrizione, categoria, link rilevanti, informazioni visibili del venditore, riferimenti immagini e provenienza dalle pagine supportate.
2. Accettare testo, HTML salvato e screenshot forniti dall'utente nei flussi locale o desktop.
3. Non seguire automaticamente link esterni e non recuperare URL arbitrari nel percorso core.
4. Conservare provenienza dei campi e orario di acquisizione nell'annuncio canonico.

### Deterministic analysis | Analisi deterministica

1. Evaluate human-readable and versioned rules without network access.
2. Combine multiple independent signals for serious findings instead of escalating on a single ambiguous keyword.
3. Support at least PHOTO_ONLY, SUBSTITUTE_ITEM, PRICE_BAIT, UNOFFICIAL_AUCTION, EXTERNAL_PAYMENT, OBJECT_MISMATCH and DISCLOSURE_BURIED for the first detector release.
4. Extend the taxonomy with authenticity, spam or abuse, policy, regulatory and safety concerns only when each category has a written definition and fixtures.
5. Return detector ID, concern, severity, calibrated confidence, evidence, rationale, limitations and suggested actions.

1. Valutare regole leggibili e versionate senza accesso di rete.
2. Combinare piu segnali indipendenti per i finding gravi invece di aumentare la gravita per una singola parola ambigua.
3. Supportare almeno PHOTO_ONLY, SUBSTITUTE_ITEM, PRICE_BAIT, UNOFFICIAL_AUCTION, EXTERNAL_PAYMENT, OBJECT_MISMATCH e DISCLOSURE_BURIED nella prima release dei detector.
4. Estendere la tassonomia con problemi di autenticita, spam o abuso, policy, regolamentazione e sicurezza solo quando ogni categoria ha definizione scritta e fixture.
5. Restituire ID detector, problema, gravita, confidenza calibrata, evidenze, motivazione, limiti e azioni suggerite.

### Signals and explanations | Segnali e spiegazioni

1. Render a compact signal in the browser and a detailed side panel.
2. Do not rely on color alone; include an icon, severity word and short label.
3. Highlight exact supporting evidence and clearly separate observation, interpretation and missing information.
4. Keep LOW quiet, show MEDIUM in context, make HIGH and CRITICAL prominent, and remain non-blocking by default.
5. Let the user dismiss, mute or provide false-positive feedback without changing the listing or account.

1. Mostrare un segnale compatto nel browser e un side panel dettagliato.
2. Non affidarsi solo al colore; includere icona, parola di gravita ed etichetta breve.
3. Evidenziare le evidenze esatte e separare chiaramente osservazione, interpretazione e informazioni mancanti.
4. Mantenere LOW discreto, mostrare MEDIUM nel contesto, rendere HIGH e CRITICAL evidenti e restare non bloccante per default.
5. Consentire all'utente di ignorare, silenziare o inviare feedback di falso positivo senza modificare annuncio o account.

### Reporting assistance | Assistenza alla segnalazione

1. Resolve a versioned policy or legal guidance pack for the platform, locale, jurisdiction and concern.
2. Show source links, reviewed date, applicability and stale or unavailable states.
3. Produce a report packet with evidence checklist, official reporting route, step-by-step instructions and editable factual text in Italian and English.
4. Never submit a report, contact a seller or perform an account action automatically.
5. Never state that BUYGUARD has determined fraud, illegality, counterfeit status or safety.

1. Risolvere un pacchetto policy o guida legale versionato per piattaforma, lingua o area, giurisdizione e problema.
2. Mostrare link fonte, data di revisione, applicabilita e stato obsoleto o non disponibile.
3. Produrre un pacchetto di segnalazione con checklist evidenze, percorso ufficiale, istruzioni passo passo e testo fattuale modificabile in italiano e inglese.
4. Non inviare automaticamente una segnalazione, contattare un venditore o eseguire azioni sull'account.
5. Non dichiarare che BUYGUARD ha determinato frode, illegalita, contraffazione o sicurezza.

### Optional AI review | Revisione AI opzionale

1. Keep cloud AI disabled until the user configures a provider and explicitly chooses a review.
2. Support BYOK first; support delegated provider login only when an official third-party authorization flow exists.
3. Never request or store consumer account passwords and never assume a consumer subscription includes API access.
4. Show provider, transmitted fields, image inclusion, purpose and known cost or retention implications before sending.
5. Label AI observations separately and retain deterministic findings when AI disagrees or fails.
6. Support local model adapters in a later phase.

1. Mantenere la AI cloud disabilitata finche l'utente configura un provider e sceglie esplicitamente una revisione.
2. Supportare prima BYOK; supportare login delegato solo quando esiste un flusso ufficiale di autorizzazione per terze parti.
3. Non richiedere o salvare password di account consumer e non presumere che un abbonamento consumer includa accesso API.
4. Mostrare provider, campi trasmessi, inclusione immagini, scopo e implicazioni note su costo o conservazione prima dell'invio.
5. Etichettare separatamente le osservazioni AI e conservare i finding deterministici quando la AI non concorda o fallisce.
6. Supportare adapter per modelli locali in una fase successiva.

## Product surfaces | Superfici di prodotto

| Surface | Required role | Not allowed by default / Non consentito per default |
| --- | --- | --- |
| Browser extension / Estensione browser | Analyze the visible supported listing and show signals | Broad host access, account actions, hidden auto-analysis |
| Website / Sito web | Analyze pasted or uploaded content and review reports | Arbitrary server-side URL fetching, silent retention |
| Desktop app / App desktop | Local files, screenshots, OCR, report archive | Cloud dependency for base analysis |
| CLI / CLI | Reproducible local analysis and developer fixtures | Mass marketplace scraping |
| Android / Android | User-initiated share or supported browser flow | Continuous screen capture, assumed unrestricted overlay |
| iOS / iOS | User-initiated share and supported extension flow | Assumed global overlay or unsupported system access |

## Quality requirements | Requisiti di qualita

- At least 90% precision for HIGH and CRITICAL alerts on a locked representative evaluation set before a detector is marketed as production-ready.
- At least 80% recall on the defined priority patterns and no more than 5% false positives on the benign evaluation corpus.
- Confidence calibration reported separately from precision and recall.
- Every serious finding contains traceable evidence and explicit limitations.
- Every policy or legal instruction has a source and reviewed date.
- Every release publishes supported platform, language, concern and dataset scope.

- Almeno 90% di precision per alert HIGH e CRITICAL su un set di valutazione rappresentativo e bloccato prima che un detector sia presentato come pronto per produzione.
- Almeno 80% di recall sui pattern prioritari definiti e non oltre 5% di falsi positivi sul corpus benigno di valutazione.
- Calibrazione della confidenza riportata separatamente da precision e recall.
- Ogni finding grave contiene evidenze tracciabili e limiti espliciti.
- Ogni istruzione policy o legale ha fonte e data di revisione.
- Ogni release pubblica piattaforma, lingua, problema e perimetro dataset supportati.

## Success and non-success | Successo e non-successo

Success is a faster, more complete and better-supported user decision and report. Success is not a promise that a platform removes a listing, a regulator acts, a purchase is reimbursed, or every harmful listing is detected.

Il successo e una decisione e una segnalazione utente piu rapide, complete e supportate. Il successo non e la promessa che una piattaforma rimuova un annuncio, un'autorita intervenga, un acquisto venga rimborsato o ogni annuncio dannoso venga rilevato.
