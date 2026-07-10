<h1 align="center">ChartKit</h1>

<p align="center">A formal report figure tool for agents</p>

<p align="center">
  <a href="README.zh-CN.md">中文</a>
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
| <sub><strong>Distribution box plot</strong></sub> | <sub><strong>Delta bar chart</strong></sub> | <sub><strong>Clustered scatter plot</strong></sub> |
| <img src="examples/showcase/reference/01-distribution-box-strip.png" alt="ChartKit distribution box plot" width="260"> | <img src="examples/showcase/reference/02-delta-bar-with-points.png" alt="ChartKit delta bar chart" width="260"> | <img src="examples/showcase/reference/03-clustered-scatter.png" alt="ChartKit clustered scatter plot" width="260"> |
| <sub><strong>Correlation heatmap</strong></sub> | <sub><strong>Forest interval plot</strong></sub> | <sub><strong>Area trajectory chart</strong></sub> |
| <img src="examples/showcase/reference/04-correlation-heatmap.png" alt="ChartKit correlation heatmap" width="260"> | <img src="examples/showcase/reference/05-forest-interval.png" alt="ChartKit forest interval plot" width="260"> | <img src="examples/showcase/reference/06-area-trajectory.png" alt="ChartKit area trajectory chart" width="260"> |
| <sub><strong>Benchmark bar chart</strong></sub> | <sub><strong>Ridge distribution plot</strong></sub> | <sub><strong>Signed effect heatmap</strong></sub> |
| <img src="examples/showcase/reference/07-benchmark-score-bars.png" alt="ChartKit benchmark bar chart" width="260"> | <img src="examples/showcase/reference/08-ridge-distribution.png" alt="ChartKit ridge distribution plot" width="260"> | <img src="examples/showcase/reference/09-signed-effect-heatmap.png" alt="ChartKit signed effect heatmap" width="260"> |
| <sub><strong>Validation line chart</strong></sub> | <sub><strong>Dual-axis mixed chart</strong></sub> | <sub><strong>Distribution histogram</strong></sub> |
| <img src="examples/showcase/reference/10-line-validation-trajectory.png" alt="ChartKit validation line chart" width="260"> | <img src="examples/showcase/reference/11-mixed-dual-axis.png" alt="ChartKit dual-axis mixed chart" width="260"> | <img src="examples/showcase/reference/12-distribution-histogram.png" alt="ChartKit distribution histogram" width="260"> |
| <sub><strong>Ranked Pareto contribution</strong></sub> | <sub><strong>Volcano scatter plot</strong></sub> | <sub><strong>Bubble matrix</strong></sub> |
| <img src="examples/showcase/reference/13-ranked-contribution-pareto.png" alt="ChartKit ranked Pareto contribution chart" width="260"> | <img src="examples/showcase/reference/14-volcano-scatter.png" alt="ChartKit volcano scatter plot" width="260"> | <img src="examples/showcase/reference/15-bubble-matrix.png" alt="ChartKit bubble matrix" width="260"> |
| <sub><strong>Stacked area chart</strong></sub> | <sub><strong>Contribution waterfall</strong></sub> | <sub><strong>Radar benchmark profile</strong></sub> |
| <img src="examples/showcase/reference/16-stacked-area-composition.png" alt="ChartKit stacked area chart" width="260"> | <img src="examples/showcase/reference/17-contribution-waterfall.png" alt="ChartKit contribution waterfall chart" width="260"> | <img src="examples/showcase/reference/18-profile-benchmark.png" alt="ChartKit radar benchmark profile" width="260"> |
| <sub><strong>Event time series</strong></sub> | <sub><strong>Violin distribution plot</strong></sub> | <sub><strong>Percent stacked bar</strong></sub> |
| <img src="examples/showcase/reference/19-time-series-events.png" alt="ChartKit event time series chart" width="260"> | <img src="examples/showcase/reference/20-distribution-violin.png" alt="ChartKit violin distribution plot" width="260"> | <img src="examples/showcase/reference/21-bar-percent-stack.png" alt="ChartKit percent stacked bar chart" width="260"> |
| <sub><strong>Lollipop ranking chart</strong></sub> | <sub><strong>Slopegraph</strong></sub> | <sub><strong>Error-band time series</strong></sub> |
| <img src="examples/showcase/reference/22-contribution-lollipop-ranking.png" alt="ChartKit lollipop ranking chart" width="260"> | <img src="examples/showcase/reference/23-line-slopegraph.png" alt="ChartKit slopegraph" width="260"> | <img src="examples/showcase/reference/24-time-series-error-band.png" alt="ChartKit error-band time series chart" width="260"> |
| <sub><strong>Proportion donut</strong></sub> | <sub><strong>Composite small multiples</strong></sub> | |
| <img src="examples/showcase/reference/25-proportion-donut.png" alt="ChartKit proportion donut" width="260"> | <img src="examples/showcase/reference/26-composite-solar-curtailment.png" alt="ChartKit composite small multiples" width="260"> | |

## Installation

### 1. Install the CLI

```bash
npm install -g @dztabel/chartkit
chart-kit --version
```

Output like this means the CLI is installed:

```text
chart-kit 0.1.47
```

### 2. Install one Agent skill

The skill ships inside the npm package, so the copy you install always matches the CLI version you just installed. The commands below copy it from the global npm package into your agent's skill directory (re-run them after upgrading the CLI).

#### 2.1 Codex

```bash
node -e "const cp=require('child_process'),fs=require('fs'),os=require('os'),path=require('path');const root=cp.execSync('npm root -g').toString().trim();const src=path.join(root,'@dztabel','chartkit','skills','chartkit-report-figure');const dest=path.join(os.homedir(),'.agents','skills','chartkit-report-figure');fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(path.dirname(dest),{recursive:true});fs.cpSync(src,dest,{recursive:true});console.log('Codex skill installed from: '+src);"
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
node -e "const cp=require('child_process'),fs=require('fs'),os=require('os'),path=require('path');const root=cp.execSync('npm root -g').toString().trim();const src=path.join(root,'@dztabel','chartkit','skills','chartkit-report-figure');const dest=path.join(os.homedir(),'.claude','skills','chartkit-report-figure');fs.rmSync(dest,{recursive:true,force:true});fs.mkdirSync(path.dirname(dest),{recursive:true});fs.cpSync(src,dest,{recursive:true});console.log('Claude Code skill installed from: '+src);"
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

Chart types:

- Line / time series / mixed / area: `line` / `time_series` / `mixed` / `area`
- Bar chart: `bar`
- Scatter plot: `scatter`
- Heatmap / matrix chart: `heatmap` / `network_matrix`
- Distribution plot: `distribution`
- Interval plot / forest plot: `interval`
- Contribution / waterfall / ranking: `contribution` / `ranked_contribution`
- Proportion snapshot: `proportion`
- Radar chart / capability profile: `radar`
- Image plate: `image_plate`
- Schematic / process chart: `schematic`
- Small-multiples composite (same chart faceted across months/cohorts): `composite`
- Comparison presets: `scaling_comparison` / `ablation_heatmap`
- Trusted local script backends: `custom_python` / `custom_r`

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

The public GitHub repository contains npm wrapper metadata, the command shim, user documentation, and showcase preview assets. The npm package also includes the version-matched agent skill.

Renderer source code, schemas, themes, fonts, visual regression samples, and platform binaries are not included in this repository. Platform binaries are distributed through npm platform packages.

## License

ChartKit is distributed through npm as a proprietary CLI binary. The public repository provides the wrapper, documentation, and showcase assets for installing and evaluating the CLI.
