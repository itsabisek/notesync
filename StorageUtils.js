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

  get_note(note_id){
    return
  }
  add_note(note){
    if(note.id){
      const parsed_note = {id:note.id,...note}
      this.notes = [parsed_note,...this.notes]
    }
    else{
      const parsed_note = {id:this.notes.length+1,...note}
      this.notes = [parsed_note,...this.notes]
    }
    return this.save_notes()
  }

  update_note(note){
    return this.delete_note(note.id).add_note(note)

  }

  delete_note(note_id){
    this.notes = this.notes.filter(t => t.id !== note_id)

    return this.save_notes()
  }


}

module.exports = StorageUtils
