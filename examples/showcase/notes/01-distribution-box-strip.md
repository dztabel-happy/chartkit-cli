# 01 Distribution Box Strip Design Notes

## Visual Strategy
Use a box summary only as the scaffold and let the jittered observations carry the evidence. Four ordered groups prevent the figure from reading like a toy before/after comparison.

The intended conclusion is: Validation scores improve from legacy and baseline variants toward the proposed model, with overlap and fold-level dispersion still visible.

## Use When
Use when the question needs both compact summary statistics and visible repeated observations: fold scores, seeds, sites, samples, or monthly repeats. It is the best default when raw points are part of the credibility story.

## Avoid
Avoid when density shape, tails, or modality are the main evidence; use violin for a few dense groups or ridge for several ordered distribution shifts. Avoid when the message is only a final aggregate value.

## Spec Anchors
- `type`: `distribution`
- `layout`: `box_strip`
- `profile`: `report_a4.full_width`
- `role`: `distribution`
- source: `examples/showcase/source/01-distribution-box-strip.csv`
