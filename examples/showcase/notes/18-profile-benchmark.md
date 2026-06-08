# 18 Profile Benchmark Design Notes

## Visual Strategy
Use profile bars instead of a decorative spider plot when metrics are heterogeneous. Range lines and grouped rows make the benchmark readable in reports. Metric groups help the reader scan the evidence as blocks rather than as an undifferentiated KPI list.

The intended conclusion is: The proposed model dominates most quality and robustness metrics while the compact variant remains strongest on latency and unit cost.

## Use When
Use when several benchmark dimensions need a compact profile, especially when profile_bar is clearer than polar geometry. Add `metric_groups` when the rows naturally split into evidence families.

## Avoid
Avoid classic polar radar when readers need exact comparison; prefer profile_bar unless radial shape is essential.

## Spec Anchors
- `type`: `radar`
- `layout`: `profile_bar`
- `profile`: `report_a4.compact`
- `role`: `comparison`
- source: `examples/showcase/source/18-profile-benchmark.csv`
