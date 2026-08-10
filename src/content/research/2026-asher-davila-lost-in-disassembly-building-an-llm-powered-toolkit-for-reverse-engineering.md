---
title: "Lost in Disassembly: Building an LLM-Powered Toolkit for Reverse Engineering"
date: "2026-05-22"
people:
  - mx-asher-davila
event: "ekoparty-miami-2026"
field: "malware-reversing"
type: "talk"
links:
  - label: "View official schedule"
    url: https://ekoparty.org/schedule-miami-2026/
---
This session describes a practical reverse engineering workflow developed while analyzing different types of binaries. The talk focuses on combining manual reverse engineering with AI-assisted tools inside an existing workflow. These tools are used to support tasks such as function labeling, identifying runtime structures, and building an initial understanding of binary capabilities, allowing the analyst to spend more time on deeper analysis and validation.The methodology presented is based on hands-on analysis of active threats collected from Palo Alto Networks firewalls and WildFire. The samples include Go-based IoT botnets, OT-centric malware, and Android malware targeting TVs. Our analysis was performed using disassemblers and decompilers (radare2, Ghidra, IDA Pro), extended with AI agents integrated directly into the disassembler environment. The emphasis is on what worked, what did not, and where human analysis remains essential.
