import React, { use } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react'; 
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';


const Layout = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [sidebar,setSidebar] = useState(false);

  return  user ?(
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt="" onClick={() => navigate('/')}/>
        {
          sidebar ? <X onClick={() => setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/> 
          : <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
        }
      </nav>

      <div className='flex flex-1 w-full min-h-0'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#F4F7FB] min-h-0 overflow-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  ):(
    <div className='flex items-center justify-center h-screen'>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </div>
  )
}

export default Layout
