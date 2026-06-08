# 21 Bar Percent Stack

## User request

I need to compare composition shares across several cohorts where each row sums to 100%.

## ChartKit choice

Use `type: "bar"` with `layout: "stacked_percent"` and horizontal orientation when the evidence is part-to-whole composition across many categories. Sort rows by the component that carries the main conclusion and use `data.invert_y: true` when the highest-ranked row should read from the top. Keep the value axis fixed at 0-100 so rows are directly comparable.

## Avoid

Do not use grouped bars when the main question is composition. Do not use pie charts for more than a few categories or when cohorts must be compared side by side. Do not leave rows in arbitrary input order if ranking by one component clarifies the evidence.
