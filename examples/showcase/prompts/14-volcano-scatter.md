# 14 Volcano Scatter

## User request

I have many tested features with an effect size and a p-value. I need a compact
data figure that separates significant up/down features from nonsignificant
background points and labels only the strongest hits.

## ChartKit choice

Use `type: "scatter"` with the `data.volcano` contract when the x variable is an
effect size and the y variable should be `-log10(p)`. Set effect and p-value
thresholds, keep background points muted, and label only a small number of
extreme significant points. When most feature ids are automatic names, use
`label_named_only: true` and provide explicit `label` only for interpretable
hits. Use `label_top_per_side` when the up/down sides both need representation
without crowding the figure.

## Avoid

Do not label every point. Do not use a plain scatter when the evidence question
depends on both effect-size and significance thresholds. Do not replace this
with a schematic or slide-like workflow diagram.
