# 13 Ranked Contribution Pareto Design Notes

## Visual Strategy
Use a signed rank plus cumulative line when the order itself is part of the evidence. The zero baseline, tail shading, and percentile markers explain contribution concentration without a separate text panel.

The intended conclusion is: A small high-profit tail contributes most of the cumulative net gain, while 48 negative days form a visible loss tail.

## Use When
Use when sorted observations and cumulative contribution are both part of the conclusion.

## Avoid
Avoid when the ranking variable is arbitrary; the cumulative curve needs a real ordering.

## Spec Anchors
- `type`: `ranked_contribution`
- `layout`: `default`
- `profile`: `report_a4.full_width`
- `role`: `ranking`
- source: `examples/showcase/source/13-ranked-contribution-pareto.csv`
- source binding: `data.source`, `label_col: date`, `value_col: daily_net_profit_wan`
- inline `data.items` is reserved for short examples, not daily/transaction-level records.
