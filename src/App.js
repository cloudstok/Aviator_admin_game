import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes/Routes';

import ProtectedRoute from './services/ProtectedRoute';
import Dashboard from './ui/pages/dashboard/Dashboard';
import Wallet from './ui/pages/wallet/Wallet'
import Bet from './ui/pages/bet/Bet'
import Login from './login/Login';
import Stats from './ui/pages/stats/Stats';
import GameList from './ui/pages/admin/GameList';
import OperatorLogin from './login/OperatorLogin';
import AuthForm from './login/AuthForm';
import Profile from './ui/pages/profile/Profile';
import Admin from './ui/pages/admin/Admin';
import UserList from './ui/pages/user/UserList';

function App() {
  let isAuthenticated = false;
  useEffect(() => {
    localStorage.getItem('token')
  }, [isAuthenticated])

  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path={ROUTES.LOGIN} element={isAuthenticated ? (<Navigate to={ROUTES.DASHBOARD} />) : (<Login />)} />

          {/* <Route element={<MainLayout />} /> */}

          <Route exact path='/' element={<AuthForm />} />
          <Route element={<ProtectedRoute />}>
          
            <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route exact path={ROUTES.ADMIN} element={<Admin />} />
            {/* <Route exact path={ROUTES.USER} element={<User />} /> */}
            <Route exact path={ROUTES.WALLET} element={<Wallet />} />
            <Route exact path={ROUTES.BET} element={<Bet />} />
            <Route exact path={ROUTES.STATS} element={<Stats />} />
            <Route exact path={ROUTES.GAME} element={<GameList />} />
            <Route exact path={ROUTES.USERLIST} element={<UserList />} />
            {/* <Route exact path={ROUTES.GAMELIST} element={<GameList/>}/> */}
            <Route exact path={ROUTES.GAMELIST} element={<GameList />} />
            <Route exact path={ROUTES.OPERATORLOGIN} element={<OperatorLogin />} />
            <Route exact path={ROUTES.PROFILE} element={<Profile />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;