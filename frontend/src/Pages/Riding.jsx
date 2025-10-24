import React from 'react'
import {Link,useLocation} from 'react-router-dom';
import { useContext } from 'react';
import {SocketDataContext} from '../context/SocketContext'
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../component/LiveTracking';

function Riding() {
   
    const {socket} = useContext(SocketDataContext);
    const navigate = useNavigate();
    const location = useLocation();

     const {ride} = location.state || {}

    socket.on('ride-ended',(data)=>{
       console.log(data);
        navigate('/home');
    })
    return (
    <div>
        <div className='h-screen '>
            <Link to='/home' className='fixed top-2 right-3 bg-white px-4 py-3 rounded-full flex items-center justify-center'>
                <i className=" font-bold text-2xl ri-home-4-line"></i>
            </Link>


            <div className='h-1/2'>
                <LiveTracking />
            </div>


           {/* <div className='h-1/2'>
               <img className='h-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
           </div> */}

           <div className='h-1/2 p-4'>

                <div className='flex items-center justify-between'>
                <img className='h-40' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" />
                 <div className='text-right'>
                     <h3 className='text-2xl font-bold'>{ride?.captain.fullname.firstname}</h3>
                     <h4 className='text-2xl font-semibold -mt-2'>MP20 {ride?.captain.vehicle.plate}</h4>
                     <p className='text-base text-gray-500 -mt-2'>Maruti Suzuki Alto</p>
                 </div>
               </div>

             <div className='flex  flex-col items-center justify-end '>
                 <div className='w-full -m-2'>
                   <div className='flex items-center gap-5 mb-5 p-3 border-b-1'>
                     <i className=' text-2xl ri-map-pin-user-fill'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>562/11-A</h3>
                         <p className='text-sm -mt-1  text-gray-600'>{ride?.destination}</p>
                      </div>
            </div>

                    

                    <div className='flex items-center gap-5 mb-4 p-3'>
                     <i className=' text-2xl ri-currency-line'></i>
                      <div>
                         <h3 className='text-2xl font-medium'>₹{ride?.fare}</h3>
                         <p className='text-sm -mt-1  text-gray-600'>Cash Cash</p>
                      </div>
                   </div>


                 </div>
                 <button className='w-[90%] bg-green-400 rounded-2xl font-semibold text-white p-3 mt-4 text-2xl'>Make a Payment</button>
               
             </div>
           </div>


        </div>

    </div>
  )
}

export default Riding