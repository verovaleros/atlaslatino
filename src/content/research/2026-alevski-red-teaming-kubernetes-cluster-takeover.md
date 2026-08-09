---
title: "Red Teaming Kubernetes: From App-Level CVEs to Full Cluster Takeover"
date: "2026-08-08"
people:
  - mx-lenin-alevski
event: red-team-village-defcon-2026
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
---
Kubernetes is the de facto operating system of the cloud, and more and more organizations are running their workloads on Kubernetes. While Kubernetes offers many benefits, it also introduces new security risks, such as cluster misconfiguration, leaked credentials, cryptojacking, container escapes, and vulnerable clusters.

In this workshop, attendees will learn how to attack Kubernetes clusters by simulating a real-world adversary exploiting one of the most recent vulnerabilities in the ecosystem: IngressNightmare (CVE-2025-1974). Participants will practice exfiltrating service account tokens and credentials, performing lateral movement, escalating privileges by targeting common applications deployed in Kubernetes environments, and ultimately compromising the entire cluster.
