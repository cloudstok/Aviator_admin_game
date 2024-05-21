import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.css'
import { TbLogout } from 'react-icons/tb'
import { TbBrandOpenvpn } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { GiGibbet } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaList } from "react-icons/fa6";

import image from '../../../../../src/assets/aviator-header.webp'
const SideBar = () => {
  // let userType = localStorage?.getItem('user_role')?.toLowerCase();
  // let token = localStorage?.getItem('token')?.toLowerCase();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandle = () => {
    // const res = postCaller(`api/v1/logout?token=${token}`)
    localStorage.clear('token')
    navigate('/')
  }

  const isActive = (path) => location.pathname.includes(path);
  return (
    <>
      <div className="side-bar-container">
        <div className='image-game'>
          <img src={image} alt='' />
        </div>
        <ul className='side-left'>
          <div className={`tablink ${isActive('/operator') ? 'active-side' : null}`} onClick={() => { navigate('/operator') }}>
            <div className='operator-side-bar'> <TbBrandOpenvpn />  Operator </div>
          </div>
          <div className={`tablink ${isActive('/user') ? 'active-side' : null}`} onClick={() => { navigate('/user') }}>
            <div className='operator-side-bar'> <FaRegUser />  User </div>
          </div>
          <div className={`tablink ${isActive('/wallet') ? 'active-side' : null}`} onClick={() => { navigate('/wallet') }}>
            <div className='operator-side-bar'> <IoMdWallet />  Wallet </div>

          </div>

          <div className={`tablink ${isActive('/bet') ? 'active-side' : null}`} onClick={() => { navigate('/bet') }}>
            <div className='operator-side-bar'> <GiGibbet />  Bet </div>
          </div>
          <div className={`tablink ${isActive('/game') ? 'active-side' : null}`} onClick={() => { navigate('/game') }}>
            <div className='operator-side-bar'> <IoGameController />Games </div>

          </div>
          <div className={`tablink ${isActive('/stats') ? 'active-side' : null}`} onClick={() => { navigate('/stats') }}>
            <div className='operator-side-bar'> <IoStatsChartSharp />  Stats </div>

          </div>
          <div className={`tablink ${isActive('/gamelist') ? 'active-side' : null}`} onClick={() => { navigate('/gamelist') }}>
            <div className='operator-side-bar'> <FaList /> Game List </div>
          </div>
          <div className={`tablink ${location.pathname === '/' ? 'active-side' : null}`} onClick={logoutHandle}>
            <TbLogout className="tblogout" /> Log Out
          </div>
        </ul>
      </div>

    </>

  )
}

export default SideBar