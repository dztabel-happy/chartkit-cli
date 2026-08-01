# 33 Confusion Matrix Design Notes

## Visual Strategy
A confusion matrix is read twice, and the two reads want different things.

The first read is the diagonal: colour ranks the classes by recall before a single digit is read. That is why the sequential ramp is anchored to the interpretable range (`vmin: 0`, `vmax: 1`) instead of to the observed extremes — the darkness of a cell then means the same thing here as in the next figure. Wetland and shrub come out visibly paler than the rest, and that is the finding.

The second read is the off-diagonal, and there colour does almost nothing: every error cell lives in the bottom fifteenth of a 0-1 ramp. That is not a defect to be fixed by rescaling — rescaling to the error range would make an 11% confusion as dark as a 96% recall — it is the reason the cell text has to be present. Colour carries the first read, the numbers carry the second.

Blanking the negligible cells is what keeps the second read possible. Fifteen of the 49 cells round to `0%`, and printing them puts a field of zeros in front of the eight cells that matter. `cell_text` blanks exactly those and leaves every other cell to `annotate_format`, which is the point of the sparse-override form: the spec says what is different, not what is already correct.

The diagonal outline is a 0.7 pt stroke in the theme's text colour. Half of it falls on the dark diagonal cell and half on its pale neighbour, so it reads against both without needing a second colour and without touching the fill underneath.

Counts, not shares, are what the spec stores; `normalize: "row"` is the figure's transform. That keeps the file auditable — a reader can recover the 2,843 pixels and every per-class *n* — and it is why the colorbar is labelled with what the colour actually encodes rather than with the word "accuracy".

The intended conclusion is: Every class is recovered above 69%, but the errors are structured rather than diffuse: wetland loses a fifth of its pixels to water and grassland, and the shrub/forest and grassland/cropland pairs are confused in both directions.

## Use When
Use for classifier error structure with roughly six to twelve classes, when the reader's question is *which* classes are confused rather than how well the model scores overall. A single headline accuracy belongs in the text; a per-class bar chart answers "which class is weakest" more directly but cannot show that shrub and forest trade in both directions, which is the whole reason to spend a figure on this.

## Avoid
Avoid below about five classes, where a table sets better and reads faster. Avoid above roughly twelve, where the cell text stops fitting and the figure should drop to colour alone (`annotate: false`) with the classes ordered by a clustering rather than alphabetically. Avoid raw counts on an imbalanced test set. For a signed or correlation matrix use the `32-correlation-significance` pattern instead; for a configuration-by-dataset ablation table use `ablation_heatmap`.

## Spec Anchors
- `type`: `heatmap`
- `profile`: `report_a4.full_width`
- `role`: `diagnostic`
- `archetype`: `evidence_matrix`
- `data.values`: raw counts — the figure normalises, the spec stays auditable
- `data.normalize`: `row`, which also switches the default colormap to sequential and the default cell format to `{:.0%}`
- `data.colormap` / `vmin` / `vmax`: `Blues` on the full 0-1 share range
- `data.aspect`: `equal`, so a cell and its transpose are comparable
- `data.diagonal_emphasis`: `true` — stroke only, no fill change
- `data.annotate`: `true`, deliberately above the 16-cell automatic cap; `annotate_format` sets the precision
- `data.cell_text`: sparse override — `null` keeps the formatted value, `""` blanks the fifteen cells that round to 0%
- `data.col_groups` / `data.row_groups`: single-span axis titles, since a heatmap has no axis labels
- source: `examples/showcase/source/33-confusion-matrix.csv` (the count matrix, rows = reference class)
