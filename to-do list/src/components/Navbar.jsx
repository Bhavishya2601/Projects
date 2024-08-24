import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-violet-700 text-white sm:px-24 px-5 py-2'>
        <div>
            <span className='font-bold text-xl'>iTask</span>
        </div>
        <ul className='flex sm:gap-7 gap-3 '>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Your Tasks</li>
        </ul>
    </div>
  )
}

export default Navbar
