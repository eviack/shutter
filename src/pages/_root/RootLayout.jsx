import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Loader from '@/components/shared/Loader'
import Topbar from '@/components/shared/Topbar'
import { userContext } from '@/context/AuthContext'
import React from 'react'
import { Outlet } from 'react-router-dom'



function RootLayout() {
    const {isLoading} = userContext()
  return !isLoading ?  (
    <div className='w-full md:flex'>
        <Topbar/>
        <LeftSidebar/>

        <section className='flex flex-1 h-full'>
            <Outlet/>
        

        </section>

        <Bottombar/>
        
      
    </div>
  ): (
    <div className='flex w-full justify-center items-center'>
        <Loader/>

    </div>
  
)
}

export default RootLayout
