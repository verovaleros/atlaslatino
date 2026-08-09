---
title: "DPAPI Is Not a Boundary: A Full Infostealer Kill Chain Operators Can Replicate"
date: "2026-08-08"
people:
  - br-filipi-pires
event: red-team-village-defcon-2026
field: offensive-security
type: workshop
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
---
Complete infostealer kill chain hands-on, executed against Windows 11 21H2 on default UAC using only open-source tooling. No zero-days, no commercial C2. Participants run every command live: HTA delivery, Meterpreter in-memory session, Chrome and Edge credential extraction via DPAPI-locked SQLite, keylogging in explorer.exe memory, UAC bypass via fodhelper, SYSTEM via Named Pipe Impersonation, and LSASS dump via Kiwi. The DPAPI_SYSTEM key recovered from LSA secrets decrypts the browser credentials captured earlier, closing the loop.

OUTLINE

- Stage 1: generate HTA payload, deliver via Python HTTP server, open Meterpreter session
- Stage 2: extract Chrome and Edge credentials via post module, inspect DPAPI-encrypted loot
- Stage 3: migrate to explorer.exe, start keyscan, capture live keystrokes
- Stage 4: UAC bypass via fodhelper registry hijack, elevate to SYSTEM via Named Pipe Impersonation
- Stage 5: load Kiwi, dump NTLM hashes, SAM, LSA secrets, extract DPAPI_SYSTEM key, decrypt browser loot
- Detection debrief: Sysmon Event ID 1 process tree and PowerShell Script Block log review per stage

TAKEAWAYS

1. A complete credential theft playbook from HTA delivery to LSASS dump, validated against Windows 11 21H2 with Chrome 147 and Edge 147 on default UAC, ready to adapt for engagements.
2. The DPAPI close-loop: how DPAPI_SYSTEM from LSA secrets decrypts browser credentials collected earlier, giving operators a concrete credential pivot from a single user-context session.
3. A detection gap map calibrated against real Sysmon telemetry showing which events fire on default Windows 11 and which require EDR behavioral rules most organizations do not have deployed.
