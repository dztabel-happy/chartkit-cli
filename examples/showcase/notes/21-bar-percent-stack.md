# 21 Bar Percent Stack Design Notes

## Visual Strategy
Use percent stacks for composition across categories when totals are normalized. Rows should be ordered by the component that carries the main conclusion, and segments should be ordered consistently across rows.

The intended conclusion is: Enterprise and rural portfolios remain core-load heavy, while urban and SMB portfolios allocate more share to flexible and interruptible capacity.

The example labels only the two conclusion-bearing components, `Core load` and `Flexible`, inside the bars. This gives the reader numerical anchors for the structural shift without turning every row into a dense table of percentages. Supporting components remain readable through color and relative width.

## Use When
Use when categories are discrete and the task is to compare part-to-whole composition across groups.

## Avoid
Avoid tiny category counts with no variability layer; the result will look like a toy chart. Avoid arbitrary row order when one component naturally defines the ranking.

Avoid labelling every stack segment by default. For report figures, segment labels should identify the comparison being argued, not exhaustively repeat all data values.

## Spec Anchors
- `type`: `bar`
- `layout`: `stacked_percent`
- `profile`: `report_a4.full_width`
- `role`: `composition`
- source: `examples/showcase/source/21-bar-percent-stack.csv`
