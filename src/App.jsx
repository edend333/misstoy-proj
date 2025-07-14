import { useState } from 'react'
import './App.css'
import { ToyIndex } from './pages/ToyIndex'
import { Route, Routes } from 'react-router-dom'
import './assets/styles/main.scss'
import { ToyDetails } from './pages/ToyDetails'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { Login } from './pages/Login'
import { authService } from './services/auth.service.js'
import { ToyEdit } from './pages/ToyEdit.jsx'



function App() {
authService._createDemoUsers()
  return (
    <>
    < AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/toy" element={<ToyIndex />} />
        <Route path="/toy/:toyId" element={<ToyDetails />} />
        <Route path="/toy/edit" element={<ToyEdit />} />   
        <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
          </Routes>
      </>
  )
}

export default App
