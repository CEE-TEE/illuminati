require('electron-debug')

const {app, BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')
const isDev = require('electron-is-dev')
const elemon = require('elemon')
const path = require('path')
let win

app.on('window-all-closed', () => { app.quit() })

app.on('ready', () => {
  const windowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 300
  })

  win = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    alwaysOnTop: true,
    frame: false,
    show: false
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  windowState.manage(win)

  win.loadURL('file://' + path.join(__dirname, 'index.html'))

  if (isDev) {
    elemon({
      app: app,
      mainFile: 'main.js',
      bws: [
        {bw: win, res: []}
      ]
    })
  }
})
