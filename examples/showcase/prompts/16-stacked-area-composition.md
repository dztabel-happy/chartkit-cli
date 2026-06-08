# 16 Stacked Area Composition

## User request

I need to show how several nonnegative components change their share over an ordered planning window, including a temporary reserve bulge during the transition.

## ChartKit choice

Use `type: "area"` with `layout: "stacked"` when the evidence is composition over an ordered axis. Use `normalize: true` for share-of-total stories, and use direct labels only when the number of components is small enough to read without a legend.

## Avoid

Do not use stacked area for unrelated series that should be compared independently. Do not use this pattern when negative values or arbitrary signed deltas are part of the data.
