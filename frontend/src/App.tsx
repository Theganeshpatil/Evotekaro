import React from 'react';
import { Login } from "./Components/Login";
import { Forgot } from "./Components/Forgot";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from "./NotFound";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/*" element={<NotFound />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
