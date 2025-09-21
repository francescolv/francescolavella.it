---
layout: post
title: "Guida Installazione da zero Jekyll su WSL"
date: 2025-09-19
excerpt: "Guida Installazione da zero Jekyll su WSL"
tags: [post, jekyll]
---
**Guida Passo Passo per installare Jekyll e gestire il nostro sito**
===

Anche se questo sito è rimasto dormiente per un pò, grazie all'azzeccatissima scelta di utilizzare jekyll come motore per scrivere questo sito, con pochi passaggi ho di nuovo tutto bello pronto e aggiornato all'ultima versione

Ma prima di aggiornare questo post ho dovuto riconfigurare jekyll sul mio pc, sincronizzare i repo su git e via...

Raccolgo in questa guida tutti i passaggi passo passo, da zero per un sistema funzionante su WSL Ubuntu

### Installeremo 
1. Ruby 3.4.6
2. Jekyll 4.4
3. imagemagick (per me è necessario perchè ho una gallery)
4. Git

### Ruby

Installazione con rbenv (consigliato)

Aggiorna i pacchetti e installa le dipendenze

Apri il tuo terminale WSL e esegui i seguenti comandi per aggiornare la lista dei pacchetti e installare le librerie necessarie per la compilazione di Ruby

    sudo apt update
    sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev libffi-dev libyaml-dev

Installa rbenv

Clona il repository di rbenv

    git clone https://github.com/rbenv/rbenv.git ~/.rbenv

Inizializza rbenv nel tuo terminale (questo aggiungerà le righe necessarie al tuo file .bashrc o .zshrc)

    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
    echo 'eval "$(rbenv init -)"' >> ~/.bashrc
    source ~/.bashrc

Installa il plugin ruby-build
Questo plugin permette a rbenv di scaricare e compilare Ruby

    git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

Installa Ruby 3.4.6

    rbenv install 3.4.6

Questo comando scaricherà e compilerà Ruby, il che potrebbe richiedere alcuni minuti. 

Verifica l'installazione

Controlla che Ruby sia stato installato correttamente e che sia la versione desiderata:

    ruby -v

### Jekyll
Installa Bundler

È utile installare subito Bundler, il gestore di gemme per Ruby

    gem install bundler
    rbenv rehash
    gem update --system
    gem install bundler jekyll
    rbenv rehash
    jekyll -v

### Sito jekyll già installato

    bundle update
    bundle exec jekyll serve

Anteprima

    http://127.0.0.1:4000/

### github

Aggiorna e installa Git (in WSL)

    sudo apt update && sudo apt install -y git openssh-client

Configura Git (nome/email e opzioni utili)

Sostituisci con i tuoi dati GitHub.

    git config --global user.name "Nome Cognome"
    git config --global user.email "la-tua-email-collegata-a-github@example.com"
    git config --global init.defaultBranch main
    git config --global pull.rebase false

Genera una chiave SSH in WSL (salta questo passaggio se hai già una tua chiave)

Consigliato per evitare token/password ogni volta.

    ssh-keygen -t ed25519 -C "la-tua-email-collegata-a-github@example.com"

Premi Invio per accettare ~/.ssh/id_ed25519 e (facoltativo) imposta una passphrase

Avvia l’agent e carica la chiave

    eval "$(ssh-agent -s)"
    ssh-add ~/.ssh/id_ed25519

Aggiungi la chiave pubblica al tuo account GitHub

Copia la chiave

    cat ~/.ssh/id_ed25519.pub

Vai su GitHub → Settings → SSH and GPG keys → New SSH key.

Incolla l’output.

(Se preferisci via CLI, puoi installare gh e fare gh auth login, ma non è necessario.)

Testa la connessione SSH a GitHub

    ssh -T git@github.com

Alla prima connessione, rispondi yes. Se vedi un messaggio tipo “Hi <tuo-username>! You've successfully authenticated…”, sei a posto.

Scegli dove mettere il progetto e clona il repo

    mkdir -p ~/progetti && cd ~/progetti
    git clone git@github.com:tuorepo.git
    cd progetti

Verifiche rapide

    git remote -v           # deve mostrare l'URL SSH
    git status              # stato della working tree

### Aggiornare i repo

    git add -A
    git commit -m "Aggiornamenti"
    git push origin main

### Alias
Se hai il tuo progetto in una cartella Documenti di windows spesso il comando è un pò lungo, per velocizzare la cosa ho impostato un alias, ti mostro come fare

In WSL le directory di Windows sono in /mnt/c/

un comando tipico potrebbe essere cd "/mnt/c/Users/Francesco/Code/repo-git" (è messo tra " " perchè in questo modo eventuali spazi presenti nelle directory sono gestiti senza errori)

Utlizziamo gli alias per praticità

Se usi bash (default in WSL):

    nano ~/.bashrc

Aggiungi l’alias in fondo al file

    alias jekyll='cd "/mnt/c/Users/Francesco/Code/repo-git"'

Così il comando sarà jekyll

Ricarica la configurazione

    source ~/.bashrc   # o ~/.zshrc se usi zsh

D’ora in poi, ti basta digitare:

jekyll

e verrai portato direttamente nella cartella del progetto.

### github page
il build “nativo” di GitHub Pages non supporta Jekyll 4.4 (al momento GitHub Pages usa lo stack github-pages che blocca Jekyll a 3.10.x)

Per usare Jekyll 4.4 devi costruire il sito con GitHub Actions e pubblicare l’output di _site


**DNS Github page**
A records,

    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153

AAAA records

    2606:50c0:8000::153
    2606:50c0:8001::153
    2606:50c0:8002::153
    2606:50c0:8003::153

Nel mio caso specifico:

Valore: @   Tipo: A  Valore: 185.199.108.153
Valore: @   Tipo: A  Valore: 185.199.109.153
Valore: @   Tipo: A  Valore: 185.199.110.153
Valore: @   Tipo: A  Valore: 185.199.111.153

Valore: www Tipo: CNAME Valore: francescolv.github.io

Ricordi di forzare nel pannello di ghithub HTTPS


**Applicativi aggiuntivi che possono tornare utili**

    sudo apt-get install libmagickwand-dev

    Github Page Actions non digerisce la gallery con questo metodo, quindi ho riscritto completamente la Gallery utilizzando solo HTML/CSS senza plugin esterni

**Licenza d'uso**
[© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)