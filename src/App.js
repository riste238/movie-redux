import React from 'react'
import Home from './components/Home/Home'
import MovieDetail from './components/MovieDetail/MovieDetail'
import PageNotFound from './components/PageNotFound/PageNotFound'
import {Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
      <Route exact="true" path="/" element={<Home />} />
      <Route  path="/movie/:imdbID" element={<MovieDetail />}/>
      <Route exact="true"  path="*" element={<PageNotFound />} />
      </Routes>
  
    </div>
  )
}

export default App
