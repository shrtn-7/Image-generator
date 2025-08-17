import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {/* Background decoration */}
      <div className="absolute inset-0"></div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold text-sm mb-6 shadow-lg">
          <span className="mr-2">⭐</span>
          #1 Rated AI Image Generator
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Best</span> Image Generator
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">On The Internet</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Transform your ideas into stunning visuals with our cutting-edge AI technology. 
          Create, customize, and download high-quality images in seconds.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button 
            onClick={() => navigate('/result')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Start Creating Now
          </button>
          <button className="px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300">
            How it works
          </button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">10M+</div>
            <div className="text-gray-300">Images Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">99.9%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">4.9/5</div>
            <div className="text-gray-300">User Rating</div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-pulse delay-500"></div>
    </div>
  )
}

export default Header
