import React from 'react';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <main className="form-signin ">
        
          <Routes> {/* Use Routes component */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
