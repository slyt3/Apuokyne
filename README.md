# Sodyba „Apuokynė“ – svetainė

Paprasta statinė svetainė: atidarykite `index.html` naršyklėje. Serverio ar programų diegti nereikia.

## Struktūra

```
index.html            visas puslapio turinys (tekstai, sekcijos)
css/
  base.css            spalvos, šriftai, mygtukai
  layout.css          antraštė, pagrindinis vaizdas, „Apie“, apačia
  sections.css        erdvės, metų laikai, kainos, užklausa, kontaktai
  gallery.css         galerija ir peržiūros langas
  animations.css      įsirodymo efektai
js/
  main.js             meniu, antraštė slenkant, efektai
  spaces.js           erdvių sąrašas su keičiama nuotrauka
  seasons.js          metų laikų skirtukai
  gallery.js          galerijos nuotraukų sąrašas ir filtrai
  calculator.js       kainų skaičiuoklė (kainos faile viršuje)
  inquiry.js          užklausos forma (atidaro el. laišką)
images/
  full/               didelės nuotraukos
  thumb/              sumažintos nuotraukos galerijai
  logo/               logotipas, skirtuko piktograma ir originalas
Nuotraukos/           originalios nuotraukos (svetainė jų nenaudoja)
```

## Dažniausi pakeitimai

- **Tekstai** – `index.html`, kiekviena sekcija pažymėta komentaru.
- **Kainos** – `js/calculator.js` (objektas `PRICES`) ir kainų lentelė `index.html`.
- **Nauja nuotrauka galerijoje** – įkelkite į `images/full` ir `images/thumb`, pridėkite eilutę į `js/gallery.js` sąrašą `PHOTOS`.
- **Spalvos** – `css/base.css`, pačiame viršuje.
