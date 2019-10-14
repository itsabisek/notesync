"use strict";
const {BrowserWindow} = require('electron')

const default_props = {
  width:400,
  height:400,
  show:false,

  webPreferences: {
    nodeIntegration:true
  }
}
class Window extends BrowserWindow{
  constructor({file,...windowSettings}){
    super({...default_props, ...windowSettings})

    this.loadFile(file)
    this.webContents.openDevTools()

    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = Window
