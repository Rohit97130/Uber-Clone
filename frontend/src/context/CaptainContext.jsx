import React, {createContext, useState } from 'react'



export const CaptainDataContext = createContext();

function CaptainContext({children}) {
    const[captain ,setCaptain] = useState(null);
    const [error , setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

     const updateCaptain = (captainData)=>{
        setCaptain(captainData);
     }

   
     
    const value = {
        captain,
        error,
        isLoading,
        setIsLoading,
        setError,
        setCaptain,
        updateCaptain
    }

  return (
    <CaptainDataContext.Provider value={value}> 
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext