import React from 'react'
import './sideMenu.css'
import { useContext } from 'react';
import { Context } from '../../Context/context';

function Menu() {
  const {setBgColor,setNewNote} = useContext(Context);
  const changeColor = (e) => {
    const color = e.target.getAttribute('color');
    setBgColor(color);
  }
  const addNewNote = () => {
    setNewNote(true);
  }
  return (
    <div id='menu'>
        <ul>
            <li style={{"--bgColor":'#57C5B6'}} color='#57C5B6' onClick={changeColor}>Rutinler</li>
            <li style={{"--bgColor":'#89375F'}} color='#89375F' onClick={changeColor}>Haftalık</li>
            <li style={{"--bgColor":'#F2921D'}} color='#F2921D' onClick={changeColor}>Aylık</li>
            <li style={{"--bgColor":'#46C2CB'}} color='#46C2CB' onClick={changeColor}>Yıllık</li>
            <li style={{"--bgColor":'#95CD41'}} color='#95CD41' onClick={changeColor}>Arşiv</li>
            <li style={{"--bgColor":'#30475E'}} color='#30475E' onClick={changeColor}>Zincir</li>
            <hr />
            <li style={{"--bgColor":'#206A5D'}} color='#206A5D' onClick={addNewNote}>Yeni Not</li>
        </ul>
    </div>
  )
}

export default Menu