import React from 'react'
import './Note.css'
import { useContext } from 'react'
import { Context } from '../../Context/context'

function Note() {
  const {bgColor} = useContext(Context);
  return (
    <div className='note' style={{background : bgColor}}>
        <h3 className='time'>10:00</h3>
        <span className='note-title'>Lorem ipsum dolor sit amet.</span>
        <a href='#'>Detail...</a>
    </div>
  )
}

export default Note