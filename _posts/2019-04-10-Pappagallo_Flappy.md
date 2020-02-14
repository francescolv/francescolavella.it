---
layout: post
title: "[Scratch 3] Pappagallo Flappy"
date: 2019-04-10
excerpt: "[Scratch 3] Pappagallo Flappy"
coding: true
tags:
- scratch3
- coding
- stem
---

# **[Scratch 3] Pappagallo Flappy**

## **Introduzione**

In questo progetto creiamo la nostra versione del famosissimo gioco per mobile chiamato Flappy Bird. Questo progetto necessita di Scratch 3.0.
Premi la barra spaziatrice per far sbattere le ali al pappagallo Flappy e farlo volare attraverso i tubi tagliati!

## **Pappagallo Flappy**

## **Passo 1: Fai cadere Flappy**

**Lista delle Attività**

- Crea un nuovo progetto Scratch. 

- Rimuovi il gatto Felix con click-destro e seleziona cancella.

- Sostituisci lo sfondo con lo sfondo desert presente nella libreria di Scratch

- Aggiungi il pappagallo Flappy. Devi aggiungere uno sprite con due costumi. Uno per ali-su ed uno per ali-giu. Lo sprite **Parrot** nella categoria Animali della libreria di Scratch va benissimo

- Cambia il nome dello sprite in flappy

- Crea un nuovo script per flappy:    

  ```
  quando si clicca su Bandierina Verde`
  	vai a x: (-50) y: (0)`
  	per sempre`
  		cambia y di (-3)`
  ```


**Verifica il progetto**

Fai click sulla bandierina verde

Flappy inizia a volare al centro dello schermo e poi cade giù?

**Salva il progetto**

## **Passo 2: Fai volare Flappy**

Vogliamo che flappy voli in alto quando premi la barra spaziatrice

**Lista delle Attività**

Fai click sul tab Costumi e chiama i costumi con ali-su e ali-giu.

Adesso torna al tab Codice ed aggiungi questo script:    

```
quando si preme il tasto [spazio]
	passa al costume [ali-giu]
	ripeti (10) volte
		cambia y di (6)
	fine
	passa al costume [ali-su]
	ripeti (10) volte
		cambia y di (6)
	fine
```

**Verifica il progetto**

Fai click sulla bandierina verde

Riesci a controllare flappy con la barra spaziatrice?

**Salva il progetto**

## **Passo 3: Aggiusta i controlli**

Ci piacerebbe che flappy rispondesse ai nostri comandi ogni volta che premiamo spazio. Quando premiamo spazio flappy inizia due cicli di movimento. Se premiamo spazio di nuovo prima che i loop siano finiti Scratch ignora la seconda pressione del tasto spazio. Per risolvere questo problema dobbiamo usare una variabile che conta il numero di battiti di ali necessari.

**Lista delle Attività**

Crea una nuova variabile solo per flappy e chiamala ali

```
quando si preme il tasto [spazio]
	porta [ali] a [0]
	passa al costume [ali-su]
	per sempre
		ripeti fino a quando <(ali) = [0]>
		cambia [ali] di (-1)
	passa al costume [ali-giu]    
	ripeti (10) volte
		cambia y di (6)
	fine
	passa al costume [ali-su]
	ripeti (10) volte
		cambia y di (6)
	fine
```



Infine aggiungi un nuovo blocco quando si preme il tasto [spazio]: 

```
quando si preme il tasto [spazio]
cambia [ali] di (1)
```

**Verifica il progetto**
Fai click sulla bandierina verde
Adesso flappy sbatte le ali ogni volta che premi spazio?

## **Passo 4: Aggiungiamo le tubature** 

Adesso aggiungiamo degli ostacoli che Flappy deve evitare

**Lista delle Attività**

- Fai click su Disegna un nuovo sprite
- Chiama il tuo costume con tubo
- Se il costume è in modalità Bitmap fai click sul pulsante Converti in vettoriale 
- Fai click sullo strumento Rettangolo, seleziona un colore e fai click sul Rettangolo pieno 
- Fai click e crea due rettangoli, uno dall'alto verso il basso ed un altro dal basso verso l'alto, come visualizzato in figura:

Puoi sfumare il colore dei rettangoli facendo click sullo strumento Riempimento, puoi scegliere diversi tipi di sfumatura
Chiama il tuo sprite tubo

**Salva il progetto**

## **Passo 5: Facciamo muovere le tubature** 

Adesso facciamo muovere le tubature in modo casuale in modo da ostacolare il volo di Flappy.

**Lista delle Attività**

Fai click sullo sprite tubo e seleziona il tab Codice.
Aggiungi questi script:    

```
quando si clicca su Bandierina Verde
	nasconditi
	porta dimensione al (150)%
	per sempre
		crea clone di [me stesso]
		attendi (2) secondi

quando vengo clonato
	vai a x:(240)  y: (numero a caso tra (-80) e (80))
	mostra
	ripeti (120) volte
		cambia x di (-4)
	fine
	elimina questo clone
```

**Verifica il progetto**

Fai click sulla bandierina verde
Vedi le tubature apparire a con una fessura a diverse altezze?
Se e' troppo difficile far volare Flappy tra le tubature, puoi rendere la fessura tra i tubi più ampia. Devi editare nuovamente il costume del tubo.

**Salva il progetto**

## **Passo 6: Accorgersi delle collisioni con le tubature**

Per rendere il gioco coinvolgente, il giocatore deve far volare Flappy attraverso le fessure nei tubi senza toccarli mai. Adesso aggiungiamo alcuni blocchi per capire quando Flappy urta qualcosa

**Lista delle Attività**

- Aggiungiamo un effetto sonoro per quando Flappy urta i tubi. Fai click sullo sprite flappy e poi sul tab Suoni
- Scegli un suono dalla libreria e seleziona screech dalla categoria Animali
- Adesso torna sullo script per Flappy
- Aggiungi questo script:    

```
quando si clicca su Bandierina Verde
	attendi fino a quando ((sta toccando [bordo]) o (sta toccando [tubo]))
	produci suono [screech]
	dire [Game Over!]
	invia a tutti [GameOver]
	Ferma [tutti gli altri script dello sprite]
```

Fai click sullo script del tubo ed aggiungi:    

```
quando ricevo [GameOver]
	Ferma [tutti gli altri script dello sprite]
```

**Verifica il progetto**
Fai click sulla bandierina verde
Il gioco finisce quando Flappy urta un tubo o il bordo dello schermo?

**Salva il progetto**

## **Passo 7: Aggiungi il punteggio**

Il giocatore fa un punto ogni volta che riesce a far volare Flappy attraverso una tubatura

**Lista delle Attività**

- Aggiungiamo un effetto sonoro per quando Flappy fà un punto. Fai click sullo sprite tubo ed aggiungi un suono dalla libreria. Scegli bird 
- Torna sullo script di tubo
- Crea una nuova variabile per tutti gli sprite e chiamala punteggio.
- Aggiungi un blocco per impostare il punteggio a 0 quando il gioco inizia:

```
quando vengo clonato
	attendi fino a quando ((posizione x) < ([posizione x] di [flappy]))
	cambia [punteggio] di (1)
	produci suono (bird)
```

**Verifica il progetto**

Fai click sulla bandierina verde

Il punteggio viene incrementato quando Flappy passa attraverso una tubatura? 

**Salva il progetto**

Ben fatto!! Hai finito il gioco base. Ci sono altre cose che puoi fare con il tuo gioco. Dai un'occhiata alle sfide!

## **Sfida 1: Aggiungi l'effetto gravità**

Quando qualcosa cade solitamente non lo fa' a velocità costante. Per questa sfida faremo cadere Flappy con un'accelerazione di gravità.
Aggiungi una nuova variabile solo per lo sprite flappy e chiamala gravità
Cambia lo script per flappy in questo modo:

```
quando si clicca su Bandierina Verde
	porta [gravità] a [0]
	vai a x: (-50) y: (0)
	per sempre
		cambia y di (gravità)
		cambia [gravità] di (-0.4)
```

Cambia lo script di volo in questo modo:    

```
quando si preme il tasto [spazio]
	porta [ali] a [0]
	passa al costume [ali-su]
	per sempre
		ripeti fino a quando <(ali) = [0]>
		cambia [ali] di (-1)
	passa al costume [ali-giu]    
	cambia [gravità] di (8)
	aspetta (0.2) secondi
	passa al costume [ali-su]
	aspetta (0.2) secondi
```

**Verifica il progetto**
Fai click sulla bandierina verde
Adesso Flappy e' attratto verso il basso quando vola e cade?

**Salva il progetto**

## **Sfida 2: Flappy cade per terra**

Quando il giocatore perde la partita Flappy cade a terra al fondo dello schermo
Sostituisci il blocco invia a tutti GameOver con invia a tutti cado
Adesso aggiungi questo script:    

    quando ricevo [cado]
    	ruota in senso antiorario di (5) gradi
    
    quando ricevo [cado]
    ripeti fino a quando <(posizione y) < [-180]>
        cambia y di [gravità]
        cambia [gravità] di (-0.4)
    fine
    nasconditi
    invia a tutti [GameOver]

Non dimenticarti di aggiungere il blocco mostrami e di orientare Flappy nella giusta direzione quando il gioco inizia.

**Verifica il progetto**
Fai click sulla bandierina verde
Flappy cade per terra quando urta una tubatura?
Flappy riappare nella corretta posizione ed orientamento quando il gioco riprende?

**Salva il progetto**

## **Sfida 3: Aggiungi un record**

+ Crea una nuova variabile e seleziona `Cloud variable (stored on server)`
  Chiamala `record`
+ Quando il gioco e' finito controlla se devi registrare un nuovo record:
```blocks
quando ricevo [GameOver]
    se <(punteggio) > (record)> allora
        porta [record] a (punteggio)
    fine
    arresta [tutti gli altri script dello sprite]    

Verifica il progetto
Fai click sulla bandierina verde
Il record viene aggiornato correttamente?
Salva il progetto
```

Ben fatto!!! Hai finito con questo esercizio. Adesso divertiti con il tuo nuovo gioco!!!
Ehi, non dimenticare che puoi condividere il tuo gioco con tutti i tuoi amici e familiari. 



Progetto convertito per scratch 3 partendo da

[Scratch-curriculum di Raspberry pi Foundation](https://github.com/RaspberryPiFoundation/scratch-curriculum)

