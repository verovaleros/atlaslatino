---
title: "Evil Is Always a Bad Stylist: .NET Obfuscation with Roslyn"
date: "2026-08-09"
people:
  - co-eduardo-chavarro-ovalle
  - mx-ashley-hiram
externalPeople:
  - name: Alexander Rodchenko
event: red-team-village-defcon-2026
field: malware-reversing
type: talk
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
  - label: Loaders on GitHub
    url: https://github.com/gam4er/Loaders
---
Modern endpoint defenses increasingly fingerprint .NET tools not only by strings and imports, but by structure: control flow, call graphs, and overall execution "workflows." Traditional IL obfuscation can hide obvious indicators, yet often produces highly regular flattened patterns that are easy to flag on their own.

This talk presents a Roslyn-based, source-to-source obfuscator for C# that rewrites an entire project before compilation. Using the official compiler APIs, it transforms the code's syntax and semantic structure, reshapes control/data flow, and then recompiles the result - while keeping the program's observable behavior intact. The output tends to look complex but "natural," diverging both from the original tool and from the telltale patterns created by many IL-level obfuscators.

I will walk through the pipeline, show how surprisingly little code is needed to build these transformations on Roslyn, and discuss what this means for EDR, sandboxing, and ML detections that rely on graph and workflow analysis of .NET binaries.

So, anyway, on moment of submitting original Seatbelt tool (obfuscated by source) have 10/73 security vendors flagged this file as malicious (can be better).

My project https://github.com/gam4er/Loaders differs from more well known https://github.com/sadreck/Codecepticon by implementing semantic structure obfuscation.

My point of view (as a SOC analyst, blue teamer) on "how to hide my tool from AV" problem is: if you have a code — OBFUSCATE YOUR CODE. Stop modifying binaries.
