import { app, BrowserWindow, ipcMain, nativeImage, screen } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

const appIcon = nativeImage.createFromPath(path.join(process.env.APP_ROOT, 'resources', 'icon.png'))

let win: BrowserWindow | null
let sageWin: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: appIcon,
    minWidth: 1024,
    minHeight: 680,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  win.maximize()

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

function createSageWindow() {
  if (sageWin && !sageWin.isDestroyed()) {
    sageWin.focus()
    return
  }

  const display = screen.getPrimaryDisplay()
  const { width: screenW, height: screenH } = display.workAreaSize

  sageWin = new BrowserWindow({
    width: 700,
    height: screenH,
    x: screenW - 700,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    skipTaskbar: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Allow clicks to pass through transparent areas
  sageWin.setIgnoreMouseEvents(false)

  const sageHash = '#/sage'
  if (VITE_DEV_SERVER_URL) {
    sageWin.loadURL(`${VITE_DEV_SERVER_URL}${sageHash}`)
  } else {
    sageWin.loadFile(path.join(RENDERER_DIST, 'index.html'), { hash: '/sage' })
  }

  sageWin.on('closed', () => {
    sageWin = null
  })
}

ipcMain.on('open-sage-window', () => {
  createSageWindow()
})

ipcMain.on('close-sage-window', () => {
  if (sageWin && !sageWin.isDestroyed()) {
    sageWin.close()
    sageWin = null
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  if (process.platform === 'darwin') {
    app.dock.setIcon(nativeImage.createFromPath(path.join(process.env.APP_ROOT, 'resources', 'icon.png')))
  }
  createWindow()
})
