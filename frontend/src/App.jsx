import { Route, Routes, Navigate } from 'react-router-dom'
import Courses from './pages/Courses'
import JoinGroup from './pages/JoinGroup'
import CreateGroup from './pages/CreateGroup'
import MyGroups from './pages/MyGroups'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route element={<ProtectedRoutes/>}>
          <Route path='/profile' element={<Profile/>}/> 
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/join-group' element={<JoinGroup/>}/>
          <Route path='/create-group' element={<CreateGroup/>}/>
          <Route path='/my-groups' element={<MyGroups/>}/>
        </Route>
      </Routes>
    </>
  )
}

