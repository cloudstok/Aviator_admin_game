import React, { useState, useEffect } from "react";
import {
   MdKeyboardArrowDown,
   MdKeyboardArrowRight,
   MdKeyboardArrowUp,
} from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import aviatorImage from '../../../../../src/assets/aviator-header.webp'
// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/apiSlice/authSlice/authSlice";
// import { ROUTES } from "../../../routes/routes";

const Header = ({
   toggleOpen,
   setToggleOpen,
   setSidebarChange,
   sidebarChange,
}) => {
   const [name, setName] = useState("");
   const userRole = localStorage.getItem("role");
   const userName = localStorage.getItem("userName");
   const [openIcon, setOpenIcon] = useState(false);
   // const dispatch = useDispatch();
   const navigate = useNavigate();
   const [scrolled, setScrolled] = useState(false);

   const handleLogout = () => {
      // dispatch(logout());
      navigate("/login");
   };

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
      <div className="header-content">
         <div className="header-icon">
            <div className="header-logo">
               <div className="login-logo">
                  <h1><samp style={{ color: "#38ca07" }}>Avi</samp><span style={{ color: "red" }}>ator</span></h1>
               </div>
            </div>
            {toggleOpen && (
               <div
                  className={`icon-shape ${toggleOpen ? "icon-shape-active" : ""}`}
                  onClick={() => setToggleOpen(!toggleOpen)}
                  style={{
                     position: "absolute",
                     left: "0px",
                     top: "10px",
                     borderRadius: "0px 10px 10px 0px",
                  }}
               >
                  <MdKeyboardArrowRight
                     style={{ fontSize: "1.2rem", color: "#23B364" }}
                  />
               </div>
            )}
         </div>
         <div className="search-container">
            <div className="user-container">
               <div className="user-img-container">
                  <div className="user-img">
                     <span>{name}</span>
                  </div>
                  <div className="user-name">
                     <div className="down-arrow">
                        <h4>{userName}</h4>
                        <p>{userRole}</p>
                     </div>
                     <div className="">
                        <div
                           className="down-circle"
                        // onClick={() => setOpenIcon(!openIcon)}
                        >
                           {openIcon ? (
                              {/* <img src={ICONS.upperIcon} alt="" /> */ }
                           ) : (
                              <MdKeyboardArrowDown style={{ fontSize: "1.5rem" }} />
                           )}
                           {openIcon && (
                              <div className="header-modal-1">
                                 <div
                                    className="image-box-container"
                                 // onClick={() => navigate(ROUTES.ACCOUNT_SETTING)}
                                 >
                                    <div className="image-icon">
                                       <FaUserCircle />
                                    </div>
                                    <p
                                       className=""
                                       style={{ fontSize: "12px", fontWeight: "500" }}
                                    >
                                       My Account
                                    </p>
                                 </div>
                                 <div
                                    className="image-box-container "
                                    onClick={handleLogout}
                                 >
                                    <div className="image-icon">
                                       <IoMdLogOut />
                                    </div>
                                    <div>
                                       <p style={{ fontSize: "12px", fontWeight: "500" }}>
                                          Logout
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;