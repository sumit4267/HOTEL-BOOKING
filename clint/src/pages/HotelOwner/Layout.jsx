import React from 'react'
import Sidebar from '../../components/HotelOwner/sidebar'
import Navbar from '../../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
const {isOwner, navigate} = useAppContext()
useEffect(() => {
if(!isOwner) {
navigate('/')
}
}, [isOwner])




  return (
<div className='flex flex-col h-screen'>
<Navbar/>
<div className='flex h-full'>
<Sidebar/>

<div className='flex-1 p-4 pt-10 md:px-10 h-full'>
<Outlet/>
</div>
</div>


</div>
  )
}

export default Layout