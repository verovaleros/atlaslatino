---
title: "Came for the AppSec scans, stayed for the flaky tests"
date: "2026-08-03"
people:
  - mx-aldo-salas
event: bsides-las-vegas-2026
field: appsec-supply-chain
type: talk
links:
  - label: View official session
    url: https://bsideslv.org/talks#11f14783-e43c-7c0e-977f-20820c0181bb
---
I'm an AppSec lead. My job was rolling out security scans in CI. Once the scans shipped, I stayed and fixed the parts of the pipeline nobody else would touch. Six months, solo, on top of the day job. Four AI-driven bots later, this talk focuses on two of them.

The one that worked best: a CVE-fixing bot that's kept us at 0 CVEs for three months and counting. The one that miserably failed: a flaky DB test bot that couldn't see flakiness. To a one-shot AI review, a test that sometimes passes and sometimes fails just looks broken. The DB suite went from 42.3% peak failure rate to near zero, not by automating harder but by ditching the bot and pairing with Claude on each failure by hand.

The fixes were technical (race conditions and cache, mostly) but the reason they didn't get fixed wasn't. People click "Run again" several times a day instead of looking at why. Nobody fixes it until somebody who isn't supposed to does. Walk out and measure your team's rerun rate (I'll share the script). Then go fix the smallest thing nobody else will.
