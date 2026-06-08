# 24 Time Series Error Band

## User request

I need to show a forecast trajectory over time with uncertainty and compare it with observed validation performance.

## ChartKit choice

Use `type: "time_series"` with a series `sem` or `band` when uncertainty around a timestamped line is part of the evidence. Use direct labels for a small number of series and keep event annotations sparse.

## Avoid

Do not use an error-band time series for unordered checkpoints. Do not annotate every point; use bands for uncertainty and only mark events that explain structural changes.
