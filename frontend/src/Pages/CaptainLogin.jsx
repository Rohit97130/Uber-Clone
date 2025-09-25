import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

function CaptainLogin() {
  const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [captainData,setcaptainData] = useState({});
   
       
     
       const submitForm = (e)=>{
           e.preventDefault();
          console.log(email,password);
          setcaptainData({
            email,
            password
          })
         
          setEmail('')
          setPassword('')
       }
  return (
     <div className="p-7 h-screen flex flex-col justify-between">

      <div>
        <img className='h-15 mb-1' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
        <form onSubmit={(e)=>submitForm(e)}
        >
          <h3 className="text-lg mb-2 font-medium">What's your email</h3>
          <input
            required
            className="w-full bg-[#eeeeee] mb-7 rounded px-4 py-2  text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-[#eeeeee] mb-7 rounded px-4 py-2  text-lg placeholder:text-base"
            placeholder="password"
          />

          <button className="w-full bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 border text-lg placeholder:text-base">
            Login
          </button>

          <p className="text-center text-sm">
            Join a fleet?{" "}
            <Link className="text-blue-500" to="/captain-signup">
              Register as a captain
            </Link>{" "}
          </p>
        </form>
      </div>
      <div>
        <Link to="/login"
        className="w-full flex justify-center items-center bg-[#d5622d] text-white font-semibold mb-5 rounded px-4 py-2 border text-lg placeholder:text-base">
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin