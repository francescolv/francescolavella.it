---
layout: post
title: "Immagine a Destra"
date: 2018-05-07
excerpt: "Immagine a Destra"
tags: [Howto, post, jekyll, markdown]
---
**Allineare l'Immagine a destra**
===
Ho bisogno di allineare un'immagine a destra con il testo che scorre accanto ed uso Markdown in jekyll

Prima di tutto inserisco un immagine in questo modo
{% highlight html %}
![This is an image](/assets/img/immagine.png)
{% endhighlight %}


Ma così facendo l'immagine è al centro. Ed è un elemento di blocco; nulla scorre intorno ad esso.

Quello che vuoi fare è racchiuderlo in un tag <div>, con la classe pull-right di Bootstrap per allineare l'mmagine a destra e far scorrere il testo a sinistra.

Ma Markdown non ti consente di aggiungere classi.

Per superare questo limite è sufficiente installare [kramdown](https://kramdown.gettalong.org/ "kramdown")
semplicemente con 
{% highlight html %}
sudo gem install kramdown
{% endhighlight %}
do per scontato che tu stia utilizzando jekyll in ambiente Linux :-D

E' un superset di Markdown. E una delle aggiunte che fornisce kramdown a Markdown è un attributo extra che puoi aggiungere a un elemento di blocco html. Se aggiungi markdown = "1" al tag div, il markdown all'interno del tag div viene interpretato.
{% highlight html %}
<div class='pull-right' markdown="1">

![This is an image](/assets/img/immagine.png)

</div>
{% endhighlight %}
Ciò produce poprio il nostro effetto desiderato

Un esempio: [About me](http://www.francescolavella.it/about/ "About")

