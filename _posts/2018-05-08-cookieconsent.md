---
layout: post
title: "Cookie Consent"
date: 2018-05-08
excerpt: "Cookie Consent"
tags: [Howto, post, jekyll]
---
**Inserire barra Cookie Consent**
===

## Aspetti Normativi

Con l'entrata in vigore della Direttiva comunitaria 2009/136/CE che ha modificato la direttiva 2002/58/CE (detta anche E-Privacy) ogni sito web deve informare l'utente del fatto che si fa uso dei cookie sul sito, e in determinati casi occorre ottenere il consenso preventivo all'uso degli stessi. La normativa in materia di cookie, di cui alle direttive europee, è stata recepita in Italia con la nuova formulazione dell'art. 122 D. Lgs 196/2003. La normativa europea non è entrata subito in vigore per i ritardi dei Garanti nazionali nel predisporre la regolamentazione di dettaglio. 
L'8 maggio 2014 anche il Garante per la Protezione dei Dati Personali italiano, come già in precedenza avevano fatto altri Garanti europei, ha emanato il Provvedimento “Individuazione delle modalità semplificate per l'informativa e l'acquisizione del consenso per l'uso dei cookie” (Gazzetta Ufficiale n. 126 del 3 giugno 2014), dettante le regole sulle modalità di adempimento agli obblighi di rilascio dell'informativa e di acquisizione del consenso degli utenti in caso di utilizzo di cookie. Il provvedimento è entrato in vigore il 3 giugno del 2015.

## Aspetti tecnici

Esposti gli aspetti normativi vediamo come poter visualizzare la cookieconsent sul nostro sito in Jekyll

* **Installazione plugin**
{% highlight html %}
sudo gem install cookieconsent
{% endhighlight %}

* **Configurazione**

Grazie al sito [cookieconsent](https://cookieconsent.insites.com/download/) configuriamo ogni aspetto grafico e ci copiamo il codice relativo generato dal sito stesso.

* **Creazione della pagina cookieconsent**

Incolliamo il codice dentro un file chiamato cookieconsent.html (directory _includes)

* **Personalizzazione della Home**

In home.html (directory _includes) scriviamo questo codice, prima del tag </head>

{% highlight html %}
\{\% include cookieconsent.html %\}\
{% endhighlight %}





