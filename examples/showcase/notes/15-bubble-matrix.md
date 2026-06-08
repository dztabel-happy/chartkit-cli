# 15 Bubble Matrix Design Notes

## Visual Strategy
Use a bubble matrix when pairwise interactions need both magnitude and group context. Color should encode intensity while bubble size remains a secondary cue, never the only encoding. Hide or suppress diagonal self-pairs when they are not real evidence, and use threshold deemphasis to keep weak edges readable without giving them the same visual priority as strong interactions.

The intended conclusion is: The strongest ligand-receptor interactions concentrate between immune and stromal compartments.

## Use When
Use when row-column pairings need a matrix but magnitude is better expressed by circles than solid tiles, especially for sparse interaction, adjacency, ligand-receptor, similarity, or transition evidence.

## Avoid
Avoid red-green-only or size-only encoding; keep colorbar and size legend explicit. Avoid plotting diagonal cells as prominent bubbles unless self-interaction is part of the claim.

## Spec Anchors
- `type`: `network_matrix`
- `data.layout`: `bubble`
- `profile`: `nature.double_column`
- `role`: `correlation`
- source: `examples/showcase/source/bubble-matrix.csv`
