---
layout: post
title: "Un mese con Claude"
date: 2026-03-28
excerpt: "Rete LAN, digital signage, Android, GNOME, Jekyll: cinque progetti in poche settimane. Un resoconto onesto su cosa significa avere un AI come collaboratore tecnico reale."
description: "Rete LAN, digital signage, Android, GNOME, Jekyll: cinque progetti in poche settimane. Un resoconto onesto su cosa significa avere un AI come collaboratore tecnico reale."
categories: [riflessioni]
tags: [post, ai, linux, networking, php, android, jekyll, signage]
---

Nelle ultime settimane ho lavorato su cinque progetti molto diversi tra loro, quasi tutti con l'aiuto attivo di Claude. Non come suggeritore di snippet, non come motore di ricerca glorificato — ma come qualcuno con cui ragionare ad alta voce, iterare, imprecare quando qualcosa non torna, e ricominciare.

Prima di raccontare i singoli progetti, voglio dire una cosa sull'approccio, perché è cambiato qualcosa nel modo in cui lavoro.

Usare un AI come collaboratore tecnico non significa delegare. Significa avere sempre qualcuno con cui fare il punto. Il vantaggio non è la velocità — anche se quella c'è — ma la possibilità di non restare bloccato. Quando un problema diventa opaco, lo spiego ad alta voce e quasi sempre nel farlo capisco già dove guardare. Claude accelera quel processo: ascolta, risponde in modo contestuale, non parte da zero ogni volta se lo tieni aggiornato. Non è un oracolo. Sbaglia, propone soluzioni che non si compilano, a volte si incarta su dettagli che non esistono. Ma è il miglior interlocutore tecnico che ho avuto in anni, e questo conta.

---

## BLINK: la rete LAN aziendale da veri professionisti

Nella mia nuova sede Blink era necessario installare una "Rete con la R maiuscola". Ho deciso di progettarlo dall'inizio: MikroTik come router centrale, uno switch managed, subnet separate, DHCP con assegnazioni statiche per i dispositivi fissi, e WireGuard per la VPN.

La parte che mi ha tenuto impegnato di più è stata la configurazione WireGuard lato MikroTik. RouterOS gestisce WireGuard in modo leggermente diverso rispetto a una macchina Linux standard, e la documentazione ufficiale è completa ma non sempre immediata da tradurre in pratica. Ho lavorato molto sulla segmentazione delle route e su cosa doveva passare nel tunnel e cosa no.

Cosa non ha funzionato subito: il routing split. Pensavo fosse banale definire quali traffici instradare via VPN e quali tenere locali. Non lo era. Ci sono voluti diversi cicli di test prima di avere un comportamento stabile e prevedibile. Claude è stato utile soprattutto nel diagnosticare i casi limite — traffico che spariva silenziosamente invece di fallire rumorosamente.

Quello che ho imparato: una rete fatta bene richiede di tenere in testa tre livelli contemporaneamente (fisico, logico, applicativo). Quando perdi il filo tra i tre, vai nel panico. Avere qualcuno con cui ricostituire il filo è stato utile quanto gli strumenti di debug.

---

## SignFlow: digital signage self-hosted da zero

Questo è stato il progetto più ambizioso del periodo. Ho costruito una piattaforma di digital signage completamente da zero, senza framework: PHP 8.2 puro, MariaDB, JavaScript vanilla, Apache con mod_rewrite, deploy su Host remoto.

L'idea era semplice: uno schermo remoto che mostra contenuti gestiti da una dashboard web. La realtà era molto meno semplice.

**L'autenticazione JWT senza librerie.** Ho scelto di implementare JWT a mano — non per masochismo, ma per capire cosa stavo firmando. È stato istruttivo e ha richiesto attenzione ai dettagli: encoding Base64Url, HMAC-SHA256, gestione della scadenza, validazione rigorosa dei claim. Claude ha tenuto il pacing su tutti e tre i layer (generazione, verifica, refresh) evitando che perdessi il filo tra le parti.

**Il sistema di pairing.** Ogni TV si registra con un codice a 6 cifre che scade. Sembra semplice, ma c'era da gestire la race condition tra la richiesta di pairing e la conferma dal server, lo stato del player durante l'attesa, e il comportamento in caso di codice scaduto o già usato. Abbiamo iterato parecchio su questa parte.

**SELinux su Fedora.** Questo merita una nota a parte. Il deploy su Fedora con SELinux abilitato è stato un muro. Apache non riusciva a leggere certi file, scrivere in certi path, fare reverse proxy verso socket — tutto silenzioso, senza errori chiari nel log Apache. La diagnostica con `audit2why` e `ausearch` è diventata una routine quotidiana. Claude conosceva bene il contesto SELinux e ha aiutato a identificare i contesti corretti senza ricorrere a `setenforce 0`, che sarebbe stata la resa.

**Cosa non ha funzionato subito:** il player HTML5 con fallback offline. La logica era: se il server è irraggiungibile, usa l'ultima playlist scaricata. Sembrava lineare. In pratica, la gestione del Service Worker, il caching delle risorse media e la sincronizzazione allo startup hanno richiesto molto più lavoro del previsto. Qualcosa funzionava nel browser di sviluppo e si rompeva sul Server. Debugging remoto su hardware embedded con risorse limitate è una categoria di dolore a sé.

**Cosa ho imparato:** zero framework non significa zero struttura. Significa che la struttura devi darla tu, e se non la dai con attenzione, il codice diventa rapidamente ingestibile. Ho sviluppato convenzioni molto precise per routing, response format e gestione degli errori — cose che un framework impone di default. Farlo manualmente ti fa capire perché esistono i framework.

---

## SignFlow Player Android

L'app Android è ancora in lavorazione, ma la base c'è: Kotlin, Media3/ExoPlayer per la riproduzione, Coil per le immagini, Retrofit per la comunicazione con il server.

La parte più interessante è il kiosk mode. Un'app di signage deve resistere all'utente: niente back, niente home, niente notifiche che compaiono sopra il contenuto. Android ha meccanismi per questo (`DevicePolicyManager`, lock task mode) ma richiedono di essere il Device Owner dell'apparecchio, cosa che si configura una volta sola al provisioning del dispositivo.

Quello che non ha funzionato subito: la sincronizzazione tra ExoPlayer e la logica della playlist. ExoPlayer gestisce bene le code di media, ma quando la playlist cambia dinamicamente (nuovo contenuto dal server, elemento rimosso, cambio di ordine), la transizione deve essere pulita. Ho trovato diversi edge case in cui il player rimaneva bloccato sull'elemento precedente o saltava un elemento corretto.

Quello che ho imparato: Android ha una quantità enorme di API, molte deprecate e sostituite da alternative più recenti. Muoversi nella documentazione richiede di capire in quale "era" si trova ciascuna API. Claude è stato utile nell'orientarsi tra le versioni e capire cosa usare nel 2025.

---

## Migrazione GNOME su Fedora 43

Avevo KDE come desktop e mi trovavo bene, ma ho deciso di passare a GNOME che lo trovo molto più moderno. Non una migrazione drammatica, ma qualcosa che ha richiesto attenzione perché avevo configurazioni specifiche, estensioni, shortcut personalizzati.

Il punto interessante è stato capire cosa sopravvive a una migrazione KDE-to-GNOME e cosa invece è legato alla versione specifica. Alcuni file di configurazione in `~/.config/` si trasferiscono direttamente; altri (in particolare le estensioni) dipendono dalla versione di GNOME Shell e possono rompere silenziosamente.

Non è stato il progetto più complicato del mese, ma è stato un buon esempio di come Claude aiuta anche nei task di routine: non facendo le cose al posto tuo, ma ricordandoti i pezzi che avresti dimenticato (le keybindings custom, la configurazione di mimeapps, le impostazioni GTK).

---

## Sito Jekyll su GitHub Pages

Questo stesso sito. Ho rimesso mano all'ambiente di sviluppo locale dopo mesi di inattività, e Ruby non aspettava che io tornassi.

Il problema classico: dipendenze native che non compilavano. `zlib`, `libyaml`, `libffi` — tutte librerie che Jekyll richiede indirettamente, tutte con header che il sistema non trovava nel percorso giusto. Su Fedora, con la versione di Ruby gestita da `rbenv`, la sequenza corretta di flag di compilazione non è ovvia.

Ho anche integrato Goatcounter come sistema di analytics. È leggero, self-hostable, rispettoso della privacy, e non richiede cookie banner. L'integrazione in Jekyll è stata semplice — un frammento di JavaScript nel layout base — ma volevo capire esattamente cosa traccia e come, prima di aggiungerlo.

Quello che ho imparato: mantenere un ambiente Jekyll attivo richiede attenzione periodica. Non è un "set and forget". Le dipendenze Ruby hanno un loro ciclo di vita, e ignorarle per sei mesi significa quasi certamente rompere qualcosa.

---

## Quello che rimane

Guardando indietro a queste settimane, quello che colpisce non è la quantità di cose fatte — è la varietà. Reti, backend PHP, Android, desktop Linux, Ruby gems: domini diversi, problemi diversi, strumenti diversi.

In passato, questa varietà sarebbe stata un collo di bottiglia. Passare da MikroTik a SELinux a Kotlin in pochi giorni richiedeva ogni volta un riscaldamento cognitivo lungo. Con Claude, quel riscaldamento è più corto. Non perché lui sappia tutto — sbaglia spesso sui dettagli specifici di versione, a volte alucina API che non esistono, a volte propone soluzioni che funzionano in teoria ma hanno problemi pratici ovvi. Ma sa tenere il contesto, fare le domande giuste, e aiutarti a non perdere il filo.

I limiti reali sono due. Il primo: Claude non può testare. Può ragionare su un problema, proporre una soluzione, identificare edge case — ma non può vedere cosa succede quando il codice gira sul Server remoto con quella specifica versione di PHP e SELinux configurato in quel modo. Il testing rimane completamente tuo. Il secondo: il contesto finisce. Conversazioni lunghe su progetti complessi richiedono gestione attiva — ricapitolare lo stato, riorientare la discussione. Non è un difetto fatale, ma è un lavoro che va fatto.

Quello che rimane da fare: SignFlow Player Android ha ancora diversi edge case aperti. La rete BLINK funziona ma voglio aggiungere monitoring. E questo sito ha bisogno di più post.

---

**Generated with the support of AI**

**Licenza d'uso**
[© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)
