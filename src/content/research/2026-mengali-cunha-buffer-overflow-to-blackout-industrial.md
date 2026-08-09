---
title: "From Buffer Overflow to Blackout: Chaining Attacks Against Industrial Systems"
date: "2026-08-09"
people:
  - br-fernando-mengali
  - br-thiago-cunha-da-silva
event: red-team-village-defcon-2026
field: offensive-security
type: workshop
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
---
This presentation takes a practical, demo-driven approach to exploitation, demonstrating how a buffer overflow vulnerability can still serve as an entry point to compromise modern industrial infrastructures. The session is approximately 90% hands-on and 10% theoretical.

The talk walks through the full attack chain, starting from initial exploitation and progressing to the development and execution of multistage shellcode. This shellcode establishes communication with a remote Command and Control (C2) server, retrieves an additional payload, and executes it directly in memory, bypassing traditional detection mechanisms.

Once the environment is compromised, the session demonstrates how an attacker can gain full remote control, enabling command execution, lateral movement, and exfiltration of sensitive data, including critical assets such as licenses and proprietary industrial information.

The talk also includes interaction with real-world devices such as RTUs (Remote Terminal Units), showing how malicious actions can directly impact industrial operations. In critical scenarios, this can lead to disruptions in essential services, including failures in energy systems and potential blackouts.

The content is based on real-world pentesting experience conducted in an energy sector company in Brazil, providing a practical and applied perspective on risks in ICS/SCADA environments.

The goal is to demonstrate how modern attacks combine vulnerabilities with advanced techniques, reinforcing the need for robust security strategies to protect critical infrastructure.
