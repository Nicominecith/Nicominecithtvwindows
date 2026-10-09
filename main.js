const { app, BrowserWindow, Menu, shell, session, globalShortcut } = require('electron');
const path = require('path');

const BASE_W = 1920; // die App ist auf 1920px Breite gebaut -> Zoom skaliert sie auf jede Fenstergröße
let win;

if (!app.requestSingleInstanceLock()) { app.quit(); }
else app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

function fit() {
  if (!win || win.isDestroyed()) return;
  const [w] = win.getContentSize();
  win.webContents.setZoomFactor(Math.max(0.3, w / BASE_W));
}

function create() {
  win = new BrowserWindow({
    width: 1280, height: 760, minWidth: 640, minHeight: 400,
    backgroundColor: '#120d14',
    title: 'Nicominecith TV',
    icon: path.join(__dirname, 'build', 'icon.ico'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      // Die Web-App spricht direkt mit Twitch/7TV/BTTV (wie auf webOS "allowCrossDomain"),
      // daher keine CORS-Sperre. Es werden nur die eigenen lokalen Dateien geladen.
      webSecurity: false,
      backgroundThrottling: false
    }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.once('ready-to-show', () => { fit(); win.show(); });
  win.on('resize', fit);
  win.webContents.on('did-finish-load', fit);

  // Externe Links im Standardbrowser öffnen
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } });
  // Zurück-Taste der Maus = Esc der App (Zurück)
  win.on('app-command', (e, cmd) => { if (cmd === 'browser-backward') win.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'Escape' }); });
}

app.whenReady().then(() => {
  // User-Agent ohne "Electron", damit Twitch-Endpunkte normal antworten
  session.defaultSession.setUserAgent(session.defaultSession.getUserAgent().replace(/\s*Electron\/\S+/, ''));
  create();
  globalShortcut.register('F11', () => win && win.setFullScreen(!win.isFullScreen()));
  globalShortcut.register('F5', () => win && win.webContents.reload());
});
app.on('will-quit', () => globalShortcut.unregisterAll());
app.on('window-all-closed', () => app.quit());
