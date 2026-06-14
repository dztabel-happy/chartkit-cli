# 12 Distribution Histogram Design Notes

## Visual Strategy
Use aligned histograms to compare distribution shift and tail behavior. A step-filled style with shared bins keeps overlap interpretable instead of turning the plot muddy.

Computed percentile guides can add structure to the density when quartiles or tails are part of the claim. Keep the guides sparse and data-derived; in residual plots, a zero reference line is often enough.

The intended conclusion is: Calibration pulls residuals toward zero and shortens the negative tail; the proposed model is the most concentrated around unbiased predictions.

## Use When
Use when the question is about spread, tails, overlap, modality, or repeated-run variability rather than a single mean.

## Avoid
Avoid when there are too few observations per group, or when the message is only a final aggregate value.

## Spec Anchors
- `type`: `distribution`
- `layout`: `hist`
- `profile`: `report_a4.full_width`
- `role`: `distribution`
- source: `examples/showcase/source/12-distribution-histogram.csv`
