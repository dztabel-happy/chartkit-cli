# 07 Benchmark Score Bars Design Notes

## Visual Strategy
Use grouped bars for method-level comparison within each cohort and overlaid replicate points for credibility. The point layer should stay lighter than the bars so the chart remains a benchmark comparison figure, not a dot swarm.

The intended conclusion is: The proposed method improves benchmark scores beyond the tuned baseline across all cohorts, with the stress cohort remaining the hardest setting.

## Use When
Use when categories are discrete and the task is to compare several methods or treatments within each group, with replicated runs available.

## Avoid
Avoid tiny category counts with no variability layer; the result will look like a toy chart. Do not use this card for one-series ranked lift; that is a separate pattern.

## Spec Anchors
- `type`: `bar`
- `layout`: `grouped`
- `profile`: `report_a4.compact`
- `role`: `comparison`
- source: `examples/showcase/source/07-benchmark-score-bars.csv`
