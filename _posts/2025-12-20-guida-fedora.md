---
layout: post
title: "Media Server con Fedora"
date: 2025-12-20
excerpt: "Media Server con Fedora"
tags: [post, linux, fedora]
---
Dall'installazione di Fedora alla gestione di OneDrive e Jellyfin con Podman. Ecco come ho trasformato il mio nuovo PC (ricondizionato) in una centrale multimediale sicura ed efficiente
===
**Introduzione**

Di recente ho deciso di prendere il controllo completo dei miei dati e del mio intrattenimento domestico. L'obiettivo? Creare un sistema che fosse stabile come una roccia, flessibile e capace di gestire tutto: Workstation per ufficio, backup su OneDrive, streaming di film in 4K, recuperando vecchi hard disk da sistemi RAID precedenti.

La mia scelta è ricaduta su Fedora Linux con KDE Plasma. Perché? Perché offre il bilanciamento perfetto tra tecnologie all'avanguardia (BTRFS, Pipewire, Wayland) e una buona stabilità

In questa guida condivido i passaggi chiave della mia configurazione, sperando possa servire da "faro" per chi vuole intraprendere lo stesso viaggio.

**Le Fondamenta: Codec e Strumenti Base**

Appena installata Fedora (operazione filata liscia senza intoppi e senza sbattimenti), la prima cosa da fare è "sbloccarne" il potenziale multimediale. Fedora sposa la filosofia open source pura, quindi per leggere formati proprietari (come H.265 o MP4) serve un piccolo intervento.

Ho abilitato i repository RPM Fusion e installato la versione completa di FFmpeg, fondamentale per la transcodifica video:

```
sudo dnf swap ffmpeg-free ffmpeg --allowerasing
sudo dnf group upgrade multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin
```

Inoltre, ho installato KDE Connect, uno strumento che consiglio a tutti: permette di collegare il telefono Android al PC per controllare il mouse dal divano, mettere in pausa i film quando squilla il telefono e trasferire file al volo.

**Il Cloud Integrato: OneDrive come se fosse una USB**

Uno dei punti critici su Linux è l'assenza di un client ufficiale OneDrive. Ho risolto brillantemente usando Rclone, un tool a riga di comando potentissimo.

Invece di sincronizzare i file (occupando spazio sul disco), ho configurato un "Mount". In pratica, Fedora vede il cloud come se fosse una chiavetta USB sempre attaccata.

Per rendere tutto automatico all'avvio senza dover aprire il terminale, ho creato un servizio Systemd personalizzato:
Ini, TOML

Esempio del mio servizio `~/.config/systemd/user/rclone-onedrive.service`
```
Unit
Description=OneDrive (Rclone)
AssertPathIsDirectory=%h/Cloud
After=network-online.target

Service
Type=notify
ExecStart=/usr/bin/rclone mount onedrive: %h/Cloud --vfs-cache-mode full --no-modtime
ExecStop=/usr/bin/fusermount -u %h/Cloud
Restart=on-failure

Install
WantedBy=default.target
```

Risultato? Accendo il PC e i miei file cloud sono già lì nella cartella "Cloud".

**Jellyfin e la magia di Podman**

Per il media server (l'alternativa open source a Plex), non ho "sporcato" il sistema installando pacchetti a caso. Ho usato Podman.

Podman è l'alternativa a Docker nativa di Fedora: è più sicuro (non richiede permessi di root) e si integra perfettamente col sistema.

Ecco il comando che ho usato per lanciare il server, abilitando l'accelerazione hardware `(/dev/dri)` per non sforzare la CPU durante i film:

```
podman run -d \
 --name jellyfin \
 --label "io.containers.autoupdate=registry" \
 --security-opt label=disable \
 -p 8096:8096 \
 -v ~/.config/jellyfin:/config \
 -v ~/.cache/jellyfin:/cache \
 -v /mnt/raid_jarvis:/media/jarvis \
 --device /dev/dri:/dev/dri \
 docker.io/jellyfin/jellyfin:latest
```
Nota tecnica: L'opzione `--security-opt label=disable` è stata fondamentale per permettere a Jellyfin di leggere i file dai miei hard disk recuperati da vecchi NAS, aggirando le restrizioni rigide di SELinux.

**Gestione Storage: Recupero RAID e Futuro**

La parte più delicata è stata gestire 4 hard disk SATA, alcuni provenienti da vecchi sistemi RAID (mdadm). Linux è stato eccezionale nel riconoscere automaticamente i vecchi array RAID 1, permettendomi di montarli e recuperare i dati senza perdere un bit.

Il mio piano per il futuro? Abbandonare il RAID complesso per una configurazione JBOD (Dischi indipendenti) in EXT4. Più semplice, meno rischi di rottura software, e se un disco muore, perdo solo quei dati e non tutto l'array.

**Sicurezza ed Efficienza Energetica**

Un server acceso h24 deve consumare poco ed essere sicuro.

Backup del Sistema: Ho configurato Timeshift (in modalità RSYNC). Fa delle "foto" al sistema operativo. Se un aggiornamento rompe qualcosa, posso tornare indietro nel tempo in 5 minuti.

Risparmio Energetico: Visto che il PC fa da server, ho usato `powerprofilesctl set power-saver` per calmare la CPU e hdparm per spegnere i dischi meccanici dopo 20 minuti di inattività.

**Conclusione**

Questa esperienza mi ha confermato che Linux oggi non è solo per smanettoni, ma è una piattaforma incredibilmente potente per gestire la propria vita digitale. Con Fedora ho un sistema che è mio al 100%, privato, veloce e costruito esattamente sulle mie esigenze.

**Generated with the support of AI**


**Licenza d'uso**
[© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)
