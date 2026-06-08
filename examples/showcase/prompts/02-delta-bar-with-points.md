# 02 Delta Bar With Points

## User request

I need a compact benchmark summary showing average metric lift, but I also want the repeated monthly observations visible.

## ChartKit choice

Use `type: "bar"` with `show_points: true` when each category has repeated observations. For a single lift series, use a horizontal ranked bar so category names stay readable and the strongest effects read first. Bars carry the mean, error bars carry SEM, and points show the underlying months.

## Avoid

Do not hide repeated observations behind only a bar. Do not add value labels when raw points and error bars already carry the evidence. Do not use this pattern for a two-method cohort benchmark; use the separate grouped benchmark card for that.
