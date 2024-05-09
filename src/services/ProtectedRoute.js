import React from 'react'
import {Navigate, useNavigate } from 'react-router-dom';
import Header from '../layout/header/Header';
import '../layout/layout.css'

import { FaUser } from 'react-icons/fa';

// import { IoMdNotificationsOff } from "react-icons/io";

function ProtectedRoute({Children}) {
  const navigate = useNavigate();
 
  //  let userName = localStorage?.getItem('user_name')?.toLowerCase()
  // let userType = localStorage?.getItem('user_role')?.toLowerCase();
  // let token = localStorage?.getItem('token')?.toLowerCase();
  const logoutHandle=()=>{
  //  const res = postCaller(`api/v1/logout?token=${token}`)
   localStorage.clear('token')
     navigate('/')
    //  hello 
 }

    const isAuthenticated = localStorage.getItem('token');
    const phone = localStorage.getItem('phone');
    const name = localStorage.getItem('name')
  return (
    // isAuthenticated ? 
    <>
        <div className='side-container'>
         <div>   <Header /></div>
        <div className={"header-right"}>
                 <div className="top-nav">
                  {/* <div className='' style={{marginRight:"1rem",paddingTop:".6rem",height:"100%",display:"flex",alignItems:"center",fontSize:"1.6rem"}}>
                    <IoMdNotificationsOff className='notification-bar' style={{color:"#F44464",cursor:"pointer"}} />
                  </div> */}
                 
                 <div className="refresh" onClick={logoutHandle}>
                     <FaUser className='user-icons' />
                    <div className='admin-password'>
                     <p className='userName-container'> <span className='userName'></span> <span className='name'>{name || phone }</span></p>
                    </div>
                  </div>
                 </div>
                 <div className='children-container'>
               {Children} 
              
               </div>
               </div>
        
 </div>
    
 </>
    
    // : <Navigate to={'/'} replace/>
  )
}

export default ProtectedRoute