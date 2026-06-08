# Brawl Stars - Project Laser (Desktop & Mobile)

Este repositorio contiene una versión re-ingenierizada y extraída de "Project Laser" (el easter egg de 8-Bit de Brawl Stars), adaptada para funcionar de manera nativa en múltiples plataformas.

El código base original estaba fuertemente ofuscado, pero ha sido desofuscado y reestructurado para permitir su compilación en Windows y Android usando tecnologías modernas.

## Arquitectura

- **Motor Principal**: HTML5 / JavaScript (Vite como bundler)
- **Windows (Escritorio)**: Tauri (Rust + WebView2). Esto genera un ejecutable extremadamente ligero (~5-10 MB) que usa el motor web nativo de Windows.
- **Android (Móvil)**: Capacitor. Empaqueta el juego como una aplicación nativa de Android que usa los controles táctiles originales del juego.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (Para gestionar dependencias y Vite)
- [Rust](https://www.rust-lang.org/) (Obligatorio para compilar la versión de Windows con Tauri)
- [Android Studio](https://developer.android.com/studio) (Para compilar la versión de Android)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/IsraelDXPP/project-laser-game.git
   cd project-laser-game
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Compilación

### Windows (Tauri)
Para generar el ejecutable nativo y ultra-ligero para Windows:

```bash
npm run build:windows
```
El ejecutable resultante se encontrará en `src-tauri/target/release/project-laser.exe`.

### Android (Capacitor)
Para sincronizar el código web y compilar el APK en modo Debug:

```bash
npm run build:android
```
El APK se generará en `android/app/build/outputs/apk/debug/app-debug.apk`. 
*(También puedes abrir Android Studio en la carpeta `android` para ejecutarlo en un emulador o compilar una versión Release).*

### Navegador / Web (Desarrollo)
Para jugar el juego localmente en tu navegador web y hacer pruebas:

```bash
npm run dev
```

## Notas Importantes sobre el Código

- **`src/deobfuscated.js`**: Este es el archivo principal del juego, completamente desofuscado y adaptado. Se carga usando un módulo ES para permitir la compatibilidad con el servidor HTTP interno.
- **Controles de Android**: Se eliminó `controls.js` de la compilación de Android para evitar que interfiera con los controles táctiles nativos que el juego ya incluye.

## Licencia y Uso

**IMPORTANTE:** Este proyecto es un fork de un volcado (dump) del juego original que nunca fue descompilado. La licencia de este repositorio es estrictamente restrictiva.
- Queda totalmente prohibido el uso sin dar créditos.
- Quienes usen este código y no den créditos, serán sancionados. 
- Los derechos originales del juego y assets pertenecen a Supercell.
