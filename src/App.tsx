import React from 'react';
import './App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import Signup from './containers/Signup/Signup';
import Home from './containers/Home';
import Signin from './containers/Signin';

function App() {
  return (
    
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
    </div>
  );
}

export default App;
