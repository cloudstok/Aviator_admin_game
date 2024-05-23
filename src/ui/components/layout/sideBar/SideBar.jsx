import React, { useState } from 'react'
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
import { CgProfile } from "react-icons/cg";


import image from '../../../../../src/assets/aviator-header.webp'
import { ROUTES } from '../../../../routes/Routes';
const SideBar = () => {
  // let userType = localStorage?.getItem('user_role')?.toLowerCase();
  // let token = localStorage?.getItem('token')?.toLowerCase();
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const logoutHandle = () => {
    // const res = postCaller(`api/v1/logout?token=${token}`)
    localStorage.clear('token')

    navigate('/')
  }
  // console.log(localStorage.getItem('role'))
  const isActive = (path) => location.pathname.includes(path);
  return (
    <>
      <div className="side-bar-container">
        <div className='image-game'>
          <img src={image} alt='' />
        </div>
        <div className='side-left'>
          {
            role === "SUPERADMIN" ? <div className={`tablink ${isActive('/admin') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.ADMIN) }}>
              <div className='operator-side-bar'> <TbBrandOpenvpn />  Admin </div>
            </div> : null }

          <div className={`tablink ${isActive('/user') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.USERLIST) }}>
            <div className='operator-side-bar'> <FaRegUser />  User </div>
          </div>

          <div className={`tablink ${isActive('/profile') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.PROFILE) }}>
            <div className='operator-side-bar'> <CgProfile/> My Profile </div>

          </div>

          <div className={`tablink ${isActive('/wallet') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.WALLET) }}>
            <div className='operator-side-bar'> <IoMdWallet />  Wallet </div>

          </div>

          <div className={`tablink ${isActive('/bet') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.BET) }}>
            <div className='operator-side-bar'> <GiGibbet />  Bet </div>
          </div>

          <div className={`tablink ${isActive('/stats') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.STATS) }}>
            <div className='operator-side-bar'> <IoStatsChartSharp />  Stats </div>

          </div>
          {/* <div className={`tablink ${isActive('/gamelist') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.GAMELIST) }}>
            <div className='operator-side-bar'> <FaList /> Game List </div>
          </div> */}
          <div className={`tablink ${isActive('/gameList') ? 'active-side' : null}`} onClick={() => { navigate(ROUTES.GAMELIST) }}>
            <div className='operator-side-bar'> <IoGameController />Game List </div>

          </div>
          <div className={`tablink ${location.pathname === '/' ? 'active-side' : null}`} onClick={logoutHandle}>
            <TbLogout className="tblogout" /> Log Out
          </div>

        </div>
      </div>

    </>

  )
}

export default SideBar