# Product requirements | Requisiti di prodotto

## MVP objective | Obiettivo MVP

Given a supported page or a manually supplied local input, build a canonical listing and return explainable, deterministic risk findings without requiring AI, a remote account or an API key.

Data una pagina supportata o un input locale fornito manualmente, costruire un annuncio canonico e restituire finding di rischio deterministici e spiegabili senza richiedere AI, un account remoto o una API key.

## Functional requirements | Requisiti funzionali

1. Extract visible title, price, description, category, relevant links, visible seller information and provenance.
2. Evaluate human-readable, versioned rules.
3. Return `detectorId`, severity, confidence, evidence, rationale and suggested action for every finding.
4. Render LOW non-invasively, MEDIUM in a panel or badge, HIGH prominently and CRITICAL strongly but non-blockingly by default.
5. Export local JSON and Markdown reports without remote submission.

1. Estrarre titolo, prezzo, descrizione, categoria, link rilevanti, informazioni visibili del venditore e provenienza.
2. Valutare regole versionate e leggibili dall'uomo.
3. Restituire `detectorId`, severity, confidence, evidence, rationale e suggested action per ogni finding.
4. Rendere LOW in modo non invasivo, MEDIUM in pannello o badge, HIGH in modo evidente e CRITICAL in modo forte ma non bloccante per default.
5. Esportare report JSON e Markdown locali senza invio remoto.

## Non-functional requirements | Requisiti non funzionali

Local-first operation, traceable evidence, configurable thresholds, accessible explanations, limited permissions, no accusation language and reproducible fixture-driven tests.

Operativita local-first, evidenze tracciabili, soglie configurabili, spiegazioni accessibili, permessi limitati, assenza di linguaggio accusatorio e test riproducibili guidati da fixture.
