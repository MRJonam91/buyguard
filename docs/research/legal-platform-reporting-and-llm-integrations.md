# BUYGUARD — Segnalazione legale e di piattaforma, integrazioni LLM / Legal and platform reporting, LLM integrations

**Stato / Status:** ricerca di prodotto e architettura basata su fonti primarie / product and architecture research based on primary sources  
**Data di accesso a tutte le fonti / All sources accessed:** 20 settembre 2026 / 20 September 2026  
**Ambito / Scope:** Unione europea e procedure pubbliche di Vinted, eBay Italia e Subito / European Union and the public procedures of Vinted, eBay Italy, and Subito

> **IT — Avvertenza:** questo documento non è consulenza legale. Distingue tra indicatori di rischio, violazioni delle regole di una piattaforma e presunta illegalità. Solo la piattaforma, un'autorità competente o un professionista qualificato può valutare il caso concreto nel relativo contesto giuridico.
>
> **EN — Notice:** this document is not legal advice. It distinguishes risk indicators, platform-rule violations, and alleged illegality. Only the platform, a competent authority, or a qualified professional can assess a specific case in its applicable legal context.

## 1. Sintesi esecutiva / Executive summary

### Italiano

BUYGUARD può offrire un supporto utile senza AI se separa rigorosamente tre livelli:

1. **rilevazione:** segnali osservabili nell'annuncio, nella cronologia e nei messaggi;
2. **classificazione:** possibile frode, spam, bene vietato o limitato, informazione ingannevole, prodotto non sicuro, sospetta contraffazione o altra categoria prevista dalla piattaforma;
3. **azione assistita:** istruzioni ufficiali, raccolta ordinata delle prove e bozza di segnalazione che l'utente rivede e invia personalmente.

Il Digital Services Act (DSA) non autorizza BUYGUARD a dichiarare che un contenuto è illegale. Offre però una struttura precisa per una segnalazione: motivazione, posizione elettronica esatta, contatto del segnalante quando richiesto e dichiarazione di buona fede. La piattaforma deve poi trattare la segnalazione e comunicare la decisione secondo l'articolo 16 del DSA. La soluzione deve quindi usare formule come **“possibile violazione”** o **“rischio elevato”**, mostrare i fatti rilevati e lasciare la decisione finale all'utente e alla piattaforma.

L'integrazione LLM deve essere un secondo livello facoltativo. Tutti e tre i fornitori permettono accesso API, ma non offrono lo stesso tipo di login: OpenAI documenta l'API key e mantiene ChatGPT e API separati; Anthropic documenta API key e login OAuth per il proprio CLI, non un generico “Accedi con Claude” per app terze; Google documenta sia chiavi Gemini sia OAuth per applicazioni esterne. BUYGUARD non deve promettere login ChatGPT o Claude finché i fornitori non pubblicano un flusso destinato espressamente a terze parti.

Non sono riportate percentuali di efficacia: le fonti ufficiali esaminate non dimostrano una percentuale di miglioramento applicabile a BUYGUARD. Precisione, richiamo, falsi positivi, tasso di completamento della segnalazione ed esito della piattaforma devono essere misurati su un dataset e un pilot reali.

### English

BUYGUARD can provide useful support without AI if it keeps three layers strictly separate:

1. **detection:** observable signals in the listing, history, and messages;
2. **classification:** possible fraud, spam, prohibited or restricted goods, misleading information, unsafe product, suspected counterfeit, or another platform-defined category;
3. **assisted action:** official instructions, structured evidence collection, and a report draft that the user reviews and submits personally.

The Digital Services Act (DSA) does not authorize BUYGUARD to declare content illegal. It does, however, provide a precise notice structure: reasons, exact electronic location, reporter contact details where required, and a good-faith statement. The platform must then process the notice and communicate its decision under DSA Article 16. The product should therefore use wording such as **“possible violation”** or **“high risk”**, expose the detected facts, and leave the final decision to the user and platform.

LLM integration should be an optional second layer. All three providers offer API access, but they do not offer equivalent login mechanisms: OpenAI documents API-key access and keeps ChatGPT and API products separate; Anthropic documents API keys and an OAuth login for its own CLI, not a generic third-party “Sign in with Claude”; Google documents both Gemini keys and OAuth for external applications. BUYGUARD should not promise ChatGPT or Claude login unless the providers publish a flow expressly intended for third-party apps.

No effectiveness percentages are stated: the official sources reviewed do not establish an improvement percentage that can be applied to BUYGUARD. Precision, recall, false-positive rate, report-completion rate, and platform outcome must be measured on a real dataset and pilot.

## 2. Digital Services Act: elementi utilizzabili dal prodotto / Digital Services Act: product-relevant elements

Fonte normativa primaria / Primary legal source: [Regolamento (UE) 2022/2065 — testo italiano, EUR-Lex](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32022R2065).

| Tema / Topic | Italiano | English | Riferimento / Reference |
|---|---|---|---|
| Ambito | Il DSA si applica ai servizi intermediari offerti a destinatari stabiliti o ubicati nell'UE, indipendentemente dal luogo di stabilimento del prestatore. | The DSA applies to intermediary services offered to recipients established or located in the EU, regardless of where the provider is established. | Art. 2(1) |
| Contenuto illegale | È qualsiasi informazione che, di per sé o in relazione a un'attività — compresa la vendita di prodotti o servizi — non è conforme al diritto dell'UE o al diritto nazionale conforme al diritto UE. La nozione dipende quindi dal diritto applicabile, non soltanto dalle regole private della piattaforma. | It is any information that, in itself or in relation to an activity — including the sale of products or services — does not comply with EU law or Member-State law consistent with EU law. The concept therefore depends on applicable law, not merely private platform rules. | Art. 3(h) |
| Nessun obbligo generale di sorveglianza | Il DSA non impone ai prestatori un obbligo generale di sorveglianza o di accertamento attivo dei fatti. BUYGUARD non deve descrivere il DSA come garanzia che ogni annuncio illecito venga preventivamente bloccato. | The DSA does not impose a general monitoring or active fact-finding obligation. BUYGUARD should not describe the DSA as a guarantee that every illegal listing will be blocked proactively. | Art. 8 |
| Meccanismo di segnalazione | I servizi di hosting devono offrire a qualsiasi persona o ente un meccanismo elettronico facile da accedere e usare per segnalare informazioni specifiche ritenute illegali. | Hosting services must offer any individual or entity an easy-to-access and user-friendly electronic mechanism for notifying specific information believed to be illegal. | Art. 16(1) |
| Contenuto minimo della segnalazione | La segnalazione deve poter includere: spiegazione adeguatamente motivata; URL esatto e, se necessario, ulteriori dati di localizzazione; nome ed email del segnalante salvo la specifica eccezione prevista; dichiarazione di buona fede su accuratezza e completezza. | A notice must be able to include: adequately substantiated reasons; the exact URL and, where needed, further location data; the reporter's name and email subject to the stated exception; and a good-faith statement as to accuracy and completeness. | Art. 16(2) |
| Ricezione, decisione e ricorso | Se è presente un contatto elettronico, il prestatore invia conferma senza indebito ritardo; comunica poi la decisione e le possibilità di ricorso. Il trattamento deve essere tempestivo, diligente, non arbitrario e obiettivo, con informazione sull'eventuale uso di automazione. | If electronic contact details are present, the provider acknowledges receipt without undue delay; it later communicates its decision and redress options. Processing must be timely, diligent, non-arbitrary, and objective, with disclosure of any automated processing or decision-making. | Art. 16(4)–(6) |
| Motivazione delle restrizioni | Quando limita contenuti o account per illegalità o violazione dei termini, l'hosting provider deve fornire una motivazione chiara e specifica, con fatti, base giuridica o clausola contrattuale, eventuale automazione e mezzi di ricorso. | When restricting content or accounts for illegality or terms violations, the hosting provider must provide a clear and specific statement of reasons, including facts, legal basis or contractual clause, any automation, and redress options. | Art. 17 |
| Segnalatori attendibili | Le piattaforme devono trattare con priorità le segnalazioni presentate dai segnalatori attendibili designati; la qualifica è attribuita dal coordinatore dei servizi digitali competente secondo i criteri dell'articolo 22. BUYGUARD non può presentarsi come tale senza designazione. | Platforms must give priority to notices submitted by designated trusted flaggers; status is awarded by the competent Digital Services Coordinator under Article 22 criteria. BUYGUARD cannot present itself as one without designation. | Art. 22; [Commissione europea / European Commission](https://digital-strategy.ec.europa.eu/it/policies/trusted-flaggers-under-dsa) |
| Esenzione per alcuni piccoli marketplace | Gli obblighi aggiuntivi della sezione che comprende gli articoli 30–32 non si applicano ai fornitori che si qualificano come microimprese o piccole imprese, salvo le piattaforme di dimensioni molto grandi e le condizioni indicate dall'articolo 29. | The additional obligations in the section containing Articles 30–32 do not apply to providers qualifying as micro or small enterprises, except very large online platforms and subject to the conditions in Article 29. | Art. 29 |
| Tracciabilità degli operatori commerciali | I marketplace che consentono contratti a distanza devono ottenere determinate informazioni dagli operatori commerciali, compresi contatti, identificazione, dati di pagamento, registro imprese quando applicabile e autocertificazione di conformità; devono compiere il massimo sforzo per valutarne attendibilità e completezza. | Marketplaces enabling distance contracts must obtain specified trader information, including contact, identification, payment, trade-register details where applicable, and a compliance self-certification; they must make best efforts to assess reliability and completeness. | Art. 30 |
| Conformità “by design” | L'interfaccia del marketplace deve consentire ai trader di fornire informazioni precontrattuali, di identificazione, conformità e sicurezza; il marketplace deve svolgere i controlli indicati dalla norma, compresi ragionevoli controlli casuali nelle banche dati ufficiali accessibili. | The marketplace interface must enable traders to provide pre-contractual, identification, compliance, and safety information; the marketplace must perform the checks described by the law, including reasonable random checks in accessible official databases. | Art. 31 |
| Informazione dopo l'acquisto | Se il marketplace viene a conoscenza che un trader ha offerto un prodotto o servizio illegale, deve informare, nei limiti previsti e se dispone dei contatti, i consumatori che lo hanno acquistato nei sei mesi precedenti, indicando illegalità, identità del trader e mezzi di ricorso; altrimenti pubblica le informazioni accessibili previste. | If a marketplace becomes aware that a trader offered an illegal product or service, it must, within the stated limits and where it has contact details, inform consumers who purchased it in the previous six months of the illegality, trader identity, and relevant redress; otherwise it must make the specified information publicly accessible. | Art. 32 |

### Implicazione operativa / Operational implication

**IT:** il generatore di segnalazioni dovrebbe produrre due percorsi distinti: **violazione delle regole della piattaforma** e **presunto contenuto illegale ai sensi del DSA**. Il secondo percorso deve chiedere URL esatto, fatti osservabili, fonte normativa selezionata da un catalogo revisionato, recapito e conferma di buona fede. Non deve convertire automaticamente un punteggio di rischio in un'accusa di illegalità.

**EN:** the report generator should provide two distinct paths: **platform-rule violation** and **alleged illegal content under the DSA**. The second path should request the exact URL, observable facts, a legal source selected from a reviewed catalogue, contact details, and good-faith confirmation. It must not automatically convert a risk score into an allegation of illegality.

**IT:** un software separato che analizza annunci non diventa automaticamente una “piattaforma online” ai sensi del DSA: la qualificazione dipende dalle funzioni effettive, in particolare dalla memorizzazione e diffusione al pubblico di informazioni su richiesta degli utenti. Inoltre gli articoli 30–32 riguardano gli **operatori commerciali**, non indistintamente ogni venditore privato. Questa è un'area da sottoporre a consulenza qualificata prima di modificare il modello di servizio.

**EN:** separate software that analyzes listings does not automatically become an “online platform” under the DSA: qualification depends on its actual functions, particularly storing and disseminating information to the public at users' request. Articles 30–32 also concern **traders**, not every private seller indiscriminately. This area should receive qualified advice before changing the service model.

## 3. Procedure ufficiali delle piattaforme / Official platform procedures

### 3.1 Vinted

Fonti ufficiali / Official sources:

- [Report a member or listing](https://www.vinted.com/help/383/288-raportarea-con%C8%9Binutului-ilegal-sau-a-comportamentului-neadecvat)
- [Modulo italiano: Segnalazione di annunci illegali o vietati / Italian form: Reporting illegal or prohibited listings](https://www.vinted.it/help/notice_and_action_form)
- [Catalog Rules](https://www.vinted.com/catalog-rules)
- [Item authenticity, counterfeits, and intellectual property](https://www.vinted.com/help/560/307-item-authenticity-policy)

**Procedura italiana / Italian procedure**

1. Aprire l'annuncio.
2. Selezionare i tre puntini; su desktop può essere mostrata una bandiera.
3. Selezionare **Report / Segnala**.
4. Scegliere il motivo corretto e aggiungere i dettagli richiesti.
5. Inviare.

Vinted indica come esempi segnalabili: oggetti fuori categoria o vietati, immagini o descrizioni inappropriate, informazioni intenzionalmente fuorvianti, annunci che non vendono realmente un oggetto, contraffazioni, uso non autorizzato di materiale protetto, beni illegali, prodotti non sicuri o richiamati e contenuti discriminatori o di odio. Per profili e messaggi esistono flussi analoghi; phishing e truffe nei messaggi devono essere segnalati dalla chat. Organizzazioni e titolari di diritti possono usare il modulo dedicato anche senza account, allegando se necessario documenti di supporto. Vinted dichiara di confermare la ricezione, investigare, comunicare la decisione e fornire un link di ricorso.

Il modulo pubblico italiano separa espressamente **violazioni di proprietà intellettuale** da **annunci vietati o illegali**. BUYGUARD può aprire questo modulo come alternativa verificata quando il percorso interno non è disponibile, senza compilazione o invio automatico.

**English procedure**

1. Open the listing.
2. Select the three-dot symbol; desktop may show a flag symbol.
3. Select **Report**.
4. Choose the correct reason and provide the requested details.
5. Submit.

Vinted lists reportable examples including non-category or prohibited items, inappropriate images or descriptions, intentionally misleading information, non-sale listings, counterfeits, unauthorized protected material, illegal goods, unsafe or recalled products, and discriminatory or hateful content. Similar flows exist for profiles and messages; phishing and scams in messages should be reported from the chat. Organizations and rights holders may use the dedicated form without an account and may need supporting documents. Vinted states that it acknowledges the report, investigates, communicates the decision, and provides an appeal link.

The public Italian form expressly separates **intellectual-property infringement** from **prohibited or illegal listings**. BUYGUARD may open this verified form as an alternative when the in-product path is unavailable, without auto-filling or auto-submitting it.

**Vincolo per BUYGUARD / BUYGUARD constraint:** non suggerire la categoria “contraffatto” soltanto perché il prezzo è basso. Presentare i segnali osservati e chiedere all'utente di selezionare la categoria ufficiale appropriata; per una violazione IP da parte del titolare dei diritti, indirizzare al canale dedicato. / Do not suggest “counterfeit” solely because the price is low. Present observed signals and ask the user to select the appropriate official category; direct rights holders to the dedicated IP channel.

### 3.2 eBay Italia

Fonti ufficiali / Official sources:

- [Come segnalare un contenuto su eBay](https://www.ebay.it/help/account/regulatory/come-segnalare-un-contenuto-su-ebay?id=5412&ra=true)
- [Oggetti di cui è vietata o limitata la vendita](https://www.ebay.it/help/policies/prohibited-restricted-items/oggetti-di-cui-vietata-limitata-la-vendita?id=4207&ra=true)
- [Segnala un problema con un venditore](https://www.ebay.it/help/buying/working-sellers/report-seller-listing?id=4022)
- [Regole sugli oggetti contraffatti](https://www.ebay.it/help/policies/prohibited-restricted-items/counterfeit-item-policy?id=4276)

**Procedura italiana / Italian procedure**

1. Nella pagina con il contenuto, selezionare l'icona del punto interrogativo; su mobile selezionare i tre puntini.
2. In **Segnala contenuto**, selezionare **Invia la segnalazione**; eBay può chiedere l'accesso o consentire l'invio come utente non registrato.
3. Selezionare il tipo di contenuto corretto.
4. Compilare il modulo con dettagli e motivo; è possibile aggiungere testo libero e documenti.
5. Inviare. eBay dichiara di confermare la ricezione, esaminare e decidere secondo legge, Accordo per gli utenti e regole eBay.

Per una singola inserzione vietata o limitata, eBay indica anche il link **Segnala l'inserzione / Segnala l'oggetto** presente nell'inserzione. I problemi post-acquisto — oggetto non ricevuto, danneggiato o non conforme — seguono invece restituzione, rimborso o richiesta di intervento, non la segnalazione generica del contenuto. I titolari di diritti devono usare VeRO per le violazioni di proprietà intellettuale. eBay richiede buona fede, accuratezza e completezza e può sospendere il trattamento di segnalazioni ripetutamente infondate.

**English procedure**

1. On the page containing the content, select the question-mark icon; on mobile, select the three dots.
2. Under **Report content**, select **Submit report**; eBay may require sign-in or permit submission as an unregistered user.
3. Select the correct content type.
4. Complete the form with details and reason; free text and documents can be added.
5. Submit. eBay states that it acknowledges receipt, reviews, and decides under applicable law, its User Agreement, and eBay policies.

For an individual prohibited or restricted listing, eBay also directs users to the **Report listing / Report item** link in the listing. Post-purchase problems — not received, damaged, or not as described — use return, refund, or intervention flows instead of generic content reporting. Rights holders should use VeRO for IP infringement. eBay requires good faith, accuracy, and completeness and may suspend processing of repeatedly unfounded reports.

### 3.3 Subito

Fonti ufficiali / Official sources:

- [Segnalazioni e ricorsi](https://assistenza.subito.it/hc/it/articles/12227188789788-Segnalazioni-e-ricorsi)
- [Regole di pubblicazione](https://assistenza.subito.it/hc/it/sections/10743588495133-Regole-di-pubblicazione)
- [Regole di pubblicazione per categoria](https://assistenza.subito.it/hc/it/articles/360001165425-Regole-di-pubblicazione-per-categoria)
- [Phishing](https://assistenza.subito.it/hc/it/articles/360001165525-Phishing)
- [Cosa fare in caso di truffa](https://assistenza.subito.it/hc/it/articles/360000136078-Cosa-fare-in-caso-di-truffa)

**Procedura italiana / Italian procedure**

1. Scorrere in fondo alla pagina dell'annuncio.
2. Selezionare **Segnala annuncio**.
3. Scegliere il motivo corretto dal menu.
4. Spiegare chiaramente come l'annuncio viola le regole.
5. Attendere le email di conferma di ricezione e di esito indicate da Subito.

Per truffa, phishing, molestie o spam in chat: aprire la chat, selezionare i tre puntini, scegliere **Segnala**, selezionare il motivo e fornire i dettagli. Subito raccomanda di restare nella propria chat, non aprire link o allegati sospetti e non condividere dati sensibili. In caso di sospetta truffa, la guida ufficiale evidenzia come dati utili l'ID annuncio, l'ID utente e/o l'email mascherata `@messaggi.subito.it`. Le comunicazioni ufficiali sull'esito della segnalazione arrivano via email; contatti telefonici, SMS o altri canali che si presentano come Subito possono essere phishing.

**English procedure**

1. Scroll to the bottom of the listing page.
2. Select **Segnala annuncio** (Report listing).
3. Choose the correct reason from the menu.
4. Clearly explain how the listing violates the rules.
5. Wait for the receipt-confirmation and outcome emails described by Subito.

For scams, phishing, harassment, or spam in chat: open the chat, select the three dots, choose **Segnala**, select the reason, and provide details. Subito recommends staying in its chat, avoiding suspicious links or attachments, and never sharing sensitive data. In suspected-fraud cases, its official guide identifies the listing ID, user ID, and/or masked `@messaggi.subito.it` email as useful data. Official report-outcome communications arrive by email; calls, SMS, or other channels claiming to be Subito may be phishing.

## 4. Contratto del generatore di testi / Report-text generator contract

### Dati in ingresso / Inputs

- URL esatto, ID dell'annuncio quando disponibile, piattaforma, data e ora / exact URL, listing ID where available, platform, date and time;
- estratti visibili e screenshot scelti dall'utente, senza acquisizione indiscriminata / user-selected visible excerpts and screenshots, without indiscriminate collection;
- segnali prodotti dai detector con spiegazione e provenienza / detector signals with explanation and provenance;
- categoria ufficiale della piattaforma scelta dall'utente / official platform category chosen by the user;
- paese o giurisdizione dichiarata dall'utente / country or jurisdiction stated by the user;
- eventuale fonte normativa selezionata da un catalogo aggiornato e revisionato / any legal source selected from an updated, reviewed catalogue.

### Output obbligatorio / Required output

1. **Livello di rischio, non verdetto / Risk level, not verdict.** “Possibile violazione” e relativa confidenza del detector; mai “questo annuncio è illegale” come deduzione automatica. / “Possible violation” and detector confidence; never “this listing is illegal” as an automated conclusion.
2. **Fatti osservati / Observed facts.** Elenco breve, verificabile e separato dalle inferenze. / A short, verifiable list kept separate from inferences.
3. **Regola pertinente / Relevant rule.** Link diretto e data di verifica della regola della piattaforma. / Direct link and last-verified date for the platform rule.
4. **Base legale facoltativa / Optional legal basis.** Solo da fonti curate e con la formula “potrebbe essere pertinente”; se non sufficientemente chiara, ometterla. / Only from curated sources, worded as “may be relevant”; omit it if insufficiently clear.
5. **Bozza fattuale / Factual draft.** URL, categoria, evidenze e richiesta di revisione; nessuna minaccia, diffamazione o affermazione non dimostrata. / URL, category, evidence, and request for review; no threats, defamation, or unsupported statements.
6. **Procedura passo-passo / Step-by-step procedure.** I passaggi ufficiali specifici per la piattaforma, con percorso alternativo per problema post-acquisto, IP o pericolo immediato. / Official platform-specific steps, with an alternative path for post-purchase issues, IP, or immediate danger.
7. **Conferma umana / Human confirmation.** L'utente rilegge, modifica, dichiara buona fede e invia; niente invio automatico di massa. / The user reviews, edits, confirms good faith, and submits; no automated mass reporting.

### Modello di testo / Text template

**Italiano**

> Segnalo l'annuncio `[URL/ID]` per una possibile violazione della categoria `[categoria ufficiale]`. Ho osservato i seguenti elementi: `[fatti verificabili, con data]`. La regola che potrebbe essere pertinente è `[titolo e link]`. Allego `[screenshot/documenti selezionati]`. Chiedo una revisione dell'annuncio e la comunicazione dell'esito attraverso il canale previsto. Confermo in buona fede che le informazioni fornite sono accurate e complete per quanto a mia conoscenza.

**English**

> I am reporting listing `[URL/ID]` for a possible violation in the `[official category]` category. I observed the following: `[verifiable facts, with date]`. The rule that may be relevant is `[title and link]`. I attach `[selected screenshots/documents]`. I request a review of the listing and notification of the outcome through the designated channel. I confirm in good faith that the information provided is accurate and complete to the best of my knowledge.

### Limiti e salvaguardie / Limits and safeguards

- **IT:** non sostituire un avvocato, le forze dell'ordine o un'autorità di vigilanza; per pericolo immediato, minaccia alla persona o reato in corso, mostrare i contatti di emergenza pertinenti senza trattenere l'utente nel flusso ordinario.  
  **EN:** do not replace a lawyer, law enforcement, or a market-surveillance authority; for immediate danger, threats to a person, or an offence in progress, show relevant emergency contacts without keeping the user in the ordinary reporting flow.
- **IT:** non citare una legge solo perché una parola chiave coincide; richiedere paese, tipo di venditore, categoria di bene e fatti essenziali.  
  **EN:** do not cite a law merely because a keyword matches; require country, seller type, goods category, and essential facts.
- **IT:** separare sempre “contro le regole” da “potenzialmente illecito”; una condotta può ricadere in una sola delle due categorie.  
  **EN:** always separate “against platform rules” from “potentially illegal”; conduct may fall into only one of the two categories.
- **IT:** conservare solo le prove necessarie, oscurare dati personali non pertinenti e mostrare cosa sarà inviato a piattaforma o LLM.  
  **EN:** retain only necessary evidence, redact irrelevant personal data, and show what will be sent to a platform or LLM.
- **IT:** versionare le regole di piattaforma con URL, lingua, data di accesso e data di ultima revisione; se obsolete o irraggiungibili, disattivare la guida legale automatica e fornire il link al centro assistenza.  
  **EN:** version platform rules with URL, language, access date, and last-review date; if stale or unavailable, disable automated legal guidance and provide the help-centre link.

## 5. Integrazioni LLM ufficialmente supportate / Officially supported LLM integrations

| Fornitore / Provider | API key | Login/OAuth per BUYGUARD / Login/OAuth for BUYGUARD | Decisione di prodotto / Product decision |
|---|---|---|---|
| OpenAI / ChatGPT | **Sì / Yes.** L'API OpenAI usa API key e documenta anche token brevi per workload identity federation; la documentazione richiede di non condividere le chiavi né esporle in codice client e di caricarle lato server da variabili d'ambiente o secret manager. / The OpenAI API uses API keys and also documents short-lived workload-identity tokens; the docs say not to share keys or expose them in client-side code and to load them server-side from environment variables or a secret manager. | **Non documentato come OAuth generico per app terze / Not documented as generic third-party OAuth.** Le fonti esaminate non offrono un “Accedi con ChatGPT” per dare a BUYGUARD l'uso dell'API del singolo utente. ChatGPT e API hanno fatturazione separata. / The reviewed sources do not offer “Sign in with ChatGPT” to grant BUYGUARD use of an individual user's API access. ChatGPT and API billing are separate. | Supportare BYOK tramite backend o componente locale sicuro. Non promettere l'uso dell'abbonamento ChatGPT. / Support BYOK through a backend or secure local component. Do not promise use of a ChatGPT subscription. |
| Anthropic / Claude | **Sì / Yes.** La Claude API documenta chiavi personali o di service account e raccomanda secret manager e rotazione. / The Claude API documents personal or service-account keys and recommends secret-manager storage and rotation. | **Non come login consumer per app terze / Not as a consumer login for third-party apps.** Anthropic documenta un login OAuth interattivo per il proprio `ant` CLI e token federati per workload; ciò non documenta un pulsante pubblico “Accedi con Claude” riutilizzabile da BUYGUARD. / Anthropic documents interactive OAuth login for its own `ant` CLI and federated workload tokens; this does not document a public reusable “Sign in with Claude” button for BUYGUARD. | Supportare API key. Trattare OAuth Anthropic come non disponibile per il prodotto finché non esiste una guida ufficiale per app terze. / Support API keys. Treat Anthropic OAuth as unavailable to the product until an official third-party app guide exists. |
| Google / Gemini | **Sì / Yes.** Gemini richiede autenticazione e documenta chiavi API; la guida corrente distingue chiavi standard e authorization keys associate a service account. / Gemini requires authentication and documents API keys; current guidance distinguishes standard keys and authorization keys bound to a service account. | **Sì / Yes.** La guida Gemini documenta OAuth, schermata di consenso, audience esterna e credenziali gestite dall'app. Google documenta client OAuth distinti per web, Android, iOS, desktop e Chrome Extension. / Gemini's guide documents OAuth, a consent screen, external audience, and app-managed credentials. Google documents separate OAuth clients for web, Android, iOS, desktop, and Chrome Extension. | Offrire API key e, in una fase successiva, OAuth Google con client separati per piattaforma, scope minimi, PKCE dove applicabile e verifica prima del rilascio pubblico. / Offer API keys and, in a later phase, Google OAuth with separate platform clients, minimum scopes, PKCE where applicable, and verification before public release. |

Fonti ufficiali / Official sources:

- OpenAI: [API authentication](https://developers.openai.com/api/reference/overview), [Developer quickstart](https://platform.openai.com/docs/quickstart/make-your-first-api-request), [ChatGPT and API billing are separate](https://help.openai.com/en/articles/9039756).
- Anthropic: [Claude API authentication](https://platform.claude.com/docs/en/manage-claude/authentication), [Claude API overview](https://platform.claude.com/docs/en/api/overview), [`ant` CLI authentication options](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/authentication).
- Google: [Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key), [Gemini OAuth quickstart](https://ai.google.dev/gemini-api/docs/oauth), [Google OAuth 2.0 overview and client types](https://developers.google.com/identity/protocols/oauth2), [Google OAuth 2.0 policies](https://developers.google.com/identity/protocols/oauth2/policies).

### Architettura credenziali consigliata / Recommended credential architecture

**IT**

- Il motore locale senza AI deve funzionare senza account e senza inviare annunci a fornitori esterni.
- Per il sito web, le API key passano soltanto attraverso un backend; cifratura a riposo, log senza segreti, cancellazione immediata su richiesta e test di revoca.
- Per estensione, desktop e mobile, evitare chiavi persistenti nel DOM, `localStorage`, log, crash report o bundle. Preferire keychain/credential vault del sistema operativo o un proxy backend; una content script non deve mai ricevere il segreto.
- OAuth Google deve usare un client registrato per ciascuna piattaforma e il flusso previsto per quel tipo di client. Non incorporare le credenziali di un client web nelle app native.
- Prima della richiesta LLM, mostrare esattamente testo, immagini e metadati che saranno trasmessi; applicare oscuramento di email, telefono, indirizzo, dati di pagamento e chat non pertinenti.
- L'output LLM è un parere supplementare e non deve sovrascrivere i segnali deterministici, la provenienza delle prove o la decisione dell'utente.

**EN**

- The local non-AI engine must work without an account and without sending listings to external providers.
- For the website, API keys pass only through a backend; encrypt at rest, keep secrets out of logs, delete immediately on request, and test revocation.
- For extension, desktop, and mobile, avoid persistent keys in the DOM, `localStorage`, logs, crash reports, or bundles. Prefer the operating system keychain/credential vault or a backend proxy; a content script must never receive the secret.
- Google OAuth must use a registered client for each platform and the flow intended for that client type. Do not embed web-client credentials in native apps.
- Before an LLM request, show exactly which text, images, and metadata will be transmitted; redact irrelevant email, phone, address, payment, and chat data.
- LLM output is supplementary and must not overwrite deterministic signals, evidence provenance, or the user's decision.

## 6. Esiti realistici e metriche / Realistic outcomes and metrics

### Esiti verificabili / Verifiable outcomes

**IT:** BUYGUARD può realisticamente ridurre il tempo necessario a trovare il canale ufficiale, migliorare la completezza fattuale delle bozze, rendere visibili le differenze tra regole private e legge, incoraggiare l'uso dei flussi post-acquisto corretti e aiutare l'utente a evitare azioni rischiose come uscire dalla chat o condividere dati sensibili. Non può garantire la rimozione dell'annuncio, il recupero del denaro, l'identificazione del venditore o un determinato esito legale.

**EN:** BUYGUARD can realistically reduce the time needed to find the official channel, improve the factual completeness of drafts, expose the difference between private rules and law, encourage use of the correct post-purchase flows, and help users avoid risky actions such as leaving platform chat or sharing sensitive data. It cannot guarantee listing removal, recovery of funds, seller identification, or any legal outcome.

### Metriche da validare, senza percentuali inventate / Metrics to validate, without invented percentages

- precisione e richiamo per categoria di rischio, piattaforma e lingua / precision and recall by risk category, platform, and language;
- tasso di falsi positivi, con revisione specifica per contraffazione e illegalità / false-positive rate, with specific review for counterfeits and illegality;
- accuratezza della categoria ufficiale suggerita / accuracy of the suggested official category;
- completezza rispetto ai campi dell'articolo 16 DSA / completeness against DSA Article 16 fields;
- tempo mediano dal rilevamento all'apertura del canale ufficiale / median time from detection to opening the official channel;
- quota di bozze modificate dall'utente prima dell'invio / share of drafts edited by users before submission;
- esito comunicato dalla piattaforma: accettata, rifiutata, richiesta di integrazione, non noto / platform-reported outcome: accepted, rejected, more information requested, unknown;
- differenza tra motore base e motore base + LLM su un test in cieco / difference between base engine and base engine plus LLM in a blinded test;
- segnalazioni di danno: accuse errate, esposizione di dati personali, categoria legale sbagliata, invio duplicato / harm reports: false accusations, personal-data exposure, wrong legal category, duplicate submission.

Qualsiasi obiettivo numerico — compreso un target di confidenza del 90% — deve indicare **che cosa** rappresenta quel numero, su quale dataset, con quale prevalenza, soglia e intervallo di confidenza. Una confidenza mostrata all'utente non equivale a una probabilità calibrata finché la calibrazione non è stata dimostrata. / Any numerical target — including a 90% confidence target — must define **what** the number represents, on which dataset, with what prevalence, threshold, and confidence interval. A user-facing confidence score is not a calibrated probability until calibration has been demonstrated.

## 7. Registro delle fonti / Source register

Tutte le fonti seguenti sono del titolare della norma, della piattaforma o del fornitore API; non sono stati usati blog o comparatori di terzi. / Every source below is owned by the legislator, platform, or API provider; no third-party blogs or comparison sites were used.

| Fonte primaria / Primary source | Uso / Use | Accesso / Accessed |
|---|---|---|
| [Regolamento (UE) 2022/2065, EUR-Lex](https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32022R2065) | DSA artt. 2, 3, 8, 16, 17, 30, 31, 32 | 2026-09-20 |
| [Commissione europea — Digital Services Act: keeping us safe online](https://commission.europa.eu/news-and-media/news/digital-services-act-keeping-us-safe-online-2025-09-22_en) | Sintesi istituzionale su segnalazione di contenuti illegali e “know your trader” / Institutional overview of illegal-content reporting and know-your-trader | 2026-09-20 |
| [Vinted — Report a member or listing](https://www.vinted.com/help/383/288-raportarea-con%C8%9Binutului-ilegal-sau-a-comportamentului-neadecvat) | Procedura e seguito / Procedure and follow-up | 2026-09-20 |
| [Vinted Italia — Segnalazione di annunci illegali o vietati](https://www.vinted.it/help/notice_and_action_form) | Modulo pubblico italiano e separazione IP/altri contenuti / Italian public form and IP/other-content split | 2026-09-20 |
| [Vinted — Catalog Rules](https://www.vinted.com/catalog-rules) | Categorie vietate e enforcement / Prohibited categories and enforcement | 2026-09-20 |
| [Vinted — Item authenticity policy](https://www.vinted.com/help/560/307-item-authenticity-policy) | Contraffazione e canale IP / Counterfeiting and IP channel | 2026-09-20 |
| [eBay — Come segnalare un contenuto](https://www.ebay.it/help/account/regulatory/come-segnalare-un-contenuto-su-ebay?id=5412&ra=true) | Procedura generale, buona fede, VeRO / General procedure, good faith, VeRO | 2026-09-20 |
| [eBay — Oggetti vietati o limitati](https://www.ebay.it/help/policies/prohibited-restricted-items/oggetti-di-cui-vietata-limitata-la-vendita?id=4207&ra=true) | Segnalazione dall'inserzione / Listing-level reporting | 2026-09-20 |
| [eBay — Segnala un problema con un venditore](https://www.ebay.it/help/buying/working-sellers/report-seller-listing?id=4022) | Distinzione tra violazione e problema d'acquisto / Distinguishing policy breaches from purchase issues | 2026-09-20 |
| [Subito — Segnalazioni e ricorsi](https://assistenza.subito.it/hc/it/articles/12227188789788-Segnalazioni-e-ricorsi) | Annunci, utenti, esito e ricorsi / Listings, users, outcomes, and appeals | 2026-09-20 |
| [Subito — Regole di pubblicazione](https://assistenza.subito.it/hc/it/sections/10743588495133-Regole-di-pubblicazione) | Indice ufficiale delle regole / Official rules index | 2026-09-20 |
| [Subito — Phishing](https://assistenza.subito.it/hc/it/articles/360001165525-Phishing) | Segnali e azioni di sicurezza / Signals and safety actions | 2026-09-20 |
| [Subito — Cosa fare in caso di truffa](https://assistenza.subito.it/hc/it/articles/360000136078-Cosa-fare-in-caso-di-truffa) | Evidenze utili / Useful evidence | 2026-09-20 |
| [OpenAI — API authentication](https://developers.openai.com/api/reference/overview) | API key, workload identity e segretezza / API key, workload identity, and secret handling | 2026-09-20 |
| [OpenAI — Managing billing for ChatGPT and the API platform](https://help.openai.com/en/articles/9039756) | Separazione ChatGPT/API / ChatGPT/API separation | 2026-09-20 |
| [Anthropic — Authentication](https://platform.claude.com/docs/en/manage-claude/authentication) | API key, WIF, App Attest / API key, WIF, App Attest | 2026-09-20 |
| [Anthropic — CLI authentication options](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/authentication) | Ambito del login OAuth CLI / Scope of CLI OAuth login | 2026-09-20 |
| [Google — Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key) | Chiavi Gemini / Gemini keys | 2026-09-20 |
| [Google — Gemini OAuth quickstart](https://ai.google.dev/gemini-api/docs/oauth) | OAuth per Gemini / OAuth for Gemini | 2026-09-20 |
| [Google — Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2) | Tipi di client e flussi / Client types and flows | 2026-09-20 |
| [Google — OAuth 2.0 policies](https://developers.google.com/identity/protocols/oauth2/policies) | Client per piattaforma e requisiti / Per-platform clients and requirements | 2026-09-20 |

## 8. Riesame prima del rilascio / Pre-release revalidation

**IT:** le procedure delle piattaforme e i metodi di autenticazione cambiano. Prima di ogni rilascio, riesaminare tutti gli URL, verificare i nomi esatti dei pulsanti su web e mobile, acquisire fixture aggiornate per le categorie di segnalazione, controllare i requisiti OAuth e conservare data e versione della verifica. Una fonte non verificata oltre il periodo definito dalla policy di prodotto non deve generare automaticamente riferimenti legali o istruzioni puntuali.

**EN:** platform procedures and authentication methods change. Before each release, recheck every URL, verify exact button names on web and mobile, capture updated fixtures for reporting categories, review OAuth requirements, and record the date and version of the check. A source not revalidated within the product policy's defined period must not automatically generate legal references or precise instructions.
