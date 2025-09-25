import React from 'react'
import { Link } from 'react-router-dom'

//  src=''
function Home() {
  return (
    <div>
        <div className='bg-red-400 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] pt-4 w-full h-screen flex flex-col justify-between'>
              <img className='w-16 px-2 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 px-4 '>
                <h2 className='text-3xl font-bold'>Get stated with Uber</h2>
                  <Link to='/login' className=' flex justify-center items-center w-full text-white bg-black rounded py-2  mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home