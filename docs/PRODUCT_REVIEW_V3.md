# BUYGUARD product review v3 | Revisione prodotto BUYGUARD v3

## Revised product thesis | Tesi di prodotto rivista

BUYGUARD should be a practical buyer-assistance layer, not only a scam keyword detector. It should help people recognize misleading, spam-like, authenticity-related, policy-related, regulatory, legal, and safety concerns; understand the evidence; decide what to do; and prepare a factual report through the correct official channel.

BUYGUARD deve essere un livello pratico di assistenza all'acquirente, non solo un detector di parole tipiche delle truffe. Deve aiutare le persone a riconoscere possibili problemi di annuncio fuorviante, spam, autenticita, policy, regolamentazione, legge e sicurezza; comprenderne le evidenze; decidere cosa fare; e preparare una segnalazione fattuale tramite il corretto canale ufficiale.

The base product remains useful with no AI, no account, and no API key. Optional AI can review ambiguous context after deterministic analysis, but it cannot silently replace rules, sources, evidence, or user judgment.

Il prodotto base resta utile senza AI, account o API key. La AI opzionale puo rivedere contesti ambigui dopo l'analisi deterministica, ma non puo sostituire in modo invisibile regole, fonti, evidenze o giudizio dell'utente.

## User outcomes | Risultati per l'utente

1. **See the signal | Vedere il segnale.** A badge, icon and plain-language label appear near the listing and in an accessible side panel; color is never the only carrier of meaning.
2. **Understand why | Capire il perche.** The panel highlights the exact text, field, image observation, price relationship or link that triggered each finding.
3. **Understand uncertainty | Capire l'incertezza.** Severity, calibrated confidence, missing information and limitations are shown separately.
4. **Choose a safe next step | Scegliere il passo successivo.** The tool can suggest pausing, asking a factual question, checking platform protections, preserving evidence, or using an official report path.
5. **Prepare a report | Preparare una segnalazione.** A report packet contains an evidence checklist, the relevant platform category, step-by-step instructions and editable factual text in Italian and English.
6. **Retain control | Mantenere il controllo.** The user decides whether to open the official reporting flow, copy the draft, use AI review, export the report, or dismiss the signal.

## Concern catalogue | Catalogo dei problemi

| Concern | Deterministic signals | Safe product wording |
| --- | --- | --- |
| Misleading listing / Annuncio fuorviante | Claim-disclosure mismatch, buried material terms, substitution, price bait | "The effective offer may differ from the main claim" / "L'offerta effettiva potrebbe differire dall'affermazione principale" |
| Authenticity / Autenticita | Contradictory brand/model data, suspicious wording, image-text mismatch, missing expected identifiers | "Additional authenticity verification is recommended" / "Si consiglia una verifica aggiuntiva dell'autenticita" |
| Spam or abuse / Spam o abuso | Near-duplicate text, link promotion, repeated contact patterns, irrelevant keyword stuffing | "This listing shows patterns associated with spam or abusive promotion" / "L'annuncio mostra pattern associati a spam o promozione abusiva" |
| Platform policy / Policy piattaforma | Versioned rule match for prohibited item or conduct | "This may conflict with the cited marketplace rule" / "Potrebbe essere in conflitto con la regola marketplace citata" |
| Regulatory or legal / Regolatorio o legale | Jurisdiction-specific rule match with required facts missing or present | "This may require review under the cited rule; BUYGUARD does not determine legality" / "Potrebbe richiedere verifica rispetto alla regola citata; BUYGUARD non determina la legalita" |
| Product or transaction safety / Sicurezza | Recall notice, dangerous modification wording, off-platform payment, credential request, suspicious link | "Pause and verify before proceeding" / "Interrompere e verificare prima di procedere" |

## Product surfaces and order | Superfici di prodotto e ordine

### 1 Browser extension | Estensione browser

The primary product for Vinted, eBay, Subito and later supported marketplaces. It can analyze the visible page manually or, with explicit settings, automatically. It should render a compact in-page signal and a detailed side panel without modifying the listing or account.

Prodotto principale per Vinted, eBay, Subito e successivi marketplace supportati. Puo analizzare manualmente la pagina visibile o, tramite impostazione esplicita, automaticamente. Deve mostrare un segnale compatto nella pagina e un side panel dettagliato senza modificare annuncio o account.

### 2 Web analyzer | Analizzatore web

Accept pasted text, a saved HTML file, screenshots and user-supplied listing data. Direct URL retrieval requires a separately designed network service because browsers cannot safely and universally fetch arbitrary marketplace URLs; server-side URL fetching would require strict SSRF, privacy and platform-policy controls.

Accetta testo incollato, file HTML salvato, screenshot e dati dell'annuncio forniti dall'utente. Il recupero diretto di URL richiede un servizio di rete progettato separatamente, perche il browser non puo recuperare in modo sicuro e universale URL marketplace arbitrari; il fetch server-side richiederebbe controlli rigorosi contro SSRF, per privacy e per policy delle piattaforme.

### 3 Desktop application and CLI | Applicazione desktop e CLI

Provide the strongest local-only workflow for batch-free manual analysis, saved pages, screenshots, OCR and export. It should share the same canonical contracts, engines, policy packs and evaluation fixtures as the extension.

Offre il flusso local-only piu completo per analisi manuale non massiva, pagine salvate, screenshot, OCR ed export. Deve condividere contratti canonici, motori, pacchetti policy e fixture di valutazione con l'estensione.

### 4 Android and iOS | Android e iOS

Start with share-sheet, supported browser extension and explicit user-selected content flows. Android accessibility or overlay capabilities require a separate policy and privacy review; iOS must use official extension and sharing capabilities. Neither app should continuously capture the screen.

Partire da share sheet, estensione browser supportata e flussi su contenuti selezionati esplicitamente dall'utente. Accessibility o overlay Android richiedono una revisione separata di policy e privacy; iOS deve usare capacita ufficiali di estensione e condivisione. Nessuna app deve catturare continuamente lo schermo.

## No-AI analysis | Analisi senza AI

The deterministic pipeline should combine normalized DOM fields, rule evaluation, text-distance and disclosure-position analysis, price consistency, URL/domain analysis, duplicate similarity, local OCR, category constraints, policy packs and risk aggregation. A single keyword cannot produce a serious verdict; strong alerts require independent evidence or a highly specific rule.

La pipeline deterministica deve combinare campi DOM normalizzati, valutazione regole, analisi della distanza testuale e posizione delle disclosure, coerenza del prezzo, analisi URL/dominio, similarita duplicati, OCR locale, vincoli di categoria, pacchetti policy e aggregazione rischio. Una singola parola chiave non puo produrre un verdetto grave; gli alert forti richiedono evidenze indipendenti o una regola altamente specifica.

Recommended detection families include lexical patterns, finite-state phrase rules, structured constraint checks, robust price statistics, similarity hashing or embeddings computed locally, image metadata and OCR consistency, and an ensemble score calibrated on held-out fixtures.

Le famiglie di rilevamento consigliate includono pattern lessicali, regole di frase a stati finiti, controlli strutturati di vincoli, statistiche robuste sui prezzi, similarity hashing o embedding calcolati localmente, coerenza tra metadati immagine e OCR e score ensemble calibrato su fixture tenute separate.

## Optional AI review | Revisione AI opzionale

Three future connection modes are allowed:

1. **BYOK** using an API credential created by the user for a supported provider.
2. **Provider-authorized connection** only when the provider officially supports a delegated authorization flow for third-party applications.
3. **Local model** through an explicit local provider adapter.

Sono consentite tre future modalita di connessione:

1. **BYOK** tramite credenziale API creata dall'utente per un provider supportato.
2. **Connessione autorizzata dal provider** solo quando il provider supporta ufficialmente un flusso di autorizzazione delegata per applicazioni di terze parti.
3. **Modello locale** tramite un adapter provider locale esplicito.

A consumer ChatGPT, Claude or Gemini subscription must never be assumed to grant API access. BUYGUARD never collects provider passwords. Before any cloud call, it must show provider, data fields, purpose, retention implications and estimated cost when knowable.

Non si deve mai presumere che un abbonamento consumer ChatGPT, Claude o Gemini conceda accesso API. BUYGUARD non raccoglie password dei provider. Prima di ogni chiamata cloud deve mostrare provider, campi inviati, scopo, implicazioni di conservazione e costo stimato quando conoscibile.

## Reporting assistance | Assistenza alla segnalazione

Policy and legal guidance are data with provenance, not hard-coded UI prose. Every instruction set needs platform, locale or jurisdiction, source URL, effective or reviewed date, applicability conditions and a stale-data state. Generated report text must remain editable, factual and limited to what the evidence supports.

Le guide su policy e aspetti legali sono dati con provenienza, non testo UI hard-coded. Ogni insieme di istruzioni richiede piattaforma, lingua o giurisdizione, URL fonte, data di efficacia o revisione, condizioni di applicabilita e stato di dato obsoleto. Il testo di segnalazione generato deve restare modificabile, fattuale e limitato a quanto supportato dalle evidenze.

## Current conclusion | Conclusione attuale

The strongest product position is not "BUYGUARD proves an ad is illegal with 90% certainty." It is: "BUYGUARD detects defined high-risk patterns with measured quality, shows why, and helps the user take the correct documented next step." That proposition is useful, testable and defensible.

Il posizionamento piu forte non e "BUYGUARD dimostra con certezza al 90% che un annuncio e illegale". E: "BUYGUARD rileva pattern definiti ad alto rischio con qualita misurata, mostra il perche e aiuta l'utente a compiere il passo successivo corretto e documentato". Questa proposta e utile, testabile e difendibile.
