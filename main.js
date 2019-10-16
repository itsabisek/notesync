'use strict'

  // Modules to control application life and create native browser window
const {app, ipcMain} = require('electron')
const Window = require('./Window')
require('electron-reload')(__dirname,{
  electron: require(`${__dirname}/node_modules/electron`)
})
const StorageUtils= require('./StorageUtils')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const store = new StorageUtils({name : "Notesync.dat"})
function createWindow () {
  // Create the browser window.
  mainWindow = new Window({
    file:'./src/index.html'
  })

  mainWindow.maximize()
  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  let addWindow


  mainWindow.webContents.once('dom-ready', () => {
    console.log("DOM Re Rendered")
    const notes = store.get_notes().notes
    // console.log(`${notes.length} Notes in store -[ ${store.notes}]`)
    mainWindow.webContents.send('populate', store.notes)
  })


  ipcMain.on('add-note', (_event, arg) => {
    if(!addWindow){
      addWindow =  new Window({file:'./src/add.html', parent: mainWindow})
      // console.log("New window spawned")

      addWindow.on('closed', () => {
        addWindow = null
      })
    }
  })

  ipcMain.on('delete-note', (_event, note_id) => {
    const notes = store.delete_note(note_id).notes

    mainWindow.webContents.send('populate', notes)
  })

  ipcMain.on('edit-node', (_event, note_id) => {
    const notes = store.notes
    mainWindow.webContents.send('populate', notes)
  })

  ipcMain.on('added-new-note', (_event,note_data) => {

    const notes = store.add_note(note_data).notes
    // console.log(`Current notes are  ${notes}`)
    addWindow.close()
    mainWindow.webContents.send('populate', notes)

  })

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})
