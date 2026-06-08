# 12 Distribution Histogram

## User request

I need to compare residual distributions before and after calibration, especially bias around zero and tail behavior.

## ChartKit choice

Use `type: "distribution"` with `layout: "hist"` when the evidence is the full residual density rather than category means. Use a restrained step-filled histogram style when multiple distributions overlap, with enough observations per series and a zero reference line when residual bias matters.

Use `data.insights` with `kind: "percentiles"` only when quartiles or tail markers are central to the claim. Prefer computed percentile guides over manually typed values, but keep them out of dense peak regions when they would compete with the distribution shape.

## Avoid

Do not use a line chart for unordered residuals. Do not use overlapping histograms for too many groups; if there are many cohorts, use ridge or faceted distributions instead. Do not add percentile labels by habit when a zero reference line carries the main bias cue.
