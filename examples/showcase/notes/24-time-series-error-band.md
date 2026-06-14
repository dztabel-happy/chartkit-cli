# 24 Time Series Error Band Design Notes

## Visual Strategy
Use direct-labeled time series when trajectories, events, and uncertainty are the evidence. Event markers should stay thin and contextual so the curves remain primary.

The intended conclusion is: Forecast uncertainty widens during migration, then narrows as observed performance stabilizes above the baseline trajectory.

## Use When
Use when timestamps, event windows, uncertainty bands, and trajectory separation matter.

## Avoid
Avoid labeling every event; sparse context is more report-grade than a timeline full of text.

## Spec Anchors
- `type`: `time_series`
- `layout`: `default`
- `profile`: `report_a4.full_width`
- `role`: `uncertainty`
- source: `examples/showcase/source/24-time-series-error-band.csv`
