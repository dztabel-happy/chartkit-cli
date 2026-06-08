# 06 Area Trajectory Design Notes

## Visual Strategy
Use filled trajectories for cumulative contribution or magnitude over an ordered axis. Direct labels should replace legends only when the number of series stays small.

The intended conclusion is: Signal contribution ramps after deployment, dips during a mid-window incident, then recovers into a higher plateau.

## Use When
Use when magnitude or composition changes along an ordered axis and the filled region adds meaning.

## Avoid
Avoid stacking unrelated series; area implies accumulation or composition.

## Spec Anchors
- `type`: `area`
- `layout`: `area`
- `profile`: `report_a4.compact`
- `role`: `trend`
- source: `examples/showcase/source/06-area-trajectory.csv`
