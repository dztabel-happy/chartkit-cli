# 22 Contribution Lollipop Ranking

## User request

I need to rank signed driver estimates around a zero baseline and show which factors help or hurt the metric, including uncertainty intervals.

## ChartKit choice

Use `type: "contribution"` with `layout: "lollipop"` when each row is an independent signed effect or ranked value relative to a reference line. Sort rows by importance, keep the zero line visible, and pass `low`/`high` or `ci` for interval estimates when available.

When the figure is full-width, label only the strongest positive and negative effects with `label_mode: "extremes"` plus small positive/negative label counts. This adds useful exhibit signal without turning the plot into a table.

## Avoid

Do not use waterfall when the rows are independent effects rather than sequential additions to one total. Do not use a plain bar chart if the zero reference and sign direction are the story. Do not hide interval uncertainty when the source data provides it.
