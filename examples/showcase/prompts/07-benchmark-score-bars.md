# 07 Benchmark Score Bars

## User request

I need to compare three methods across several cohorts and show seed-level variability.

## ChartKit choice

Use grouped `bar` with raw seed points when each cohort has replicated runs and the question is method comparison within each cohort. Tight y-axis is acceptable here because the metric is a bounded score and zero would hide meaningful differences.

## Avoid

Do not use this pattern for a single lift series; use a ranked horizontal lift bar instead. Do not use tight axes for counts, money, or unbounded quantities. Do not omit raw seeds when the claim depends on stability.
