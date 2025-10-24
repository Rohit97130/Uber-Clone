import React,{useState,useRef, useEffect} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import LocationSearchPanel from '../component/LocationSearchPanel'
import Vehiclepanel from '../component/Vehiclepanel'
import Confirmride from '../component/Confirmride'
import WaitingForDriver from '../component/WaitingForDriver'
import LookingforDriver from '../component/LookingforDriver'
import axios from 'axios'
import {SocketDataContext} from '../context/SocketContext'
import {UserDataContext} from '../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../component/LiveTracking'


function Home() {
   
   
   
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false);


  const panelref = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclepanelOpen, setVehiclepanelOpen] =  useState(true);
  const vehiclepanelOpenRef = useRef(null);
  const confirmpanelOpenRef = useRef(null);
  const [confirmpanelOpen, setconfirmpanelOpen] = useState(false);
  const [vehicleFound, setvehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const[waitingForDriver , setwaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  const[suggestion,setsuggestion] = useState([]);
  const [activeField, setactiveField] = useState('');

   const[fare,setfare] = useState({});

   const[vehicleType, setvehicleType] = useState(null);

   const[Ride,setRide] = useState(null);
  
  
  
  useGSAP(function(){
      if(panelOpen){
        gsap.to(panelref.current,{
           height:'70%',
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
             y:"100%",
            duration:0.5,
            ease:"power1.out"
        })
     }
     else{
       gsap.to(vehiclepanelOpenRef.current,{
          y:'0',
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
  




  //suggestion 
 const handlePickupChange = async(e)=>{
      //  console.log(e.target.value);
       
    try{
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/maps/get-suggestions`,{
                  params:{
                      input: e.target.value
                  },
                  headers:{
                     Authorization:`Bearer ${localStorage.getItem('token')}`
                  }
            });  
            setsuggestion(response.data);
    }catch(err){
       if(err.response){
       console.log('error with get suggestion' ,err.response.data);
       }      
    }
 }



// //  //calculation of fare
 async function  calculatefare(){  
   try{
           const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/rides/get-fare`,
            {
              params:{
                 pickup:pickup,
                 destination:destination
              },
              headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          });

          setfare(response.data);
   }
   catch(err){
       console.log(err.response.data);  
   }

 }



 //find a trip
const  findTrip  = ()=>{
     setVehiclepanelOpen(false);
     setPanelOpen(false)
     calculatefare()
}




  

  const submitHandler = (e)=>{
       e.preventdefault();
  }


  useEffect(()=>{
  const fakeEvent = { target: { value: "jabalpur" } };
  handlePickupChange(fakeEvent);
  },[]);



  
    //this will connect to backend socket.io server
    const {socket} = useContext(SocketDataContext);
    const {user} = useContext(UserDataContext);
 
    
    useEffect(()=>{
       socket.emit('join',{
         userType:'user',
         userId:user._id
       })
    },[user]);



    socket.on('ride-confirmed',(data)=>{
         setvehicleFound(false)
         setRide(data);
         setwaitingForDriver(true)
    })

    const navigate = useNavigate();


    socket.on('ride-started',(ride)=>{
        console.log("ride")
        setwaitingForDriver(false)
        navigate('/riding', { state: { ride } }) 
    })


    
    //createRide

    async function createRide(){
        
      try{
         const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/create`,
         {
            pickup,
            destination,
            vehicleType
         }, {
            headers:{
               Authorization:`Bearer ${localStorage.getItem('token')}`
            }
         })
         console.log('my data will be',response.data);
      }
      catch(err){
         console.log(`error occurred`,err.response);
      }
    }


   //  console.log('my user',user);
    




  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
       
       <div className='h-screen w-screen'>
         {/* image for temporay use  */}
          {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
          <LiveTracking/>
       </div>


       <div className='flex flex-col  justify-end h-screen absolute  top-0 w-full '>

        <div className=' bg-white h-[30%] p-5 relative'>

          <h5 onClick={()=>setPanelOpen(false)} ref={panelCloseRef} className='text-3xl absolute top-6 right-6'>
          <i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-3xl font-semibold '>Find a trip</h4>


          <form onSubmit={(e)=>submitHandler(e)} >
             <div className="line w-1 h-20 absolute top-[37%] left-10  bg-gray-800 rounded-full "></div>
             <input 
            value={pickup}
            onChange={(e)=>{
                setpickup(e.target.value)
                handlePickupChange(e);
                setactiveField('pickup')
            }}
             onClick={()=>setPanelOpen(true)}
             className='bg-[#e5e7eb] px-12 py-4 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a pick up Location' />
             <input
              value={destination}
               
               onClick={()=>{
                  setPanelOpen(true)
                  setactiveField('desti')
               }}
               onChange={(e)=>{
                  setdestination(e.target.value)
                  handlePickupChange(e);
               }
            }
               className='bg-[#e5e7eb] px-12  py-4 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination' />
          </form>
            
            <button
                        onClick={findTrip}
                        className='bg-black text-white text-xl px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
             </button>
          </div>


        
          <div className='bg-white  ' ref= {panelref}>
              <LocationSearchPanel
              suggestion = {suggestion}
              setVehiclepanelOpen= {setVehiclepanelOpen} setPanelOpen={setPanelOpen}
              setpickup={setpickup}
              setdestination={setdestination}
              setactiveField = {setactiveField}
              activeField={activeField}
              />
          </div>

       </div>






        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={vehiclepanelOpenRef} >
             <Vehiclepanel 
              fare={fare}
              setconfirmpanelOpen={setconfirmpanelOpen} setVehiclepanelOpen={setVehiclepanelOpen}
              selectVehicle ={setvehicleType}
              />
        </div>







        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={confirmpanelOpenRef}>
               <Confirmride
                fare={fare}
                pickup={pickup}
                destination={destination}
                setconfirmpanelOpen={setconfirmpanelOpen} 
                setvehicleFound={setvehicleFound} 
                vehicleType={vehicleType}
                createRide = {createRide}
               />
        </div>







        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={vehicleFoundRef}>
             <LookingforDriver 
             setvehicleFound={setvehicleFound}
             pickup={pickup}
             destination={destination}
             fare={fare}
             vehicleType={vehicleType}
             createRide={createRide}
             />
        </div>

          



        <div className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10' ref={waitingForDriverRef}>
             <WaitingForDriver 
             setwaitingForDriver={setwaitingForDriver}
             ride ={Ride}

             
            />
        </div>





    </div>
  )
}

export default Home