---
title: "Lowering the Orbit: Exploiting Satellite Protocols and communications via Software-Defined-Radio and GS"
date: "2026-08-07"
people:
  - cr-romel-marin
event: defcon-34
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://defcon.org/html/defcon-34/dc-34-speakers.html#content_66594
---
This talk examines the attack surface created by modern satellite communications as the industry moves toward commercial off-the-shelf hardware and standardized protocols such as CCSDS and Space Packet Protocol. It moves beyond simple RF command injection into a broader exploitation methodology for space links, ground stations, and satellite subsystems.

The session demonstrates protocol fuzzing, GNS spoofing, command exploitation over LoRa and FSK, lateral movement from a compromised RF link to an internal CAN bus, and ground-segment pivoting against mission operations infrastructure. The work uses PWNSAT and PWNCUBE as an open-source satellite exploitation ecosystem for simulating an end-to-end mission under attack.
