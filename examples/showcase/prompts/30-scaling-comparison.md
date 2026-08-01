# 30 Scaling Comparison

## User request

I need the standard methods figure for a paper: how accuracy scales with training-set size for our method and two baselines, next to per-benchmark accuracy at the largest budget.

## ChartKit choice

Use `type: "scaling_comparison"`. It is a fixed two-panel preset, not a general composition grammar: panel (a) is a log-x scaling curve with SEM bands and direct end-of-curve labels, panel (b) is a grouped bar comparison with error bars, and ChartKit places the bottom-centred `(a)` / `(b)` labels itself. Give it `data.scaling` and `data.benchmarks`; there are no other panels to configure.

Because the preset draws direct labels at the right-hand end of each curve, method names have to be short — `Ours`, `SFT`, `Scratch`. Put the full method descriptions in `caption`, which is where a reader looks for them anyway.

Set `benchmarks.y_range` with enough headroom for the legend to clear the tallest bar, and pick series colours dark enough to be read as text: the curve labels are drawn in the series colour, and CKQ107 rejects low-contrast label text.

## Avoid

Do not use `scaling_comparison` for a general two-panel figure — it is a scaling-plus-benchmark preset, and anything else belongs in `composite` small multiples or two separate figures. Do not hard-code a figure size; the preset draws into whatever the `profile` resolved to. Do not put a monotone curve in panel (a) and call it a scaling law without the SEM: the bands are what make the separation credible.
