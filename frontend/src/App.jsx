import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Library from './components/Library';
import Signup from './components/Signup';
import Login from './components/Login'
import Home from './components/Home';

const App = () => {
  return (
    <div className='w-full bg-slate-900 text-white'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element= {<Login />} />
        <Route path='/signup' element= {<Signup />} />
        <Route path='/library' element={<Library />} />
      </Routes>
    </div>
  );
};

export default App;  // Use default export here
