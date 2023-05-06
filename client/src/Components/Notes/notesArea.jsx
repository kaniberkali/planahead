import './notes.css'
import {useContext,useState} from 'react'
import { Context } from '../../Context/context';
import Note from '../Note/Note';

function NotesArea() {
  const {notes, menuSelected} = useContext(Context);
  return (
    <div id='notesArea'>
      {notes && notes.map((note,index) => (
        menuSelected == note.category ? <Note category = {note.category} time = {note.time} title = {note.title} icon={note.icon} detail={note.detail} key={index}/> : null
      ))}
    </div>
  )
}

export default NotesArea