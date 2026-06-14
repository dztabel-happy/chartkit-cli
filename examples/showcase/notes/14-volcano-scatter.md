# 14 Volcano Scatter Design Notes

## Visual Strategy
Use a volcano scatter when every point has an effect size and a p-value. The x-axis carries signed effect, the y-axis carries `-log10(p)`, and thin threshold lines define the evidence rule. Background features stay muted; only explicitly named significant hits receive labels with leader lines.

The intended conclusion is: The treatment shifts a small set of features beyond both effect-size and significance thresholds.

## Use When
Use when the evidence question depends on both magnitude and statistical significance, such as differential expression, feature screening, or treatment effect discovery.

## Avoid
Avoid using volcano for generic correlation or model agreement. Avoid covariance ellipses, fitted trend lines, and centroid labels here; those belong to ordinary relationship scatter plots.

## Spec Anchors
- `type`: `scatter`
- `data.volcano`: effect/p-value contract
- `data.volcano.label_named_only`: avoid generic auto-id labels
- `data.volcano.label_top_per_side`: balanced sparse hit labels
- `profile`: `report_a4.full_width`
- `role`: `diagnostic`
- source: `examples/showcase/source/volcano-scatter.csv`
