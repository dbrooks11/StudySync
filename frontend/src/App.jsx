import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import Login from './pages/Login'
import './css/App.css'

export default function App() {

  return (
    <>
      <Routes>
        <Route index element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={''}/> {/* TODO: will do profile page*/}
      </Routes>
    </>
  )
}

