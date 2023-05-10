import React from 'react'
import './Note.css'
import { useContext } from 'react'
import { Context } from '../../Context/context'
import * as FaIcons from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import {IconContext} from 'react-icons/lib';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import moment, { months } from 'moment';

function Note(props) {
  const {bgColor} = useContext(Context);
  const allIcons = [...Object.keys(FaIcons)];
  let Icon;
  let time;
  let sevenDays;
  let year;
  const monthArray = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  if(props.category == 'week')
  {
    time = new Date(props.time);
    const copyTime = new Date(time.getTime());
    sevenDays = new Date(copyTime.setDate(copyTime.getDate() + 6));
  }
  if(props.category == 'month')
  {
    time = moment(props.time).format('M');
    year = props.time.substring(0,4);
  }
  if(props.icon != '')
  {
    const iconName = allIcons[props.icon - 1];
    Icon = FaIcons[iconName];
  }
  return (
    <OverlayTrigger overlay={(prop) => (
      <Tooltip className={'tool-tip'} {...prop}>
        {props.detail != '' && <strong className='p-2'>{props.detail}</strong>}
      </Tooltip>
    )}>
      <div className='note' style={{background : bgColor}}>
          {props.category == 'routine' && <h3 className={props.category}>{props.time}</h3>}
          {props.category == 'week' && <h3 className={props.category}>{time.toLocaleDateString()} - {sevenDays.toLocaleDateString()}</h3>}
          {props.category == 'month' && <h3 className={props.category}>{monthArray[parseInt(time) - 1]} - {year}</h3>}
          {props.category == 'year' && <h3 className={props.category}>{props.time.substring(0,4)}</h3>}
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