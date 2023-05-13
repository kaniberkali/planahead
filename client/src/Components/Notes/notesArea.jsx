import './notes.css'
import {useContext,useState} from 'react'
import { Context } from '../../Context/context';
import Note from '../Note/Note';
import moment from 'moment/moment';

function NotesArea() {
  const {notes, menuSelected} = useContext(Context);
  const arr = [];
  notes.forEach(note => {
    if(menuSelected == note.type){
      arr.push(note);
    }
  });
  arr.sort((a, b) => {
    if(arr.length > 1)
      return a.date.localeCompare(b.date);
  })
  return (
    <div id='notesArea'>
      {arr && arr.map((note,index) => (
        <Note noteState={note.state} noteId={note.id} category = {note.type} time = {note.date} title = {note.title} icon={note.icon_id} detail={note.content} key={index}/>
      ))}
    </div>
  )
}

export default NotesArea