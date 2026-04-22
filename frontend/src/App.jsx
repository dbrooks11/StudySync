import { Route, Routes } from 'react-router-dom'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'



export default function App() {

  return (
    <>
      <Routes>
        <Route index element={<ProtectedRoutes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/courses' element={<Courses/>}/>
        </Route>
      </Routes>
    </>
  )
}

