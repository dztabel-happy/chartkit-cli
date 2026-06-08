# 11 Mixed Dual Axis

## User request

I need one compact report figure that shows an interval-level primary measurement as bars and a secondary rate/index as a line on a different scale, with repeated seasonal pullbacks visible.

## ChartKit choice

Use `type: "mixed"` with `kind: "bar"` for the left-axis interval aggregate and `kind: "line"` for the right-axis continuous measurement. Use the right axis because of units/scale, not because of a fixed business scenario. Keep both series complex enough to show real movement, including pullbacks or softness periods when present.

Use `data.insights` for computed threshold crossings when the secondary rate crosses a meaningful target; let ChartKit compute the crossing position from the current data. Prefer a short direct endpoint label for the line instead of a legend when there is only one secondary series.

## Avoid

Do not use dual axes for series with the same unit. Do not mix bars and lines merely to make the plot look rich; they must answer one evidence question. Do not default to gray bars plus a blue line if a more coherent muted palette better serves the report.
