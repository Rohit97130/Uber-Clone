import React, { useEffect } from 'react'
import { createContext } from 'react'
import {io} from 'socket.io-client'

export const SocketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

function SocketContext({children}) {
  
    useEffect(()=>{
        //Basic connection Logic
       socket.on('connect',()=>{
          console.log('Connection to the Server');
       })

       socket.on('disconnect',()=>{
          console.log('Disconnected from the Server');
       })
       
    },[]);


  return (
      <SocketDataContext.Provider value={{socket}}>
        {children}
      </SocketDataContext.Provider>
  )
}

export default SocketContext