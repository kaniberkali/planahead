import React from 'react'
import SideMenu from '../Components/SideMenu/SideMenu'
import Notes from '../Components/Notes/notes'
import SearchBar from '../Components/SearchBar/SearchBar'
import './pages.css'

function Home() {
  return (
    <div id='home-page'>
        <SideMenu/>
        <SearchBar/>
        <Notes/>
    </div>
  )
}

export default Home