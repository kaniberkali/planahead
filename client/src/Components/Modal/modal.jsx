import React from 'react'
import './modal.css'

function modal(props) {
  return (
    <div style={{"--index-z-mask" :props.indexZMask != undefined ? props.indexZmask : '98'}} id='mask'>
        <div style={{"--modal-width" : props.width != undefined ? props.width : '250px' , "--modal-height" : props.height != undefined ? (props.height) : '350px' , "--index-z-modal" :props.indexZModal != undefined ? props.indexZModal : '100'}} className='modal-me'>
            {props.child}
        </div>
    </div>
    );}

export default modal