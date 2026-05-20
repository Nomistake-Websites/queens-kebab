# Hero video

Place the hero loop here:

- `queens-kebab-hero.mp4` — 1080p, MP4 (H.264/AAC), ideally 6–15s loop, under ~6 MB for fast loading.

The site already references this path:

```
/videos/queens-kebab-hero.mp4
```

Until the file exists, the hero falls back to a dark cinematic gradient (still using the poster at `/images/hero-poster.jpg`).

## Tips
- Keep audio muted (we strip it via `<video muted>` anyway).
- Encode with `-pix_fmt yuv420p` for broad iOS/Android compatibility.
- Use `preload="metadata"` (already set) so mobile users don't burn data.
