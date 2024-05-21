import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from '../ui/components/layout/header/Header.jsx'
import SideBar from "../ui/components/layout/sideBar/SideBar.jsx";

const ProtectedRoutes = () => {
  const [toggleOpen, setToggleOpen] = useState(false);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated = true;
  const [sidebarChange, setSidebarChange] = useState(0);
  
  return isAuthenticated ? (
    <div className="main-container">
      <div className="side-header">
        <SideBar toggleOpen={toggleOpen} setToggleOpen={setToggleOpen} sidebarChange={sidebarChange} setSidebarChange={setSidebarChange} />
        <div className="header-width">
          <Header toggleOpen={toggleOpen} setToggleOpen={setToggleOpen} sidebarChange={sidebarChange} setSidebarChange={setSidebarChange} />
          <div className="children-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) :  null(
    // <Navigate to={login} replace />
  );
};

export default ProtectedRoutes;
