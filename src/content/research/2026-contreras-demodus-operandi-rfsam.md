---
title: "Demodus Operandi (Cómo tres rf-hacks en tres bandas terminaron siendo una metodología)"
date: "2026-08-07"
people:
  - mx-eduardo-contreras
event: la-villa-hacker-defcon-2026
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://lavillahacker.com/team/eduardo-contreras/
---
Hay muchas herramientas para hackear RF y mucho conocimiento regado en talks, repos y la cabeza de la gente. Lo que no hay es un mapa. Cuando te paras frente a un dispositivo o señal, ¿por dónde empiezas? ¿y cómo sabes qué se te escapó? Esta charla cubre tres investigaciones reales, cada una en una tecnologia distinta. Primero BLE, sniffeando advertising packets terminé auditando una sala y encontré 6 de 85 dispositivos completamente controlables, incluso con LE Secure Connections habilitado. Después LoRaWAN, capturé 51,304 frames en US915. El 89.3% eran JoinRequests: una red entera fallando en unirse, visible sin transmitir un solo paquete, red que no podia encontrar con un SDR. Y al final LTE, encontrar la celda correcta en México, entender el OFDM, y extraer metadatos en pasivo. Tres casos, tres analisis distintos. Pero siempre sobre las mismas capas: espectro, señal, enlace, cripto, ataque. Ya seguía una metodología, solo no la había nombrado. Así nació RFSAM (Radio Frequency Security Assessment Methodology): una referencia abierta, estructurada, que organiza lo que OSSTMM, BSAM y la comunidad SDR ya construyeron, en algo que puedes navegar. No pretende inventar nada, pretende ser un mapa.
