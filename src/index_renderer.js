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
      html += `<div class="note-list-column">
                <div class="note-list-entry changeable">
                  <h4><b>${note.title}</b></h4>
                  <hr><p>${note.body}</p>
                  <hr>
                  <a href="#" id="edit-note-${note.id}">Edit</a>
                  <a href=# id="delete-note-${note.id}">Delete</a>
                </div>
              </div>`
      return html
    },'')
    notes_list.innerHTML = notes_html + button_html

    notes_list.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (_event) => {
        const target_id = _event.target.id.split("-")
        const event_type = target_id[0]
        const note_id = parseInt(target_id[target_id.length-1])

        if(event_type == "edit"){
          ipcRenderer.send('edit-note', note_id)
        }else{
          ipcRenderer.send('delete-note', note_id)
        }
      })
    })
  }

  document.getElementById('add_note').addEventListener('click', () => {
    console.log("Spawned a new Add Note Window")

    ipcRenderer.send('add-note', "This is add window arg")
  })

})
