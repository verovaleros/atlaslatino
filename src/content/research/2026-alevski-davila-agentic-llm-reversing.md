---
title: "Keep the Model on Course: Agentic LLM Workflows for Reversing"
date: "2026-08-08"
people:
  - mx-lenin-alevski
  - mx-asher-davila
event: la-villa-hacker-defcon-2026
field: ai-security
type: talk
links:
  - label: Speaker page (Lenin Alevski)
    url: https://lavillahacker.com/team/lenin-alevski/
  - label: Speaker page (Asher Davila)
    url: https://lavillahacker.com/team/asher-davila/
---
Malware analysts are wiring LLMs into their reversing workflows today. The MCP integrations for IDA Pro, Ghidra, radare2, and Binary Ninja are public, and analysts use them to rename functions, triage samples, and hunt vulnerabilities. Adoption has outpaced any measured account of where these tools hold up and where they mislead, and running an agent against one sample can burn an enormous number of tokens on work the model repeats for every binary.

We built an agentic malware analysis framework on ADK (Agent Development Kit) that connects LLMs to disassemblers through MCP, wrapped in per-language skills for C/C++, C#, Go, Android, etc. The ADK agent loop drives the analysis: pulling functions, following xrefs, reading decompiled output, making notes, and issuing disassembler commands on its own. Each skill supplies the runtime context once, so the model spends its budget on the sample. Everything runs in Docker containers for isolation and reproducibility.

We tested it across multiple models on real samples and scored every result against ground truth. Triage and function renaming on stripped binaries work well when the agent is steered. Crypto identification and CVE matching fail in ways that read as authoritative. The analyst is the captain, the model the crew. We ship the containers, skills, and prompt templates so attendees can reproduce similar workflows efortlessly.
