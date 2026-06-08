import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'version/20200825-121253',
          dest: '',
        },
        {
          src: 'src/deobfuscated.js',
          dest: '',
        },
      ],
    }),
    {
      name: 'move-js-files',
      closeBundle() {
        const distDir = 'dist';
        const srcDir = path.join(distDir, 'src');

        if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });

        const deobPath = path.join(distDir, 'deobfuscated.js');

        if (fs.existsSync(deobPath)) {
          fs.copyFileSync(deobPath, path.join(srcDir, 'deobfuscated.js'));
          fs.unlinkSync(deobPath);
        }
      },
    },
  ],
});
