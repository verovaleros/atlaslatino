---
title: "One Package, One Backdoor: Can AI Stop the Next Supply Chain Attack Before It Reaches You?"
date: "2026-08-03"
people:
  - mx-paulo-sarrin
event: bsides-las-vegas-2026
field: appsec-supply-chain
type: talk
links:
  - label: View official session
    url: https://bsideslv.org/speakers#11f14e6d-1b97-bf66-9cf8-3082c006fcd4
---
Open source packages are the foundation of modern software development. They save time, reduce cost, and accelerate delivery. But every package you install is also a potential entry point for an attacker. This session takes a hands-on approach to understanding software supply chain attacks from both sides of the attack.

On the offensive side, attendees will see how attackers introduce malicious code into a new package release without raising immediate suspicion. We cover how a malicious package establishes a command and control channel during installation, how it reads and exfiltrates environment variables including API keys, cloud credentials, and database connection strings, and how typosquatting tricks developers into installing the wrong package. We use real documented cases across npm, PyPI, and Maven to ground every concept in reality.

On the defensive side, we explore how AI is changing the speed and accuracy of supply chain threat detection. We walk through the architecture of tools like the Elastic Supply Chain Monitor, which watches package registries in real time, generates diffs between old and new releases, and sends those diffs to a large language model for classification. The LLM looks for obfuscated code, unexpected network connections, process spawning, and credential access patterns. When it finds them, it alerts the security team before any developer installs the package.

We also cover the hardening techniques that reduce your attack surface before an incident happens: using lockfiles to pin exact dependency versions, avoiding exposure of dependency files on public websites, using private artifact repositories to control what enters your environment, and integrating automated dependency scanning into your CI/CD pipeline. Attendees will leave with a clear mental model of the threat, a reference architecture for AI-assisted detection, and a practical checklist they can bring back to their team on Monday.
