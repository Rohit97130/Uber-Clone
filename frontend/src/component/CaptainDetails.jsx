import React from 'react'

function CaptainDetails() {
  return (
    <div>
             <div className='flex justify-between items-center'>
                   <div className='flex items-center justify-start gap-4'>
                       <img className='h-12 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="" />
                       <h4 className='text-xl font-semibold'>Robin Warner</h4>
                   </div>
                   <div className='flex flex-col items-center'>
                     <h4 className='text-xl font-semibold'>₹295.20</h4>
                     <p className='text-base text-gray-600 font-semibold'>Earned</p>
                   </div>
               </div>

               <div className='flex justify-around rounded-xl items-center mt-6 bg-gray-200 p-2 py-6'>
                  
                   <div className='text-center'>
                      <i className=' text-3xl font-thin mb-2  ri-timer-2-line'></i>
                      <h5 className='text-lg font-medium'>10.2</h5>
                      <p className='text-sm text-gray-600'>Hours Online</p>
                   </div>
                   <div className='text-center'>
                      <i className=' text-3xl mb-2 font-thin ri-speed-up-line'></i>
                      <h5 className='text-lg font-medium'>10.2</h5>
                      <p className='text-sm text-gray-600'>Hours Online</p>
                   </div>
                   <div className='text-center'>
                      <i className='text-3xl mb-2 font-thin  ri-booklet-line'></i>
                      <h5 className='text-lg font-medium'>10.2</h5>
                      <p className='text-sm text-gray-600'>Hours Online</p>
                   </div>
               </div>
    </div>
  )
}

export default CaptainDetails