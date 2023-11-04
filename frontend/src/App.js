import React, { useState } from "react";
import { Login } from "./Components/Login";
import { Forgot } from "./Components/Forgot";
import { First } from "./Components/First"
import { Dashboard } from "./Components/Dashboard"
import { Add } from "./Components/Add";
import Conduct from "./Components/Conduct";
import { Past } from "./Components/Past";
import { Vote } from "./Components/Vote";
import { Faq } from "./Components/Faq"
import { User } from "./Components/User";
import './App.css';
import { Voting } from "./Components/Voting";
import { U } from "./Components/u";
import { Results } from "./Components/Results";
import { All } from "./Components/All";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [electionId, setElectionId] = useState("")
  const [eId, seteId] = useState("")

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={
            <React.Fragment>
              <First />
            </React.Fragment>
          } />
          <Route path="/login" element={
            <React.Fragment>
              <Login />
            </React.Fragment>
          } />
          <Route path="/forgot" element={
            <React.Fragment>
              <Forgot />
            </React.Fragment>
          } />
          <Route path="/dashboard" element={
            <React.Fragment>
              <Dashboard setElectionId={setElectionId} seteId={seteId} />
            </React.Fragment>
          } />
          <Route path="/faq" element={
            <React.Fragment>
              <Faq />
            </React.Fragment>
          } />
          <Route path="/add" element={
            <React.Fragment>
              <Add />
            </React.Fragment>
          } />
          <Route path="/conduct" element={
            <React.Fragment>
              <Conduct />
            </React.Fragment>
          } />
          <Route path="/user" element={
            <React.Fragment>
              <User />
            </React.Fragment>
          } />
          <Route path="/p" element={
            <React.Fragment>
              <Past setElectionId={setElectionId} seteId={seteId} />
            </React.Fragment>
          } />
          <Route path="/vote" element={
            <React.Fragment>
              <Vote setElectionId={setElectionId} seteId={seteId} />
            </React.Fragment>
          } />
          <Route path="/voting" element={
            <React.Fragment>
              <Voting setElectionId={setElectionId} />
            </React.Fragment>
          } />
          <Route path="/u" element={
            <React.Fragment>
              <U />
            </React.Fragment>
          } />
          <Route path="/results" element={
            <React.Fragment>
              <Results setElectionId={setElectionId} seteId={seteId} />
            </React.Fragment>
          } />
          <Route path="/all" element={
            <React.Fragment>
              <All setElectionId={setElectionId} seteId={seteId} />
            </React.Fragment>
          } />
        </Routes>
      </Router>
    </React.Fragment>
  )
}



export default App;