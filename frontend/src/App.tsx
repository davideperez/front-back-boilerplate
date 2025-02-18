import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { Home } from './components/Main/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="register" element={<Register />}/>
        <Route path="login" element ={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/" element ={<Home />} />
      </Routes>
    </BrowserRouter>
)};

export default App;
