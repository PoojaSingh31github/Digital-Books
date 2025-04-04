import React from 'react'
import './App.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import GenreCards from './components/GenreCards'
import TopicBooks from './components/TopicsBooks'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/books' element={<TopicBooks />} />
          <Route path='/' element={<GenreCards />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
