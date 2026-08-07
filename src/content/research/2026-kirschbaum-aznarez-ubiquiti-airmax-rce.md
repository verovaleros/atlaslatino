---
title: "Root From Kilometers Away: Ubiquiti AirMax RCE"
date: "2026-08-08"
people:
  - ar-federico-kirschbaum
  - ar-gaston-aznarez
event: defcon-34
field: malware-reversing
type: talk
links:
  - label: View official session
    url: https://defcon.org/html/defcon-34/dc-34-speakers.html#content_66618
---
You don't realize it until you see them; they're everywhere. From Wireless ISP links to the frontline of modern warfare. But nobody found anything? The devices behind those links are Ubiquiti AirMAX: critical infrastructure on a 17-year-old Linux kernel and a custom 802.11 extension built on "security by obscurity." So we took it apart. This talk covers our reverse engineering of the AirMAX protocol, AirOS, and the kernel modules behind this proprietary mode. It rides on 802.11 Information Elements that look encrypted, but we'll show why they aren't. What we found: two critical vulnerabilities (CVE-2026-21639, CVE-2026-21638) across airMAX AC, airMAX M, airFiber, and GigaBeam, over 50 devices. These are the bugs from the movies: Over-The-Air, unauthenticated, kernel-privilege RCE. No network access, just line of sight. They affect every AirMAX device ever shipped. We disclosed them through Ubiquiti's bug bounty program. The bugs were rated "Adjacent", except adjacent here means kilometers away. The same hardware can be turned around and pointed at the problem: we'll repurpose these devices as recon tools and release open-source software to locate AirMAX networks in the wild. This talk is about our journey, our tooling, and the state of security.
