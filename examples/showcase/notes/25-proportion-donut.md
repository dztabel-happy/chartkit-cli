# 25 Proportion Donut

## Visual Strategy

One sorted donut, largest slice starting at 12 o'clock and reading clockwise. The tail beyond the slice budget collapses into a muted, localized "Other" slice that always sits last, so the visual order is also the ranking. Labels are direct — category plus percentage — placed in two side columns with thin leader lines, which keeps thin slices readable without a legend. The ring center is reserved for the one earned number: the computed total (`data.center.value_format`), formatted from the same data that drew the slices. White wedge edges separate slices at print sizes.

## Use When

The evidence is part-to-whole composition at a single point in time, with one dominant question: "what makes up the total, and how big is each share?" Typical asks: revenue mix by business line, generation mix by source, cost structure, market share snapshot. Also the correct disciplined response when a user literally asks for a "pie chart" (饼图/占比).

## Avoid

Avoid proportion when shares must be compared across cohorts, regions, or time — that is `bar` `stacked_percent` or stacked `area` territory. Avoid more than six visible slices (CKQ127 warns); merge or let ChartKit group the tail. Avoid signed or negative "shares" — a donut cannot show direction; use `contribution`. Avoid decorating the center hole with slogans or KPI-card text; only the computed total or nothing.
