import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';



function UserLogout() {

        const token = localStorage.getItem('token');
        const navigate  = useNavigate();
       
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,{
            headers:{
                Authorization: `Beared ${token}`
            }
        }).then((response)=>{
               if(response.status === 200){
                    localStorage.removeItem('token');
                    navigate('/login')
               }
        }).catch((err)=>{
            console.log(err);
        })

  return (
    <div>
       UserLogout
    </div>
  )
}

export default UserLogout