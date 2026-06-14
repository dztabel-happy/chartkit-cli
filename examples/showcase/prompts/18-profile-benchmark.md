# 18 Profile Benchmark

## User request

I need to compare several methods across many metrics with different units, including metrics where lower values are better.

## ChartKit choice

Use `type: "radar"` with `layout: "profile_bar"` for a report-grade multi-metric profile. Provide `metric_ranges` so ChartKit normalizes every metric onto a common 0-1 score, reverse ranges for metrics where lower is better, and enable `show_range_lines` when the reader needs to compare the spread across methods per metric. Use `metric_groups` when the metrics naturally form evidence blocks such as quality, robustness, and efficiency.

For full-width report output, place the method legend above the profile when there are several series. A bottom legend creates dead space and makes the plot feel detached from the reading order.

## Avoid

Do not use a polar radar chart for arbitrary KPI lists. If metric names are long or units differ, profile-bar is usually more readable and more report-like than a circular radar plot.
