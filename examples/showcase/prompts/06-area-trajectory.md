# 06 Area Trajectory

## User request

I need to show how a nonnegative contribution evolves over a deployment window, including a temporary dip and recovery.

## ChartKit choice

Use `type: "area"` for a nonnegative trajectory where the filled magnitude matters. Use enough ordered observations to show acceleration, temporary setbacks, recovery, and plateau, not just start/end points.

## Avoid

Do not use area fill for arbitrary signed data. Do not label every x tick when the ordered axis has many observations. Do not make every demonstration trajectory a perfectly monotonic ramp; real deployment evidence often has incidents, plateaus, and recovery segments.
