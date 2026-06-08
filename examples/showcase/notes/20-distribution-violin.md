# 20 Distribution Raincloud Design Notes

## Visual Strategy
Use raincloud when shape and multimodality matter, but the figure still needs raw observation credibility and compact quartile structure. The half-density should act like a measured backdrop, the raw points should prove sample support, and the small box/IQR marker should orient the reader without becoming a heavy error bar.

The intended conclusion is: The proposed model shifts mass toward the upper mode while keeping the low-score tail shorter than specialist and tuned alternatives.

## Use When
Use when a small number of groups need shape comparison: tails, skew, multimodality, compactness, and sample support. Raincloud should answer both "what does the distribution look like" and "how much observed data supports that shape."

## Avoid
Avoid when there are too few observations per group and density shape is not part of the claim; use box-strip instead. Avoid when many ordered groups would read better as ridges.

## Spec Anchors
- `type`: `distribution`
- `layout`: `raincloud`
- `profile`: `report_a4.compact`
- `role`: `distribution`
- source: `examples/showcase/source/20-distribution-violin.csv`
