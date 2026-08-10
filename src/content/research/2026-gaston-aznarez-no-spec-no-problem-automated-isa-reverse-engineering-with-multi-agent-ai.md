---
title: "No Spec, No Problem: Automated ISA reverse engineering with Multi-Agent AI"
date: "2026-05-21"
people:
  - ar-gaston-aznarez
  - ar-dan-borgogno
event: "ekoparty-miami-2026"
field: "malware-reversing"
type: "talk"
links:
  - label: "View official schedule"
    url: https://ekoparty.org/schedule-miami-2026/
---
What happens when you are reverse engineering a device and you hit the wall? You found that the device’s architecture is not  X86, no ARM, no MIPS, it’s just a proprietary architecture with basic information available online. You know you can reverse engineer a full Instruction Set Architecture (from now, ISA), but it is going to take a lot of time and effort. So we asked ourselves: can AI do the tedious work for us?

The instructions for the processor are not more than bits, but for us, it could be translated to assembly instructions. This assembly is just a human-readable encoding of bits, and it could be completely novel. And finding the relation between this semantics and the bits is a really tedious job, so why not let this to the AI?

In this talk, we propose a methodology to automatically reverse engineer ISAs using a multi-agent AI pipeline. The approach combines deterministic bit-level analysis with LLM reasoning to recover the ISA from a JieLi JL7012F6 processor, taking as input the disassembled instructions from the vendor's toolchain and producing a processor specification for Ghidra.

Beyond the tool we develop and release, this talk explores new ways in which AI can help in the reverse engineering process and proves the capacity of this technology in this field. Today, AI focuses on the higher levels of computation, but it is really useful in the lower levels too; we just have to find the fit.
