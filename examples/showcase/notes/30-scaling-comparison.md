# 30 Scaling Comparison Design Notes

## Visual Strategy
Two panels, one claim. Panel (a) shows that the ordering holds at every training budget, which a single-budget bar chart cannot show; panel (b) shows that the ordering is not an artefact of one benchmark, which a single curve cannot show. Neither panel alone would carry the conclusion, and that is the test for whether a two-panel preset is warranted at all.

The log x axis is what makes a scaling claim readable: on a linear axis the first four budgets collapse into the left margin. The SEM bands are drawn as translucent fills under the lines so the separation between methods is judged against the noise, not against the line weight.

Panel (a) uses direct end-of-curve labels and panel (b) uses a legend; both name the same three methods in the same three colours, so the reader learns the encoding once. Colours are chosen dark enough to double as label text — a pale series colour becomes an unreadable label.

The intended conclusion is: Retrieval augmentation holds a 5-7 point accuracy lead at every training budget, and the gap does not close at the largest budget or on any of the four benchmarks.

## Use When
Use when the evidence is "our method scales better *and* the advantage is broad". Typical for a methods paper's headline figure, a model-selection memo, or a data-budget recommendation. If only one of the two questions matters, use a plain `line` or a plain `bar` and give it the whole page.

## Avoid
Avoid long method names — the direct labels have limited room before the second panel starts. Avoid a benchmark panel with more than four or five categories; the grouped bars get thin and the figure turns into a table. Avoid using this preset as a generic two-panel container: `composite` is the facet grammar, and different evidence types belong in different figures.

## Spec Anchors
- `type`: `scaling_comparison`
- `profile`: `report_a4.full_width`
- `role`: `comparison`
- `data.scaling`: `x`, `xscale: "log"`, `series[].values` + `series[].sem`
- `data.benchmarks`: `categories`, `series[].values` + `series[].sem`, `y_range` for legend headroom
- panel labels: emitted by the renderer as bottom-centred `(a)` / `(b)`
- source: `examples/showcase/source/30-scaling-comparison.csv`
