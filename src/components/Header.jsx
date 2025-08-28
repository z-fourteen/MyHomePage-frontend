import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants';
import { useState, useEffect } from 'react';
import "../static/Header.css"; 

export default function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 检查本地是否有 token
    setIsAuthenticated(!!localStorage.getItem(ACCESS_TOKEN));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="container">
        <h1 className="logo">z-fourteen</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/study">Study</Link></li>
            <li><Link to="/thoughts">Thoughts</Link></li>
            <li><Link to="/message">Messages</Link></li>
            {
              isAuthenticated ?
              <button onClick={handleLogout}>退出登录</button> :
              <button onClick={() => navigate("/login")}>登录</button>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}