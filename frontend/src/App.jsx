import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
import CaptainLogin from './Pages/CaptainLogin';
import CaptainSignup from './Pages/CaptainSignup'
import {UserDataContext} from './context/UserContext'
import {useContext} from 'react'




function App() {
  const ans = useContext(UserDataContext);
  console.log(ans);
  
  return (
    <div >
        <Routes>
            <Route path='/' element={<Home/>}/>  
            <Route path='/login' element ={<UserLogin/>}/>   
            <Route path='/signup' element ={<UserSignup/>}/>   
            <Route path='/captain-login' element ={<CaptainLogin/>}/>   
            <Route path='/captain-signup' element ={<CaptainSignup/>}/>   
            <Route/>   
        </Routes>
    </div>
  )
}

export default App