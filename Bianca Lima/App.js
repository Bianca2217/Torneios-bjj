import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Cliente from './components/Cliente';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cliente" element={<Cliente />} />
          {/* Redireciona a rota raiz "/" para a página de login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* npm install --save-dev @babel/plugin-proposal-private-property-in-object */}
        </Routes>
      </div>
    </Router>
  );
}


export default App;
