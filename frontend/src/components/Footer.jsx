import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-10 right-20 w-12 h-12 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/2 right-10 w-8 h-8 bg-gradient-to-r from-pink-400/10 to-red-500/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16">
        

        {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 mb-6">
              <img src={assets.logo} alt="logo" className="w-16 sm:w-20 md:w-24 lg:w-28 object-contain" />
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>© 2025 AI Image. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with ❤️ for creators</span>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5 hover:from-blue-300 hover:to-purple-400 transition-all duration-300 cursor-pointer">
                <img src={assets.facebook_icon} alt="facebook" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5 hover:from-blue-300 hover:to-purple-400 transition-all duration-300 cursor-pointer">
                <img src={assets.instagram_icon} alt="instagram" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5 hover:from-blue-300 hover:to-purple-400 transition-all duration-300 cursor-pointer">
                <img src={assets.twitter_icon} alt="twitter" className="w-full h-full object-contain rounded-full" />
              </div>
            </div>
            
          </div>
      </div>
    </footer>
  )
}

export default Footer
