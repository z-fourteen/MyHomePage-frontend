import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Explore from '../components/Explore'
import Footer from "../components/Footer"

export default function  Homepage() {
  return (
      <div className="page-root">
        <Header />
        <main>
          <Hero />
          <Explore />
        </main>
        <Footer />
      </div>
  )
}