---
layout: post
title: "Upgrade totale del sito con claude code"
date: 2026-05-01
excerpt: "Con Claude Code rilevati tanti bug e aggiornato mille cose senza scrivere direttamente una sola linea di codice"
description: "Con Claude Code rilevati tanti bug e aggiornato mille cose senza scrivere direttamente una sola linea di codice"
tags: [post, ai, jekyll, CSS]
---

Questo blog gira da anni su un tema Jekyll che mi ero portato dietro praticamente intatto: avatar nel cerchio rosso, titolo in Lobster, qualche effetto blur quando apri il menu. Funzionava, e per quel motivo non lo avevo mai toccato sul serio. Ho aperto Claude Code una sera con un'idea molto vaga — "leggi tutto il progetto, verifica se ci sono ottimizzazioni da attuare" — e nel giro di qualche ora il sito è cambiato da dentro pur restando, in superficie, lo stesso sito.

## Tre postazioni e un repo

Il primo passo è stato risolvere un mio problema operativo: scrivo da tre macchine diverse — fisso di casa, portatile, fisso in studio — e fino a poco fa il workflow era fragile. Ora lavoro su un repo Git, con la stessa cartella sincronizzata via GitHub, e su ognuna delle tre postazioni ho `claude` configurato allo stesso modo. Apro il terminale, `git pull`, lavoro, `git push`. La parte interessante è che Claude Code legge davvero il progetto: i `_posts`, i layout, gli SCSS, persino i plugin Ruby in `_plugins/`. Questo significa che le modifiche non sono mai a tentoni — sono sempre ancorate a quello che c'è già.

## I bug che vivevano da otto anni

L'audit iniziale ha tirato fuori cose imbarazzanti. Il filtro {% raw %}`{{ content | liquify }}`{% endraw %} in `_layouts/post.html` puntava a una gem che nel `Gemfile.lock` non esisteva, quindi non faceva niente da chissà quanto. Otto layout caricavano jQuery 3.2.1 da CDN e contemporaneamente, dentro `scripts.html`, veniva caricata anche la 1.12.2 — due jQuery diversi sulla stessa pagina, uno che si sovrascriveva l'altro. Il plugin custom `youtube.rb` aveva l'href dell'embed *hardcoded* a un video specifico: in pratica ogni {% raw %}`{% youtube %}`{% endraw %} puntava sempre allo stesso video sbagliato. Ventidue link `target="_blank"` senza `rel="noopener"` — vulnerabilità da reverse-tabnabbing che è lì da sempre.

Pulizia: jQuery via, sostituito da una novantina di righe di vanilla JS in `assets/js/menu.js` e `assets/js/goup.js`. Gli script inline duplicati negli otto layout — quaranta righe ciascuno, sempre uguali — diventati un singolo `<script defer src="menu.js">`. Il filtro morto rimosso, il plugin YouTube corretto, i `rel="noopener noreferrer"` aggiunti dappertutto.

## Immagini: 9.6 MB diventati 4.8

Non avevo mai guardato nemmeno la dimensione delle immagini. `profile.png` era 3.1 MB. Tremilacento *kilobyte* per un avatar che si vede a 300×300. Peggio: lo stesso file, alla stessa risoluzione gigantesca, era usato come `og:image` per *ogni* anteprima social. C'era anche `avatar_flv.png` da 2.3 MB nella cartella, non referenziato da nessuna parte da chissà quando. Con `imagemagick` e `cwebp` ho generato `profile-300.webp` (16 KB), `profile-600.webp` (38 KB) per il retina, e `profile-og.jpg` (297 KB) per le anteprime social. Il layout home ora usa un `<picture>` con `srcset` 1x/2x. Risultato: la cartella `assets/img` è passata da 9.6 MB a 4.8 MB, e l'avatar in homepage scarica oggi 16 KB invece di 3.1 MB. Una differenza di duecento volte.

## Cookie banner e Disqus su richiesta

La cookie bar che usavo era CookieConsent v3.0.3, libreria abbandonata dal 2018, caricata via protocollo `//` (deprecato). L'ho sostituita con `vanilla-cookieconsent` v3 di orestbida — moderna, leggera, in italiano. Ma il vero cambiamento è un altro: GoatCounter (le mie statistiche) non setta cookie, e Disqus ora è caricato in *lazy load* solo quando l'utente accetta esplicitamente la categoria "commenti". Sui post compare un bottone "Mostra commenti" che, se il consenso non c'è, apre il modal preferenze invece di caricare lo script. Niente cookie di tracciamento finché qualcuno non li chiede, di fatto.

## Responsive: la vera vergogna

Il tema, nato in epoca pre-mobile, era pieno di `width: 1000px` hardcoded. Su un telefono compariva la scrollbar orizzontale e bisognava zoomare. Ho convertito tutti i container fissi (`.ortalaAna`, `.programcerceve`, `.iletisim`, eccetera) in `max-width` con `width: 100%`, ho aggiunto un `box-sizing: border-box` globale, ho fatto scalare i font con `clamp()` invece dei pixel fissi, e ho introdotto due breakpoint nuovi a 768 e 480 pixel. La griglia dei progetti diventa due colonne sotto i 768, una sola sotto i 480. Le sidebar collassano sotto al contenuto. C'è anche un blocco `@media (prefers-reduced-motion: reduce)` che disabilita tutte le animazioni e i blur per chi ha quella preferenza nelle impostazioni del sistema operativo.

## La pulizia semantica

Il tema l'avevo preso da un autore turco e mi ero portato dietro le sue classi: `.yazi`, `.yazibilgisi`, `.programcerceve`, `.urunResmi`, `.menuMobil`. Funzionavano, ma aprire i DevTools e leggere `<div class="programcerceve">` era straniante. In una passata di rinomina massiva ho riscritto tutto in nomi semantici inglesi: `.post`, `.post-meta`, `.project-frame`, `.product-image`, `.menu-drawer`. Trentotto classi rinominate in modo coordinato attraverso layout, SCSS e JavaScript, con boundary regex per non rompere prefissi. E il finale: la stringa {% raw %}`{{ page.date | date_to_string }} tarihinde yayınlandı.`{% endraw %} — era turco da sempre, "pubblicato in data X" — è diventata {% raw %}`Pubblicato il {% include date-it.html %}`{% endraw %} con un piccolo include che traduce il mese in italiano. Quindi non più "01 May 2026", ma "1 maggio 2026". Otto anni dopo.

## Cosa resta

Niente di urgente. Le pulizie strutturali sono fatte, il sito è leggero, responsive, accessibile, in italiano, con tutti i bug che mi portavo dietro silenziosamente sistemati. Restano le cose minori: le immagini dei post più vecchi che si potrebbero ottimizzare, qualche `@font-face` che si potrebbe restringere a subset latino. Cose che si fanno se si ha voglia, non perché serve.

La parte che mi ha colpito di più non è quanto codice è stato scritto — è quanto è stato *eliminato*. Variabili SCSS morte, plugin che non chiamavo, librerie obsolete, file di asset abbandonati, classi turche, inline duplicati, link rotti a domini scomparsi. Quasi tutto questo lavoro è stato sottrarre, non aggiungere. E quel tipo di lavoro è quello che, da soli, di solito non si fa mai.
