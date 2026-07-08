# Information Architecture

> **How this maps to ChartKit today.** ChartKit renders **one figure per evidence
> unit**. The multi-panel "visual argument" below is the argument of a *report
> section* — realize each panel as a **separate figure** and let the report place
> them in that order. There is no built-in asymmetric hero/supporting composite.
> The only built-in multi-panel figure is the uniform **small-multiples composite**
> (the *same* chart faceted across months/cohorts/sites) — see
> `references/composite-grammar.md`. Read "panel (a), (b), …" below as "figure 1,
> 2, …" of a section, and `evidence_hierarchy` as *contract metadata* that records
> the argument, not a layout directive.

Every figure must answer a distinct evidence question. A figure is a visual argument, not a
collection of charts. The caption and report body carry prose; the figure carries evidence.

## Panel ordering principle

Build the panel map like a logical argument:

1. **Establish the system** — sample, cohort, method overview, or experimental design
2. **Show the primary effect** — the main comparison, trend, or result
3. **Show mechanism or structure** — why or how the effect occurs
4. **Quantify representative evidence** — link qualitative observation to numbers
5. **Add robustness or controls** — sensitivity, subgroup, ablation, or calibration

For Fig. 1 or a method figure, panel (a) often defines the visual vocabulary — colors, symbols,
classes, scale. Reuse that vocabulary across all panels in the figure.

## Good panel map examples

**Comparison figure (asymmetric_evidence):**
```
(a) Primary metric comparison across methods — bar, ranked
(b) Distribution of per-sample scores — distribution, box+strip
(c) Correlation between the two key metrics — scatter
(d) Robustness across dataset splits — interval
```

**Multi-modal evidence (evidence_matrix):**
```
(a) Embedding space representation — scatter (UMAP/t-SNE)
(b) Score distribution per group — distribution, ridge
(c) Pairwise similarity structure — heatmap
(d) Model-vs-human agreement — joint_scatter
(e) Performance dynamics over training — convergence
```

**Longitudinal with mechanism (timeline_or_process_plus_metrics):**
```
(a) Primary outcome over time per group — time_series
(b) Subgroup effect estimates — interval (forest plot)
(c) Summary change from baseline — contribution (dumbbell)
```

**Schematic-led (schematic_led_composite):**
```
(a) Mechanism or workflow diagram — schematic (hero, 45–60% area)
(b) Quantitative validation of step 1 — bar or line
(c) Quantitative validation of step 2 — distribution
(d) End-to-end benchmark comparison — interval
```

## Bad panel map patterns

| Anti-pattern | Why it fails |
|---|---|
| Two panels with the same accuracy metric | Repeats evidence, triggers CKQ404 |
| Workflow diagram as the only content | No quantitative evidence |
| Metric cards (KPI tiles) as panels | Not evidence; triggers CKQ205–207 |
| Explanatory paragraphs inside panels | Caption belongs in the caption |
| Equal-sized panels when evidence is unequal | Misleads reader about importance |
| Schematic dominating a data_figure | Triggers CKQ401 |

## Evidence hierarchy in the spec

Declare which panels carry which weight:

```json
"evidence_hierarchy": {
  "hero": ["primary_comparison"],
  "supporting": ["distribution", "correlation"],
  "context": ["legend", "colorbar"]
}
```

- `hero` — the figure that carries the primary conclusion; place it first / largest in the report section
- `supporting` — validate, contextualize, or add a second evidence type; smaller or later figures
- `context` — non-data aids (legend, colorbar, scale bar); keep minimal

This records the argument as contract metadata. It no longer drives an in-figure
layout (there is no `rowspan`/`colspan` composite): the *report* orders the hero
figure ahead of its supporting figures.

## Single-panel figures

Even for a single chart, fill in the contract:

```json
"contract": {
  "conclusion": "Feature importance drops sharply after rank 10.",
  "role": "ranking",
  "archetype": "quantitative_grid"
}
```

This ensures the chart type, axis labels, and color coding serve the stated conclusion — not just
display the data.
