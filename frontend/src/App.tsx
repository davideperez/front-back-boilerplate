import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { Register } from './components/Register';
import { Home } from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        // Redirects to the home page if route does not exist.
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
)};

export default App;
