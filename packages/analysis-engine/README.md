# Analysis engine | Motore di analisi

## Interface | Interfaccia

This module will expose one product-facing operation: analyze a canonical listing with declared options and return a reproducible analysis result. Product surfaces must not orchestrate rules, detectors, evidence validation or risk aggregation themselves.

Questo modulo esporra una sola operazione rivolta ai prodotti: analizzare un annuncio canonico con opzioni dichiarate e restituire un risultato riproducibile. Le superfici di prodotto non devono orchestrare direttamente regole, detector, validazione evidenze o aggregazione rischio.

The implementation composes the rule, detector, evidence and risk modules behind the interface. The analyzer version and rule-set version are part of every result.

L'implementazione compone i moduli regole, detector, evidenze e rischio dietro l'interfaccia. Versione analyzer e versione rule set fanno parte di ogni risultato.
