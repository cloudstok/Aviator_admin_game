import React from 'react'
import { useState } from 'react'
import { AiOutlineExclamationCircle,AiFillCheckCircle } from 'react-icons/ai'
import { updateCaller } from '../../services/api'
import '../modal/modal.css'
const AlertBox = ({alertOpen,setAlertOpen,alertMessage,addMatchList}) => {
    const [matchSavedOpen,setMatchSavedOpen] = useState(false)
    const handleAlert= async (event)=>{
        setAlertOpen(false)
        setMatchSavedOpen(true)
      }
       
    
    const handleMatchSaved=()=>{
        setMatchSavedOpen(false)
        window.location.reload(true)
    }
  return (
   
  <>
    
    <div className={`alert-body ${alertOpen ? "active-alert" : ""}`}>
       <div className="alert-content">
       <div className="alert-para" >
     <AiOutlineExclamationCircle className='mark-icon'/> 
     </div>
     <p className='are-you'> {alertMessage??"hello"} </p>
   <div className="alert-btn">
    <button type='submit' className='submit' onClick={ handleAlert } > Yes </button>
    <button className='cancel' style={{marginLeft:"1rem"}} > No </button>
   </div>
       </div>
    </div>
    

    <div className={`alert-body ${matchSavedOpen ? "active-alert" : ""}`}>
    <div className="alert-content">
       <div className="alert-para" >
     <AiFillCheckCircle className='trick-icon' /> 
     </div>
     <p className='are-you'> Submitted ! </p>
     <p>Matches Saved Successfully</p>
   <div className="saved-btn">
    <button type='submit' className='submit' onClick={handleMatchSaved}  > Ok </button>
    
   </div>
   </div>
    </div>

  </>
   
  )
}

export default AlertBox