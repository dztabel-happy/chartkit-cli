# 28 Density Scatter Design Notes

## Visual Strategy
The chart's job is to show *where the observations are*, not to enumerate them. A sequential single-hue colormap does that: light bins read as rare, dark bins as common, and the eye follows the ridge of the distribution without any explicit trend line. No fit is drawn, because the relationship is deliberately non-linear and a straight line would flatten the very bend the figure exists to show.

`gridsize` is the one knob worth tuning: too coarse and the bend disappears into three fat hexagons, too fine and the field turns back into noise. Around 40 bins across the x range keeps the core solid and the tails legible at A4 width.

The zero-price line is the only annotation. It marks a state change rather than decoration — intervals below it are negative-price hours — so it earns its ink.

The intended conclusion is: Price rises roughly linearly with residual demand up to about 25 GW and then steepens, while the intervals below 8 GW clear at or under zero.

## Use When
Use when a single relationship carries thousands of observations and the shape of the mass is the evidence: market clearing, sensor telemetry, model residuals, genomic screens, any log with more rows than a page has pixels. `hexbin` is the default choice for very large clouds; `kde` is the choice when smooth contours of one pooled population read better than bins and the sample is under about twenty thousand points.

## Avoid
Avoid a density layer on a sparse cloud — the points are already the best encoding. Avoid pairing it with a second closed-curve or second colorbar encoding. Avoid reading a hexbin as a per-group chart: the field is pooled across every series, so group structure must come from the point layer or from a facet.

## Spec Anchors
- `type`: `scatter`
- `profile`: `report_a4.full_width`
- `role`: `correlation`
- `data.source` + `x_col` / `y_col`: source-bound observations, not an inline point dump
- `data.density`: `{mode: "hexbin", gridsize, mincnt, label}`
- `annotations`: a single `hline` marking the zero-price state change
- source: `examples/showcase/source/28-density-scatter.csv`
