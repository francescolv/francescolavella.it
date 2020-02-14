---
layout: post
title: "Google Drive Sync su Ubuntu"
date: 2018-10-08
excerpt: "Google Drive"
tags: [Howto, post, google]
---
**Google Drive Sync su Ubuntu**
===

Appunti sparsi da riorganizzare:

*Update: 31/10/2018*

Con l'aggiornamento ad Ubuntu 18.10, Grive non va più, e non avendo molto tempo per capire come risolvere ho cercato una soluzione alternativa:

**[google-drive-ocamlfuse](https://github.com/astrada/google-drive-ocamlfuse)**

tra l'altro scritto da un italiano **Alessandro Strada**

Sul link precedente tutti i passaggi per installare e configurare il tutto. Buona lettura

**<u>OBSOLETO</u>**

https://github.com/vitalif/grive2

**Installazione Grive su ubuntu**

```
sudo add-apt-repository ppa:nilarimogard/webupd8
sudo apt update
sudo apt install grive inotify-tools 
```

Lanciare questo test per vedere se funziona

```
inotifywait -h
```

**Installare app indicator**

https://github.com/LyzardKing/grive-indicator

`sudo apt install python3-gi python3-requests gir1.2-appindicator3-0.1`

**Preparazione**

Creare una directory locale chiamata GoogleDrive

mkdir ~/GoogleDrive
cd ~/GoogleDrive
grive -a

Il terminale vi fornirà un link da copiare in un browser web ed autorizzare l'applicazione in google account

Copiare il codice che vi restituisce qui di seguito

`Please input the authentication code here:`

attendere che finisce la sincronizzazione, potete già controllare i file che popolano la nostra directory in GoogleDrive

**Syncronizzazione attiva**

lanciare <u>non come root</u> i seguenti comandi per caricare in systemd la sincronizzazione

```
systemctl --user enable grive-timer@GoogleDrive.timer
systemctl --user start grive-timer@GoogleDrive.timer
systemctl --user enable grive-changes@GoogleDrive.service
systemctl --user start grive-changes@GoogleDrive.service
```

In questi comandi sostituire GoogleDrive con il nome della directory scelta all'inizio in caso di un nome differente dall'esempio. Questo può essere utile in caso di account multipli.

**Per Escludere specifici file o cartelle**

`.griveignore`

- lines that start with # are comments
- leading and trailing spaces ignored unless escaped with \
- non-empty lines without ! in front are treated as "exclude" patterns
- non-empty lines with ! in front are treated as "include" patterns and have a priority over all "exclude" ones
- patterns are matched against the filenames relative to the grive root
- a/**/b matches any number of subpaths between a and b, including 0
- **/a matches a inside any directory
- b/** matches everything inside b, but not b itself
- *matches any number of any characters except /
- ? matches any character except /
- .griveignore itself isn't ignored by default, but you can include it in itself to ignore

**Sincronizzare manualmente**

Lanciare `grive` nella cartella specifica