# 27 Paired Significance

## User request

I measured the same 32 patients at baseline, week 8 and week 24. I need one figure that shows the group distributions, the individual trajectories, and which visit-to-visit changes are significant.

## ChartKit choice

Use `type: "distribution"` with `layout: "box_strip"`, `data.paired`, and `annotations[].type: "significance"`. This is the repeated-measures pattern: the box carries the group summary, the strip points carry the raw observations, `data.paired` draws one faint line per subject so a reader can see who moved which way, and the brackets carry the paired-test result.

Give every series a `subjects` list in the same order as its `values`. That list is the identity ChartKit joins on, so a subject missing from one visit is dropped from the links rather than silently paired with the wrong observation. Write the *p* value into the annotation and let ChartKit derive `*` / `**` / `***` / `n.s.`; write `text` yourself only when the marker is not a *p*-value ladder.

Keep the brackets to the comparisons you actually tested. Three groups means three possible pairs; when the nested comparison would sit on top of an adjacent one, pin it with `level`.

## Avoid

Do not use `data.paired` on `hist` or `ridge` — they draw no per-subject mark, so ChartKit refuses it (CKQ133). Do not draw connecting lines when the observations are independent samples: a line between two unrelated groups asserts a pairing that does not exist. Do not annotate every pair "because the test ran"; each bracket is a claim the text has to use.
