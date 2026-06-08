# 20 Distribution Raincloud

## User request

I need to compare dense repeated evaluation distributions where shape and tail behavior matter, not just mean differences.

## ChartKit choice

Use `type: "distribution"` with `layout: "raincloud"` when a few groups need density shape, raw observations, and quartile structure in one report-grade figure. Raincloud combines a half-density silhouette, a compact box/IQR marker, and jittered observations, so it is usually a better default than a full symmetric violin for A4 reports.

## Avoid

Do not use raincloud for too many ordered groups; use `ridge` when the main evidence is a long distribution shift ladder. Do not use full `violin` as the default just because density exists; use it only when the complete symmetric silhouette itself is useful. Use `box_strip` when raw fold/seed observations and quartiles are the credibility story and density shape is not central.
