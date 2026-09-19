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

## Out of scope | Fuori ambito

BUYGUARD does not promise to identify all scams, verify sellers, adjudicate legality or protect a user from every marketplace risk.

BUYGUARD non promette di identificare tutte le truffe, verificare i venditori, giudicare la legalita o proteggere l'utente da ogni rischio marketplace.
