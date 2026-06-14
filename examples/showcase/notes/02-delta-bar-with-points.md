# 02 Delta Bar With Points Design Notes

## Visual Strategy
Use bars for metric-level effect size and overlaid replicate points for credibility. A horizontal ranked layout works well for a single lift series because it gives long metric labels room and makes the effect ranking immediate. The point layer should stay lighter than the bars so the chart remains a comparison figure, not a dot swarm.

The intended conclusion is: The new strategy improves every tracked metric, with the largest lift in return and hit-rate performance.

## Use When
Use when categories are discrete and the task is to compare a single magnitude, share, or metric lift across groups.

## Avoid
Avoid tiny category counts with no variability layer; the result will look like a toy chart. For two or more named methods, prefer grouped benchmark bars or a profile view rather than forcing a single-series lift pattern.

## Spec Anchors
- `type`: `bar`
- `layout`: `grouped`
- `profile`: `report_a4.full_width`
- `role`: `comparison`
- source: `examples/showcase/source/02-delta-bar-with-points.csv`
