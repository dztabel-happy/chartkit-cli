# 33 Confusion Matrix

## User request

Here is the seven-class confusion matrix from my land-cover classifier over 2,843 held-out reference pixels. I need it as a figure that shows where the classifier actually fails, not as a table of counts.

## ChartKit choice

Use `type: "heatmap"`, keep the raw **counts** in `data.values`, and set `normalize: "row"`. The spec then carries the auditable numbers while the figure shows per-class recall, and any cell can be recomputed from the source. Row shares are what make an imbalanced test set readable: 51 confusions out of 455 grassland pixels and 51 out of 2,843 total are very different claims.

`normalize` also switches two defaults that a count matrix gets wrong — the colormap becomes sequential (`Blues`) and the cell format becomes `{:.0%}`. Counts and shares are pure-positive quantities with no meaningful midpoint, so the `RdBu_r` default would invent one out of the middle of the observed range; `CKQ141` fires if you leave it on.

Set `aspect: "equal"` so the cells are square. Both axes carry the same set of classes and the reader compares a cell against its transpose; rectangular cells make that comparison lie.

`diagonal_emphasis` outlines the cells the figure is read from. It only strokes, never fills, so the value-to-colour encoding is untouched. It is already on by default for a normalised square matrix — declare it when you want the intent visible in the spec, and never on a non-square matrix, where cell (i, i) is arbitrary.

Forty-nine cells is above the automatic annotation cap of 16, so set `annotate: true` explicitly: in a confusion matrix every cell is the evidence. Then use `cell_text` as a *sparse* override — `null` keeps the value the renderer would have formatted, `""` draws nothing. This card blanks the fifteen cells that round to `0%` so the eye lands on the eight real confusions instead of a field of zeros.

Name the axes with single-span `col_groups` / `row_groups`. A heatmap has no axis titles, and "rows are the reference class" is not something a reader should have to infer from the caption.

## Avoid

Do not draw a 3x3 confusion matrix — three classes is a table. Do not normalise by column and then call the diagonal recall; that is precision, and the two disagree on an imbalanced set. Do not put `diagonal_emphasis` on a non-square matrix (`CKQ144`). Do not hand-write every cell of `cell_text` when you only need to change a few — `null` means "keep what the renderer would have written". Do not rescale the colour ramp to the error range to make the off-diagonal cells visible: that would render an 11% confusion as dark as a 96% recall.
