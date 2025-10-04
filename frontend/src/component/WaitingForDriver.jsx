import React from 'react'

function WaitingForDriver(props) {
  return (
      <div>
          <h3 className=' absolute  top-0 w-[93%]  text-2xl font-semibold text-gray-500 text-center'>
            <i onClick={()=>props.setwaitingForDriver(false)} className="ri-arrow-down-wide-line"></i></h3>
             <h3 className='text-3xl font-semibold mb-2'>Waiting For Driver</h3>
             
               <div className='flex items-center justify-between'>
                <img className='h-40' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" />
                 <div className='text-right'>
                     <h3 className='text-2xl font-bold'>Sarthak</h3>
                     <h4 className='text-2xl font-semibold -mt-2'>MP20 AB 1234</h4>
                     <p className='text-base text-gray-500 -mt-2'>Maruti Suzuki Alto</p>
                 </div>
               </div>
             <div className='flex  flex-col items-center justify-end '>
                 <div className='w-full -m-2'>
                   <div className='flex items-center gap-5 mb-5 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-user-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>Kankariya Talab, Bhopal</p>
                      </div>
                   </div>

                     <div className='flex items-center gap-5 mb-3 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-2-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>Kankariya Talab, Bhopal</p>
                      </div>
                   </div>

                    <div className='flex items-center gap-5 mb-4 p-3'>
                     <i className=' text-2xl ri-currency-line'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>₹189</h3>
                         <p className='text-sm -mt-1  text-gray-600'>Cash Cash</p>
                      </div>
                   </div>
                 </div>
               
             </div>
    </div>
  )
}

export default WaitingForDriver