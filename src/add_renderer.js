'use strict'

const {ipcRenderer} = require('electron')

const form = document.getElementById('new-note-form')
form.onsubmit = (_event) => {
    _event.preventDefault()

    const title = form.elements['note-title'].value
    const body = form.elements['note-body'].value

    const note_data = `{${title}:${body}}`
    // console.log(`Note details are ${note_data}`)

    ipcRenderer.send('added-new-note', note_data)
}
