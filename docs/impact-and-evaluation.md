# Impact and evaluation | Impatto e valutazione

## What 90 percent means | Cosa significa 90 percento

The first release target is **at least 90% precision for HIGH and CRITICAL alerts**, measured separately by detector, platform, language and concern family on a locked representative evaluation set. Precision answers: "Of the serious alerts shown, how many were correct under the detector's written definition?"

Il target della prima release e **almeno il 90% di precision per gli alert HIGH e CRITICAL**, misurato separatamente per detector, piattaforma, lingua e famiglia di problemi su un set di valutazione rappresentativo e bloccato. La precision risponde: "Tra gli alert gravi mostrati, quanti erano corretti secondo la definizione scritta del detector?"

This target does not mean that BUYGUARD finds 90% of every harmful listing, guarantees safety, or determines illegality. Recall, false-positive rate, calibration and coverage must be published alongside precision.

Questo target non significa che BUYGUARD trovi il 90% di ogni annuncio dannoso, garantisca sicurezza o determini illegalita. Recall, tasso di falsi positivi, calibrazione e copertura devono essere pubblicati insieme alla precision.

## Release gates | Criteri di rilascio

| Metric | Initial target | Why it matters / Perche conta |
| --- | ---: | --- |
| HIGH/CRITICAL precision | >= 90% | Limits harmful false accusations / Limita falsi allarmi dannosi |
| Recall on priority patterns | >= 80% | Finds most defined high-risk cases without hiding misses / Trova gran parte dei casi definiti senza nascondere le omissioni |
| Benign-listing false-positive rate | <= 5% | Prevents alert fatigue / Previene la fatica da alert |
| Expected calibration error | <= 0.05 | Makes displayed confidence interpretable / Rende interpretabile la confidenza mostrata |
| Evidence traceability | 100% serious findings | Every serious signal must cite its source span or rule / Ogni segnale grave deve citare span o regola |
| Policy-pack freshness | 100% with reviewed date | Prevents unversioned guidance / Evita guide non versionate |
| Accessibility | No color-only signals | Preserves meaning for all users / Mantiene il significato per tutti gli utenti |

These are acceptance targets, not current measured results. They become claims only after a versioned benchmark report is published with sample size and methodology.

Questi sono target di accettazione, non risultati attualmente misurati. Diventano affermazioni solo dopo la pubblicazione di un benchmark versionato con numerosita e metodologia.

## Improvement hypotheses | Ipotesi di miglioramento

The following ranges are product hypotheses for controlled usability studies, not promises or observed BUYGUARD performance:

I seguenti intervalli sono ipotesi di prodotto per studi controllati di usabilita, non promesse o prestazioni BUYGUARD gia osservate:

| User outcome | Target improvement versus unaided review | Validation method |
| --- | ---: | --- |
| Recognition of seeded high-risk signals / Riconoscimento segnali ad alto rischio | +25 to +45 percentage points | Randomized listing-review task with and without BUYGUARD |
| Complete evidence captured for a report / Evidenze complete raccolte | +30 to +50 percentage points | Blind rubric over submitted report packets |
| Time to reach a supported next action / Tempo per arrivare a un'azione motivata | 40% to 60% reduction | Median task time on matched scenarios |
| Incorrect report-category selection / Categoria di segnalazione errata | 30% to 50% reduction | Compare selected category with reviewed policy pack |
| Unsupported accusatory statements / Affermazioni accusatorie non supportate | 50% to 80% reduction | Blind language-safety review of report drafts |

The ranges are deliberately presented as hypotheses. If a study misses them, the published result replaces the hypothesis; it must not be hidden behind a confidence score.

Gli intervalli sono presentati deliberatamente come ipotesi. Se uno studio non li raggiunge, il risultato pubblicato sostituisce l'ipotesi; non deve essere nascosto dietro un punteggio di confidenza.

## Evaluation design | Disegno di valutazione

1. Freeze detector definitions and rule-set version before test-set scoring.
2. Build separate development and evaluation corpora with positive, negative and borderline cases.
3. Stratify by platform, language, category and concern; include realistic prevalence and adversarial wording.
4. Have at least two trained human reviewers label each evaluation case and resolve disagreements using written criteria.
5. Measure deterministic-only mode first, then AI-assisted mode as a separate treatment.
6. Publish confusion matrices, confidence intervals, sample sizes, known blind spots and excluded categories.
7. Re-run regression and calibration tests whenever rules, OCR, policy packs or provider prompts change.

1. Bloccare definizioni detector e versione del rule set prima dello scoring del test set.
2. Costruire corpus di sviluppo e valutazione separati con casi positivi, negativi e borderline.
3. Stratificare per piattaforma, lingua, categoria e problema; includere prevalenza realistica e formulazioni avversariali.
4. Far etichettare ogni caso di valutazione ad almeno due revisori formati e risolvere i disaccordi con criteri scritti.
5. Misurare prima la modalita solo deterministica, poi la modalita assistita da AI come trattamento separato.
6. Pubblicare matrici di confusione, intervalli di confidenza, numerosita, punti ciechi noti e categorie escluse.
7. Rieseguire test di regressione e calibrazione quando cambiano regole, OCR, policy pack o prompt provider.

## Expected societal outcomes | Risultati sociali attesi

If validated, BUYGUARD can improve buyer awareness, evidence quality and reporting consistency; reduce time lost on confusing listings; and create a privacy-preserving feedback loop for detector quality. It cannot guarantee marketplace removal, law-enforcement action, reimbursement, seller intent, product authenticity or a safe transaction.

Se validato, BUYGUARD puo migliorare consapevolezza dell'acquirente, qualita delle evidenze e coerenza delle segnalazioni; ridurre il tempo perso su annunci confusi; e creare un ciclo di miglioramento rispettoso della privacy. Non puo garantire rimozione dal marketplace, azione delle autorita, rimborso, intenzione del venditore, autenticita del prodotto o sicurezza della transazione.
