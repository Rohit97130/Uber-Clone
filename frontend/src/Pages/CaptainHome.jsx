import React ,{useState,useRef} from 'react'
import {Link} from 'react-router-dom'
import CaptainDetails from '../component/CaptainDetails'
import RidepopUp from '../component/RidepopUp'
import LiveTracking from '../component/LiveTracking'

import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import ConfirmRidepopUp from '../component/ConfirmRidepopUp'
import { SocketDataContext } from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptainContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios';

function CaptainHome() {
    const [ridepopUpPanel, setridepopUpPanel] = useState(true);//for testing purpose change after work done
    const ridepopUpPanelRef = useRef(null);

    const [confirmridepanel,setconfirmridepanel] = useState(false);
    const confirmridepanelRef = useRef(null);

    const [ride,setride] = useState(null);

    useGSAP(()=>{
        if(ridepopUpPanel){
            gsap.to(ridepopUpPanelRef.current,{
                y:'100%',
            })
        }
        else{
            gsap.to(ridepopUpPanelRef.current,{
                y:0
           })
        }
    },[ridepopUpPanel]);

    useGSAP(()=>{
        if(confirmridepanel){
            gsap.to(confirmridepanelRef.current,{
                y:0
            })
        }
        else{
            gsap.to(confirmridepanelRef.current,{
               y:'100%',
           })
        }
    },[confirmridepanel]);


    const {socket} = useContext(SocketDataContext);
    const {captain,setCaptain} = useContext(CaptainDataContext);

    // console.log('my captain -> ',captain);

    const captainId = captain && captain._id ? captain._id : null;
    useEffect(()=>{
        socket.emit('join',{
            userType:'captain',
            userId:captainId
        })
        //   const updateLocation = () => {
        //     if (navigator.geolocation) {
        //         navigator.geolocation.getCurrentPosition(position => {
        //             socket.emit('update-location-captain', {
        //                 userId: captainId,
        //                 location: {
        //                     ltd: position.coords.latitude,
        //                     lng: position.coords.longitude
        //                 }
        //             })     
        //         })
        //     }
        //     else{
        //         console.log('not allowing geolocation'); 
        //     }
        // }

        // const locationInterval = setInterval(updateLocation, 10000)
        // updateLocation()

    },[]);


     
    socket.on('new-ride',(data)=>{

        setride(data);
        setridepopUpPanel(false)
    })   
     
    // console.log('my ride is',ride);


   async function confirmRide(){
         console.log('fndknfkjndf');
         
         try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/confirm`,
            {
               rideId: ride._id
            },
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            }
          );

            setridepopUpPanel(true)
            setconfirmridepanel(true)
            // console.log('mu ride',response.data);
         }
         catch(err){
            console.log('my confirm ride error ->',err.message);
         }
         


    }


    
    

  return (

      

        <div className='h-screen '>

           <div className='fixed top-0 p-2 w-screen flex items-center justify-between' >
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/home' className='px-4 py-3  '>
                <i className=" bg-white rounded-2xl px-2 py-2 font-bold text-2xl ri-logout-box-r-line"></i>
            </Link>
           </div>


           <div className='h-3/5'>
               <img className='h-full object-cover w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
           </div>

              {/* <div className='h-3/5'>
                  <LiveTracking />
            </div> */}
           <div className='h-2/5 p-4 mt-3'>
              <CaptainDetails/>
             </div>


              
               <div ref={ridepopUpPanelRef} className='fixed  bottom-0 z-10  bg-white w-full h-[70%] px-3 py-6 pt-10'>
                <RidepopUp 
                setridepopUpPanel={setridepopUpPanel} 
                ride = {ride}
                setconfirmridepanel={setconfirmridepanel}
                confirmRide={confirmRide}
                />
              </div>





               <div ref={confirmridepanelRef} className='fixed h-full  bottom-0 z-10  bg-white w-full  px-3 py-6 pt-10'>
                   <ConfirmRidepopUp 
                   ride={ride}
                   setridepopUpPanel={setridepopUpPanel} 
                   setconfirmridepanel={setconfirmridepanel}  />
               </div> 

             </div>
         

  )}


export default CaptainHome