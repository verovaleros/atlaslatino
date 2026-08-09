---
title: "Give an AI Industrial Protocol Tools and Watch What It Destroys"
date: "2026-08-08"
people:
  - mx-asher-davila
externalPeople:
  - name: Malav Vyas
event: ics-village-defcon-2026
field: ai-security
type: talk
links:
  - label: View official session
    url: https://icsvillage.com/defcon-34
---
Every major ICS attack of the last decade succeeded not because of software vulnerabilities, but because industrial protocols were built to trust any packet on the wire. The village has read the incident reports. What it doesn't have is a way to replay them against its own infrastructure to learn what its detections actually catch and what they miss.

We present mrhOTshOT, an open-source framework that emulates history's most destructive ICS attacks across the complete kill chain, reconstructed from publicly available incident analyses. Not just the OT payload the full chain: Windows initial access with real CVEs, lateral movement to engineering workstations, protocol-native process manipulation, and persistent physical impact. Every emulation generates wire traffic consistent with publicly documented behavior on the correct industrial protocol for that attack family.

The framework spans a wide range of industrial protocols across ten distributed PLCs, each simulating the real-world process that protocol actually controls: a heating district controller for Modbus, a safety instrumented system for TriStation, a centrifuge cascade for S7comm. Nothing runs on a generic simulated tank with ten protocols bolted on.

We also introduce the Agentic Attack Emulation Framework: every protocol action is exposed as a callable tool, orchestrated by an LLM agent that reads live process state and composes attack sequences on the fly. No hardcoded playbook, you decide. This is what AI-assisted ICS attack composition looks like, and defenders need to understand it before they meet it in the wild.

The talk closes with a live demo: three centrifuges destroyed in real time while the operator HMI, deceived by an S7 rootkit, shows normal operation throughout, until it doesn't.
