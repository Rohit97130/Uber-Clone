import React from 'react'
import {Route,Routes} from 'react-router-dom'
// import { GoogleMapsProvider } from './context/GoogleMapsContext'
import Start from './Pages/Start';
import Home from './Pages/Home';
import UserLogin from './Pages/UserLogin';
import UserSignup from './Pages/UserSignup';
import CaptainLogin from './Pages/CaptainLogin';
import CaptainSignup from './Pages/CaptainSignup'
import {UserDataContext} from './context/UserContext'
import {useContext} from 'react'
import UserProtectedWrapper from './Pages/UserProtectedWrapper';
import UserLogout from './Pages/UserLogout';
import CaptainHome from './Pages/CaptainHome';
import CaptainProtected from './Pages/CaptainProtected';
import CaptainLogout from './Pages/CaptainLogout';
import Riding from './Pages/Riding';
import CaptainRiding from './component/CaptainRiding'


function App() {
  const ans = useContext(UserDataContext);
  console.log(ans);


  console.log('my app component!!');
  
  return (
    <div>
      {/* <GoogleMapsProvider> */}
        <Routes>
            <Route path='/' element={<Start/>}/>  
            <Route path='/login' element ={<UserLogin/>}/>   
            <Route path='/signup' element ={<UserSignup/>}/>   
            <Route path='/captain-login' element ={<CaptainLogin/>}/>   
            <Route path='/captain-signup' element ={<CaptainSignup/>}/>   
            <Route path='/home' element={<UserProtectedWrapper> <Home/> </UserProtectedWrapper>}/>  
             <Route path='/log-out' element={<UserLogout/>}/>
             <Route path='/riding' element = {<Riding/>} />
              <Route path='/captain-riding' element={<CaptainRiding/>}/>
             <Route path='/captain-home' element={ <CaptainProtected><CaptainHome/></CaptainProtected>}/>
              
              <Route path='/captain-logout' element = { <CaptainProtected><CaptainLogout/></CaptainProtected> } /> 
              
            <Route/>   
        </Routes>
      {/* </GoogleMapsProvider> */}
    </div>
  )
}

export default App