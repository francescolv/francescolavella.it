---
layout: post
title: "Progetto #2"
image: /assets/img/windows-ubuntu.jpg
date: 2018-09-19
excerpt: "Ubuntu 18.04 su Lenovo IdeaPad 520s 14IKB"
project: true
tags:
- ubuntu
- linux
- blog
---

**Progetto #2 _Ubuntu 18.04 su Lenovo IdeaPad 520s 14IKB**
===
Di recente ho acquistato un nuovo notebook mandando in pensione il mio vecchio netbook *Acer Aspire One 722-C52* ormai stremato dopo una lunga carriera nerd.
La scelta è caduta su [Lenovo 520s](https://www.lenovo.com/it/it/laptops/ideapad/500-series/Lenovo-IdeaPad-520S-14IKB/p/88IP50S0825) soprattutto per le dimensioni e per un buon compromesso prestazioni / prezzo, per il doppio hard disk (SSD da 125 Gb e HDD da 1 Tera), per una scheda grafica Nvidia GeForce 940MX con 2Gb dedicati.

Ma tornando a casa con il mio nuovo giocattolino ecco la sorpresa. Avvio una live [Ubuntu 18.04 LTS](https://www.ubuntu-it.org/download) per installare in dualboot (efi manco a dirlo) e mi accorgo che stranamente viene riconosciuto un solo disco, quello da un tera e nessuna traccia del disco SSD. 
Mi dico "Poco male, avevo già intenzione di installare Ubuntu nel disco più grande anche se perderò qualcosa in termini di prestazioni rispetto alla velocità di un disco SSD, ma sicuramente ho più spazio a disposizione". 

Avvio la modalità di installazione super guidata tipica di Ubuntu. Scelgo di partizionare il disco manulamente, e anche qui nessuna traccia del disco SSD, così come non c'è nessuna traccia di Windows nè della partizione efi necessaria poi per il boot. Decido di andare avanti e vedere come va. Tutto procede come previsto. concludo l'installazione e riavvio il sistema.

Dal BIOS nella sezione dedicata alla scelta del boot di avvio, nessuna traccia della nostra Ubuntu, e diciamo che me lo aspettavo, senza aver indicato la partizione EFI era impossibile che le cosse fossero andate per il verso giusto. E allora inizio a leggere un pò di guide e sopratutto cerco di capire che fine ha fatto il disco SSD ogni volta che avvio una live di Ubuntu (perchè chiaramente su Windows tutto si palesa).

E la prima cosa che scopro è che in realtà i dischi non sono due, bensì uno ma [Hibrido](https://it.wikipedia.org/wiki/Hard_disk_ibrido) e sembrano funzionare con una sorta di sistema RAID.

Poi scopro che queste nuove macchine Intel utilizzano un nuovo sistema alternativo ad [AHCI](https://it.wikipedia.org/wiki/AHCI) (Advanced Host Controller Interface, una tecnologia hardware che permette di comunicare con le periferiche Serial ATA) chiamato [Intel RST](https://www.intel.it/content/www/it/it/architecture-and-technology/rapid-storage-technology.html) (Rapid Storage Technology) che manco su wikipedia trovi la definizione, e ben poche persone al mondo hanno installato Linux su questo notebook e figuriamoci in dual boot.

Insomma l'impresa sembra veramente ardua (...e mo chi lo sente il mio amico mrfree... io costretto a vita ad utilizzare Windows, sottomesso e senza via d'uscita).

Quasi penso a dare indietro il computer e cercare un modello differente ma che questa volta supporti più facilmente una distribuzione Linux. Ma come mi ripete sempre il mio carissimo amico (a cui dedico questo articolo), la determinazione ti fa arrivare ovunque.

Allora continuo la mia disperata ricerca e in un forum francese di Ubuntu sembra che un tipo è riuscito ad installre in dual boot proprio su questo notebook l'ultima versione di Ubuntu semplicemente andando a selezionare la modalità AHCI tra le opzioni SATA del BIOS. 

**Eureka!!**

Corro subito a provare.
Ma andando a disattivare il supporto Intel RST un messaggio minaccioso giunge alla vista:

Se al tipo francese è andato tutto liscio che mai vorrà accadere, quindi procedo, dico si e vado avanti.

Avvio la mia live e procedo all'installazione, questa volta tutti i dischi ci sono, finalmente, e anche la partizione efi è al suo posto, perfetto, *"E' andata"* mi dico!.

Ubuntu dopo tutti i passaggi di rito è bella che installata. Riavvio e voilà (ormai il francese è il mio forte), nel bios tra le impostazioni efi ci sono sia Ubuntu che Windows, avvio Ubuntu ed è ok. Allora provo ad avviare Windows, ma ecco i primi segnali di rottura. 

Va bhe, mi dico, in effetti il tipo francese aveva segnalato il fatto che per avviare ogni volta windows era necessario ritornare alle Impostazioni Intel RST nel bios. Allora di nuovo un riavvio, entro nel boot, ma di questo settaggio nemmeno l'ombra. 

Provo a mettere al primo posto come opzione di boot Windows, ma al riavvio la simpatica schermata blu. Provo a cercare una soluzione su google (cazzo, in questi casi non ti è mai amico) e sembra una catastrofe. 

Con Ubuntu zero problemi, almeno questo. Ma l'obiettivo era avere anche Windows funzionante.

Ricontrollo le varie opzioni del BIOS sperando magari in una svista, ma niente.

Unica soluzione rimasta è resettare il BIOS, la guida segnala una combinazione di comandi: F9 per il ripristino e F10 per salvare. 

Procedo

Cavolo è andata, ecco di nuovo la sezione SATA e di nuovo Intel RST al suo posto. Riavvio e Windows c'è!

Insomma ricapitolando:

* Nel Bios sotto la sezione SATA selezionare modalità AHCI
* Installare Ubuntu (cosiglio di partizionare prima il disco recuperando circa 100Gb dal disco da 1T)

Per tornare a Windows

* F9
* F10
* verificare che l'opzione Intel RST sia abilitata
* Riavviare il PC

e così ogni volta che lo si desidera.

Alla prossima avventura.
