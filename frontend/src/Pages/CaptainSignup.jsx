import React,{useState} from 'react'
import {Link} from 'react-router-dom'



 

function CaptainSignup() {
  const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [FirstName, setFirstName] = useState('');
        const [LastName, setLastName] = useState('');
  
        const [userdata,setuserdata] = useState({});
          const submitForm = (e)=>{
              e.preventDefault();
             console.log(email,password);
             setuserdata({
               email:email,
               password:password,
               fullName:{
                 firstName: FirstName,
                  lastName: LastName
               }
             })
            
             setEmail('')
             setPassword('')
             setFirstName('')
             setLastName('')

    }
  return (
        <div className="p-7 h-screen flex flex-col justify-between">
      <div>
          <img className='h-15 mb-1' src="https://pngimg.com/d/uber_PNG24.png" alt="" />
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