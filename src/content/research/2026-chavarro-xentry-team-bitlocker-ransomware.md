---
title: "Meet XEntry Team: A powerful threat actor abusing Bitlocker for ransomware"
date: "2026-08-08"
people:
  - co-eduardo-chavarro-ovalle
event: la-villa-hacker-defcon-2026
field: incident-response
type: talk
links:
  - label: View official session
    url: https://lavillahacker.com/team/eduardo-chavarro/
---
Our GERT team was notified about a company affected by a previously unknown threat actor identified as "XEntry Team". Initially, the customer identified this threat as a hijacked LogMeIn session that allowed the attackers to activate BitLocker and encrypt the disks of every system synchronizing to the AD, but our analysis confirmed a 2 months intrusion, using a mix of clever techniques and lack of monitoring, that allowed attacker to configure a bridge to the infrastructure for:

- Recognition
- Critical assets identification
- Exfiltration
- Persistance
- ransomware deployment
- Other not so funny stuff

During this session we will present to the audience the investigation results, the techniques implemented by the threat actor, the scope of the attack from beginning to the end, and the analysis and attempts to recover affected systems.
