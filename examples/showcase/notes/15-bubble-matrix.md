# 15 Bubble Matrix Design Notes

## Visual Strategy
Use a bubble matrix when pairwise interactions need both magnitude and group context. Color should encode intensity while bubble size remains a secondary cue, never the only encoding. Hide or suppress diagonal self-pairs when they are not real evidence, and use threshold deemphasis to keep weak edges readable without giving them the same visual priority as strong interactions.

The side legend is part of the figure architecture: group swatches, size bubbles, colorbar, and threshold note must read as one ordered key. Keep threshold text as a short note in the side legend; do not invent a separate fake line legend for it.

The intended conclusion is: The strongest ligand-receptor interactions concentrate between immune and stromal compartments.

## Use When
Use when row-column pairings need a matrix but magnitude is better expressed by circles than solid tiles, especially for sparse interaction, adjacency, ligand-receptor, similarity, or transition evidence.

## Avoid
Avoid red-green-only or size-only encoding; keep colorbar and size legend explicit. Avoid plotting diagonal cells as prominent bubbles unless self-interaction is part of the claim.

## Spec Anchors
- `type`: `network_matrix`
- `data.layout`: `bubble`
- `profile`: `report_a4.full_width`
- `role`: `correlation`
- source: `examples/showcase/source/bubble-matrix.csv`
