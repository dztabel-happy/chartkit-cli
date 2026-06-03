# Public Boundary

This repository is the public ChartKit entry point.

## Included

- `package.json`
- `npm/chart-kit.cjs`
- `skills/codex/chartkit-report-figure`
- public README and usage docs

## Excluded

- `chart_kit/` renderer source
- `schemas/`
- `themes/`
- `fonts/`
- `examples/`
- `tests/`
- private audit docs
- visual regression images
- platform binaries before npm platform-package publishing

## Distribution Model

`@dztabel/chartkit` is a thin wrapper. It resolves the current platform package and executes the bundled `chart-kit` binary.

Platform packages:

- `@dztabel/chartkit-darwin-arm64`
- `@dztabel/chartkit-linux-x64`
- `@dztabel/chartkit-win32-x64`

The core repository builds the binaries and prepares platform packages. The public repository only documents and exposes the installation surface.
