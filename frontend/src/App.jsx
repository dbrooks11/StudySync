import { Route, Routes } from 'react-router'
import Register from './pages/Register'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
