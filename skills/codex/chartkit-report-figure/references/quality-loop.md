# Quality Loop

Every ChartKit figure must pass the quality loop before delivery.

## The loop

```bash
# 1. Validate spec before rendering
chart-kit validate figure.json

# 2. Fix spec-level warnings, then build
chart-kit build figure.json --out outputs/figure-name --format all

# 3. Read the quality report
# outputs/figure-name/chart-quality.json

# 4. Fix remaining warnings and rebuild
# Repeat until quality.ok == true
```

## CKQ fix reference

**Spec-level (fix before build):**

| Code | Severity | Problem | Fix |
|---|---|---|---|
| CKQ001 | warning | Missing `contract` | Add `contract` with `conclusion`, `role`, `archetype` |
| CKQ002 | warning | Missing `profile` | Add `profile` (e.g. `"report_a4.full_width"`) |
| CKQ003 | info | Unknown `archetype` value | Use one of the eight standard archetypes |
| CKQ004 | warning | More than 8 series — panel too dense | Split into multiple panels or aggregate groups |
| CKQ005 | warning | Series missing `role` or explicit color | Add `role` to each series |
| CKQ006 | info | Missing `evidence_hierarchy` | Add `hero` / `supporting` / `context` lists |
| CKQ105 | warning | Small-sample or many-group `full_violin` | Use `layout: "raincloud"`, `layout: "auto"`, or `layout: "box_strip"` |
| CKQ108 | warning | Only red/green distinguish groups | Add labels, markers, or line styles as second channel |
| CKQ111 | warning/info | Mixed display language | Translate ordinary labels or declare official identifiers in `language_policy` |
| CKQ112 | info | Dense raw time axis | Aggregate, choose a typical period, or select a representative window |
| CKQ113 | warning | Scatter uses unordered `top_mover` | Use `extreme` with `series` and `axis`, or `mean_delta` for paired groups |
| CKQ301 | warning | Missing `source_data` in paper mode | Add `source_data` block or set `{inline: true}` |
| CKQ401 | warning | Schematic dominates a `data_figure` | Reduce schematic area below 60%; add data panels |
| CKQ403 | warning | Rainbow colormap | Replace with sequential or diverging palette |
| CKQ404 | warning | Two panels answer the same evidence question | Merge panels or replace one with different evidence |

**Figure-level (fix after build):**

| Code | Severity | Problem | Fix |
|---|---|---|---|
| CKQ101 | warning | Figure size does not match profile | Do not override `figsize` manually; let profile control it |
| CKQ102 | warning | Text labels overlap | Rotate labels, reduce tick count, or use direct labels |
| CKQ103 | warning | Tick density too high | Reduce tick count or use `MaxNLocator` |
| CKQ104 | warning | Legend overlaps data | Move legend outside axes or use a legend-only panel |
| CKQ107 | warning | Text contrast too low (WCAG < 2.5) | Darken text or lighten background |
| CKQ108 | warning | Computed insight labels overlap | Reduce insight count or let renderer lane/offset them |
| CKQ109 | warning | Computed insight label falls outside plot area | Use automatic placement or allow more margin/range |
| CKQ110 | warning | Computed insight label covers key data evidence | Let ChartKit auto-place it, move callout outward, or remove a lower-value insight |

**Artifact-level (fix after build):**

| Code | Severity | Problem | Fix |
|---|---|---|---|
| CKQ201 | error | PNG/SVG/PDF missing | Check output directory; rebuild with `--format all` |
| CKQ202 | warning | SVG text converted to paths | Set `svg.fonttype = 'none'` (handled by theme; do not override) |
| CKQ203 | warning | Custom backend uses wrong font family under serif theme | Call `setup_publication_rcparams(theme)` at script start |
| CKQ204 | warning | Custom multi-panel uses bare `a` / `b` labels | Change to bottom-centered `(a)`, `(b)` |
| CKQ205–207 | warning | Figure drifting toward PPT/card/text-heavy layout | Remove hero headlines, metric cards, explanatory paragraphs |

## Custom backend rules

`custom_python` scripts must:
1. Call `setup_publication_rcparams(theme)` before any plotting
2. Write all requested formats (`svg`, `pdf`, `png`, `tiff`) into the output directory
3. Keep `contract`, `profile`, sparse text, and bottom-centered parenthesized panel labels
4. Not set `DejaVu Sans`, `Arial`, or arbitrary sans fonts under a serif theme

Missing requested artifacts in a custom backend are build **errors**, not warnings.

## Utility commands

```bash
# Recommend chart type for a role
chart-kit atlas --role comparison

# Check environment (fonts, matplotlib, Python)
chart-kit doctor

# Verify installation by rendering all gallery examples
chart-kit gallery build
```
