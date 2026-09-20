# AI review gateway | Gateway revisione AI

## Role | Ruolo

Future opt-in secondary review after deterministic analysis. It is intentionally absent from the no-AI MVP and can never become required for base findings, policy guidance or report preparation.

Futura revisione secondaria opt-in dopo l'analisi deterministica. E intenzionalmente assente dall'MVP senza AI e non puo diventare obbligatoria per finding base, guida policy o preparazione della segnalazione.

## Provider plan | Piano provider

| Provider | First supported method | Delegated login status |
| --- | --- | --- |
| OpenAI | User API key through a secure local or server-side boundary | Do not promise generic ChatGPT login; ChatGPT and API access are separate |
| Anthropic | User API key through a secure local or server-side boundary | Do not promise generic Claude login without an official third-party flow |
| Google Gemini | User API key | Google OAuth may be added with a registered client per product surface and minimum scopes |
| Local model | Explicit local adapter | No cloud credential |

| Provider | Primo metodo supportato | Stato login delegato |
| --- | --- | --- |
| OpenAI | API key utente tramite confine locale o server sicuro | Non promettere login ChatGPT generico; accesso ChatGPT e API sono separati |
| Anthropic | API key utente tramite confine locale o server sicuro | Non promettere login Claude generico senza flusso ufficiale per terze parti |
| Google Gemini | API key utente | OAuth Google puo essere aggiunto con client registrato per ogni superficie e scope minimi |
| Modello locale | Adapter locale esplicito | Nessuna credenziale cloud |

Before every cloud request, the interface shows the provider, exact transmitted fields, whether images are included, purpose and known cost or retention implications. Provider output is labeled, treated as untrusted input and cannot remove deterministic evidence.

Prima di ogni richiesta cloud, l'interfaccia mostra provider, campi esatti trasmessi, presenza di immagini, scopo e implicazioni note su costo o conservazione. L'output del provider e etichettato, trattato come input non attendibile e non puo rimuovere evidenze deterministiche.
