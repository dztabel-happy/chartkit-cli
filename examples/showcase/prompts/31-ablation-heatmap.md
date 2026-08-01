# 31 Ablation Heatmap

## User request

I ran seven single-component ablations across five datasets. I need the ablation table as a figure, plus a panel showing how much the one component that matters is actually worth.

## ChartKit choice

Use `type: "ablation_heatmap"`. It is a fixed two-panel preset: panel (a) is the configuration × dataset accuracy matrix with the value written in every cell and a horizontal colorbar hung under it, panel (b) is a per-dataset effect plot with confidence intervals and a zero line. ChartKit places the bottom-centred `(a)` / `(b)` labels itself.

Order the matrix rows the way the argument runs — full model first, ablations in between, the baseline last — because a reader scans a heatmap top to bottom. Set `matrix.vmin` / `matrix.vmax` deliberately: an auto range keyed to the extremes makes every ablation look catastrophic, and a range that is too wide makes them all look identical.

Panel (b) must name one quantity and mean it. Here it is the accuracy lost when retrieval is removed, so every interval is a difference between two rows of panel (a) and the reader can check it against the matrix.

## Avoid

Do not use `ablation_heatmap` for a general correlation or effect matrix — that is `heatmap`, which has `normalize`, `significance`, `cell_text` and masking. This preset exists for the ablation-plus-effect pairing. Do not let panel (b) show a quantity that cannot be recovered from panel (a); two panels that disagree are worse than one panel.
