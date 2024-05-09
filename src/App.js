import React, {useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import ProtectedRoute from './services/ProtectedRoute';
import Login from './login/Login';
import AllBets from './pages/allbets/AllBets';
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
        
        </Routes>
   
      </BrowserRouter>
    </>
  );
}
export default App;