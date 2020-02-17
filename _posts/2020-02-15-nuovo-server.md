---
layout: post
title: "Nuovo anno Nuovo server"
date: 2020-02-15
excerpt: "Nuovo anno Nuovo server"
tags: [post, jekyll]
---
**Nuovo Anno Nuovo Server**
===

E' passato veramente tanto tempo dall'ultimo post pubblicato, un pò a causa di impegni professionali, un pò perchè questo sito in jekyll hostato su github aveva qualche problema.

Allora mi sono deciso a traslocare su un server personale ed aggiornare Jekyll all'ultima versione 4.0

Devo dire che la cosa è stata abbastanza semplice avendo già una LAMP pronta, è stato sufficiente trasferire la directory `_site` generata con il comando `jekyll build` , puntare il virtual host e i DNS al nuovo server ed il gioco è fatto

E visto che la cosa mi è piaciuta, abbiamo deciso di rinnovare anche il sito [www.sintab.it](https://www.sintab.it) con jekyll - Presto online

L'unica cosa che mi rimane da capire è come sincronizzare in modo più rapido il sito locale con quello remoto, con git era veramente immediato, con FTP la cosa è un pò più macchinosa. Quando trovo una soluzione interessante ci faccio un nuovo post.

**Upgrade**
La soluzione che ho trovato per trasferire i file sul server è attraverso il comando rsync (premesso che io ho una chiave ssh con passphrase):

Per trasferire da locale a remoto

```
rsync -aP -e "ssh -i /home/utente/.ssh/chiavessh" _site/ utente@IPSERVER:/home/utente/sitojekyll/
```

Nel server dalla directory sincronizzata con il comando precedente, sincronizzo con la directory presente in /var/www

```
sudo rsync -aP sitojekyll/ /var/www/sitojekyll/
```


**Licenza d'uso**
[© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)