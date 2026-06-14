# 08 Ridge Distribution Design Notes

## Visual Strategy
Use ridges to compare ordered distribution shifts across several groups without forcing them into adjacent box plots. Vertical spacing, soft fills, and compact median ticks should make the shift readable before exact values.

The intended conclusion is: The proposed model family is shifted toward higher validation scores across repeated splits, while intermediate families show a gradual distributional transition.

## Use When
Use when the question is about distribution shift across several ordered groups, especially when overlap and mode movement matter.

## Avoid
Avoid when there are too few observations per group, when there are only two groups, or when the message is only a final aggregate value.

## Spec Anchors
- `type`: `distribution`
- `layout`: `ridge`
- `profile`: `report_a4.full_width`
- `role`: `distribution`
- source: `examples/showcase/source/08-ridge-distribution.csv`
