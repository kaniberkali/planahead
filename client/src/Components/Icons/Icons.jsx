import {useState} from 'react'
import {IconContext} from 'react-icons/lib';
import Pagination from 'react-bootstrap/Pagination';
import './icon.css'
import * as FaIcons from 'react-icons/fa';


function Icons() {
    const allIcons = [...Object.keys(FaIcons)];
    let pages = [];
    let icons = [];
    const changePagination = (e) => {
      const pageNum = parseInt(e.target.id);
      icons = [];
      // allIcons.map((iconName) => {
      //   console.log(typeof(iconName));
      // })
      for (let index = (pageNum - 1)*100; index < pageNum*100; index++) {
        const iconName = allIcons[index];
        let Icon = FaIcons[iconName];
        icons.push(<Icon className='icon rounded' key={index}/>)
      }
      console.log(icons);
    }
    for (let i = 1; i <= 17; i++) {
      pages.push(
        <Pagination.Item key={i} active={i == 1} id={i}>
          {i}
        </Pagination.Item>
      )
    } 
  return (
    <IconContext.Provider value={{size : '2em'}}>
      <div className='border'>
        <div className='d-flex flex-wrap justify-content-center p-2'>
          {icons}
        </div>
        <Pagination size='sm' className='d-flex flex-wrap' onClick={changePagination}>
          {pages}
        </Pagination>
    </div>
  </IconContext.Provider>
  )
}

export default Icons