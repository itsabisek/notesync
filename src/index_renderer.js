'use strict'

const {ipcRenderer} = require('electron')

document.getElementById('add_note').addEventListener('click', () => {
  var body = "This is a spawned window"

  ipcRenderer.send('add-note', body)
})

ipcRenderer.on('added-new-note',(_event, notes) => {
  
  const notes_list = document.getElementById('notes-list')

  const wrapper = `<div class="note-list-column">
                    <div class="note-list-entry changeable">
                      <h4><b>Note Title</b></h4>
                        <hr>
                        <p></p>
                    </div>
                  </div>`
  const notes_html = notes.reduce((html,note) => {
    html += `<div class="note-list-column"><div class="note-list-entry changeable"><h4><b>Note Title</b></h4><hr><p>${note}</p></div></div>`
    return html
  },'')

  notes_list.innerHTML = notes_html


})
