import './sideMenu.css'
import { useContext } from 'react'
import Menu from './menu'
import { useState } from 'react'
import { Context } from '../../Context/context'

function SideMenu() {
  const [stateMenu,setStateMenu] = useState(false);
  const {setStateModal} = useContext(Context);
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
            <div className='profile-img'>
            </div>
            <div id='profile-details'>
              <span>John Doe</span>
              <span>22</span>
            </div>
          </div>
          <Menu/>
          <div id='logout'>
            <span onClick={() => setStateModal(true)}>Settings</span>
            <span style={{marginTop : '10px'}}>Logout</span>
          </div>
      </div>
    </div>
  )
}

export default SideMenu