import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 min-h-screen bg-gradient-to-b from-gray-600 to-black text-white'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
