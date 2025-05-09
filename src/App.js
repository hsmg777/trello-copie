import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main'; 
import CrearTarea from './components/CrearTarea';
import BuscarTarea from './components/BuscarTarea';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/crear" element={<CrearTarea />} />
        <Route path="/buscar" element={<BuscarTarea />} />
      </Routes>
    </div>
  );
}

export default App;
