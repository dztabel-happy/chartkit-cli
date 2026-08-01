# 31 Ablation Heatmap Design Notes

## Visual Strategy
An ablation table is usually a table, and usually unreadable. The matrix panel keeps the exact numbers — every cell carries its value — while colour does the scanning work: the reader finds the light row (`w/o retrieval`) before reading a single digit. That is the point of drawing the table instead of typesetting it.

A sequential colormap, not a diverging one: these are accuracies, all positive, with no meaningful midpoint. The `vmin`/`vmax` window is set just outside the data so the full model and the baseline sit near the ends of the ramp and the intermediate ablations still separate.

The colorbar is horizontal and hangs under panel (a) rather than beside it, so the matrix keeps its width and the panel label still lands under the whole stack.

Panel (b) converts the row a reader just found into an effect size with an interval. It is the same evidence, quantified — which is why the zero line matters: an interval that reaches zero is an ablation that did not prove anything.

The intended conclusion is: Removing retrieval costs more accuracy than removing any other single component on all five datasets, but on PubMedQA the loss is roughly half as large and its interval nearly reaches zero.

## Use When
Use when a component study has to appear as evidence rather than as an appendix table: methods papers, model cards, capability reports. It works best with five to ten configurations and three to six datasets — beyond that the cell text stops fitting and the matrix should become a plain `heatmap` with symbolic annotation.

## Avoid
Avoid an auto colour range on a matrix whose extremes are outliers. Avoid rows in arbitrary order — the row order is an argument. Avoid an effect panel whose quantity is not derivable from the matrix. For directional or signed matrices, correlation structure, or *p*-value overlays, use `heatmap` instead.

## Spec Anchors
- `type`: `ablation_heatmap`
- `profile`: `report_a4.full_width`
- `role`: `comparison`
- `archetype`: `evidence_matrix`
- `data.matrix`: `rows`, `columns`, `values`, `vmin` / `vmax`, colorbar `label`
- `data.delta`: `labels`, `values`, `ci_low` / `ci_high`, `x_label`
- panel labels: emitted by the renderer as bottom-centred `(a)` / `(b)`
- source: `examples/showcase/source/31-ablation-heatmap.csv`
