# 04 Correlation Heatmap

## User request

I need to show a feature correlation matrix and make block structure visible without printing every number.

## ChartKit choice

Use `type: "heatmap"` with a diverging colormap and triangular mask for symmetric correlation matrices. Use group guides when features form interpretable blocks. In a report gallery or A4 grid, set the heatmap aspect deliberately so the exported panel keeps the same visual scale as neighboring figures.

## Avoid

Do not annotate every cell in a dense matrix. Do not use a sequential colormap for signed correlation data. Do not let a masked matrix export as a square thumbnail when it is meant to sit beside wide report panels.
