import React from 'react'
import './Note.css'
import { useContext } from 'react'
import { Context } from '../../Context/context'
import * as FaIcons from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function Note(props) {
  const {bgColor} = useContext(Context);
  const allIcons = [...Object.keys(FaIcons)];
  let Icon;
  if(props.icon != '')
  {
    const iconName = allIcons[props.icon];
    Icon = FaIcons[iconName];
  }
  return (
    <OverlayTrigger overlay={(prop) => (
      <Tooltip className={'tool-tip'} {...prop}>
        {props.detail != '' && <strong className='p-2'>{props.detail}</strong>}
      </Tooltip>
    )}>
      <div className='note' style={{background : bgColor}}>
          <h3 className={props.category}>{props.time}</h3>
          {props.icon != '' && <Icon className='note-icon'/>}
          <span className='note-title'>{props.title}</span>
          <div className='complete-note'>
            <FaCheck/>
          </div>
      </div>
    </OverlayTrigger>
  )
}

export default Note