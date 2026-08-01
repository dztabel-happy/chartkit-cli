# 29 ROC Curves

## User request

Compare four 30-day readmission risk models on the same held-out cohort. I want the standard ROC figure with the chance diagonal and the AUC for each model.

## ChartKit choice

Use `type: "line"` with `layout: "roc"` and `xAxis.scale: "numeric"`. The `roc` layout only fills in what an ROC needs and you did not write: a numeric x axis clamped to `[0, 1]`, a matching y range, an equal data aspect, and the chance diagonal. Every one of those defaults is overridable — write the key yourself and yours wins.

`xAxis.scale: "numeric"` is the opt-in that makes `data.x` a real coordinate instead of an equally spaced category slot. It is what lets each model carry its own `series[].x` grid, which is what real ROC curves have: the thresholds are per-model, not shared.

**ChartKit never computes AUC.** It plots the coordinates you give it. Compute the AUC upstream and carry it in the series `label` so the legend reads `Model — AUC 0.93`; the `name` stays the plain model identifier.

Ask for a square canvas with `style.height_mm`, not a new profile. Pick the profile by the *width* the square needs: a square at `report_a4.full_width` is 170×170 mm, which no report page can carry — a single-column profile is what a square figure wants. Put the legend in the lower-right corner, inside the axes: on an ROC plot that corner is the one region no curve reaches.

## Avoid

Do not omit `xAxis.scale` and expect a numeric axis — without the opt-in a numeric `data.x` is still drawn as equally spaced categories, and ChartKit reports it as CKQ138. Do not invent an AUC. Do not use `layout: "pr"` without a prevalence baseline in `data.reference_lines`: a PR curve has no universal chance line and CKQ139 will say so.
