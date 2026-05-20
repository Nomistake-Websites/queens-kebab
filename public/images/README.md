# Image assets

Drop your photos into these folders. The website picks them up automatically; if a file is missing, a styled gradient placeholder is rendered instead, so the layout never breaks.

All food and gallery photos are served as **WebP** for fast loading.

## Hero
- `hero-poster.jpg` — poster shown while the hero video loads (1920×1080 recommended)

## OG / share
- `og.jpg` — 1200×630 social-share image

## Food (`/images/food/*.webp`)
Edit `src/data/menu.ts` to change which item points at which file.

- `adana-kebab.webp`
- `ayran.webp`
- `baklava.webp`
- `box-kebab.webp`
- `durum-kebab.webp`
- `falafel-wrap.webp`
- `halloumi-talir.webp`
- `hranolky.webp`
- `kureci-kebab.webp`
- `lahmacun.webp`
- `mix-grill-talir.webp`
- `pita-kebab.webp`

## Gallery (`/images/gallery/*.webp`)
Used by the homepage gallery grid + fullscreen lightbox. Edit `src/components/Gallery.tsx` to change the tile order.

- `grill-master-kebab.webp`
- `durum-preparation.webp`
- `restaurant-interior-counter.webp`
- `grilled-meat-detail.webp`
- `kebab-plate-table.webp`
- `fresh-ingredients-sauces.webp`
