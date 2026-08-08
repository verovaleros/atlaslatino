---
title: "ROP for the Web: Smuggling XSS, SQLi, and Web Shells Past Every WAF Using Compression Dictionaries"
date: "2026-08-09"
people:
  - mx-lenin-alevski
event: appsec-village-defcon-2026
field: offensive-security
type: arsenal
links:
  - label: View official session
    url: https://appsecvillage.com/events/dc-2026/rop-for-the-web-smuggling-xss-sqli-and-web-shells-past-every-waf-using-compression-dictionaries-1250560
---
Compression Dictionary Transport (RFC 9842) shipped in Chrome 130+ in 2025. Any JavaScript asset designated as a dictionary becomes a set of gadgets an attacker can chain into responses that bypass signature-based WAFs and IDSes. gadget-scanner is the a tool to evaluate that surface: drop in a candidate dictionary and a payload, and it reports how much of the payload hides inside backreferences and how much leaks as literal bytes on the wire. At the table you will score real-world JS libraries as attack primitives, generate the DCB blob with `brotli -D`, and watch the side-by-side: the raw bytes a WAF would see vs. the payload a browser would execute
