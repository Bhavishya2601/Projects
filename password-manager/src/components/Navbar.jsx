import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex items-center h-12 justify-between px-3 sm:px-24 lg:px-48 text-white'>
      <div className='font-bold text-xl'>
        <span className='text-green-600'>&lt;</span>
        Pass
        <span className='text-green-600'>OP/&gt;</span>
      </div>
      <button className='text-white flex bg-green-800 items-center p-1 gap-2 rounded-2xl ring-1 ring-white'>
        <img className=' w-7' src="/github.svg" alt="Github" />
        <span className='font-bold'>Github</span>
      </button>
    </nav>
  )
}

export default Navbar
