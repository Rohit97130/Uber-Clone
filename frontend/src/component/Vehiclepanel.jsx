import React from 'react'

function Vehiclepanel(props) {
  return (
    <div>
          <h3 className=' absolute  top-1 w-[93%]  text-2xl font-semibold text-gray-500 text-center'><i onClick={()=>props.setVehiclepanelOpen(false)} className="ri-arrow-down-wide-line"></i></h3>
      
              <h3 className='text-3xl font-semibold '>Choose a Vehicle</h3>
              <div onClick={()=>props.setconfirmpanelOpen(true)} className='flex  justify-between items-center  active:border-black border-3 border-transparent transition-all duration-300 rounded-2xl p-3 mb-3'>
                 <img className='w-[30%]' src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg" alt="" />
                  <div className='ml-2 flex flex-col w-1/2'>
                      <h4 className='text-2xl font-medium'>Uber Go <span><i class="ri-user-3-fill"></i>5</span> </h4>
                      <h5 className='text-lg font-medium'>2 min away</h5>
                       <p className='text-sm font-normal text-gray-600'>Affordable, compact rides</p>
                  </div>
                      <h1 className=' text-2xl font-semibold w-[30%] text-center'> ₹189.06</h1>
                    
              </div>

               <div onClick={()=>props.setconfirmpanelOpen(true)} className='flex  justify-between items-center active:border-black border-3 border-transparent transition-all duration-150 rounded-2xl p-3 mb-3'>
                 <img className='w-[30%]' src="https://i.pinimg.com/736x/fe/7f/8b/fe7f8b0ab2fe609e5d6b12ac67b414e7.jpg" alt="" />
                  <div className=' ml-2 flex flex-col w-1/2'>
                      <h4 className='text-2xl font-medium'>Uber Go <span><i class="ri-user-3-fill"></i>4</span> </h4>
                      <h5 className='text-lg font-medium'>2 min away</h5>
                       <p className='text-sm font-normal text-gray-600'>Affordable, premium rides</p>
                  </div>
                      <h1 className='text-2xl font-semibold w-[30%] text-center'> ₹250.06</h1>
                    
              </div>

               <div onClick={()=>props.setconfirmpanelOpen(true)} className='flex  justify-between items-center active:border-black border-3 border-transparent transition-all duration-150 rounded-2xl p-3 mb-3'>
                 <img className='w-[30%]' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
                  <div className='ml-2 flex flex-col w-1/2'>
                      <h4 className='text-2xl font-medium'>Uber Go <span><i class="ri-user-3-fill"></i>3</span> </h4>
                      <h5 className='text-lg font-medium'>2 min away</h5>
                       <p className='text-sm font-normal text-gray-600'>Affordable, rickshaw rides</p>
                  </div>
                      <h1 className=' text-2xl font-semibold w-[30%] text-center'>₹130</h1>
                    
              </div>
          
            
              <div onClick={()=>props.setconfirmpanelOpen(true)} className='flex  justify-between items-center active:border-black border-3 border-transparent transition-all duration-150 rounded-2xl p-3 mb-3'>
                 <img className='w-[30%]' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
                  <div className=' ml-2 flex flex-col w-1/2'>
                      <h4 className='text-2xl font-medium'>Uber Go <span><i class="ri-user-3-fill"></i>1</span> </h4>
                      <h5 className='text-lg font-medium'>2 min away</h5>
                       <p className='text-sm font-normal text-gray-600'>Affordable, motorcycle rides</p>
                  </div>
                      <h1 className='text-2xl font-semibold w-[30%] text-center'>₹50</h1>
                    
              </div>
    </div>
  )
}

export default Vehiclepanel