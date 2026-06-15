# 09 Signed Effect Heatmap Design Notes

## Visual Strategy
Use a diverging matrix when sign and block structure matter more than individual exact labels. Reserve heavy text for axes and colorbar; the cell colors should be the main evidence.

The intended conclusion is: Most cohorts improve on accuracy and robustness metrics while latency and cost remain trade-offs.

## Use When
Use when a compact matrix can reveal blocks, signed effects, or structured pairwise relationships.

## Avoid
Avoid if exact numeric lookup is the main task; tables are better for that.

## Spec Anchors
- `type`: `heatmap`
- `layout`: `default`
- `profile`: `report_a4.full_width`
- `role`: `diagnostic`
- source: `examples/showcase/source/09-signed-effect-heatmap.csv`
- source binding: use `data.source`, `data.row_col`, and optional `data.value_cols` for wide matrix CSVs instead of copying the full matrix into `data.values`.
