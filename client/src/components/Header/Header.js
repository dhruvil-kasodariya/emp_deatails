import React from 'react'
import Modal from '../Modal/Modal'
import "./Header.css"
function Header({btnAdd,btnEdit,id,loadData}) {
  return (
    <div className='head'>
        <h1>Employee Details</h1>
        <Modal btnAdd={btnAdd}
               btnEdit={btnEdit}
               id={id}
               loadData={loadData}
        />
    </div>
  )
}

export default Header