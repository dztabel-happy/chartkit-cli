# Composite Grammar

Use `type: "composite"` when one figure needs several evidence panels.

## Grid Layout

Prefer explicit `grid` layout when the paper/report figure needs deliberate composition. Do not let the grid become a collage: each panel should support the same figure contract and be ordered by evidence value.

```json
"layout": {
  "kind": "grid",
  "rows": 2,
  "cols": 3,
  "width_ratios": [1.25, 1.0, 0.08],
  "height_ratios": [1.0, 1.0],
  "wspace": 0.32,
  "hspace": 0.42
}
```

## Panel Placement

Each panel may set `row`, `col`, `rowspan`, and `colspan`. Before placement, write `contract.panel_map` so every panel answers a distinct evidence question.

```json
{"id": "hero", "row": 0, "col": 0, "rowspan": 2, "type": "time_series"}
```

## Legend-Only Panel

Use this when legends would cover data:

```json
{"id": "legend", "row": 1, "col": 1, "kind": "legend"}
```

## Shared Colorbar

For multiple heatmaps, render heatmap panels without individual colorbars and reserve one panel:

```json
"shared_colorbar": {"label": "Correlation"},
"panels": [
  {"id": "h1", "row": 0, "col": 0, "type": "heatmap"},
  {"id": "h2", "row": 0, "col": 1, "type": "heatmap"},
  {"id": "cb", "row": 0, "col": 2, "kind": "colorbar"}
]
```

## Nature-Style Evidence Matrix

Do not combine unrelated panels just because the grid allows it. A strong composite figure usually uses several panel types to support one claim:

- `scatter` for representation or embedding structure.
- `distribution` with `layout: "ridge"` for score distributions.
- `clustered_heatmap` for correlation or similarity structure.
- `joint_scatter` for model-vs-human or prediction-vs-observation agreement.
- `radar` for multi-metric tradeoffs.
- `convergence` for training or temporal dynamics.
- `interval` for uncertainty intervals or forest plots.
- `area` for cumulative or stacked composition over an ordered axis.
- `contribution` for waterfall, lollipop, or dumbbell contribution narratives.
- `network_matrix` for deterministic adjacency or similarity matrices.
- `image_plate` for representative image panels with scale bars.
- `schematic` for mechanism/workflow primitives when a finite diagram is clearer than a chart.

Each panel should be legible as a standalone mini-figure, and the whole grid should read as one evidence hierarchy.

In `data_figure` mode, schematic is supporting evidence, not the visual centerpiece. Most panel area should be axes, data marks, matrices, distributions, quantified comparisons, curves, intervals, or image evidence.

If panels repeat the same evidence question, merge them or replace one with a different evidence type. Do not use workflow diagrams, metric cards, or explanatory paragraphs as evidence panels.

Use `layout.kind: "evidence"` only when ChartKit should derive the panel proportions from `contract.evidence_hierarchy`. Use explicit `grid` when exact row/column/span control matters.

Panel labels default to report-friendly bottom labels such as `(a)` and `(b)` so captions can reference subfigures cleanly. Keep them horizontally aligned unless the figure has a deliberate non-grid layout. Do not use bare upper-left `a` / `b` / `c` labels in report/nature data figures.
