---
title: "AD Under the Microscope"
date: "2026-05-06"
people:
  - pe-omar-palomino
event: 8dot8-unreal-peru-2026
field: offensive-security
type: talk
---
¿Cuántos domain admins tiene tu organización en este momento? ¿Estás seguro? El Active Directory sigue siendo el objetivo número uno de los atacantes en entornos corporativos, y sin embargo, la mayoría de las organizaciones lo auditan de forma manual, esporádica y reactiva. Los ataques modernos no explotan una sola vulnerabilidad: encadenan permisos ACL aparentemente inocentes, cuentas olvidadas y delegaciones heredadas hasta construir una ruta silenciosa hacia el control total del dominio.

En esta charla presentamos AD Under the Microscope, un framework de auditoría continua basado en Inteligencia Artificial capaz de:

- Detectar en tiempo real la adición de usuarios a grupos privilegiados como Domain Admins, Enterprise Admins y grupos delegados.
- Analizar y correlacionar cadenas de ACL entre múltiples objetos del directorio, identificando rutas de escalada de privilegios que ninguna herramienta tradicional mapea de forma automática.
- Priorizar el riesgo clasificando configuraciones peligrosas según su potencial de explotación real.
- Generar reportes accionables en lenguaje natural para equipos técnicos y ejecutivos.

Más allá de la demo técnica, discutiremos la hoja de ruta real para llevar esta solución a producción: desde el uso de LLMs en la nube hasta la viabilidad de entrenar modelos propios con datos de AD para entornos con restricciones de privacidad.
