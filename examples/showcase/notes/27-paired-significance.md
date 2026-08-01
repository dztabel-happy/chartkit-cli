# 27 Paired Significance Design Notes

## Visual Strategy
Three encodings answer three different questions in one panel. The box answers "where did the group sit"; the strip points answer "how much data is behind that"; the paired lines answer "did individual patients move together or did the group mean hide two populations". The lines are deliberately the quietest layer — thin, low alpha, drawn under the points — because they are texture, not the headline. When they fan out or cross, that crossing *is* the finding.

Colour runs baseline grey to teal to primary blue so the three visits read as an ordered sequence rather than three unrelated cohorts.

Significance brackets sit above the data and lane-stack automatically: shorter spans are placed first, and a wider one is pushed clear of every bracket it overlaps. The nested `Baseline`-to-`Week 24` span needs no help — it lands in its own lane above the other two. Reach for an explicit `level` only when you want a specific reading order, not to fix a collision.

The intended conclusion is: Symptom severity falls sharply by week 8 and continues to improve to week 24, but a minority of patients track upward, which only the within-patient lines reveal.

## Use When
Use when the same units are measured more than once — before/after, crossover arms, repeated visits, paired replicates — and the reader needs both the group summary and the individual trajectory. Use it whenever a paired test is being reported: an unpaired-looking figure beside a paired *p* value is a mismatch a reviewer will catch.

`data.paired` is legal on `box`, `box_strip`, `violin` and `raincloud`. `box` grows a strip layer on demand so the links have points to land on.

## Avoid
Avoid for independent samples — connecting lines assert a pairing that is not there. Avoid `connect: "all"` beyond three groups; the links become a hairball that hides the before/after reading they exist for. Avoid stacking more brackets than the analysis supports, and never let a bracket imply a comparison that was not tested.

## Spec Anchors
- `type`: `distribution`
- `layout`: `box_strip`
- `profile`: `report_a4.full_width`
- `role`: `distribution`
- `data.paired`: `{connect, alpha, linewidth}` — connecting lines for repeated measures
- `series[].subjects`: the identity the links are joined on
- `annotations[].type`: `significance` with `from` / `to` / `p` — lanes are automatic
- source: `examples/showcase/source/27-paired-significance.csv`
