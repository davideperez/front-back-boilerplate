import React from 'react';
import './index.css';
import { Button } from './components/ui/button';

const App: React.FC = () => {
  return (
  <div className="m-6 font-mono">
    <h1 className="text-3xl font-bold underline">Hello, React + Vite + TypeScript!</h1>
    <Button>Presione aquí</Button>
  </div>
)};

export default App;
