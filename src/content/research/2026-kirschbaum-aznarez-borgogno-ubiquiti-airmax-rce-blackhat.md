---
title: "Root From Kilometers Away: Ubiquiti AirMax RCE"
date: "2026-08-06"
people:
  - ar-gaston-aznarez
  - ar-federico-kirschbaum
  - ar-dan-borgogno
event: blackhat-usa-2026
field: malware-reversing
type: talk
links:
  - label: View official session
    url: https://blackhat.com/us-26/briefings/schedule/#root-from-kilometers-away-ubiquiti-airmax-rce-52948
---
You don't realize it until you see them; they are everywhere. From Wireless ISPs links, to the frontline of modern warfare. But no one found anything?

Long-haul WiFi Links, specifically Ubiquiti AirMax. These devices are a critical part of networks running a 17 year old Linux kernel and a custom 802.11 extension that relies on the well-known "security by obscurity".

This Briefing is about the reverse engineering of Ubiquiti's Airmax protocol, its AirOS, and its kernel modules in charge of this proprietary wireless mode. This is implemented on top of IEEE 802.11 Information Elements that look encrypted, but we will shed light and show you why they aren't.

We found these devices were insecure, and we have evidence. Two critical vulnerabilities (CVE-2026-21639 and CVE-2026-21638) that affect seven device families, including airMAX AC, airMAX M, airFiber and GigaBeam platforms (over 50 currently-sold devices). These vulnerabilities are like the ones in movies, Over-The-Air unauthenticated remote code execution with kernel privileges, no network access, just line of sight. The bugs found affect all Airmax devices since inception.

Vulnerabilities found by this research were responsibly reported through the official bug bounty program. They were rated in a lower tier, as "Adjacent", but this bug can be exploited kilometers away.

Nonetheless, we will show how to use the same devices as recon tools and provide another open-source software to analyze and locate networks using this protocol.

This Briefing is not only for showing vulnerabilities, but we also want you to know the state of security in these devices. We want to share our journey and share the tooling and discoveries we made along the way.

**Takeaway**

- Reconnaissance and network mapping: They will learn how to identify, enumerate, and map networks composed of these devices.
- Remote exploitation of WISP infrastructure: Attendees will learn how we can exploit 2 new vulnerabilities at range against deployed wireless devices.
- A roadmap for future research: We highlight device families we believe are still vulnerable and largely unexplored, giving attendees clear starting points to keep digging.
