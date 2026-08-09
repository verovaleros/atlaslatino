---
title: "Tokens and PRT: Advanced Attacks and Persistence in Microsoft Entra ID"
date: "2026-08-09"
people:
  - pa-elzer-pineda
  - pa-jose-manuel-rivas
event: red-team-village-defcon-2026
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
  - label: Entraith on GitHub
    url: https://github.com/bl4cksku11/entraith
---
Is MFA and Conditional Access a real security guarantee? In this technical session, we will demonstrate how endpoint compromise allows an attacker to bypass traditional identity barriers in the cloud. The talk focuses on exploiting vulnerabilities in Microsoft Entra ID, breaking down an advanced attack chain:

- Device Code Flow: Abuse of authentication flows for initial access (Demo with Entraith).
- PowerShell Hijacking: Process interception to obtain session tokens (GrabTokenAzureAD).
- Sliver BOF Extraction: Use of Beacon Object Files (BOF) for stealthy exfiltration of tokens and the Primary Refresh Token (PRT) from memory, evading anti-malware defenses.
- MFA Bypass and Intune: The speakers developed custom tooling to extract local PRTs, bypass Intune device management controls, and circumvent MFA. This entire attack lifecycle was consolidated into Entraith — an offensive framework built from scratch by the research team and set to be released publicly at DEF CON 34 (https://github.com/bl4cksku11/entraith) — enabling device code attacks, token renewal, email and app inspection, token exfiltration, and persistence generation from a single interface.

This talk is not about a single CVE or a niche edge case. It is a comprehensive offensive research presentation covering the full spectrum of attack techniques against Microsoft Entra ID — from the very first foothold to deeply rooted, multi-vector persistence that survives incident response.

We will demonstrate, live, how an attacker moves through every phase of an Entra ID compromise:

**Initial access and token theft:** We begin with Device Code Flow phishing — abusing Microsoft's own authentication protocol to harvest valid tokens without ever touching a password. We then escalate with PowerShell process hijacking (GrabTokenAzureAD) to intercept live session tokens, and culminate with Sliver BOF-based extraction of the Primary Refresh Token (PRT) directly from memory — stealthy, silent, and anti-malware evasive. These three techniques alone demonstrate that MFA and Conditional Access are not the guarantees organizations believe them to be.

**Bypassing Intune and MFA:** Purpose-built tools developed during this research extract local PRTs, bypass Intune device compliance controls, and circumvent MFA enforcement at the token layer — not through social engineering, but through direct abuse of Microsoft's identity platform mechanics. Attackers operating from non-enrolled or non-compliant devices can achieve full Tenant access that Conditional Access policies are designed to prevent.

**Persistence across 10 vectors:** Once inside, we deploy a "Survival Kit" of 10 chained persistence mechanisms — camouflaged App Registrations, long-lived secrets and certificates, backdoor accounts, strategic role assignments, privileged group inheritance, admin mailbox delegation, inbox-rule-based exfiltration of credentials and MFA codes, OAuth consent grants to external applications, and Temporary Access Pass generation for on-demand MFA bypass. No single blue team action — password reset, MFA enforcement, device wipe — removes all of them simultaneously.

**Entraith — built by us, released at DEF CON:** The centerpiece of this talk is Entraith (https://github.com/bl4cksku11/entraith), an offensive framework designed and built from the ground up by the speakers specifically for this research. Entraith is not a wrapper around existing tools — it is original work, developed over months of hands-on red team engagements against real Microsoft 365 environments. It unifies every technique demonstrated in this talk into a single operator interface: device code phishing, PRT extraction from memory, Intune compliance bypass, token renewal and exfiltration, email and application enumeration, and the full 10-step persistence deployment chain. DEF CON 34 will be the moment Entraith is released to the public. Attendees will be among the first to access the tool, its documentation, and the full methodology behind it — making this talk a genuine first-look at original research with immediate real-world impact.

**Why this matters for Cloud Village:** The Microsoft 365 and Entra ID ecosystem is the identity backbone of the majority of enterprise organizations worldwide. The techniques presented here are not theoretical — they are being used by real threat actors today. Defenders in the room will leave with concrete detection opportunities and an understanding of exactly which log sources and control gaps allow this attack chain to succeed undetected. Red teamers will leave with a working tool and a fully documented methodology. This talk delivers both offensive depth and defensive utility in a single session, and the live demos ensure no attendee has to take our word for it.
