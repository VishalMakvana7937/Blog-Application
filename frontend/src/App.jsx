import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidenav from './component/sidenav'
import { Route, Router, Routes } from 'react-router'
import Home from './component/pages/Home'
import BLog from './component/pages/BLog'
import Allblog from './component/pages/Allblog'
import Register from './component/pages/register'
import Login from './component/pages/login'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BLog />} />
        <Route path="/allblog" element={<Allblog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
