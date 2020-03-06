const { app, BrowserWindow, ipcMain, IpcMessageEvent, Menu, dialog } = require('electron')
const electron = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const SystemFonts = require('system-font-families').default

const systemFonts = new SystemFonts()

let mainWindow
let externalWindow

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

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('loadControl')
  })

  mainWindow.maximize()

  //mainWindow.toggleDevTools() // for debugging

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

  const electronScreen = electron.screen
  const displays = electronScreen.getAllDisplays()
  if (typeof displays[1] !== 'undefined') {
    const ext = displays[1]
    externalWindow = new BrowserWindow({
      x: ext.bounds.x,
      y: ext.bounds.y,
      width: ext.workArea.width,
      height: ext.workArea.height,
      webPreferences: {
        nodeIntegration: true
      },
      backgroundColor: '#000',
      frame: false
    })

    externalWindow.webContents.on('did-finish-load', () => {
      externalWindow.webContents.send('loadExternal')
    })

    externalWindow.maximize()

    externalWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: 'file:'
      })
    )

    //externalWindow.toggleDevTools() // for debugging
  }
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
  if (mainWindow === null) createWindow()
})

/* MISC IPC EVENTS ************************************************************/

ipcMain.on('hotkeyclose', function() {
  mainWindow.close()
  mainWindow = null
  if (typeof externalWindow.close === 'function') {
    externalWindow.close()
    externalWindow = null
  }
})

ipcMain.handle('getFonts', (event, arg) => {
  const fonts = systemFonts.getFonts().then(
    res => {
      try {
        mainWindow.webContents.send('getFontsResponse', res)
      } catch (e) {
        console.warn('Could not load system fonts: ' + e)
      }
    },
    err => console.warn('Error loading system fonts')
  )
  return fonts
})

ipcMain.on('ping', event => {
  event.sender.send('pong')
})

/* FILE PROCESSING ************************************************************/

async function readLoadedFile(filePath) {
  return fs.promises.readFile(filePath, 'utf-8')
}

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

/* EXTERNAL DISPLAY PIPE ******************************************************/

ipcMain.on('loadExternalStyles', (e, styles) => {
  externalWindow.webContents.send('loadStylesResponse', styles)
  return styles
})

ipcMain.on('loadExternalLine', (e, line) => {
  externalWindow.webContents.send('loadLineResponse', line)
  return line
})

ipcMain.on('loadExternalClass', (e, newClass) => {
  externalWindow.webContents.send('loadClassResponse', newClass)
  return newClass
})

ipcMain.on('setExternalX', (e, newX) => {
  externalWindow.webContents.send('setExternalXResponse', newX)
  return newX
})

ipcMain.on('setExternalY', (e, newY) => {
  externalWindow.webContents.send('setExternalYResponse', newY)
  return newY
})

ipcMain.on('setExternalWidth', (e, newWidth) => {
  externalWindow.webContents.send('setExternalWidthResponse', newWidth)
  return newWidth
})

ipcMain.on('setExternalHeight', (e, newHeight) => {
  externalWindow.webContents.send('setExternalHeightResponse', newHeight)
  return newHeight
})

ipcMain.on('showExternalBorder', (e, border) => {
  externalWindow.webContents.send('showExternalBorderResponse', border)
  return border
})

ipcMain.on('hideExternal', () => {
  const result = externalWindow.hide()
  return result
})

ipcMain.on('showExternal', () => {
  const result = externalWindow.showInactive()
  return result
})

ipcMain.handle('getExternalHiddenStatus', () => {
  const result = externalWindow.isVisible()
  return result
})

ipcMain.on('hideExternalLine', () => {
  externalWindow.webContents.send('hideExternalLineResponse')
})

ipcMain.on('loadPerformance', () => {
  mainWindow.webContents.send('loadPerformanceResponse')
})

ipcMain.on('unloadPerformance', () => {
  mainWindow.webContents.send('unloadPerformanceResponse')
})
