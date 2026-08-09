---
title: "Breaking BIOS in ATMs"
date: "2026-08-07"
people:
  - mx-arnold-morales
event: payment-village-defcon-2026
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://www.paymentvillage.org/
---
The analysis begins at Ring -3, advancing toward the positive rings. Starting from the on-screen user perspective imposes too many limitations. The shift in approach was deliberate: rather than assuming a conventional attack vector such as connecting an external device or performing a kiosk-level bypass, the decision was made to start from the deepest layers of the system. This compromise is detected for the following reason:

- DMA protection exists at the BIOS level.

The goal of this compromise is to activate PCI/PCIe through BIOS in order to perform a DMA. This section will be referred to as "BIOS Unprotection."

How was this achieved? Two methods were identified:

- A bridge was found that triggers a BIOS configuration reset.
- BIOS duplication with encryption validation bypass (enables both Downgrade and Upgrade).

DMA or complete chain will not be shown since it is a delicate topic, but BIOS research will be deepened since it does not only apply to ATMs.
