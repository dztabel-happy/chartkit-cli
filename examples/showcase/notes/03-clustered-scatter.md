# 03 Clustered Scatter Design Notes

## Visual Strategy
Use separated point clouds, subtle covariance ellipses, and a fitted trend to show both relationship and cohort shift. Let the data density create sophistication, then add one data-driven information cue when it helps the claim, such as a computed mean outcome shift between cohorts. Keep ellipses scaled down and translucent so they read as density cues rather than decorative outlines.

The intended conclusion is: Higher model scores align with stronger observed outcomes across both cohorts, with the proposed cohort shifted upward.

## Use When
Use when the chart needs to show point-level relationship, clusters, thresholds, or outliers.

## Avoid
Avoid turning annotations into a label cloud. Do not add horizontal or vertical reference lines unless the threshold is meaningful in the current task. Do not place centroid labels in the middle of dense point clouds unless the claim is specifically about group centers.

## Spec Anchors
- `type`: `scatter`
- `layout`: `default`
- `profile`: `report_a4.compact`
- `role`: `correlation`
- `data.ellipse_scales`: compact covariance contours
- source: `examples/showcase/source/03-clustered-scatter.csv`
