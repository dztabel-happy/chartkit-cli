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

## Platform Support

Current public beta:

- macOS Apple Silicon: `@dztabel/chartkit-darwin-arm64`
- Linux x64: `@dztabel/chartkit-linux-x64`
- Windows x64: `@dztabel/chartkit-win32-x64`

More platform packages can be added without changing the main `@dztabel/chartkit` command.

## Repository Boundary

This public repository contains npm metadata, the CLI shim, public docs, and agent skill files.

It does not contain renderer source code, schemas, themes, fonts, gallery samples, visual regression assets, or platform binaries. Platform binaries are distributed through npm platform packages.

## Feedback

Open an issue with:

- `chart-kit --version` output
- `chart-quality.json` and `build-result.json`
- the input `figure.json` with sensitive data removed

## License

CLI binaries are distributed through npm under a non-open-source license. Skill files and public docs may be used for installing and operating ChartKit.
