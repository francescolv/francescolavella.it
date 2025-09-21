---
layout: post
title: "[Progetto #4] Serra Automatizzata"
image: /assets/img/serra/home.png
date: 2019-05-07
excerpt: "Serra Automatizzata con Arduino"
project: true
tags:
- Arduino
- Makers
- agricolture
- greenhouse
- home automation
---

**Serra Automatizzata con Arduino** [© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)
===
## **Obiettivi**
Costruzione di una Serra in outdoor per la semina di colture da trasferire poi successivamente in campo aperto.

L'Automazione prevede l'aquisizione di dati come Temperature, Umidità dell'aria, Umidità del terreno, Luminosità ambientale e di conseguenza avviare una pompa per l'irrigazione, accendere LED, avviare ventole per il raffreddamento.

## **Componenti e attrezzature**
1. Arduino Mega R3 2560 
2. Modulo relay 4 Canali DC 5V
3. Display I2C LCD 2004 20 x 4
4. Photoresistori 5 mm GL5516 
5. Igrometro
6. Sensore umidità DHT11
7. Alimentatore 10A 12V
8. Converter 12V a 5V 3A DC/DC
9. Resistenze 220 ohm
10. Strisia led 5m DC 12V, Rosso Blu 5:1
11. Pompa Mini DC12V 9W
12. Breadboard
13. Fili elettrici e connettori
14. Sistema tubi irrigazione

## **Descrizione**
Per questo progetto sono partito da una serra che già avevamo in uso, ma con un sistema manuale di monitoraggio e irrigazione.

La serra ha una superficie di 2m x 1m e altezza 1m

Tutto il materiale è stato acquistato su amazon, ma se non si hanno particolari esigenze di tempo molto può essere acquistato anche su Aliexpress con un risparmio economico notevole

L'Assemblaggio non è complesso, si parte dall'Arduino Mega, scelto per le sue ampie possibilità (un numero maggiore di porte di input/output ed una maggiore memoria destinata agli sketch), al quale collego i vari sensori: Un photoresitore per rilevare la luminosità ambientale ed attivare di notte la striscia a LED; l'Igrometro per rilevare l'umidità del terreno ed attivare la pompa dell'acqua; Il sensore di temperatura e umidità ambientale per attivare in futuro le ventole di raffreddamento.

La striscia a LED, la pompa dell'acqua e le ventole sono connesse al modulo Relay

I dati rilevati sono visibili attraverso un display

La pompa dell'aqua pesca l'acqua in un contenitore posto al di fuori della serra e in caso l'umidità del terreno scenda al di sotto di un determinato valore pompa acqua verso un sistema di tubi per l'irrigazione a spruzzo posti nel tetto della serra

In futuro prevedo di rilevare la quantità di acqua nella cisterna che eventualmente può essere collegata direttamente al sistema irriguo e auto riempirsi, inoltre è previsto un sistema di raffreddamento attraverso delle ventole poste ai lati della serra e per serre che prevedono finestre apribili con bracci a pistone un sistema di apertura delle finestre automatizzate in base alla temperatura interna.

## **Codice**
Librerie da Installare:

```
//   Programma remixato da Francesco La Vella da un programma realizzato da Letterio Bavastrelli e rilasciato con GNU GPL V.3
//   Serra autonoma con sensore di temperatura e umidità (DHT11), igrometro, fotoresistore, display LCD 20x4, sensore livello acqua e relè.

//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.

//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.html>.

const int valore_limite = 990; //Valore dell'igrometro al quale il relay sarà ON

//DHT11 Sensor:
#include "DHT.h"
#define DHTPIN 12     // Sensore collegato al PIN 12
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);


//I2C LCD:
#include <Wire.h> // Libreria WIRE (da aggiornare se non funziona)
#include <LiquidCrystal_I2C.h> // Libreria LCD I2C

// LCD I2C address
LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE); // da cambiare se si ha un modello diverso


void setup()
{
// PIN 11 al Relè - IN1  // Pompa dell'acqua
Serial.begin(9600);
  pinMode(11, OUTPUT);

// PIN 10 al relè - IN2  // striscia a led
  pinMode(10, OUTPUT);

// PIN 9 al relè - IN3  // ventole raffreddamento serra
  pinMode(9, OUTPUT);

//PIN 13 al LED  //non sto usando per ora
//  pinMode (13, OUTPUT);

//I2C LCD
Serial.begin(9600);
  lcd.begin(20,4);
  Serial.println("Serra Autonoma di kireime");
  
// Avvio sensore DHT11  
  dht.begin();
}


void loop()
{

// Fotoresistore
int Lumen = analogRead (A0); // Lumen come intero della lettura del pin A0
Serial.print("Sensore crepuscolare: ");
Serial.println(Lumen, DEC); // Stampa un valore decimale del fotoresistore
  
if (Lumen > 750) {
  digitalWrite (10, HIGH); // Se il valore di Lumen è superiore a 750 attiva relè
  lcd.setCursor(0,3);  // Indica posizione del cursore su LCD
  lcd.print("Buona Notte"); // Stampa su LCD il testo
  }
else {
  digitalWrite (10, LOW); // altrimenti spegne relè
  lcd.setCursor(0,3);  // Indica posizione del cursore su LCD
  lcd.print("Buon Giorno"); // Stampa su LCD il testo
  }
delay (2000);  // Intervallo di 2 secondi


//Livello Acqua  // per ora non sto usando
//int water = analogRead(A1);
//Serial.print ("Sensore acqua: ");
//Serial.println(water, DEC);  // Stampa il valore decimale del sensore di livello acqua
  
//  if (water >= 100) {
    
//    lcd.setCursor(0,3);  // Indica posizione del cursore su LCD
//    lcd.print("Acqua: OK"); // Stampa su LCD il testo
//  }
//  else    
//    {
//    lcd.setCursor(0,3);  // Indica posizione del cursore su LCD
//    lcd.print("Acqua: BASSA"); // Stampa su LCD il testo
//    alarm();
//    flash();
//    delay(2000); // Intervallo di 2 secondi
//    }

// Igrometro
int igro = analogRead(A3); // Legge il valore analogico
int umdtrr = 0; // Variabile umidità suolo
umdtrr = map (igro, 100, 990, 100, 0); // converto il valore analogico in percentuale
Serial.print("Umidità del terreno: ");
Serial.print(umdtrr);
Serial.println ("%"); //Stampa a schermo il valore

if (igro <= valore_limite)
  digitalWrite(11,LOW); // Attiva Relè 1
else
  digitalWrite(11,HIGH); // Spegni Relè 1
delay(2000); // Attende due secondi


// Lettura umidità e temperatura del sensore DHT11
int h = dht.readHumidity();
int t = dht.readTemperature();

// Misura la temperatura e se maggiore di 40 gradi attiva relè per accendere la ventola
if (t >= 40 )
   digitalWrite (9, HIGH); // Attiva Relè 3
else
   digitalWrite (9, LOW); // Spegni Relè 3
delay (2000);

  Serial.print("Temp: ");
  Serial.print(t);
  Serial.print("C, Umid: ");
  Serial.print(h);
  Serial.println("%");


// impostare cursore sulla prima riga:
lcd.setCursor(0, 0);
lcd.print("Temperatura: ");
lcd.print(t);
lcd.print("C");
  
// imposta cursore sulla seconda riga:
lcd.setCursor(0,1);
lcd.print("Umidita': ");
lcd.print(h);
lcd.print("%");

// imposta il cursore sulla terza riga:
lcd.setCursor(0,2);
lcd.print("Umidita' terra: ");
lcd.print(umdtrr);
lcd.print("%");

}

// NON USATA PER ORA
/*
void alarm(){
  tone(3,850,700);  // Imposta tono acustico su PIN 3
  delay(150);       // Aspetta per 0,15 secondi
  tone(3,850,700);  // Imposta tono acustico su PIN 3
  delay(150);       // Aspetta per 0,15 secondi
}

void flash() {
  digitalWrite(13, HIGH);   // Imposta il LED su ON
  delay(1000);               // Aspetta per 1 secondo
  digitalWrite(13, LOW);    // Impostiamo il LED su OFF
  delay(1000);               // Aspetta per 1 secondo
}
*/
```
[Scarica lo sketch](/assets/img/serra/SERRA_DOMOTIZZATA.ino)

## **Schema**
![img](/assets/img/serra/serra_fzz.png)

[Scarica lo schema in fritzing](/assets/img/serra/Serra_domotizzata.fzz)

## **Gallery**
[Guarda la raccolta fotografica](/galleria/serra/)