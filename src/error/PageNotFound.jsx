import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../error/error.css'
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'
const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='error-container'>
        <div className='error-body'>
            <div className='error-head'>
               <div> <h1>404</h1>
                </div>
               <div><p>There's Nothing Here </p></div>
               <div className='error-btn-container'> <button onClick={()=> navigate('/dashboard') }> Back to home <HiOutlineArrowNarrowRight style={{fontSize:"1.5rem",marginLeft:".5rem"}}/> </button> </div>
            </div>
         
        </div>
    </div>
  )
}

export default PageNotFound