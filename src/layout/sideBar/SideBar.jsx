import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
// import { postCaller } from '../../services/api';
import '../layout.css'
import { TbLogout } from 'react-icons/tb'
const SideBar = ({ menuOpen, setMenuOpen }) => {
  // let userType = localStorage?.getItem('user_role')?.toLowerCase();
  // let token = localStorage?.getItem('token')?.toLowerCase();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandle = () => {
    // const res = postCaller(`api/v1/logout?token=${token}`)
    localStorage.clear('token')
    navigate('/')
  }
  return (
    <>
      <div className={`side-left ${menuOpen ? 'active-menu' : ""} `}>
        <ul>

          <li className={`tablink ${location.pathname.includes('allbets') ? 'active-side' : null}`} onClick={() => { navigate('/allbets'); setMenuOpen(false) }}>
            All Bets  </li>

          <li className={`tablink ${location.pathname.includes('betAmount') ? 'active-side' : null}`} onClick={() => { navigate('/betAmount'); setMenuOpen(false) }}>
            Bet Amount </li>

          <li className={`tablink ${location.pathname.includes('user') ? 'active-side' : null}`} onClick={() => { navigate('/howToPlay'); setMenuOpen(false) }}>
            How To Play  </li>

          <li className={`tablink ${location.pathname === '/' ? 'active-side' : null}`} onClick={logoutHandle}>
            <TbLogout className="tblogout" /> Log Out
          </li>
        </ul>
      </div>

    </>

  )
}

export default SideBar