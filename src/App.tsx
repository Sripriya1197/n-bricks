import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './containers/Signup';
import Home from './containers/Home';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup"  element={<Signup />}>
          </Route>
        </Routes>
    </div>
    </Router>

  );
}

export default App;
