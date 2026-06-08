# 01 Distribution Box Strip

## User request

I need to compare several model families across many repeated validation folds, including the spread and raw fold-level observations.

## ChartKit choice

Use `type: "distribution"` with `layout: "box_strip"` when there are enough observations per group to show both summary and raw spread. Prefer at least four meaningful groups when the real question is model-family progression rather than a simple A/B comparison.

## Avoid

Do not use a bar chart for fold-level distributions. Do not use tiny toy samples; with fewer than 10 values per group the plot should be treated as exploratory, not report-grade. Do not reduce a multi-method comparison to Baseline/Ours if intermediate variants are part of the evidence.
