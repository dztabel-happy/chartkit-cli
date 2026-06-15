# 09 Signed Effect Heatmap

## User request

I need to show signed metric changes across cohorts, including benefits and operational trade-offs.

## ChartKit choice

Use `type: "heatmap"` with a diverging colormap for signed deltas. Group columns when metrics naturally separate into quality, operations, and generalization blocks.
When the data is already a wide matrix CSV, bind it with `data.source`, `data.row_col`, and `data.value_cols` rather than copying every cell into `data.values`.

## Avoid

Do not use sequential colors for positive/negative effects. Do not annotate dense cells unless exact values are the main reading task.
