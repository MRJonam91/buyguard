# Privacy | Privacy

## Default posture | Impostazione predefinita

BUYGUARD is local-first. The MVP analyzes the page content made available to the extension or the material explicitly supplied to the local tool. It does not require an account, API key, backend, cloud AI or telemetry.

BUYGUARD e local-first. L'MVP analizza il contenuto della pagina disponibile all'estensione o il materiale fornito esplicitamente allo strumento locale. Non richiede account, API key, backend, AI cloud o telemetria.

## Data rules | Regole sui dati

- Do not collect passwords, payment credentials, authentication tokens or keystrokes.
- Do not record screens continuously or store raw listings by default.
- Keep reports local unless the user explicitly exports or shares them.
- Do not send API keys to any BUYGUARD backend; store them only in an appropriate local secure storage boundary if optional BYOK is introduced.
- Before optional cloud AI, disclose provider, exact data categories, purpose and user action required to proceed.
- Telemetry, if ever added, must be opt-in, minimized, documented and deletable.

- Non raccogliere password, credenziali di pagamento, token di autenticazione o sequenze di tasti.
- Non registrare lo schermo in modo continuo e non salvare gli annunci grezzi per impostazione predefinita.
- Mantenere locali i report finche l'utente non li esporta o condivide esplicitamente.
- Non inviare API key a backend BUYGUARD; conservarle solo in un appropriato confine di secure storage locale se verra introdotto BYOK opzionale.
- Prima della AI cloud opzionale, dichiarare provider, categorie esatte di dati, scopo e azione richiesta per proseguire.
- La telemetria, se introdotta, deve essere opt-in, ridotta al minimo, documentata e cancellabile.

## User controls | Controlli utente

The product must expose settings to disable automatic analysis, clear local data, control each provider and review what leaves the device. The default is no cloud processing.

Il prodotto deve esporre impostazioni per disabilitare l'analisi automatica, cancellare dati locali, controllare ogni provider e verificare cosa lascia il dispositivo. L'impostazione predefinita e nessuna elaborazione cloud.

## Report and legal-guidance data | Dati di segnalazione e guida legale

Report packets may contain listing text, URLs, screenshots, seller identifiers visible on the listing and the user's contact details when an official notice form requires them. BUYGUARD must keep these fields local by default, let the user redact irrelevant personal data, and show the final payload before it is copied or transmitted. Jurisdiction is user-declared and must not be inferred from sensitive data when a direct question is sufficient.

I pacchetti di segnalazione possono contenere testo dell'annuncio, URL, screenshot, identificativi del venditore visibili nell'annuncio e contatti dell'utente quando richiesti da un modulo ufficiale. BUYGUARD deve mantenere questi campi locali per default, consentire l'oscuramento di dati personali irrilevanti e mostrare il payload finale prima che venga copiato o trasmesso. La giurisdizione e dichiarata dall'utente e non deve essere dedotta da dati sensibili quando e sufficiente una domanda diretta.

## Provider credentials | Credenziali provider

Browser content scripts and page code must never receive AI credentials. The website uses server-side secret handling if BYOK is offered; desktop and mobile use an operating-system credential vault or an explicitly designed secure proxy. Credentials are excluded from reports, logs, analytics, crash data and exports. A consumer subscription is not treated as an API credential.

I content script e il codice pagina non devono mai ricevere credenziali AI. Il sito usa gestione server-side dei segreti se offre BYOK; desktop e mobile usano un credential vault del sistema operativo o un proxy sicuro progettato esplicitamente. Le credenziali sono escluse da report, log, analytics, crash data ed export. Un abbonamento consumer non e trattato come credenziale API.
