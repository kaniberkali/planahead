import React from 'react'
import './Note.css'
import { useContext } from 'react'
import { Context } from '../../Context/context'
import * as FaIcons from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import {MdCancel} from 'react-icons/md';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import moment, { months } from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

function Note(props) {
  const {bgColor, deleteNote, setDeleteNote, setUpdated, updated} = useContext(Context);
  const navigate = useNavigate();
  const allIcons = [...Object.keys(FaIcons)];
  let Icon;
  // let time;
  // let sevenDays;
  // let year;
  // const monthArray = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
  // if(props.category == 'week')
  // {
  //   time = new Date(props.time);
  //   const copyTime = new Date(time.getTime());
  //   sevenDays = new Date(copyTime.setDate(copyTime.getDate() + 6));
  // }
  // if(props.category == 'month')
  // {
  //   time = moment(props.time).format('M');
  //   year = props.time.substring(0,4);
  // }
  if(props.icon != '')
  {
    const iconName = allIcons[props.icon - 1];
    Icon = FaIcons[iconName];
  }
  const deleteNoteFunc = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/notes/${props.noteId}`,{
      headers: {
        'Authorization': `Basic ${Cookies.get('token')}`
        }})
        .then(function (response) {
          setDeleteNote(!deleteNote);
          navigate('/');
        })
        .catch(function (error) {
          navigate('/login');
        });
  }
  const completeNote = () => {
    const data = {
      icon_id : props.icon,
      date : props.time,
      title : props.title,
      content : props.detail,
      type : 'archive',
      state : true
    }
    axios.put(`${process.env.REACT_APP_API_URL}/notes/${props.noteId}`,data,{
      headers: {
        'Authorization': `Basic ${Cookies.get('token')}`
      }})
      .then(function (response) {
        setUpdated(!updated);
        navigate('/');
      })
      .catch(function (error) {
      });
      }
  return (
    <OverlayTrigger overlay={(prop) => (
      <Tooltip className={'tool-tip'} {...prop}>
        {props.detail != '' && <strong className='p-2'>{props.detail}</strong>}
      </Tooltip>
    )}>
      <div className='note' style={{background : bgColor}}>
          <div className='delete-note'>
            <MdCancel onClick={deleteNoteFunc} />
          </div>
          <h3 className={props.category}>{props.time}</h3>
          {props.icon != '' && <Icon className='note-icon'/>}
          <span className='note-title'>{props.title}</span>
          {props.category != 'archive' &&
          <div className='complete-note' onClick={completeNote}>
            <FaCheck/>
          </div>}
      </div>
    </OverlayTrigger>
  )
}

export default Note