import './notes.css'
import {useContext} from 'react'
import NotesArea from './notesArea';
import Modal from '../Modal/modal';
import {Context} from '../../Context/context'
import Settings from '../Settings/Settings';
import AddNewNote from '../AddNewNote/AddNewNote';

function Notes() {
  const {stateSettings,newNote} = useContext(Context);
  return (
    <div id='notes'>
      {stateSettings && <Modal child={<Settings/>}/>}
      {newNote && <Modal child={<AddNewNote/>}/>}
      <NotesArea/>
    </div>
  )
}

export default Notes