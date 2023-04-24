import React from 'react'
import Menu from './menu'
import './sideMenu.css'
import { useState } from 'react'

function SideMenu() {
  const [stateMenu,setStateMenu] = useState(false);
  const openMenu = () => {
    setStateMenu(true);
  }
  const closeMenu = () => {
    setStateMenu(false);
  }
  return (
    <div id='sideMenu' onMouseEnter={openMenu} onMouseLeave={closeMenu} className={`${!stateMenu ? 'closed-menu' : ''}`}>
      <div className={`${!stateMenu ? 'hidden' : ''}`}>
        <h3 style={{fontWeight:'inherit'}}>Expert To-Do</h3>
          <div id='profile'>
            <div id='profile-img'>
            </div>
            <div id='profile-details'>
              <span>John Doe</span>
              <span>22</span>
            </div>
          </div>
          <Menu/>
          <div id='logout'>
            <span>Logout</span>
          </div>
      </div>
    </div>
  )
}

export default SideMenu