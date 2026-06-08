# 17 Contribution Waterfall Design Notes

## Visual Strategy
Use waterfall for additive contribution accounting. Start and final states should be stable anchors; intermediate steps should show signed increments with restrained labels. Delta labels are usually clearer than cumulative labels for the non-anchor steps.

The intended conclusion is: Data depth and calibration drive most of the gain, while execution constraints remove a smaller but visible amount before the final score.

## Use When
Use when the explanation is additive, ranked, or driver-based rather than a raw category comparison.

## Avoid
Avoid using contribution charts for unrelated categories that do not add to a coherent total.

## Spec Anchors
- `type`: `contribution`
- `layout`: `waterfall`
- `profile`: `report_a4.compact`
- `role`: `composition`
- source: `examples/showcase/source/17-contribution-waterfall.csv`
