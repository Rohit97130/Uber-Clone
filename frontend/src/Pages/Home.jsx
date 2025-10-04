import React,{useState,useRef} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import LocationSearchPanel from '../component/LocationSearchPanel'
import Vehiclepanel from '../component/Vehiclepanel'
import Confirmride from '../component/Confirmride'
import WaitingForDriver from '../component/WaitingForDriver'
import LookingforDriver from '../component/LookingforDriver'


function Home() {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);
  const panelref = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclepanelOpen, setVehiclepanelOpen] =  useState(false);
  const vehiclepanelOpenRef = useRef(null);
  const confirmpanelOpenRef = useRef(null);
  const [confirmpanelOpen, setconfirmpanelOpen] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const[waitingForDriver , setwaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);
  
  
  
  useGSAP(function(){
      if(panelOpen){
        gsap.to(panelref.current,{
           height:'75%',
           padding: 24,
           duration:0.5
  
          //  opacity:1,
        })

        gsap.to(panelCloseRef.current,{
           opacity:1
        })
      }
      else{
         gsap.to(panelref.current,{
           height:'0%',
           padding:0,
          //  opacity:0,
          duration:0.5
          
        })
        gsap.to(panelCloseRef.current,{
           opacity:0
        })
      }
  },[panelOpen]);

  useGSAP(()=>{
     if(vehiclepanelOpen){
        gsap.to(vehiclepanelOpenRef.current,{
            y:0,
            duration:0.5,
            ease:"power1.out"
        })
     }
     else{
       gsap.to(vehiclepanelOpenRef.current,{
          y:"100%",
          duration:0.5,
          ease: "power1.in"
       })
     }
  },[vehiclepanelOpen])


  useGSAP(()=>{
     if(confirmpanelOpen){
        gsap.to(confirmpanelOpenRef.current,{
            y:0,
            duration:0.5,
            ease:"power1.out"
        })
     }
     else{
       gsap.to(confirmpanelOpenRef.current,{
          y:"100%",
          duration:0.5,
          ease: "power1.in"
       })
     }
  },[confirmpanelOpen])


  
  useGSAP(()=>{
     if(vehicleFound){
        gsap.to(vehicleFoundRef.current,{
            y:0,
            duration:0.5,
            ease:"power1.out"
        })
     }
     else{
       gsap.to(vehicleFoundRef.current,{
          y:"100%",
          duration:0.5,
          ease: "power1.in"
       })
     }
  },[vehicleFound])
  


  
  useGSAP(()=>{
     if(waitingForDriver){
        gsap.to(waitingForDriverRef.current,{
            y:0,
            duration:0.5,
            ease:"power1.out"
        })
     }
     else{
       gsap.to(waitingForDriverRef.current,{
          y:"100%",
          duration:0.5,
          ease: "power1.in"
       })
     }
  },[waitingForDriver])
  
  

  const submitHandler = (e)=>{
       e.preventdefault();
  }
  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
       
       <div className='h-screen w-screen'>
         {/* image for temporay use  */}
          <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
       </div>

       <div className='flex flex-col justify-end h-screen absolute  top-0 w-full '>

        <div className=' bg-white h-[25%] p-5 relative' >
           <h5 onClick={()=>setPanelOpen(false)} ref={panelCloseRef} className='text-3xl absolute top-6 right-6'>
             <i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-3xl font-semibold '>Find a trip</h4>

          <form onSubmit={(e)=>submitHandler(e)} >
             <div className="line w-1 h-20 absolute top-[37%] left-10  bg-gray-800 rounded-full "></div>
             <input 
            value={pickup}
            onChange={(e)=>{
                setpickup(e.target.value)
            }}
            onClick={()=>setPanelOpen(true)}
             className='bg-[#e5e7eb] px-12 py-4 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick up Location' />
             <input
              value={destination}
               onClick={()=>setPanelOpen(true)}
               onChange={e=>setdestination(e.target.value)}
               className='bg-[#e5e7eb] px-12  py-4 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
          </div>
        
          <div className='bg-white  ' ref= {panelref}>
              <LocationSearchPanel setVehiclepanelOpen={setVehiclepanelOpen} setPanelOpen={setPanelOpen}/>
          </div>
          
       </div>


        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={vehiclepanelOpenRef} >
             <Vehiclepanel setconfirmpanelOpen={setconfirmpanelOpen} setVehiclepanelOpen={setVehiclepanelOpen}/>

        </div>


        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={confirmpanelOpenRef}>
             <Confirmride setconfirmpanelOpen={setconfirmpanelOpen} setvehicleFound={setvehicleFound} />
        </div>


        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={vehicleFoundRef}>
             <LookingforDriver setvehicleFound={setvehicleFound}/>
        </div>

          
        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={waitingForDriverRef}>
             <WaitingForDriver setwaitingForDriver={setwaitingForDriver}/>
        </div>





    </div>
  )
}

export default Home