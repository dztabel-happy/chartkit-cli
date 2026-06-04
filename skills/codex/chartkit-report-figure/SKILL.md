---
name: chartkit-report-figure
description: >-
  Produce polished report-grade or paper-grade data figures from user data or requirements using
  ChartKit CLI. Use when the user uploads data, describes what they want to visualize, or asks to
  draw/improve/export a chart for an A4 report, business report, ReportKit deliverable, or
  multi-panel paper figure. The LLM understands the data, selects the right chart type, writes a
  JSON spec, and iterates with the CLI until quality passes. Also trigger on: 数据图、报告配图、
  论文配图、图表、可视化、画图、出图、多面板图、帮我画图、根据数据出图.
version: 3.0.0
---

# ChartKit Report Figure

ChartKit CLI renders publication-quality figures from a declarative JSON spec. The LLM decides
*what* to show; the CLI handles rendering, theming, font embedding, and quality checks.

Do not write matplotlib code. Write a JSON spec and use the CLI.

## Step 1 — Understand the data and the goal

Before writing anything, answer these questions:

1. **What is the user's data structure?** (columns, types, sample size, time series vs categorical vs matrix)
2. **What claim should the figure prove?** If the user has not stated a claim, infer one from the data and confirm.
3. **Who is the audience and output format?** A4 business report, academic paper, or presentation?

From the answers, decide:
- `conclusion` — one sentence with a verb: "Group A outperforms B on all three metrics"
- `role` — what kind of evidence: `trend` | `comparison` | `distribution` | `correlation` | `composition` | `uncertainty` | `timeline` | `ranking` | `diagnostic`
- `archetype` — overall figure structure (see below)

When the chart type is unclear, run:
```bash
chart-kit atlas --role <role>
```
The CLI returns a ranked recommendation list based on your role and archetype.

## Step 2 — Choose the archetype

| Archetype | Use when |
|---|---|
| `quantitative_grid` | Claim is numerical; panels share a comparison axis |
| `asymmetric_evidence` | One main result + smaller supporting panels |
| `schematic_led_composite` | Mechanism must be understood first; schematic is hero |
| `image_plate_plus_quant` | Imaging or representative images lead the evidence |
| `timeline_or_process_plus_metrics` | Longitudinal flow with aligned metric panels |
| `clinical_triptych` | Longitudinal lines + forest plot + summary bars |
| `evidence_matrix` | Multiple evidence types for one claim in a grid |
| `asymmetric_mixed_modality` | Mixed modalities with unequal evidential weight |

Prefer one **hero panel** that carries the primary conclusion. Supporting panels answer narrower questions. Do not use equal-sized panels when the evidence is not equally important.

## Step 3 — Select chart type and profile

**Chart type by data shape:**

| Data shape | Chart type |
|---|---|
| Ordered sequence / time | `line`, `time_series`, `area` |
| Categories to compare | `bar`, `contribution` (waterfall/dumbbell) |
| Two continuous variables | `scatter`, `joint_scatter` |
| Matrix / pairwise | `heatmap`, `network_matrix`, `ablation_heatmap` |
| Sample distributions | `distribution` (use `layout: "auto"` — auto-selects box+strip for small n, ridge for many groups) |
| Effect estimates / intervals | `interval` |
| Training or optimization curves | `convergence` |
| Representative images | `image_plate` |
| Workflow / mechanism | `schematic` (supporting only, not hero in a data figure) |
| Multiple panel types | `composite` |
| Anything not covered above | `custom_python` |

**Profile (physical size — required on every spec):**

| Profile | Size | Use when |
|---|---|---|
| `report_a4.full_width` | 170 × 96 mm | Default A4 report |
| `report_a4.wide` | 180 × 100 mm | Wide A4 slot |
| `report_a4.half_width` | 82 × 62 mm | Two-column slot |
| `report_a4.compact` | 120 × 72 mm | Compact inset |
| `nature.single_column` | 89 × 65 mm | Journal single-column |
| `nature.double_column` | 183 × 110 mm | Journal double-column |

**Theme:**
- `business-cn` — default, CJK-ready serif, A4 reports
- `nature` — sans-serif, journal figures
- `energy` — energy/finance reports
- `minimal` — clean minimal

## Step 4 — Write the spec and build

Minimal valid spec:

```json
{
  "version": "0.1",
  "type": "bar",
  "profile": "report_a4.full_width",
  "contract": {
    "conclusion": "Method A reduces latency by 40% across all workloads.",
    "role": "comparison",
    "archetype": "quantitative_grid"
  },
  "data": {
    "series": [
      {"label": "Method A", "role": "ours", "values": [12, 18, 9]},
      {"label": "Baseline", "role": "baseline", "values": [20, 30, 15]}
    ],
    "categories": ["Light", "Medium", "Heavy"]
  }
}
```

Series `role` values: `ours` | `baseline` | `positive` | `negative` | `uncertainty` | `reference` | `context`

Validate first, then build:

```bash
chart-kit validate figure.json
chart-kit build figure.json --out outputs/figure-name --theme business-cn --format all
```

Read `outputs/figure-name/chart-quality.json`. Fix every warning. See `references/quality-loop.md`.

## Step 5 — Iterate until quality passes

Iterate until `quality.ok` is `true`. The most common fixes:

- Missing `contract` → add `contract` block (CKQ001)
- Missing `profile` → add `profile` (CKQ002)
- Missing series `role` → add `role` to each series (CKQ005)
- Small-sample violin → change to `layout: "auto"` (CKQ105)
- Red/green only coding → add labels or markers as second channel (CKQ108)

For composite figures, see `references/composite-grammar.md`.
For panel map guidance, see `references/information-architecture.md`.
For the full CKQ fix list, see `references/quality-loop.md`.

## Environment check

If fonts look wrong or renderers are missing:

```bash
chart-kit doctor
```

## Hard rules

- Do not write matplotlib code. Write a JSON spec.
- Every spec must have `profile` and `contract`.
- `data_figure` means axes and data marks dominate. Schematics support data — they do not replace it.
- No metric cards, PPT headlines, dashboard chrome, explanatory paragraphs inside panels, or bare `a` / `b` / `c` panel labels.
- Panel labels must be bottom-centered parenthesized: `(a)`, `(b)`, `(c)`.
- If two panels answer the same evidence question, merge them or replace one.
- Do not use rainbow colormaps (`jet`, `rainbow`).
- Custom scripts (`custom_python`) must still declare `contract`, `profile`, and pass the quality loop.
