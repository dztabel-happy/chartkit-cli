---
name: chartkit-report-figure
description: Create polished report-grade charts with ChartKit CLI from analyzed data, research findings, or user-provided datasets. Use when a user asks to draw, improve, export, or QA a chart/figure for an A4 report, paper-style multi-panel figure, business report, or ReportKit deliverable.
---

# ChartKit Report Figure

Use ChartKit when the output should be a stable, attractive, editable report figure instead of an ad hoc matplotlib script.

ChartKit creates report/paper-grade data figures, not presentation slides, infographic posters, dashboards, metric cards, or free-form canvases.

If a requested figure can be interpreted as a slide, infographic, dashboard, or data figure, choose data figure unless the user explicitly asks otherwise.

## Workflow

1. Decide the figure conclusion:
   - `figure_mode`: use `data_figure` unless the user explicitly requests another output class.
   - `contract.conclusion`: the single sentence the figure should prove.
   - `contract.role`: one of `trend`, `comparison`, `distribution`, `correlation`, `composition`, `uncertainty`, `timeline`, `ranking`, `diagnostic`.
2. Write `contract.panel_map` in plain language:
   - Every panel must answer a distinct evidence question.
   - If two panels answer the same evidence question, merge them or replace one with a different evidence type.
   - Use `references/information-architecture.md` for panel-map patterns.
3. Choose archetype:
   - `contract.archetype`: usually `quantitative_grid` for standalone charts or `asymmetric_evidence` for multi-panel figures.
   - `contract.evidence_hierarchy`: identify `hero`, `supporting`, and `context` evidence so layout can prioritize what matters.
4. Choose data-bearing panels with the smallest chart type that carries the evidence:
   - `line` / `time_series` for ordered trends.
   - `bar` for categorical comparison or ranking.
   - `scatter` for relationships and model-vs-human agreement.
   - `heatmap` for matrices and pairwise structure.
   - `network_matrix` for deterministic adjacency or similarity matrices with group strips.
   - `distribution` for histograms, box/strip, violin, or ridge distributions.
   - `interval` for forest plots and uncertainty intervals.
   - `area` for stacked or filled composition over an ordered axis.
   - `contribution` for waterfall, lollipop, or dumbbell explanations.
   - `image_plate` for representative image panels with scale bars.
   - `composite` for Nature-style multi-panel figures with grid layout, panel spans, legend-only panels, and shared colorbars.
   - `custom_python` when a fixed renderer would make the figure uglier or less faithful to the evidence.
   - `custom_r` only when the user provides or requests an R workflow.
5. Add schematic/image only if supporting evidence needs it:
   - `image_plate` for representative image evidence with scale bars.
   - `schematic` for finite workflow/mechanism primitives.
   - Schematic must support the data evidence, not replace it.
6. Use report profiles explicitly:
   - A4 report default: `profile: "report_a4.full_width"`.
   - Compact report slot: `report_a4.half_width` or `report_a4.compact`.
   - Paper-style figure: `nature.single_column` or `nature.double_column`.
7. Build and inspect QA:
   - Encode series semantically.
   - Prefer `role` values such as `ours`, `baseline`, `reference`, `positive`, `negative`, `uncertainty`, `context`.
   - Red and green are allowed, but do not make red/green the only way to tell groups apart. Add semantic roles, labels, direct labels, line styles, markers, or a colorblind-safe palette when meaning depends on those colors.
   - Keep `data_figure` sparse and data-first.
   - Allowed text: axis labels, tick labels, legend labels, direct labels, compact panel titles, sparse annotations, and bottom-centered `(a)`, `(b)` panel labels.
   - Prohibited: hero headlines, subtitle decks, metric cards, explanatory paragraphs, dashboard/card UI, decorative arrows, and bare upper-left `a` / `b` / `c` panel labels.
   - If the user asks for workflow/mechanism/process, use data panels first and make schematic a small supporting panel only when needed.
   - Save the JSON spec and validate:

```bash
chart-kit validate figure.json --theme business-cn
```

   Fix every warning unless there is a conscious design reason. Common fixes are adding `profile`, adding `contract`, adding `contract.panel_map`, adding series `role`, reducing dense ticks, and avoiding explicit small-sample `violin`.

   Build all report artifacts:

```bash
chart-kit build figure.json --out outputs/figure-name --theme business-cn --format all
```

Inspect `outputs/figure-name/chart-quality.json`. Iterate until `quality.ok` is true unless the user explicitly accepts a known tradeoff.

## Spec Patterns

For distribution charts, use `layout: "auto"` unless the user asks for a specific distribution form. `auto` uses box+strip for small samples, ridge for many groups, and violin only when sample size supports shape estimation.

For composite charts, use grid layout when panels have different evidential weight:

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
      "main_trend": "Primary accuracy trend",
      "matrix": "Feature correlation structure"
    },
    "evidence_hierarchy": {
      "hero": ["main_trend"],
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
    {"id": "main_trend", "row": 0, "col": 0, "rowspan": 2, "type": "time_series", "data": {"timestamps": [], "series": []}},
    {"id": "matrix", "row": 0, "col": 1, "type": "heatmap", "data": {"values": [], "x_labels": [], "y_labels": []}},
    {"id": "legend", "row": 1, "col": 1, "kind": "legend"},
    {"id": "colorbar", "row": 0, "col": 2, "rowspan": 2, "kind": "colorbar"}
  ]
}
```

Use `layout: {"kind": "evidence"}` only when the figure should be planned from `contract.evidence_hierarchy`. It promotes one hero panel and places validation/context panels below it. Use explicit `grid` when exact row/column control matters.

Do not stay inside a built-in renderer if doing so makes the figure worse than a careful matplotlib/R script. In that case, use `custom_python` or `custom_r`, but keep the ChartKit contract, profile, theme font stack, output formats, and quality loop. Custom backends execute trusted local scripts; they are not sandboxes for unknown code. Custom scripts must call `setup_publication_rcparams(theme)` before plotting and must not set `DejaVu Sans`, `Arial`, or other arbitrary sans fonts under report/nature serif themes.

## Output Rules

- Prefer SVG/PDF for ReportKit and final documents; include PNG for quick inspection.
- Do not hide chart meaning in captions only. Axis labels, units, legends, direct labels, and panel labels should survive when the figure is moved into a report.
- If ChartKit quality flags a figure, explain the issue and update the spec rather than hand-editing exported files.
- For custom backends, requested formats must be produced inside the output directory. Missing artifacts are build failures, not warnings.
