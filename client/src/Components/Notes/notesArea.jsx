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
      if(note.type == 'routine')
        note.date = moment(note.date,'HH:mm').format('HH:mm');
      else{
        note.date = moment(note.date).format('YYYY-MM-DD');
      }
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
        <Note noteId={note.id} category = {note.type} time = {note.date} title = {note.title} icon={note.icon_id} detail={note.content} key={index}/>
      ))}
    </div>
  )
}

export default NotesArea