import { Route, Routes } from 'react-router-dom'
import Courses from './pages/Courses'
import CreateGroup from './pages/CreateGroup'
import MyGroups from './pages/MyGroups'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'

import './css/App.css'

export default function App() {

  return (
    <>
      <Routes>
        <Route index element={''}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/join-group' element={''}/>
          <Route path='/create-group' element={<CreateGroup/>}/>
          <Route path='/my-groups' element={<MyGroups/>}/>
        </Route>
      </Routes>
    </>
  )
}

