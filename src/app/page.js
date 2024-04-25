import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  
  return (
    <div className='bg-black text-white flex justify-center items-center h-screen flex-col'>
      <Image src="/asset/Eco1.png" height={200} width={200}></Image>
      <p className='text-[50px]'>Welcome Admin</p>
      <br/>
      <p>Go to  <span><Link className='underline' href="/login">login</Link></span> page</p>
    </div>
  )
}

export default page
