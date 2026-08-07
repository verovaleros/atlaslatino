---
title: "Jackpoting? Bypass de EDR? - Hacking ATM"
date: "2026-08-07"
people:
  - mx-arnold-morales
event: la-villa-hacker-defcon-2026
field: offensive-security
type: talk
links:
  - label: View official session
    url: https://lavillahacker.com/team/arnold-morales/
---
En muchas ocasiones cómo pentesters nos aferramos a la idea de buscar multiples técnicas de ataque de manera "virtual", buscando software especializado o creando scripts que nos ayuden a identificar una vulnerabilidad para acceder a un programa o dispositivo en el que nos enfoquemos, pasamos tanto tiempo enfrente de nuestra pantalla, lanzando comandos a lo bastardo hasta ver que podemos encontrar que a veces ignoramos que existen soluciones alternativas y no simplemente de manera virtual, sino de una manera en que podemos tocar, armar y desarmar (esto suele ser menos buscado por pentester, entonces tambien hay menos documentacion).

El proceso de arranque de Windows, conocido como boot process, se divide en varias fases como ya lo vimos: PreBoot (inicialización del firmware BIOS/UEFI y POST), Boot Manager (carga de bootmgr o bootmgfw.efi), OS Loader (ejecución de winload.exe para cargar el kernel) y Kernel Initialization (carga de ntoskrnl.exe y hal.dll, inicialización de controladores y servicios). Finalmente, se inicia winlogon.exe para presentar la interfaz de usuario. Este proceso permite pasar de un estado apagado a un sistema operativo funcional mediante una secuencia jerárquica y verificada.

Respecto a los EDR (Endpoint Detection and Response) basados en el kernel, operan en modo kernel, el nivel más privilegiado del sistema (algunos juegan en UEFI), lo que les permite supervisar actividades de bajo nivel como llamadas al sistema, manipulación de memoria, carga de controladores y acceso a archivos. Al ejecutarse en este modo, los EDR pueden detectar y bloquear amenazas avanzadas como rootkits o malware persistente que intentan eludir las protecciones del modo usuario. Su integración profunda con el kernel les permite realizar monitoreo en tiempo real, análisis de comportamiento y respuesta inmediata ante actividades sospechosas durante y después del arranque.

Normalmente los EDRs se encuentran en KERNEL pero como lo mencione, existen otros que se encuentran en UEFI y si recordamos como funciona windows atrás de UEFI esta SMM entonces es algo un poco mas dicil.

Esta charla es pensada para personas interesadas no solo en ATMs y una simple dispensación si no la vista mas alla, el análisis y toda la experiencia adquirida cuando te enfrentas a ellos.
