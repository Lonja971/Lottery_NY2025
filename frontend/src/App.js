import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Register } from "./Register";
import { Login } from "./Login";

//---Ways-to-the-backend:
const mamp = "http://localhost:8888/LOTTERY_NY2025/backend"
const osPanel = "http://NY2025/backend"
const plesk = "https://97108289.hetictlyceum.nl/NY_2025"

function App() {

  const backendPath = mamp

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home backendPath={backendPath}/>} />
        <Route path="/register" element={<Register  backendPath={backendPath}/>} />
        <Route path="/login" element={<Login  backendPath={backendPath}/>} />
      </Routes>
    </Router>
  );
}

export default App;
