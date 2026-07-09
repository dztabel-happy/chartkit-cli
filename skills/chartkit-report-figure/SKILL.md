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

Before choosing a chart family, make a quick evidence inventory:

- List the meaningful measures in the source data and classify them as magnitude, rate, share,
  uncertainty, distribution, relationship, or event/context.
- Identify the primary decision metric and any secondary metric that materially changes the
  interpretation. Do not discard fields such as target, margin, burn, conversion, wait time,
  or risk merely because one showcase card can plot the first numeric column.
- Compare the strongest evidence questions: absolute trend, plan-vs-actual gap, share shift,
  efficiency/rate, ranked driver, matrix relationship, or distribution. Choose the one that best
  answers the user's likely decision, not the one that is easiest to render.
- If useful fields are intentionally not shown, make that explicit in the `contract.conclusion`
  or caption by narrowing the claim. A single data figure can focus, but it should not pretend
  unexplored metrics were analyzed.

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

Reference files and task data should be read from the current working directory, typically
`./examples`, `./task.md`, and the CSV path in the task. Do not run broad filesystem searches
such as `find /` to locate ChartKit examples; if a referenced local file is missing, continue
from the atlas output and the files already present in the workspace.

Do not start from a blank JSON unless no example card is relevant. Start from the nearest card,
then replace the contract and data with the current user's analysis.

Atlas is a retrieval aid, not a decision substitute. Do not automatically use the first card if
the data contains a stronger evidence question. For example, a monthly channel CSV with revenue,
target, margin, and burn can justify a mixed plan-vs-efficiency figure, a contribution/ranking
figure, or a composition figure depending on the claim. Pick the card whose visual grammar matches
the selected evidence question after the inventory above.

Reference cards are visual examples only. Never copy their source rows, dates, labels, or values
into the user's figure. Load and use the current task's source CSV values.
When a reference card matches the user's evidence need, carry over its chart `type` and explicit
`layout`, but choose `profile` from the user's delivery slot. For standalone A4 report charts,
default to `report_a4.full_width` unless the user explicitly asks for a smaller slot such as a
compact inset or paper single-column figure. Side-by-side report panels belong in the report
layout layer, not in a standalone ChartKit profile.
Reference card profile is a visual clue only; it must not override the user's report slot.
Words such as "right-side chart", "left panel", "half-column", "side-by-side", "will be placed
beside another chart", or "ReportKit will arrange it later" describe the report layout, not the
ChartKit physical profile. Generate the requested standalone chart as `report_a4.full_width`.
Use `report_a4.compact` only when the user explicitly says small inset, page-margin figure,
thumbnail, sparkline, or compact slot.
`examples/showcase` cards teach full-width A4 standalone figures. Do not create a
side-by-side exhibit by simply shrinking a standalone showcase card. Those layouts
need paired evidence design, shared headings, restrained labels, and often a shared legend or
caption rhythm outside the individual chart.

Do not equate "clean" with "less information." Add information cues when they are earned by the
current data and claim: thresholds with business meaning, event windows, percentile markers,
computed group deltas, top movers, confidence bands, or sparse outlier labels. Avoid decorative
helper lines, labels, and arrows that do not come from the user's data or conclusion.

Keep display language consistent inside one figure. If the user's request, caption, or axis labels
are Chinese, translate ordinary categorical labels, legend labels, direct labels, annotation
phrases, ordinary English phrases inside captions, and report-facing contract phrases into Chinese
as well. If the figure is English, keep those display labels English. Do not mix Chinese axis
labels with English business categories, or write captions/contract notes such as
`Critical/High 级别` or `calibration curve`, merely because the source CSV column values are
English. Exceptions: official product names, model names, gene/protein symbols, SKUs, tickers,
codes, acronyms, units, dates, and source identifiers may remain unchanged. `allow_mixed_display`
is not a blanket escape hatch. When official English identifiers must remain inside a Chinese
figure, list the exact display terms, for example:
`"language_policy": {"allow_mixed_display": true, "official_terms": ["T cell", "AAPL"], "reason": "Official identifiers"}`.
Translate ordinary business metrics such as `Burn Multiple`, `Burn`, `Churn`, `conversion rate`,
`interaction score`, or `gross margin` into the figure language instead of declaring them official.
When CKQ111 appears in `chart-quality.json`, read its `suggestions`: translate the listed visible
labels, declare exact official identifiers only when the English strings are immutable, or hide/replace
internal keys that should not be displayed.
Internal English keys may remain in the spec for source binding, ordering, or lookup, but only when
they are not visible. For series, treat `name` as a stable lookup key and `label` / `display_name`
as the visible text; ChartKit displays `label` before `name`, and computed insights can still refer
to either. If a chart uses internal category keys, either provide translated display labels or
explicitly hide those tick labels with `xAxis.show_labels: false` / `yAxis.show_labels: false`; do
not let raw keys leak into the rendered figure.

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

The key location is part of the contract: computed cues must be nested under `data.insights`.
Do not write top-level `insights`, `data_insights`, or a literal `"data.insights"` key. Those
misplaced keys are ignored by renderers and CKQ118 will ask you to move them under `data`.

Supported computed cues are generic: `mean_delta` / `group_delta`, `group_spread`,
`top_mover` (single-series category maximum, paired series delta, or endpoint change across series),
`endpoint_value` / `final_value` (highest or lowest final-stage value across series), `percentiles`,
`threshold_crossing`, and `extreme`. Use them only when they support the claim; do not use them
as decoration.

Do not bypass this by adding many manual `annotations` with fixed text values. A real data figure
usually has at most 1-3 earned callouts. If you need more, compute the strongest ones as
`data.insights`, use `data.events`/`data.intervals` for temporal evidence, or move explanation to
the report body. ChartKit auto-caps rendered computed insights by evidence priority, so it is safe
to provide several candidate insights as metadata, but only the strongest few should become visible.
Add `importance` when the visual hierarchy matters. Prefer named importance levels for LLM-authored
specs because they are unambiguous: `claim_critical` > `supporting` > `context`. Use `rank` only
when you mean ordinal order where `rank: 1` is first/highest priority. `priority` is a numeric score
where larger values are stronger; avoid small sequences such as `priority: 1` / `priority: 2` unless
you intentionally mean 2 is stronger than 1. ChartKit defaults to a sparse point-label budget because
labels can easily cover the evidence.
When the claim genuinely needs more than one point callout, declare the budget explicitly and use
importance/rank instead of adding manual text:

```json
{
  "insight_layout": {"max_marks": 3, "max_point_labels": 2},
  "data": {
    "insights": [
      {"kind": "extreme", "series": "Daily return", "mode": "min", "label": "Worst day", "importance": "claim_critical"},
      {"kind": "extreme", "series": "Daily return", "mode": "max", "label": "Best day", "importance": "supporting"}
    ]
  }
}
```

Do not raise `max_point_labels` merely because more labels are available. Use it only when the
second or third label is part of the evidence hierarchy.
If you already have an ordered insight list and `1` means the most important item, write `rank: 1`,
`rank: 2`, etc. Do not encode that as `priority: 1`, `priority: 2`; CKQ125 will warn because
ChartKit treats larger numeric priority as stronger.

For a single-series categorical bar/ranking chart, `top_mover` marks the largest category value
by default. Use `mode: "min"` with wording such as "Largest reduction" when lower values are
better; do not label a negative trade-off as a "lift".
For grouped/multi-series categorical bars, an unpaired `top_mover` is treated as a categorical
maximum/minimum across the displayed bars. If the claim is about change between two series,
write `from` and `to` explicitly; otherwise use `extreme` or unpaired `top_mover` for labels
such as "longest wait", "highest cost", or "lowest score".

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

The archetype describes the *evidence*, not a single frame. ChartKit renders **one
figure per evidence unit**. When several evidence types support a claim
(`asymmetric_evidence`, `evidence_matrix`, `clinical_triptych`, …), produce
**separate figures** and let the report place them — there is no asymmetric
hero/supporting composite. The only built-in multi-panel figure is the uniform
**small-multiples composite**: the *same* chart repeated across facets (months,
cohorts, sites), used when one comparison axis (`quantitative_grid`) is best shown
faceted. See `references/composite-grammar.md`.

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
| Same chart repeated across facets (months, cohorts, sites) | `composite` (small multiples) |
| Several *different* evidence types | separate figures — not one composite |
| Anything not covered above | `custom_python` |

Do not treat two numeric columns as an automatic scatter plot. First preserve time, process,
matrix, composition, or category structure when that structure carries the evidence; use `scatter`
when the relationship, threshold, calibration, agreement, density, or outlier pattern is the claim.

When the user or source fields signal composition or structure (`mix`, `composition`, `structure`,
`share`, `portfolio`, `product mix`, `销售结构`, `构成`, `占比`, product/category by region, or
two categorical dimensions plus a value/rate), first check whether the strongest evidence is a
share shift, category mix, or matrix difference. Prefer `bar` with `layout: "stacked_percent"`,
`area`, `heatmap`, or `mixed` for these cases. Do not collapse the data to a plain total
`time_series` unless the composition is clearly secondary to a time-trend claim.

Use `mixed` only when measures share an ordered x domain but have different units or materially
different scales. Use bar for discrete aggregates, area for background magnitude or cumulative
quantity, and line/step for rates, indices, states, or continuous measurements.
For mixed thresholds or baselines, use `data.reference_lines`; set `axis: "right"` for a right-axis
threshold instead of adding a fake constant series.
Never write `data_reference_lines`, top-level `reference_lines`, or other invented reference-line
fields. Reference/threshold lines always live under the `data` object as `data.reference_lines`.
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
Do not collapse minute/hourly source logs into a categorical `bar` just because the source can be
aggregated. If temporal shape is part of the evidence, preserve it with `time_series`, `mixed`,
`area`, or a time-by-category heatmap. If the user truly wants a period/category summary bar, make
the decision explicit with `data.allow_temporal_collapse: true` and a machine-readable
`data.aggregation` such as `period_mean_by_group`; otherwise CKQ123 will ask you to preserve the
temporal shape or document the collapse.
For dense forest/interval charts, avoid turning the figure into a long table. If an interval spec
has dozens of rows, keep only the claim-carrying top/bottom rows, switch many-entity comparisons
to heatmap/bubble matrix/profile/ranked-bar forms, or split by group. CKQ119 will warn when a
forest interval is too dense for a standalone A4 report figure.
Use horizontal `bar` for ranked metric lift, Top-N categories, driver effects, or long labels; set
`data.invert_y: true` or `yAxis.invert: true` when the strongest or first-ranked item should read
from the top. For multi-metric benchmarks with heterogeneous units, prefer `radar` with
`layout: "profile_bar"` and add `metric_groups` when metrics form evidence blocks.
For bar uncertainty, use `series[].error` / `sem` / `yerr` for symmetric error bars. Use
`series[].error_lower` / `error_upper` for asymmetric intervals or one-sided upper evidence
such as median bars with P90 upper bounds; if only the upper bound matters, provide
`error_upper` and omit `error_lower`. Do not claim P90 / confidence upper bounds in the caption
unless the spec provides fields the renderer can draw.
Use ordinary `scatter` for continuous relationships, agreement, cluster shift, thresholds, and
outliers. Cohort ellipses should be density cues, not decoration; tune `ellipse_scales` and
`ellipse_alpha` when the contours overpower the points. Use `scatter` with `data.volcano` only
when each point has both an effect size and a p-value and the claim depends on
effect/significance thresholds; when many points are auto-numbered, set `label_named_only: true`
and add `label` only to real named hits; use `label_top_per_side` when both up/down sides need
balanced labels. Do not add trend lines or cluster ellipses to volcano plots.
Do not create six or more scatter series merely to expose every source-target relationship in the
legend. That produces a fragmented side key, especially in compact `nature` figures. Collapse
small relationship classes into a few semantic groups, hide context series from the legend, or use
`network_matrix` / `heatmap` when pairwise structure is the evidence. Only set
`legend.allow_fragmented: true` when every entry is decision-relevant and the profile has room.
For ordered agreement/calibration curves (for example predicted probability vs observed rate by
decile or cohort), `scatter` series may set `connect: true`; ordinary unordered scatter points
should not be connected. For a visual reference line encoded as a series, set `marker: false`,
`connect: true`, and `linestyle: "--"`. If you want the renderer to compute the diagonal from the
axis range, use `data.reference_lines: [{"slope": 1, "intercept": 0, "label": "Perfect calibration",
"style": "--", "show_legend": false}]`.
For `line` and `time_series` uncertainty bands, use `series[].sem` or `series[].band` for half-width bands around
`values`; use `series[].low` plus `series[].high` for absolute lower/upper bounds. Do not claim a
confidence or prediction band in the caption or insight text unless the series includes one of
those interval encodings.
For horizontal thresholds, benchmarks, or target lines in `line`, use
`data.reference_lines: [{"intercept": value, "label": "...", "style": "--"}]` (aliases `value` and
`y` are also accepted). Plain `line` reference lines are horizontal only; use `scatter` reference
lines or an explicit series for diagonal/model lines.
Use `network_matrix` with `data.layout: "bubble"` for pairwise interaction or adjacency matrices
when sparse strengths need area + color encoding. Add `mask_diagonal: true` when self-pairs are
not evidence, and keep thresholded weak cells visually subdued instead of equally prominent.
When `nodes[].group` uses internal English keys in a Chinese/localized figure, keep those keys for
binding but add `data.group_labels` or `groups: {key: {color, label}}` so the side legend displays
localized group names rather than raw source keys.
Use `contribution` with `layout: "waterfall"` only for sequential additive accounting from a start
value to an end value; use `label_mode: "delta"` when intermediate labels should show each step's
own contribution. For independent signed effects, use lollipop/dumbbell/interval/ranked
contribution instead of waterfall. For lollipop effect estimates, include `low`/`high` or `ci`
when the source provides uncertainty intervals.
For `ranked_contribution`, use `data.source` with `label_col` and `value_col` whenever the source
contains observation-level rows (for example days, transactions, cohorts, or SKUs). Do not inline
hundreds of `data.items`; inline items are only for short hand-written examples. `label_col` is the
row label used for extremes/ticks, and `value_col` is the signed contribution being sorted.

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
| `report_a4.compact` | 120 × 72 mm | Explicit compact inset / small figure slot only |
| `nature.single_column` | 89 × 65 mm | Journal single-column |
| `nature.double_column` | 183 × 110 mm | Journal double-column |

Side-by-side report exhibits belong in the report layout layer. Do not model
them as one narrow standalone ChartKit figure.
If the user asks for "the right chart" or "one side of a later side-by-side report page", still use
`report_a4.full_width` for the ChartKit output unless they explicitly say it is a small inset.

**Theme:**
- `business-cn` — default, CJK-ready serif, A4 reports
- `nature` — Times New Roman + Songti/Noto Serif CJK, compact journal figures
- `energy` — legacy energy-domain palette (prefer `business-cn` for new figures)
- `minimal` — legacy minimal palette (prefer `business-cn` for new figures)

`profile` controls the physical output slot only. It does not switch themes. Theme is selected at
runtime with CLI `--theme`; do not put `"theme"`, `"theme_id"`, or `style.theme` inside
`figure.json`. The same spec should be able to render under `business-cn` or `nature` without
editing the data contract.

For compact bubble matrices, color and bubble size both encode interaction strength by default.
ChartKit suppresses the redundant size legend in compact profiles unless `force_size_legend: true`
is set; prefer keeping the colorbar and a small group key instead of stacking multiple side
legends into an 82 mm panel.

**Axis value formatting:**
If the plotted values are ratios/proportions but the reader should see percentages, set
`xAxis.format`, `yAxis.format` (and `y2Axis.format` for right-axis mixed charts) to `.0%`,
`.1%`, or `{:.1%}`.
Do not rely on a label such as `rate (%)` while leaving tick labels as decimals like `0.08`.
For already-percent values such as `85.1`, keep the axis label as `(%)` and do not use percent
formatting, otherwise the ticks will read as `8510%`.

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

Prefer source binding over copying long raw arrays into the JSON spec when the renderer supports
the user's data shape. The spec should describe column names, visual roles, labels, and insights;
the CSV should remain the reproducible data source. This keeps figures rerenderable when the data
changes and avoids huge, brittle `figure.json` files. Use inline `data.series` only when you have
computed a true aggregate or transformed table that the renderer cannot derive from the source.

Supported source-binding patterns:

- `distribution`: raw observation rows with `value_col` and optional `group_col`.
- `scatter`: paired continuous observations with `x_col`, `y_col`, and optional `group_col`.
- `time_series`: timestamped rows with `timestamp_col`, `value_col`, and optional `group_col`.
- `heatmap`: wide matrix CSV with `row_col` and optional `value_cols`; numeric columns become
  matrix columns in CSV order when `value_cols` is omitted.

When rendering a distribution from raw observations, bind directly to the CSV instead of copying
every observation into `data.series` when the CSV rows are already the observations to plot:

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

If you need semantic colors or roles for source-bound groups, keep `data.source` and add a
style-only `data.series` skeleton. Do not copy values/points into the skeleton. This style-only
skeleton works for `distribution`, `scatter`, and `time_series` source binding:

```json
{
  "data": {
    "source": "input.csv",
    "value_col": "score",
    "group_col": "arm",
    "group_order": ["Control", "Dose A", "Dose B"],
    "series": [
      {"name": "Control", "role": "baseline"},
      {"name": "Dose B", "role": "ours", "color": "#315B7D"}
    ]
  }
}
```

For scatter source binding, use:

```json
{
  "type": "scatter",
  "data": {
    "source": "observations.csv",
    "x_col": "model_score",
    "y_col": "observed_outcome",
    "group_col": "cohort",
    "group_order": ["Baseline", "Ours"],
    "series": [
      {"name": "Baseline", "role": "baseline"},
      {"name": "Ours", "role": "ours"}
    ]
  }
}
```

For heatmap source binding, use a wide matrix CSV instead of copying every cell into `values`:

```json
{
  "type": "heatmap",
  "data": {
    "source": "matrix.csv",
    "row_col": "cohort",
    "value_cols": ["calib", "recall", "precision", "auc"],
    "label": "Delta score",
    "colormap": "RdBu_r",
    "symmetric": true
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

Series `role` values: `ours` | `baseline` | `positive` | `negative` | `uncertainty` | `reference` | `context` | `background`

Never leave visible legend/direct-label names as placeholders such as `Series 1`, `Series 2`,
`Line A`, `S01`, `Model 1`, or `Group 1`. Derive display labels from the source columns or group
values, translate ordinary labels into the figure language, and hide raw/background/context series
that should not be decoded with `show_legend: false` and `direct_label: false`.

Direct labels default to normal weight. Only `ours`, `proposed`, `highlight`, `focus`, `focused`,
`primary`, or explicit `label_weight` should be bold. Baseline/reference/context labels should not
all become bold.

Legend/direct-label protocol:
- For `line`, `time_series`, and `mixed`, use `legend: {"mode": "direct"}` when a few line-like series can be labeled at their endpoints. For `mixed`, individual line series can also set `direct_label: true`; the renderer keeps a compact encoding key for bars/lines when useful.
- For slopegraphs with more than a few endpoint-labeled cohorts on both sides, use `profile: "report_a4.full_width"` unless the user explicitly asks for a compact inset. Compact slopegraphs are only suitable for a few short labels; otherwise side labels consume the width and make the Before/After movement feel squeezed.
- For repeated-measures trajectories or background comparison lines, do not make every subject or raw trace a labeled series. Use `role: "background"` (or raw/shadow/subject-style roles) with low alpha / thin linewidth for background evidence; ChartKit hides these roles from legend/direct labels by default. Use `role: "context"` for a small number of secondary business groups that still need to be decoded; ChartKit may label human-readable context series by default. If a context series is truly background, either use `role: "background"` or explicitly set `show_legend: false` and `direct_label: false`.
- For grouped `bar` charts with four or more visible series, do not place the legend as a wide strip over the plotting area. Omit `legend.position` and let ChartKit default to a right-side legend, or set `legend: {"position": "outside_right", "frameon": false}` explicitly.
- For `scatter`, do not set `legend.position` to `direct_label` or `bottom`. Use `outside_right` for long legends, or let the compact outside legend collapse above the plot for short legends. For a few connected calibration/agreement series, either use `legend: {"mode": "direct"}` or set per-series `direct_label: true`; do not add duplicate endpoint insight labels unless they add new evidence. If QA reports legend/data overlap on a dense scatter, increase `profile` to `report_a4.full_width` or reduce legend entries; do not guess unsupported legend positions.
- For a legend above the plot, use `position: "upper center"` with `bbox_to_anchor` and let ChartKit choose the column count from the available width. Do not set `legend.ncol` by copying a showcase card; only set it when the user explicitly asks for a fixed multi-row legend. If a top legend has enough room, ChartKit should keep it on one row; if it does not, it will wrap.
- If CKQ104 reports a legend/data overlap, read its `suggestions` array and apply the first suitable strategy: direct labels for a few line-like series, an outside legend with reserved margin, or hiding raw/context/background legend entries.
- For horizontal ranked bars, let computed `top_mover`/`extreme` labels attach to the bar endpoint; do not manually add diagonal arrows unless there is a specific outlier story.
- For bubble matrices, keep the colorbar, group key, size key, and threshold note in the side legend. Write the threshold as one explanatory rule line such as `emphasize >= 0.25` or `突出 >= 0.25`; do not turn it into a fake legend symbol, short line, or separate "threshold" subsection. Do not put the threshold note under the main matrix when a side legend exists.
- For bubble matrix group legends, never expose internal group keys such as `acute`, `stromal`, or `diagnostic` as display labels in a localized report. Add `data.group_labels` or `groups: {key: {color, label}}` instead of renaming the binding keys.

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
- Theme embedded in spec → remove `theme` / `style.theme` and pass the selected visual contract with CLI `--theme` (CKQ121)
- Dense x tick labels → read CKQ103 `suggestions`; use sparse ticks, aggregate/group categories, choose a representative window, or move to a wider profile before rotating labels by habit
- Dense raw time axis → aggregate, choose a typical period/representative window, or document intentional downsampling (CKQ112)
- High-frequency source collapsed to categorical bar → preserve temporal shape, or explicitly set `data.allow_temporal_collapse: true` with `data.aggregation` when a summary bar is intended (CKQ123)
- Dense forest interval → keep top rows, use matrix/profile/ranked-bar forms, or split into grouped panels (CKQ119)
- Placeholder series names → replace `Series 1` / `Line A` / `S01` with source-derived labels, or hide raw/context series (CKQ115)
- Too many manual text annotations → read CKQ116 `suggestions`; replace fixed labels with `data.insights`, move temporal cues to `data.events` / `data.intervals`, keep only 1-3 earned labels, or move narrative prose to `caption` / report body
- Too many computed insights → CKQ117 is informational: ChartKit auto-caps visible cues; add named `importance`, use `rank` when 1 means first, demote secondary cues to `role: "context"`, or move temporal cues into `data.events` / `data.intervals` when the chosen visible cues are not the right ones
- Misplaced computed insights → move top-level `insights`, `data_insights`, or literal `"data.insights"` keys into `data.insights`; otherwise the renderer cannot compute or place them
- Unknown `data_reference_lines` or top-level `reference_lines` schema error → move the threshold/baseline rule into `data.reference_lines`; do not delete meaningful reference evidence unless the figure no longer needs it
- Invalid reference-line style → use `--`, `:`, `-.`, `solid`, `dashed`, `dashdot`, or `dotted`; keep semantics in label/role, not custom style text (CKQ122)
- Small-sample or many-group `full_violin` → use `raincloud`, `box_strip`, or `auto`; keep `full_violin` only when the complete symmetric silhouette is the explicit evidence (CKQ105)
- Red/green only coding → add labels or markers as second channel (CKQ108)
- Mixed display language → read CKQ111 `suggestions`; translate listed visible labels, declare exact `official_terms` only for immutable identifiers, or hide internal keys
- Legend overlaps data → apply CKQ104 `suggestions`: direct labels, outside legend, or hide context entries
- Fragmented scatter legend → reduce relationship groups, hide context legend entries, or switch pairwise evidence to network_matrix/heatmap (CKQ124)
- Rank-like computed insight priority → use `rank` when 1 means first, use named `importance`, or use larger numeric priority scores such as 100/60/20 (CKQ125)
- Insight label covers data evidence → let ChartKit auto-place it, move the callout outward, or remove a lower-value insight (CKQ110)

For composite figures, see `references/composite-grammar.md`.
For panel map guidance, see `references/information-architecture.md`.
For the full CKQ fix list, see `references/quality-loop.md`.

## Step 6 — Hand off the figure

ChartKit's deliverable is exactly two things: **one image file** (PNG/SVG/PDF/TIFF)
and **one caption line**. Nothing else.

- **Boundary.** ChartKit owns everything *inside* the image rectangle (data →
  pixels). A report tool such as DocxKit or ReportKit owns everything *outside* it:
  placement, figure numbering, the `图N` / `Figure N` caption label, cross-references,
  and the table of contents. Do not bake a figure number, "Figure 1:" prefix, or
  surrounding prose into the plotted area — that belongs to the document.
- **Handoff.** Render into the report's asset directory (e.g. `assets/`) and give the
  document tool the image path plus the caption string. The caption lives in
  `spec.caption` and is emitted outside the data area, so it travels as text the
  document can number and place.
- **Zero coupling.** Composition happens at the file-system / agent layer. ChartKit
  does not import or call DocxKit, and DocxKit does not call ChartKit; they meet only
  at `image file + caption`. See `docs/chartkit-docxkit-boundary.md`.

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
- Panel labels (for custom multi-panel figures) must be bottom-centered parenthesized: `(a)`, `(b)`, `(c)`. Small-multiples cells are labelled by their facet (e.g. the month), not `(a)`/`(b)`.
- Small-multiples composites repeat the *same* chart across facets; keep each cell sparse and share the scale (see the `CKC0xx` composition gate). For different evidence types, use separate figures.
- Do not use rainbow colormaps (`jet`, `rainbow`).
- Custom scripts (`custom_python`) must still declare `contract`, `profile`, and pass the quality loop.
