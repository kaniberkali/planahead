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
  const {bgColor,setNotes, newNote, deleteNote, setUsername, setProfileImg, updated} = useContext(Context);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/session/`,{
      headers: {
        'Authorization': `Basic ${Cookies.get('token')}`
        }})
      .then(function (response) {
        setRedirect(true);
        setUsername(response.data.login.login.name + ' ' +response.data.login.login.surname);
        if(response.data.login.login.photo != null)
          setProfileImg(response.data.login.login.photo);
      })
      .catch(function (error) {
        navigate('/login');
      });
      axios.get(`${process.env.REACT_APP_API_URL}/notes`,{
        headers: {
          'Authorization': `Basic ${Cookies.get('token')}`
          }})
        .then(function(response){
          if(response.data){
            console.log(response.data);
            setNotes(response.data);
          }
          else{
            setNotes([]);
          }
        })
        .catch(function(error){
        });
  },[newNote,deleteNote, updated]);
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