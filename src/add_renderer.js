'use strict'

const {ipcRenderer} = require('electron')

const form = document.getElementById('new-note-form')
form.onsubmit = (_event) => {
    _event.preventDefault()

    const note_title = form.elements['note-title'].value
    const note_body = form.elements['note-body'].value

    const note_data = {title:note_title, body:note_body}
    // console.log(`Note details are ${note_data}`)

    ipcRenderer.send('added-new-note', note_data)
}
