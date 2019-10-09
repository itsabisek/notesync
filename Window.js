"use strict";
const {BrowserWindow} = require('electron')

const default_props = {
  width:500,
  height:800,
  show:false
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
