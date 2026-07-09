# Public Boundary

This repository is the public ChartKit entry point.

## Included

- `package.json`
- `npm/chart-kit.cjs`
- `examples/showcase` — reference specs, prompts, notes, and preview PNGs (synced from the core repo)
- public README and usage docs

## The skill is not checked in here

The `chartkit-report-figure` skill ships **inside the npm package** and is installed
from there (see the README install commands), so the local skill always matches the
installed CLI version. Codex users copy it into `~/.agents/skills/chartkit-report-figure`;
Claude Code users copy the same directory into `~/.claude/skills/chartkit-report-figure`.
This repository deliberately keeps no second copy — one source, no drift.

## Excluded

- `chart_kit/` renderer source
- `schemas/`
- `themes/`
- `fonts/`
- `tests/`
- private audit docs

Everything here that mirrors the core repo (`examples/showcase`, `npm/chart-kit.cjs`,
version strings) is written by the core repo's `scripts/sync_pub_repo.py`; do not edit
those files by hand in this repository.
