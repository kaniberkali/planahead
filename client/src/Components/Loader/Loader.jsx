import React from 'react'
import {Puff} from 'react-loader-spinner';
import './loader.css'

function Loader() {
  return (
    <div className='loader'>
        <Puff
            height="100"
            width="100"
            color="#C0DBEA"
            radius='12.5'
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}

export default Loader