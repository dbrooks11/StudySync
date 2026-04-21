import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import JoinGroups from './pages/JoinGroups'

import './css/App.css'

export default function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={''}/> {/* TODO: will do profile page*/}
        <Route path='/join-groups' element={<JoinGroups/>}/>
      </Routes>
    </>
  )
}

