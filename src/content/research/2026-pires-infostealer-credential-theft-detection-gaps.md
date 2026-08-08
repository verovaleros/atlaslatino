---
title: "Infostealer: Replicating Commodity Threat Actor Credential Theft TTPs and Validating Detection Gaps"
date: "2026-08-08"
people:
  - br-filipi-pires
event: adversary-village-defcon-2026
field: offensive-security
type: workshop
links:
  - label: View official session
    url: https://adversaryvillage.org/adversary-events/DEFCON-34/Filipi-Pires/
---
Commodity infostealers account for a significant share of initial access in enterprise breaches. Their TTPs are documented, their tooling is public, and most detection stacks still miss them. This workshop emulates the full infostealer playbook against a live target and measures exactly where the gaps are.

Attendees execute an eight-stage adversary emulation scenario replicating documented commodity threat actor TTPs: HTA phishing delivery, in-memory C2 via Meterpreter, browser credential theft from Chrome and Edge using DPAPI and the SQLite Login Data file, in-memory keylogging via process migration to explorer.exe, UAC bypass using the fodhelper registry hijack documented across multiple threat actor profiles, and LSASS credential dumping via Kiwi/Mimikatz recovering NTLM hashes, SAM contents, and the DPAPI_SYSTEM master key. Every technique is drawn from documented threat actor behavior and mapped to MITRE ATT&CK before execution begins.

The second half of the workshop shifts to validation. Attendees enable Sysmon64 telemetry and replay the emulation, stage by stage, identifying which techniques generated detectable events and which did not. Each gap maps to a concrete control recommendation. The keylogging stage writes nothing to disk. The Meterpreter session exists only in memory. The DPAPI_SYSTEM extraction is not anomalous to most SIEMs by default. Attendees document all three as validated findings, not assumptions.

Key Takeaways

1. Adversary emulation with real TTPs produces validated detection gaps, not theoretical ones. Running the actual technique against your stack tells you whether the control works. Running it in this workshop tells you before an attacker does.

2. In-memory execution breaks file-based detection entirely. Meterpreter leaves no binary on disk. The only detection path is behavioral: process injection signals, memory scanning, or network correlation between a user-context process and an external C2 session.

3. DPAPI_SYSTEM recovery after LSASS access retroactively compromises all protected data on the machine. Most SIEMs do not alert on this extraction by default. Attendees leave with the specific Event IDs and Sysmon rule configuration that catch it.
