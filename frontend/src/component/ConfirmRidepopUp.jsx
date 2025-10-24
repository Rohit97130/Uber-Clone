import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function ConfirmRidepopUp(props) {
  if(props.ride === null){
     return <div>Loading...</div>
  }
//   console.log('myconfirmRidepopup ride',props.ride);
  
  const[otp , setOtp] = useState('');
  const navigate = useNavigate();


  const submitHandler = async(e)=>{
     e.preventDefault();


     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/start-ride`,{
      params:{
          rideId:props.ride._id,
          otp:otp
      }, 
      headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
       }
     })


     if(response.status === 200){
        props.setconfirmridepanel(false)
        props.setridepopUpPanel(true)
        navigate('/captain-riding',{ state: { ride: props.ride }})
     }
     else{
        console.log('some error occured');    
     }


  }
  
  return (
      <div>
    
             <h3 className='text-3xl font-semibold mb-2'>Confirm Ride!</h3>

             <div className=' bg-yellow-200  rounded-xl p-3 flex items-center justify-between mt-8'>
                <div className='flex items-center gap-4'>
                    <img className='w-20 h-20 object-cover rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s" alt="" />
                  
                     <h1 className='font-semibold text-2xl'>{props.ride.user.fullname.firstname}
                      {props.ride.user.fullname.lastname}
                     </h1>
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
                         <p className='text-sm -mt-1  text-gray-600'>{props.ride?.destination}</p>
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
                 
                 <form
                  onSubmit={(e)=>{
                    submitHandler(e);
                  }} 
                   className=' w-full'
                  >
                   <input 
                   value={otp}
                   onChange={(e)=>{
                    setOtp(e.target.value)
                   }}
                   className="w-full  mb-4 mt-4  bg-gray-200 font-mono px-4 py-6 rounded-xl text-2xl placeholder:text-2xl"
                   type="text" placeholder='Enter your OTP'/>

                 <button 

                  className=' block w-full  bg-green-600 rounded-2xl font-semibold text-white text-center p-3 mt-4 text-2xl '>
                  Confirm
                  </button>
                 <button 
                  onClick={()=>{
                      props.setridepopUpPanel(true)
                      props.setconfirmridepanel(false)
                    }
                  }
                 className=' bg-red-600 rounded-2xl font-semibold text-white p-3 mt-3 text-2xl w-full'>Cancel</button>
                 </form>


               
             </div>
    </div>
  )
}

export default ConfirmRidepopUp