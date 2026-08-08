---
title: "Drogonsec: SAST + SCA + Secrets + IaC in one open-source scanner"
date: "2026-08-07"
people:
  - br-filipi-pires
event: appsec-village-defcon-2026
field: appsec-supply-chain
type: arsenal
links:
  - label: View official session
    url: https://appsecvillage.com/events/dc-2026/drogonsec-sast-sca-secrets-iac-in-one-open-source-scanner-1212506
---
Drogonsec is an open-source, high-performance security scanner built for developers and CI/CD pipelines. In a single run, it combines four analysis engines: SAST for 20+ languages, SCA for dependency CVEs, secret detection with 50+ patterns (AWS, GCP, GitHub, JWTs, SSH keys), and IaC misconfiguration analysis for Terraform and Kubernetes, all mapped to OWASP Top 10:2025 and CWE, with CVSS 3.1 scoring and SARIF output for GitHub and Azure DevOps integration.

This Arsenal session will demo Drogonsec scanning real-world repositories live, showing findings across all four engines, explaining rule design decisions, and showcasing how teams can extend it with custom YAML rules. Attendees leave with a running tool they can drop into their pipelines the same day.
