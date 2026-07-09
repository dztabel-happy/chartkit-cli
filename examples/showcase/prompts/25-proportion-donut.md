# 25 Proportion Donut

## User request

Show the share of each generation source in this year's total output as a pie chart. The data has nine sources but only the big ones matter individually.

## ChartKit choice

Use `type: "proportion"` when the evidence is a share-of-total snapshot at one point in time. ChartKit renders it as a single sorted donut: slices are ordered largest-first from the top, everything beyond `data.max_slices` is aggregated into a localized "Other" slice, and each slice gets a direct label with its percentage — no legend to decode. Bind `data.source` with `label_col` and `value_col` so the shares stay reproducible from the CSV, and use `data.center` with `value_format` to show the computed total in the hole instead of hand-writing it.

When the user says "pie chart", this is the disciplined answer: same evidence, but sorted, grouped, directly labelled, and flat.

## Avoid

Do not use proportion when composition must be compared across several cohorts or over time — use `bar` with `layout: "stacked_percent"` or a stacked `area` instead. Do not raise `data.max_slices` above six; if every category matters individually, a ranked horizontal bar reads better. Do not add explode offsets, 3D depth, or a legend; the sorted order and direct labels already carry the reading order.
