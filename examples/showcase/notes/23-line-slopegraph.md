# 23 Line Slopegraph Design Notes

## Visual Strategy
Use a slopegraph for two-timepoint or two-condition change. Endpoint labels should do the legend work, while line weight and semantic roles decide emphasis. Labels need side gutters and collision avoidance, not a heavy legend. When more than a few cohorts need labels on both sides, use a full-width A4 slot so the between-state movement remains the visual subject instead of being compressed between side labels.

Use computed `top_mover` when the evidence depends on which cohort changed most. The renderer should calculate endpoint change and label the relevant endpoint, rather than relying on a hand-written callout.

The intended conclusion is: All cohorts improved after rollout, with enterprise and urban cohorts showing the largest absolute gains while public and rural segments remain lowest after rollout.

## Use When
Use when ordered changes or endpoint comparisons matter more than area or categorical magnitude.

## Avoid
Avoid spaghetti charts. When many endpoints are close, spread labels vertically and use subtle leader lines rather than letting text collide with points or neighboring labels.

## Spec Anchors
- `type`: `line`
- `layout`: `slopegraph`
- `profile`: `report_a4.full_width`
- `role`: `comparison`
- source: `examples/showcase/source/23-line-slopegraph.csv`
