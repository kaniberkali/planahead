import './settings.css'
import { useRef } from 'react';
import {useContext} from 'react'
import { Context } from '../../Context/context'

function Settings() {
    const {setStateModal} = useContext(Context);
    const fileInputRef = useRef();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
    };
  return (
    <div id='settings'>
        <div className='profile-img' style={{marginTop : '20px'}}></div>
        <label className='btn btn-settings' onClick={handleButtonClick}>Change Image</label>
        <input ref={fileInputRef} id='file-upload' type='file' accept='.jpg, .jpeg, .png' style={{display : 'none'}} onChange={handleFileInputChange}></input>
        <label style={{marginTop : '40px'}}>Change E-mail</label>
        <input className='settingsInput' type='email' style={{marginTop : '20px'}}></input>
        <div style={{marginTop : '30px',display:'flex'}}>
            <button onClick={() => setStateModal(false)} className='btn btn-settings'>Save</button>
            <button onClick={() => setStateModal(false)} className='btn btn-settings'>Cancel</button>
        </div>
    </div>
  )
}

export default Settings