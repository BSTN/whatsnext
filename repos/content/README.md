# What's next? / Wat nu? tool content

Alle inhoud van de landing page en profielen (gebruikerspagina's van de tool) kunnen in deze repository worden bewerkt. 

## landing page

Door index.nl.md of index.en.md kun je respectievelijk de Nederlandse en Engelse landingspagina editen. De teksten kan je als [Markdown](https://www.markdownguide.org/basic-syntax/) aanpassen, waarin speciale componenten zijn toegevoegd voor specifieke functionaliteit in deze context. Die kun je als volgt herkennen:

Beginnende met een dubbele punt:

```:naam-van-de-module```

Met 2 dubbele punten aan het begin en einde:

```
::naam-van-component
De inhoud van component.
::
```

Of soms met een aantal parameters gedefinieerd, die tussen een regel met drie streepje staat:

```
::naam-van-component
---
Titel: Een voorbeeld component
---
De inhoud van component.
::
```

Voor de overzichtspagina zijn de volgende componenten gedefinieerd:

```
:overview-menu
```
Overview menu zorgt voor het menu bovenaan.


```
:overview-landing
```
Overview landing zorgt voor de speciale layout van de landing (het bovenste gedeelte van de pagina dat je het eerste ziet bij het laden van de pagina)

```
:page-list
```
Page list is een automatisch overzicht van de markdown files in de /profiles map.

Toelichting voor de componenten die je in de profielen kunt gebruiken staat in de profiles/README.md. (Klik op "profiles" map om die te zien).