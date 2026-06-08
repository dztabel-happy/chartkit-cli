# 17 Contribution Waterfall

## User request

I need to explain how a final metric is built from a base value plus sequential positive and negative contributions.

## ChartKit choice

Use `type: "contribution"` with `layout: "waterfall"` when the components are sequential additions to one total. Use start and end items for the anchor values, and signed delta items for the intermediate steps. Prefer `label_mode: "delta"` when the reader needs to understand the contribution of each step rather than only the cumulative endpoint.

## Avoid

Do not use a forest plot or dumbbell when the story is one cumulative total. Do not use waterfall for independent paired estimates; those belong in a dumbbell or interval chart. Do not label every intermediate bar with cumulative totals when the evidence question is "what contributed how much."
