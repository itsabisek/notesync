'use strict'

const {ipcRenderer} = require('electron')


ipcRenderer.on('populate',(_event, notes) => {

  console.log(notes.length)
  const button_html = `<div class="note-list-column"><a class="button-add changeable" href="#" id = "add_note">+</a></div>`
  // console.`log(`Received Notes - ${notes}`)
  const notes_list = document.getElementById('notes-list')

  if(notes.length == 0){
    notes_list.innerHTML = button_html
  }

  else{
    // console.log(`Current InnerHTML - ${notes_list.innerHTML}`)
    const notes_html = notes.reduce((html,note) => {
    html += `<div class="note-list-column"><div class="note-list-entry changeable"><h4><b>Note Title</b></h4><hr><p>${note}</p></div></div>`
    return html
    },'')
    notes_list.innerHTML = notes_html + button_html
  }

  document.getElementById('add_note').addEventListener('click', () => {
    console.log("Spawned a new Add Note Window")

    ipcRenderer.send('add-note', "This is add window arg")
  })

})
