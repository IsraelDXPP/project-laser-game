# Project Laser - Reengineered

Easter egg from Supercell's Brawl Stars working in a desktop browser with arrow key and space bar controls:  
[Original Demo (Obfuscated)](https://andrei-paraschiv.github.io/project-laser-game/)

## Reverse Engineering & Decompilation

Este proyecto ha sido completamente desofuscado y sometido a ingeniería inversa. Originalmente, la lógica del juego estaba minificada y ofuscada en un archivo empaquetado de ~1.9 MB (`main.js`). 

A través de herramientas de ingeniería inversa, el código fuente original ha sido extraído, desofuscado y restaurado en un formato legible (`src/deobfuscated.js`). Dado que el juego fue programado originalmente usando el compilador **Haxe**, logramos recuperar los nombres originales de las funciones y variables esenciales para la lógica del juego (por ejemplo: `collectCoin`, `finishLevel`, `triggerBossBattle`, `hurt`, `score`, entre otras).

## Development Setup

El proyecto ha sido modernizado y ahora utiliza [Vite](https://vitejs.dev/) como herramienta de empaquetado y desarrollo, permitiendo hacer modificaciones a la lógica del juego y ver los resultados en tiempo real.

### Requisitos
- Node.js (v14+)
- npm

### Instalación

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Para iniciar el servidor de desarrollo local y jugar:
   ```bash
   npm run dev
   ```
   El servidor de desarrollo se levantará, usualmente en `http://localhost:5173`.

3. Para compilar una versión de producción optimizada:
   ```bash
   npm run build
   ```
   Los archivos compilados y listos para producción se generarán en la carpeta `dist`.

## Acknowledgements
Este proyecto mantiene los assets originales y la funcionalidad del minijuego oculto de Brawl Stars, pero ahora con una arquitectura de código abierto que facilita la experimentación y modificación de sus mecánicas internas.
