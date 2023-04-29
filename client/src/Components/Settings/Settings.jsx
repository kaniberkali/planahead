import './settings.css'
import { useRef } from 'react';
import {useContext} from 'react'
import { Context } from '../../Context/context'
import Background from '../Background/background';

function Settings() {
    const {setStateSettings} = useContext(Context);
    const fileInputRef = useRef();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
    };
  return (
    <div id='settings'>
        <div className='profile-img'></div>
        <label className='btn-settings' onClick={handleButtonClick}>Change Image</label>
        <input ref={fileInputRef} id='file-upload' type='file' accept='.jpg, .jpeg, .png' style={{display : 'none'}} onChange={handleFileInputChange}></input>
        <label style={{marginTop : '40px'}}>Change E-mail</label>
        <input className='settingsInput' type='email' style={{marginTop : '20px'}}></input>
        <div style={{marginTop : '30px',display:'flex'}}>
            <button onClick={() => setStateSettings(false)} className='btn-settings'>Kaydet</button>
            <button onClick={() => setStateSettings(false)} className='btn-settings'>İptal</button>
        </div>
    </div>
  )
}

export default Settings