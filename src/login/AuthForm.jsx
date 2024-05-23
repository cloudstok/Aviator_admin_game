import React, { useState } from 'react';
import Login from './Login';
import OperatorLogin from './OperatorLogin';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='' style={{background:"red", textAlign:"center"}}>
{/*      
      <button onClick={toggleForm}>
        {isLogin ? 'Switch to Operator' : 'Switch to Admin'}
      </button> */}
      {isLogin ? <Login toggleForm = {toggleForm}/> : <OperatorLogin toggleForm= {toggleForm} />}
    </div>
  );
};

export default AuthForm;