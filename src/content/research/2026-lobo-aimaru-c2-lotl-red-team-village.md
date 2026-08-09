---
title: "AIMARU C2: The New Era of LotL (MCP AI-Driven C2)"
date: "2026-08-08"
people:
  - co-mario-lobo
event: red-team-village-defcon-2026
field: ai-security
type: workshop
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
  - label: Project on GitHub
    url: https://github.com/mloborom/aimaru-c2
---
AImaru C2 is the evolution of a concept sparked by an unsettling question: What happens when an attacker can execute advanced Living off the Land (LotL) attacks without being an expert? While traditional LotL requires a specialist to navigate complex environments, AImaru C2 changes the game. Evolving from a PoC into a sophisticated Red Team framework, it automates expert-level tradecraft by subverting Anthropic's Model Context Protocol (MCP). By weaponizing MCP clients, it transforms a standard context protocol into a functional, autonomous multi-level RAT that natively "speaks" PowerShell.

AImaru C2 was born out of a critical necessity to ground cybersecurity in reality. While the industry often distracts itself with over-engineered narratives and hype-driven threats that ignore actual ecosystem data, a far more pragmatic danger has been hiding in plain sight. This framework addresses the unsettling evolution of the "Expert Bottleneck": What happens when the sophisticated LotL tactics, once reserved for elite nation-state actors, are democratized through automation? Named after the mythical serpent that glides unseen between the underworld and the land of the living, AImaru C2 represents the shift from manual expertise to autonomous execution. It is no longer just a proof of concept; it is a full-scale Red Team framework designed to expose how easily an unskilled attacker can now weaponize authorized system protocols to orchestrate advanced, data-driven breaches that traditional defenses simply aren't looking for.

To understand its impact, context is key. For years, LotL attacks have been the dominant tactic in ransomware campaigns. Instead of deploying traditional malware, threat actors abuse legitimate OS tools—such as PowerShell, WMI, or Certutil—to operate under the radar. In 2025, 82% of successful breaches were fileless or malwareless, with PowerShell ranking as the second most utilized TTP by groups like Black Basta, Royal, and LockBit.

This robust framework moves beyond experimental concepts, consolidating itself as a production-ready offensive platform. AImaru C2 is engineered with a modular architecture that prioritizes cryptographic integrity, operational security, and intelligent automation.

Core Framework Capabilities:

- Model Context Protocol (MCP) RAT Engine: A paradigm shift in command and control that subverts Anthropic's MCP from a standard context-sharing tool into a functional, undetectable Remote Access Trojan (RAT), tunneling all C2 traffic through legitimate LLM API communication.
- PowerShell Client Builder: An automated obfuscation engine featuring deep variable randomization and structural mutation to break static signatures.
- AMSI Bypass Generator: Dynamic generation of multi-stage bypass scripts, utilizing diverse techniques to neutralize the Antimalware Scan Interface in real-time.
- Real-time Monitoring: Advanced telemetry for live command execution tracking and granular session management.
- Cryptographic Isolation: Implementation of per-client encryption keys derived via HKDF-SHA256, ensuring that the compromise of one beacon does not jeopardize the entire fleet.
- RBAC: Native Role-Based Access Control, strictly segregating permissions between Admins, Users, and Viewers.
- Complete Audit Logging: Forensic-grade command history with millisecond-accurate timestamps for post-operation deconfliction.

By utilizing a multi-tier decision logic, the system dynamically selects and rewrites payloads based on the specific operational objective. This allows the C2 to scale its complexity in real-time—transitioning from basic PowerShell structures and stealthy WMI manipulation to the strategic abuse of LOLBins for high-complexity tasks. This adaptive approach ensures that every command utilizes the most effective legitimate system tool, successfully evading environment-specific defenses by blending into the target's unique operational noise.

Tactic Description: In this interactive session, attendees will sit down with the developer to operate the AImaru C2 framework in a controlled lab environment. Participants will experience the "Natural Language Intent" paradigm shift firsthand, moving away from manual syntax to intent-based exploitation.

Deployment: Deploy a lightweight MCP-Client on a target Windows machine and establish a beacon back to the AI-C2 controller.

Intent-Based Recon: Issue high-level natural language prompts (e.g., "Find sensitive PDF files and identify lateral movement paths") and observe the LLM selecting and generating the appropriate PowerShell/WMI code in real-time.

Automated Evasion: Trigger the Adaptive AMSI Bypass module, witnessing how the framework re-writes its own memory-resident payloads to evade active defenses.
