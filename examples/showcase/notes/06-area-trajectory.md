# 06 Area Trajectory Design Notes

## Visual Strategy
Use filled trajectories for cumulative contribution or magnitude over an ordered axis. Direct labels should replace legends only when the number of series stays small.

For full-width report figures, an area trajectory should not be a naked monotonic shape. Add restrained event markers or interval bands when the source narrative includes deployment phases, incidents, interventions, or recovery windows. These marks should explain the shape of the data, not decorate it.

The intended conclusion is: Signal contribution ramps after deployment, dips during a mid-window incident, then recovers into a higher plateau.

## Use When
Use when magnitude or composition changes along an ordered axis and the filled region adds meaning.

## Avoid
Avoid stacking unrelated series; area implies accumulation or composition.

## Spec Anchors
- `type`: `area`
- `layout`: `area`
- `profile`: `report_a4.full_width`
- `data.intervals`: use for short phase or incident windows
- `data.events`: use for one or two turning points, not every point
- `role`: `trend`
- source: `examples/showcase/source/06-area-trajectory.csv`
