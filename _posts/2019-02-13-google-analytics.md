---
layout: post
title: "Google Analytics per Jekyll"
date: 2019-02-13
excerpt: "Google Analytics"
tags: [Howto, post, google]
---
**Google Analytics per Jekyll**
===

Questa guida non riguarda come creare un account google analytics o il suo funzionamento ma solo come integrarlo in un sito in Jekyll

Dopo aver ricevuto da google il **Tracking Code ID** possiamo procedere come segue

Prima di tutto crea un file chiamato `google-analytics.html` e incolla lo script che trovi in questa pagina [google_analytics](https://github.com/francescolv/francescolv.github.io/blob/master/_includes/google-analytics.html)

Inserisci nel file `config.yml` questo parametro

{% highlight html %}

#Google Analytics

google_analytics: UA--XXXXXXXX-X

{% endhighlight %}

Google raccomanda di inserire il codice per il tracciamento nella sezione di `<head>`, quidi apriamo il file `head.html` che normalmente si trova dentro la directory `include` e incolla appena prima del tag </head> questo codice che trovi nel mio [repository]()

E questo è tutto!