import React,{useState} from 'react'
import '../modal/modal.css'
import tick from '../../assets/animated.gif'
import { BsCheckCircleFill } from 'react-icons/bs'

const Modal = ({modalOpen, message}) => {
    
  return (
    <>
    <div className="modal-container">
     <div className={`modal-body ${modalOpen ? "active-modal" : ""}`}>
        <div className="modal-para" >
      <BsCheckCircleFill className="bscheck"/> 
      {/* <img src={tick} alt="" width={24} height={24}/> */}
       <p>{message ?? "Yo"}</p>
      </div>
            
     </div>
    </div>
    </>
  )
}

export default Modal