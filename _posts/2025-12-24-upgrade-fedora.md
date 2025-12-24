---
layout: post
title: "JARVIS 2.0: Costruire il Server Domestico con Fedora Linux"
date: 2025-12-24
excerpt: "JARVIS 2.0: Costruire il Server Domestico con Fedora Linux"
tags: [post, linux, fedora]
---

Nel precedente articolo abbiamo visto i primi passi della nascita di **JARVIS**, il mio server domestico. Ma come ogni buon progetto, "basta che funzioni" non era abbastanza. Volevo sicurezza, performance e automazione.

Oggi vi racconto come ho trasformato una semplice workstation in una fortezza digitale, gestendo storage, streaming 4K e accesso VPN remoto, il tutto su base **Fedora Linux**.

### **Lo Storage: La filosofia "Keep It Simple"**

Siamo partiti con una situazione complessa (RAID degradati), e siamo atterrati sulla soluzione più robusta: JBOD (Just a Bunch Of Disks). Invece di affidarci a controller RAID software instabili, abbiamo montato i 4 dischi singolarmente tramite `/etc/fstab`.

- **Vantaggio**: Se un disco muore, perdo solo quei dati, non l'intero array.

- **Organizzazione**: Ogni disco ha uno scopo preciso (Film, Serie TV, Dati, Backup), montati in modo pulito sotto `/mnt`.


### **Il Cuore Multimediale: Jellyfin su Podman**

Per lo streaming dei media non ho installato software "sporcando" il sistema operativo. Ho scelto **Podman** (l'alternativa sicura a Docker di RedHat).

**La sfida della Transcodifica (HEVC/H.265)**

Il problema principale era la riproduzione di file moderni (MKV in H.265). Fedora, essendo open-source puro, non include i codec proprietari di default. **La soluzione:**

1. Abilitazione dei repository **RPM Fusion**.

2. Installazione tramite `dnf5` dei gruppi `multimedia` e `sound-and-video`.

3. Aggiunta delle librerie `ffmpeg-libs` e `x265`.

Ora JARVIS macina flussi 4K senza incertezze, e grazie alla configurazione di Podman con flag `--restart=always` e il servizio `podman-restart`, il media server torna online da solo anche dopo un blackout.


### **La Fortezza Digitale: Firewalld e Zone**

Qui è dove JARVIS ha fatto il salto di qualità. Invece di un firewall piatto ("apri tutto o chiudi tutto"), abbiamo implementato una strategia a **Zone**.

**Zona 1: La Casa (Rete Fisica `enp2s0`)**

Sulla rete locale, la sicurezza è massima. Abbiamo rimosso il range di porte 1025-65535 (aperto di default su Fedora Workstation) applicando un approccio **Whitelist**:

- **Bloccato**: Tutto.

- **Permesso**: Solo SSH (22), Samba, Jellyfin (8096) e Torrent (2767 TCP/UDP).

**Zona 2: L'Ufficio (VPN `sintabVPN`)**

Il server è collegato all'ufficio tramite una VPN gestita da una Raspberry Pi. Abbiamo spostato l'interfaccia virtuale sintabVPN nella zona **Trusted**.

**Risultato**: Chi entra dalla VPN è considerato "fidato" e ha accesso completo ai servizi senza dover aprire porte extra sul firewall pubblico.


### **Networking e Identità**

Basta ricordare indirizzi IP come `192.168.1.100`.

- **Hostname**: Il server risponde al nome `jarvis`.

- **Risoluzione Nomi**: In casa sfruttiamo mDNS (`jarvis.local`), mentre per i colleghi in VPN abbiamo configurato i file hosts per un accesso trasparente alle cartelle condivise (`\\jarvis`).

Inoltre, per i **Torrent**, abbiamo configurato non solo il firewall di Fedora, ma anche il Port Forwarding sul Router, garantendo la "connettività" completa ai peer per download alla massima velocità.


### **Manutenzione: Il "Tagliando" Mensile**

Un server deve restare pulito. Invece di lanciare comandi a caso, ho creato uno script automatizzato (`tagliando.sh`) che esegue:

1. Aggiornamento sistema (`dnf5 update`).
2. Pulizia cache e container orfani (`podman system prune`).
3. Check-up salute dei dischi (`smartctl`).
4. Ottimizzazione performance (`tuned` impostato su throughput-performance).


### **Conclusione**

JARVIS non è più un semplice PC assemblato. È un server Linux moderno, sicuro e resiliente. Gestisce i dati aziendali via VPN in modo trasparente e l'intrattenimento domestico senza transcodifiche fallite.

La lezione imparata? Pellicola via il superfluo, isola i servizi nei container e usa il firewall in modo intelligente.


**Generated with the support of AI**


**Licenza d'uso**
[© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)
