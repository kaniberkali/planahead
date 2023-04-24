import React from 'react'
import './Note.css'

function note() {
  return (
    <div className='note'>
        <h3 className='time'>10:00</h3>
        <span className='note-title'>Lorem ipsum dolor sit amet.</span>
        <a href='#'>Detail...</a>
    </div>
  )
}

export default note