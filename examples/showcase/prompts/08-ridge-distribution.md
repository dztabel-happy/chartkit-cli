# 08 Ridge Distribution

## User request

I need to compare several ordered model-family score distributions and show how the full distribution shifts from legacy to proposed variants.

## ChartKit choice

Use `type: "distribution"` with `layout: "ridge"` when there are several ordered groups and enough observations per group to make density shapes meaningful. Keep median ticks visible when the conclusion depends on a distributional shift, but avoid turning the ridge into a summary-stat chart.

## Avoid

Do not use ridge plots with tiny samples. Do not use ridge for only two groups; use box-strip or violin depending on whether raw observations or shape/tails are the evidence. Do not add group means as large labels; the distribution shape is the evidence.
