# 11 Mixed Dual Axis Design Notes

## Visual Strategy
Use a dual axis only when the measures have different units or clearly different scales. The bar or area layer should be visually subordinate to the line layer that carries the secondary-scale trend. A short direct label on the secondary line is usually cleaner than a legend for one bar layer plus one line layer.

When a target or operating threshold is meaningful, add a computed `threshold_crossing` insight so the figure marks where the line first crosses that threshold without hard-coded labels.

The intended conclusion is: Interval volume expands despite repeated pullbacks, while the rate index crosses the operating target and finishes at a new high.

## Use When
Use when two measures belong in the same ordered frame but have different units or materially different scales.

## Avoid
Avoid dual axes for decoration or for measures that can be normalized into one scale without losing meaning.

## Spec Anchors
- `type`: `mixed`
- `layout`: `default`
- `profile`: `report_a4.full_width`
- `role`: `trend`
- source: `examples/showcase/source/11-mixed-dual-axis.csv`
