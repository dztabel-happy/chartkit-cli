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
