'use strict'

const {ipcRenderer} = require('electron')

const form = document.getElementById('new-note-form')
form.onsubmit = (_event) => {
    _event.preventDefault()

    const title = form.elements['note-title'].value
    const body = form.elements['note-body'].value

    const form_data = `{${title}:${body}}`

    ipcRenderer.send('added-new-note', form_data)
}
