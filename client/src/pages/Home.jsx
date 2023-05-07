import React from 'react'
import SideMenu from '../Components/SideMenu/SideMenu'
import Notes from '../Components/Notes/Notes'
import SearchBar from '../Components/SearchBar/SearchBar'
import './pages.css'
import { useContext, useState } from 'react'
import { Context } from '../Context/context'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router'

function Home() {
  let navigate = useNavigate();
  const [redirect,setRedirect] = useState(false);
  axios.get(`${process.env.REACT_APP_API_URL}/session/`,{
    headers: {
      'Authorization': `Basic ${Cookies.get('token')}`
      }})
    .then(function (response) {
      setRedirect(true);
    })
    .catch(function (error) {
      navigate('/login');
    });
  const {bgColor} = useContext(Context);
  return (
    <>
      {redirect && <div id='home-page' style={{"--bgColor":bgColor}}>
    <SideMenu/>
    <SearchBar/>
    <Notes/>
    </div>}
    </>
  )
}

export default Home