# Security policy | Politica di sicurezza

## Reporting a vulnerability | Segnalare una vulnerabilita

Until a dedicated private reporting channel is published, do not open a public issue for a suspected vulnerability. Contact the repository owner through GitHub's private contact methods and include a concise reproduction, affected version or commit, impact and any suggested mitigation. The maintainer will acknowledge receipt when feasible and coordinate disclosure timing with the reporter.

Finche non verra pubblicato un canale privato dedicato, non aprire una issue pubblica per una sospetta vulnerabilita. Contattare il proprietario della repository tramite i metodi privati di GitHub e includere una riproduzione concisa, versione o commit interessato, impatto e possibili mitigazioni. Il maintainer confermera la ricezione quando possibile e coordinera le tempistiche di divulgazione con il reporter.

## Security baseline | Base di sicurezza

- Least-privilege browser permissions and strict Content Security Policy.
- No secrets in source, logs, fixtures or issue templates.
- Dependency and secret scanning in continuous integration.
- User-controlled outbound requests; no automated navigation to risky links.
- Signed releases and protected branches when repository settings are available.

- Permessi browser minimi e Content Security Policy rigorosa.
- Nessun segreto in sorgenti, log, fixture o template issue.
- Scansione dipendenze e segreti in integrazione continua.
- Richieste in uscita controllate dall'utente; nessuna navigazione automatica verso link rischiosi.
- Release firmate e branch protetti quando le impostazioni della repository sono disponibili.
