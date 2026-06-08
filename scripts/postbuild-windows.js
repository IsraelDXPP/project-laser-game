const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'src-tauri', 'target', 'release');
const outDir = path.join(__dirname, '..', 'dist_windows');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Copiar el ejecutable nativo
const exePath = path.join(targetDir, 'project-laser.exe');
if (fs.existsSync(exePath)) {
    fs.copyFileSync(exePath, path.join(outDir, 'project-laser.exe'));
    console.log('Copiado: project-laser.exe');
}

// Copiar el instalador NSIS
const nsisPath = path.join(targetDir, 'bundle', 'nsis', 'project-laser_0.1.0_x64-setup.exe');
if (fs.existsSync(nsisPath)) {
    fs.copyFileSync(nsisPath, path.join(outDir, 'project-laser-setup.exe'));
    console.log('Copiado: project-laser-setup.exe');
}

// Eliminar la carpeta caché gigante de Rust (target)
const targetRoot = path.join(__dirname, '..', 'src-tauri', 'target');
if (fs.existsSync(targetRoot)) {
    console.log('Eliminando la caché de compilación de 1GB...');
    fs.rmSync(targetRoot, { recursive: true, force: true });
}

console.log('\n======================================================');
console.log('¡Limpieza completa! La caché gigante ha sido borrada.');
console.log('Tus archivos finales est\u00e1n guardados en la carpeta: /dist_windows/');
console.log('======================================================\n');
