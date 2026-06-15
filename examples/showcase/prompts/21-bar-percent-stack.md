# 21 Bar Percent Stack

## User request

I need to compare composition shares across several cohorts where each row sums to 100%.

## ChartKit choice

Use `type: "bar"` with `layout: "stacked_percent"` and horizontal orientation when the evidence is part-to-whole composition across many categories. Sort rows by the component that carries the main conclusion and use `data.invert_y: true` when the highest-ranked row should read from the top. Keep the value axis fixed at 0-100 so rows are directly comparable.

When the conclusion depends on a small number of components, label only those conclusion-bearing segments in-bar. In this example, `Core load` and `Flexible` carry the shift from core-load-heavy portfolios toward flexible allocation, so those two series use in-bar percentage labels while the supporting segments stay unlabelled.

## Avoid

Do not use grouped bars when the main question is composition. Do not use pie charts for more than a few categories or when cohorts must be compared side by side. Do not leave rows in arbitrary input order if ranking by one component clarifies the evidence. Do not label every segment in every row unless the labels are the evidence; dense segment numbers make the chart feel like a table.
