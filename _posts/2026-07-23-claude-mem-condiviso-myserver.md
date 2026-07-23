---
layout: post
title: "Memoria condivisa per Claude Code, su un server tutto mio"
date: 2026-07-23
excerpt: "Ho spostato claude-mem su un server centrale via SSH, per avere la stessa memoria su tutte le postazioni senza affidare le mie sessioni di lavoro a un cloud di terzi."
description: "Ho spostato claude-mem su un server centrale via SSH, per avere la stessa memoria su tutte le postazioni senza affidare le mie sessioni di lavoro a un cloud di terzi."
tags: [post, ai, linux, sysadmin, sqlite]
---

Da un po' uso [claude-mem](https://github.com/thedotmack/claude-mem), un plugin per Claude Code che trasforma ogni sessione in osservazioni compresse e le ripropone nelle sessioni successive: niente più "allora, come ti dicevo ieri...". Il problema è che la memoria vive in un database SQLite locale, dentro `~/.claude-mem`. Locale, appunto. 

E io — l'ho già raccontato parlando di [questo stesso blog](/upgrade-totale-claude-code/) — lavoro da più postazioni. Ogni macchina aveva la sua memoria, isolata dalle altre. Cominciare una sessione sul portatile senza il contesto accumulato al fisso in studio, ogni volta, era esattamente il problema che claude-mem dovrebbe risolvere.

## Le opzioni sul tavolo

claude-mem offre già un modo per sincronizzare tra macchine: **cmem.ai**, un servizio cloud della stessa softwarehouse, con un hub proprietario (un Cloudflare Worker per utente) che fa da centro sync. Comodo, supportato, zero configurazione oltre a un token. Ma significa caricare su un'infrastruttura di terzi le narrazioni delle mie sessioni di lavoro — che spesso includono cose di clienti e progetti aziendali. Per uso personale forse ci avrei anche pensato, ma non con dati che non sono solo miei.

Ho controllato se esistesse un modo per auto-ospitare quello stesso hub. Non esiste: ho trovato una discussion su GitHub dove il maintainer conferma che no, self-hosted non è previsto, e gli script di export/import manuale sono anche rotti (`FOREIGN KEY constraint failed`, per chi è curioso). Altra strada scartata: montare la cartella `~/.claude-mem` via rete (NFS o sshfs) e condividerla tra macchine. SQLite in WAL mode — quello che usa claude-mem — sopra un filesystem di rete è una ricetta nota per corruzione dei dati: il locking a byte-range che il WAL richiede spesso non è implementato correttamente da quei filesystem. Meglio di no.

La soluzione più semplice, alla fine, era anche la più ovvia: invece di sincronizzare un database tra macchine diverse, eliminare le macchine diverse. Un solo posto dove il database vive, e ci si collega da dovunque via SSH.

## Un server Hetzner per tutto

Da un po' ho messo su un server su Hetzner che uso come base per gestire tutti i miei progetti — repository, ambienti di lavoro, servizi che devono girare in modo continuo. Ci si accede via SSH, con un alias dedicato nel mio `~/.ssh/config`. Era la casa naturale anche per claude-mem: un solo posto, sempre acceso, che già considero "il mio server" per tutto il resto.

## L'installazione: tre runtime, non uno

Qui la parte tecnicamente interessante. claude-mem non gira solo su Node: il suo worker daemon usa `bun:sqlite` per parlare col database, quindi richiede **Bun**, non solo Node.js. E per la ricerca semantica usa **Chroma** via `chroma-mcp`, lanciato con `uvx` — quindi serve anche **uv**, il gestore di pacchetti Python di Astral. Tre runtime diversi (Node, Bun, uv) per un plugin che sulla carta "aggiunge memoria a Claude Code".

Sul server nuovo, nessuno dei tre era installato. Li ho messi su tutti in user-space, senza toccare i pacchetti di sistema (a parte `unzip`, richiesto dall'installer di Bun):

- Node 22 via `nvm`
- Bun via il suo installer ufficiale
- `uv`/`uvx` via l'installer di Astral

Poi marketplace e plugin con la CLI di Claude Code stessa:

```
claude plugin marketplace add thedotmack/claude-mem
claude plugin install claude-mem@thedotmack
```

Il primo tentativo di avvio ha subito segnalato nei log l'assenza di Bun ("worker daemon requires Bun because it uses bun:sqlite"). Installato Bun, il worker si è avviato ma senza ricerca semantica ("uvx executable not found for chroma-mcp"). Installato anche `uv`, riavviato il worker, e al terzo giro tutti i pezzi hanno agganciato: sessione registrata nel database, Chroma connesso, nessun errore nei log.

## Un alias per non pensarci più

Il login di Claude Code resta l'unico passaggio davvero manuale — richiede il browser, quindi va fatto una volta a mano dentro una sessione `tmux` sul server (per non perderlo se cade la connessione SSH). Fatto quello, ho aggiunto un alias in `.bashrc` che riassume tutto il flusso quotidiano:

```
alias mc='ssh -t myserver "tmux new-session -A -s claude claude"'
```

`tmux new-session -A` crea la sessione se non esiste, altrimenti si riattacca a quella già viva — quindi la prima volta apre `claude`, le volte dopo ritrovo la sessione esattamente dove l'avevo lasciata, da qualsiasi postazione digiti `mc`.

## Cosa cambia, davvero

Non lavoro più "in locale" quando uso Claude Code per certe cose: lavoro dentro il server, e i progetti che voglio che claude-mem osservi devono vivere lì. È un cambio di abitudine, non solo di configurazione. In cambio ho un solo database SQLite, mai conteso da due macchine insieme, senza rischio di corruzione da filesystem di rete e senza che una singola riga delle mie sessioni finisca su un cloud che non controllo. Per il tipo di lavoro che faccio — clienti, dati aziendali, roba che non è solo mia da condividere — mi sembra il compromesso giusto.
