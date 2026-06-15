# ChartKit single-figure showcase

These examples are intentionally single data figures, not slide-like diagrams.
They are used to judge whether the default CLI output is polished enough for an
A4 report without hand-tuning every plot.

Every current showcase spec should use `profile: "report_a4.full_width"`.
That means the figure is designed for a standalone A4 report slot, but it does
not mean the exported visible image must be stretched to the full slot width.
ChartKit records both the slot and the natural rendered size in the manifest;
report systems should insert the figure at the recommended natural width and
only scale down when it would exceed the A4 slot.

The set should include both simple grammar checks and denser report-grade
figures. Simple examples prove the default encodings are stable; dense examples
show that ChartKit still looks polished when the data resembles a real analysis
rather than a toy dataset.

Each example is a few-shot pair for agents:

- `*.json` is the ChartKit spec.
- `source/*.csv` is the reproducible source data.
- `prompts/*.md` explains the user request, ChartKit choice, and failure modes.
- `reference/*.png` is the maintained reference render used for visual
  regression and few-shot image matching.
- `notes/*.md` explains visual strategy, when to use the pattern, and what to
  avoid.

The showcase is the LLM-facing teaching set. It should stay data-first and
single-figure: no schematic-only panels, no image plates, and no composite
layouts whose main lesson is page composition rather than chart selection.

The primary goal is flagship visual quality, not sheer chart-type count. A
showcase card should teach a reusable report-grade decision: which evidence the
chart carries, which visual marks should be quiet, which information cues are
worth adding, and which labels should stay out of the data region. If an example
only proves that a renderer can draw something, keep it in gallery or tests
rather than making it a first-choice few-shot card.

The current set is sized as a 6 x 4 contact sheet and covers the common
single-figure families that an analysis agent should reach for directly:
distribution (box-strip, histogram, ridge, raincloud), bar (grouped and percent
stacked), scatter, heatmap (correlation matrix and signed effect matrix),
interval, area, contribution (waterfall and lollipop ranking), profile-bar
benchmark, line and slopegraph, time series with events or uncertainty bands,
mixed dual-axis, ranked contribution, and network/bubble matrix.

Atlas recommendations expose these files as `example_cards`, so an agent can
look at the prompt, source data, spec, reference image, and design notes as one
teaching unit before producing a new chart.

## Route guide

Use this guide before opening individual cards. Pick the card whose evidence
question matches the user's data and claim, then inspect that card's prompt,
spec, source data, reference image, and notes together.

| Card | Use when the evidence question is... | Avoid when... |
| --- | --- | --- |
| `01-distribution-box-strip` | comparing group distributions with raw observations and summary spread | the task is a time series or only has aggregate means |
| `02-delta-bar-with-points` | ranking metric deltas while showing replicate or cohort-level support | the main evidence is part-to-whole composition |
| `03-clustered-scatter` | showing a dense relationship with groups, fit, and natural cluster shape | thresholds or quadrants are the story |
| `04-correlation-heatmap` | reading block structure in a symmetric correlation matrix | the matrix is directional or sparse interaction evidence |
| `05-forest-interval` | comparing effect estimates with uncertainty intervals around a baseline | rows are sequential contributions to one total |
| `06-area-trajectory` | showing cumulative or contribution trajectory with meaningful event windows | values are independent categories rather than ordered periods |
| `07-benchmark-score-bars` | comparing grouped benchmark scores with visible replicate evidence | component shares or signed effects are the claim |
| `08-ridge-distribution` | comparing several ordered distribution densities compactly | exact individual points or small sample sizes matter most |
| `09-signed-effect-heatmap` | comparing signed effects across two categorical dimensions | exact interval uncertainty is required per row |
| `10-line-validation-trajectory` | showing a few validation trajectories across ordered checkpoints | there are exactly two states, where slopegraph is clearer |
| `11-mixed-dual-axis` | combining different units or scales on a shared ordered domain | the series share one unit and can use one axis |
| `12-distribution-histogram` | comparing residual or score densities against a reference such as zero | many cohorts need separate distribution lanes |
| `13-ranked-contribution-pareto` | ranking many ordered contributions with a cumulative share or tail claim | rows are independent signed effects with intervals |
| `14-volcano-scatter` | screening many entities by effect size and significance thresholds | the user needs grouped distribution comparison |
| `15-bubble-matrix` | encoding sparse pairwise interaction strength with group structure | every cell value must be read as a table |
| `16-stacked-area-composition` | showing how composition changes over ordered windows | categories are unordered cohorts |
| `17-contribution-waterfall` | explaining sequential additive contributions from base to final value | drivers are independent estimates rather than a bridge |
| `18-profile-benchmark` | comparing several methods across heterogeneous normalized metrics | one or two headline metrics are sufficient |
| `19-time-series-events` | showing time-series behavior with event windows or milestones | the x-axis is not temporal or ordered |
| `20-distribution-violin` | showing rich group distributions with density, box, and raw points | there are only aggregate values per group |
| `21-bar-percent-stack` | comparing normalized part-to-whole composition across cohorts | absolute totals are more important than shares |
| `22-contribution-lollipop-ranking` | ranking independent signed effects with uncertainty around zero | the values form a cumulative waterfall |
| `23-line-slopegraph` | comparing before-after movement across cohorts with endpoint labels | there are more than two meaningful periods |
| `24-time-series-error-band` | showing forecast/observed trajectories with uncertainty bands | uncertainty is absent or unrelated to the claim |
