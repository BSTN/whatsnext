# what's next / Wat nu? profielen

In deze map staan alle profielen van de verschillende fictieve personages voor de pilot van deze tool. Elke document is een nieuwe personage. 

## metadata
Elk profiel heeft metadata bovenaan staan tussen de ---. Voor nu is dat:
```
- title: Naam van de persoon
- description: Eventuele beschrijving
- theme: {nummer}
```

## Menu

Het menu wordt automatisch aangemaakt gebaseerd op h1 kopjes (regels beginnen met # ). Zie chapters component.

## Componenten

### Chapters:

Dit is een overzicht van alle relevante kopjes (regels beginnen met # ) en zorgt ook direct voor het menu dat bovenin zichtbaar blijft.

```
:chapters
```

### Landing component:
```
::landing
---
logo: Wat nu?
title: "Na de diagnose: een persoonlijk overzicht"
languages:
  nl: Nederlands
  en: English
  ar: العربية
---
::
```

### Intro:
Een tekstblok in het midden met een iets donkerder achtergrond, voor een persoonlijke introductie:
```
::intro
Hallo Peter, op deze webpagina vind je meer informatie over je diagnose. Aan de hand van jouw persoonlijke profiel hebben we tekst en data samengesteld die voor jou relevant is.
::
```

### Profile:
Dit is het profiel component. "Fields:" is een array met key en value die vrij kunnen worden ingevuld maar ook worden aangemaakt of verwijderd. (de velden zijn niet strikt vooraf gedefinieerd)
```
::profile
---
fields:
  Naam: Peter de Groot
  Geboortedatum: 12 Maart 1956
  Geslacht: Man
  Opleiding: MBO
  Burgerlijke staat: Samenwonend
  Diagnose: Melanoom
  Datum diagnose: 21 April 2024
---
::
```

### Quote:

Hier kunnen inline quotes kunnen gezet, 'gegenereerde' ervaringen die van toepassing zijn op de informatie erboven. De naam is zelf aan te passen, inclusief afbeelding.

```
::quote
---
name: "Mehmed"
image: 10
---
Hier kun je een relevante 'ervarings' quote plaatsen, die bijvoorbeeld past bij de grafiek hierboven.
::
```

### Pictogram:

Poppetjes chart met de volgende velden, waarbij "button: false/true" aangeeft of je het direct wilt zien, of alleen na het klikken op een knop.
```
::pictogram
---
range: 100
rows: 5
data: [16,40]
button: false
buttontext: "Bekijk hier de statistieken."
labels:
  - 16 op de 100 mensen zoals u heeft erge problemen
  - 40 op de 100 mensen zoals u heeft een beetje problemen
  - 44 op de 100 mensen zoals u heeft geen problemen
---
::
```
"data:" heeft enkel 2 waardes, de rest

### Story inline:

Dit is voor de persoonlijke ervaringen momenteel onderaan:

```
::story-inline
---
image: 5
name: Veronique
age: 63
description: Ik herinner me dat ze een beetje was afgeleid geworden sinds de diagnose.
---
Mijn zus kreeg de diagnose melanoom toen ze 35 was...etc.
::
```

### Plot:

Wellicht gaan we deze niet gebruiken maar hieronder voor de documentatie:

```
::plot
---
xlabel: Jaren
ylabel: Overlevingskans in %
labels: 
  - Voor Nederlanders in het algemeen
  - Voor mannen zoals jij
data: 
  - [[0,100],[5,80],[10,75],[15,20],[20,5]]
  - [[0,100],[5,60],[10,45],[15,10],[20,0]]
xminmax: [0, 20]
yminmax: [0, 100]
xsteps: 4
ysteps: 10
---
::
```
