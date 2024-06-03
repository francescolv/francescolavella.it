---
layout: post
title: "Photo Galley"
date: 2019-05-10
excerpt: "Photo Galley"
tags: [Howto, post, jekyll]
---
**Creare una Photo Galley con Jekyll**
===

## Obiettivi
Creare una gallery per la pubblicazione delle Immagini e la generazione automatica di thumbnails delle foto caricate

## Descrizione
**Installare su Ubuntu le dipendenze**

```
apt install libmagick++-dev
gem install rmagick exifr
```
**Installare il plugin** jekyll-gallery-generator
o attraverso
```
gem install jekyll-gallery-generator
```
o attraverso `gem 'jekyll-gallery-generator'` nel file `Gemfile`

e lanciare il comando `bundle`

Aggiungere jekyll-gallery-generator nella lista dei plugin in _config.yml:
```
plugins:
  - jekyll-gallery-generator
```

Crea una directory photos e al suo interno una directory per ogni gallery

## Configurazione
Aggiungere nel file _config.yml
```
gallery:
  dir: photos               # Path to the gallery
  symlink: false            # false: copy images into _site. true: create symbolic links (saves disk space)
  title: "Photos"           # Title for gallery index page
  title_prefix: "Photos: "  # Title prefix for gallery pages. Gallery title = title_prefix + gallery_name
  sort_field: "date_time"   # How to sort galleries on the index page.
                            # Possible values are: title, date_time, best_image
  thumbnail_size:
    x: 400                  # max width of thumbnails (in pixels)
    y: 400                  # max height of thumbnails (in pixels)
  
  # The following options are for individual galleries.
  galleries:
    nome_gallery:
      best_image: image.jpg  # The image to show on the gallery index page. Defaults to the last image.
      name: "nome_gallery"
      hidden: true          # Don't show this gallery on the index page. People must guess the URL.
      sort_reverse: true    # Reverse sort images in gallery.
      info:
        desc: "Gallery Description" # Info fields can be used in custom templates.
```

## Riferimenti
per ulteriori informazioni:
[https://github.com/ggreer/jekyll-gallery-generator](https://github.com/ggreer/jekyll-gallery-generator)

**Licenza d'uso**
[© CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/)