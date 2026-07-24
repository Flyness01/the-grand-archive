# Asset manifest

Chunk 1 intentionally uses CSS-drawn architectural placeholders so the correct
layering and final aspect ratios can be tested without unrelated stock imagery.

| File | Room | Purpose | Target size | Depth | Transparency | Animation | Status |
|---|---|---|---:|---:|---|---|---|
| `grand-hall-far.avif` | Grand Hall | Shadowed windows and distant wall | 2400×1350 | 1 | No | None | Required |
| `grand-hall-architecture.webp` | Grand Hall | Columns, arches, ceiling | 2400×1350 | 2 | Yes | None | Required |
| `grand-hall-furniture.webp` | Grand Hall | Pedestals and mosaic frame | 2400×1350 | 3 | Yes | None | Required |
| `grand-hall-foreground.webp` | Grand Hall | Near balustrade and vignette | 2400×1350 | 5 | Yes | Subtle parallax | Required |
| `library-door-resting.webp` | Grand Hall | Interactive Library doorway | 520×980 | 4 | Yes | Hover/restore states | Required |
| `library-threshold.avif` | Library | Initial room establishing view | 2400×1350 | 1–3 | No | None | Required |
| `mosaic-complete.avif` | Grand Hall | Final 25×25 mosaic image | 1600×1600 | 4 | No | Tile reveal | Required |
| `intro-lantern.webp` | Intro | Lantern silhouette and glow mask | 600×900 | 4 | Yes | Flame/glow | Required |
| `map-room-far.avif` | Map Room | Cabinets, framed maps, and architectural shell | 2400×1350 | 1–2 | No | None | Required |
| `map-room-table.webp` | Map Room | Interactive cartography table and drawer | 1600×900 | 3–4 | Yes | Drawer opening | Required |
| `cartographers-map.webp` | Map Room | Antique route-puzzle surface | 1800×1200 | 4 | No | Ink route overlay | Required |
| `navigator-compass.webp` | Map Room | Collectible artifact close-up | 900×900 | 5 | Yes | Needle settle | Required |

Audio is not included in Chunk 1. The captioned clock and match cues are
purposeful silent placeholders until the audio manager is added.
