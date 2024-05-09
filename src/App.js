import React, {useEffect} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import User from './pages/user/User';
import ProtectedRoute from './services/ProtectedRoute';
import Login from './login/Login';
import Shorts from './pages/shorts/Shorts';
import AddShorts from './pages/shorts/AddShorts';

import Tournament from './pages/tournament/Tournament';
import Matches from './pages/matches/Matches';
import AddMatch from './pages/matches/AddMatch';
import Association from './pages/association/Association';
import Adduser from './pages/user/Adduser';

import Teams from './pages/matches/Teams';
import Notification from './pages/notification/Notification';

import ShowComments from './pages/shorts/ShowComments';
import AddUpdateComments from './pages/shorts/AddUpdateComments';
import EditStatsForm from './pages/matches/EditStatsForm';
// import Test from './Test';
import AllBets from './pages/allbets/AllBets';
import MyBet from './pages/myAmount/BetAmount';
import BetAmount from './pages/myAmount/BetAmount';
import AddAmount from './pages/myAmount/AddAmount';
import HowToPlay from './pages/howtoplay/HowToPlay';




function App() {
  let isAuthenticated = false;
  useEffect(() =>{
      localStorage.getItem('token')
  }, [isAuthenticated])

  return (
    <>
      <BrowserRouter>
        <Routes>
       
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/dashboard' element={<ProtectedRoute Children={<Dashboard />}/>} />
        {/* <Route exact path='/home' element={<Home/>} /> */}
       
        <Route exact path='/allbets' element={<ProtectedRoute Children={<AllBets/>}/>}/>
        <Route exact path='/betAmount' element={<ProtectedRoute Children={<BetAmount/>}/>}/>
        <Route exact path='/betAmount/addAmount' element={<ProtectedRoute Children={<AddAmount/>}/>}/>

          <Route exact path='/howToPlay' element={<ProtectedRoute  Children={<HowToPlay/>}/>} />
         {/* <Route exact path='/user/Adduser' element={<ProtectedRoute Children={<Adduser/>}/>}/> */}
          {/* <Route exact path='/matches' element={<ProtectedRoute Children={<Matches/>}/>}/>
          <Route exact path='/match/AddMatch' element={<ProtectedRoute Children={<AddMatch/>}/>}/>
          <Route exact path="/shorts" element={<ProtectedRoute  Children={<Shorts/>}/>} />
          <Route exact path="/association" element={<ProtectedRoute  Children={<Association/>}/>} />
          <Route exact path="/tournament" element={<ProtectedRoute Children={<Tournament/>}/>}/>
          <Route exact path="/matches" element={<ProtectedRoute Children={<Matches/>}/>}/>
          <Route exact path="/matches/teams" element={<ProtectedRoute Children={<Teams/>}/>}/>
          <Route exact path="/matches/teams/:id" element={<ProtectedRoute Children={<Teams/>}/>}/>
          <Route exact path='/shorts/AddShorts' element={<ProtectedRoute Children={<AddShorts/>}/>}/>
          <Route exact path='/shorts/comments/:reel_id' element={<ProtectedRoute Children={<ShowComments/>}/>}/>
          <Route exact path='/shorts/addUpdateComments/:reel_id' element={<ProtectedRoute Children={<AddUpdateComments/>}/>}/>
          <Route exact path='/notification' element={<ProtectedRoute Children={<Notification/>}/>}/>

          <Route exact path='/editstatsform' element={<ProtectedRoute Children={<EditStatsForm/>}/>}/>

          <Route exact path='/test' element={<ProtectedRoute Children={<Test/>}/>}/> */}
        </Routes>
   
      </BrowserRouter>
    </>
  );
}
export default App;