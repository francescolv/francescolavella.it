---
layout: post
title: "Thunderbird: da Windows a Linux"
date: 2018-05-08
excerpt: "Thunderbird"
tags: [Howto, post, email]
---
**Thuderbird: da Windows a Linux**
===

Se c'è una cosa che ho sempre apprezzato di Mozilla Thunderbird, a differenza dei concorrenti client di posta elettronica, è l'enorme semplicità con cui è possibile fare un backup (esportare e importare) l'intera configurazione del client, compresi account, messaggi, contatti, filtri, ecc.

Se anche voi avete deciso di passare definitivamente a Linux e non volete perdere le configurazioni che avevate sul client di posta Thunderbird, non c'è nulla di più semplice

Per prima cosa apriamo Mozilla Thunderbird su Windows e clicchiamo su File > Compatta cartelle (giusto per prevenire eventuali errori nel trasferimento della configurazione).

A questo punto andiamo a prenderci la cartella che contiene TUTTO lo scibile circa la nostra posta elettronica. Troviamo la cartella a questo percorso: C:\Utenti\<Nome_Utente>\AppData\Roaming\Thunderbird\Profiles\<Nome_Profilo>\.

Il nome profilo è generato casualmente e si riconosce perché termina con .default. Copiamo questa cartella su un supporto removibile, avviamo il nostro SO Linux (Ubuntu, Debian, ecc.) e, se Mozilla Thunderbird è già installato, prepariamoci ad incollare la cartella xxxxxxx.default. 
Dove andiamo ad incollarla? Dentro la nostra cara Home clicchiamo su Visualizza > Mostra file nascosti. Se esiste una cartella denominata .thunderbird ne cancelliamo interamente il contenuto, altrimenti ne creiamo una da zero. 
A questo punto ci incolliamo dentro la cartella xxxxxxx.default prelevata da Windows. Rimane una sola cosa da fare prima di avviare Thunderbird. Portiamoci nella cartella .thunderbird e creiamo un nuovo file. Scriviamoci dentro quanto segue:

[General]
StartWithLastProfile=1
[Profile0]
Name=default
IsRelative=1
Path=xxxxxxxx.default

Chiaramente, al posto di xxxxxxxxx sostituiamo il numero casuale generato per il nostro profilo. Poi salviamo il file e rinominiamolo profiles.ini. A questo punto avviamo Thunderbird e tutta la nostra posta, comprensiva di impostazioni degli account, messaggi, rubrica e quant'altro sarà lì pronta per essere utilizzata... su Linux! Migrazione indolore anche in questo caso





