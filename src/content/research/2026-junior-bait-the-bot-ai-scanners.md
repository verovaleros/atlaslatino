---
title: "Bait the Bot: Hacking Back Autonomous AI Vulnerability Scanners"
date: "2026-08-09"
people:
  - br-alcyon-junior
event: la-villa-hacker-defcon-2026
field: ai-security
type: talk
links:
  - label: View official session
    url: https://lavillahacker.com/team/alcyon-junior/
---
Autonomous, LLM-powered vulnerability scanners now crawl the web at scale, and every one of them shares the same structural weakness: it reads the content you control. This talk flips the engagement. Instead of just blocking the bot, your site detects that an AI agent is scanning it, fingerprints the model behind it, and fires back a hidden, tailored prompt injection that derails, poisons, or neutralizes the attacking agent, with no traditional exploit involved.

We build on recent academic work on prompt-injection "hack back," push it into the reconnaissance-and-scanning threat model with live demos, walk through an escalating cat-and-mouse between attacker and defender, and take an honest look at where active defense crosses the legal line. Red teamers and blue teamers alike will leave with something they can responsibly test the same week.
