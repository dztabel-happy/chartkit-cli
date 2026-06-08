# 05 Forest Interval

## User request

I need to rank multiple factor effects and show uncertainty around each estimate.

## ChartKit choice

Use `type: "interval"` with `layout: "forest"` when each row is an effect estimate with low/high uncertainty bounds. Keep a zero reference line and encode negative effects with a second marker/color.

## Avoid

Do not use bars for uncertainty-heavy estimates. Do not hide rows just to make the figure look sparse; forest plots are meant to carry several estimates.
