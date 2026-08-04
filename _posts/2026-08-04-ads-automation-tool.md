---
layout: post
title: "Francesco La Vella Ads Tools"
image: /assets/img/profile-300.jpg
date: 2026-08-04
excerpt: "Uno strumento personale che uso per automatizzare la gestione e il reporting delle mie campagne Google Ads."
project: true
tags:
- google-ads
- automazione
- n8n
- api
---

## Cosa è

**Francesco La Vella Ads Tools** è un progetto personale che ho costruito per automatizzare alcune operazioni ricorrenti sul mio account Google Ads: estrazione di report, controlli periodici sullo stato delle campagne e aggiornamento di alcuni parametri (budget, stato degli annunci) in base a regole che decido io.

Non è un prodotto destinato ad altri utenti: è un tool che uso esclusivamente per la gestione dei miei account pubblicitari personali.

## Come funziona

Il progetto è costruito attorno a [n8n](https://n8n.io), uno strumento di automazione a workflow open source che eseguo su un mio server. I workflow si collegano alla **Google Ads API** tramite OAuth 2.0, con il mio account Google come unico utente autorizzato.

In pratica il workflow interroga periodicamente l'API per leggere le performance delle campagne, genera report che ricevo automaticamente, e in alcuni casi esegue modifiche puntuali (ad esempio pausare un annuncio sotto una certa soglia di rendimento) secondo regole che ho definito io.

## Quali dati richiedo e perché

Per funzionare, l'app richiede l'autorizzazione OAuth allo scope Google `https://www.googleapis.com/auth/adwords`, che dà accesso in lettura e scrittura al mio account Google Ads. Mi serve per due motivi specifici:

- **lettura**: recuperare le metriche di rendimento delle campagne (impression, click, spesa, conversioni) per generare i report periodici che ricevo automaticamente;
- **scrittura**: applicare modifiche puntuali che ho definito io stesso, come la pausa di un annuncio quando scende sotto una soglia di rendimento prestabilita.

Non viene richiesto nessun altro scope Google (email, Drive, Calendar, ecc.) e non viene richiesto alcun accesso a dati di altri utenti: l'unico account collegato è il mio.

## Dati e privacy

I dati letti dall'API restano tra il mio account Google Ads e il mio workflow n8n, eseguito su un server che gestisco personalmente. Non vengono raccolti, condivisi o ceduti a terzi, e non vengono usati per finalità diverse da quella descritta sopra.

L'informativa completa sul trattamento dei dati è disponibile nella [Privacy Policy](/PrivacyPolicy/) del sito.

## Contatti

Per qualsiasi domanda su questo progetto puoi contattarmi ai recapiti indicati nella pagina [About](/about).
