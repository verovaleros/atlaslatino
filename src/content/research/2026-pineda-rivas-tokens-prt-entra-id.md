---
title: "Tokens and PRT: Advanced Attacks and Persistence in Microsoft Entra ID"
date: "2026-08-07"
people:
  - pa-elzer-pineda
  - pa-jose-manuel-rivas
event: la-villa-hacker-defcon-2026
field: offensive-security
type: talk
links:
  - label: Speaker page (Elzer Pineda)
    url: https://lavillahacker.com/team/elzer-pineda/
  - label: Speaker page (Jose Manuel Rivas)
    url: https://lavillahacker.com/team/jose-rivas/
---
¿Son el MFA y el Acceso Condicional una garantía de seguridad real? En esta sesión técnica, demostraremos cómo el compromiso de un endpoint permite a un atacante saltarse las barreras de identidad tradicionales en la nube. La charla se centra en la explotación de vulnerabilidades en Microsoft Entra ID, desglosando una cadena de ataque avanzada:

- Abuso de Device Code Flow: Explotación de flujos de autenticación para acceso inicial (Demo con Entraith).
- PowerShell Hijacking: Intercepción de procesos para la obtención de tokens de sesión (GrabTokenAzureAD).
- Extracción con Sliver BOF: Uso de Beacon Object Files para la exfiltración sigilosa de tokens y del Primary Refresh Token (PRT) directamente desde la memoria, evadiendo defensas anti-malware.
- Bypass de MFA e Intune: Hemos desarrollado herramientas personalizadas para extraer PRTs locales, eludir los controles de gestión de dispositivos de Intune y saltarse la aplicación de MFA a nivel de token.

Todo este ciclo de vida de ataque ha sido consolidado en Entraith, un framework ofensivo desarrollado desde cero por nuestro equipo de investigación que será lanzado públicamente en DEF CON 34.
