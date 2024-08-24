import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 flex items-center h-12 justify-center sm:justify-between sm:px-24 lg:px-48 text-white w-full'>
      <div className='font-bold text-xl hidden sm:block'>
        <span className='text-green-600'>&lt;</span>
        Pass
        <span className='text-green-600'>OP/&gt;</span>
      </div>
      <div className='flex items-center gap-1'>
        Created with <img width={25} src="/heart.png" alt="Heart" /> by Bhavishya2601</div>    
    </div>
  )
}

export default Footer
