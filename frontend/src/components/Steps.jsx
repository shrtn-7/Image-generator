import React from 'react'
import { useNavigate } from 'react-router-dom'
import { stepsData } from '../assets/assets'

const Steps = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left floating circle */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full animate-pulse"></div>
        
        {/* Top right floating circle */}
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full animate-pulse delay-1000"></div>
        
        {/* Middle left floating element */}
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-r from-pink-400/20 to-red-500/20 rounded-full animate-pulse delay-500"></div>
        
        {/* Bottom right floating circle */}
        <div className="absolute bottom-32 right-10 w-20 h-20 bg-gradient-to-r from-green-400/20 to-teal-500/20 rounded-full animate-pulse delay-1500"></div>
        
        {/* Center floating element */}
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold text-sm mb-6 shadow-lg">
          <span className="mr-2">🚀</span>
          Simple 3-Step Process
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Works</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Create stunning AI-generated images in just three simple steps. 
          No technical skills required - just describe, generate, and download!
        </p>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stepsData.map((step, index) => (
            <div key={index} className="group relative">
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-xl shadow-xl">
                  {index + 1}
                </div>
              </div>

              {/* Step Card */}
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 pt-16 border border-white/20 hover:border-white/40 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative z-10 mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center p-4 border border-white/20 group-hover:border-white/40 transition-all duration-300">
                    <img 
                      src={step.icon} 
                      alt={step.title} 
                      className="w-12 h-12 object-contain filter invert group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connection Line (for desktop) */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 relative z-10">
          <button 
            onClick={() => navigate('/result')}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Start Creating Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Steps
