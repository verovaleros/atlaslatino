---
title: "Tokens and PRT: Advanced Attacks and Persistence in Microsoft Entra ID"
date: "2026-08-07"
people:
  - pa-elzer-pineda
  - pa-jose-manuel-rivas
event: cloud-village-defcon-2026
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://www.cloud-village.org/dc34
---
Is MFA and Conditional Access a real security guarantee? In this technical session, we will demonstrate how endpoint compromise allows an attacker to bypass traditional identity barriers in the cloud. The talk focuses on exploiting vulnerabilities in Microsoft Entra ID, breaking down an advanced attack chain:

- Device Code Flow: Abuse of authentication flows for initial access (Demo with Entraith).
- PowerShell Hijacking: Process interception to obtain session tokens (GrabTokenAzureAD).
- Sliver BOF Extraction: Use of Beacon Object Files (BOF) for stealthy exfiltration of tokens and the Primary Refresh Token (PRT) from memory, evading anti-malware defenses.
- MFA Bypass and Intune: Custom tools were developed to extract local PRTs, bypass Intune device management controls, and circumvent MFA. The entire process was automated through the open-source tool https://github.com/bl4cksku11/entraith, enabling attacks via device code flow, token renewal, email and app inspection, token exfiltration, and persistence generation.
