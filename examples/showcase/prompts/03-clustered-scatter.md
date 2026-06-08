# 03 Clustered Scatter

## User request

I need to show agreement between model scores and observed outcomes across two cohorts, including the cohort shift and the overall fit.

## ChartKit choice

Use `type: "scatter"` with point clouds, a fitted trend, and subtle covariance ellipses when the groups are dense enough to define real clusters. Add a sparse data-driven information cue, such as a computed mean outcome shift, when it directly supports the claim. Add reference lines only when they correspond to meaningful decision thresholds.

## Avoid

Do not use this pattern for fewer than a few dozen points. Do not label every point, do not place labels in dense point clouds, and do not add helper lines just to make the chart look complex.
