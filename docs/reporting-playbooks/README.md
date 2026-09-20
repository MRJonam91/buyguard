# Reporting playbooks | Guide alla segnalazione

## Purpose | Scopo

A reporting playbook converts supported findings into sourced, editable assistance for one platform, locale and concern. It never reports automatically and never presents general information as personalized legal advice.

Una guida alla segnalazione trasforma finding supportati in assistenza documentata e modificabile per una piattaforma, lingua o area e problema. Non invia mai automaticamente una segnalazione e non presenta informazioni generali come consulenza legale personalizzata.

## Required fields | Campi obbligatori

```yaml
id: vinted-it-misleading-listing
platform: vinted
locale: it-IT
concern: misleading-listing
sourceUrls: []
reviewedAt: YYYY-MM-DD
effectiveFrom: YYYY-MM-DD
applicability: []
evidenceChecklist: []
steps: []
reportCategory: ""
draftTemplate:
  it: ""
  en: ""
limitations: []
```

The runtime must mark a playbook stale or unavailable when its review window expires or applicability is unknown. Legal guidance additionally requires a declared jurisdiction and a source owned by the relevant authority.

Il runtime deve marcare una guida come obsoleta o non disponibile quando scade la finestra di revisione o l'applicabilita e ignota. La guida legale richiede inoltre una giurisdizione dichiarata e una fonte dell'autorita competente.

## Factual draft pattern | Modello di testo fattuale

**Italiano**

> Segnalo questo annuncio per una possibile incoerenza tra l'affermazione principale e le condizioni descritte. Il titolo mostra: "[titolo]". Nel testo compare: "[estratto]". La differenza rilevata e: [spiegazione neutrale]. Chiedo una verifica rispetto alla categoria di segnalazione selezionata. Allego URL, data/ora e schermate pertinenti.

**English**

> I am reporting this listing because of a possible inconsistency between the main claim and the stated conditions. The title says: "[title]". The text says: "[excerpt]". The observed difference is: [neutral explanation]. Please review it under the selected report category. I am attaching the URL, date/time, and relevant screenshots.

Templates must describe observable facts, avoid claims about intent, and omit personal data that the platform does not require.

I template devono descrivere fatti osservabili, evitare affermazioni sull'intenzione e omettere dati personali non richiesti dalla piattaforma.
