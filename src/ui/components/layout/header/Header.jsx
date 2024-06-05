import React, { useState, useEffect } from "react";
import './header.css'
import { useNavigate } from "react-router-dom";
import img from '../../../../assets/avator.png'

const Header = ({ toggleOpen, setToggleOpen }) => {
   const [name, setName] = useState("");
   const userRole = localStorage.getItem("role");
   const userName = localStorage.getItem("userName");
   const [openIcon, setOpenIcon] = useState(false);
   const navigate = useNavigate();
   const [scrolled, setScrolled] = useState(false);
   const [role, setrole] = useState(localStorage.getItem('role'))



   useEffect(() => {
      if (userName) {
         const firstLetter = userName.charAt(0).toUpperCase();
         setName(firstLetter);
      }
   }, [userName]);

   useEffect(() => {
      const handleScroll = () => {
         const isScrolled = window.scrollY > 0;
         if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [scrolled]);

   return (
      <>
         <div className="header-content">
            <div className="header-icon">
               <div className="header-logo">
                  <div className="login-logo">
                     <h1><samp style={{ color: "#0080DC" }}>Avi</samp><span style={{ color: "red" }}>ator</span></h1>
                  </div>
               </div>
            </div>
            <div className="search-container">
               <div className="user-container">
                  <div className="user-img-container">
                     <div className="user-img">
                        <span>{name}</span>
                     </div>
                     <div className="user-name">
                        <div className="down-arrow">
                           <p>{userRole}</p>
                        </div>

                        <div className="avator-work">
                           <h4>{userName}</h4>
                           <img src={img} alt="" />

                           {/* {
                              role == 'OPERATOR' ? <AddButton name=" My Profile" handleOpenModal={() => setOpenIcon(true)} /> : null
                           } */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* {openIcon && (
            <Profile show={openIcon} setOpenIcon={setOpenIcon} />
         )} */}
      </>
   );
};

export default Header;