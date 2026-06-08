const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const electronDir = path.join(__dirname, '..', 'dist_for_electron');

// 1. Recreate clean electron dist directory
if (fs.existsSync(electronDir)) {
  fs.rmSync(electronDir, { recursive: true, force: true });
}
fs.mkdirSync(electronDir);

// 2. Copy the bundled dist web files into electron dist
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
copyRecursiveSync(distDir, electronDir);

// 3. Copy electron-main.js
fs.copyFileSync(
  path.join(__dirname, '..', 'electron-main.js'),
  path.join(electronDir, 'electron-main.js')
);

// 4. Create a minimal package.json for the Electron app
const pkg = {
  name: "project-laser-game",
  version: "1.0.0",
  main: "electron-main.js"
};
fs.writeFileSync(path.join(electronDir, 'package.json'), JSON.stringify(pkg, null, 2));

console.log('Electron packaging directory prepared successfully at dist_for_electron/');
