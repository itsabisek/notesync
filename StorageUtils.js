'use strict'

const Store = require('electron-store')

class StorageUtils extends Store{
  constructor(settings){
    super(settings)

    this.notes = this.get('notes') || []
  }

  get_notes(){
    this.notes = this.get('notes') || []

    return this
  }

  save_notes(){
      this.set('notes', this.notes)

      return this
  }

  add_note(todo){
    this.notes = [...this.notes, todo]

    return this.save_notes()
  }

  delete_note(todo){
    this.notes = this.notes.filter(t => t !== todo)

    return this.save_notes()
  }


}

module.exports = StorageUtils
