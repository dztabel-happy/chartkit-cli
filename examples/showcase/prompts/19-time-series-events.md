# 19 Time Series Events

## User request

I need to show a timestamped performance trajectory with a deployment event and a shaded transition window.

## ChartKit choice

Use `type: "time_series"` when the x-axis contains real timestamps rather than generic ordered categories. Use `intervals` for periods and `events` for important dates; keep event labels sparse so they support the data instead of turning the chart into a timeline slide.

## Avoid

Do not use `line` for real dates if date tick formatting, shaded periods, or event markers matter. Do not annotate every operational event; only mark events needed to interpret the observed movement.
