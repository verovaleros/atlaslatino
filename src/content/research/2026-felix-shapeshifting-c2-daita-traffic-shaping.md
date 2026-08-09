---
title: "Shapeshifting C2: Applying DAITA Traffic Shaping to Defeat DPI and DLP Detection"
date: "2026-08-07"
people:
  - br-rafael-felix
event: red-team-village-defcon-2026
field: offensive-security
type: workshop
links:
  - label: View official session
    url: https://redteamvillage.io/schedule/
---
ML-based DPI and DLP solutions have made signature evasion insufficient. Modern enterprise detection analyzes packet size distributions, inter-packet timing, and burst patterns to fingerprint C2 traffic regardless of how well headers and TLS certificates are spoofed.

This talk demonstrates how three techniques from the VPN privacy research space - originally developed to defeat traffic analysis against Tor and Mullvad, can be adapted for offensive C2 operations:

1. Constant-size packet morphing: forcing all frames to a fixed MTU-aligned size removes the packet-size fingerprint that ML classifiers depend on;

2. Cover traffic injection: dummy packets sent at Poisson-distributed or adaptive intervals make real beacon timing statistically invisible;

3. Probabilistic pattern distortion: Maybenot-inspired state machines inject cover bursts alongside real packets, destroying recognizable C2 sequences;

We then will see how layering these techniques with application-layer malleable profiles (traffic impersonating Microsoft Graph, Slack, or Okta) and bonus: indirect transports like cloud storage dead-drops (S3, OneDrive) creates C2 channels that defeat detection at every layer simultaneously - behavioral, flow, and application.

Attendees leave with a concrete mental model for building evasion stacks that go beyond header manipulation.
