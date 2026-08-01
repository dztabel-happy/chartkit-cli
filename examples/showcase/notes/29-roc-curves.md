# 29 ROC Curves Design Notes

## Visual Strategy
An ROC is read as *area* and as *distance from the diagonal*, so both axes must carry the same visual weight — that is the whole reason for the equal aspect and the near-square canvas. A wide canvas with a square data area wastes a third of the page; a wide data area exaggerates the low-false-positive region the eye is drawn to.

Each of the four curves carries an explicit `color`. Roles alone are not enough here: `reference` and `baseline` resolve to the *same* neutral in both themes, which is correct when one of them is context and wrong when both are models a reader has to tell apart. Four models need four separable hues, and four is also the ceiling before CKQ147 starts counting.

Each model keeps its own threshold grid; the curves are drawn as they were evaluated rather than resampled onto a shared grid.

The chance diagonal is a `reference_line` supplied by the layout, dashed and outside the legend: it is a frame of reference, not a fifth model.

The legend sits in the lower-right corner, inside the axes — the conventional place, because on an ROC plot that corner is the one region no curve reaches. Direct end-of-line labels are ChartKit's default for a small number of series, but ROC curves all converge on (1, 1), so the renderer falls back to a legend on its own.

The intended conclusion is: The gated ensemble dominates the three comparators across the whole operating range, and its advantage is largest in the low-false-positive region a discharge-planning team can actually staff.

## Use When
Use `layout: "roc"` for binary-classifier discrimination, `layout: "pr"` when the positive class is rare and precision at a given recall is the decision, and `layout: "calibration"` when the question is whether predicted probabilities match observed frequencies. All three are `line` layouts, not separate chart types: the mark is the same multi-series polyline and only the axis defaults differ.

More generally, reach for `xAxis.scale: "numeric"` whenever `data.x` is a measured quantity with unequal spacing — dose, budget, threshold, time-to-event — and the spacing is part of the evidence.

## Avoid
Avoid more than four or five curves: overlapping ROCs stop being separable and CKQ147 will flag the colour count. Avoid claiming an AUC difference the curves do not support — if the curves cross, say where. Avoid the categorical axis for threshold sweeps; equally spaced slots silently redraw the shape of the curve.

## Spec Anchors
- `type`: `line`
- `layout`: `roc`
- `profile`: `report_a4.full_width` with `style.height_mm` for the square canvas
- `role`: `diagnostic`
- `xAxis.scale`: `numeric` — the opt-in that makes `data.x` a coordinate
- `series[].x`: each model's own threshold grid
- `series[].label`: carries the upstream-computed AUC
- `series[].color`: explicit, because two comparator roles share one neutral
- `legend.position`: `lower right` — the empty corner of an ROC plot
- source: `examples/showcase/source/29-roc-curves.csv`
