import React from 'react'
import SideMenu from '../Components/SideMenu/SideMenu'
import Notes from '../Components/Notes/Notes'
import SearchBar from '../Components/SearchBar/SearchBar'
import './pages.css'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../Context/context'
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router'

function Home() {
  let navigate = useNavigate();
  const [redirect,setRedirect] = useState(false);
  const {bgColor,setNotes, newNote, setUsername} = useContext(Context);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/session/`,{
      headers: {
        'Authorization': `Basic ${Cookies.get('token')}`
        }})
      .then(function (response) {
        setRedirect(true);
        setUsername(response.data.login.login.name + ' ' +response.data.login.login.surname);
      })
      .catch(function (error) {
        navigate('/login');
      });
      axios.get(`${process.env.REACT_APP_API_URL}/notes`,{
        headers: {
          'Authorization': `Basic ${Cookies.get('token')}`
          }})
        .then(function(response){
          if(response.data)
            setNotes(response.data);
        })
        .catch(function(error){
        });
  },[newNote]);
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