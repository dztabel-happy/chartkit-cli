# Composite Grammar

Use `type: "composite"` when one figure needs multiple evidence panels.

## When to use composite

- The figure contract requires more than one evidence type to support the conclusion
- A single chart type cannot carry the full argument
- The archetype is `asymmetric_evidence`, `evidence_matrix`, `schematic_led_composite`, or `clinical_triptych`

## Grid layout

Prefer explicit `grid` layout when you need exact row/column/span control:

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

Use `layout.kind: "evidence"` only when ChartKit should derive proportions from
`contract.evidence_hierarchy` automatically.

## Panel placement

Each panel sets `row`, `col`, `rowspan` (optional), `colspan` (optional):

```json
{"id": "hero", "row": 0, "col": 0, "rowspan": 2, "type": "time_series", "data": {...}}
```

Write `contract.panel_map` before placing panels so every panel answers a distinct question.

## Special panel kinds

**Legend-only panel** — use when a legend would cover data:
```json
{"id": "legend", "row": 1, "col": 2, "kind": "legend"}
```

**Shared colorbar** — for multiple heatmaps sharing one scale:
```json
"shared_colorbar": {"label": "Correlation"},
"panels": [
  {"id": "h1", "row": 0, "col": 0, "type": "heatmap", "data": {...}},
  {"id": "h2", "row": 0, "col": 1, "type": "heatmap", "data": {...}},
  {"id": "cb", "row": 0, "col": 2, "kind": "colorbar"}
]
```

## Full composite example

```json
{
  "version": "0.1",
  "type": "composite",
  "profile": "report_a4.full_width",
  "contract": {
    "conclusion": "The model improves accuracy while preserving calibration.",
    "role": "diagnostic",
    "archetype": "asymmetric_evidence",
    "panel_map": {
      "trend": "Primary accuracy trend over training",
      "matrix": "Feature correlation structure"
    },
    "evidence_hierarchy": {
      "hero": ["trend"],
      "supporting": ["matrix"],
      "context": ["legend", "colorbar"]
    }
  },
  "layout": {
    "kind": "grid",
    "rows": 2,
    "cols": 3,
    "width_ratios": [1.2, 1.0, 0.08],
    "height_ratios": [1.0, 1.0]
  },
  "panel_labels": true,
  "shared_colorbar": {"label": "Correlation"},
  "panels": [
    {"id": "trend", "row": 0, "col": 0, "rowspan": 2, "type": "time_series",
     "data": {"timestamps": [], "series": []}},
    {"id": "matrix", "row": 0, "col": 1, "type": "heatmap",
     "data": {"values": [], "x_labels": [], "y_labels": []}},
    {"id": "legend", "row": 1, "col": 1, "kind": "legend"},
    {"id": "colorbar", "row": 0, "col": 2, "rowspan": 2, "kind": "colorbar"}
  ]
}
```

## Panel type combinations that work well

- `scatter` — embedding or agreement structure
- `distribution` with `layout: "ridge"` — score distributions across groups
- `heatmap` — correlation or similarity matrix
- `joint_scatter` — model-vs-human or prediction-vs-observation
- `radar` — multi-metric tradeoffs
- `convergence` — training or optimization dynamics
- `interval` — uncertainty intervals or forest plots
- `area` — cumulative or stacked composition
- `contribution` — waterfall or dumbbell narratives
- `network_matrix` — adjacency or similarity with group annotations
- `image_plate` — representative image evidence
- `schematic` — mechanism/workflow primitives (supporting, not hero in data figures)

## Composite panel rules

- Every panel must be legible as a standalone mini-figure
- The whole grid reads as one evidence hierarchy
- Do not combine unrelated panels just because the grid allows it
- Panel labels: bottom-centered `(a)`, `(b)` — never bare upper-left `a`, `b`
- If panels repeat the same evidence question, merge or replace one (triggers CKQ404)
