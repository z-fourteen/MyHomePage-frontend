import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants';
import "../static/Header.css"; 

export default function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* 汉堡按钮 */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <nav>
          {/* 这里用 state 控制 class */}
          <ul className={menuOpen ? "active" : ""}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/study" onClick={() => setMenuOpen(false)}>Study</Link></li>
            <li><Link to="/thoughts" onClick={() => setMenuOpen(false)}>Thoughts</Link></li>
            <li><Link to="/message" onClick={() => setMenuOpen(false)}>Messages</Link></li>
            {
              isAuthenticated ?
              (
                <li>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }} 
                    className="nav-button"
                  >
                    Logout
                  </button>
                </li>
              ) :
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}
