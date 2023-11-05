// App.js

import React, { useState } from 'react';
import { Login } from "./Components/Login";
import { Forgot } from "./Components/Forgot";
import Home from "./Components/Home";
import { Dashboard } from "./Components/AdminPages/Dashboard";
import { Add } from "./Components/Add";
import Conduct from "./Components/AdminPages/Conduct";
import { Past } from "./Components/User/PastElections";
import { Vote } from "./Components/AdminPages/Vote";
import { Faq } from "./Components/User/Help";
import { User } from "./Components/User/User";
import './App.css';
import { Voting } from "./Components/User/Voting";
import { U } from "./Components/AdminPages/u";
import { Results } from "./Components/User/Results";
import { All } from "./Components/AdminPages/All";
import Admin from "./Components/Admin";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Route from './Route';
import NotFound from "./NotFound";

function App() {

  const [electionId, setElectionId] = useState("");
  const [eId, seteId] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/*" element={<NotFound />} />
        <Route path='/admin' element={<Admin />} />
        {/* <Route path='/admin' element={<Dashboard setElectionId={setElectionId} seteId={seteId} />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard setElectionId={setElectionId} seteId={seteId} />} />
        <Route path="/p" element={<Past setElectionId={setElectionId} seteId={seteId} />} />
        <Route path="/vote" element={<Vote setElectionId={setElectionId} seteId={seteId} />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/user" element={<User />} />
        <Route path="/all" element={<All setElectionId={setElectionId} seteId={seteId} />} />
        <Route path="/u" element={<U />} />
        <Route path="/add" element={<Add />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/results" element={<Results electionId={electionId} eId={eId} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;