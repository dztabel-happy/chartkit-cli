# Quality Loop

Use this loop whenever a ChartKit figure is created by an LLM:

1. Run `chart-kit validate`.
2. Fix spec-level warnings first:
   - `CKQ001`: add `contract`.
   - `CKQ002`: add `profile`.
   - `CKQ005`: add semantic roles or explicit colors.
   - `CKQ105`: use `layout: "auto"` or `box_strip` for small-sample distributions.
   - `CKQ108`: do not rely only on red/green; add another channel.
3. Run `chart-kit build --format all`.
4. Read `chart-quality.json`:
   - `CKQ101`: match the report profile.
   - `CKQ102`: reduce or rotate labels.
   - `CKQ103`: reduce tick density.
   - `CKQ104`: move legend or use a legend-only panel.
   - `CKQ107`: increase text/background contrast.
   - `CKQ109`: preserve editable SVG text and enough visible labels.
   - `CKQ203`: custom backend font violates the report/nature serif contract.
   - `CKQ204`: custom multi-panel figure uses bare upper-left panel labels instead of bottom `(a)`, `(b)`.
   - `CKQ205` / `CKQ206` / `CKQ207`: figure is drifting toward PPT/card/text-heavy layout.
   - `CKQ401`: schematic dominates a `data_figure`.
   - `CKQ403`: rainbow colormap is used in a report/paper data figure.
   - `CKQ404`: `contract.panel_map` repeats the same evidence question.
5. Rebuild until `quality.ok` is true or document the accepted tradeoff.

Quality warnings do not prohibit the model from using a visual choice. They force the model to make that choice explicit, accessible, and robust in a report.

For built-in renderers, `chart-kit build --format all` should produce SVG/PDF/PNG/TIFF plus `chart-quality.json`, `chart-manifest.json`, and source data when the spec declares it. For `custom_python` and `custom_r`, the backend must still write every requested format inside the output directory; missing requested artifacts are build failures. Custom scripts must keep ChartKit fonts, sparse text, data-first panels, and bottom-centered parenthesized panel labels.

Use `chart-kit atlas --role <role>` when the chart type is unclear, `chart-kit doctor` when the environment or fonts look wrong, and `chart-kit gallery build` when checking that the installed ChartKit can still render the reference visual patterns.
