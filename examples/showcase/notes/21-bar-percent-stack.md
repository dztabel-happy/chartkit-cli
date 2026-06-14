# 21 Bar Percent Stack Design Notes

## Visual Strategy
Use percent stacks for composition across categories when totals are normalized. Rows should be ordered by the component that carries the main conclusion, and segments should be ordered consistently across rows.

The intended conclusion is: Enterprise and rural portfolios remain core-load heavy, while urban and SMB portfolios allocate more share to flexible and interruptible capacity.

## Use When
Use when categories are discrete and the task is to compare part-to-whole composition across groups.

## Avoid
Avoid tiny category counts with no variability layer; the result will look like a toy chart. Avoid arbitrary row order when one component naturally defines the ranking.

## Spec Anchors
- `type`: `bar`
- `layout`: `stacked_percent`
- `profile`: `report_a4.full_width`
- `role`: `composition`
- source: `examples/showcase/source/21-bar-percent-stack.csv`
