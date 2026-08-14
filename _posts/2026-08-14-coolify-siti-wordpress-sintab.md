---
layout: post
title: "Coolify: la nuova gestione dei siti WordPress e dei progetti Sintab"
date: 2026-08-14
excerpt: "Ho spostato tutti i siti WordPress che gestisco per Sintab da hosting e pannelli tradizionali a Coolify, su un server mio. Il risultato non è solo 'più comodo': sono script che scoprono lo stato reale invece di fidarsi di un elenco scritto a mano."
description: "Ho spostato tutti i siti WordPress che gestisco per Sintab da hosting e pannelli tradizionali a Coolify, su un server mio. Il risultato non è solo 'più comodo': sono script che scoprono lo stato reale invece di fidarsi di un elenco scritto a mano."
tags: [post, sysadmin, wordpress, coolify, docker, automazione, sintab]
---

Per Sintab gestisco personalmente tutta l'infrastruttura IT, siti web compresi. Fino a poco fa questo significava la solita costellazione di hosting condivisi e pannelli tradizionali: un account per cliente, deploy via FTP o wp-admin, backup affidati al plugin di turno o al provider, nessuna visione d'insieme se non aprendo un pannello alla volta. Funzionava, ma ogni sito nuovo era lavoro manuale che si ripeteva identico, e ogni verifica ("è aggiornato tutto? i backup vanno a buon fine? c'è un sito con un plugin allo sbando?") richiedeva un giro a mano su ognuno.

Nell'ultimo mese ho spostato tutto su **Coolify**, un PaaS self-hosted open source, installato su un server che gestisco io su Hetzner. Oggi una dozzina di siti WordPress di Sintab e dei suoi progetti (formazione, e-commerce interni, portali corsi) girano lì come container, insieme a n8n, Filebrowser e qualche altro servizio. Ma la parte che mi interessa raccontare non è "ho installato Coolify" — è l'insieme di script che ci ho costruito intorno, perché è lì che si è fatto il lavoro vero.

## Un comando per un sito nuovo

Il primo problema era che aprire un sito nuovo restava un rito manuale: creare l'app, il database, i domini, le variabili d'ambiente, il backup, e ricordarsi ogni volta un dettaglio che la volta prima avevo dimenticato. Ho scritto `nuovo-sito.sh`, che prende nome e dominio e fa tutto passando dall'API di Coolify: crea un MariaDB gestito, un'Application buildata dal repo git via Dockerfile, un volume persistente su `/var/www/html`, le variabili d'ambiente (tutte **runtime**, mai build-time — altrimenti la password del database finisce nella history dell'immagine Docker), attiva il backup automatico schedulato, fa il primo deploy e infine aggancia il sito a Filebrowser.

Un paio di cose imparate a mie spese sono finite come commenti nello script stesso, perché altrimenti le avrei dimenticate di nuovo:

```
# I domini si passano ADESSO, alla creazione: Coolify genera le label Traefik
# una sola volta e le salva sull'Application. Cambiare fqdn dopo non le
# rigenera, e il container resta con le label del dominio vecchio -> 503.
```

La primissima versione, prima ancora di questo script, generava a mano un `docker-compose` e lo spingeva via API come Service. Funzionava, ma disattivava i backup automatici di Coolify (funzionano solo sulle risorse che gestisce lui) e teneva la configurazione fuori da git. L'ho sostituita perché un sistema comodo ma che rinuncia ai backup gestiti non è un compromesso accettabile.

## Backup che si scoprono da soli

Il pezzo a cui tengo di più è `backup-siti.sh`. La prima versione aveva l'elenco dei siti scritto a mano in cima allo script. Ha smesso di andarmi bene l'11 agosto, quando uno dei siti è passato da Service ad Application su Coolify e il volume ha cambiato nome: l'elenco fisso avrebbe continuato a salvare un volume ormai morto, senza dare nessun errore. Un backup che sembra riuscito ma salva il nulla è peggio di un backup che fallisce rumorosamente.

Ora lo script non ha nessun elenco: scopre i siti interrogando i container in esecuzione per la variabile d'ambiente `WORDPRESS_DB_NAME`, e da lì risale a utente, password e volume dei file. Se conta meno siti del minimo atteso, si ferma **prima** di scrivere qualsiasi cosa e prima della potatura delle copie vecchie — una copia incompleta che sovrascrive le buone è peggio di nessuna copia.

L'altro cambiamento è dove finiscono le copie offsite. Prima versione upload S3 integrato di Coolify verso Backblaze B2. È bastato che un plugin di export generasse un `.wpress` da 7,4 GB più due tentativi di upload troncati per saturare il piano gratuito e mandare l'intero account in blocco scrittura. Ho tolto Backblaze e sono passato a un **Hetzner Storage Box** via `rclone`, con verifica hash dopo ogni copia e potatura esplicita (`copy`, non `sync`: se svuoto per errore la cartella locale non voglio che la notte dopo si porti dietro anche l'offsite).

## Manutenzione settimanale senza aprire venti pannelli

`maintenance-check.sh` gira ogni lunedì e mi manda un report via email. Controlla se le immagini Docker esterne (WordPress, PHP, MariaDB, n8n) hanno una patch più recente sullo stesso tag, e soprattutto confronta il **commit effettivamente deployato** con la HEAD remota del branch di ogni sito — senza bisogno di un checkout locale dei repository, dato che ormai tutto vive dentro Coolify. Il trucco è che il tag dell'immagine Docker di ogni Application è lo SHA del commit buildato: basta un `git ls-remote` per sapere se un sito è rimasto indietro rispetto a `main`. Lo stesso report controlla lo stato HTTP di ogni dominio e le risorse del server.

## Accesso ai file senza passare da me

L'ultimo pezzo, `filebrowser-sync.sh`, risolve un problema più organizzativo che tecnico: qualcuno in ufficio deve poter aprire i file di un sito senza chiedermi ogni volta una chiave SSH. Filebrowser gira come servizio su Coolify con l'IP dell'ufficio (o la VPN) in allowlist, e i suoi mount vengono **rigenerati da zero** ogni volta a partire dallo stato reale — quali volumi esistono davvero, montati su `/var/www/html` — invece che aggiunti in coda uno alla volta. È idempotente e si autoripara: se un sito viene cancellato, sparisce anche dal mount; se ne nasce uno nuovo, `nuovo-sito.sh` lo aggancia da solo come ultimo passo.

## Cosa cambia, in sostanza

Non è solo "ora è tutto su Docker invece che su hosting condivisi". È che gli script non si fidano più di un elenco scritto una volta e mai più aggiornato: interrogano lo stato reale — i container in esecuzione, i volumi montati, i commit deployati — ogni volta che girano. I due incidenti che li hanno plasmati (il volume rinominato, l'account Backblaze bloccato da un export troppo pesante) sono diventati controlli scritti nel codice, non note a margine da ricordarsi a memoria. Per una dozzina di siti gestiti da una persona sola, è la differenza tra dormire tranquillo e sperare che nessuno faccia domande scomode di lunedì mattina.
