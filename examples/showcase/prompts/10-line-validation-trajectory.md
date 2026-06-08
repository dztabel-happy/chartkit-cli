# 10 Line Validation Trajectory

## User request

I need to compare convergence trajectories across several model configurations, including uncertainty bands.

## ChartKit choice

Use `type: "line"` with SEM bands and direct labels when there are several ordered checkpoints. Use enough checkpoints to show convergence and plateau behavior.

## Avoid

Do not reduce training dynamics to three or four points. Do not use a bar chart when the ordered trajectory is the evidence.
