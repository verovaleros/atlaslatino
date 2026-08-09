---
title: "Evading EDR in ATM"
date: "2026-08-08"
people:
  - mx-arnold-morales
event: red-team-village-defcon-2026
field: offensive-security
type: workshop
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
  - label: DMA Introduction (write-up)
    url: https://h0km4.com/posts/DMA-Introduction/
  - label: Telemetry Bypass (write-up)
    url: https://h0km4.com/posts/telemetria-bypass/
---
ATMs in the end are a computer with windows.

I will talk about EDRs and how parent-child process inheritance works.

The Windows boot process, known as the boot process, is divided into several phases as we have already seen: PreBoot (initialization of BIOS/UEFI firmware and POST), Boot Manager (loading of bootmgr or bootmgfw.efi), OS Loader (execution of winload.exe to load the kernel), and Kernel Initialization (loading of ntoskrnl.exe and hal.dll, initialization of drivers and services). Finally, winlogon.exe is started to present the user interface. This process enables the transition from a powered-off state to a functional operating system through a hierarchical and verified sequence.

Regarding kernel-based EDRs (Endpoint Detection and Response), they operate in kernel mode, the most privileged level of the system (some also operate at the UEFI level), which allows them to monitor low-level activities such as system calls, memory manipulation, driver loading, and file access. By running in this mode, EDRs can detect and block advanced threats such as rootkits or persistent malware that attempt to evade user-mode protections. Their deep integration with the kernel enables real-time monitoring, behavioral analysis, and immediate response to suspicious activities during and after the boot process.

EDRs are typically located in the kernel, but as mentioned, some also operate at the UEFI level. If we recall how Windows works, beneath UEFI lies SMM (System Management Mode), making this an even more complex layer to analyze and operate within.

This talk is intended for individuals interested not only in ATMs and simple cash dispensing, but in going beyond that—focusing on deeper analysis and the full experience gained when confronting these systems.
