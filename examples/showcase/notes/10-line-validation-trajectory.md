# 10 Line Validation Trajectory Design Notes

## Visual Strategy
Use the renderer defaults to make the data structure clear before adding annotations. The figure should stay data-first, with labels and guides serving the evidence rather than filling space.

The intended conclusion is: The proposed configuration reaches the strongest final validation score while all variants converge late in training.

## Use When
Use when ordered changes or endpoint comparisons matter more than area or categorical magnitude.

## Avoid
Avoid spaghetti charts; direct labels and semantic emphasis work only while the series count is controlled.

## Spec Anchors
- `type`: `line`
- `layout`: `default`
- `profile`: `report_a4.compact`
- `role`: `trend`
- source: `examples/showcase/source/10-line-validation-trajectory.csv`
