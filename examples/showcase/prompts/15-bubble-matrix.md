# 15 Bubble Matrix

## User request

I have a square interaction matrix between groups. I need a report figure that
shows both interaction strength and group structure without turning the figure
into a table.

## ChartKit choice

Use `type: "network_matrix"` with `data.layout: "bubble"` when rows and columns
share the same set of entities and each cell contains an interaction score.
Encode strength with circle size and color, add a colorbar/size guide, and use
group strips only when they help interpret blocks in the matrix. If diagonal
self-pairs are not evidence, set `mask_diagonal: true`; if a threshold defines
meaningful interactions, let sub-threshold cells stay visible but subdued.
When a side legend is present, keep the threshold as one rule note such as
`emphasize >= 0.25`; do not draw a fake line symbol or a separate threshold
legend subsection.

Keep the side legend compact and systematic: group swatches first, size bubbles
second, then a one-line threshold note. Avoid long explanatory labels in that
side area because they compete with the matrix and colorbar.

## Avoid

Do not print numeric values in every cell unless the matrix is tiny. Do not use a
heatmap if the user specifically needs both magnitude and sparse interaction
emphasis. Do not add explanatory paragraphs inside the figure.
