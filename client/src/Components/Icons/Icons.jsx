import {useEffect,useContext,React} from 'react'
import {IconContext} from 'react-icons/lib';
import { Context } from '../../Context/context';
import Pagination from 'react-bootstrap/Pagination';
import './icon.css'
import * as FaIcons from 'react-icons/fa';


function Icons() {
    const allIcons = [...Object.keys(FaIcons)];
    const {pageNum,setPageNum, selectIcon, setIconModal,setSelectIcon} = useContext(Context);
    let pages = [];
    let icons = [];
    useEffect(() => {

    },[pageNum]);
    const changePagination = () => {
      for (let index = (pageNum - 1)*100; index < pageNum*100; index++) {
        if(allIcons[index]){
          const iconName = allIcons[index];
          let Icon = FaIcons[iconName];
          icons.push(<Icon id={index} className = 'icon rounded' key={index}/>)
        }
      }
    }
    const addIcon = (e) => {
      let id;
      e.target.id == '' ? id = e.target.parentElement.id : id = e.target.id;
      setSelectIcon(id);
      setIconModal(false);
    }
    changePagination();
    for (let i = 1; i <= 17; i++) {
      pages.push(
        <Pagination.Item key={i} active={i == pageNum} id={i}>
          {i}
        </Pagination.Item>
      )
    } 
  return (
    <IconContext.Provider value={{size : '2em'}}>
      <div className='border w-100 h-100' style={{overflow : 'auto'}}>
        <div className='d-flex flex-wrap justify-content-center p-2' onClick={(e) => addIcon(e)}>
          {icons}
        </div>
        <Pagination size='sm' className='d-flex justify-content-center align-items-center flex-wrap' onClick={(e) => {setPageNum(parseInt(e.target.id))}}>
          {pages}
        </Pagination>
        <button className='btn btn-danger p-1 w-100' onClick={() => setIconModal(false)}>İptal</button>
    </div>
  </IconContext.Provider>
  )
}

export default Icons