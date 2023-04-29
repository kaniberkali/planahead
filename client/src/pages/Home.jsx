import React from 'react'
import SideMenu from '../Components/SideMenu/SideMenu'
import Notes from '../Components/Notes/Notes'
import SearchBar from '../Components/SearchBar/SearchBar'
import './pages.css'
import { useContext } from 'react'
import { Context } from '../Context/context'

function Home() {
  const {bgColor} = useContext(Context);
  return (
    <div id='home-page' style={{"--bgColor":bgColor}}>
        <SideMenu/>
        <SearchBar/>
        <Notes/>
    </div>
  )
}

export default Home