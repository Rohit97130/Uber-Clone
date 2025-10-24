import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';


function CaptainProtected({children}) {
     
    const token = localStorage.getItem('token');
     const navigate = useNavigate();
     const {captain , setCaptain} = useContext(CaptainDataContext);
     const [isLoading , setIsLoading] = useState(true);




     useEffect(()=>{
         if(!token){
            navigate('/captain-login')
         }

         axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/profile`,{
               headers:{
                  Authorization:`Bearer ${token}`
               }
         }).then(response =>{
              if(response.status === 200){
                   setCaptain(response.data.captain);
                   console.log('my responseewill be',response.data);
                   
                   setIsLoading(false);
              }
         }).catch(err =>{
              localStorage.removeItem('token')
                navigate('/captain-login')
         })
     },[token]);




     
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }


  return (
    <div>
        {children}
    </div>
  )
}

export default CaptainProtected