# 23 Line Slopegraph

## User request

I need to show before-and-after changes for several cohorts without turning it into a cluttered time series.

## ChartKit choice

Use `type: "line"` with `layout: "slopegraph"` when there are exactly two ordered states and the comparison is movement between them. Use endpoint labels so the chart can be read without a separate legend.

Use `data.insights` with `kind: "top_mover"` when the claim depends on the cohort with the largest before-after lift. Let ChartKit compute endpoint change across series.

## Avoid

Do not use slopegraph for long time series. If there are many periods, use a line or time-series chart; if there is only one value per cohort, use a ranked bar or lollipop.
