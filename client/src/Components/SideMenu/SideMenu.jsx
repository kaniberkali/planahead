import './sideMenu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react'
import { useState } from 'react'
import { Context } from '../../Context/context'
import { useNavigate } from 'react-router';
import {MdToday,MdViewTimeline,MdCalendarMonth} from 'react-icons/md';
import {RiCalendarFill,RiArchiveFill} from 'react-icons/ri';
import {GiChaingun} from 'react-icons/gi';
import Menu from './menu';
import axios from 'axios';
import Cookies from 'js-cookie';

function SideMenu() {
  let navigate = useNavigate();
  const [stateMenu,setStateMenu] = useState(false);
  const {username,setStateSettings,bgColor,menuSelected} = useContext(Context);
  const openMenu = () => {
    setStateMenu(true);
  }
  const closeMenu = () => {
    setStateMenu(false);
  }
  const logOut = () => {
    Cookies.remove('token');
    navigate('/login');
  }
  return (
    <div id='sideMenu' style={{"--bgColor":bgColor}} onMouseEnter={openMenu} onMouseLeave={closeMenu} className={`${!stateMenu ? 'closed-menu' : ''}`}>
      <div className={`${stateMenu ? 'hidden' : ' '} d-flex flex-column justify-content-center align-items-end`} style={{position : 'relative',width : '100%',height : '100%',display : 'none',transform : 'translateX(4%)'}}>
        <MdViewTimeline className={`text-white ${menuSelected == 'routine' ? 'activeMenu': ''}`} style={{fontSize : '25px'}}/>
        <MdToday className={`text-white mt-5 ${menuSelected == 'week' ? 'activeMenu': ''}`} style={{fontSize : '25px'}}/>
        <MdCalendarMonth className={`text-white mt-5 ${menuSelected == 'month' ? 'activeMenu': ''}`} style={{fontSize : '25px'}}/>
        <RiCalendarFill className={`text-white mt-5 ${menuSelected == 'year' ? 'activeMenu': ''}`} style={{fontSize : '25px'}}/>
        <RiArchiveFill className={`text-white mt-5 ${menuSelected == 'archive' ? 'activeMenu': ''}`} style={{fontSize : '25px'}}/>
      </div>
      <div className={`${!stateMenu ? 'hidden' : ''}`}>
        <h3 style={{fontWeight:'inherit'}}>Plan-Ahead</h3>
          <div id='profile'>
            <div className='profile-img'>
            </div>
            <div id='profile-details'>
              <span>{username}</span>
            </div>
          </div>
          <Menu/>
          <div id='logout'>
            <span onClick={() => setStateSettings(true)}>Ayarlar</span>
            <span style={{marginTop : '10px'}} onClick={logOut}>Çıkış</span>
          </div>
      </div>
    </div>
  )
}

export default SideMenu