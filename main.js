const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const SystemFonts = require('system-font-families').default

const systemFonts = new SystemFonts()

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#303030',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: 'file:'
    })
  )

  mainWindow.maximize()

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

ipcMain.on('getFonts', (event, arg) => {
  const fonts = systemFonts.getFonts().then(
    res => {
      mainWindow.webContents.send('getFontsResponse', res)
    },
    err => console.warn('Error loading system fonts')
  )
})

// OSX fixes
if (process.platform === 'darwin') {
  const template = [
    {
      label: 'FromScratch',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: function() {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:'
        }
      ]
    }
  ]

  const osxMenu = menu.buildFromTemplate(template)
  menu.setApplicationMenu(osxMenu)
}
