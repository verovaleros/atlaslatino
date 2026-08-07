---
title: "Before the SIEM Blinks: How AI Memory Turns Alerts into Intelligence"
date: "2026-08-08"
people:
  - ec-luis-pazmino
event: la-villa-hacker-defcon-2026
field: ai-security
type: workshop
links:
  - label: View official session
    url: https://lavillahacker.com/team/luis-pazmino/
---
La mayoría de los SOCs son reactivos por diseño: los eventos llegan, se almacenan, se correlacionan horas después, y en el mejor de los casos un analista los revisa cuando puede. Este workshop rompe ese modelo. Presentamos una arquitectura SOC-less impulsada por IA donde la detección ocurre en línea, antes de que los datos lleguen al SIEM, usando reglas Sigma traducidas a lógica ejecutable en Groovy. Cuando una regla hace match, el evento se enriquece al instante con contexto de usuario, criticidad del activo, estructura de procesos y técnicas asociadas a MITRE ATT&CK.

El diferenciado de nuestra propuesta es la memoria. Cada alerta, ticket, resolución, triaje de analista y falso positivo alimenta un índice recurrente. los agentes consultan ese historial para determinar si una detección es nueva, recurrente, vinculada a un activo crítico o parte de un patrón conocido, luego generan el ticket, sugieren severidad, recomiendan la contención y, en escenarios controlados la ejecutan. El resultado del flujo es la detección y respuesta inicial medidas en segundos, no en turnos de analistas.
