import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes/Routes';

import ProtectedRoute from './services/ProtectedRoute';
import Dashboard from './ui/pages/dashboard/Dashboard';
import Operator from './ui/pages/operator/Operator';
import User from './ui/pages/user/Users'
import Wallet from './ui/pages/wallet/Wallet'
import Bet from './ui/pages/bet/Bet'
import Login from './login/Login';
import Games from './ui/pages/game/Games';
import Stats from './ui/pages/stats/Stats';
import UserList from './ui/pages/operator/UserList';
import GameList from './ui/pages/operator/GameList';

function App() {
  let isAuthenticated = false;
  useEffect(() => {
    localStorage.getItem('token')
  }, [isAuthenticated])

  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route
            path={ROUTES.LOGIN}

          element={
            isAuthenticated ? (
              <Navigate to={ROUTES.DASHBOARD} />
            ) : (
              <Login />
            )
          }
          />

          {/* <Route element={<MainLayout />} /> */}

          <Route exact path='/' element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path={ROUTES.DASHBOARD} element={<Dashboard />} />
          
            <Route exact path={ROUTES.OPERATOR} element={<Operator/>}/>
            <Route exact path={ROUTES.USER} element={<User/>}/>
            <Route exact path={ROUTES.WALLET} element={<Wallet/>}/>
            <Route exact path={ROUTES.BET} element={<Bet/>}/>
            <Route exact path={ROUTES.GAME} element={<Games/>}/>
            <Route exact path={ROUTES.STATS} element={<Stats/>}/>
            <Route exact path={ROUTES.GAMELIST} element={<GameList/>}/>
            <Route exact path={ROUTES.USERLIST} element={<UserList/>}/>
            <Route exact path={ROUTES.GAMELIST} element={<GameList/>}/>





            

          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;