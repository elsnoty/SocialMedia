import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Home } from "./pages/homepage/Home"
import { Login } from "./pages/Login"
import { Navbar } from "./components/Navbar"
import { AddPost } from './pages/adding-posts/AddPost';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/AddPost' element={<AddPost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
