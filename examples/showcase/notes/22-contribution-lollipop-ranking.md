# 22 Contribution Lollipop Ranking Design Notes

## Visual Strategy
Use lollipop ranking for signed drivers when exact magnitude, sign, ordering, and uncertainty all matter. A thin stem plus point gives less visual mass than a full bar, while low/high intervals show which estimates clearly separate from zero.

On full-width report figures, a ranked lollipop can feel empty if every row is unlabelled. Use `label_mode: "extremes"` to label only the largest positive and negative effects, preserving a clean chart while making the exhibit conclusion visible.

The intended conclusion is: Forecast quality and peak timing are the largest positive effects, while stress and curtailment remain the clearest negative drivers after accounting for interval uncertainty.

## Use When
Use when each row is an independent signed effect estimate or driver score relative to a baseline.

## Avoid
Avoid waterfall when the rows are independent effects rather than sequential additions. Avoid plain bars when the zero reference and interval uncertainty are central.

## Spec Anchors
- `type`: `contribution`
- `layout`: `lollipop`
- `data.label_mode`: `extremes`
- `data.label_positive_count` / `data.label_negative_count`: label only the leading effects
- `profile`: `report_a4.full_width`
- `role`: `ranking`
- source: `examples/showcase/source/22-contribution-lollipop-ranking.csv`
