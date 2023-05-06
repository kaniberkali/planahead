import './notes.css'
import {useContext} from 'react'
import NotesArea from './notesArea';
import Modal from '../Modal/modal';
import Icons from '../Icons/Icons';
import {Context} from '../../Context/context'
import Settings from '../Settings/Settings';
import AddNewNote from '../AddNewNote/AddNewNote';

function Notes() {
  const {stateSettings,newNote,iconModal} = useContext(Context);
  return (
    <div id='notes'>
      {stateSettings && <Modal child={<Settings/>}/>}
      {newNote && <Modal child={<AddNewNote/>} width = '290px' height = '400px'/>}
      {iconModal && <Modal width = '300px' height = '400px' indexZModal = '102' indexZMask = '101' child={<Icons/>}/>}
      <NotesArea/>
    </div>
  )
}

export default Notes