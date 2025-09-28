import React from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function UserProtectedWrapper({children}) {
     const navigate = useNavigate();
     

     const token = localStorage.getItem('token');
     const {user,setUser} = useContext(UserDataContext);

     useEffect(() => {

    if (!token) {
      navigate("/login");
    }


     axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/profile`,{
               headers:{
                  Authorization:`Bearer ${token}`
               }
         }).then(response =>{
              if(response.status === 200){
                   setUser(response.data.user);
                   setIsLoading(false);
              }
         }).catch(err =>{
              localStorage.removeItem('token')
                navigate('/login')
         })
  }, [token]);


  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper