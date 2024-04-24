import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';


const TIMEOUT_IN_SECONDS = 3600; 

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    resetSessionTimeout();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); 
  };

  let timeoutId;

  const resetSessionTimeout = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    }, TIMEOUT_IN_SECONDS * 1000);
  };

  useEffect(() => {
    resetSessionTimeout();
    document.addEventListener('mousemove', resetSessionTimeout);
    return () => {
      document.removeEventListener('mousemove', resetSessionTimeout);
    };
  }, [isLoggedIn]);

  return (
<Router>
      {isLoggedIn ? (
        <App handleLogout={handleLogout} />
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </Router>
    
  );
};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
