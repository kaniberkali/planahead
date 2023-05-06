import React from 'react'
import './sideMenu.css'
import { useContext } from 'react';
import { Context } from '../../Context/context';

function Menu() {
  const {setBgColor,setNewNote,setMenuSelected} = useContext(Context);
  const changeMenuSelected = (e) => {
    const color = e.target.getAttribute('color');
    if(e.target.getAttribute('menu'))
      setMenuSelected(e.target.getAttribute('menu'));
    setBgColor(color);
  }
  const addNewNote = () => {
    setNewNote(true);
  }
  return (
    <div id='menu'>
        <ul>
            <li style={{"--bgColor":'#57C5B6'}} color='#57C5B6' menu='routine' onClick={changeMenuSelected}>Rutinler</li>
            <li style={{"--bgColor":'#89375F'}} color='#89375F' menu='week' onClick={changeMenuSelected}>Haftalık</li>
            <li style={{"--bgColor":'#F2921D'}} color='#F2921D' menu='month' onClick={changeMenuSelected}>Aylık</li>
            <li style={{"--bgColor":'#46C2CB'}} color='#46C2CB' menu='year' onClick={changeMenuSelected}>Yıllık</li>
            <li style={{"--bgColor":'#95CD41'}} color='#95CD41' onClick={changeMenuSelected}>Arşiv</li>
            <li style={{"--bgColor":'#30475E'}} color='#30475E' onClick={changeMenuSelected}>Zincir</li>
            <hr />
            <li style={{"--bgColor":'#206A5D'}} color='#206A5D' onClick={addNewNote}>Yeni Not</li>
        </ul>
    </div>
  )
}

export default Menu