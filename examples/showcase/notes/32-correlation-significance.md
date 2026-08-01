# 32 Correlation Matrix with Significance Design Notes

## Visual Strategy
Two encodings answering two questions. Colour is continuous and says how strong the association is and in which direction; the marker is categorical and says whether it would survive a test. Keeping them apart is what lets a twelve-variable matrix stay readable — the reader scans colour for structure first, then checks which parts of that structure carry a marker.

That separation is also why no coefficients are printed. With the diagonal dropped there are 66 cells to label, and `-0.42` with a marker underneath is a two-line label in a cell about 6 mm across; at that density the text becomes the figure. `mode: "replace"` spends the space on the one thing colour cannot say, and a reader who needs the exact *r* has the source CSV, which is where 66 numbers belong. The renderer draws the same distinction: `auto_annotate_symbol_max_cells` allows 144 cells in pure-symbol mode against 16 for numbers, because a star is one character wide and a coefficient is five.

The masked half is filled, not transparent. A transparent masked cell takes the page background, and the reader has no way to tell "we chose not to draw this" from "we had no data here" — on a matrix whose subject is which pairs were tested, that is a misreading with consequences. The neutral fill also gives the marker ladder and the colorbar somewhere to sit *inside* the axes instead of stealing width from the matrix.

Blocks are named on both axes, with different label lengths on purpose: the full construct names run across the top where there is room, the short forms down the side where every extra character pushes the matrix right.

One honest caveat the figure cannot make for itself: 66 tests at α = 0.05 will produce roughly three false positives. Here all 41 `***` pairs also clear a Bonferroni threshold of 0.05/66, so the block structure does not depend on the correction — but the six single-star cells do, and the notes rather than the stars are the place to say so.

The intended conclusion is: Sleep disruption and affective distress form two tightly coupled positive blocks that also track each other; cognitive performance runs against both, but only the sleep-cognition associations hold up broadly (14 of 16 pairs marked), while fewer than half the affect-cognition pairs reach significance.

## Use When
Use when the evidence is the *pattern* of pairwise association across a variable set — a psychometric battery, a biomarker panel, a block of engineered features — and the reader also needs to know which of those associations are supported. Ten to fourteen variables is the working range: with fewer, a table is more honest; with many more, the labels stop fitting and the variables should be clustered and reordered before anything is drawn.

## Avoid
Avoid when the rows and columns are different quantities — that is a directional matrix, so drop the mask, or use `network_matrix` if the evidence is sparse interaction strength. Avoid when the reader's task is exact numeric lookup. Avoid marking significance at all when the pairs are an uncorrected screen and the figure will be read as a discovery, unless the correction is stated somewhere the reader will see it.

## Spec Anchors
- `type`: `heatmap`
- `profile`: `report_a4.full_width`
- `role`: `correlation`
- `archetype`: `evidence_matrix`
- `data.mask`: explicit boolean matrix — upper triangle **and** diagonal; `mask: "upper"` is the one-word form that keeps the diagonal
- `data.mask_fill`: `true`, the theme's grid colour, so the omitted half reads as deliberate rather than missing
- `data.significance`: `p_values` (same shape as `values`, `null` where untested) with `mode: "replace"`
- `data.col_groups` / `data.row_groups`: block names on the two axes
- `data.colorbar_location`: `inset`, parked in the masked triangle
- `annotations[0]`: a `text` entry in cell-index space carrying the marker ladder, which the renderer does not draw for you
- source: `examples/showcase/source/32-correlation-significance.csv` (one row per drawn pair: *r*, *p*, and *n*)
