# 28 Density Scatter

## User request

I have 4,320 half-hourly settlement intervals and I want to show how the clearing price responds to residual demand. A plain scatter is a solid blob — I cannot see where the mass actually is.

## ChartKit choice

Use `type: "scatter"` with `data.density.mode: "hexbin"`. Above roughly two thousand points, overlapping markers stop encoding anything: the ink saturates and the reader sees an outline, not a distribution. A hexagonal binning replaces the markers with a count field, so the dense core, the shoulders, and the thin tails all stay readable.

Bind the points with `data.source` plus `x_col` / `y_col` rather than pasting thousands of rows into the spec. ChartKit hides the raw point layer by default once the cloud is dense enough for the field to carry the shape, and keeps the points when there are several series, because the density layer is pooled and would otherwise destroy the per-series decoding.

Label the colorbar with what a bin actually counts (`data.density.label`). Add at most one reference annotation — here the zero-price line, because "below zero" is a distinct market state.

## Avoid

Do not reach for a density mode below a few hundred points: every marker is individually visible there and binning only throws information away (CKQ137). Do not combine `mode: "kde"` with `data.ellipse_contours` — two families of closed curve in one panel cannot be told apart (CKQ135). Do not combine `mode: "hexbin"` with `data.color.field`: both want the right-hand colorbar, and the renderer will drop the hexbin (CKQ136).
