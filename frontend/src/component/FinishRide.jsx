import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

function FinishRide(props) {

   console.log('finishride', props.ride);
   
   const navigate = useNavigate();
   const endRide = async()=>{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/end-ride`,{
           rideId:props.ride?._id
      },{
         headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
         }
      })

     
      if(response.status === 200){
           navigate('/captain-home');
      }
      else{
         console.log('some error has been occured');  
      }
   }

  return (
      <div>
             <h3 className=' absolute  top-0 w-[93%]  text-2xl font-semibold text-gray-500 text-center'>
            <i onClick={()=>props.setfinishRidePanel(false)} className="ri-arrow-down-wide-line"></i></h3>

             <h3 className='text-3xl font-semibold mb-2'>Finish this Ride!</h3>
             <div className=' bg-yellow-200  rounded-xl p-3 flex items-center justify-between mt-8'>
                <div className='flex items-center gap-4'>
                    {/* <img className='w-20 h-20 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="" /> */}
                       <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                     <h1 className='font-semibold text-2xl'>{props.ride?.user.fullname.firstname}</h1>
                </div>
                 <h5 className='text-2xl font-semibold'>5.5KM</h5>
             </div>
             
             <div className='flex  flex-col items-center justify-end mt-5'>

                 <div className='w-full -m-2'>

                   <div className='flex items-center gap-5 mb-5 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-user-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>{props.ride?.pickup}</p>
                      </div>
                   </div>

                     <div className='flex items-center gap-5 mb-3 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-2-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>{props.ride?.destination}</p>
                      </div>
                   </div>

                    <div className='flex items-center gap-5 mb-4 p-3'>
                     <i className=' text-2xl ri-currency-line'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>₹{props.ride?.fare}</h3>
                         <p className='text-sm -mt-1  text-gray-600'>Cash Cash</p>
                      </div>
                   </div>
                 </div>

                   <div className='mt-10 w-full'>

                    <button
                        onClick={endRide}
                        className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>


                </div>
      
             </div>
    </div>
  )
}

export default FinishRide