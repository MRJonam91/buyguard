# ADR 0001 Browser-first local-first | Browser-first local-first

## Status | Stato

Accepted for the initial architecture. | Accettata per l'architettura iniziale.

## Context | Contesto

The product must detect clear marketplace listing inconsistencies without forcing users to disclose content to a service or purchase AI access. Mobile operating systems and marketplace policies have different constraints from browser extensions.

Il prodotto deve rilevare chiare incoerenze negli annunci marketplace senza obbligare l'utente a divulgare contenuti a un servizio o acquistare accesso AI. I sistemi operativi mobile e le policy marketplace hanno vincoli diversi dalle estensioni browser.

## Decision | Decisione

Build a local-first Manifest V3 extension before mobile applications. Put canonical contracts, rule evaluation, detectors, evidence and risk aggregation in reusable packages. Keep AI behind an optional provider gateway and do not require a backend for the MVP.

Costruire un'estensione Manifest V3 local-first prima delle applicazioni mobile. Collocare contratti canonici, valutazione regole, detector, evidenze e aggregazione rischio in package riusabili. Mantenere la AI dietro un provider gateway opzionale e non richiedere un backend per l'MVP.

## Consequences | Conseguenze

The first release has a narrower platform surface but a lower privacy and integration risk. Android and iOS must adapt the shared core to official system capabilities rather than dictate the initial design.

La prima release ha una superficie piattaforma piu ristretta ma minori rischi privacy e di integrazione. Android e iOS dovranno adattare il core condiviso alle capacita ufficiali del sistema invece di dettare il design iniziale.
