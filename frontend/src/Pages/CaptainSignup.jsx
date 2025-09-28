import React,{useState} from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'


 

function CaptainSignup() {
  const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [FirstName, setFirstName] = useState('');
        const [LastName, setLastName] = useState('');
  
          const {captain ,setCaptain} = useContext(CaptainDataContext);

       const navigate = useNavigate();


  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')


          const submitForm = async(e)=>{
              e.preventDefault();
             console.log(email,password);
             const captainData = {
                fullname:{
                  firstname:FirstName,
                  lastname: LastName
                },
                email:email,
                password,
                vehicle:{
                  color:vehicleColor,
                  plate:vehiclePlate,
                  capacity: vehicleCapacity ,
                  vehicleType : vehicleType
                }
             }

             const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/captains/register`,captainData);
              
             if(response.status === 200){
                 const data = response.data
                 localStorage.setItem('token' , data.token);
                 setCaptain(data.captain)
                 navigate('/captain-home')
             }
             
             setEmail('')
             setPassword('')
             setFirstName('')
             setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

    }
  return (
        <div className="p-5 pt-2 h-screen flex flex-col justify-between">
      <div>
          <img className='h-15' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e)=>submitForm(e)}> 
          <h3 className="text-base mb-1 font-medium">What's your Name</h3>
           <div className='flex gap-2'>
              <input
            required
            className="w-full bg-[#eeeeee] mb-2 rounded px-4 py-2  text-sm placeholder:text-sm"
            type="text"
            value={FirstName}
            onChange={(e)=>setFirstName(e.target.value)}
            placeholder="First Name"

          />
           <input
            required
            className="w-full bg-[#eeeeee] mb-2 rounded px-4 py-2  text-sm placeholder:text-sm"
            type="text"
            value={LastName}
            onChange={(e)=>setLastName(e.target.value)}
            placeholder="last Name"
          />
           </div>

          <h3 className="text-base mb-1 font-medium">What's your email</h3>
          <input
            required
            className="w-full bg-[#eeeeee] mb-2 rounded px-4 py-2  text-sm placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-base mb-1 font-medium">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-[#eeeeee] mb-2 rounded px-4 py-2  text-sm placeholder:text-sm"
            placeholder="password"
          />


          <h3 className='text-base font-medium mb-1'>Vehicle Information</h3>
           <div  className='flex gap-4 mb-2'>
              <input 
                 required
                 className=' bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 text-sm placeholder:text-sm'
                 type="text" 
                 placeholder='vehicle Color'
                 value={vehicleColor}
                 onChange={(e)=>setVehicleColor(e.target.value)}
              />

                 <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-sm placeholder:text-sm'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
           </div>

             <div className='flex gap-4 mb-2'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-sm placeholder:text-sm'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2  text-sm placeholder:text-sm'
              onChange={(e)=>{setVehicleType(e.target.value)}}
              value={vehicleType}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
            </div>


          <button className="w-full bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border text-sm placeholder:text-sm">
            Login
          </button>

          <p className="text-center text-sm">
           Already have a account?{" "}
            <Link className="text-blue-500" to="/login">
              Login here
            </Link>{" "}
          </p>
        </form>
      </div>


      <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup