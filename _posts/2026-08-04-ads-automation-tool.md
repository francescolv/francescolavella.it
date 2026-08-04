---
layout: post
title: "Francesco La Vella – Ads Automation Tool"
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

**Francesco La Vella – Ads Automation Tool** è un progetto personale che ho costruito per automatizzare alcune operazioni ricorrenti sul mio account Google Ads: estrazione di report, controlli periodici sullo stato delle campagne e aggiornamento di alcuni parametri (budget, stato degli annunci) in base a regole che decido io.

Non è un prodotto destinato ad altri utenti: è un tool che uso esclusivamente per la gestione dei miei account pubblicitari personali.

## Come funziona

Il progetto è costruito attorno a [n8n](https://n8n.io), uno strumento di automazione a workflow open source che eseguo su un mio server. I workflow si collegano alla **Google Ads API** tramite OAuth 2.0, con il mio account Google come unico utente autorizzato.

In pratica il workflow interroga periodicamente l'API per leggere le performance delle campagne, genera report che ricevo automaticamente, e in alcuni casi esegue modifiche puntuali (ad esempio pausare un annuncio sotto una certa soglia di rendimento) secondo regole che ho definito io.

## Dati e privacy

Lo strumento accede solo ai dati del mio account Google Ads, tramite lo scope `https://www.googleapis.com/auth/adwords`. Non raccoglie, non condivide e non elabora dati di terze parti: è un'automazione privata a uso personale, non un servizio pubblico.

## Contatti

Per qualsiasi domanda su questo progetto puoi contattarmi ai recapiti indicati nella pagina [About](/about).
