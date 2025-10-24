import React from 'react'

function LocationSearchPanel(props) {
  //  const location = [
  //     "24A, ranital Chowk, sector-15 Jabalpur",
  //     "25B, near Kapoor Cafe, sector-18 Jabalpur",
  //     "12A, near Malhotra Cafe , sector-13 Jabalpur",
  //     "40A, near Jain cafe, sector-15 Jabalpur"
  //  ] dummy data



  return (
    <div>
      {/* this is our dummy  data */}
     
   

     {
        props.suggestion.map(function(elem,idx){
            return (
             <div 
              key={idx}
             className='flex items-center gap-4 p-3  mb-4 border-2 border-gray-50 active:border-black rounded-xl'>
             <h3 className=' w-16 h-16 flex justify-center items-center rounded-full bg-[#eeeeee] leading-none text-2xl'><i className="ri-map-pin-fill"></i></h3>
             <h4 className='text-2xl font-medium' onClick={()=>{
               if(props.activeField === 'desti'){
                  props.setdestination(elem)
                  //  props.setPanelOpen(false)
               }else{
                 props.setpickup(elem)
               }
             }} >{elem}</h4>
             </div>
            ) 
        })
     }


    </div>
  )
}

export default LocationSearchPanel