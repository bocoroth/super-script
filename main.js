const { app, BrowserWindow, ipcMain, IpcMessageEvent, Menu, dialog } = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
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

  mainWindow.toggleDevTools() // for debugging

  mainWindow.on('closed', function() {
    mainWindow = null
  })

  // OSX menu
  if (process.platform === 'darwin') {
    const template = [
      {
        label: 'Hypertitles',
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

    const osxMenu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(osxMenu)
  }

  // no menu for Win/Linux
  mainWindow.removeMenu()
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

ipcMain.on('hotkeyclose', function() {
  mainWindow.close()
  mainWindow = null
})

ipcMain.on('getFonts', (event, arg) => {
  const fonts = systemFonts.getFonts().then(
    res => {
      mainWindow.webContents.send('getFontsResponse', res)
    },
    err => console.warn('Error loading system fonts')
  )
})

ipcMain.handle('loadFilePath', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    filters: [{ name: 'Hypertitles Scripts', extensions: ['json'] }],
    title: 'Open Script',
    properties: ['openFile']
  })

  if (result === undefined || result['canceled'] === true) {
    console.info('No load file selected')
    return
  } else {
    if (typeof result['filePaths'] === 'undefined') {
      console.warn(`Couldn't find filepath from dialog box.`)
      return
    }

    const filePath = result['filePaths'][0]

    return filePath
  }
})

ipcMain.handle('importFilePath', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Import Script',
    properties: ['openFile']
  })

  if (result === undefined || result['canceled'] === true) {
    console.info('No load file selected')
    return
  } else {
    if (typeof result['filePaths'] === 'undefined') {
      console.warn(`Couldn't find filepath from dialog box.`)
      return
    }

    const filePath = result['filePaths'][0]

    return filePath
  }
})

ipcMain.handle('getSaveFilePath', async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [{ name: 'Hypertitles Scripts', extensions: ['json'] }],
    title: 'Save Script As',
    properties: ['createDirectory', 'showOverwriteConfirmation']
  })

  if (result === undefined || result['canceled'] === true) {
    console.info('No save file selected')
    return
  } else {
    if (typeof result['filePath'] === 'undefined') {
      console.warn(`Couldn't find filepath from dialog box.`)
      return
    }

    let filePath = result['filePath']

    if (!filePath.endsWith('.json')) {
      filePath += '.json'
    }

    return filePath
  }
})

async function readLoadedFile(filePath) {
  return fs.promises.readFile(filePath, 'utf-8')
}

ipcMain.handle('loadFile', async (e, filePath) => {
  if (filePath === 'assets/default.json') {
    // handle os file pathing
    filePath = `${__dirname}${path.sep}dist${path.sep}assets${path.sep}default.json`
  }

  const result = await readLoadedFile(filePath)
  if (result === undefined) {
    console.warn(`Error loading file ${filePath}`)
    return
  }
  return result
})

ipcMain.handle('importFile', async (e, filePath) => {
  const result = await readLoadedFile(filePath)
  if (result === undefined) {
    console.warn(`Error loading file ${filePath}`)
    return
  }
  return result
})

ipcMain.handle('saveFile', async (e, script, filePath = null) => {
  let result = 'File save failed.'

  if (filePath) {
    if (filePath.startsWith('assets' + path.sep + 'default.json')) {
      filePath = 'dist' + path.sep + filePath
    }

    if (!path.isAbsolute(filePath)) {
      filePath = __dirname + path.sep + filePath
    }

    try {
      result = fs.writeFileSync(filePath, JSON.stringify(script, null, 2), 'utf-8')
    } catch (e) {
      console.log(e)
      console.log('Failed to save the file!')
    }
  }
  return result
})

ipcMain.on('ping', event => {
  event.sender.send('pong')
})
