# 26 Composite Solar Curtailment Small Multiples

## User request

I have hourly output data for a solar plant, one representative day per month for the last twelve months. Show, month by month, how much of the available power was actually delivered and where the grid curtailment window cut into it.

## ChartKit choice

Use `type: "composite"` with the facet grammar when the *same* chart must repeat across an ordered set of facets — here twelve months of the same three-curve day profile. Put everything the facets share in `facet.base` (chart `type: "line"`, the hour axis, axis labels) and give each `facet.panels[]` entry only its own `title` and `data`: the month's series values plus its `data.intervals` curtailment window. The engine keeps the grid uniform, shares the y-scale (`share_y: true`), shows the x-axis only on the bottom row, and draws one shared legend for the whole figure.

Encode the evidence hierarchy in the series roles: the actual output is `role: "ours"` (the line being judged), the available envelope is `role: "reference"`, and the forecast is `role: "context"` with a dashed style. Put the per-facet headline number (the month's curtailment rate) in the panel `title` so each cell answers the question at a glance.

## Avoid

Do not pack twelve dense standalone charts into one frame — each cell must stay sparse (a few series, shared scale) or the facets stop being comparable. Do not give cells their own legends or y-axis labels; the shared legend and left-column axis carry them. Do not use composite for *different* evidence types (a trend next to a distribution next to a matrix) — those are separate figures. Do not let panels drift onto different y-scales unless the claim is about within-month shape rather than across-month magnitude; if you must, set `share_y: false` deliberately.
