import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const { user } = useContext(AppContext)
  return (
    <div className='flex justify-between items-center py-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
      {/* Logo */}
      <Link to='/' className='group'>
        <div className='flex items-center gap-3'>
          <img src={assets.logo} alt="logo" className='w-16 sm:w-20 md:w-24 lg:w-28 object-contain transition-transform duration-300 group-hover:scale-105' />
        </div>
      </Link>

      {/* Navigation Links */}
      <div className='hidden md:flex items-center gap-8'>
        <Link to='/' className='text-gray-300 hover:text-white transition-colors duration-300 font-medium'>
          Home
        </Link>
        <Link to='/result' className='text-gray-300 hover:text-white transition-colors duration-300 font-medium'>
          Generate
        </Link>
        <Link to='/library' className='text-gray-300 hover:text-white transition-colors duration-300 font-medium'>
          Library
        </Link>
        <a href='#contact' className='text-gray-300 hover:text-white transition-colors duration-300 font-medium'>
          Contact
        </a>
      </div>

      {/* User Actions */}
      <div>
        {
          user ?
          <div className='flex items-center gap-4 md:gap-6'>
            <p className='text-sm font-medium text-gray-300 hidden sm:block'>
              Hi, <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold'>Guest</span>
            </p>
            <div className='relative group'>
              <div className='w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5 hover:from-blue-300 hover:to-purple-400 transition-all duration-300 cursor-pointer'>
                <img src={assets.profile_icon} alt="Profile" className='w-full h-full object-cover rounded-full' />
              </div>
              <div className='absolute hidden group-hover:block top-full right-0 z-20'>
                <div className='bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-gray-200 min-w-[200px]'>
                  <div className='flex items-center gap-3 mb-3 pb-3 border-b border-gray-200'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-0.5'>
                      <img src={assets.profile_icon} alt="Profile" className='w-full h-full object-cover rounded-full' />
                    </div>
                    <div>
                      <div className='font-semibold text-gray-800'>Guest User</div>
                      <div className='text-sm text-gray-500'>Free Plan</div>
                    </div>
                  </div>
                  <ul className='space-y-2'>
                    <li className='text-gray-700 hover:text-blue-600 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium'>
                      Profile Settings
                    </li>
                    <li className='text-gray-700 hover:text-blue-600 cursor-pointer py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-medium'>
                      <Link to='/library'>My Library</Link>
                    </li>
                    <li className='text-red-600 hover:text-red-700 cursor-pointer py-2 px-3 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm font-medium border-t border-gray-200 pt-2 mt-2'>
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          :
          <div className='flex items-center gap-4 md:gap-6'>
            <button className='text-gray-300 hover:text-white transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/10'>
              Login
            </button>
            <button className='bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2.5 text-sm font-semibold rounded-full hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg'>
              Sign Up
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar
