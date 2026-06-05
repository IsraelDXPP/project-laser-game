const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');
const fs = require('fs');

const appDir = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.atlas': 'text/plain',
  '.xml': 'text/xml',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Strip query string and hash
      const urlPath = req.url.split('?')[0].split('#')[0];
      const filePath = path.join(appDir, decodeURIComponent(urlPath));
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, data) => {
        if (err) {
          // Log the 404 to the terminal for debugging
          console.error('[404] Requested:', urlPath);
          console.error('[404] Looked for:', filePath);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found: ' + filePath);
          return;
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
      });
    });

    server.listen(0, '127.0.0.1', () => {
      resolve(server.address().port);
    });
  });
}

async function createWindow() {
  const port = await startServer();

  const win = new BrowserWindow({
    width: 850,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    },
    title: 'Project Laser - Reengineered',
    autoHideMenuBar: true
  });

	// win.webContents.openDevTools({ mode: 'detach' });

	win.webContents.on('did-start-loading', () => {
	  console.log('[Electron] Started loading');
	});

	win.webContents.on('did-finish-load', () => {
	  console.log('[Electron] Finished loading');
	});

	win.webContents.on('did-fail-load', (
	  event,
	  errorCode,
	  errorDescription,
	  validatedURL
	) => {
	  console.error('[Electron] FAIL LOAD');
	  console.error('Code:', errorCode);
	  console.error('Description:', errorDescription);
	  console.error('URL:', validatedURL);
	});

	win.webContents.on('render-process-gone', (event, details) => {
	  console.error('[Electron] Renderer crashed');
	  console.error(details);
	});

	win.webContents.on('unresponsive', () => {
	  console.error('[Electron] Renderer unresponsive');
	});

	win.webContents.on('console-message', (
	  event,
	  level,
	  message,
	  line,
	  sourceId
	) => {
	  console.log(
		`[Renderer L${level}] ${message} (${sourceId}:${line})`
	  );
	});

	win.webContents.on('did-stop-loading', () => {
	  console.log('[Electron] Loading stopped');
	});

	win.loadURL(`http://127.0.0.1:${port}/index.html`);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
