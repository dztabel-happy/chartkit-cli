# 19 Time Series Events Design Notes

## Visual Strategy
Use direct-labeled time series when trajectories, events, and uncertainty are the evidence. Event markers should stay thin and contextual so the curves remain primary.

The intended conclusion is: The proposed series separates after deployment, dips briefly during migration, and recovers to a higher trajectory.

## Use When
Use when timestamps, event windows, uncertainty bands, and trajectory separation matter.

## Avoid
Avoid labeling every event; sparse context is more report-grade than a timeline full of text.

## Spec Anchors
- `type`: `time_series`
- `layout`: `default`
- `profile`: `report_a4.compact`
- `role`: `timeline`
- source: `examples/showcase/source/19-time-series-events.csv`
