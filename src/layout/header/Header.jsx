import React, { useState } from 'react'
import '../layout.css'
import SideBar from '../sideBar/SideBar'
import {CgMenu} from 'react-icons/cg'
import {AiFillCloseCircle} from 'react-icons/ai'
const Header = () => {
   const [menuOpen,setMenuOpen] = useState(false)
   
   return (
      <>
      <div className="top-wrapper">
         <div className="sidebar">
         <div className="header-logo">
         <div className='header-logo-img'>
          <h2 style={{color:"white",fontSize:"2rem"}}> <samp style={{color:"#38ca07"}}>Avi</samp>ator</h2>
             </div>
         {
            menuOpen?<div className="menu-btn" onClick={()=>setMenuOpen(false)}><AiFillCloseCircle className='menu-icon'/></div>:
            <div className="menu-btn" onClick={()=>setMenuOpen(true)}><CgMenu className='menu-icon'/></div>
         }
            </div>
            <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
         </div>
      </div>
      </>
   )
}
export default Header