# Initial threat model | Modello di minaccia iniziale

## Assets | Asset

User browsing context, listing content, local reports, optional API credentials, extension permissions, rule integrity and the trustworthiness of explanations are the primary assets.

Contesto di navigazione utente, contenuto degli annunci, report locali, credenziali API opzionali, permessi dell'estensione, integrita delle regole e affidabilita delle spiegazioni sono gli asset principali.

## Threats and controls | Minacce e controlli

| Threat | Control in English | Controllo in italiano |
| --- | --- | --- |
| Malicious listing text attempts to mislead the analyzer | Treat content as data, cap resource use, retain evidence provenance | Trattare il contenuto come dato, limitare risorse, mantenere provenienza delle evidenze |
| XSS or compromised page influences extension UI | Isolate extension UI, sanitize all rendered content, strict CSP | Isolare la UI dell'estensione, sanificare tutto il contenuto reso, CSP rigorosa |
| Overbroad platform access | Minimize host permissions and document each adapter's access | Minimizzare host permission e documentare l'accesso di ogni adapter |
| Secret exposure | Never commit keys; use local secure storage only after explicit opt-in | Non committare chiavi; usare secure storage locale solo dopo opt-in esplicito |
| Harmful false positive | Show evidence, confidence and non-accusatory language; keep user in control | Mostrare evidenze, confidenza e linguaggio non accusatorio; mantenere il controllo all'utente |
| Supply-chain compromise | Pin, review and scan dependencies; protect release path | Fissare, revisionare e scansionare dipendenze; proteggere il percorso release |
| Unsafe external links | Analyze metadata without automatic navigation | Analizzare metadati senza navigazione automatica |
| Stale or wrong legal guidance | Version sources, require jurisdiction, expire packs and show unavailable states | Versionare fonti, richiedere giurisdizione, far scadere i pacchetti e mostrare stati non disponibili |
| Coordinated or abusive reporting | Require human review, prevent auto-submit and detect duplicate packets | Richiedere revisione umana, impedire invio automatico e rilevare pacchetti duplicati |
| Prompt injection through listing text | Treat listing and OCR text as data, delimit it and reject provider tool instructions | Trattare testo annuncio e OCR come dati, delimitarlo e rifiutare istruzioni tool del provider |
| AI credential exposure | Keep secrets outside page DOM/content scripts and out of logs and reports | Mantenere segreti fuori da DOM/content script e da log e report |
| URL-fetch SSRF | No arbitrary fetch by default; isolate and restrict any future fetch service | Nessun fetch arbitrario per default; isolare e limitare ogni futuro servizio di fetch |

## Out of scope | Fuori ambito

BUYGUARD does not promise to identify all scams, verify sellers, adjudicate legality, establish counterfeit status, guarantee platform action or protect a user from every marketplace risk.

BUYGUARD non promette di identificare tutte le truffe, verificare i venditori, giudicare la legalita, stabilire contraffazione, garantire azioni della piattaforma o proteggere l'utente da ogni rischio marketplace.
