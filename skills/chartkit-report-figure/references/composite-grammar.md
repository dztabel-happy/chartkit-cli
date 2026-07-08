# Composite Grammar — Small Multiples

A composite is **one chart type repeated across facets**: a uniform grid of the
same small figure, one cell per facet (one month, one cohort, one site). It is
*not* a way to pack several different charts into one frame.

If you need several *different* evidence types, produce several **separate**
figures and let the report place them — do not reach for `composite`.

## The one rule

**Compose only sparse facets of the same chart; never shrink a dense or complex
figure into a cell.** Everything below follows from this.

- **Uniform grid.** Every cell is the same chart type and the same size —
  四平八稳, symmetric, aligned. A plain `rows × cols` grid, no hero cells, no spans.
- **Width-bounded, height-flexible.** Width is fixed by the report profile (a Word
  column). The grid grows *downward* by adding rows; it never grows wider.
- **Low per-cell density.** A cell is ~⅓ of a column. Keep each facet to a few
  series and few points so it stays legible at that size.
- **Shared scale, one legend.** Facets are meant to be compared, so they share a
  y-scale, and the key is drawn once for the whole figure, not per cell.
- **Same quality as a single figure.** Each cell is drawn by the *standalone*
  renderer, so any single-figure improvement propagates to composites for free.

## The facet grammar

```json
{
  "version": "0.1",
  "type": "composite",
  "layout": "small_multiples",
  "profile": "report_a4.full_width",
  "columns": 3,
  "share_y": true,
  "facet": {
    "base": { /* the shared chart spec: type, axes, styling, annotations */ },
    "panels": [ /* one entry per facet; each overrides a slice of base */ ]
  }
}
```

- `facet.base` is a normal single-chart spec (its `type` is the chart type for
  every cell). Put everything the facets share here: axis labels, styling,
  reference lines.
- `facet.panels[]` each carry a `title` (the cell caption) and a `data` block that
  is *merged into* `base.data` — so a panel supplies only its facet-specific
  series/values and inherits the rest.
- `columns` sets the grid width (default `min(3, n)`, capped at 3). Rows are
  derived: `ceil(n / columns)`.
- `share_y` (default `true`) shares the y-scale across all cells.

The engine draws the shared legend once in a reserved top band, shares the
y-limits, shows the x-axis only on the bottom row and the y-axis only on the left
column, and hides any trailing empty cells.

## Worked example — monthly small multiples

```json
{
  "version": "0.1",
  "type": "composite",
  "layout": "small_multiples",
  "profile": "report_a4.full_width",
  "columns": 3,
  "share_y": true,
  "title": "储能日内净调度功率 · 分月对比（2025 H1）",
  "caption": "各月代表日逐小时净出力；灰线为计划、蓝线为实际；六格共享纵轴以便跨月比较。",
  "contract": {
    "conclusion": "各月形态一致：夜间充电、晚高峰放电；实际贴合计划。",
    "role": "comparison",
    "archetype": "quantitative_grid",
    "statistics": [{"n_definition": "hourly net power, one representative day/month", "center": "value", "interval": "not applicable"}],
    "source_data": [{"path": "source/dispatch-composite.csv"}]
  },
  "facet": {
    "base": {
      "type": "line",
      "data": {"x": ["00", "01", "…", "23"]},
      "xAxis": {"label": "小时"},
      "yAxis": {"label": "净出力（MW）"},
      "annotations": [{"type": "hline", "value": 0, "color": "#9aa4ad", "linewidth": 0.6}]
    },
    "panels": [
      {"title": "1月 · 冬季高峰", "data": {"series": [
        {"name": "计划出力", "role": "baseline", "values": []},
        {"name": "实际出力", "role": "ours", "values": []}
      ]}},
      {"title": "2月 · 冬末", "data": {"series": [ /* … */ ]}}
    ]
  }
}
```

See `examples/dispatch-composite.json` for the full, buildable version.

## The composition quality gate (`CKC0xx`)

`validate` and `build` report a `composition` section, separate from the
single-figure checks:

- **CKC001** (error): facets mix chart types — a grid must repeat one type.
- **CKC002** (warning): a cell carries more than 4 series — too dense for a cell.
- **CKC003** (warning): a cell holds more than 120 data points — show it on its own.
- **CKC004** (warning): fewer than 2 facets (use a single figure) or more than 12
  (cells become unreadable).
- **CKC005** (info): `share_y` disabled on comparable facets loses comparability.

The single-figure size check (**CKQ101**) is automatically exempt for composites:
they are width-bounded but height-flexible by design.

## Removed: the legacy `panels` grammar

The old free-form composite — `panels[]` with `row`/`col`/`rowspan`, `layout:
{kind: grid|evidence}`, hero cells, `shared_colorbar`, legend/colorbar panel
kinds, `panel_map`, and `evidence_hierarchy` panel references — **no longer
exists**. `type: composite` without a `facet` block is rejected. Do not emit it.

(`panels` / `panel_map` / `panel_label_policy` survive only as *author metadata*
for custom-backend figures that draw their own multi-panel layout; the builtin
composite engine ignores them.)
