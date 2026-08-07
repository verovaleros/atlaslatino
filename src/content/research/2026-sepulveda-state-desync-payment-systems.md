---
title: "State Desync as a Weapon: Breaking Transactional Integrity in Payment Systems (ESP)"
date: "2026-08-07"
people:
  - cl-santiago-sepulveda
event: la-villa-hacker-defcon-2026
field: appsec-supply-chain
type: talk
links:
  - label: View official session
    url: https://lavillahacker.com/team/santiago-sepulveda/
---
El Price Tampering no es un simple cambio de parámetro ni un bug, es una falla de arquitectura que permite alterar el valor de una transacción sin romper ningún control tradicional en cualquier sistema que procese pagos, provocando fraude en diferentes industrias y negocios. En esta charla abordaré cómo un atacante modela el flujo de compra y pago completo, identifica puntos de desincronización entre cliente, backend y pasarela, y explota la ausencia de invariantes de negocio server-side para manipular el valor final de una transacción sin necesidad de CVEs, exploits ni malware. Basado en una investigación propia con casos reales autorizados y anonimizados en entornos de banca, retail y fintech en LATAM, presentaré una taxonomía de tres patrones de ataque recurrentes y un modelo defensivo concreto llamado FinSecure, sustentado en el principio del backend soberano, donde el precio nunca puede nacer fuera del servidor. La audiencia se irá con una visión diferente del problema y herramientas accionables para detectarlo y eliminarlo por diseño.
