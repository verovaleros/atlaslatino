---
title: "Lyra: An LLVM IR Obfuscator for Rust"
date: "2026-08-07"
people:
  - br-rafael-felix
event: malware-village-defcon-2026
field: malware-reversing
type: talk
links:
  - label: View official session
    url: https://malware-village-defcon34.sessionize.com/session/1229336
---
Rust is rapidly becoming the language of choice for red team tooling, implants, and security-critical software. Yet the offensive security ecosystem has almost no obfuscation tooling for it. Nearly every production obfuscator targets C/C++ binaries or operates on final PE/ELF images; Rust's unique compile pipeline, name mangling, and LLVM IR patterns require a fundamentally different approach.

This talk presents Lyra, an open-source, cargo-native LLVM IR obfuscator for Rust. Lyra intercepts each crate during a normal "cargo build" via RUSTC_WRAPPER, transforms the LLVM IR with a configurable pass pipeline, string encryption, basic-block shuffling, indirect-branch obfuscation, recompiles the result with llc + clang, and substitutes the object before the real MSVC linker runs. Zero changes to the Rust compiler, zero changes to the target project's source code, one flag on the command line.

We walk through the architecture, the engineering challenges unique to Windows/MSVC (UTF-16 response files, allocator-shim object preservation, inkwell's undocumented panic guards), and live before-and-after demonstrations in IDA Pro, Ghidra, and Binary Ninja.

We also show a YARA rule that confidently matches a plain demo build returning zero results on the obfuscated binary, and two consecutive unseeded builds producing different hex patterns, defeating a rule written on the first build.

Lyra is released open-source at the time of the talk. All demos are reproducible from the release. Attendees leave with a working tool they can run against their own Rust projects the same day.
