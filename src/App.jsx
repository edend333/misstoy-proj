import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToyIndex } from './pages/ToyIndex'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<ToyIndex />} />
        {/* <Route path="/toy/:toyId" element={<ToyDetails />} />
        <Route path="/toy/edit/:toyId?" element={<ToyEdit />} /> */}
      </Routes>
      </>
  )
}

export default App
