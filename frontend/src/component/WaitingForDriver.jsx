import React from 'react'

function WaitingForDriver(props) {
  
   if(props.ride === null){
     return <div>Loading....</div>
   }
   
  return (
      <div>
          <h5 className=' absolute  top-0 w-[93%]  text-2xl font-semibold text-gray-500 text-center'>
            <i onClick={()=>props.setwaitingForDriver(false)} className="ri-arrow-down-wide-line"></i></h5>
             <h3 className='text-3xl font-semibold mb-2'>Waiting For Driver</h3>
             
               <div className='flex items-center justify-between'>
                 <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                 <div className='text-right'>
                     <h3 className='text-2xl font-bold'>{props.ride.captain.fullname.firstname}</h3>
                     <h4 className='text-2xl font-semibold -mt-2'>MP20 {props.ride.captain.vehicle.plate}</h4>
                     <p className='text-base text-gray-500 -mt-2'>{props.ride.captain.vehicle.color} {props.ride.captain.vehicle.vehicleType}</p>
                      <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>
                 </div>
               </div>
             <div className='flex  flex-col items-center justify-end '>
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
               
             </div>
    </div>
  )
}

export default WaitingForDriver