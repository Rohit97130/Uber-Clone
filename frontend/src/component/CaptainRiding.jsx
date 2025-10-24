import React, { useRef, useState } from  'react'
import {Link,useLocation} from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from './FinishRide';
import LiveTracking from './LiveTracking';


function CaptainRiding(){
    const[finishRidePanel, setfinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null)

    const location = useLocation();
    
    const rideData = location.state?.ride;


  useGSAP(()=>{
     if(finishRidePanel){
        gsap.to(finishRidePanelRef.current,{
            y:0,
            duration:0.5,
            ease:"power1.out"
        })
     }
     else{
       gsap.to(finishRidePanelRef.current,{
          y:"100%",
          duration:0.5,
          ease: "power1.in"
       })
     }
  },[finishRidePanel])




    return(
         <div className='h-screen '>

           <div className='fixed top-0 p-2 w-screen flex items-center justify-between' >
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/home' className='px-4 py-3  '>
                <i className=" bg-white rounded-2xl px-2 py-2 font-bold text-2xl ri-logout-box-r-line"></i>
            </Link>
           </div>


           {/* <div className='h-4/5'>
               <img className='h-full object-cover w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
           </div> */}

             <div className='h-4/5'>
                  <LiveTracking />
            </div>


           
           <div onClick={()=>setfinishRidePanel(true)} className='h-1/5 bg-yellow-200 flex flex-col  gap-5'>
                <div className='flex justify-center mt-3 '>
                     <i className=" text-3xl font-bold ri-arrow-up-wide-line"></i>
                </div>
                <div className='flex justify-around items-center '>
                    <h4 className='text-2xl font-semibold'>4 KM away</h4>
                    <button
                     className=' bg-green-600 rounded-2xl font-semibold text-white p-4  text-2xl'
                     onClick={()=>{
                        setfinishRidePanel(true)
                     }}>Complete Ride</button>
                </div>
           </div>


             <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide 
                 ride={rideData}
                setfinishRidePanel={setfinishRidePanel}/>
            </div>

    </div>
    )
}

export default CaptainRiding


