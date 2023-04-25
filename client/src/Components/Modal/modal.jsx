import React from 'react'
import './modal.css'

function modal(props) {
  return (
    <div id='mask'>
        <div className='modal'>
            {props.child}
        </div>
    </div>
  )
}

export default modal