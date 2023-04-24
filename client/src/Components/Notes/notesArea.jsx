import './notes.css'
import React from 'react'
import Note from '../Note/Note';

function notesArea() {
  return (
    <div id='notesArea'>
      <Note/>
      <Note/>
      <Note/>
      <Note/>
    </div>
  )
}

export default notesArea