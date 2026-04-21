import { Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'

import './css/App.css'

export default function App() {

  return (
    <>
      <Routes>
        <Route index element={''}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={<Profile/>}/> 
      </Routes>
    </>
  )
}

