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

Default posture: **single data figure first**. Do not jump to composite, schematic, dashboard,
or slide-like layouts unless the user explicitly needs multi-panel evidence and each panel answers
a different evidence question.

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
chart-kit atlas --role <role> --archetype <archetype>
```
The CLI returns ranked recommendations based on role and archetype.

Use the returned `example_cards` before writing a spec:

- `spec`: a maintained showcase JSON with the same chart family.
- `prompt`: the natural-language request that produced the example.
- `source_paths`: reproducible source data.
- `reference/*.png`: the visual target style; inspect it before writing your spec.
- `notes/*.md`: visual strategy, when to use the pattern, and what to avoid.

Do not start from a blank JSON unless no example card is relevant. Start from the nearest card,
then replace the contract and data with the current user's analysis.

Reference cards are visual examples only. Never copy their source rows, dates, labels, or values
into the user's figure. Load and use the current task's source CSV values.
When a reference card matches the user's evidence need, carry over its chart `type` and explicit
`layout`, but choose `profile` from the user's delivery slot. For standalone A4 report charts,
default to `report_a4.full_width` unless the user explicitly asks for a smaller slot such as a
half-width figure, compact inset, side-by-side report panel, or paper single-column figure.
Reference card profile is a visual clue only; it must not override the user's report slot.

Do not equate "clean" with "less information." Add information cues when they are earned by the
current data and claim: thresholds with business meaning, event windows, percentile markers,
computed group deltas, top movers, confidence bands, or sparse outlier labels. Avoid decorative
helper lines, labels, and arrows that do not come from the user's data or conclusion.

Keep display language consistent inside one figure. If the user's request, caption, or axis labels
are Chinese, translate ordinary categorical labels, legend labels, direct labels, and annotation
phrases into Chinese as well. If the figure is English, keep those display labels English. Do not
mix Chinese axis labels with English business categories merely because the source CSV column values
are English. Exceptions: official product names, model names, gene/protein symbols, SKUs, tickers,
codes, acronyms, units, dates, and source identifiers may remain unchanged. When official English
identifiers must remain inside a Chinese figure, declare that intent in the spec, for example:
`"language_policy": {"allow_mixed_display": true, "reason": "Product names are official identifiers"}`.
Internal English keys may remain in the spec for source binding, ordering, or lookup, but only when
they are not visible. If a chart uses internal category keys, either provide translated display
labels or explicitly hide those tick labels with `xAxis.show_labels: false` / `yAxis.show_labels:
false`; do not let raw keys leak into the rendered figure. When a series needs a stable internal
identifier, keep it in the source data or use `name` carefully, and set the visible `label` to the
language of the figure.

Use `data.insights` for computed, data-derived information cues instead of hand-writing values
into labels. This keeps the chart faithful when the user's data changes:

```json
{
  "data": {
    "insights": [
      {"kind": "mean_delta", "from": "Baseline", "to": "Ours", "label": "Mean shift", "format": "{:+.2f}"},
      {"kind": "top_mover", "label": "Largest lift", "format": "{:+.0%}"},
      {"kind": "endpoint_value", "mode": "max", "label": "Best final", "format": "{:.1%}"},
      {"kind": "percentiles", "series": "Ours", "probs": [0.25, 0.5, 0.75], "axis": "x"},
      {"kind": "threshold_crossing", "series": "Cumulative", "threshold": 0, "direction": "above", "label": "First positive"},
      {"kind": "extreme", "series": "Daily return", "mode": "min", "label": "Worst day"}
    ]
  }
}
```

Supported computed cues are generic: `mean_delta` / `group_delta`, `group_spread`,
`top_mover` (single-series category maximum, paired series delta, or endpoint change across series),
`endpoint_value` / `final_value` (highest or lowest final-stage value across series), `percentiles`,
`threshold_crossing`, and `extreme`. Use them only when they support the claim; do not use them
as decoration.

Do not bypass this by adding many manual `annotations` with fixed text values. A real data figure
usually has at most 1-3 earned callouts. If you need more, compute the strongest ones as
`data.insights`, use `data.events`/`data.intervals` for temporal evidence, or move explanation to
the report body. Do not list every possible computed insight: if more than a few cues are available,
keep the strongest 1-3 or add `priority` / `importance` so lower-value labels can be down-ranked.
ChartKit defaults to a sparse point-label budget because labels can easily cover the evidence.
When the claim genuinely needs more than one point callout, declare the budget explicitly and use
priorities instead of adding manual text:

```json
{
  "insight_layout": {"max_marks": 3, "max_point_labels": 2},
  "data": {
    "insights": [
      {"kind": "extreme", "series": "Daily return", "mode": "min", "label": "Worst day", "priority": 2},
      {"kind": "extreme", "series": "Daily return", "mode": "max", "label": "Best day", "priority": 1}
    ]
  }
}
```

Do not raise `max_point_labels` merely because more labels are available. Use it only when the
second or third label is part of the evidence hierarchy.

For a single-series categorical bar/ranking chart, `top_mover` marks the largest category value
by default. Use `mode: "min"` with wording such as "Largest reduction" when lower values are
better; do not label a negative trade-off as a "lift".

For ordered funnel/stage-decay lines, do not use `top_mover` to mean "best final conversion";
that would usually mark the largest drop from the start. Use `endpoint_value` with `mode: "max"`
for the highest terminal conversion, or rely on direct labels when the endpoint ordering is already clear.

For ordinary `scatter` charts, points are unordered. Do not use unpaired `top_mover` to mean
"highest point", "highest risk", "largest amount", or "top outlier"; it will describe endpoint
change in an arbitrary point order and fails QA. Use `extreme` with an explicit `series` and
`axis: "x"` or `axis: "y"` for max/min point labels, or use `mean_delta` when comparing paired
groups.

`extreme` is global by design. Do not use it to label a local incident dip, transition kink, or
window-specific event unless the global min/max is actually the evidence. For ordered `area` and
timestamped `time_series`, use `data.intervals` for shaded windows and `data.events` for sparse
event callouts:

```json
{
  "data": {
    "intervals": [{"start": "W15", "end": "W18", "label": "incident"}],
    "events": [{"at": "W16", "series": "Contribution", "label": "local dip"}]
  }
}
```

ChartKit automatically lanes guide labels, flips point-label direction near plot edges, reserves
extra range for insight callouts, limits excessive insight count, and QA-checks overlap/out-of-bounds
insight labels. It also checks whether insight labels cover key data evidence such as dense point
regions, trend lines, endpoints, or important bars. Prefer the automatic placement; only set `dx`,
`dy`, `x`, or `y` when a specific figure needs a deliberate override.

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

**Chart type by data shape. Choose the renderer from the data and evidence, not from business words:**

| Data shape | Chart type |
|---|---|
| Ordered sequence / time | `line`, `time_series`, `area` |
| Categories to compare | `bar`, `contribution` (waterfall/dumbbell) |
| Two continuous variables | `scatter`, `joint_scatter` |
| Effect size + p-value feature screen | `scatter` with `data.volcano` |
| Matrix / pairwise | `heatmap`, `network_matrix`, `ablation_heatmap` |
| Sample distributions | `distribution` with a deliberate layout: `box_strip`/`auto` for small samples, `ridge` for ordered many-group shifts, `raincloud` or plain `violin` for compact shape/tail/mode comparisons with raw observations; `full_violin` only when the complete symmetric silhouette itself is the evidence |
| Effect estimates / intervals | `interval` |
| Training or optimization curves | `convergence` |
| Representative images | `image_plate` |
| Workflow / mechanism | `schematic` (supporting only, not hero in a data figure) |
| Multiple panel types | `composite` |
| Anything not covered above | `custom_python` |

When the user or source fields signal composition or structure (`mix`, `composition`, `structure`,
`share`, `portfolio`, `product mix`, `销售结构`, `构成`, `占比`, product/category by region, or
two categorical dimensions plus a value/rate), first check whether the strongest evidence is a
share shift, category mix, or matrix difference. Prefer `bar` with `layout: "stacked_percent"`,
`area`, `heatmap`, or `mixed` for these cases. Do not collapse the data to a plain total
`time_series` unless the composition is clearly secondary to a time-trend claim.

Use `mixed` only when measures share an ordered x domain but have different units or materially
different scales. Use bar for discrete aggregates, area for background magnitude or cumulative
quantity, and line/step for rates, indices, states, or continuous measurements.
If the x field contains real dates, months, timestamps, or event windows (`date`, `month`,
`timestamp`, `time`, `week`, `year`), prefer `type: "time_series"` over generic `line`.
For `mixed` charts with a true time domain, put ISO dates/datetimes in `data.x`; the renderer will
use a real time axis with sparse, readable ticks. Do not invent short categorical labels for hourly
or daily timestamps just to avoid overlap.
For `time_series`, the x values must be ISO dates/datetimes in `data.timestamps`; do not use
`data.x`. Use `line` with `data.x` for ordinal checkpoints such as `W01`, `E1`, `Before/After`,
or ranked ordered observations that are not real dates.
For dense raw time series, do not pour the full sensor/hourly log into an A4 figure by default.
If the series has hundreds of timestamped observations across multiple days, first choose the
evidence view: aggregate summaries/bands, a typical period, or a representative anomaly/event
window. If raw density is intentionally kept, document it with `data.aggregation`,
`data.downsample`, or `data.representative_window`; otherwise CKQ112 will warn. When CKQ112
appears in `chart-quality.json`, read its `suggestions` array and apply one of the proposed
spec-level fixes such as `data.aggregation: "daily_mean_band"`,
`data.representative_window`, or documented `data.downsample`.
Use horizontal `bar` for ranked metric lift, Top-N categories, driver effects, or long labels; set
`data.invert_y: true` or `yAxis.invert: true` when the strongest or first-ranked item should read
from the top. For multi-metric benchmarks with heterogeneous units, prefer `radar` with
`layout: "profile_bar"` and add `metric_groups` when metrics form evidence blocks.
Use ordinary `scatter` for continuous relationships, agreement, cluster shift, thresholds, and
outliers. Cohort ellipses should be density cues, not decoration; tune `ellipse_scales` and
`ellipse_alpha` when the contours overpower the points. Use `scatter` with `data.volcano` only
when each point has both an effect size and a p-value and the claim depends on
effect/significance thresholds; when many points are auto-numbered, set `label_named_only: true`
and add `label` only to real named hits; use `label_top_per_side` when both up/down sides need
balanced labels. Do not add trend lines or cluster ellipses to volcano plots.
Use `network_matrix` with `data.layout: "bubble"` for pairwise interaction or adjacency matrices
when sparse strengths need area + color encoding. Add `mask_diagonal: true` when self-pairs are
not evidence, and keep thresholded weak cells visually subdued instead of equally prominent.
Use `contribution` with `layout: "waterfall"` only for sequential additive accounting from a start
value to an end value; use `label_mode: "delta"` when intermediate labels should show each step's
own contribution. For independent signed effects, use lollipop/dumbbell/interval/ranked
contribution instead of waterfall. For lollipop effect estimates, include `low`/`high` or `ci`
when the source provides uncertainty intervals.

For `distribution`, choose the layout deliberately:
- `layout: "box_strip"` when exact repeated observations, fold-level points, spread/overlap, and a compact summary box are the evidence. Use it explicitly for box-and-strip reference cards; do not replace it with a violin just because there are enough samples.
- `layout: "auto"` only when the user did not give a layout cue and the data size should decide.
- `layout: "ridge"` for several ordered groups where distribution shifts are the evidence; keep median ticks visible unless they distract from the density shape.
- `layout: "raincloud"` when a few groups need density shape, raw observations, and quartile structure together. This is the preferred report-grade default for shape/tail/mode comparisons because it avoids the bulky, decorative feel of full symmetric violins.
- For rainclouds with three or more named groups, let ChartKit use distinct muted group colors by default; use `data.color_mode: "semantic"` only when repeated neutral/reference colors are intentionally part of the evidence. Keep endpoints semantically clear (`baseline`/`ours`) and do not make every intermediate variant the same grey unless the comparison demands it.
- If the user asks for a "violin-style" compact distribution and also asks for median/quartiles/raw observations/tails/modes, choose `layout: "raincloud"` or plain `layout: "violin"`; ChartKit treats plain `violin` as a safe density request and renders `box_strip` for small samples or raincloud for dense groups.
- Use `layout: "full_violin"` only when the complete symmetric density silhouette itself is useful and each group has enough observations. Do not use full symmetric violins as a generic distribution default; they are an explicit opt-in for the rare case where the full silhouette is the evidence.
- Set `data.full_violin: true` or `data.violin_style: "full"` only when you intentionally want to override ChartKit's safe default and keep the complete symmetric silhouette.
Do not leave `layout: "auto"` when the matched reference card has an explicit layout anchor that fits the task.

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
- `nature` — Times New Roman + Songti/Noto Serif CJK, compact journal figures
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
    "archetype": "quantitative_grid",
    "evidence_hierarchy": {"hero": "latency comparison"},
    "statistics": [
      {"n_definition": "workloads", "center": "mean", "interval": "standard error"}
    ],
    "source_data": [{"path": "input.csv"}]
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

For `contract.source_data`, prefer an array of objects with `path`; `file` is accepted by the CLI
for compatibility, but `path` is the canonical field.
Do not put prose descriptions as separate `source_data` array items. Put descriptions in a
`note` or `description` field on the same object:

```json
{
  "contract": {
    "statistics": [
      {"n_definition": "42 days x 5 queues", "center": "daily total backlog", "interval": "not applicable"}
    ],
    "source_data": [
      {"path": "support-ticket-aging.csv", "note": "raw daily queue observations"}
    ]
  }
}
```

Do not write statistics as `{"field": "n", "value": "..."}` rows. Each `statistics` object should
describe one plotted evidence unit and include at least `n_definition`, `center`, and one of
`spread`, `interval`, or `test`.

When rendering a distribution from raw observations, you may bind directly to the CSV instead of
copying every observation into `data.series`. Use this only when the CSV rows are already the
observations to plot:

```json
{
  "type": "distribution",
  "layout": "raincloud",
  "data": {
    "source": "input.csv",
    "value_col": "score",
    "group_col": "arm",
    "group_order": ["Control", "Dose A", "Dose B"],
    "labels": {
      "Control": "对照组",
      "Dose A": "低剂量组",
      "Dose B": "高剂量组"
    }
  }
}
```

For vertical distribution layouts (`box_strip`, `violin`, `raincloud`), the x-axis is the group
or variant and the y-axis is the measured value. Put the value label in `yAxis.label` and the group
label in `xAxis.label`. For `hist` and `ridge`, the numeric value runs along the x-axis.

If the CSV has multiple rows per time/category/matrix cell and the chart needs aggregates, compute
the aggregate first and write `data.series`, `data.categories`, `data.values`, or the renderer's
normal in-spec data shape. Do not point `data.source` at an arbitrary CSV unless the renderer
documents that source binding shape.

Series `role` values: `ours` | `baseline` | `positive` | `negative` | `uncertainty` | `reference` | `context`

Never leave visible legend/direct-label names as placeholders such as `Series 1`, `Series 2`,
`Line A`, `S01`, `Model 1`, or `Group 1`. Derive display labels from the source columns or group
values, translate ordinary labels into the figure language, and hide raw/background/context series
with `show_legend: false` and `direct_label: false`.

Direct labels default to normal weight. Only `ours`, `proposed`, `highlight`, `focus`, `focused`,
`primary`, or explicit `label_weight` should be bold. Baseline/reference/context labels should not
all become bold.

Legend/direct-label protocol:
- For `line`, `time_series`, and `mixed`, use `legend: {"mode": "direct"}` when a few line-like series can be labeled at their endpoints. For `mixed`, individual line series can also set `direct_label: true`; the renderer keeps a compact encoding key for bars/lines when useful.
- For repeated-measures trajectories, do not make every subject a labeled series. Use `type: "line"` with `data.repeated_measures: true`; encode individual subjects as low-alpha `role: "context"` series with `show_legend: false`, and encode group means or model summaries as the few visible series with direct labels.
- For `scatter`, do not set `legend.position` to `direct_label` or `bottom`. Use `outside_right` for long legends, or let the compact outside legend collapse above the plot for short legends. If QA reports legend/data overlap on a dense scatter, increase `profile` to `report_a4.full_width` or reduce legend entries; do not guess unsupported legend positions.
- For a legend above the plot, use `position: "upper center"` with `bbox_to_anchor` and `ncol`; avoid lower-center legends inside the data region unless the plot is visibly empty there.
- If CKQ104 reports a legend/data overlap, read its `suggestions` array and apply the first suitable strategy: direct labels for a few line-like series, outside legend with reserved margin, hide raw/context/background legend entries, or a legend-only panel for composites.
- For horizontal ranked bars, let computed `top_mover`/`extreme` labels attach to the bar endpoint; do not manually add diagonal arrows unless there is a specific outlier story.
- For bubble matrices, keep the colorbar, group key, size key, and threshold note in the side legend. Write the threshold as one explanatory rule line such as `emphasize >= 0.25` or `突出 >= 0.25`; do not turn it into a fake legend symbol, short line, or separate "threshold" subsection. Do not put the threshold note under the main matrix when a side legend exists.

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
- Dense raw time axis → aggregate, choose a typical period/representative window, or document intentional downsampling (CKQ112)
- Placeholder series names → replace `Series 1` / `Line A` / `S01` with source-derived labels, or hide raw/context series (CKQ115)
- Too many manual text annotations → read CKQ116 `suggestions`; replace fixed labels with `data.insights`, move temporal cues to `data.events` / `data.intervals`, keep only 1-3 earned labels, or move narrative prose to `caption` / report body
- Too many computed insights → read CKQ117 `suggestions`; keep the strongest 1-3 cues, add `priority` / `importance`, demote secondary cues to `role: "context"`, or move temporal cues into `data.events` / `data.intervals`
- Small-sample or many-group `full_violin` → use `raincloud`, `box_strip`, or `auto`; keep `full_violin` only when the complete symmetric silhouette is the explicit evidence (CKQ105)
- Red/green only coding → add labels or markers as second channel (CKQ108)
- Legend overlaps data → apply CKQ104 `suggestions`: direct labels, outside legend, hide context entries, or a legend-only panel
- Insight label covers data evidence → let ChartKit auto-place it, move the callout outward, or remove a lower-value insight (CKQ110)

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
- Start from `chart-kit atlas` and nearby `example_cards`; do not make the LLM invent style from scratch.
- Example cards teach style and structure only; never copy example data into a user figure.
- `data_figure` means axes and data marks dominate. Schematics support data — they do not replace it.
- No metric cards, PPT headlines, dashboard chrome, explanatory paragraphs inside panels, or bare `a` / `b` / `c` panel labels.
  No metric cards means no KPI tiles, large numbers in boxes, workflow cards, or slide-deck summary strips inside the figure.
- Panel labels must be bottom-centered parenthesized: `(a)`, `(b)`, `(c)`.
- If two panels answer the same evidence question, merge them or replace one.
- Do not use rainbow colormaps (`jet`, `rainbow`).
- Custom scripts (`custom_python`) must still declare `contract`, `profile`, and pass the quality loop.

## Clean-context simulation

Use `examples/llm-simulation` to test whether this skill works in the real product setting:

```bash
chart-kit simulate list
chart-kit simulate report --out /tmp/chartkit-simulation-report.md
```

Each task gives a user request and source data only. Generate a new spec in a fresh context, then
score failures with `docs/llm-simulation-evaluation.md`.
