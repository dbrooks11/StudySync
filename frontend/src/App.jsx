import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

import './css/App.css'

export default function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={''}/> {/* TODO: will do profile page*/}
      </Routes>
    </>
  )
}

