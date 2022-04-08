import React, { useState } from "react";
import AddEmp from "../AddEmp/AddEmp.js";
import "./Modal.css";

function Modal({id ,btnAdd ,btnEdit ,loadData}) {
  const [modal, setModal] = useState(false);

  const handleModel = () => {
    setModal(!modal);
  };  

  if(modal){
    document.body.classList.add('active-modal')
  }else{
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={handleModel} className="btn-add">{btnAdd}{btnEdit}</button>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={handleModel} />  
          <div className="modal-content">
            <AddEmp id={id}
                    setModal={setModal}
                    modal={modal}
                    loadData={loadData}
            />
            <button className="btn-close" onClick={handleModel}>X</button>  
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
