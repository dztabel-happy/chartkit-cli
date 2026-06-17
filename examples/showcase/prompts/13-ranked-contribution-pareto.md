# 13 Ranked Contribution Pareto

## User request

I have many transaction-day or observation-level contribution values. I need a
report-grade figure that shows which observations lose money, which observations
make money, and how concentrated the cumulative positive contribution is after
sorting observations from low to high.

## ChartKit choice

Use `type: "ranked_contribution"` when each record has one signed contribution
value and the reading task is ranking/concentration. The renderer sorts records,
colors negative and positive bars separately, shades the negative tail, draws
P25/P50/P75 guides, and overlays the cumulative positive contribution share on
the right axis.

For observation-level data, keep the rows in CSV and bind them with
`data.source`, `label_col`, and `value_col` instead of inlining every item into
the spec. Use `items` only for short hand-written examples.

## Avoid

Do not use this chart for ordinary chronological trends; use `line`,
`time_series`, or `mixed` when order in time matters. Do not use it for only a
few categories; use `bar` or `contribution` instead. Keep annotations limited to
extremes or explicit thresholds.
