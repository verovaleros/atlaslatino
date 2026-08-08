---
title: "From commit to compromise: securing the full pipeline with AI-assisted remediation"
date: "2026-08-09"
people:
  - br-filipi-pires
event: appsec-village-defcon-2026
field: appsec-supply-chain
type: talk
links:
  - label: View official session
    url: https://appsecvillage.com/events/dc-2026/from-commit-to-compromise-securing-the-full-pipeline-with-ai-assisted-remediation-1212537
---
Most vulnerabilities aren't found because teams lack tools they persist because the cost of fixing them is too high. A finding without a concrete, context-aware fix is just noise developers learn to ignore.
This talk walks through three real-world attack scenarios a secret leaked into git history, a compromised dependency in a supply chain attack, and an injection vulnerability introduced in a PR and shows how each is detected, mapped to OWASP Top 10:2025, and automatically remediated using AI running entirely on local infrastructure.
No source code leaves the machine. The AI receives the vulnerable code block, CWE identifier, CVSS score, and OWASP category and returns a fix that is specific, correct, and ready to apply. Attendees leave with a working open-source tool and a new mental model for what AppSec remediation can look like.
