# 04 Correlation Heatmap Design Notes

## Visual Strategy
Use a diverging matrix when sign and block structure matter more than individual exact labels. Reserve heavy text for axes and colorbar; the cell colors should be the main evidence.

The intended conclusion is: Feature groups form three positive blocks with weaker cross-block correlation; the matrix is exported as a report-width panel rather than a square thumbnail.

## Use When
Use when a compact matrix can reveal blocks, signed effects, or structured pairwise relationships.

## Avoid
Avoid if exact numeric lookup is the main task; tables are better for that.

## Spec Anchors
- `type`: `heatmap`
- `layout`: `default`
- `profile`: `report_a4.compact`
- `role`: `correlation`
- source: `examples/showcase/source/04-correlation-heatmap.csv`
