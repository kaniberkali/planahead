import './notes.css'
import {useContext} from 'react'
import NotesArea from './notesArea';
import Modal from '../Modal/modal';
import {Context} from '../../Context/context'
import Settings from '../Settings/Settings';

function Notes() {
  const {stateModal,setStateModal} = useContext(Context);
  return (
    <div id='notes'>
      {stateModal && <Modal child={<Settings/>}/>}
      <NotesArea/>
    </div>
  )
}

export default Notes