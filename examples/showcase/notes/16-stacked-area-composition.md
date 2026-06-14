# 16 Stacked Area Composition Design Notes

## Visual Strategy
Use stacked area for composition over time or ordered stages. Normalize only when share is the question; otherwise preserve absolute magnitude. Percent axes are clearer than decimal axes for normalized share stories.

The intended conclusion is: Flexible capacity becomes dominant after a transition window, reserve temporarily expands, and legacy capacity is phased out.

## Use When
Use when magnitude or composition changes along an ordered axis and the filled region adds meaning.

## Avoid
Avoid stacking unrelated series; area implies accumulation or composition.

## Spec Anchors
- `type`: `area`
- `layout`: `stacked`
- `profile`: `report_a4.full_width`
- `role`: `composition`
- source: `examples/showcase/source/16-stacked-area-composition.csv`
