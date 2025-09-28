import React ,{useEffect, useState} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';




function UserSignup() {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [FirstName, setFirstName] = useState('');
      const [LastName, setLastName] = useState('');
      const navigate = useNavigate();

      const {user, setUser} =  useContext(UserDataContext);

        
        const submitForm = async(e)=>{
            e.preventDefault();
           setEmail('')
           setPassword('')
           setFirstName('')
           setLastName('')

           const newUser = {
              fullname:{
                 firstname:FirstName,
                 lastname:LastName
              },
              email:email,
              password:password
           }

          try{
           const response =  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/register`,newUser);
           if(response.status === 201){
               const data = response.data
               setUser(data.user);
               localStorage.setItem('token',data.token);
               navigate('/home');
           }
        }
            catch(err){
               if(err.response){
                  if(err.response.status === 400){
                     //validation error
                     const errors = err.response.data.errors;
                     console.log(errors);
                     alert(errors.map(err=>`${err.msg}`) || 'Validation error');
                  }
                  else if(err.response.status === 409){
                      alert(err.response.data.message || 'User alredy register');
                  }else{
                      alert("Unexpected error. Please try again later.");
                  }
               } else if(err.request){
                 // ✅ No response from server
                  alert("No response from server. Please check your connection.");
               }
            }
    }

  return (
       <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-12 mb-2" src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo-2018-present.jpg" alt="" />
        <form onSubmit={(e)=>submitForm(e)}
        >
          
           
          <h3 className="text-base mb-2 font-medium">What's your Name</h3>
           <div className='flex gap-2'>
              <input
            required
            className="w-full bg-[#eeeeee] mb-4 rounded px-4 py-2  text-sm placeholder:text-sm"
            type="text"
            value={FirstName}
            onChange={(e)=>setFirstName(e.target.value)}
            placeholder="First Name"

          />
           <input
            required
            className="w-full bg-[#eeeeee] mb-4 rounded px-4 py-2  text-sm placeholder:text-sm"
            type="text"
            value={LastName}
            onChange={(e)=>setLastName(e.target.value)}
            placeholder="last Name"
          />
           </div>

          <h3 className="text-base mb-2 font-medium">What's your email</h3>
          <input
            required
            className="w-full bg-[#eeeeee] mb-4 rounded px-4 py-2  text-sm placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-[#eeeeee] mb-4 rounded px-4 py-2  text-sm placeholder:text-sm"
            placeholder="password"
          />

          <button className="w-full bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 border text-sm placeholder:text-sm">
            Create account here
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

export default UserSignup