import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { RegisterPage } from './pages/RegisterPage';
import { Login } from './components/Auth/Login';
import { Home } from './components/Main/Home';
import { ThemeProvider } from './components/ui/theme-provider';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="register" element={<RegisterPage />}/>
          <Route path="login" element ={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/" element ={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
)};

export default App;
