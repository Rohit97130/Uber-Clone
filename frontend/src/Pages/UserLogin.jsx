import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserLogin() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userdata,setuserdata] = useState({});
    
    
  
     const submitForm = (e)=>{
         e.preventDefault();
        console.log(email,password);
        setuserdata({
          email:email,
          password:password
        })
       
        setEmail('')
        setPassword('')
     }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-3" src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-2018-present.jpg" alt="" />
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
            New here?{" "}
            <Link className="text-blue-500" to="/signup">
              Create new account
            </Link>{" "}
          </p>
        </form>
      </div>
      <div>
        <Link to="/captain-login"
        className="w-full flex justify-center items-center bg-[#10b461] text-white font-semibold mb-5 rounded px-4 py-2 border text-lg placeholder:text-base">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
