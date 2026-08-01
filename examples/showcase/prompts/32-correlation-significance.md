# 32 Correlation Matrix with Significance

## User request

I have twelve sleep, mood and cognitive measures on 120 participants. I need the correlation matrix as a figure, with the significant pairs marked, and I do not want the redundant half of the matrix to look like missing data.

## ChartKit choice

Use `type: "heatmap"` on the fixed correlation scale — `vmin: -1`, `vmax: 1`, `colormap: "RdBu_r"` — so a cell colour means the same thing here as in every other correlation matrix the reader has seen. Never let the range key to the observed extremes: a matrix whose strongest correlation is 0.4 would come out the same saturated red as one whose strongest is 0.95.

Half of a symmetric matrix is redundant, so mask it — and set `mask_fill` whenever you mask. A transparent masked cell takes the page background, which is white on both themes, and the omitted half then reads as *missing data* rather than as the half you deliberately did not draw. `mask_fill: true` fills it with the theme's grid colour. This card also drops the diagonal, because `r = 1` is a property of the definition and not a finding; masking the diagonal needs the explicit boolean-matrix form of `data.mask`, while `mask: "upper"` is the one-word form that keeps it.

Give `significance.p_values` a matrix of the same shape as `data.values`, with `null` wherever no test was run. At 66 drawn pairs there is no room for both the coefficient and the marker, so `mode: "replace"` prints the marker alone and lets colour carry the magnitude — a blank cell is one that did not reach p < 0.05. Below roughly six variables, drop `mode` and let the default `append` print the coefficient with the marker under it.

ChartKit does not draw a legend for the marker ladder, so put it in the masked triangle with a `text` annotation. Heatmap annotations are positioned in cell-index space: an axis label or a 0-based cell index, fractional values allowed.

Order the variables so related ones are adjacent and name the runs with `col_groups` / `row_groups`. A correlation matrix in arbitrary variable order still has block structure — it just hides it.

## Avoid

Do not leave a masked triangle transparent. Do not print coefficients and markers together above about forty drawn cells: the two-line labels collide and the matrix turns into a table nobody can read. Do not feed z-scores, `1 - p`, or signed values into `significance.p_values` — a `p <= max` ladder hands a negative number the *strongest* marker, and the figure then looks correct and reads backwards (`CKQ145` names this). Do not use a sequential colormap for signed correlations, and do not let a correlation matrix auto-scale its colour range.
