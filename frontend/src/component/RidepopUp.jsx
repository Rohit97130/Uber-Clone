import React from 'react'

function RidepopUp(props) {

   if(props.ride===null){
    return <div>Loading...</div>
   }
   
  return (
       <div>
          <h3 className=' absolute  top-0 w-[93%]  text-2xl font-semibold text-gray-500 text-center'>
            <i onClick={()=>props.setridepopUpPanel(true)}  className="ri-arrow-down-wide-line"></i></h3>
             <h3 className='text-3xl font-semibold mb-2'>New Ride Available!</h3>

             <div className=' bg-yellow-200  rounded-xl p-3 flex items-center justify-between mt-8'>
                <div className='flex items-center gap-4'>
                    <img className='w-20 h-20 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="" />
                     <h1 className='font-semibold text-2xl'>Harsh Patel</h1>
                </div>
                 <h5 className='text-2xl font-semibold'>5.5KM</h5>
             </div>
             
             <div className='flex  flex-col items-center justify-end mt-5'>

                 <div className='w-full -m-2'>

                   <div className='flex items-center gap-5 mb-5 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-user-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>{props.ride.pickup}</p>
                      </div>
                   </div>

                     <div className='flex items-center gap-5 mb-3 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-2-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>{props.ride.destination}</p>
                      </div>
                   </div>

                    <div className='flex items-center gap-5 mb-4 p-3'>
                     <i className=' text-2xl ri-currency-line'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>₹{props.ride.fare}</h3>
                         <p className='text-sm -mt-1  text-gray-600'>Cash Cash</p>
                      </div>
                   </div>
                 </div>
                  
                  <div className='flex justify-between w-full'>
                      <button 
                       onClick={()=>props.setridepopUpPanel(true)}
                      className=' bg-gray-500 rounded-2xl font-semibold text-white p-4 px-8 mt-3 text-2xl'>Ignore</button>
                      <button
                   onClick={()=>{
                     // props.setconfirmridepanel(true);
                     props.confirmRide();
                   }
                  }
                  className=' bg-green-600 rounded-2xl font-semibold text-white p-4 px-8 mt-4 text-2xl'>Accept</button>
                  </div>

               

               
             </div>
    </div>
  )
}

export default RidepopUp