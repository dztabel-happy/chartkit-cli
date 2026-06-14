# ChartKit

ChartKit renders declarative chart specs into polished report-grade figures.

It is designed for LLMs and agents at the final visualization step: the agent prepares the data and chart intent, writes `figure.json`, then calls `chart-kit` to produce stable SVG/PDF/PNG/TIFF artifacts.

## Install

```bash
# macOS Apple Silicon
npm install -g @dztabel/chartkit @dztabel/chartkit-darwin-arm64

# Linux x64
npm install -g @dztabel/chartkit @dztabel/chartkit-linux-x64

# Windows x64
npm install -g @dztabel/chartkit @dztabel/chartkit-win32-x64
```

The canonical command is `chart-kit`. `chartkit` is also provided as a compatibility alias.

Check the command:

```bash
chart-kit --version
```

## Quick Start

Create `figure.json`:

```json
{
  "version": "0.1",
  "type": "line",
  "profile": "report_a4.full_width",
  "contract": {
    "conclusion": "Product A keeps a stronger revenue trend than Product B.",
    "role": "trend",
    "archetype": "quantitative_grid",
    "panel_map": {
      "main": "Monthly revenue trend comparison"
    }
  },
  "data": {
    "x": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "series": [
      {"name": "Product A", "role": "ours", "values": [120, 150, 180, 160, 200, 220]},
      {"name": "Product B", "role": "baseline", "values": [80, 90, 110, 100, 130, 140], "style": "dashed"}
    ]
  },
  "xAxis": {"label": "Month"},
  "yAxis": {"label": "Revenue"}
}
```

Validate and build:

```bash
chart-kit validate figure.json --theme business-cn
chart-kit build figure.json --out ./chart-output --theme business-cn --format all
```

Output files:

```text
chart-output/chart.svg
chart-output/chart.pdf
chart-output/chart.png
chart-output/chart.tiff
chart-output/chart-quality.json
chart-output/chart-manifest.json
chart-output/build-result.json
```

## A4 Report Sizing

For standalone business-report figures, use `profile: "report_a4.full_width"` by default.
This profile is a report slot and typography contract, not a command to stretch every chart
to the same final width.

ChartKit exports a tight visible figure with stable physical dimensions and records the sizing
contract in `chart-manifest.json` and `build-result.json`:

```json
{
  "layout": {
    "slot_width_mm": 170,
    "slot_height_mm": 96,
    "rendered_width_mm": 148.1,
    "rendered_height_mm": 79.5,
    "recommended_insert_width_mm": 148.1,
    "recommended_insert_height_mm": 79.5,
    "max_insert_width_mm": 170,
    "max_insert_height_mm": 96,
    "scale_policy": "natural_size_within_slot",
    "scale_factor": 1
  }
}
```

Report systems should insert ChartKit figures at `recommended_insert_width_mm` when that metadata
is available. They should not enlarge every figure to `slot_width_mm`; enlarging changes font size,
line weight, marker size, and the visual density that ChartKit designed for the report.

Use the slot limit only as a maximum: figures may be scaled down if they exceed the A4 report slot,
but should otherwise be inserted at their natural rendered physical size.

## Chart Types

Built-in single-chart types include:

- `line` / `time_series`
- `bar`
- `scatter`
- `heatmap` / `network_matrix`
- `distribution`
- `interval`
- `area`
- `contribution`
- `radar`
- `image_plate`
- `schematic`

`composite` supports report/paper-style multi-panel figures. `custom_python` and `custom_r` are trusted local-script escape hatches when a built-in renderer would reduce quality.

## Agent Usage

Use the bundled skill at `skills/codex/chartkit-report-figure` so agents follow the intended loop:

```bash
chart-kit validate figure.json --theme business-cn
chart-kit build figure.json --out outputs/figure-name --theme business-cn --format all
```

The agent must inspect `chart-quality.json` and iterate until `quality.ok` is true unless the user accepts a known tradeoff.

## Showcase

The npm package includes a few-shot showcase library at `examples/showcase`. This is a single-figure
A4 report showcase: the cards teach agents how to choose a polished standalone data figure for a
report, not how to create dashboards, slides, or multi-panel paper composites.

Each card has a rendered reference image, the matching declarative spec, source data, prompt, and
notes. Agents can inspect it through `chart-kit atlas` and use these examples as the visual standard
before writing a new `figure.json`.

| | | |
|---|---|---|
| ![01 distribution box strip](examples/showcase/reference/01-distribution-box-strip.png)<br>**01 distribution box-strip**<br>`distribution` · box + raw samples | ![02 delta bar with points](examples/showcase/reference/02-delta-bar-with-points.png)<br>**02 delta bar with points**<br>`bar` · benchmark deltas | ![03 clustered scatter](examples/showcase/reference/03-clustered-scatter.png)<br>**03 clustered scatter**<br>`scatter` · fitted trend + density |
| ![04 correlation heatmap](examples/showcase/reference/04-correlation-heatmap.png)<br>**04 correlation heatmap**<br>`heatmap` · lower triangle | ![05 forest interval](examples/showcase/reference/05-forest-interval.png)<br>**05 forest interval**<br>`interval` · effects + confidence | ![06 area trajectory](examples/showcase/reference/06-area-trajectory.png)<br>**06 area trajectory**<br>`area` · cumulative contribution |
| ![07 benchmark score bars](examples/showcase/reference/07-benchmark-score-bars.png)<br>**07 benchmark score bars**<br>`bar` · grouped benchmark evidence | ![08 ridge distribution](examples/showcase/reference/08-ridge-distribution.png)<br>**08 ridge distribution**<br>`distribution` · ranked densities | ![09 signed effect heatmap](examples/showcase/reference/09-signed-effect-heatmap.png)<br>**09 signed effect heatmap**<br>`heatmap` · signed effects |
| ![10 line validation trajectory](examples/showcase/reference/10-line-validation-trajectory.png)<br>**10 line validation trajectory**<br>`line` · validation curve | ![11 mixed dual axis](examples/showcase/reference/11-mixed-dual-axis.png)<br>**11 mixed dual-axis**<br>`mixed` · bars + secondary line | ![12 distribution histogram](examples/showcase/reference/12-distribution-histogram.png)<br>**12 distribution histogram**<br>`distribution` · histogram + quantiles |
| ![13 ranked contribution pareto](examples/showcase/reference/13-ranked-contribution-pareto.png)<br>**13 ranked contribution pareto**<br>`contribution` · signed Pareto | ![14 volcano scatter](examples/showcase/reference/14-volcano-scatter.png)<br>**14 volcano scatter**<br>`scatter` · thresholded discovery | ![15 bubble matrix](examples/showcase/reference/15-bubble-matrix.png)<br>**15 bubble matrix**<br>`network_matrix` · size + color + groups |
| ![16 stacked area composition](examples/showcase/reference/16-stacked-area-composition.png)<br>**16 stacked area composition**<br>`area` · composition over time | ![17 contribution waterfall](examples/showcase/reference/17-contribution-waterfall.png)<br>**17 contribution waterfall**<br>`contribution` · additive decomposition | ![18 profile benchmark](examples/showcase/reference/18-profile-benchmark.png)<br>**18 profile benchmark**<br>`radar` · capability profile |
| ![19 time series events](examples/showcase/reference/19-time-series-events.png)<br>**19 time series events**<br>`time_series` · events + regimes | ![20 distribution raincloud](examples/showcase/reference/20-distribution-violin.png)<br>**20 distribution raincloud**<br>`distribution` · half-density + box + points | ![21 bar percent stack](examples/showcase/reference/21-bar-percent-stack.png)<br>**21 bar percent stack**<br>`bar` · normalized mix |
| ![22 contribution lollipop ranking](examples/showcase/reference/22-contribution-lollipop-ranking.png)<br>**22 contribution lollipop ranking**<br>`contribution` · ranked effect sizes | ![23 line slopegraph](examples/showcase/reference/23-line-slopegraph.png)<br>**23 line slopegraph**<br>`line` · before/after movement | ![24 time series error band](examples/showcase/reference/24-time-series-error-band.png)<br>**24 time series error band**<br>`time_series` · uncertainty band |

## Platform Support

Current public beta:

- macOS Apple Silicon: `@dztabel/chartkit-darwin-arm64`
- Linux x64 and Windows x64 packages are planned for follow-up beta releases.

More platform packages can be added without changing the main `@dztabel/chartkit` command.

## Repository Boundary

This public repository contains npm metadata, the CLI shim, public docs, agent skill files, and the showcase few-shot examples used by `chart-kit atlas`.

It does not contain renderer source code, schemas, themes, fonts, visual regression assets, or platform binaries. Platform binaries are distributed through npm platform packages.

## Feedback

Open an issue with:

- `chart-kit --version` output
- `chart-quality.json` and `build-result.json`
- the input `figure.json` with sensitive data removed

## License

CLI binaries are distributed through npm under a non-open-source license. Skill files and public docs may be used for installing and operating ChartKit.
