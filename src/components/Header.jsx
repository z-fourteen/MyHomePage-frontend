import React from 'react'
import { Link } from 'react-router-dom'
import "../static/Header.css"; 

export default function Header() {
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
          </ul>
        </nav>
      </div>
    </header>
  )
}