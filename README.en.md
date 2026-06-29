<h1 align="center">ChartKit</h1>

<p align="center">A formal report figure tool for agents</p>

<p align="center">
  <a href="README.md">中文</a>
  ·
  <a href="#installation">Installation</a>
  ·
  <a href="#quick-start">Quick Start</a>
  ·
  <a href="#preview">Preview</a>
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/@dztabel/chartkit?label=npm">
  <img alt="platforms" src="https://img.shields.io/badge/platform-macOS%20arm64%20%7C%20Linux%20x64%20%7C%20Windows%20x64-blue">
</p>

---

ChartKit is a report figure tool for agents.

Users provide data, source materials, or a chart goal. The agent organizes the data and decides the chart intent. ChartKit exports the final figure as SVG, PDF, PNG, and TIFF images that can be inserted into formal reports.

Users can provide any material an agent can read and understand, such as:

- Excel, CSV, JSON, PDF, web pages, screenshots, or existing reports.
- Project data, business data, research materials, experiment results, or metric summaries.
- A clear analysis goal that the agent can research, organize, and turn into a chart.

## Preview

These screenshots show ChartKit's default report figure output.

| | | |
|:---:|:---:|:---:|
| <img src="examples/showcase/reference/01-distribution-box-strip.png" alt="ChartKit distribution box plot" width="260"><br>**Distribution box plot** | <img src="examples/showcase/reference/02-delta-bar-with-points.png" alt="ChartKit delta bar chart" width="260"><br>**Delta bar chart** | <img src="examples/showcase/reference/03-clustered-scatter.png" alt="ChartKit clustered scatter plot" width="260"><br>**Clustered scatter plot** |
| <img src="examples/showcase/reference/04-correlation-heatmap.png" alt="ChartKit correlation heatmap" width="260"><br>**Correlation heatmap** | <img src="examples/showcase/reference/05-forest-interval.png" alt="ChartKit forest interval plot" width="260"><br>**Forest interval plot** | <img src="examples/showcase/reference/06-area-trajectory.png" alt="ChartKit area trajectory chart" width="260"><br>**Area trajectory chart** |
| <img src="examples/showcase/reference/07-benchmark-score-bars.png" alt="ChartKit benchmark bar chart" width="260"><br>**Benchmark bar chart** | <img src="examples/showcase/reference/08-ridge-distribution.png" alt="ChartKit ridge distribution plot" width="260"><br>**Ridge distribution plot** | <img src="examples/showcase/reference/09-signed-effect-heatmap.png" alt="ChartKit signed effect heatmap" width="260"><br>**Signed effect heatmap** |
| <img src="examples/showcase/reference/10-line-validation-trajectory.png" alt="ChartKit validation line chart" width="260"><br>**Validation line chart** | <img src="examples/showcase/reference/11-mixed-dual-axis.png" alt="ChartKit dual-axis mixed chart" width="260"><br>**Dual-axis mixed chart** | <img src="examples/showcase/reference/12-distribution-histogram.png" alt="ChartKit distribution histogram" width="260"><br>**Distribution histogram** |
| <img src="examples/showcase/reference/13-ranked-contribution-pareto.png" alt="ChartKit ranked Pareto contribution chart" width="260"><br>**Ranked Pareto contribution** | <img src="examples/showcase/reference/14-volcano-scatter.png" alt="ChartKit volcano scatter plot" width="260"><br>**Volcano scatter plot** | <img src="examples/showcase/reference/15-bubble-matrix.png" alt="ChartKit bubble matrix" width="260"><br>**Bubble matrix** |
| <img src="examples/showcase/reference/16-stacked-area-composition.png" alt="ChartKit stacked area chart" width="260"><br>**Stacked area chart** | <img src="examples/showcase/reference/17-contribution-waterfall.png" alt="ChartKit contribution waterfall chart" width="260"><br>**Contribution waterfall** | <img src="examples/showcase/reference/18-profile-benchmark.png" alt="ChartKit radar benchmark profile" width="260"><br>**Radar benchmark profile** |
| <img src="examples/showcase/reference/19-time-series-events.png" alt="ChartKit event time series chart" width="260"><br>**Event time series** | <img src="examples/showcase/reference/20-distribution-violin.png" alt="ChartKit violin distribution plot" width="260"><br>**Violin distribution plot** | <img src="examples/showcase/reference/21-bar-percent-stack.png" alt="ChartKit percent stacked bar chart" width="260"><br>**Percent stacked bar** |
| <img src="examples/showcase/reference/22-contribution-lollipop-ranking.png" alt="ChartKit lollipop ranking chart" width="260"><br>**Lollipop ranking chart** | <img src="examples/showcase/reference/23-line-slopegraph.png" alt="ChartKit slopegraph" width="260"><br>**Slopegraph** | <img src="examples/showcase/reference/24-time-series-error-band.png" alt="ChartKit error-band time series chart" width="260"><br>**Error-band time series** |

## Installation

### 1. Install the CLI

```bash
npm install -g @dztabel/chartkit
chart-kit --version
```

Output like this means the CLI is installed:

```text
chart-kit 0.1.43
```

### 2. Install one Agent skill

ChartKit uses the same `skills/chartkit-report-figure` skill for Codex and Claude Code. Install it into the skill directory for your agent.

#### 2.1 Codex

```bash
git clone https://github.com/dztabel-happy/chartkit-cli.git
cd chartkit-cli

node -e "const fs=require('fs'),os=require('os'),path=require('path');const src=path.join(process.cwd(),'skills','chartkit-report-figure');const dest=path.join(os.homedir(),'.agents','skills','chartkit-report-figure');fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(path.dirname(dest),{recursive:true});fs.cpSync(src,dest,{recursive:true});console.log('Codex skill installed');"
```

Check the Codex skill installation:

```bash
node -e "const fs=require('fs'),os=require('os'),path=require('path');const p=path.join(os.homedir(),'.agents','skills','chartkit-report-figure','SKILL.md');if(!fs.existsSync(p))process.exit(1);console.log('Codex skill installed');"
```

Expected output:

```text
Codex skill installed
```

Open Codex and type `$chartkit-report-figure`. If the skill can be selected with `Tab`, it is ready. If it does not appear, press `Cmd+K` / `Ctrl+K`, choose `Force Reload Skills`, or reopen Codex.

#### 2.2 Claude Code

```bash
git clone https://github.com/dztabel-happy/chartkit-cli.git
cd chartkit-cli

node -e "const fs=require('fs'),os=require('os'),path=require('path');const src=path.join(process.cwd(),'skills','chartkit-report-figure');const dest=path.join(os.homedir(),'.claude','skills','chartkit-report-figure');fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(path.dirname(dest),{recursive:true});fs.cpSync(src,dest,{recursive:true});console.log('Claude Code skill installed');"
```

Check the Claude Code skill installation:

```bash
node -e "const fs=require('fs'),os=require('os'),path=require('path');const p=path.join(os.homedir(),'.claude','skills','chartkit-report-figure','SKILL.md');if(!fs.existsSync(p))process.exit(1);console.log('Claude Code skill installed');"
```

Expected output:

```text
Claude Code skill installed
```

Open Claude Code and type `/chartkit-report-figure`. If the skill can be selected, it is ready. If it does not appear, run `/reload-skills` and try again. Older Claude Code versions may need a window restart.

## Quick Start

### 1. User provides data and asks for a report figure

```text
$chartkit-report-figure Please read my uploaded sales Excel file and make a revenue trend comparison chart for a business review report.
/chartkit-report-figure Please read my uploaded sales Excel file and make a revenue trend comparison chart for a business review report.
```

### 2. User gives only an analysis goal, and the agent gathers the data

```text
$chartkit-report-figure Please research China's energy storage installations over the past three years and make a trend chart for an industry research report.
/chartkit-report-figure Please research China's energy storage installations over the past three years and make a trend chart for an industry research report.
```

### 3. User has a conclusion, and the agent chooses the right chart

```text
$chartkit-report-figure Please build a formal report figure around this conclusion: "Channel C was the main source of growth this quarter."
/chartkit-report-figure Please build a formal report figure around this conclusion: "Channel C was the main source of growth this quarter."
```

### 4. User revises a generated figure

```text
$chartkit-report-figure Please make the chart more suitable for executives, highlight the top three contribution factors, and export it again.
/chartkit-report-figure Please make the chart more suitable for executives, highlight the top three contribution factors, and export it again.
```

The agent handles material reading, data organization, chart selection, image export, and quality checks.

## Technical Details

The agent organizes a chart spec and calls:

```bash
chart-kit validate figure.json --theme business-cn
chart-kit build figure.json --out ./chart-output --theme business-cn --format all
```

ChartKit outputs:

```text
chart-output/chart.svg
chart-output/chart.pdf
chart-output/chart.png
chart-output/chart.tiff
chart-output/chart-quality.json
chart-output/chart-manifest.json
chart-output/build-result.json
```

Built-in chart types:

- Line chart / time series chart: `line` / `time_series`
- Bar chart: `bar`
- Scatter plot: `scatter`
- Heatmap / matrix chart: `heatmap` / `network_matrix`
- Distribution plot: `distribution`
- Interval plot / forest plot: `interval`
- Area chart: `area`
- Contribution chart / waterfall chart / ranking chart: `contribution`
- Radar chart / capability profile: `radar`
- Image plate: `image_plate`
- Schematic / process chart: `schematic`
- Multi-panel composite figure: `composite`

## Troubleshooting

The current public beta supports macOS Apple Silicon, Linux x64, and Windows x64.

If a global npm install skips optional dependencies, install the platform package explicitly:

```bash
# macOS Apple Silicon
npm install -g @dztabel/chartkit @dztabel/chartkit-darwin-arm64

# Linux x64
npm install -g @dztabel/chartkit @dztabel/chartkit-linux-x64

# Windows x64
npm install -g @dztabel/chartkit @dztabel/chartkit-win32-x64
```

When reporting a build failure, include:

- `chart-kit --version`
- `chart-output/chart-quality.json`
- `chart-output/build-result.json`
- The smallest reproducible data sample or chart request

## Repository Scope

This public repository contains npm wrapper metadata, the command shim, public skill files, docs, and showcase preview assets.

Renderer source code, schemas, themes, fonts, visual regression samples, and platform binaries are not included in this repository. Platform binaries are distributed through npm platform packages.

## License

ChartKit is distributed through npm as a proprietary CLI binary. This repository provides the public wrapper, skill, and docs for installing and using the CLI.
