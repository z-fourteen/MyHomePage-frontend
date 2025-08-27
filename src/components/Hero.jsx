import '../static/Hero.css';
import React from 'react'

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-text">
        <h2>Welcome to Fourteen's Forest</h2>
        <p>Hope to exlpore this world with you!</p>
        <p className="cta-row">
          <a className = "btn" href="#explore">Explore</a>
        </p>
      </div>
    </section>
  )
}