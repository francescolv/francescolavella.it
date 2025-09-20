---
layout: gallery_index
title: "Gallerie"
permalink: /galleria/
---

# Gallerie

<ul>
  {%- assign pages_gallery = site.pages | where: "layout", "gallery" -%}
  {%- for p in pages_gallery -%}
    <li>
      <a href="{{ p.url | relative_url }}">{{ p.title }}</a>
      {%- if p.description %} — <small>{{ p.description }}</small>{% endif -%}
    </li>
  {%- endfor -%}
</ul>
